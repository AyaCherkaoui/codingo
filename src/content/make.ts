import { Lesson, Question } from './types';
import { allEntries } from './curriculum';

export type Body = { teach: string[]; questions: Question[] };

export const make = (problem: string, b: Body): Lesson => {
  const e = allEntries.find(x => x.problem === problem);
  if (!e) throw new Error(`Unknown problem: ${problem}`);
  return { id: e.id, day: e.day, problem, topic: e.topic, ...b };
};

export const ch = (prompt: string, options: string[], answer: number, explain: string, hint?: string): Question =>
  ({ type: 'choice', prompt, options, answer, explain, hint });
export const ord = (prompt: string, steps: string[], explain: string, code = false, hint?: string): Question =>
  ({ type: 'order', prompt, steps, explain, code, hint });
export const bl = (prompt: string, code: string, options: string[], answer: string, explain: string, hint?: string): Question =>
  ({ type: 'blank', prompt, code, options, answer, explain, hint });
export const bug = (prompt: string, lines: string[], buggyLine: number, explain: string, hint?: string): Question =>
  ({ type: 'bug', prompt, lines, buggyLine, explain, hint });
