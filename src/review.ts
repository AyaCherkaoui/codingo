import { Lesson, Question } from './content/types';
import { lessonById } from './content/lessons';

// Build a mixed practice session out of the questions of due lessons.
export function buildReview(dueIds: string[], max = 6): { lesson: Lesson; ids: string[] } | null {
  const pool: { id: string; q: Question }[] = [];
  for (const id of dueIds) {
    const l = lessonById.get(id);
    if (l) for (const q of l.questions) pool.push({ id, q });
  }
  if (pool.length === 0) return null;
  const pick = pool.sort(() => Math.random() - 0.5).slice(0, max);
  return {
    ids: [...new Set(pick.map(x => x.id))],
    lesson: { id: 'review', day: 0, problem: 'Review', topic: 'Spaced review', teach: [], questions: pick.map(x => x.q) },
  };
}
