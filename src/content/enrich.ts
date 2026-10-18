import { Lesson, Question, WriteLevel } from './types';
import { FIXES, SOLUTIONS } from './solutions';

const MAX_FULL_LINES = 10; // typing more than this on a phone is no fun

// The last "fill in the blank" of a lesson holds its key code; turn it into a typing task.
export function deriveWrite(lesson: Lesson, pos: number): Question | null {
  if (lesson.questions.some(q => q.type === 'write')) return null;
  const blanks = lesson.questions.filter((q): q is Extract<Question, { type: 'blank' }> => q.type === 'blank' && q.code.includes('___'));
  const b = blanks[blanks.length - 1];
  if (!b) return deriveFromOrder(lesson, pos) ?? deriveFromFix(lesson, pos) ?? deriveFromSolution(lesson, pos);
  const filled = b.code.replace('___', b.answer);
  const lines = filled.split('\n');
  let level: WriteLevel = pos < 0.34 ? 'part' : pos < 0.67 ? 'line' : 'full';
  if (level === 'full' && lines.length > MAX_FULL_LINES) level = 'line';
  const hint = (s: string) => `It starts with: ${s.trim().slice(0, 14)}…`;
  const code = b.code.split('\n');
  const li = code.findIndex(l => l.includes('___'));

  if (level === 'part') return {
    type: 'write', level, prompt: 'Now you code it: type the missing part',
    starter: b.code, expected: [b.answer], solution: filled,
    explain: `${b.explain} Full code:\n${filled}`, hint: hint(b.answer),
  };
  if (level === 'line') {
    const line = lines[li].trim();
    const starter = code.map((l, i) => (i === li ? `${l.match(/^\s*/)![0]}# <- type this line` : l)).join('\n');
    return {
      type: 'write', level, prompt: 'Now you code it: type the whole missing line',
      starter, expected: [line], solution: filled,
      explain: `${b.explain} Full code:\n${filled}`, hint: hint(line),
    };
  }
  return {
    type: 'write', level, prompt: 'Now you code it: write the whole snippet from memory',
    expected: [filled], solution: filled,
    explain: `${b.explain} Full code:\n${filled}`, hint: hint(lines[0]),
  };
}

// No fill-in-the-blank? A code "order" question holds the whole snippet, so ask for it (or one of its lines).
function deriveFromOrder(lesson: Lesson, pos: number): Question | null {
  const o = [...lesson.questions].reverse().find((q): q is Extract<Question, { type: 'order' }> => q.type === 'order' && !!q.code);
  if (!o) return null;
  const steps = autoIndent(o.steps);
  const code = steps.join('\n');
  const hint = (t: string) => `It starts with: ${t.trim().slice(0, 14)}…`;
  if (pos >= 0.67 && steps.length <= MAX_FULL_LINES) return {
    type: 'write', level: 'full', prompt: 'Now you code it: write the whole snippet from memory',
    expected: [code], solution: code, explain: `${o.explain} Full code:\n${code}`, hint: hint(steps[0]),
  };
  const i = Math.floor(steps.length / 2);
  const line = steps[i].trim();
  const starter = steps.map((l, k) => (k === i ? `${l.match(/^\s*/)![0]}# <- type this line` : l)).join('\n');
  return {
    type: 'write', level: 'line', prompt: 'Now you code it: type the missing line',
    starter, expected: [line], solution: code, explain: `${o.explain} Full code:\n${code}`, hint: hint(line),
  };
}

const hintOf = (t: string) => `It starts with: ${t.trim().slice(0, 14)}…`;
const indentOf = (l: string) => l.match(/^\s*/)![0];

// "Tap the bug" lessons: the learner types the corrected line(s), or later the whole corrected snippet.
function deriveFromFix(lesson: Lesson, pos: number): Question | null {
  const fx = FIXES.get(lesson.id);
  const bq = lesson.questions.find((q): q is Extract<Question, { type: 'bug' }> => q.type === 'bug');
  if (!fx || !bq) return null;
  const { fix, at = bq.buggyLine, span = 1 } = typeof fx === 'string' ? { fix: fx } : fx;
  const base = indentOf(bq.lines[at]);
  const repl = fix.split('\n').map(l => base + l);
  const fixed = [...bq.lines.slice(0, at), ...repl, ...bq.lines.slice(at + span)];
  const code = fixed.join('\n');
  const explain = `${bq.explain} Corrected code:\n${code}`;
  if (pos >= 0.67 && fixed.length <= MAX_FULL_LINES) return {
    type: 'write', level: 'full', prompt: 'Now fix it: write the whole corrected snippet',
    expected: [code], solution: code, explain, hint: hintOf(fixed[0]),
  };
  const starter = [...bq.lines.slice(0, at), `${base}# <- type the corrected line${repl.length > 1 ? 's' : ''}`, ...bq.lines.slice(at + span)].join('\n');
  return {
    type: 'write', level: 'line', prompt: `Now fix it: type the corrected line${repl.length > 1 ? 's' : ''}`,
    starter, expected: [fix], solution: code, explain, hint: hintOf(fix),
  };
}

// Reference snippet: type its key line, or later the whole thing.
function deriveFromSolution(lesson: Lesson, pos: number): Question | null {
  const sol = SOLUTIONS.get(lesson.id);
  if (!sol) return null;
  const lines = sol.code.split('\n');
  const explain = `Full solution:\n${sol.code}`;
  if (pos >= 0.67 && lines.length <= MAX_FULL_LINES) return {
    type: 'write', level: 'full', prompt: 'Now you code it: write the whole solution from memory',
    expected: [sol.code], solution: sol.code, explain, hint: hintOf(lines[0]),
  };
  const i = lines.findIndex(l => l.trim() === sol.key);
  if (i < 0) return null;
  const starter = lines.map((l, k) => (k === i ? `${indentOf(l)}# <- type this line` : l)).join('\n');
  return {
    type: 'write', level: 'line', prompt: 'Now you code it: type the key line',
    starter, expected: [sol.key], solution: sol.code, explain, hint: hintOf(sol.key),
  };
}

// "order the code" steps are stored without indentation: restore Python-style indentation for display.
function autoIndent(steps: string[]): string[] {
  if (steps.some(l => /^\s/.test(l)) || !steps.some(l => l.trimEnd().endsWith(':'))) return steps;
  let depth = 0;
  return steps.map((l, i) => {
    const t = l.trim();
    if (/^(else|elif|except|finally)\b/.test(t)) depth = Math.max(0, depth - 1);
    if (i === steps.length - 1 && t.startsWith('return ')) depth = 0;
    const out = '    '.repeat(depth) + t;
    if (t.endsWith(':')) depth++;
    return out;
  });
}
