import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Review { due: string; step: number }
export interface Progress {
  xp: number; streak: number; bestStreak: number; lastDay: string | null;
  completed: string[];
  hearts: number; heartsAt: number;
  reviews: Record<string, Review>;
  onboarded: boolean; reminderOn: boolean; reminderHour: number;
  soundOn: boolean; freezes: number;
}

export const HEART_MAX = 5;
export const HEART_MS = 30 * 60 * 1000;
const REVIEW_DAYS = [1, 3, 7, 14, 30];
const KEY = 'codingo-progress-v2';

export const empty: Progress = {
  xp: 0, streak: 0, bestStreak: 0, lastDay: null, completed: [],
  hearts: HEART_MAX, heartsAt: 0, reviews: {},
  onboarded: false, reminderOn: true, reminderHour: 19,
  soundOn: true, freezes: 1,
};
export const MAX_FREEZES = 2;

// Local calendar day (YYYY-MM-DD), so the day rolls over at the user's midnight, not UTC's.
export const dayStr = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const today = () => dayStr(Date.now());
const dayNum = (s: string) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) / 86400000; };
const inDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return dayStr(d.getTime()); };
const yesterday = () => inDays(-1);

export const level = (xp: number) => Math.floor(xp / 100) + 1;

export function refreshHearts(p: Progress, now = Date.now()): Progress {
  if (p.hearts >= HEART_MAX) return p;
  const n = Math.floor((now - p.heartsAt) / HEART_MS);
  if (n <= 0) return p;
  const hearts = Math.min(HEART_MAX, p.hearts + n);
  return { ...p, hearts, heartsAt: hearts >= HEART_MAX ? now : p.heartsAt + n * HEART_MS };
}

export function minutesToNextHeart(p: Progress, now = Date.now()): number {
  return Math.max(1, Math.ceil((p.heartsAt + HEART_MS - now) / 60000));
}

export function loseHeart(p: Progress): Progress {
  const r = refreshHearts(p);
  if (r.hearts <= 0) return r;
  return { ...r, hearts: r.hearts - 1, heartsAt: r.hearts >= HEART_MAX ? Date.now() : r.heartsAt };
}

export function dueReviews(p: Progress): string[] {
  const t = today();
  return p.completed.filter(id => p.reviews[id] && p.reviews[id].due <= t);
}

// Every 7-day streak milestone earns a streak freeze (max 2).
function touchStreak(p: Progress): Pick<Progress, 'streak' | 'bestStreak' | 'lastDay' | 'freezes'> {
  const t = today();
  const first = p.lastDay !== t;
  const streak = first ? p.streak + 1 : p.streak;
  const earned = first && streak % 7 === 0 ? 1 : 0;
  return { streak, bestStreak: Math.max(p.bestStreak, streak), lastDay: t, freezes: Math.min(MAX_FREEZES, p.freezes + earned) };
}

export function finishLesson(p: Progress, id: string, xp: number): Progress {
  const first = !p.completed.includes(id);
  return {
    ...p, xp: p.xp + xp, ...touchStreak(p),
    completed: first ? [...p.completed, id] : p.completed,
    reviews: first ? { ...p.reviews, [id]: { due: inDays(REVIEW_DAYS[0]), step: 0 } } : p.reviews,
  };
}

export function finishReview(p: Progress, ids: string[], xp: number): Progress {
  const reviews = { ...p.reviews };
  for (const id of ids) {
    const step = Math.min((reviews[id]?.step ?? 0) + 1, REVIEW_DAYS.length - 1);
    reviews[id] = { step, due: inDays(REVIEW_DAYS[step]) };
  }
  return { ...p, xp: p.xp + xp, ...touchStreak(p), reviews };
}

// Spend freezes on skipped days, or reset the streak if there aren't enough.
export function applyMissedDays(p: Progress): Progress {
  if (!p.lastDay) return p;
  const missed = dayNum(today()) - dayNum(p.lastDay) - 1; // whole days skipped
  if (missed <= 0) return p;
  if (p.freezes >= missed) return { ...p, freezes: p.freezes - missed, lastDay: yesterday() }; // freezes cover the gap
  return { ...p, streak: 0 };
}

export let freezesSpentOnLoad = 0; // for a one-time "freeze used" message

export async function load(): Promise<Progress> {
  const raw = await AsyncStorage.getItem(KEY);
  const loaded: Progress = raw ? { ...empty, ...JSON.parse(raw) } : { ...empty, heartsAt: Date.now() };
  const fixed = applyMissedDays(loaded);
  freezesSpentOnLoad = loaded.freezes - fixed.freezes;
  const p = refreshHearts(fixed);
  if (raw && p !== loaded) save(p).catch(() => {}); // persist spent freezes / reset streak
  return p;
}

export const save = (p: Progress) => AsyncStorage.setItem(KEY, JSON.stringify(p));
export const wipe = () => AsyncStorage.removeItem(KEY);
