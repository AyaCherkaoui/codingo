import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const slidingWindow: Lesson[] = [
  make('Contains Duplicate II', {
    teach: ['Contains Duplicate II: are there two equal values at most k indexes apart?', 'Keep a set of the last k values (the window). If the new value is already in it, return true. Add it; if the window grows past k, drop the oldest.'],
    questions: [
      ch('[1,2,3,1], k = 3 ->', ['true', 'false'], 0, 'The two 1s are 3 apart.', 'Subtract the indexes of the two equal values.'),
      ch('[1,2,3,1,2,3], k = 2 ->', ['true', 'false'], 1, 'Equal values are 3 apart, more than 2.', 'Find the closest pair of equal values and compare their distance to k.'),
      ord('Order the loop body', ['If nums[i] in window, return true', 'Add nums[i] to window', 'If window is bigger than k, remove nums[i - k]'], 'Check first, then slide.', false, 'Look before you insert, and trim last.'),
      bl('Fill in the blank', 'for i in range(len(nums)):\n    if nums[i] in window: return True\n    window.add(nums[i])\n    if len(window) ___ k:\n        window.remove(nums[i - k])', ['>', '>=', '<'], '>', 'The window may hold k values, so it only shrinks when its size exceeds k.', 'The window is allowed to hold exactly k values.'),
    ],
  }),
  make('Best Time to Buy And Sell Stock', {
    teach: ['Best Time to Buy and Sell Stock: one buy, one later sell, maximize profit.', 'Track the lowest price so far. At each day, profit = price - lowest. Keep the best. O(n) time, O(1) space.'],
    questions: [
      ch('[7,1,5,3,6,4] max profit?', ['5', '6', '7', '3'], 0, 'Buy at 1, sell at 6.', 'Buy low, then sell at a later high.'),
      ch('[7,6,4,3,1] max profit?', ['0', '-1', '6', '1'], 0, 'Prices only fall, so do not trade.', 'What if no trade makes money?'),
      bl('Fill in the blank', 'low = min(low, p)\nbest = max(best, p ___ low)', ['-', '+', '*'], '-', 'Profit is sell minus buy.', 'How do you compute profit from a buy and a sell price?'),
      bug('Find the bug', ['low = prices[0]', 'best = 0', 'for p in prices:', '    best = max(best, p - low)', '    low = max(low, p)', 'return best'], 4, 'The buy price should be the cheapest so far, so use min(low, p). With max it tracks the highest price and profit stays 0.', 'We want the cheapest buy day seen so far.'),
    ],
  }),
  make('Longest Substring Without Repeating Characters', {
    teach: ['Longest Substring Without Repeating Characters.', 'Grow the window to the right. When the new character is already inside, shrink from the left until it is gone. Track the best window length. A set (or last-seen index map) tells you what is inside.'],
    questions: [
      ch('"abcabcbb" ->', ['2', '3', '4', '8'], 1, '"abc".', 'Find the longest stretch with no repeated letter.'),
      ch('"pwwkew" ->', ['2', '3', '4', '6'], 1, '"wke" (a substring, not a subsequence).', 'The substring must be contiguous.'),
      ord('Order the loop body', ['While s[r] is in the set, remove s[l] and l += 1', 'Add s[r] to the set', 'best = max(best, r - l + 1)'], 'Fix the window first, then measure it.', false, 'Make the window valid before you add and measure.'),
      bl('Fill in the blank', 'while s[r] in seen:\n    seen.remove(s[l])\n    l ___ 1', ['+=', '-=', '*='], '+=', 'Shrinking from the left moves l forward one index at a time.', 'Shrinking drops the leftmost element; which way does l go?'),
    ],
  }),
  make('Longest Repeating Character Replacement', {
    teach: ['Replace at most k letters to get the longest run of one letter.', 'A window is valid if (window length - count of its most frequent letter) <= k. Expand right; if invalid, shrink left. Track the max frequency seen.'],
    questions: [
      ch('"AABABBA", k = 1 ->', ['3', '4', '5', '7'], 1, '"AABA" -> "AAAA" with one change.', 'Pick a letter and see how far one replacement stretches.'),
      ch('Letters you must replace in a window =', ['length - maxFreq', 'maxFreq', 'length', 'k'], 0, 'Everything that is not the majority letter.', 'Keep the most common letter; the rest must change.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(26n²)'], 0, 'Each index enters and leaves once.', 'How many times can each index be visited by the pointers?'),
      bug('Find the bug', ['l = 0; maxf = 0; best = 0; count = {}', 'for r in range(len(s)):', '    count[s[r]] = count.get(s[r], 0) + 1', '    maxf = max(maxf, count[s[r]])', '    while (r - l + 1) - maxf > k:', '        count[s[r]] -= 1', '        l += 1', '    best = max(best, r - l + 1)'], 5, 'When l moves forward, the letter leaving the window is s[l], so decrement count[s[l]], not count[s[r]].', 'Which letter leaves the window when l moves?'),
    ],
  }),
  make('Permutation In String', {
    teach: ['Does s2 contain a permutation of s1?', 'A permutation has the same letter counts. Slide a window of length len(s1) across s2 and compare letter counts each step. Update counts by adding the new letter and removing the old.'],
    questions: [
      ch('s1 = "ab", s2 = "eidbaooo" ->', ['true', 'false'], 0, '"ba" is a permutation of "ab".', 'Look for two adjacent letters that are a rearrangement of s1.'),
      ch('Window size?', ['len(s1)', 'len(s2)', '26', 'variable'], 0, 'A permutation has the same length.', 'A permutation is the same length as the original.'),
      ch('What do we compare at each step?', ['Letter counts', 'First letters', 'Hash of s2', 'Sorted s2'], 0, 'Equal counts means permutation.', 'What property do permutations share?'),
      bl('Fill in the blank (assume a final check after the loop)', 'for r in range(len(s1), len(s2)):\n    if cnt1 == cnt2: return True\n    cnt2[s2[r]] += 1\n    cnt2[s2[r - ___]] -= 1', ['len(s1)', 'len(s1) - 1', '1'], 'len(s1)', 'After adding s2[r], the window has len(s1) + 1 letters; the one leaving is exactly len(s1) positions behind r.', 'The leaving letter is one window-length behind the new letter.'),
    ],
  }),
  make('Minimum Size Subarray Sum', {
    teach: ['Shortest subarray whose sum is >= target (all numbers positive).', 'Expand right, adding to the sum. While the sum is >= target, record the length and shrink from the left. Positives guarantee shrinking lowers the sum.'],
    questions: [
      ch('target = 7, [2,3,1,2,4,3] ->', ['1', '2', '3', '4'], 1, '[4,3] has sum 7.', 'Find the shortest contiguous piece with sum at least 7.'),
      ch('Why does this need positive numbers?', ['Shrinking always lowers the sum', 'Speed', 'Sorting', 'It does not'], 0, 'Negatives would break the window logic.', 'What happens to the sum when you drop the left element?'),
      ord('Order the loop', ['total += nums[r]', 'While total >= target: best = min(best, r - l + 1)', 'total -= nums[l]', 'l += 1'], 'Record, then shrink.', false, 'Record the length before removing the left element.'),
      bl('Fill in the blank', "best = float('inf')\n# ... slide the window, updating best ...\nreturn 0 if best == ___ else best", ["float('inf')", '0', '-1'], "float('inf')", 'If best was never updated, no subarray reached the target, so return 0.', 'What is best if no window ever qualified?'),
    ],
  }),
  make('Find K Closest Elements', {
    teach: ['Find K Closest Elements: in a sorted array, the k values closest to x.', 'The answer is a window of k consecutive elements. Binary search the window start in [0, n - k]: if x - arr[mid] > arr[mid + k] - x, move right.'],
    questions: [
      ch('[1,2,3,4,5], k = 4, x = 3 ->', ['[1,2,3,4]', '[2,3,4,5]', '[1,2,4,5]', '[3,4,5]'], 0, 'Tie goes to the smaller values.', 'Compare how far 1 and 5 are from x; how are ties broken?'),
      ch('The answer is always:', ['A contiguous window of size k', 'Any k values', 'The first k', 'A set'], 0, 'Sorted order keeps it contiguous.', 'In a sorted array, close values sit next to each other.'),
      ch('Time with binary search?', ['O(log(n - k) + k)', 'O(n²)', 'O(n log n)', 'O(k²)'], 0, 'Search start, then copy k values.', 'One part searches for the start, another builds the output.'),
      bug('Find the bug', ['l, r = 0, len(arr) - k', 'while l < r:', '    mid = (l + r) // 2', '    if x - arr[mid] > arr[mid + k] - x:', '        l = mid + 1', '    else:', '        r = mid + 1', 'return arr[l:l + k]'], 6, 'In the else branch mid itself may be the answer, so r = mid. Using mid + 1 can skip it and may loop forever.', 'In the else case, could the window starting at mid still be the answer?'),
    ],
  }),
  make('Minimum Window Substring', {
    teach: ['Smallest window of s that contains every letter of t (with counts).', 'Count needed letters. Expand right and track how many letters are satisfied. When all are satisfied, shrink from the left while still valid, recording the smallest window.'],
    questions: [
      ch('s = "ADOBECODEBANC", t = "ABC" ->', ['"ADOBEC"', '"BANC"', '"CODEBA"', '""'], 1, 'Shortest window containing A, B and C.', 'Find the shortest stretch containing every letter of t.'),
      ch('When do you shrink the window?', ['When it already contains all of t', 'When it is too small', 'Every step', 'Never'], 0, 'Only a valid window can be minimized.', 'You can only improve a window that is already valid.'),
      ch('Time complexity?', ['O(n + m)', 'O(n²)', 'O(nm)', 'O(2^n)'], 0, 'Each pointer moves at most n times.', 'Count how far each pointer travels in total, plus building the needs.'),
      ord('Order the loop body', ['Add s[r] to the window counts; update have if a need is met', 'While have == need, update the best window', 'Remove s[l] from the counts; update have if a need breaks', 'l += 1'], 'Expand, then shrink while valid, recording each valid window before it breaks.', false, 'Expand first; shrink only while the window is valid.'),
    ],
  }),
  make('Sliding Window Maximum', {
    teach: ['Maximum of every window of size k.', 'Keep a deque of indices whose values are decreasing. Pop from the back while the new value is bigger. Pop from the front if it left the window. The front is always the max. O(n).'],
    questions: [
      ch('[1,3,-1,-3,5,3,6,7], k = 3 ->', ['[3,3,5,5,6,7]', '[1,3,5,6,7]', '[3,3,-1,5,6,7]', '[3,5,6,7]'], 0, 'Max of each window of 3.', 'There are n - k + 1 windows; take each one\'s maximum.'),
      ch('Values in the deque are:', ['Decreasing', 'Increasing', 'Random', 'All equal'], 0, 'Smaller values behind a bigger one can never win.', 'The front must be the max, so how are the others ordered?'),
      ch('Why is it O(n)?', ['Each index is pushed and popped once', 'Sorting', 'Hashing', 'It is O(nk)'], 0, 'Amortized.', 'Count how often one index can enter and leave the deque.'),
      bl('Fill in the blank', 'for i, v in enumerate(nums):\n    while dq and nums[dq[-1]] ___ v:\n        dq.pop()\n    dq.append(i)', ['<', '>', '=='], '<', 'Smaller values at the back can never be a window max once v arrives, so they are popped.', 'Which back values become useless when a bigger value arrives?'),
    ],
  }),
];
