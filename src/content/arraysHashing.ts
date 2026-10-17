import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const arraysHashing: Lesson[] = [
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

  make('Remove Element', {
    teach: ['Remove Element: delete every val in place and return how many elements remain.', 'Keep a write pointer k. Copy each element that is not val to nums[k], then k += 1. Order of the rest does not matter. O(n) time, O(1) space.'],
    questions: [
      ch('nums = [3,2,2,3], val = 3. What is k?', ['1', '2', '3', '4'], 1, 'Two elements (2, 2) remain.'),
      bl('Fill in the blank', 'k = 0\nfor x in nums:\n    if x ___ val:\n        nums[k] = x\n        k += 1\nreturn k', ['!=', '==', '<'], '!=', 'Keep everything that is NOT val.', 'We want to keep the other values.'),
      ord('Build the solution', ['k = 0', 'for x in nums:', '    if x != val:', '        nums[k] = x', '        k += 1', 'return k'], 'Write pointer only moves when we keep a value.', true),
    ],
  }),
  make('Majority Element', {
    teach: ['Majority Element: the value that appears more than n/2 times (it always exists).', 'Boyer-Moore voting: keep a candidate and a count. Same value +1, different value -1, count 0 means pick a new candidate. The majority can never be fully cancelled out. O(n) time, O(1) space.'],
    questions: [
      ch('[2,2,1,1,2] majority element?', ['1', '2', '3', 'none'], 1, '2 appears 3 of 5 times.'),
      ch('Space used by Boyer-Moore?', ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], 2, 'Just a candidate and a count.'),
      ord('Order the algorithm', ['count = 0', 'If count == 0, candidate = n', 'If n == candidate count += 1, else count -= 1', 'Return candidate'], 'Check for zero before voting.'),
    ],
  }),
  make('Design HashSet', {
    teach: ['Design HashSet: build add, remove and contains without a built-in set.', 'Use an array of buckets. Index = key % size. Keys that share an index live in the same bucket list (chaining).'],
    questions: [
      ch('Two keys land on the same index. What handles it?', ['Chaining (a list per bucket)', 'Throw an error', 'Overwrite the old key', 'Resize to 1'], 0, 'Each bucket stores a small list.'),
      ch('key = 1234, size = 1000. Which index?', ['1', '234', '1234', '999'], 1, '1234 % 1000 = 234.'),
      bl('Fill in the blank', 'def index(self, key):\n    return key ___ self.size', ['%', '//', '+'], '%', 'Modulo keeps the index inside the array.'),
    ],
  }),
  make('Design HashMap', {
    teach: ['Design HashMap: same bucket idea as the HashSet, but each entry is a (key, value) pair.', 'put must update the value if the key already exists. get returns -1 when the key is missing.'],
    questions: [
      ch('put(1,5), put(1,9), get(1) returns?', ['5', '9', '-1', '14'], 1, 'The second put overwrote the value.'),
      ch('get on a missing key returns?', ['0', 'None', '-1', 'error'], 2, 'LeetCode asks for -1.'),
      ord('Order the put steps', ['Compute bucket index', 'Search the bucket for the key', 'If found, update its value', 'Otherwise append (key, value)'], 'Search first so you never store duplicates.'),
    ],
  }),
  make('Sort an Array', {
    teach: ['Sort an Array: sort without built-in sort, in O(n log n).', 'Merge sort: split in half, sort each half, merge two sorted halves. Heap sort also works.'],
    questions: [
      ch('Which sort is O(n log n) in the worst case?', ['Bubble sort', 'Insertion sort', 'Merge sort', 'Selection sort'], 2, 'Merge sort always splits evenly.'),
      ch('Base case of merge sort?', ['length 0 only', 'length <= 1', 'length 2', 'no base case'], 1, 'An array of 0 or 1 items is already sorted.'),
      ord('Order merge sort', ['Split array in half', 'Sort left half recursively', 'Sort right half recursively', 'Merge the two sorted halves'], 'Divide, conquer, combine.'),
    ],
  }),
  make('Sort Colors', {
    teach: ['Sort Colors: sort an array of 0s, 1s and 2s in place, in one pass.', 'Dutch flag: l marks where the next 0 goes, r where the next 2 goes, i scans. Swap 0s left, 2s right.', 'After swapping with r, do NOT advance i: the swapped-in value is unchecked.'],
    questions: [
      ch('After swapping a 2 to the right, do we advance i?', ['Yes', 'No, the new value is unchecked', 'Only if l moved', 'Always twice'], 1, 'The value we swapped in could be a 0 or 2.'),
      bug('Tap the buggy line', ['if nums[i] == 0:', '    swap(nums, l, i); l += 1; i += 1', 'elif nums[i] == 2:', '    swap(nums, i, r); r -= 1; i += 1', 'else:', '    i += 1'], 3, 'Do not advance i after swapping with r.'),
      ch('Why can one pass work?', ['Array is sorted', 'Only 3 distinct values', 'Array is small', 'It cannot'], 1, 'Three values means three regions.'),
    ],
  }),
  make('Encode and Decode Strings', {
    teach: ['Encode and Decode Strings: turn a list of strings into one string and back.', 'Length-prefix each word: "neet" becomes "4#neet". The length says exactly how many characters to read, so any character (even # or ,) is safe.'],
    questions: [
      ch('Encode ["ab","c"] ->', ['"2#ab1#c"', '"ab,c"', '"2ab1c"', '"ab#c"'], 0, 'length + # + word, repeated.'),
      ch('Why not join with a comma?', ['Slower', 'Words may contain commas', 'Commas are reserved', 'It works fine'], 1, 'A delimiter can appear inside a word.'),
      ord('Order the decode steps', ['Read digits until #', 'Convert digits to length L', 'Take next L characters as a word', 'Move past the word and repeat'], 'Always trust the length, not the content.'),
    ],
  }),
  make('Range Sum Query 2D Immutable', {
    teach: ['Range Sum Query 2D: many sum queries over a rectangle of a fixed matrix.', 'Precompute prefix sums p where p[r+1][c+1] is the sum of the rectangle from (0,0) to (r,c). Each query is then O(1).'],
    questions: [
      ch('Time per query after precomputing?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Four lookups.'),
      bl('Fill in the blank', 'return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] ___ p[r1][c1]', ['+', '-', '*'], '+', 'The top-left corner was subtracted twice, so add it back.'),
      ch('Why add back the top-left rectangle?', ['It was subtracted twice', 'It was never counted', 'It is the answer', 'No reason'], 0, 'Inclusion-exclusion.'),
    ],
  }),
  make('Product of Array Except Self', {
    teach: ['Product of Array Except Self: result[i] = product of all other elements, no division.', 'Pass 1: result[i] = product of everything to the left. Pass 2 (right to left): multiply by a running product of everything to the right. O(n) time, O(1) extra space.'],
    questions: [
      ch('[1,2,3,4] ->', ['[24,12,8,6]', '[10,10,10,10]', '[1,2,6,24]', '[24,24,24,24]'], 0, '24/1, 24/2, 24/3, 24/4.'),
      ch('Why not divide by the total product?', ['Too slow', 'Zeros break it (and division is not allowed)', 'It is fine', 'Overflow only'], 1, 'A zero makes division impossible.'),
      ord('Order the right-to-left pass', ['suffix = 1', 'Go from the last index down', 'res[i] *= suffix', 'suffix *= nums[i]'], 'Use suffix before including nums[i].'),
    ],
  }),
  make('Valid Sudoku', {
    teach: ['Valid Sudoku: check that no row, column or 3x3 box repeats a digit (you do not solve it).', 'Keep sets for each row, column and box. Box index = (r // 3) * 3 + c // 3.'],
    questions: [
      ch('How many sets do you track?', ['9', '18', '27', '81'], 2, '9 rows + 9 columns + 9 boxes.'),
      ch('Box index for r = 4, c = 7?', ['2', '5', '7', '4'], 1, '(4//3)*3 + 7//3 = 3 + 2 = 5.'),
      ch('Do you need to solve the puzzle?', ['Yes', 'No, only check for repeats', 'Only the first row', 'Only boxes'], 1, 'Only validate the filled cells.'),
    ],
  }),
  make('Longest Consecutive Sequence', {
    teach: ['Longest Consecutive Sequence: longest run like 1,2,3,4 in an unsorted array, in O(n).', 'Put everything in a set. Only start counting from numbers where n - 1 is NOT in the set (a true start). Then walk up n+1, n+2...'],
    questions: [
      ch('[100,4,200,1,3,2] ->', ['3', '4', '5', '6'], 1, '1,2,3,4.'),
      bl('Fill in the blank', 'for n in num_set:\n    if n - 1 ___ num_set:\n        length = 1', ['not in', 'in', '=='], 'not in', 'Only a sequence start has no n - 1.'),
      ch('Why is this O(n) and not O(n²)?', ['Each number is walked at most once', 'Sorting is used', 'Set is sorted', 'It is O(n²)'], 0, 'We only walk from starts.'),
    ],
  }),
  make('Best Time to Buy And Sell Stock II', {
    teach: ['Stock II: you may buy and sell many times (one share at a time).', 'Greedy: add every positive day-to-day increase. Every up-move can be captured.'],
    questions: [
      ch('[7,1,5,3,6,4] max profit?', ['5', '6', '7', '8'], 2, '(5-1) + (6-3) = 7.'),
      bl('Fill in the blank', 'for i in range(1, len(prices)):\n    profit += max(0, prices[i] ___ prices[i - 1])', ['-', '+', '*'], '-', 'Today minus yesterday, ignoring drops.'),
      ch('When do you add to profit?', ['Price went up', 'Price went down', 'Always', 'Never'], 0, 'Only count gains.'),
    ],
  }),
  make('Majority Element II', {
    teach: ['Majority Element II: every value that appears more than n/3 times.', 'At most 2 values can exceed n/3. Boyer-Moore with two candidates and two counts, then a second pass to verify.'],
    questions: [
      ch('Max number of answers?', ['1', '2', '3', 'n/3'], 1, 'Three values above n/3 would exceed n.'),
      ch('Why a second pass?', ['Candidates must be verified', 'To sort', 'To count zeros', 'No need'], 0, 'Voting only finds candidates.'),
      ch('[3,2,3] ->', ['[2]', '[3]', '[2,3]', '[]'], 1, '3 appears 2 > 3/3 times.'),
    ],
  }),
  make('Subarray Sum Equals K', {
    teach: ['Subarray Sum Equals K: count contiguous subarrays summing to k (negatives allowed).', 'Prefix sum + hash map. If prefix - k was seen before, those earlier spots start subarrays that end here. Start the map with {0: 1}.'],
    questions: [
      ch('[1,1,1], k = 2 ->', ['1', '2', '3', '0'], 1, '[1,1] twice.'),
      ch('Why start the map with {0: 1}?', ['Subarrays starting at index 0', 'Avoid KeyError only', 'No reason', 'Count zeros'], 0, 'An empty prefix has sum 0.'),
      bl('Fill in the blank', 'count += seen.get(prefix - ___, 0)', ['k', 'prefix', '0'], 'k', 'We need an earlier prefix equal to prefix - k.'),
    ],
  }),
  make('First Missing Positive', {
    teach: ['First Missing Positive: smallest positive integer not in the array, O(n) time, O(1) space.', 'The answer is in 1..n+1. Cyclic sort: put value x at index x - 1 by swapping (ignore values outside 1..n). Then the first index where nums[i] != i + 1 gives the answer.'],
    questions: [
      ch('[3,4,-1,1] ->', ['1', '2', '3', '5'], 1, 'After placing, index 1 is missing 2.'),
      ch('Answer always lies in?', ['1..n+1', '0..n', '1..2n', 'any integer'], 0, 'n numbers can fill at most 1..n.'),
      ch('Where does value 3 belong?', ['index 0', 'index 2', 'index 3', 'index 4'], 1, 'Value x goes to index x - 1.'),
    ],
  }),
];
