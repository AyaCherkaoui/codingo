type Base = { hint?: string };
export type Question = Base &
  (
    | { type: 'choice'; prompt: string; options: string[]; answer: number; explain: string }
    | { type: 'order'; prompt: string; steps: string[]; explain: string; code?: boolean } // steps in correct order
    | { type: 'blank'; prompt: string; code: string; options: string[]; answer: string; explain: string }
    | { type: 'bug'; prompt: string; lines: string[]; buggyLine: number; explain: string }
  );

export interface Lesson {
  id: string;
  day: number; // 1..250 (0 = review session)
  problem: string;
  topic: string;
  teach: string[];
  questions: Question[];
}
