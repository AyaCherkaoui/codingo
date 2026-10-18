import { Lesson } from './types';
import { deriveWrite } from './enrich';
import { units } from './curriculum';
import { richArraysHashing } from './rich/arraysHashing';
import { arraysHashing } from './arraysHashing';
import { twoPointers } from './twoPointers';
import { slidingWindow } from './slidingWindow';
import { binarySearch } from './binarySearch';
import { linkedList } from './linkedList';
import { stack } from './stack';
import { trees } from './trees';
import { tries } from './tries';
import { backtracking } from './backtracking';
import { heap } from './heap';
import { graphs } from './graphs';
import { advancedGraphs } from './advancedGraphs';
import { dp1 } from './dp1';
import { dp2 } from './dp2';
import { greedy } from './greedy';
import { intervals } from './intervals';
import { bit } from './bit';
import { math } from './math';

// Guided (rich) lessons replace the plain version of the same problem.
const rich = new Map<string, Lesson>(richArraysHashing.map(l => [l.id, l]));
const plain: Lesson[] = [...arraysHashing, ...twoPointers, ...slidingWindow, ...binarySearch, ...linkedList, ...stack, ...trees, ...tries, ...backtracking, ...heap, ...graphs, ...advancedGraphs, ...dp1, ...dp2, ...greedy, ...intervals, ...bit, ...math];
const base: Lesson[] = plain.map(l => rich.get(l.id) ?? l);
// Every lesson ends with a coding task whose size grows through each unit: the missing part -> a line -> the whole snippet.
const posInUnit = new Map<string, number>(units.flatMap(u => u.entries.map((e, i) => [e.id, u.entries.length > 1 ? i / (u.entries.length - 1) : 0] as [string, number])));
export const allLessons: Lesson[] = base.map(l => { const w = deriveWrite(l, posInUnit.get(l.id) ?? 0); return w ? { ...l, questions: [...l.questions, w] } : l; });
export const lessonByDay = new Map<number, Lesson>(allLessons.map(l => [l.day, l]));
export const lessonById = new Map<string, Lesson>(allLessons.map(l => [l.id, l]));
