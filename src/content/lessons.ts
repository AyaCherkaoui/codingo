import { Lesson } from './types';
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

export const allLessons: Lesson[] = [...arraysHashing, ...twoPointers, ...slidingWindow, ...binarySearch, ...linkedList, ...stack, ...trees, ...tries, ...backtracking, ...heap, ...graphs, ...advancedGraphs, ...dp1, ...dp2];
export const lessonByDay = new Map<number, Lesson>(allLessons.map(l => [l.day, l]));
export const lessonById = new Map<string, Lesson>(allLessons.map(l => [l.id, l]));
