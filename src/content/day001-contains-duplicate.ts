import { Lesson } from './types';

export const day1: Lesson = {
  id: 'day-001',
  day: 1,
  problem: 'Contains Duplicate',
  topic: 'Arrays & Hashing',
  teach: [
    'A hash set stores unique values and checks "have I seen this?" in O(1).',
    'Walk the array once. If a value is already in the set, you found a duplicate.',
  ],
  questions: [
    {
      type: 'choice',
      prompt: 'Which structure gives O(1) "seen before?" checks?',
      options: ['Array', 'Hash set', 'Linked list', 'Stack'],
      answer: 1,
      explain: 'Hash sets look up values in O(1) on average.',
    },
    {
      type: 'order',
      prompt: 'Put the algorithm in order',
      steps: ['Create empty set', 'Loop over nums', 'If n in set, return true', 'Add n to set', 'Return false'],
      explain: 'Check before adding, otherwise every value looks like a duplicate.',
    },
    {
      type: 'blank',
      prompt: 'Fill in the blank',
      code: 'seen = set()\nfor n in nums:\n    if n in ___:\n        return True',
      options: ['seen', 'nums', 'set'],
      answer: 'seen',
      explain: 'We check the set of values we have already seen.',
    },
    {
      type: 'bug',
      prompt: 'Tap the buggy line',
      lines: ['seen = set()', 'for n in nums:', '    seen.add(n)', '    if n in seen:', '        return True', 'return False'],
      buggyLine: 2,
      explain: 'Adding before checking makes every number look like a duplicate.',
    },
  ],
};
