import { describe, it, expect } from 'vitest';
import { allLessons as lessons, lessonByDay, lessonById } from '../src/content/lessons';
import { allEntries } from '../src/content/curriculum';

describe('curriculum content', () => {
  it('has all 250 lessons, one per day, matching the curriculum', () => {
    expect(allEntries.length).toBe(250);
    expect(lessons.length).toBe(250);
    expect(lessonByDay.size).toBe(250);
    expect(lessonById.size).toBe(250);
    for (const e of allEntries) expect(lessonById.get(e.id)?.day).toBe(e.day);
  });
  it('every lesson has teach cards and valid questions', () => {
    for (const l of lessons) {
      const where = `day ${l.day} ${l.problem}`;
      expect(l.teach.length, where).toBeGreaterThan(0);
      expect(l.questions.length, where).toBeGreaterThanOrEqual(3);
      for (const q of l.questions) {
        expect(q.prompt, where).toBeTruthy(); expect(q.explain, where).toBeTruthy();
        if (q.type === 'choice') {
          expect(q.options.length, where).toBeGreaterThanOrEqual(2);
          expect(q.answer, where).toBeGreaterThanOrEqual(0); expect(q.answer, where).toBeLessThan(q.options.length);
          expect(new Set(q.options).size, `${where} duplicate options`).toBe(q.options.length);
        } else if (q.type === 'blank') {
          expect(q.options, where).toContain(q.answer);
          expect(new Set(q.options).size, `${where} duplicate options`).toBe(q.options.length);
          expect(q.code, where).toContain('___');
        } else if (q.type === 'bug') {
          expect(q.buggyLine, where).toBeGreaterThanOrEqual(0); expect(q.buggyLine, where).toBeLessThan(q.lines.length);
        } else if (q.type === 'order') {
          expect(q.steps.length, where).toBeGreaterThanOrEqual(2);
          expect(new Set(q.steps).size, `${where} duplicate steps`).toBe(q.steps.length);
        }
      }
    }
  });
});
