import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const dp1: Lesson[] = [
  make('Climbing Stairs', {
    teach: ['Climb n stairs taking 1 or 2 steps. How many distinct ways?', 'ways(n) = ways(n-1) + ways(n-2). It is Fibonacci. Keep just two variables: O(n) time, O(1) space.'],
    questions: [
      ch('n = 5 -> ways?', ['8', '5', '10', '13'], 0, '1, 2, 3, 5, 8.'),
      ch('ways(n) =', ['ways(n-1) + ways(n-2)', 'ways(n-1) * 2', 'n²', 'ways(n-1)'], 0, 'Last step was 1 or 2.'),
      ch('Base cases (n=1, n=2)?', ['1 and 2', '0 and 1', '1 and 1', '2 and 3'], 0, 'One way for a single stair; two for two.'),
    ],
  }),
  make('Min Cost Climbing Stairs', {
    teach: ['Pay cost[i] to step from stair i, then climb 1 or 2. Start at index 0 or 1; reach the top (past the last stair).', 'dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Answer = min of the last two. Or work backwards.'],
    questions: [
      ch('[10,15,20] -> min cost?', ['15', '10', '25', '30'], 0, 'Start at 15, jump two steps to the top.'),
      ch('You can start from?', ['Index 0 or 1', 'Index 0 only', 'The top', 'Any'], 0, 'By the rules.'),
      ch('Answer =', ['min(dp[n-1], dp[n-2])', 'dp[n-1]', 'sum', 'dp[0]'], 0, 'Reach the top from either of the last two.'),
    ],
  }),
  make('N-th Tribonacci Number', {
    teach: ['T0 = 0, T1 = 1, T2 = 1, Tn = T(n-3) + T(n-2) + T(n-1).', 'Iterate keeping the last three values. O(n) time, O(1) space.'],
    questions: [
      ch('T4 ->', ['4', '3', '5', '2'], 0, 'T3 = 2, T4 = 1 + 1 + 2 = 4.'),
      ch('How many previous values do you keep?', ['3', '2', '1', 'n'], 0, 'Rolling window.'),
      ch('Time complexity?', ['O(n)', 'O(2^n)', 'O(n²)', 'O(1)'], 0, 'Loop once.'),
    ],
  }),
  make('House Robber', {
    teach: ['Rob houses in a row; you cannot rob two adjacent houses. Maximize the loot.', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]): skip this house or rob it plus the best from two houses ago. Keep two variables.'],
    questions: [
      ch('[2,7,9,3,1] ->', ['12', '10', '11', '9'], 0, '2 + 9 + 1 = 12.'),
      ch('Recurrence?', ['max(dp[i-1], dp[i-2] + nums[i])', 'dp[i-1] + nums[i]', 'dp[i-2]', 'sum'], 0, 'Skip or rob.'),
      ch('Space needed?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Two rolling values.'),
    ],
  }),
  make('House Robber II', {
    teach: ['Houses are in a circle: the first and last are adjacent.', 'Run House Robber twice: once excluding the last house, once excluding the first. Answer = the max of the two. Special case: one house.'],
    questions: [
      ch('Why two runs?', ['First and last cannot both be robbed', 'Speed', 'Memory', 'No reason'], 0, 'Circle constraint.'),
      ch('[2,3,2] ->', ['3', '4', '2', '7'], 0, 'Houses 0 and 2 are adjacent in the circle.'),
      ch('One house only?', ['Return nums[0]', 'Return 0', 'Return -1', 'Error'], 0, 'Special case.'),
    ],
  }),
  make('Longest Palindromic Substring', {
    teach: ['Find the longest palindromic substring.', 'Expand around centers: for each index (odd length) and each gap (even length), expand while the ends match. Track the best. O(n²) time, O(1) space.'],
    questions: [
      ch('"babad" ->', ['"bab" (or "aba")', '"bad"', '"babad"', '"ba"'], 0, 'Length 3.'),
      ch('How many centers?', ['2n - 1', 'n', 'n²', '1'], 0, 'n characters and n - 1 gaps.'),
      ch('Time complexity?', ['O(n²)', 'O(n)', 'O(n log n)', 'O(2^n)'], 0, 'Each center may expand n/2.'),
    ],
  }),
  make('Palindromic Substrings', {
    teach: ['Count all palindromic substrings.', 'Same center expansion: every successful expansion step is one more palindrome. Sum over all 2n - 1 centers.'],
    questions: [
      ch('"aaa" ->', ['6', '3', '4', '5'], 0, 'a, a, a, aa, aa, aaa.'),
      ch('Each valid expansion counts?', ['One palindrome', 'Two', 'None', 'The length'], 0, 'One new substring.'),
      ch('Time complexity?', ['O(n²)', 'O(n)', 'O(n³)', 'O(1)'], 0, 'Centers x expansion.'),
    ],
  }),
  make('Decode Ways', {
    teach: ['"1" -> A ... "26" -> Z. Count ways to decode a digit string.', 'dp[i] = ways for the first i digits. Add dp[i-1] if the last digit is 1-9. Add dp[i-2] if the last two digits form 10-26. Zeros need care.'],
    questions: [
      ch('"12" ->', ['2', '1', '3', '0'], 0, '"AB" or "L".'),
      ch('"06" ->', ['0', '1', '2', '6'], 0, 'A leading zero cannot be decoded.'),
      ch('Two-digit codes allowed?', ['10 to 26', '1 to 26', '10 to 99', '0 to 25'], 0, 'No leading zero, max 26.'),
    ],
  }),
  make('Coin Change', {
    teach: ['Fewest coins to make amount (unlimited coins), or -1.', 'dp[a] = min coins for amount a. dp[0] = 0. For each a and coin c <= a: dp[a] = min(dp[a], dp[a - c] + 1). Initialize with infinity.'],
    questions: [
      ch('coins [1,2,5], amount 11 ->', ['3', '4', '5', '2'], 0, '5 + 5 + 1.'),
      ch('dp[0] =', ['0', '1', 'infinity', '-1'], 0, 'No coins for amount 0.'),
      ch('If dp[amount] is still infinity?', ['Return -1', 'Return 0', 'Return amount', 'Error'], 0, 'Impossible.'),
    ],
  }),
  make('Maximum Product Subarray', {
    teach: ['Largest product of a contiguous subarray.', 'Track both the max and min product ending here (a negative flips them). curMax = max(n, n * prevMax, n * prevMin); curMin similarly. Answer is the best curMax.'],
    questions: [
      ch('Why track the minimum too?', ['A negative number can turn it into the max', 'Speed', 'Memory', 'No reason'], 0, 'Two negatives multiply to a positive.'),
      ch('[2,3,-2,4] ->', ['6', '8', '24', '4'], 0, '2 * 3.'),
      ch('A zero in the array?', ['Resets the running products', 'Is ignored', 'Is an error', 'Doubles'], 0, 'The product restarts.'),
    ],
  }),
  make('Word Break', {
    teach: ['Can s be split into dictionary words?', 'dp[i] = true if s[:i] can be segmented. dp[0] = true. dp[i] = any(dp[j] and s[j:i] in words). O(n²) with a set.'],
    questions: [
      ch('"leetcode", ["leet","code"] ->', ['true', 'false'], 0, 'leet + code.'),
      ch('dp[0] =', ['true', 'false'], 0, 'Empty prefix.'),
      ch('dp[i] means?', ['s[:i] can be segmented', 's[i] is a word', 'count of words', 'index of word'], 0, 'Prefix state.'),
    ],
  }),
  make('Longest Increasing Subsequence', {
    teach: ['Length of the longest strictly increasing subsequence.', 'DP O(n²): dp[i] = 1 + max(dp[j]) for j < i with nums[j] < nums[i]. Faster O(n log n): keep a "tails" array and binary search where each number goes.'],
    questions: [
      ch('[10,9,2,5,3,7,101,18] ->', ['4', '5', '3', '6'], 0, '2, 3, 7, 101.'),
      ch('Faster method?', ['tails array + binary search', 'Sorting', 'Hash map', 'Stack'], 0, 'O(n log n).'),
      ch('A subsequence is?', ['Not necessarily contiguous', 'Contiguous', 'Sorted already', 'Unique'], 0, 'Order kept, gaps allowed.'),
    ],
  }),
  make('Partition Equal Subset Sum', {
    teach: ['Can the array be split into two subsets with equal sums?', 'Total must be even. Then it is a subset-sum problem for total / 2. dp[s] = can we reach sum s. Iterate sums downward for each number (0/1 knapsack).'],
    questions: [
      ch('If the total is odd?', ['Impossible', 'Possible', 'Depends', 'Round'], 0, 'Two equal halves need an even total.'),
      ch('Target to hit?', ['total / 2', 'total', 'max', 'n'], 0, 'One subset sums to half.'),
      ch('Why loop sums downward?', ['Use each number only once', 'Speed', 'Memory', 'No reason'], 0, 'Avoid reusing the same number.'),
    ],
  }),
  make('Combination Sum IV', {
    teach: ['Count ordered sequences (different orders count separately) of numbers that add to target.', 'dp[t] = sum of dp[t - num] for each num <= t. dp[0] = 1. Loop targets outside, numbers inside, so orders are counted.'],
    questions: [
      ch('[1,2,3], target 4 ->', ['7', '4', '5', '3'], 0, 'Counting orderings.'),
      ch('dp[0] =', ['1', '0', 'target', '-1'], 0, 'One way: pick nothing.'),
      ch('Loop order for counting permutations?', ['Targets outer, numbers inner', 'Numbers outer, targets inner', 'Either', 'Random'], 0, 'This is the opposite of Coin Change II.'),
    ],
  }),
  make('Perfect Squares', {
    teach: ['Fewest perfect squares (1, 4, 9, ...) that sum to n.', 'Coin Change in disguise: dp[i] = min(dp[i - s*s] + 1) for all squares. (BFS or math also work.)'],
    questions: [
      ch('n = 12 ->', ['3', '2', '4', '1'], 0, '4 + 4 + 4.'),
      ch('This is like which problem?', ['Coin Change', 'LRU Cache', 'Two Sum', 'Valid Parentheses'], 0, 'Squares are the coins.'),
      ch('dp[0] =', ['0', '1', 'n', 'infinity'], 0, 'No squares needed.'),
    ],
  }),
  make('Integer Break', {
    teach: ['Break n into at least two positive integers to maximize their product.', 'dp[i] = max over j of max(j * (i - j), j * dp[i - j]). Math: use as many 3s as possible (and a 2 or two 2s for the remainder).'],
    questions: [
      ch('n = 10 ->', ['36', '30', '25', '40'], 0, '3 * 3 * 4.'),
      ch('Best number to split into?', ['3s', '1s', '5s', '7s'], 0, 'The product is largest with 3s.'),
      ch('n = 2 ->', ['1', '2', '0', '4'], 0, '1 * 1.'),
    ],
  }),
  make('Stone Game III', {
    teach: ['Alice and Bob take 1, 2 or 3 stones from the front of a row; each wants the higher total. Who wins?', 'dp[i] = best score difference (current player minus opponent) from stone i. dp[i] = max over k of (sum of k stones - dp[i + k]). Positive means Alice wins.'],
    questions: [
      ch('dp[i] represents?', ['Score difference for the player to move', 'Total stones', 'Alice\'s score', 'Bob\'s score'], 0, 'Relative advantage.'),
      ch('A positive dp[0] means?', ['Alice wins', 'Bob wins', 'Tie', 'Unknown'], 0, 'Alice moves first.'),
      ch('Recurrence subtracts dp[i + k] because?', ['The opponent moves next', 'Memory', 'Mistake', 'Sorting'], 0, 'Their gain is your loss.'),
    ],
  }),
];
