import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const dp2: Lesson[] = [
  make('Unique Paths', {
    teach: ['Robot moves only right or down in an m x n grid. Count paths from top-left to bottom-right.', 'dp[r][c] = dp[r-1][c] + dp[r][c-1]. First row and column are 1. Can be done with one row. Or combinatorics: C(m+n-2, m-1).'],
    questions: [
      ch('3 x 7 grid ->', ['28', '21', '14', '35'], 0, 'C(8, 2) = 28.', 'Count paths on a 2 x 2 and a 3 x 3 grid by hand.'),
      ch('dp[r][c] =', ['dp[r-1][c] + dp[r][c-1]', 'max of both', 'r * c', 'dp[r-1][c]'], 0, 'Came from above or left.', 'Every cell is entered from just two neighbors.'),
      ch('First row values?', ['All 1', 'All 0', 'Increasing', 'Random'], 0, 'Only one way straight right.', 'How many ways to reach a cell on the top edge?'),
      bl('Fill in the one-row update.', 'def uniquePaths(m, n):\n    row = [1] * n\n    for _ in range(1, m):\n        for c in range(1, n):\n            row[c] = ___\n    return row[-1]', ['row[c] + row[c - 1]', 'row[c] * row[c - 1]', 'row[c - 1]', 'row[c] + 1'], 'row[c] + row[c - 1]', 'row[c] still holds the value from above; row[c - 1] is the new value from the left.', 'Combine the stored (above) and the left value.'),
    ],
  }),
  make('Unique Paths II', {
    teach: ['Same as Unique Paths, but some cells are obstacles (1).', 'Same recurrence, but an obstacle cell has 0 paths. If the start or end is an obstacle the answer is 0.'],
    questions: [
      ch('Paths through an obstacle cell?', ['0', '1', '2', 'Skip'], 0, 'You cannot enter it.', 'What happens when you try to step onto a blocked cell?'),
      ch('Start is blocked?', ['0 paths', '1 path', 'Infinite', 'Error'], 0, 'No move is possible.', 'Can you even leave a blocked start?'),
      ch('Recurrence for open cells?', ['dp[r-1][c] + dp[r][c-1]', 'Min of both', 'Always 1', 'Max'], 0, 'Same as before.', 'Use the same recurrence as the plain version.'),
      bl('Fill in the condition for adding from the left.', 'def paths(g):\n    m, n = len(g), len(g[0])\n    dp = [0] * n\n    dp[0] = 1 - g[0][0]\n    for r in range(m):\n        for c in range(n):\n            if g[r][c] == 1:\n                dp[c] = 0\n            elif ___:\n                dp[c] += dp[c - 1]\n    return dp[-1]', ['c > 0', 'c < n', 'r > 0', 'c == 0'], 'c > 0', 'The first column has no left neighbor; without the guard dp[-1] would wrap around.', 'Which column has no cell to its left?'),
    ],
  }),
  make('Minimum Path Sum', {
    teach: ['Minimize the sum of numbers on a right/down path from top-left to bottom-right.', 'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]). Edges only have one source.'],
    questions: [
      ch('Recurrence?', ['grid + min(up, left)', 'grid + max(up, left)', 'min only', 'sum'], 0, 'Best way into the cell.', 'Fill the first row and column of a small grid first.'),
      ch('First row?', ['Running sum from the left', 'All zeros', 'Min', 'Copy'], 0, 'Only one way in.', 'Interior cells choose between two incoming costs.'),
      ch('Space can be reduced to?', ['One row', 'O(1) always', 'O(m * n) required', 'None'], 0, 'Reuse the previous row.', 'Which values from the previous row do you still need?'),
      bl('Fill in the in-place update.', 'def minPathSum(g):\n    m, n = len(g), len(g[0])\n    for r in range(m):\n        for c in range(n):\n            if r == 0 and c == 0: continue\n            up = g[r-1][c] if r else float("inf")\n            left = g[r][c-1] if c else float("inf")\n            g[r][c] += ___\n    return g[-1][-1]', ['min(up, left)', 'max(up, left)', 'up + left', 'up'], 'min(up, left)', 'Take the cheaper way in; infinity on the edges makes the missing neighbor never win.', 'Choose the cheaper way into the cell.'),
    ],
  }),
  make('Longest Common Subsequence', {
    teach: ['Length of the longest subsequence common to two strings.', 'dp[i][j] for prefixes. If s1[i-1] == s2[j-1]: dp = dp[i-1][j-1] + 1. Else dp = max(dp[i-1][j], dp[i][j-1]).'],
    questions: [
      ch('"abcde" and "ace" ->', ['3', '2', '4', '5'], 0, '"ace".', 'Compare the last characters of the two prefixes.'),
      ch('When characters match?', ['dp[i-1][j-1] + 1', 'max of neighbors', '0', 'dp[i][j-1]'], 0, 'Extend the diagonal.', 'What do you lose if they do not match?'),
      ch('Table size?', ['(m + 1) x (n + 1)', 'm x n', 'm + n', 'n²'], 0, 'Includes the empty prefix.', 'Why include an empty prefix row and column?'),
      bug('Find the bug in the match case.', ['def lcs(a, b):', '    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]', '    for i in range(1, len(a) + 1):', '        for j in range(1, len(b) + 1):', '            if a[i-1] == b[j-1]:', '                dp[i][j] = dp[i-1][j] + 1', '            else:', '                dp[i][j] = max(dp[i-1][j], dp[i][j-1])', '    return dp[-1][-1]'], 5, 'A match consumes one character from both strings, so extend the diagonal: dp[i-1][j-1] + 1.', 'A match uses a character from each string.'),
    ],
  }),
  make('Last Stone Weight II', {
    teach: ['Smash stones in pairs; minimize the weight left. This equals splitting stones into two groups with the smallest difference.', 'Subset-sum: find the achievable sum s <= total / 2 closest to half. Answer = total - 2 * s.'],
    questions: [
      ch('The problem reduces to?', ['Two groups with minimal difference', 'Maximum sum', 'Sorting', 'Heap simulation only'], 0, 'Signs + and -.', 'Smashing stones is like giving each stone a + or - sign.'),
      ch('Answer =', ['total - 2 * best_s', 'best_s', 'total', 'total / 2'], 0, 'Difference between the groups.', 'You want two groups with sums as close as possible.'),
      ch('Similar to?', ['Partition Equal Subset Sum', 'Two Sum', 'Daily Temperatures', 'N-Queens'], 0, 'Both use subset-sum DP.', 'Which sums are worth testing?'),
      bl('Fill in the filter for the best sum.', 'def lastStoneWeightII(stones):\n    total = sum(stones)\n    dp = {0}\n    for s in stones:\n        dp |= {x + s for x in dp}\n    best = max(x for x in dp if ___)\n    return total - 2 * best', ['2 * x <= total', 'x >= total', 'x == total', 'x % 2 == 0'], '2 * x <= total', 'Only the smaller group matters: pick the largest reachable sum not exceeding total / 2.', 'Look for the sum closest to half, from below.'),
    ],
  }),
  make('Best Time to Buy And Sell Stock With Cooldown', {
    teach: ['Unlimited transactions, but after selling you must wait one day.', 'State machine: hold, sold, rest. hold = max(hold, rest - price); sold = hold_prev + price; rest = max(rest, sold_prev). Answer = max(sold, rest).'],
    questions: [
      ch('After selling, the next day you?', ['Cannot buy', 'Must buy', 'Must sell', 'Reset'], 0, 'Cooldown.', 'Trace [1,2,3,0,2] day by day.'),
      ch('[1,2,3,0,2] ->', ['3', '2', '4', '5'], 0, 'Buy 1, sell 2, cooldown, buy 0, sell 2.', 'Selling today blocks buying tomorrow.'),
      ch('Number of states?', ['3 (hold, sold, rest)', '1', '2', '5'], 0, 'A tiny state machine.', 'Which state can buy? Which cannot?'),
      bl('Fill in the buy transition.', 'def maxProfit(prices):\n    hold, sold, rest = float("-inf"), 0, 0\n    for p in prices:\n        prev_sold = sold\n        sold = hold + p\n        hold = max(hold, ___)\n        rest = max(rest, prev_sold)\n    return max(sold, rest)', ['rest - p', 'prev_sold - p', '-p', 'sold - p'], 'rest - p', 'Buying is only allowed from the resting state (not the day right after a sale).', 'You cannot buy straight after selling.'),
    ],
  }),
  make('Coin Change II', {
    teach: ['Count the combinations (order does not matter) of coins that make the amount.', 'dp[0] = 1. Loop coins outer, amounts inner: dp[a] += dp[a - coin]. The outer coin loop prevents counting different orders.'],
    questions: [
      ch('amount 5, coins [1,2,5] ->', ['4', '3', '5', '6'], 0, '5; 2+2+1; 2+1+1+1; 1+1+1+1+1.', 'Count combinations for amount 3 with coins [1,2] by hand.'),
      ch('Loop order to avoid duplicates?', ['Coins outer, amounts inner', 'Amounts outer', 'Either', 'Random'], 0, 'Fixes a coin order.', '[1,2] and [2,1] must count once.'),
      ch('dp[0] =', ['1', '0', 'amount', '-1'], 0, 'One way: use no coins.', 'Think about which loop fixes the coin order.'),
      bug('Find the bug (we must count combinations, not orderings).', ['def change(amount, coins):', '    dp = [1] + [0] * amount', '    for a in range(1, amount + 1):', '        for c in coins:', '            if c <= a: dp[a] += dp[a - c]', '    return dp[amount]'], 2, 'Looping amounts outer counts every ordering. Put coins outer so each coin is added in a fixed order.', 'Which loop should be outermost?'),
    ],
  }),
  make('Target Sum', {
    teach: ['Put + or - before each number to reach target. Count the ways.', 'Let P be the set with +. sum(P) = (total + target) / 2. Count subsets with that sum (must be a non-negative integer). Or DP with a map of sums.'],
    questions: [
      ch('[1,1,1,1,1], target 3 ->', ['5', '3', '4', '6'], 0, 'Four +1 and one -1 in 5 positions.', 'Split the numbers into a plus group and a minus group.'),
      ch('Subset sum needed =', ['(total + target) / 2', 'target', 'total', 'total - target'], 0, 'From P - N = target and P + N = total.', 'Two equations: P - N = target, P + N = total.'),
      ch('If (total + target) is odd?', ['0 ways', '1 way', 'Round', 'Error'], 0, 'Not an integer.', 'What range can target be in?'),
      bl('Fill in the subset-count update.', 'def findTargetSumWays(nums, target):\n    total = sum(nums)\n    if (total + target) % 2 or abs(target) > total: return 0\n    need = (total + target) // 2\n    dp = [1] + [0] * need\n    for n in nums:\n        for s in range(need, n - 1, -1):\n            dp[s] += ___\n    return dp[need]', ['dp[s - n]', 'dp[s + n]', 'dp[n]', '1'], 'dp[s - n]', 'Every subset that sums to s - n becomes a subset summing to s by adding n.', 'Count ways to reach the sum without this number.'),
    ],
  }),
  make('Interleaving String', {
    teach: ['Is s3 an interleaving of s1 and s2 (keeping each string\'s order)?', 'Lengths must add up. dp[i][j] = true if s3[:i+j] can be formed from s1[:i] and s2[:j]: (dp[i-1][j] and s1[i-1]==s3[i+j-1]) or (dp[i][j-1] and s2[j-1]==s3[i+j-1]).'],
    questions: [
      ch('First check?', ['len(s1) + len(s2) == len(s3)', 'Equal letters', 'Sorted', 'None'], 0, 'Otherwise impossible.', 'Try s1="ab", s2="c", s3="acb" by hand.'),
      ch('dp[i][j] uses?', ['i chars of s1 and j chars of s2', 'Index i of s3', 'Only s1', 'Sets'], 0, 'Prefix pair.', 'Index s3 by the total chars used from both strings.'),
      ch('Next s3 character comes from?', ['Next of s1 or next of s2', 'Always s1', 'Anywhere', 'Reverse'], 0, 'Two choices.', 'Compare the character that was just added.'),
      bug('Find the bug in the DP.', ['def isInterleave(s1, s2, s3):', '    if len(s1) + len(s2) != len(s3): return False', '    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]', '    dp[0][0] = True', '    for i in range(len(s1) + 1):', '        for j in range(len(s2) + 1):', '            if i and dp[i-1][j] and s1[i-1] == s3[i+j-1]: dp[i][j] = True', '            if j and dp[i][j-1] and s2[j-1] == s3[i+j]: dp[i][j] = True', '    return dp[-1][-1]'], 7, 'The last character of s3[:i+j] is s3[i+j-1]; the s2 branch used s3[i+j] (off by one).', 'Compare the two index expressions into s3.'),
    ],
  }),
  make('Stone Game', {
    teach: ['Alice and Bob alternately take a pile from either end. Alice goes first; even number of piles, total odd. Does Alice win?', 'With an even number of piles, Alice can always choose all even-indexed or all odd-indexed piles, so she always wins: return true. (The interval DP also works.)'],
    questions: [
      ch('Answer to the LeetCode version?', ['Always true', 'Always false', 'Depends', 'Random'], 0, 'Alice picks the better parity.', 'Think about the indices of the piles Alice can reserve.'),
      ch('General solution style?', ['Interval DP on [l, r]', 'Sliding window', 'Union-Find', 'Trie'], 0, 'Subarray ends.', 'Try 4 piles and compare even-index and odd-index sums.'),
      ch('dp[l][r] stores?', ['Best score difference for the player to move', 'Sum', 'Count', 'Index'], 0, 'Relative advantage.', 'For the general DP, what state is an interval?'),
      bl('Fill in the interval DP transition (1D version).', 'def stoneGame(p):\n    n = len(p)\n    dp = p[:]\n    for length in range(2, n + 1):\n        for l in range(n - length + 1):\n            r = l + length - 1\n            dp[l] = max(p[l] - dp[l + 1], ___)\n    return dp[0] > 0', ['p[r] - dp[l]', 'p[r] - dp[l + 1]', 'p[r] + dp[l]', 'p[l] - dp[l]'], 'p[r] - dp[l]', 'Taking the right pile leaves interval [l, r-1], still stored in dp[l]; subtract the opponent result.', 'Taking the right end leaves [l, r-1].'),
    ],
  }),
  make('Stone Game II', {
    teach: ['Players take the first X piles with 1 <= X <= 2M; then M = max(M, X). Maximize Alice\'s stones.', 'dp(i, M) = max stones the player to move gets from piles i... Use suffix sums: dp(i, M) = suffix[i] - min(dp(i + X, max(M, X))) over X.'],
    questions: [
      ch('The state is?', ['(i, M)', 'i only', 'M only', 'Sum'], 0, 'Position and current limit.', 'What two things define the situation before a move?'),
      ch('The player gets?', ['Remaining stones minus the opponent\'s best', 'All stones', 'Half', 'Nothing'], 0, 'Zero-sum play.', 'The player takes the first X piles, up to 2M.'),
      ch('Technique?', ['Memoized recursion + suffix sums', 'Greedy', 'Binary search', 'BFS'], 0, 'Avoid recomputing sums.', 'Suffix sums give you remaining stones in O(1).'),
      ord('Order the steps of the solution.', ['Build suffix sums of the piles', 'Define dp(i, M) for the player to move', 'Try each X from 1 to 2M', 'Opponent then plays dp(i + X, max(M, X))', 'Return suffix[i] minus the smallest opponent result'], 'Precompute suffix sums, then memoize over (i, M): the mover keeps what remains minus the opponent best reply, which the opponent minimizes for us.', false, 'Precompute, define state, try moves, then pick.'),
    ],
  }),
  make('Longest Increasing Path In a Matrix', {
    teach: ['Longest path of strictly increasing cells moving in 4 directions.', 'DFS with memoization: dfs(r, c) = 1 + max(dfs(neighbor)) over larger neighbors. Cache each cell. No cycles are possible because values strictly increase.'],
    questions: [
      ch('Why can we cache results?', ['A cell\'s best path never changes', 'Speed only', 'Sorting', 'No reason'], 0, 'Optimal substructure.', 'Which neighbors may you move to from a cell?'),
      ch('Why no visited set needed?', ['Values strictly increase so no cycles', 'Memory', 'Mistake', 'Needed'], 0, 'You can never return.', 'Starting from different cells may revisit the same cell.'),
      ch('Time complexity?', ['O(m * n)', 'O((m * n)²)', 'O(4^(m*n))', 'O(m + n)'], 0, 'Each cell computed once.', 'Cache the answer per cell.'),
      bl('Fill in the neighbor condition.', 'def longestIncreasingPath(g):\n    m, n = len(g), len(g[0])\n    memo = {}\n    def dfs(r, c):\n        if (r, c) in memo: return memo[(r, c)]\n        best = 1\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r + dr, c + dc\n            if 0 <= nr < m and 0 <= nc < n and ___:\n                best = max(best, 1 + dfs(nr, nc))\n        memo[(r, c)] = best\n        return best\n    return max(dfs(r, c) for r in range(m) for c in range(n))', ['g[nr][nc] > g[r][c]', 'g[nr][nc] >= g[r][c]', 'g[nr][nc] != g[r][c]', '(nr, nc) not in memo'], 'g[nr][nc] > g[r][c]', 'The path must be strictly increasing, so only step to a strictly larger neighbor; this also prevents cycles.', 'The path must go strictly up.'),
    ],
  }),
  make('Distinct Subsequences', {
    teach: ['Count the distinct subsequences of s that equal t.', 'dp[i][j] = ways s[:i] forms t[:j]. dp[i][0] = 1. If s[i-1] == t[j-1]: dp = dp[i-1][j-1] + dp[i-1][j]; else dp = dp[i-1][j].'],
    questions: [
      ch('"rabbbit" -> "rabbit"', ['3', '1', '2', '4'], 0, 'Three ways to choose the b\'s.', 'Try "rabbbit" -> "rabbit" and count by hand.'),
      ch('dp[i][0] =', ['1', '0', 'i', '-1'], 0, 'Empty target: one way (use nothing).', 'When characters match, you can use the match or skip it.'),
      ch('When characters match you add?', ['Use it + skip it', 'Only use it', 'Only skip it', 'Nothing'], 0, 'Both are valid choices.', 'What does an empty t need from any prefix of s?'),
      bl('Fill in the match contribution.', 'def numDistinct(s, t):\n    dp = [[0] * (len(t) + 1) for _ in range(len(s) + 1)]\n    for i in range(len(s) + 1): dp[i][0] = 1\n    for i in range(1, len(s) + 1):\n        for j in range(1, len(t) + 1):\n            dp[i][j] = dp[i-1][j]\n            if s[i-1] == t[j-1]:\n                dp[i][j] += ___\n    return dp[-1][-1]', ['dp[i-1][j-1]', 'dp[i][j-1]', 'dp[i-1][j]', '1'], 'dp[i-1][j-1]', 'dp[i-1][j] counts skipping s[i-1]; using it matches t[j-1], leaving s[:i-1] to form t[:j-1].', 'Using the match shrinks both prefixes.'),
    ],
  }),
  make('Edit Distance', {
    teach: ['Minimum insert / delete / replace operations to turn word1 into word2.', 'dp[i][j] = edits for the prefixes. If chars match: dp[i-1][j-1]. Else 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]). Base: dp[i][0] = i, dp[0][j] = j.'],
    questions: [
      ch('"horse" -> "ros"', ['3', '2', '4', '5'], 0, 'replace h->r, remove r, remove e.', 'Convert "ab" to "b" by hand and note the operations.'),
      ch('dp[0][j] =', ['j', '0', '1', 'j + 1'], 0, 'Insert j characters.', 'Each operation maps to a neighboring cell.'),
      ch('Operations allowed?', ['Insert, delete, replace', 'Swap only', 'Replace only', 'Reverse'], 0, 'Levenshtein distance.', 'How many characters do you insert from an empty string?'),
      bug('Find the bug in the mismatch case.', ['def minDistance(a, b):', '    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]', '    for i in range(len(a) + 1): dp[i][0] = i', '    for j in range(len(b) + 1): dp[0][j] = j', '    for i in range(1, len(a) + 1):', '        for j in range(1, len(b) + 1):', '            if a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1]', '            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1])', '    return dp[-1][-1]'], 7, 'The replace option is missing: include dp[i-1][j-1] in the min.', 'Count the three operations versus the cells used.'),
    ],
  }),
  make('Burst Balloons', {
    teach: ['Burst balloons for coins nums[i-1] * nums[i] * nums[i+1]. Maximize coins.', 'Think in reverse: interval DP where k is the LAST balloon burst in (l, r). dp[l][r] = max over k of dp[l][k] + dp[k][r] + nums[l] * nums[k] * nums[r]. Pad nums with 1 on both sides.'],
    questions: [
      ch('Why "last burst" instead of first?', ['Neighbors become independent subproblems', 'Speed', 'Memory', 'No reason'], 0, 'The ends are fixed.', 'Which balloon is guaranteed to still be next to the boundaries?'),
      ch('Pad nums with?', ['1 on both ends', '0 on both ends', 'Nothing', 'max'], 0, 'Boundaries behave like 1.', 'Pick the last balloon to burst in an interval.'),
      ch('Time complexity?', ['O(n³)', 'O(n²)', 'O(n)', 'O(2^n)'], 0, 'Intervals x split point.', 'The padded ends never burst.'),
      bl('Fill in the coins for bursting k last.', 'def maxCoins(nums):\n    a = [1] + nums + [1]\n    n = len(a)\n    dp = [[0] * n for _ in range(n)]\n    for length in range(2, n):\n        for l in range(n - length):\n            r = l + length\n            for k in range(l + 1, r):\n                dp[l][r] = max(dp[l][r], dp[l][k] + dp[k][r] + ___)\n    return dp[0][n-1]', ['a[l] * a[k] * a[r]', 'a[k-1] * a[k] * a[k+1]', 'a[l] + a[k] + a[r]', 'a[k]'], 'a[l] * a[k] * a[r]', 'When k is burst last, everything between is gone, so its neighbors are exactly l and r.', 'Who are the neighbors once everything else is gone?'),
    ],
  }),
  make('Regular Expression Matching', {
    teach: ['Match s against a pattern with "." (any char) and "*" (zero or more of the previous char).', 'dp[i][j] = s[:i] matches p[:j]. If p[j-1] is "*": zero copies dp[i][j-2], or one more if the previous pattern char matches s[i-1]: dp[i-1][j]. Otherwise a normal char/"." match with dp[i-1][j-1].'],
    questions: [
      ch('"aa" matches "a*" ?', ['Yes', 'No'], 0, 'a* means zero or more a.', 'Match "aa" against "a*" step by step.'),
      ch('"." means?', ['Any single character', 'Any sequence', 'A dot', 'Nothing'], 0, 'Wildcard.', 'A star can mean zero copies or one more copy.'),
      ch('"*" applies to?', ['The previous element', 'The next element', 'The whole pattern', 'The first char'], 0, 'Repeat the preceding char.', 'The star pairs with the character before it.'),
      bl('Fill in the extra-copy condition.', 'def isMatch(s, p):\n    m, n = len(s), len(p)\n    dp = [[False] * (n + 1) for _ in range(m + 1)]\n    dp[0][0] = True\n    for i in range(m + 1):\n        for j in range(1, n + 1):\n            if p[j-1] == "*":\n                dp[i][j] = dp[i][j-2] or (i > 0 and dp[i-1][j] and ___)\n            elif i > 0:\n                dp[i][j] = dp[i-1][j-1] and p[j-1] in (s[i-1], ".")\n    return dp[m][n]', ['p[j-2] in (s[i-1], ".")', 'p[j-1] in (s[i-1], ".")', 'p[j-2] == "."', 's[i-1] == s[i-2]'], 'p[j-2] in (s[i-1], ".")', 'One more copy is valid only if the character before the star equals s[i-1] or is a dot.', 'Which pattern char does the star repeat?'),
    ],
  }),
];
