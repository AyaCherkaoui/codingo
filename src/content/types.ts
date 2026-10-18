type Base = { hint?: string; src?: string }; // src = the problem a mixed-review question comes from
export type Question = Base &
  (
    | { type: 'choice'; prompt: string; options: string[]; answer: number; explain: string }
    | { type: 'order'; prompt: string; steps: string[]; explain: string; code?: boolean } // steps in correct order
    | { type: 'blank'; prompt: string; code: string; options: string[]; answer: string; explain: string }
    | { type: 'bug'; prompt: string; lines: string[]; buggyLine: number; explain: string }
    // Tap a left item, then its partner on the right. pairs[i] = [left, right].
    | { type: 'match'; prompt: string; pairs: [string, string][]; explain: string }
    // Type code. `expected` = accepted answers (compared ignoring spaces / quote style). `solution` is shown when wrong.
    | { type: 'write'; prompt: string; starter?: string; expected: string[]; solution: string; explain: string; level: WriteLevel }
  );

// how much code the learner has to type: just the missing part -> a whole line -> the whole snippet
export type WriteLevel = 'part' | 'line' | 'full';

// A teaching card: plain text, or a titled card with optional code.
export type Card = { title?: string; text: string; code?: string; foot?: string };

// One way to solve the problem. Listed from brute force to optimal.
export interface Approach { name: string; idea: string; code: string[]; time: string; space: string; why: string }

// The guided walkthrough shown before the questions.
export interface Rich {
  statement: string; // the problem in plain English
  example: { input: string; output: string; why: string };
  ask: string; // "what are we really being asked?" in one sentence + the trick to notice
  tools: { name: string; what: string }[]; // data structures / ideas used, explained from scratch
  approaches: Approach[]; // brute force -> optimal
}

export interface Lesson {
  id: string;
  day: number; // 1..250 (0 = review / exam session)
  problem: string;
  topic: string;
  teach: (string | Card)[];
  questions: Question[];
  rich?: Rich;
}
