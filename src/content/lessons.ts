import { Lesson } from './types';
import { arraysHashing } from './arraysHashing';
import { twoPointers } from './twoPointers';
import { slidingWindow } from './slidingWindow';
import { binarySearch } from './binarySearch';
import { linkedList } from './linkedList';
import { stack } from './stack';

export const allLessons: Lesson[] = [...arraysHashing, ...twoPointers, ...slidingWindow, ...binarySearch, ...linkedList, ...stack];
export const lessonByDay = new Map<number, Lesson>(allLessons.map(l => [l.day, l]));
export const lessonById = new Map<string, Lesson>(allLessons.map(l => [l.id, l]));
