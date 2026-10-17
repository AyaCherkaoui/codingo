import { units } from './content/curriculum';
import { Progress } from './storage';

export interface Badge { id: string; icon: string; name: string; desc: string; earned: (p: Progress) => boolean }

const topicBadges: Badge[] = units.map(u => ({
  id: `topic-${u.topic}`, icon: '🏅', name: `${u.topic} master`, desc: `Finish every ${u.topic} lesson`,
  earned: p => u.entries.every(e => p.completed.includes(e.id)),
}));

export const badges: Badge[] = [
  { id: 'first', icon: '🌱', name: 'First step', desc: 'Finish your first lesson', earned: p => p.completed.length >= 1 },
  { id: 'l10', icon: '🔟', name: '10 lessons', desc: 'Finish 10 lessons', earned: p => p.completed.length >= 10 },
  { id: 'l50', icon: '💪', name: '50 lessons', desc: 'Finish 50 lessons', earned: p => p.completed.length >= 50 },
  { id: 'l100', icon: '💯', name: '100 lessons', desc: 'Finish 100 lessons', earned: p => p.completed.length >= 100 },
  { id: 'l250', icon: '👑', name: 'All 250', desc: 'Finish all 250 lessons', earned: p => p.completed.length >= 250 },
  { id: 's3', icon: '🔥', name: '3-day streak', desc: 'Learn 3 days in a row', earned: p => p.bestStreak >= 3 },
  { id: 's7', icon: '🔥', name: '7-day streak', desc: 'Learn 7 days in a row', earned: p => p.bestStreak >= 7 },
  { id: 's30', icon: '🌋', name: '30-day streak', desc: 'Learn 30 days in a row', earned: p => p.bestStreak >= 30 },
  { id: 'x500', icon: '⚡', name: '500 XP', desc: 'Earn 500 XP', earned: p => p.xp >= 500 },
  { id: 'x2000', icon: '🚀', name: '2000 XP', desc: 'Earn 2000 XP', earned: p => p.xp >= 2000 },
  ...topicBadges,
];

export const earnedIds = (p: Progress) => badges.filter(b => b.earned(p)).map(b => b.id);
