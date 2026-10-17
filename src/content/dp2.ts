import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const dp2: Lesson[] = [
  make('Unique Paths', {
    teach: ['Robot moves only right or down in an m x n grid. Count paths from top-left to bottom-right.', 'dp[r][c] = dp[r-1][c] + dp[r][c-1]. First row and column are 1. Can be done with one row. Or combinatorics: C(m+n-2, m-1).'],
    questions: [
      ch('3 x 7 grid ->', ['28', '21', '14', '35'], 0, 'C(8, 2) = 28.'),
      ch('dp[r][c] =', ['dp[r-1][c] + dp[r][c-1]', 'max of both', 'r * c', 'dp[r-1][c]'], 0, 'Came from above or left.'),
      ch('First row values?', ['All 1', 'All 0', 'Increasing', 'Random'], 0, 'Only one way straight right.'),
    ],
  }),
  make('Unique Paths II', {
    teach: ['Same as Unique Paths, but some cells are obstacles (1).', 'Same recurrence, but an obstacle cell has 0 paths. If the start or end is an obstacle the answer is 0.'],
    questions: [
      ch('Paths through an obstacle cell?', ['0', '1', '2', 'Skip'], 0, 'You cannot enter it.'),
      ch('Start is blocked?', ['0 paths', '1 path', 'Infinite', 'Error'], 0, 'No move is possible.'),
      ch('Recurrence for open cells?', ['dp[r-1][c] + dp[r][c-1]', 'Min of both', 'Always 1', 'Max'], 0, 'Same as before.'),
    ],
  }),
  make('Minimum Path Sum', {
    teach: ['Minimize the sum of numbers on a right/down path from top-left to bottom-right.', 'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]). Edges only have one source.'],
    questions: [
      ch('Recurrence?', ['grid + min(up, left)', 'grid + max(up, left)', 'min only', 'sum'], 0, 'Best way into the cell.'),
      ch('First row?', ['Running sum from the left', 'All zeros', 'Min', 'Copy'], 0, 'Only one way in.'),
      ch('Space can be reduced to?', ['One row', 'O(1) always', 'O(m * n) required', 'None'], 0, 'Reuse the previous row.'),
    ],
  }),
  make('Longest Common Subsequence', {
    teach: ['Length of the longest subsequence common to two strings.', 'dp[i][j] for prefixes. If s1[i-1] == s2[j-1]: dp = dp[i-1][j-1] + 1. Else dp = max(dp[i-1][j], dp[i][j-1]).'],
    questions: [
      ch('"abcde" and "ace" ->', ['3', '2', '4', '5'], 0, '"ace".'),
      ch('When characters match?', ['dp[i-1][j-1] + 1', 'max of neighbors', '0', 'dp[i][j-1]'], 0, 'Extend the diagonal.'),
      ch('Table size?', ['(m + 1) x (n + 1)', 'm x n', 'm + n', 'n²'], 0, 'Includes the empty prefix.'),
    ],
  }),
  make('Last Stone Weight II', {
    teach: ['Smash stones in pairs; minimize the weight left. This equals splitting stones into two groups with the smallest difference.', 'Subset-sum: find the achievable sum s <= total / 2 closest to half. Answer = total - 2 * s.'],
    questions: [
      ch('The problem reduces to?', ['Two groups with minimal difference', 'Maximum sum', 'Sorting', 'Heap simulation only'], 0, 'Signs + and -.'),
      ch('Answer =', ['total - 2 * best_s', 'best_s', 'total', 'total / 2'], 0, 'Difference between the groups.'),
      ch('Similar to?', ['Partition Equal Subset Sum', 'Two Sum', 'Daily Temperatures', 'N-Queens'], 0, 'Both use subset-sum DP.'),
    ],
  }),
  make('Best Time to Buy And Sell Stock With Cooldown', {
    teach: ['Unlimited transactions, but after selling you must wait one day.', 'State machine: hold, sold, rest. hold = max(hold, rest - price); sold = hold_prev + price; rest = max(rest, sold_prev). Answer = max(sold, rest).'],
    questions: [
      ch('After selling, the next day you?', ['Cannot buy', 'Must buy', 'Must sell', 'Reset'], 0, 'Cooldown.'),
      ch('[1,2,3,0,2] ->', ['3', '2', '4', '5'], 0, 'Buy 1, sell 2, cooldown, buy 0, sell 2.'),
      ch('Number of states?', ['3 (hold, sold, rest)', '1', '2', '5'], 0, 'A tiny state machine.'),
    ],
  }),
  make('Coin Change II', {
    teach: ['Count the combinations (order does not matter) of coins that make the amount.', 'dp[0] = 1. Loop coins outer, amounts inner: dp[a] += dp[a - coin]. The outer coin loop prevents counting different orders.'],
    questions: [
      ch('amount 5, coins [1,2,5] ->', ['4', '3', '5', '6'], 0, '5; 2+2+1; 2+1+1+1; 1+1+1+1+1.'),
      ch('Loop order to avoid duplicates?', ['Coins outer, amounts inner', 'Amounts outer', 'Either', 'Random'], 0, 'Fixes a coin order.'),
      ch('dp[0] =', ['1', '0', 'amount', '-1'], 0, 'One way: use no coins.'),
    ],
  }),
  make('Target Sum', {
    teach: ['Put + or - before each number to reach target. Count the ways.', 'Let P be the set with +. sum(P) = (total + target) / 2. Count subsets with that sum (must be a non-negative integer). Or DP with a map of sums.'],
    questions: [
      ch('[1,1,1,1,1], target 3 ->', ['5', '3', '4', '6'], 0, 'Four +1 and one -1 in 5 positions.'),
      ch('Subset sum needed =', ['(total + target) / 2', 'target', 'total', 'total - target'], 0, 'From P - N = target and P + N = total.'),
      ch('If (total + target) is odd?', ['0 ways', '1 way', 'Round', 'Error'], 0, 'Not an integer.'),
    ],
  }),
  make('Interleaving String', {
    teach: ['Is s3 an interleaving of s1 and s2 (keeping each string\'s order)?', 'Lengths must add up. dp[i][j] = true if s3[:i+j] can be formed from s1[:i] and s2[:j]: (dp[i-1][j] and s1[i-1]==s3[i+j-1]) or (dp[i][j-1] and s2[j-1]==s3[i+j-1]).'],
    questions: [
      ch('First check?', ['len(s1) + len(s2) == len(s3)', 'Equal letters', 'Sorted', 'None'], 0, 'Otherwise impossible.'),
      ch('dp[i][j] uses?', ['i chars of s1 and j chars of s2', 'Index i of s3', 'Only s1', 'Sets'], 0, 'Prefix pair.'),
      ch('Next s3 character comes from?', ['Next of s1 or next of s2', 'Always s1', 'Anywhere', 'Reverse'], 0, 'Two choices.'),
    ],
  }),
  make('Stone Game', {
    teach: ['Alice and Bob alternately take a pile from either end. Alice goes first; even number of piles, total odd. Does Alice win?', 'With an even number of piles, Alice can always choose all even-indexed or all odd-indexed piles, so she always wins: return true. (The interval DP also works.)'],
    questions: [
      ch('Answer to the LeetCode version?', ['Always true', 'Always false', 'Depends', 'Random'], 0, 'Alice picks the better parity.'),
      ch('General solution style?', ['Interval DP on [l, r]', 'Sliding window', 'Union-Find', 'Trie'], 0, 'Subarray ends.'),
      ch('dp[l][r] stores?', ['Best score difference for the player to move', 'Sum', 'Count', 'Index'], 0, 'Relative advantage.'),
    ],
  }),
  make('Stone Game II', {
    teach: ['Players take the first X piles with 1 <= X <= 2M; then M = max(M, X). Maximize Alice\'s stones.', 'dp(i, M) = max stones the player to move gets from piles i... Use suffix sums: dp(i, M) = suffix[i] - min(dp(i + X, max(M, X))) over X.'],
    questions: [
      ch('The state is?', ['(i, M)', 'i only', 'M only', 'Sum'], 0, 'Position and current limit.'),
      ch('The player gets?', ['Remaining stones minus the opponent\'s best', 'All stones', 'Half', 'Nothing'], 0, 'Zero-sum play.'),
      ch('Technique?', ['Memoized recursion + suffix sums', 'Greedy', 'Binary search', 'BFS'], 0, 'Avoid recomputing sums.'),
    ],
  }),
  make('Longest Increasing Path In a Matrix', {
    teach: ['Longest path of strictly increasing cells moving in 4 directions.', 'DFS with memoization: dfs(r, c) = 1 + max(dfs(neighbor)) over larger neighbors. Cache each cell. No cycles are possible because values strictly increase.'],
    questions: [
      ch('Why can we cache results?', ['A cell\'s best path never changes', 'Speed only', 'Sorting', 'No reason'], 0, 'Optimal substructure.'),
      ch('Why no visited set needed?', ['Values strictly increase so no cycles', 'Memory', 'Mistake', 'Needed'], 0, 'You can never return.'),
      ch('Time complexity?', ['O(m * n)', 'O((m * n)²)', 'O(4^(m*n))', 'O(m + n)'], 0, 'Each cell computed once.'),
    ],
  }),
  make('Distinct Subsequences', {
    teach: ['Count the distinct subsequences of s that equal t.', 'dp[i][j] = ways s[:i] forms t[:j]. dp[i][0] = 1. If s[i-1] == t[j-1]: dp = dp[i-1][j-1] + dp[i-1][j]; else dp = dp[i-1][j].'],
    questions: [
      ch('"rabbbit" -> "rabbit"', ['3', '1', '2', '4'], 0, 'Three ways to choose the b\'s.'),
      ch('dp[i][0] =', ['1', '0', 'i', '-1'], 0, 'Empty target: one way (use nothing).'),
      ch('When characters match you add?', ['Use it + skip it', 'Only use it', 'Only skip it', 'Nothing'], 0, 'Both are valid choices.'),
    ],
  }),
  make('Edit Distance', {
    teach: ['Minimum insert / delete / replace operations to turn word1 into word2.', 'dp[i][j] = edits for the prefixes. If chars match: dp[i-1][j-1]. Else 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]). Base: dp[i][0] = i, dp[0][j] = j.'],
    questions: [
      ch('"horse" -> "ros"', ['3', '2', '4', '5'], 0, 'replace h->r, remove r, remove e.'),
      ch('dp[0][j] =', ['j', '0', '1', 'j + 1'], 0, 'Insert j characters.'),
      ch('Operations allowed?', ['Insert, delete, replace', 'Swap only', 'Replace only', 'Reverse'], 0, 'Levenshtein distance.'),
    ],
  }),
  make('Burst Balloons', {
    teach: ['Burst balloons for coins nums[i-1] * nums[i] * nums[i+1]. Maximize coins.', 'Think in reverse: interval DP where k is the LAST balloon burst in (l, r). dp[l][r] = max over k of dp[l][k] + dp[k][r] + nums[l] * nums[k] * nums[r]. Pad nums with 1 on both sides.'],
    questions: [
      ch('Why "last burst" instead of first?', ['Neighbors become independent subproblems', 'Speed', 'Memory', 'No reason'], 0, 'The ends are fixed.'),
      ch('Pad nums with?', ['1 on both ends', '0 on both ends', 'Nothing', 'max'], 0, 'Boundaries behave like 1.'),
      ch('Time complexity?', ['O(n³)', 'O(n²)', 'O(n)', 'O(2^n)'], 0, 'Intervals x split point.'),
    ],
  }),
  make('Regular Expression Matching', {
    teach: ['Match s against a pattern with "." (any char) and "*" (zero or more of the previous char).', 'dp[i][j] = s[:i] matches p[:j]. If p[j-1] is "*": zero copies dp[i][j-2], or one more if the previous pattern char matches s[i-1]: dp[i-1][j]. Otherwise a normal char/"." match with dp[i-1][j-1].'],
    questions: [
      ch('"aa" matches "a*" ?', ['Yes', 'No'], 0, 'a* means zero or more a.'),
      ch('"." means?', ['Any single character', 'Any sequence', 'A dot', 'Nothing'], 0, 'Wildcard.'),
      ch('"*" applies to?', ['The previous element', 'The next element', 'The whole pattern', 'The first char'], 0, 'Repeat the preceding char.'),
    ],
  }),
];
