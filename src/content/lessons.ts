import { Lesson, Question } from './types';
import { allEntries } from './curriculum';

type Body = { teach: string[]; questions: Question[] };
const make = (problem: string, b: Body): Lesson => {
  const e = allEntries.find(x => x.problem === problem);
  if (!e) throw new Error(`Unknown problem: ${problem}`);
  return { id: e.id, day: e.day, problem, topic: e.topic, ...b };
};

const days: Lesson[] = [
  make('Concatenation of Array', {
    teach: [
      'Concatenation of Array: return an array that is nums followed by nums again.',
      'In Python, nums + nums does it. Or loop twice and append. O(n) time.',
    ],
    questions: [
      { type: 'choice', prompt: 'nums = [1,2,1]. What is the answer?', options: ['[1,2,1]', '[1,2,1,1,2,1]', '[2,4,2]', '[1,1,2,2,1,1]'], answer: 1, explain: 'The array repeated back to back.' },
      { type: 'choice', prompt: 'Length of the result for n elements?', options: ['n', '2n', 'n²', 'n+1'], answer: 1, explain: 'Two copies of n elements.' },
      { type: 'blank', prompt: 'Fill in the blank', code: 'def getConcatenation(nums):\n    return nums ___ nums', options: ['+', '*', '-'], answer: '+', explain: 'Lists join with + in Python.' },
    ],
  }),
  make('Contains Duplicate', {
    teach: [
      'A hash set stores unique values and checks "have I seen this?" in O(1).',
      'Walk the array once. If a value is already in the set, you found a duplicate.',
    ],
    questions: [
      { type: 'choice', prompt: 'Which structure gives O(1) "seen before?" checks?', options: ['Array', 'Hash set', 'Linked list', 'Stack'], answer: 1, explain: 'Hash sets look up values in O(1) on average.' },
      { type: 'order', prompt: 'Put the algorithm in order', steps: ['Create empty set', 'Loop over nums', 'If n in set, return true', 'Add n to set', 'Return false'], explain: 'Check before adding, otherwise every value looks like a duplicate.' },
      { type: 'blank', prompt: 'Fill in the blank', code: 'seen = set()\nfor n in nums:\n    if n in ___:\n        return True', options: ['seen', 'nums', 'set'], answer: 'seen', explain: 'We check the set of values we have already seen.' },
      { type: 'bug', prompt: 'Tap the buggy line', lines: ['seen = set()', 'for n in nums:', '    seen.add(n)', '    if n in seen:', '        return True', 'return False'], buggyLine: 2, explain: 'Adding before checking makes every number look like a duplicate.' },
    ],
  }),
  make('Valid Anagram', {
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
  make('Two Sum', {
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
  make('Longest Common Prefix', {
    teach: [
      'Longest Common Prefix: the longest start that every string shares.',
      'Take the first string as the candidate. Compare it with each other string and shorten it until it matches. O(total characters).',
    ],
    questions: [
      { type: 'choice', prompt: '["flower","flow","flight"] -> ?', options: ['"flow"', '"fl"', '"f"', '""'], answer: 1, explain: 'All three start with "fl".' },
      { type: 'choice', prompt: '["dog","car"] -> ?', options: ['"d"', '"c"', '"" (empty)', '"dog"'], answer: 2, explain: 'No shared start, so the answer is empty.' },
      { type: 'order', prompt: 'Order the algorithm', steps: ['Set prefix to the first string', 'Loop over the other strings', 'While string does not start with prefix, trim prefix', 'Return prefix'], explain: 'Shrink the prefix until each string agrees.' },
    ],
  }),
  make('Group Anagrams', {
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
  make('Top K Frequent Elements', {
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
