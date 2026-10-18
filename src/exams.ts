import { Lesson, Question } from './content/types';
import { lessonById } from './content/lessons';
import { units } from './content/curriculum';

const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const isCode = (q: Question) => q.type === 'write' || q.type === 'blank' || q.type === 'bug' || (q.type === 'order' && !!q.code);
type Pick = { id: string; q: Question };
const pool = (ids: string[], keep: (q: Question) => boolean = () => true): Pick[] =>
  ids.flatMap(id => (lessonById.get(id)?.questions ?? []).filter(keep).map(q => ({ id, q })));
const session = (title: string, topic: string, picks: Pick[]): { lesson: Lesson; ids: string[] } => ({
  ids: [...new Set(picks.map(p => p.id))],
  lesson: { id: 'review', day: 0, problem: title, topic, teach: [], questions: picks.map(p => ({ ...p.q, src: lessonById.get(p.id)?.problem })) },
});

// A unit's exam opens once every lesson in it is done.
export const unitDone = (topic: string, completed: string[]) => {
  const u = units.find(x => x.topic === topic);
  return !!u && u.entries.every(e => completed.includes(e.id));
};

// Cumulative exam: ~60% of the questions come from this unit, ~40% from every earlier unit the learner has finished.
// Only lessons the learner has completed are used, so nothing unseen is tested.
export function buildExam(topic: string, completed: string[], total = 12): { lesson: Lesson; ids: string[] } | null {
  const idx = units.findIndex(u => u.topic === topic);
  if (idx < 0) return null;
  const done = new Set(completed);
  const mine = units[idx].entries.map(e => e.id).filter(id => done.has(id));
  const earlier = units.slice(0, idx).flatMap(u => u.entries.map(e => e.id)).filter(id => done.has(id));
  const take = (ids: string[], n: number) => {
    // spread over lessons: one random question per lesson first, so no single lesson dominates
    const byLesson = shuffle(ids).map(id => shuffle(pool([id])));
    const out: Pick[] = [];
    for (let round = 0; out.length < n && byLesson.some(l => l.length > round); round++)
      for (const l of byLesson) { if (l[round] && out.length < n) out.push(l[round]); }
    return out;
  };
  const nEarlier = earlier.length ? Math.round(total * 0.4) : 0;
  const picks = [...take(mine, total - nEarlier), ...take(earlier, nEarlier)];
  if (picks.length === 0) return null;
  const sessionPicks = shuffle(picks);
  // finish with a coding question, like every lesson does
  const wi = sessionPicks.findIndex(p => p.q.type === 'write');
  if (wi >= 0) sessionPicks.push(sessionPicks.splice(wi, 1)[0]);
  return session(`${topic} exam`, `Cumulative exam · ${units[idx].entries.length} lessons${earlier.length ? ' + earlier units' : ''}`, sessionPicks);
}

// "Code review": only the code questions (type it, fill it, spot the bug, order the lines) from completed lessons.
export function buildCodeReview(completed: string[], total = 8): { lesson: Lesson; ids: string[] } | null {
  const picks = shuffle(pool(completed, isCode)).slice(0, total);
  if (picks.length === 0) return null;
  return session('Code review', 'Code drill', picks);
}
