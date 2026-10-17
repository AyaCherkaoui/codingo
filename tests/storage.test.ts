import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const store = new Map<string, string>();
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: async (k: string) => store.get(k) ?? null,
    setItem: async (k: string, v: string) => { store.set(k, v); },
    removeItem: async (k: string) => { store.delete(k); },
  },
}));

import * as S from '../src/storage';
import { mergeProgress } from '../src/merge';

const at = (iso: string) => vi.setSystemTime(new Date(iso));
const base = (o: Partial<S.Progress> = {}): S.Progress => ({ ...S.empty, heartsAt: Date.now(), ...o });

beforeEach(() => { vi.useFakeTimers(); store.clear(); at('2026-03-10T12:00:00'); });
afterEach(() => vi.useRealTimers());

describe('local days', () => {
  it('rolls over at local midnight, not UTC', () => {
    at('2026-03-10T23:30:00'); expect(S.today()).toBe('2026-03-10');
    at('2026-03-11T00:05:00'); expect(S.today()).toBe('2026-03-11');
  });
});

describe('streaks', () => {
  it('first lesson starts streak at 1; second lesson same day does not add', () => {
    let p = S.finishLesson(base(), 'a', 20);
    expect(p.streak).toBe(1);
    p = S.finishLesson(p, 'b', 20);
    expect(p.streak).toBe(1);
    expect(p.xp).toBe(40);
  });
  it('consecutive days build the streak and earn a freeze every 7', () => {
    let p = base({ freezes: 0 });
    for (let d = 1; d <= 7; d++) { at(`2026-03-${String(d).padStart(2, '0')}T20:00:00`); p = S.finishLesson(p, `l${d}`, 10); }
    expect(p.streak).toBe(7);
    expect(p.freezes).toBe(1);
    expect(p.bestStreak).toBe(7);
  });
  it('freezes are capped at MAX_FREEZES', () => {
    let p = base({ freezes: 2, streak: 6, lastDay: '2026-03-09' });
    p = S.finishLesson(p, 'x', 10);
    expect(p.streak).toBe(7);
    expect(p.freezes).toBe(S.MAX_FREEZES);
  });
});

describe('missed days', () => {
  it('no change when played today or yesterday', () => {
    expect(S.applyMissedDays(base({ streak: 4, lastDay: '2026-03-10' })).streak).toBe(4);
    expect(S.applyMissedDays(base({ streak: 4, lastDay: '2026-03-09' })).streak).toBe(4);
  });
  it('a freeze covers one missed day and keeps the streak', () => {
    const p = S.applyMissedDays(base({ streak: 4, freezes: 1, lastDay: '2026-03-08' }));
    expect(p.streak).toBe(4); expect(p.freezes).toBe(0); expect(p.lastDay).toBe('2026-03-09');
    expect(S.finishLesson(p, 'x', 10).streak).toBe(5);
  });
  it('two missed days need two freezes', () => {
    const p = S.applyMissedDays(base({ streak: 4, freezes: 2, lastDay: '2026-03-07' }));
    expect(p.streak).toBe(4); expect(p.freezes).toBe(0);
  });
  it('streak resets when freezes are not enough', () => {
    const p = S.applyMissedDays(base({ streak: 9, freezes: 1, lastDay: '2026-03-06' }));
    expect(p.streak).toBe(0);
  });
  it('is correct across the DST change', () => {
    at('2026-03-09T12:00:00'); // US DST began 2026-03-08
    expect(S.applyMissedDays(base({ streak: 3, lastDay: '2026-03-07', freezes: 1 })).freezes).toBe(0);
    expect(S.applyMissedDays(base({ streak: 3, lastDay: '2026-03-08', freezes: 0 })).streak).toBe(3);
  });
  it('load() persists spent freezes and reports them', async () => {
    store.set('codingo-progress-v2', JSON.stringify(base({ streak: 5, freezes: 1, lastDay: '2026-03-08' })));
    const p = await S.load();
    expect(p.freezes).toBe(0);
    expect(S.freezesSpentOnLoad).toBe(1);
    expect(JSON.parse(store.get('codingo-progress-v2')!).freezes).toBe(0);
  });
  it('load() of a brand-new user gives defaults', async () => {
    const p = await S.load();
    expect(p.hearts).toBe(S.HEART_MAX); expect(p.onboarded).toBe(false);
  });
});

describe('hearts', () => {
  it('lose and refill one per 30 minutes', () => {
    let p = base({ hearts: 5 });
    p = S.loseHeart(p); expect(p.hearts).toBe(4);
    at('2026-03-10T12:29:00'); expect(S.refreshHearts(p).hearts).toBe(4);
    at('2026-03-10T12:31:00'); expect(S.refreshHearts(p).hearts).toBe(5);
  });
  it('never goes below 0 or above max', () => {
    let p = base({ hearts: 0 }); p = S.loseHeart(p); expect(p.hearts).toBe(0);
    at('2026-03-12T12:00:00'); expect(S.refreshHearts(p).hearts).toBe(S.HEART_MAX);
  });
  it('minutesToNextHeart is at least 1', () => {
    expect(S.minutesToNextHeart(base({ hearts: 2, heartsAt: Date.now() - 31 * 60000 }))).toBe(1);
  });
});

describe('spaced review', () => {
  it('schedules +1 day on first completion and advances steps', () => {
    let p = S.finishLesson(base(), 'a', 10);
    expect(p.reviews.a).toEqual({ step: 0, due: '2026-03-11' });
    expect(S.dueReviews(p)).toEqual([]);
    at('2026-03-11T09:00:00'); expect(S.dueReviews(p)).toEqual(['a']);
    p = S.finishReview(p, ['a'], 5); expect(p.reviews.a).toEqual({ step: 1, due: '2026-03-14' });
    for (let i = 0; i < 10; i++) p = S.finishReview(p, ['a'], 0);
    expect(p.reviews.a.step).toBe(4);
  });
  it('replaying a finished lesson does not reset its review', () => {
    let p = S.finishLesson(base(), 'a', 10);
    p = S.finishReview(p, ['a'], 0);
    const r = p.reviews.a;
    expect(S.finishLesson(p, 'a', 10).reviews.a).toEqual(r);
  });
});

describe('mergeProgress', () => {
  it('unions lessons, keeps higher review step and best values', () => {
    const a = base({ completed: ['x', 'y'], xp: 50, bestStreak: 3, streak: 2, lastDay: '2026-03-09', reviews: { x: { step: 0, due: '2026-03-10' } } });
    const b = base({ completed: ['y', 'z'], xp: 80, bestStreak: 5, streak: 4, lastDay: '2026-03-10', reviews: { x: { step: 2, due: '2026-03-20' }, z: { step: 0, due: '2026-03-11' } }, onboarded: false });
    const m = mergeProgress(a, b);
    expect(m.completed.sort()).toEqual(['x', 'y', 'z']);
    expect(m.xp).toBe(80); expect(m.bestStreak).toBe(5);
    expect(m.streak).toBe(4); expect(m.lastDay).toBe('2026-03-10');
    expect(m.reviews.x.step).toBe(2); expect(m.reviews.z).toBeDefined();
    expect(m.onboarded).toBe(true);
  });
  it('is symmetric on progress data', () => {
    const a = base({ completed: ['a'], xp: 10 }); const b = base({ completed: ['b'], xp: 30 });
    expect(mergeProgress(a, b).completed.sort()).toEqual(mergeProgress(b, a).completed.sort());
    expect(mergeProgress(a, b).xp).toBe(mergeProgress(b, a).xp);
  });
});
