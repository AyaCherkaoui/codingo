import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const dp1: Lesson[] = [
  make('Climbing Stairs', {
    teach: ['Climb n stairs taking 1 or 2 steps. How many distinct ways?', 'ways(n) = ways(n-1) + ways(n-2). It is Fibonacci. Keep just two variables: O(n) time, O(1) space.'],
    questions: [
      ch('n = 5 -> ways?', ['8', '5', '10', '13'], 0, '1, 2, 3, 5, 8.', 'Count by hand for n = 1, 2, 3, 4 and look for the pattern.'),
      ch('ways(n) =', ['ways(n-1) + ways(n-2)', 'ways(n-1) * 2', 'n²', 'ways(n-1)'], 0, 'Last step was 1 or 2.', 'Ask which move the very last step could have been.'),
      ch('Base cases (n=1, n=2)?', ['1 and 2', '0 and 1', '1 and 1', '2 and 3'], 0, 'One way for a single stair; two for two.', 'Stair 1 has one way in; how many ways reach stair 2?'),
      bl('Fill in the update for the iterative solution.', 'def climb(n):\n    a, b = 1, 1\n    for _ in range(n - 1):\n        a, b = b, ___\n    return b', ['a + b', 'b', 'a * b', 'b + 1'], 'a + b', 'The new count is the sum of the previous two counts.', 'Each count builds on the two before it.'),
    ],
  }),
  make('Min Cost Climbing Stairs', {
    teach: ['Pay cost[i] to step from stair i, then climb 1 or 2. Start at index 0 or 1; reach the top (past the last stair).', 'dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Answer = min of the last two. Or work backwards.'],
    questions: [
      ch('[10,15,20] -> min cost?', ['15', '10', '25', '30'], 0, 'Start at 15, jump two steps to the top.', 'Try the array by hand: where can you land after paying for index 1?'),
      ch('You can start from?', ['Index 0 or 1', 'Index 0 only', 'The top', 'Any'], 0, 'By the rules.', 'You may begin on either of the first two stairs.'),
      ch('Answer =', ['min(dp[n-1], dp[n-2])', 'dp[n-1]', 'sum', 'dp[0]'], 0, 'Reach the top from either of the last two.', 'The top is one step past the last stair, so which stairs can reach it?'),
      bug('Find the bug in this rolling solution.', ['def minCost(cost):', '    a, b = cost[0], cost[1]', '    for i in range(2, len(cost)):', '        a, b = b, cost[i] + min(a, b)', '    return b'], 4, 'The top is reached from either of the last two stairs, so return min(a, b). Returning b forces paying for the last stair.', 'Can you jump over the last stair to reach the top?'),
    ],
  }),
  make('N-th Tribonacci Number', {
    teach: ['T0 = 0, T1 = 1, T2 = 1, Tn = T(n-3) + T(n-2) + T(n-1).', 'Iterate keeping the last three values. O(n) time, O(1) space.'],
    questions: [
      ch('T4 ->', ['4', '3', '5', '2'], 0, 'T3 = 2, T4 = 1 + 1 + 2 = 4.', 'Write out T0 through T4 by hand.'),
      ch('How many previous values do you keep?', ['3', '2', '1', 'n'], 0, 'Rolling window.', 'You always need exactly the last few values, not the whole table.'),
      ch('Time complexity?', ['O(n)', 'O(2^n)', 'O(n²)', 'O(1)'], 0, 'Loop once.', 'Count the loop iterations: it runs once per index.'),
      ord('Order the steps of the O(1) space solution.', ['if n < 2: return n', 'a, b, c = 0, 1, 1', 'for _ in range(n - 2):', '    a, b, c = b, c, a + b + c', 'return c'], 'Handle n = 0 and 1, seed T0..T2, slide the window n - 2 times, then return the newest value.', true, 'Handle tiny inputs first, then seed, then loop.'),
    ],
  }),
  make('House Robber', {
    teach: ['Rob houses in a row; you cannot rob two adjacent houses. Maximize the loot.', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]): skip this house or rob it plus the best from two houses ago. Keep two variables.'],
    questions: [
      ch('[2,7,9,3,1] ->', ['12', '10', '11', '9'], 0, '2 + 9 + 1 = 12.', 'Try the first three houses by hand and compare the choices.'),
      ch('Recurrence?', ['max(dp[i-1], dp[i-2] + nums[i])', 'dp[i-1] + nums[i]', 'dp[i-2]', 'sum'], 0, 'Skip or rob.', 'At each house you decide: take it or leave it.'),
      ch('Space needed?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Two rolling values.', 'Each step looks back only a fixed distance.'),
      bl('Fill in the loop update.', 'def rob(nums):\n    prev, cur = 0, 0\n    for n in nums:\n        prev, cur = cur, ___\n    return cur', ['max(cur, prev + n)', 'cur + n', 'max(cur, n)', 'prev + n'], 'max(cur, prev + n)', 'Skip this house (keep cur) or rob it and add the best from two houses back (prev + n).', 'Compare skipping with robbing plus the best from two back.'),
    ],
  }),
  make('House Robber II', {
    teach: ['Houses are in a circle: the first and last are adjacent.', 'Run House Robber twice: once excluding the last house, once excluding the first. Answer = the max of the two. Special case: one house.'],
    questions: [
      ch('Why two runs?', ['First and last cannot both be robbed', 'Speed', 'Memory', 'No reason'], 0, 'Circle constraint.', 'Think about what changes when house 0 and the last house touch.'),
      ch('[2,3,2] ->', ['3', '4', '2', '7'], 0, 'Houses 0 and 2 are adjacent in the circle.', 'Can you split the circle into two ordinary rows?'),
      ch('One house only?', ['Return nums[0]', 'Return 0', 'Return -1', 'Error'], 0, 'Special case.', 'What does a single house have as neighbors?'),
      bug('Find the bug in this circular solution.', ['def rob2(nums):', '    if len(nums) == 1: return nums[0]', '    return max(rob(nums[1:]), rob(nums))'], 2, 'The second run must exclude the first house too, i.e. rob(nums[:-1]). rob(nums) ignores the circle and may take both ends.', 'Each run should drop one end house.'),
    ],
  }),
  make('Longest Palindromic Substring', {
    teach: ['Find the longest palindromic substring.', 'Expand around centers: for each index (odd length) and each gap (even length), expand while the ends match. Track the best. O(n²) time, O(1) space.'],
    questions: [
      ch('"babad" ->', ['"bab" (or "aba")', '"bad"', '"babad"', '"ba"'], 0, 'Length 3.', 'Try "babad" by growing outward from each character.'),
      ch('How many centers?', ['2n - 1', 'n', 'n²', '1'], 0, 'n characters and n - 1 gaps.', 'Palindromes mirror around a middle point.'),
      ch('Time complexity?', ['O(n²)', 'O(n)', 'O(n log n)', 'O(2^n)'], 0, 'Each center may expand n/2.', 'Odd and even lengths have different kinds of middles.'),
      bl('Fill in the expansion condition.', 'def expand(s, l, r):\n    while l >= 0 and r < len(s) and ___:\n        l -= 1\n        r += 1\n    return r - l - 1', ['s[l] == s[r]', 's[l] != s[r]', 'l < r', 's[l] == s[l+1]'], 's[l] == s[r]', 'Keep growing while the two ends match. The final window is one step too wide, hence r - l - 1.', 'Only extend while the mirrored ends agree.'),
    ],
  }),
  make('Palindromic Substrings', {
    teach: ['Count all palindromic substrings.', 'Same center expansion: every successful expansion step is one more palindrome. Sum over all 2n - 1 centers.'],
    questions: [
      ch('"aaa" ->', ['6', '3', '4', '5'], 0, 'a, a, a, aa, aa, aaa.', 'List every palindrome in "aaa" by position.'),
      ch('Each valid expansion counts?', ['One palindrome', 'Two', 'None', 'The length'], 0, 'One new substring.', 'Each time the ends still match, what did you just find?'),
      ch('Time complexity?', ['O(n²)', 'O(n)', 'O(n³)', 'O(1)'], 0, 'Centers x expansion.', 'Sum the work over all centers.'),
      bug('Find the bug in the center loop.', ['def count(s):', '    total = 0', '    for c in range(2 * len(s) - 1):', '        l, r = c // 2, c // 2', '        while l >= 0 and r < len(s) and s[l] == s[r]:', '            total += 1', '            l -= 1', '            r += 1', '    return total'], 3, 'Even-length centers need r = l + 1. With r = c // 2 for every center only odd palindromes are counted: use r = c // 2 + c % 2.', 'Check where even-length palindromes start.'),
    ],
  }),
  make('Decode Ways', {
    teach: ['"1" -> A ... "26" -> Z. Count ways to decode a digit string.', 'dp[i] = ways for the first i digits. Add dp[i-1] if the last digit is 1-9. Add dp[i-2] if the last two digits form 10-26. Zeros need care.'],
    questions: [
      ch('"12" ->', ['2', '1', '3', '0'], 0, '"AB" or "L".', 'Decode "12" both ways by hand.'),
      ch('"06" ->', ['0', '1', '2', '6'], 0, 'A leading zero cannot be decoded.', 'Think about what a lone 0 can and cannot do.'),
      ch('Two-digit codes allowed?', ['10 to 26', '1 to 26', '10 to 99', '0 to 25'], 0, 'No leading zero, max 26.', 'Which two-digit numbers map to letters?'),
      bl('Fill in the two-digit check.', 'def numDecodings(s):\n    dp = [1] + [0] * len(s)\n    dp[1] = 1 if s[0] != "0" else 0\n    for i in range(2, len(s) + 1):\n        if s[i-1] != "0": dp[i] += dp[i-1]\n        if ___: dp[i] += dp[i-2]\n    return dp[-1]', ['10 <= int(s[i-2:i]) <= 26', '1 <= int(s[i-2:i]) <= 26', 'int(s[i-2:i]) <= 26', '10 <= int(s[i-1]) <= 26'], '10 <= int(s[i-2:i]) <= 26', 'The pair must be 10 to 26; "06" is not a valid code and must not add dp[i-2].', 'Look at the last two characters, and rule out a leading zero.'),
    ],
  }),
  make('Coin Change', {
    teach: ['Fewest coins to make amount (unlimited coins), or -1.', 'dp[a] = min coins for amount a. dp[0] = 0. For each a and coin c <= a: dp[a] = min(dp[a], dp[a - c] + 1). Initialize with infinity.'],
    questions: [
      ch('coins [1,2,5], amount 11 ->', ['3', '4', '5', '2'], 0, '5 + 5 + 1.', 'Work out the best count for amounts 1, 2, 3 using coins [1,2,5].'),
      ch('dp[0] =', ['0', '1', 'infinity', '-1'], 0, 'No coins for amount 0.', 'dp[a] depends on smaller amounts reachable by one coin.'),
      ch('If dp[amount] is still infinity?', ['Return -1', 'Return 0', 'Return amount', 'Error'], 0, 'Impossible.', 'What value means "not reachable yet"?'),
      bug('Find the bug in the transition.', ['def coinChange(coins, amount):', '    dp = [float("inf")] * (amount + 1)', '    dp[0] = 0', '    for a in range(1, amount + 1):', '        for c in coins:', '            if c <= a:', '                dp[a] = min(dp[a], dp[a - c])', '    return dp[amount] if dp[amount] != float("inf") else -1'], 6, 'Using coin c adds one coin to the best for a - c, so the transition needs dp[a - c] + 1.', 'Does using a coin cost anything?'),
    ],
  }),
  make('Maximum Product Subarray', {
    teach: ['Largest product of a contiguous subarray.', 'Track both the max and min product ending here (a negative flips them). curMax = max(n, n * prevMax, n * prevMin); curMin similarly. Answer is the best curMax.'],
    questions: [
      ch('Why track the minimum too?', ['A negative number can turn it into the max', 'Speed', 'Memory', 'No reason'], 0, 'Two negatives multiply to a positive.', 'Try [-2, 3, -4] and see what happens when you multiply a negative.'),
      ch('[2,3,-2,4] ->', ['6', '8', '24', '4'], 0, '2 * 3.', 'Keep two running values, not one.'),
      ch('A zero in the array?', ['Resets the running products', 'Is ignored', 'Is an error', 'Doubles'], 0, 'The product restarts.', 'What do you do with the running products at a 0?'),
      bl('Fill in the new running maximum.', 'def maxProduct(nums):\n    hi = lo = best = nums[0]\n    for n in nums[1:]:\n        cands = (n, hi * n, lo * n)\n        hi, lo = ___, min(cands)\n        best = max(best, hi)\n    return best', ['max(cands)', 'hi * n', 'max(hi, n)', 'abs(lo * n)'], 'max(cands)', 'The best product ending here is the max of starting fresh, extending the max, or extending the min.', 'Consider starting fresh, extending hi, or extending lo.'),
    ],
  }),
  make('Word Break', {
    teach: ['Can s be split into dictionary words?', 'dp[i] = true if s[:i] can be segmented. dp[0] = true. dp[i] = any(dp[j] and s[j:i] in words). O(n²) with a set.'],
    questions: [
      ch('"leetcode", ["leet","code"] ->', ['true', 'false'], 0, 'leet + code.', 'Try "leetcode" and ask which prefixes are valid.'),
      ch('dp[0] =', ['true', 'false'], 0, 'Empty prefix.', 'A prefix works if some shorter valid prefix is followed by a word.'),
      ch('dp[i] means?', ['s[:i] can be segmented', 's[i] is a word', 'count of words', 'index of word'], 0, 'Prefix state.', 'What does the empty prefix count as?'),
      bl('Fill in the segment check.', 'def wordBreak(s, words):\n    ws = set(words)\n    dp = [True] + [False] * len(s)\n    for i in range(1, len(s) + 1):\n        for j in range(i):\n            if dp[j] and ___:\n                dp[i] = True\n                break\n    return dp[-1]', ['s[j:i] in ws', 's[:j] in ws', 's[i:j] in ws', 's[j] in ws'], 's[j:i] in ws', 'If s[:j] is segmentable, the leftover s[j:i] must itself be a word.', 'The prefix is already known; test the remaining piece.'),
    ],
  }),
  make('Longest Increasing Subsequence', {
    teach: ['Length of the longest strictly increasing subsequence.', 'DP O(n²): dp[i] = 1 + max(dp[j]) for j < i with nums[j] < nums[i]. Faster O(n log n): keep a "tails" array and binary search where each number goes.'],
    questions: [
      ch('[10,9,2,5,3,7,101,18] ->', ['4', '5', '3', '6'], 0, '2, 3, 7, 101.', 'Trace [10,9,2,5,3,7,101,18] keeping the best length ending at each index.'),
      ch('Faster method?', ['tails array + binary search', 'Sorting', 'Hash map', 'Stack'], 0, 'O(n log n).', 'A subsequence may skip elements.'),
      ch('A subsequence is?', ['Not necessarily contiguous', 'Contiguous', 'Sorted already', 'Unique'], 0, 'Order kept, gaps allowed.', 'Keep the smallest possible tail for each length.'),
      bl('Fill in the O(n log n) replacement step.', 'import bisect\ndef lis(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: ___\n    return len(tails)', ['tails[i] = x', 'tails.insert(i, x)', 'tails.pop()', 'tails[i] += x'], 'tails[i] = x', 'x becomes a smaller (or equal) tail for length i + 1, which keeps future extensions easiest.', 'Keeping tails small leaves more room to extend.'),
    ],
  }),
  make('Partition Equal Subset Sum', {
    teach: ['Can the array be split into two subsets with equal sums?', 'Total must be even. Then it is a subset-sum problem for total / 2. dp[s] = can we reach sum s. Iterate sums downward for each number (0/1 knapsack).'],
    questions: [
      ch('If the total is odd?', ['Impossible', 'Possible', 'Depends', 'Round'], 0, 'Two equal halves need an even total.', 'Check the parity of the total first.'),
      ch('Target to hit?', ['total / 2', 'total', 'max', 'n'], 0, 'One subset sums to half.', 'You only need one subset reaching a specific sum.'),
      ch('Why loop sums downward?', ['Use each number only once', 'Speed', 'Memory', 'No reason'], 0, 'Avoid reusing the same number.', 'What goes wrong if one number is used twice?'),
      bl('Fill in the knapsack update.', 'def canPartition(nums):\n    total = sum(nums)\n    if total % 2: return False\n    dp = [True] + [False] * (total // 2)\n    for n in nums:\n        for s in range(total // 2, n - 1, -1):\n            dp[s] = ___\n    return dp[-1]', ['dp[s] or dp[s - n]', 'dp[s] and dp[s - n]', 'dp[s - n]', 'dp[s] + n'], 'dp[s] or dp[s - n]', 'Sum s is reachable already, or reachable by adding n to sum s - n.', 'Either you could already reach s, or you reach it using n.'),
    ],
  }),
  make('Combination Sum IV', {
    teach: ['Count ordered sequences (different orders count separately) of numbers that add to target.', 'dp[t] = sum of dp[t - num] for each num <= t. dp[0] = 1. Loop targets outside, numbers inside, so orders are counted.'],
    questions: [
      ch('[1,2,3], target 4 ->', ['7', '4', '5', '3'], 0, 'Counting orderings.', 'List all orderings for [1,2,3] and target 4.'),
      ch('dp[0] =', ['1', '0', 'target', '-1'], 0, 'One way: pick nothing.', 'Think of the last number in the sequence.'),
      ch('Loop order for counting permutations?', ['Targets outer, numbers inner', 'Numbers outer, targets inner', 'Either', 'Random'], 0, 'This is the opposite of Coin Change II.', 'Which loop decides the order?'),
      bug('Find the bug (we must count different orders separately).', ['def combinationSum4(nums, target):', '    dp = [1] + [0] * target', '    for n in nums:', '        for t in range(n, target + 1):', '            dp[t] += dp[t - n]', '    return dp[target]'], 2, 'Numbers outer counts combinations (order ignored). For permutations loop targets outer and numbers inner.', 'Which loop is outermost matters for ordering.'),
    ],
  }),
  make('Perfect Squares', {
    teach: ['Fewest perfect squares (1, 4, 9, ...) that sum to n.', 'Coin Change in disguise: dp[i] = min(dp[i - s*s] + 1) for all squares. (BFS or math also work.)'],
    questions: [
      ch('n = 12 ->', ['3', '2', '4', '1'], 0, '4 + 4 + 4.', 'Try n = 12 using only 1, 4, 9.'),
      ch('This is like which problem?', ['Coin Change', 'LRU Cache', 'Two Sum', 'Valid Parentheses'], 0, 'Squares are the coins.', 'Each step subtracts one square.'),
      ch('dp[0] =', ['0', '1', 'n', 'infinity'], 0, 'No squares needed.', 'What do the "coins" look like here?'),
      bl('Fill in the transition.', 'def numSquares(n):\n    dp = [0] + [float("inf")] * n\n    for i in range(1, n + 1):\n        s = 1\n        while s * s <= i:\n            dp[i] = min(dp[i], ___)\n            s += 1\n    return dp[n]', ['dp[i - s * s] + 1', 'dp[i - s] + 1', 'dp[s * s] + 1', 'dp[i - s * s]'], 'dp[i - s * s] + 1', 'Use one square s*s, then solve what remains: dp[i - s*s], plus 1 for the square used.', 'Pay one square, then solve the remainder.'),
    ],
  }),
  make('Integer Break', {
    teach: ['Break n into at least two positive integers to maximize their product.', 'dp[i] = max over j of max(j * (i - j), j * dp[i - j]). Math: use as many 3s as possible (and a 2 or two 2s for the remainder).'],
    questions: [
      ch('n = 10 ->', ['36', '30', '25', '40'], 0, '3 * 3 * 4.', 'Try splitting 4, 5, 6 by hand and compare products.'),
      ch('Best number to split into?', ['3s', '1s', '5s', '7s'], 0, 'The product is largest with 3s.', 'After one split, the remainder can be split further or kept.'),
      ch('n = 2 ->', ['1', '2', '0', '4'], 0, '1 * 1.', 'Compare small numbers of each part size.'),
      bl('Fill in the missing candidate.', 'def integerBreak(n):\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        for j in range(1, i):\n            dp[i] = max(dp[i], ___, j * dp[i - j])\n    return dp[n]', ['j * (i - j)', 'j + (i - j)', 'dp[j] * i', 'i * j'], 'j * (i - j)', 'Either keep the remainder whole (j * (i - j)) or split it further (j * dp[i - j]).', 'One option leaves the remainder unsplit.'),
    ],
  }),
  make('Stone Game III', {
    teach: ['Alice and Bob take 1, 2 or 3 stones from the front of a row; each wants the higher total. Who wins?', 'dp[i] = best score difference (current player minus opponent) from stone i. dp[i] = max over k of (sum of k stones - dp[i + k]). Positive means Alice wins.'],
    questions: [
      ch('dp[i] represents?', ['Score difference for the player to move', 'Total stones', 'Alice\'s score', 'Bob\'s score'], 0, 'Relative advantage.', 'Define the value from the viewpoint of whoever moves.'),
      ch('A positive dp[0] means?', ['Alice wins', 'Bob wins', 'Tie', 'Unknown'], 0, 'Alice moves first.', 'The opponent plays next in the leftover row.'),
      ch('Recurrence subtracts dp[i + k] because?', ['The opponent moves next', 'Memory', 'Mistake', 'Sorting'], 0, 'Their gain is your loss.', 'Compare dp[0] with zero at the end.'),
      bug('Find the bug in the DP.', ['def stoneGameIII(v):', '    n = len(v)', '    dp = [0] * (n + 3)', '    for i in range(n - 1, -1, -1):', '        best, take = float("-inf"), 0', '        for k in range(1, 4):', '            if i + k > n: break', '            take += v[i + k - 1]', '            best = max(best, take + dp[i + k])', '        dp[i] = best', '    return dp[0]'], 8, 'dp stores a difference from the mover viewpoint, so the opponent gain is subtracted: take - dp[i + k].', 'Is the opponent result good or bad for you?'),
    ],
  }),
];
