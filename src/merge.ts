import { Progress } from './storage';

// Merge two progress objects without losing anything either side earned.
export function mergeProgress(a: Progress, b: Progress): Progress {
  const completed = [...new Set([...a.completed, ...b.completed])];
  const reviews = { ...b.reviews, ...a.reviews };
  for (const id of Object.keys(b.reviews)) if (a.reviews[id] && b.reviews[id].step > a.reviews[id].step) reviews[id] = b.reviews[id];
  const newer = (a.lastDay ?? '') >= (b.lastDay ?? '') ? a : b;
  return {
    ...a, completed, reviews,
    freezes: Math.min(Math.max(a.freezes, b.freezes), 2),
    xp: Math.max(a.xp, b.xp), bestStreak: Math.max(a.bestStreak, b.bestStreak),
    streak: newer.streak, lastDay: newer.lastDay, onboarded: true,
  };
}
