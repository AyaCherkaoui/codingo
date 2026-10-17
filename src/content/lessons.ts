import { Lesson, Question } from './types';
import { allEntries } from './curriculum';
import { day1 } from './day001-contains-duplicate';

type Body = { teach: string[]; questions: Question[] };
const make = (day: number, b: Body): Lesson => {
  const e = allEntries[day - 1];
  return { id: e.id, day, problem: e.problem, topic: e.topic, ...b };
};

const days: Lesson[] = [
  day1,
  make(2, {
    teach: [
      'Two strings are anagrams if they use exactly the same letters with the same counts.',
      'Count letters in both strings (hash map or 26-slot array) and compare the counts. O(n) time.',
    ],
    questions: [
      { type: 'choice', prompt: 'Which strings are anagrams?', options: ['"rat" and "car"', '"listen" and "silent"', '"aab" and "abb"', '"a" and "ab"'], answer: 1, explain: 'Same letters, same counts.' },
      { type: 'choice', prompt: 'First quick check before counting?', options: ['Sort the string', 'Compare lengths', 'Reverse it', 'Nothing'], answer: 1, explain: 'Different lengths can never be anagrams.' },
      { type: 'order', prompt: 'Order the algorithm', steps: ['If lengths differ, return false', 'Count chars of s', 'Subtract counts using t', 'Return true if all counts are 0'], explain: 'Count up with s, count down with t.' },
      { type: 'blank', prompt: 'Fill in the blank', code: 'count = {}\nfor ch in s:\n    count[ch] = count.get(ch, ___) + 1', options: ['0', '1', 'None'], answer: '0', explain: 'A missing letter starts at 0.' },
    ],
  }),
  make(3, {
    teach: [
      'Two Sum: find two indices whose values add to target.',
      'For each n, the partner you need is target - n. Store seen values in a hash map {value: index}.',
      'One pass, O(n) time, O(n) space.',
    ],
    questions: [
      { type: 'choice', prompt: 'Brute force time complexity?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], answer: 2, explain: 'Two nested loops over all pairs.' },
      { type: 'choice', prompt: 'What does the hash map store?', options: ['index -> value', 'value -> index', 'target -> index', 'value -> count'], answer: 1, explain: 'We look up a needed value and return its index.' },
      { type: 'blank', prompt: 'Fill in the blank', code: 'need = target - n\nif need in ___:\n    return [seen[need], i]', options: ['seen', 'nums', 'target'], answer: 'seen', explain: 'Check the map of earlier values.' },
      { type: 'bug', prompt: 'Tap the buggy line', lines: ['seen = {}', 'for i, n in enumerate(nums):', '    seen[n] = i', '    if target - n in seen:', '        return [seen[target - n], i]'], buggyLine: 2, explain: 'Adding first lets n pair with itself. Check first, then add.' },
    ],
  }),
  make(4, {
    teach: [
      'Group Anagrams: bucket words that are anagrams of each other.',
      'Anagrams share a key: the sorted word, or a 26-count tuple. Use a dict mapping key -> list of words.',
    ],
    questions: [
      { type: 'choice', prompt: 'A good key for "eat", "tea", "ate"?', options: ['Length', 'First letter', 'Sorted letters "aet"', 'Last letter'], answer: 2, explain: 'All three sort to "aet".' },
      { type: 'choice', prompt: 'Why not use a list as a dict key in Python?', options: ['Too slow', 'Lists are not hashable', 'Lists are too long', 'It works fine'], answer: 1, explain: 'Use a tuple instead.' },
      { type: 'order', prompt: 'Order the algorithm', steps: ['Make empty dict of lists', 'Loop over words', 'Compute key for the word', 'Append word to dict[key]', 'Return dict values'], explain: 'Build the groups, then return them.' },
    ],
  }),
  make(5, {
    teach: [
      'Top K Frequent: return the k most common values.',
      'Count with a hash map, then bucket sort: index = frequency, value = list of numbers. Walk buckets from the highest frequency down. O(n).',
    ],
    questions: [
      { type: 'choice', prompt: 'Max possible frequency of a number in an array of size n?', options: ['1', 'k', 'n', 'n²'], answer: 2, explain: 'So buckets of size n+1 are enough.' },
      { type: 'choice', prompt: 'Why bucket sort over sorting by count?', options: ['Simpler', 'O(n) instead of O(n log n)', 'Uses less code', 'No reason'], answer: 1, explain: 'Frequencies are bounded by n.' },
      { type: 'order', prompt: 'Order the algorithm', steps: ['Count frequencies', 'Place numbers into buckets by count', 'Walk buckets from high to low', 'Stop after k numbers'], explain: 'Counting, bucketing, collecting.' },
    ],
  }),
];

export const lessonByDay = new Map<number, Lesson>(days.map(l => [l.day, l]));
