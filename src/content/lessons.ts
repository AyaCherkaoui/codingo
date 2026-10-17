import { Lesson } from './types';
import { arraysHashing } from './arraysHashing';
import { twoPointers } from './twoPointers';

export const allLessons: Lesson[] = [...arraysHashing, ...twoPointers];
export const lessonByDay = new Map<number, Lesson>(allLessons.map(l => [l.day, l]));
export const lessonById = new Map<string, Lesson>(allLessons.map(l => [l.id, l]));
