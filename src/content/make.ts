import { Lesson, Question, Rich, Card } from './types';
import { allEntries } from './curriculum';

export type Body = { teach?: (string | Card)[]; rich?: Rich; questions: Question[] };

// Turn a Rich walkthrough into teaching cards: problem -> what's asked -> tools -> approaches (brute force first).
export function richCards(r: Rich): Card[] {
  return [
    { title: '1 · The problem', text: r.statement, code: `Input:  ${r.example.input}\nOutput: ${r.example.output}`, foot: r.example.why },
    { title: '2 · What are we really asked?', text: r.ask },
    ...r.tools.map((t, i) => ({ title: `${3 + i} · Tool: ${t.name}`, text: t.what })),
    ...r.approaches.map((a, i) => ({
      title: `${3 + r.tools.length + i} · ${i === 0 ? 'Brute force' : i === r.approaches.length - 1 ? 'Optimal' : 'Better'}: ${a.name}`,
      text: a.idea, code: a.code.join('\n'), foot: `Time ${a.time} · Space ${a.space}. ${a.why}`,
    })),
  ];
}

export const make = (problem: string, b: Body): Lesson => {
  const e = allEntries.find(x => x.problem === problem);
  if (!e) throw new Error(`Unknown problem: ${problem}`);
  const teach = b.teach ?? (b.rich ? richCards(b.rich) : []);
  return { id: e.id, day: e.day, problem, topic: e.topic, teach, questions: b.questions, rich: b.rich };
};

export const ch = (prompt: string, options: string[], answer: number, explain: string, hint?: string): Question =>
  ({ type: 'choice', prompt, options, answer, explain, hint });
export const ord = (prompt: string, steps: string[], explain: string, code = false, hint?: string): Question =>
  ({ type: 'order', prompt, steps, explain, code, hint });
export const bl = (prompt: string, code: string, options: string[], answer: string, explain: string, hint?: string): Question =>
  ({ type: 'blank', prompt, code, options, answer, explain, hint });
export const bug = (prompt: string, lines: string[], buggyLine: number, explain: string, hint?: string): Question =>
  ({ type: 'bug', prompt, lines, buggyLine, explain, hint });
export const mt = (prompt: string, pairs: [string, string][], explain: string, hint?: string): Question =>
  ({ type: 'match', prompt, pairs, explain, hint });
