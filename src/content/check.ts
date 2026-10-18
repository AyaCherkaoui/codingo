// Compare typed code to an accepted answer, ignoring spacing, blank lines, trailing colons-spacing and quote style.
export function normCode(s: string): string {
  return s
    .replace(/#.*$/gm, '')                 // python comments
    .replace(/"/g, "'")                    // one quote style
    .replace(/\s+/g, ' ')                  // collapse whitespace
    .replace(/\s*([()[\]{},:=+\-*/<>!%&|^.])\s*/g, '$1') // no spaces around punctuation
    .trim();
}
export const codeMatches = (typed: string, expected: string[]) => {
  const t = normCode(typed);
  return t.length > 0 && expected.some(e => normCode(e) === t);
};
