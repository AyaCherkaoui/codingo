import { describe, it, expect } from 'vitest';
import { codeMatches, normCode } from '../src/content/check';
import { allLessons } from '../src/content/lessons';
import { buildExam, buildCodeReview, unitDone } from '../src/exams';
import { units } from '../src/content/curriculum';

describe('typed code check', () => {
  it('ignores spacing and quote style', () => {
    expect(codeMatches('need=target-x', ['need = target - x'])).toBe(true);
    expect(codeMatches('if  need in seen :', ['if need in seen:'])).toBe(true);
    expect(codeMatches('d["a"]', ["d['a']"])).toBe(true);
  });
  it('rejects different code', () => {
    expect(codeMatches('need = x - target', ['need = target - x'])).toBe(false);
    expect(codeMatches('', ['x'])).toBe(false);
    expect(normCode('a  b')).toBe('a b');
  });
  it('does not merge words', () => {
    expect(codeMatches('notin', ['not in'])).toBe(false);
  });
});

describe('write tasks grow with the unit', () => {
  it('uses part -> line -> full across a unit', () => {
    const u = units.find(x => x.topic === 'Trees')!;
    const levels = u.entries.map(e => allLessons.find(l => l.id === e.id)!.questions.at(-1)).map(q => (q as any).level);
    expect(levels[0]).toBe('part');
    expect(new Set(levels).size).toBeGreaterThanOrEqual(2);
  });
});

describe('exams and code review', () => {
  const u0 = units[0];
  const done = u0.entries.map(e => e.id);
  it('opens a unit exam only when every lesson in it is done', () => {
    expect(unitDone(u0.topic, done.slice(1))).toBe(false);
    expect(unitDone(u0.topic, done)).toBe(true);
  });
  it('builds a cumulative exam that mixes earlier units and ends with code', () => {
    const second = units[1];
    const completed = [...done, ...second.entries.map(e => e.id)];
    const ex = buildExam(second.topic, completed, 12)!;
    expect(ex.lesson.questions.length).toBe(12);
    const firstUnit = new Set(done);
    expect(ex.ids.some(id => firstUnit.has(id)), 'has questions from earlier unit').toBe(true);
    expect(ex.ids.some(id => !firstUnit.has(id)), 'has questions from this unit').toBe(true);
  });
  it('only uses completed lessons', () => {
    const ex = buildExam(u0.topic, done.slice(0, 2), 12)!;
    expect(ex.ids.every(id => done.slice(0, 2).includes(id))).toBe(true);
  });
  it('code review only contains code questions', () => {
    const r = buildCodeReview(done, 8)!;
    for (const q of r.lesson.questions) expect(['write', 'blank', 'bug', 'order']).toContain(q.type);
  });
  it('returns null with nothing to review', () => {
    expect(buildCodeReview([])).toBeNull();
    expect(buildExam(u0.topic, [])).toBeNull();
  });
});
