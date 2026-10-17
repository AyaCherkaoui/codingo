import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Progress } from './storage';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const cloudConfigured = !!URL && !!KEY;

export const supabase = cloudConfigured
  ? createClient(URL, KEY, { auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false } })
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
