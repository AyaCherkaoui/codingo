import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const slidingWindow: Lesson[] = [
  make('Contains Duplicate II', {
    teach: ['Contains Duplicate II: are there two equal values at most k indexes apart?', 'Keep a set of the last k values (the window). If the new value is already in it, return true. Add it; if the window grows past k, drop the oldest.'],
    questions: [
      ch('[1,2,3,1], k = 3 ->', ['true', 'false'], 0, 'The two 1s are 3 apart.'),
      ch('[1,2,3,1,2,3], k = 2 ->', ['true', 'false'], 1, 'Equal values are 3 apart, more than 2.'),
      ord('Order the loop body', ['If nums[i] in window, return true', 'Add nums[i] to window', 'If window is bigger than k, remove nums[i - k]'], 'Check first, then slide.'),
    ],
  }),
  make('Best Time to Buy And Sell Stock', {
    teach: ['Best Time to Buy and Sell Stock: one buy, one later sell, maximize profit.', 'Track the lowest price so far. At each day, profit = price - lowest. Keep the best. O(n) time, O(1) space.'],
    questions: [
      ch('[7,1,5,3,6,4] max profit?', ['5', '6', '7', '3'], 0, 'Buy at 1, sell at 6.'),
      ch('[7,6,4,3,1] max profit?', ['0', '-1', '6', '1'], 0, 'Prices only fall, so do not trade.'),
      bl('Fill in the blank', 'low = min(low, p)\\nbest = max(best, p ___ low)', ['-', '+', '*'], '-', 'Profit is sell minus buy.'),
    ],
  }),
  make('Longest Substring Without Repeating Characters', {
    teach: ['Longest Substring Without Repeating Characters.', 'Grow the window to the right. When the new character is already inside, shrink from the left until it is gone. Track the best window length. A set (or last-seen index map) tells you what is inside.'],
    questions: [
      ch('"abcabcbb" ->', ['2', '3', '4', '8'], 1, '"abc".'),
      ch('"pwwkew" ->', ['2', '3', '4', '6'], 1, '"wke" (a substring, not a subsequence).'),
      ord('Order the loop body', ['While s[r] is in the set, remove s[l] and l += 1', 'Add s[r] to the set', 'best = max(best, r - l + 1)'], 'Fix the window first, then measure it.'),
    ],
  }),
  make('Longest Repeating Character Replacement', {
    teach: ['Replace at most k letters to get the longest run of one letter.', 'A window is valid if (window length - count of its most frequent letter) <= k. Expand right; if invalid, shrink left. Track the max frequency seen.'],
    questions: [
      ch('"AABABBA", k = 1 ->', ['3', '4', '5', '7'], 1, '"AABA" -> "AAAA" with one change.'),
      ch('Letters you must replace in a window =', ['length - maxFreq', 'maxFreq', 'length', 'k'], 0, 'Everything that is not the majority letter.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(26n²)'], 0, 'Each index enters and leaves once.'),
    ],
  }),
  make('Permutation In String', {
    teach: ['Does s2 contain a permutation of s1?', 'A permutation has the same letter counts. Slide a window of length len(s1) across s2 and compare letter counts each step. Update counts by adding the new letter and removing the old.'],
    questions: [
      ch('s1 = "ab", s2 = "eidbaooo" ->', ['true', 'false'], 0, '"ba" is a permutation of "ab".'),
      ch('Window size?', ['len(s1)', 'len(s2)', '26', 'variable'], 0, 'A permutation has the same length.'),
      ch('What do we compare at each step?', ['Letter counts', 'First letters', 'Hash of s2', 'Sorted s2'], 0, 'Equal counts means permutation.'),
    ],
  }),
  make('Minimum Size Subarray Sum', {
    teach: ['Shortest subarray whose sum is >= target (all numbers positive).', 'Expand right, adding to the sum. While the sum is >= target, record the length and shrink from the left. Positives guarantee shrinking lowers the sum.'],
    questions: [
      ch('target = 7, [2,3,1,2,4,3] ->', ['1', '2', '3', '4'], 1, '[4,3] has sum 7.'),
      ch('Why does this need positive numbers?', ['Shrinking always lowers the sum', 'Speed', 'Sorting', 'It does not'], 0, 'Negatives would break the window logic.'),
      ord('Order the loop', ['total += nums[r]', 'While total >= target: best = min(best, r - l + 1)', 'total -= nums[l]', 'l += 1'], 'Record, then shrink.'),
    ],
  }),
  make('Find K Closest Elements', {
    teach: ['Find K Closest Elements: in a sorted array, the k values closest to x.', 'The answer is a window of k consecutive elements. Binary search the window start in [0, n - k]: if x - arr[mid] > arr[mid + k] - x, move right.'],
    questions: [
      ch('[1,2,3,4,5], k = 4, x = 3 ->', ['[1,2,3,4]', '[2,3,4,5]', '[1,2,4,5]', '[3,4,5]'], 0, 'Tie goes to the smaller values.'),
      ch('The answer is always:', ['A contiguous window of size k', 'Any k values', 'The first k', 'A set'], 0, 'Sorted order keeps it contiguous.'),
      ch('Time with binary search?', ['O(log(n - k) + k)', 'O(n²)', 'O(n log n)', 'O(k²)'], 0, 'Search start, then copy k values.'),
    ],
  }),
  make('Minimum Window Substring', {
    teach: ['Smallest window of s that contains every letter of t (with counts).', 'Count needed letters. Expand right and track how many letters are satisfied. When all are satisfied, shrink from the left while still valid, recording the smallest window.'],
    questions: [
      ch('s = "ADOBECODEBANC", t = "ABC" ->', ['"ADOBEC"', '"BANC"', '"CODEBA"', '""'], 1, 'Shortest window containing A, B and C.'),
      ch('When do you shrink the window?', ['When it already contains all of t', 'When it is too small', 'Every step', 'Never'], 0, 'Only a valid window can be minimized.'),
      ch('Time complexity?', ['O(n + m)', 'O(n²)', 'O(nm)', 'O(2^n)'], 0, 'Each pointer moves at most n times.'),
    ],
  }),
  make('Sliding Window Maximum', {
    teach: ['Maximum of every window of size k.', 'Keep a deque of indices whose values are decreasing. Pop from the back while the new value is bigger. Pop from the front if it left the window. The front is always the max. O(n).'],
    questions: [
      ch('[1,3,-1,-3,5,3,6,7], k = 3 ->', ['[3,3,5,5,6,7]', '[1,3,5,6,7]', '[3,3,-1,5,6,7]', '[3,5,6,7]'], 0, 'Max of each window of 3.'),
      ch('Values in the deque are:', ['Decreasing', 'Increasing', 'Random', 'All equal'], 0, 'Smaller values behind a bigger one can never win.'),
      ch('Why is it O(n)?', ['Each index is pushed and popped once', 'Sorting', 'Hashing', 'It is O(nk)'], 0, 'Amortized.'),
    ],
  }),
];
