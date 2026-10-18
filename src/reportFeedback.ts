import { Platform } from 'react-native';
import { supabase } from './cloud';

const BASE = process.env.EXPO_PUBLIC_FEEDBACK_URL ?? (Platform.OS === 'web' ? '' : 'https://bracey.vercel.app');
export type FeedbackKind = 'bug' | 'idea' | 'other';
export interface Screenshot { base64: string; mime: string }

// Lets the user pick a screenshot. Returns null if cancelled or unavailable.
export async function pickScreenshot(): Promise<Screenshot | null> {
  try {
    const IP = require('expo-image-picker');
    const r = await IP.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.6, base64: true });
    const a = r.canceled ? null : r.assets?.[0];
    return a?.base64 ? { base64: a.base64, mime: a.mimeType ?? 'image/jpeg' } : null;
  } catch { return null; }
}

export async function sendFeedback(o: { kind: FeedbackKind; message: string; contact?: string; shot?: Screenshot | null }): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const { data } = (await supabase?.auth.getSession()) ?? { data: { session: null } };
    const token = data.session?.access_token;
    if (!token) return { ok: false, error: 'Please sign in to send feedback.' };
    const r = await fetch(`${BASE}/api/feedback`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ kind: o.kind, message: o.message, contact: o.contact, image: o.shot?.base64, mime: o.shot?.mime, app: `Bracey ${Platform.OS}` }),
    });
    const d = await r.json().catch(() => ({}));
    return r.ok ? { ok: true } : { ok: false, error: d.error ?? 'Could not send feedback.' };
  } catch { return { ok: false, error: 'No connection. Try again later.' }; }
}
