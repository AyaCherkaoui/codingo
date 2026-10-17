import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const binarySearch: Lesson[] = [
  make('Binary Search', {
    teach: ['Binary Search: find target in a sorted array in O(log n).', 'Check the middle. If target is bigger, search the right half (l = mid + 1). If smaller, search the left half (r = mid - 1). Loop while l <= r.'],
    questions: [
      ch('[-1,0,3,5,9,12], target = 9 -> index?', ['3', '4', '5', '-1'], 1, 'nums[4] = 9.'),
      bl('Fill in the blank', 'while l ___ r:\\n    mid = (l + r) // 2', ['<=', '<', '!='], '<=', 'A single element (l == r) must still be checked.'),
      ord('Order the loop body', ['mid = (l + r) // 2', 'If nums[mid] == target, return mid', 'If nums[mid] < target, l = mid + 1', 'Else r = mid - 1'], 'Halve the range every time.'),
    ],
  }),
  make('Search Insert Position', {
    teach: ['Search Insert Position: index of target, or where it would be inserted.', 'Run normal binary search. If the loop ends without a match, l is exactly the insert position.'],
    questions: [
      ch('[1,3,5,6], target = 5 ->', ['1', '2', '3', '4'], 1, 'Found at index 2.'),
      ch('[1,3,5,6], target = 2 ->', ['0', '1', '2', '3'], 1, 'It would go between 1 and 3.'),
      ch('[1,3,5,6], target = 7 ->', ['3', '4', '5', '-1'], 1, 'After the last element.'),
    ],
  }),
  make('Guess Number Higher Or Lower', {
    teach: ['Guess the number picked between 1 and n using guess(num).', 'guess returns -1 if your guess is too HIGH, 1 if too LOW, 0 if correct. That is just binary search on 1..n.'],
    questions: [
      ch('guess(mid) returns -1. What do you do?', ['r = mid - 1', 'l = mid + 1', 'return mid', 'stop'], 0, 'Your guess was too high.'),
      ch('guess(mid) returns 1. What do you do?', ['r = mid - 1', 'l = mid + 1', 'return mid', 'stop'], 1, 'Your guess was too low.'),
      ch('Number of guesses needed?', ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], 0, 'Halving every time.'),
    ],
  }),
  make('Sqrt(x)', {
    teach: ['Sqrt(x): integer square root, rounded down.', 'Binary search the answer in [0, x]: find the largest m with m * m <= x. When m * m <= x, remember m and go right; otherwise go left.'],
    questions: [
      ch('sqrt(8) ->', ['2', '3', '2.8', '4'], 0, '2 * 2 = 4 <= 8 but 3 * 3 = 9 > 8.'),
      ch('We search over:', ['The possible answers 0..x', 'The digits of x', 'A sorted input array', 'Primes'], 0, 'Binary search works on any monotonic condition.'),
      bl('Fill in the blank', 'if mid * mid <= x:\\n    ans = mid\\n    l = ___', ['mid + 1', 'mid - 1', 'mid'], 'mid + 1', 'Keep it as a candidate and look for a larger one.'),
    ],
  }),
  make('Search a 2D Matrix', {
    teach: ['Search a 2D Matrix: rows sorted, and each row starts above the previous row end.', 'Treat the matrix as one sorted array of length m * n. For index mid: row = mid // n, col = mid % n (n = columns).'],
    questions: [
      ch('3 x 4 matrix. mid = 7 -> (row, col)?', ['(1, 3)', '(2, 1)', '(1, 2)', '(0, 7)'], 0, '7 // 4 = 1, 7 % 4 = 3.'),
      ch('Time complexity?', ['O(log(m * n))', 'O(m + n)', 'O(m * n)', 'O(log m * log n)'], 0, 'One binary search over m * n items.'),
      bl('Fill in the blank', 'row, col = mid // n, mid ___ n', ['%', '//', '*'], '%', 'Remainder gives the column.'),
    ],
  }),
  make('Koko Eating Bananas', {
    teach: ['Koko eats k bananas per hour from one pile per hour. Find the smallest k that finishes within h hours.', 'Binary search on k in [1, max(piles)]. For a given k, hours = sum of ceil(pile / k). If hours <= h, k works (try smaller); else go bigger.'],
    questions: [
      ch('piles = [3,6,7,11], h = 8 -> min k?', ['3', '4', '5', '6'], 1, 'k = 4 takes 1+2+2+3 = 8 hours.'),
      ch('We binary search over:', ['Eating speed k', 'The piles', 'Hours', 'Index'], 0, 'Bigger k is always at least as fast.'),
      ch('If hours <= h, you:', ['Try a smaller k', 'Try a bigger k', 'Return', 'Sort piles'], 0, 'We want the minimum working k.'),
    ],
  }),
  make('Capacity to Ship Packages Within D Days', {
    teach: ['Ship packages in order within D days; find the minimum ship capacity.', 'Binary search capacity in [max(weights), sum(weights)]. For a capacity, greedily load days; count days needed. If days <= D, capacity works.'],
    questions: [
      ch('Smallest possible capacity?', ['max(weights)', '1', 'sum(weights)', 'D'], 0, 'The heaviest package must fit.'),
      ch('weights = 1..10, D = 5 -> ?', ['10', '15', '20', '55'], 1, 'Capacity 15 works in 5 days.'),
      ch('Packages must ship:', ['In the given order', 'Any order', 'Largest first', 'Smallest first'], 0, 'That makes the greedy check valid.'),
    ],
  }),
  make('Find Minimum In Rotated Sorted Array', {
    teach: ['A sorted array was rotated. Find the minimum in O(log n).', 'Compare nums[mid] with nums[r]. If nums[mid] > nums[r], the minimum is to the right (l = mid + 1). Otherwise it is at mid or left (r = mid).'],
    questions: [
      ch('[3,4,5,1,2] ->', ['1', '2', '3', '5'], 0, 'The smallest value.'),
      ch('nums[mid] > nums[r]. Where is the minimum?', ['Right of mid', 'At or left of mid', 'At mid only', 'Unknown'], 0, 'The rotation point is in the right half.'),
      ch('Loop condition?', ['while l < r', 'while l <= r', 'while l > r', 'for i in nums'], 0, 'We shrink until one element remains.'),
    ],
  }),
  make('Search In Rotated Sorted Array', {
    teach: ['Search for target in a rotated sorted array (distinct values).', 'At every step one half is sorted. Find which half (nums[l] <= nums[mid] means left is sorted). If target lies in the sorted half, go there; otherwise go the other way.'],
    questions: [
      ch('[4,5,6,7,0,1,2], target = 0 -> ?', ['4', '3', '5', '-1'], 0, 'nums[4] = 0.'),
      ch('nums[l] <= nums[mid] means:', ['Left half is sorted', 'Right half is sorted', 'Array is sorted', 'Target is left'], 0, 'No rotation point in [l, mid].'),
      ch('Time complexity?', ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], 0, 'Still halving.'),
    ],
  }),
  make('Search In Rotated Sorted Array II', {
    teach: ['Same as before, but duplicates are allowed.', 'When nums[l] == nums[mid] == nums[r] you cannot tell which half is sorted, so shrink both ends (l += 1, r -= 1). Worst case O(n).'],
    questions: [
      ch('Why do duplicates cause trouble?', ['Cannot tell which half is sorted', 'Memory', 'Overflow', 'No trouble'], 0, 'Equal ends hide the rotation point.'),
      ch('[2,5,6,0,0,1,2], target = 0 ->', ['true', 'false'], 0, '0 is in the array.'),
      ch('Worst-case time?', ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], 0, 'All-equal arrays force linear shrinking.'),
    ],
  }),
  make('Time Based Key Value Store', {
    teach: ['Store values per key with timestamps; get(key, t) returns the value at the latest timestamp <= t.', 'Per key keep a list of (timestamp, value). Timestamps only increase, so the list is sorted. get = binary search for the rightmost timestamp <= t.'],
    questions: [
      ch('set("foo","bar",1), get("foo", 3) ->', ['"bar"', '""', 'None', '"foo"'], 0, 'Latest timestamp <= 3 is 1.'),
      ch('set("foo","bar",1), get("foo", 0) ->', ['"bar"', '"" (empty)', '1', 'error'], 1, 'Nothing is stored at or before time 0.'),
      ch('Why binary search in get?', ['Timestamps are sorted', 'Keys are sorted', 'Values are sorted', 'Hash collision'], 0, 'Sets arrive in increasing time.'),
    ],
  }),
  make('Split Array Largest Sum', {
    teach: ['Split an array into k contiguous parts to minimize the largest part sum.', 'Binary search the answer in [max(nums), sum(nums)]. For a limit, greedily cut as few parts as possible. If parts <= k, the limit works (try lower).'],
    questions: [
      ch('[7,2,5,10,8], k = 2 ->', ['15', '18', '24', '32'], 1, '[7,2,5] and [10,8] gives 18.'),
      ch('For a given limit you count:', ['How many parts the greedy needs', 'The max element', 'The sum', 'Nothing'], 0, 'Compare that count with k.'),
      ch('Lower bound for the answer?', ['max(nums)', '0', '1', 'k'], 0, 'One part must hold the biggest number.'),
    ],
  }),
  make('Median of Two Sorted Arrays', {
    teach: ['Median of two sorted arrays in O(log(min(m, n))).', 'Binary search a partition of the SMALLER array. Choose how many elements from each array go in the left half so the left half has (m + n + 1) // 2 items. The partition is right when left max <= right min on both sides.'],
    questions: [
      ch('[1,3] and [2] -> median?', ['1.5', '2.0', '2.5', '3.0'], 1, 'Merged: 1,2,3.'),
      ch('Which array do you binary search?', ['The smaller one', 'The larger one', 'Both', 'Neither'], 0, 'That keeps the other index in range.'),
      ch('Partition is correct when:', ['maxLeft <= minRight on both arrays', 'Both halves are equal sums', 'Arrays are equal length', 'Medians match'], 0, 'Everything on the left is <= everything on the right.'),
    ],
  }),
  make('Find in Mountain Array', {
    teach: ['Find the smallest index of target in a mountain array (up then down), with few reads.', 'Step 1: binary search the peak (compare arr[mid] and arr[mid + 1]). Step 2: binary search the increasing side. Step 3: if not found, binary search the decreasing side.'],
    questions: [
      ch('arr[mid] < arr[mid + 1]. The peak is:', ['To the right', 'To the left', 'At mid', 'Unknown'], 0, 'We are still climbing.'),
      ch('Why search the increasing side first?', ['We need the smallest index', 'It is shorter', 'Rules', 'No reason'], 0, 'The left side has smaller indexes.'),
      ch('Number of binary searches?', ['3', '1', '2', 'n'], 0, 'Peak, left side, right side.'),
    ],
  }),
];
