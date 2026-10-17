export type Question =
  | { type: 'choice'; prompt: string; options: string[]; answer: number; explain: string }
  | { type: 'order'; prompt: string; steps: string[]; explain: string } // steps in correct order
  | { type: 'blank'; prompt: string; code: string; options: string[]; answer: string; explain: string }
  | { type: 'bug'; prompt: string; lines: string[]; buggyLine: number; explain: string };

export interface Lesson {
  id: string;
  day: number; // 1..250
  problem: string; // e.g. "Two Sum"
  topic: string; // e.g. "Arrays & Hashing"
  teach: string[]; // short cards
  questions: Question[];
}
