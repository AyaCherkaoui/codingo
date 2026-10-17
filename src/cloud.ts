import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Progress } from './storage';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const cloudConfigured = !!URL && !!KEY;

const isWeb = typeof document !== 'undefined';

export const supabase = cloudConfigured
  ? createClient(URL, KEY, { auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: isWeb } })
  : null;

export interface Profile { id: string; username: string; xp: number; streak: number; completed_count: number }
export interface FriendRow { friendshipId: number; profile: Profile; status: 'pending' | 'accepted'; incoming: boolean }

const err = (e: any) => (e?.message as string) ?? 'Something went wrong';
type Res<T> = { ok: true; data: T } | { ok: false; error: string };
const ok = <T,>(data: T): Res<T> => ({ ok: true, data });
const fail = (e: any): Res<never> => ({ ok: false, error: err(e) });
const off = fail({ message: 'Online features are not set up yet.' });

export async function currentUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function signUp(email: string, password: string): Promise<Res<{ needsConfirm: boolean }>> {
  if (!supabase) return off;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return fail(error);
  return ok({ needsConfirm: !data.session });
}
export async function signIn(email: string, password: string): Promise<Res<null>> {
  if (!supabase) return off;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? fail(error) : ok(null);
}
// ---- Sign in with Google / GitHub (Supabase OAuth) ----
export type OAuthProvider = 'google' | 'github';
export const PROVIDER_LABEL: Record<OAuthProvider, string> = { google: 'Google', github: 'GitHub' };

// Only offer providers that are switched on in the Supabase dashboard.
export async function enabledProviders(): Promise<OAuthProvider[]> {
  if (!cloudConfigured) return [];
  try {
    const r = await fetch(`${URL}/auth/v1/settings`, { headers: { apikey: KEY } });
    const d = await r.json();
    return (['google', 'github'] as const).filter(p => !!d?.external?.[p]);
  } catch { return []; }
}

export async function signInWithProvider(provider: OAuthProvider): Promise<Res<null>> {
  if (!supabase) return off;
  try {
    if (isWeb) { // full-page redirect; supabase-js picks the session up from the URL when we come back
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
      return error ? fail(error) : ok(null);
    }
    const Linking = require('expo-linking');
    const WebBrowser = require('expo-web-browser');
    const redirectTo: string = Linking.createURL('auth-callback');
    const { data, error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo, skipBrowserRedirect: true } });
    if (error || !data?.url) return fail(error ?? { message: 'Could not start sign-in' });
    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (res.type !== 'success' || !res.url) return fail({ message: 'Sign-in was cancelled' });
    const params = new URLSearchParams(res.url.split('#')[1] ?? res.url.split('?')[1] ?? '');
    const access_token = params.get('access_token'), refresh_token = params.get('refresh_token');
    if (!access_token || !refresh_token) return fail({ message: params.get('error_description') ?? 'Sign-in failed' });
    const { error: e2 } = await supabase.auth.setSession({ access_token, refresh_token });
    return e2 ? fail(e2) : ok(null);
  } catch (e) { return fail(e); }
}

// A starting username for people who signed in with Google/GitHub (3-20 chars of a-z, 0-9, _).
export async function suggestedUsername(): Promise<string> {
  if (!supabase) return '';
  const { data } = await supabase.auth.getSession();
  const u = data.session?.user;
  const raw = (u?.user_metadata?.user_name ?? u?.user_metadata?.preferred_username ?? u?.user_metadata?.name ?? u?.email?.split('@')[0] ?? '') as string;
  const clean = raw.toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 20);
  return clean.length >= 3 ? clean : '';
}

export async function signOut() { await supabase?.auth.signOut(); }
export async function resetPassword(email: string): Promise<Res<null>> {
  if (!supabase) return off;
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return error ? fail(error) : ok(null);
}

// null = signed in but no profile yet; undefined = couldn't reach the server (e.g. offline).
export async function getProfile(id: string): Promise<Profile | null | undefined> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
    if (error) return undefined;
    return (data as Profile) ?? null;
  } catch { return undefined; }
}
export async function createProfile(id: string, username: string, p: Progress): Promise<Res<Profile>> {
  if (!supabase) return off;
  const u = username.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(u)) return fail({ message: 'Use 3-20 letters, numbers or _' });
  const row = { id, username: u, xp: p.xp, streak: p.streak, completed_count: p.completed.length };
  const { data, error } = await supabase.from('profiles').insert(row).select().single();
  if (error) return fail(error.code === '23505' ? { message: 'That username is taken' } : error);
  return ok(data as Profile);
}

export { mergeProgress } from './merge';

export async function pullProgress(uid: string): Promise<Progress | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('user_progress').select('progress').eq('user_id', uid).maybeSingle();
  return (data?.progress as Progress) ?? null;
}
export async function pushProgress(uid: string, p: Progress): Promise<boolean> {
  if (!supabase) return false;
  try {
    const now = new Date().toISOString();
    const a = await supabase.from('user_progress').upsert({ user_id: uid, progress: p, updated_at: now });
    const b = await supabase.from('profiles').update({ xp: p.xp, streak: p.streak, completed_count: p.completed.length, updated_at: now }).eq('id', uid);
    return !a.error && !b.error;
  } catch { return false; }
}

export async function listFriends(uid: string): Promise<Res<FriendRow[]>> {
  if (!supabase) return off;
  const { data, error } = await supabase.from('friendships').select('id, requester, addressee, status').or(`requester.eq.${uid},addressee.eq.${uid}`);
  if (error) return fail(error);
  const rows = data ?? [];
  const otherIds = rows.map(r => (r.requester === uid ? r.addressee : r.requester));
  if (otherIds.length === 0) return ok([]);
  const { data: profs, error: e2 } = await supabase.from('profiles').select('*').in('id', otherIds);
  if (e2) return fail(e2);
  const byId = new Map((profs ?? []).map((p: any) => [p.id, p as Profile]));
  return ok(rows.flatMap(r => {
    const other = byId.get(r.requester === uid ? r.addressee : r.requester);
    return other ? [{ friendshipId: r.id, profile: other, status: r.status, incoming: r.addressee === uid }] : [];
  }));
}
export async function requestFriend(uid: string, username: string): Promise<Res<null>> {
  if (!supabase) return off;
  const u = username.trim().toLowerCase().replace(/^@/, '');
  const { data: target } = await supabase.from('profiles').select('id').eq('username', u).maybeSingle();
  if (!target) return fail({ message: `No user named @${u}` });
  if (target.id === uid) return fail({ message: "That's you!" });
  const { error } = await supabase.from('friendships').insert({ requester: uid, addressee: target.id });
  if (error) return fail(error.code === '23505' ? { message: 'Request already sent' } : error);
  return ok(null);
}
export async function acceptFriend(id: number): Promise<Res<null>> {
  if (!supabase) return off;
  const { error } = await supabase.from('friendships').update({ status: 'accepted' }).eq('id', id);
  return error ? fail(error) : ok(null);
}
export async function removeFriend(id: number): Promise<Res<null>> {
  if (!supabase) return off;
  const { error } = await supabase.from('friendships').delete().eq('id', id);
  return error ? fail(error) : ok(null);
}
