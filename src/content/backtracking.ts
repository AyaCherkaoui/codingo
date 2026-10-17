import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const backtracking: Lesson[] = [
  make('Sum of All Subsets XOR Total', {
    teach: ['Sum the XOR of every subset of nums.', 'Backtrack: at each index choose to include or exclude the number, carrying the running XOR. At the end add the XOR to the total. 2^n subsets.'],
    questions: [
      ch('How many subsets for n numbers?', ['2^n', 'n²', 'n!', 'n'], 0, 'Each element in or out.'),
      ch('[1,3] ->', ['6', '4', '7', '2'], 0, '0 + 1 + 3 + (1^3=2) = 6.'),
      ch('The XOR of the empty subset?', ['0', '1', '-1', 'undefined'], 0, 'XOR identity is 0.'),
    ],
  }),
  make('Subsets', {
    teach: ['Return all subsets (the power set) of distinct numbers.', 'DFS(i, path): at each index choose to take nums[i] or skip it. When i reaches the end, record a copy of path. Undo the choice after recursing (backtrack).'],
    questions: [
      ch('[1,2,3] has how many subsets?', ['8', '6', '9', '3'], 0, '2³ = 8.'),
      ord('Order the "include" branch', ['path.append(nums[i])', 'dfs(i + 1)', 'path.pop()'], 'Choose, explore, un-choose.', true),
      ch('Why copy path when recording?', ['path keeps changing', 'Speed', 'Python needs it', 'No reason'], 0, 'Otherwise all results alias one list.'),
    ],
  }),
  make('Combination Sum', {
    teach: ['Find all combinations of candidates (reuse allowed) that sum to target.', 'DFS(i, path, total). Either take candidates[i] again (stay at i) or move to i + 1. Stop when total == target (record) or total > target (prune).'],
    questions: [
      ch('Reuse of a number is allowed. After taking nums[i], recurse with?', ['The same index i', 'i + 1', 'i - 1', '0'], 0, 'You can pick it again.'),
      ch('When do you prune?', ['total > target', 'total < target', 'always', 'never'], 0, 'Positive numbers only grow.'),
      ch('Why move forward in index?', ['Avoid duplicate combinations in a different order', 'Speed only', 'Sorting', 'No reason'], 0, '[2,3] and [3,2] are the same.'),
    ],
  }),
  make('Combination Sum II', {
    teach: ['Candidates may have duplicates; each number is used at most once; the result must have no duplicate combinations.', 'Sort. In the loop at a given level skip a value equal to the previous one (i > start and nums[i] == nums[i-1]). Recurse with i + 1.'],
    questions: [
      ch('Why sort first?', ['So equal values are adjacent and can be skipped', 'Speed only', 'Required by Python', 'No reason'], 0, 'Dedupe by neighbors.'),
      ch('Skip condition?', ['i > start and nums[i] == nums[i-1]', 'i == start', 'nums[i] > target', 'always'], 0, 'Same value at the same level.'),
      ch('Recurse with which index?', ['i + 1', 'i', '0', 'start'], 0, 'Each number once.'),
    ],
  }),
  make('Combinations', {
    teach: ['Choose k numbers from 1..n (all combinations).', 'DFS(start, path): for num in start..n, append, recurse with num + 1, pop. Record when len(path) == k. Prune when not enough numbers remain.'],
    questions: [
      ch('n = 4, k = 2. How many combinations?', ['6', '4', '8', '12'], 0, 'C(4,2) = 6.'),
      ch('Why recurse with num + 1?', ['No repeats and no reordering', 'Speed', 'Sorting', 'No reason'], 0, 'Combinations ignore order.'),
      ch('When do you record a result?', ['len(path) == k', 'num == n', 'start == 1', 'always'], 0, 'Path is complete.'),
    ],
  }),
  make('Permutations', {
    teach: ['All orderings of distinct numbers.', 'DFS(path, used). At each step try every unused number. When path has n numbers record it. Mark used before recursing and unmark after.'],
    questions: [
      ch('[1,2,3] has how many permutations?', ['6', '3', '8', '9'], 0, '3! = 6.'),
      ch('How do you avoid reusing a number?', ['A used[] array', 'Sort', 'Hash', 'Stack'], 0, 'Mark and unmark.'),
      ch('Difference from subsets?', ['Order matters and all elements are used', 'None', 'Subsets use order', 'Permutations are smaller'], 0, 'Different arrangement = different result.'),
    ],
  }),
  make('Subsets II', {
    teach: ['Subsets of an array that may contain duplicates, without duplicate subsets.', 'Sort. In the loop-style DFS, for each start skip nums[i] if i > start and nums[i] == nums[i-1]. Record every path.'],
    questions: [
      ch('[1,2,2] gives how many unique subsets?', ['6', '8', '4', '3'], 0, '[], [1], [1,2], [1,2,2], [2], [2,2].'),
      ch('Duplicates are handled by?', ['Sorting and skipping equal neighbors at the same level', 'A giant set at the end only', 'Ignoring', 'Counting'], 0, 'Prune early.'),
      ch('When do you record?', ['At every node of the recursion', 'Only at leaves', 'Only at the end', 'Never'], 0, 'Every path is a subset.'),
    ],
  }),
  make('Permutations II', {
    teach: ['All unique permutations of numbers that may repeat.', 'Sort. Use used[]. Skip nums[i] if it equals nums[i-1] and nums[i-1] is not used (it would create the same arrangement). Or use a count map.'],
    questions: [
      ch('[1,1,2] has how many unique permutations?', ['3', '6', '2', '4'], 0, '112, 121, 211.'),
      ch('Why sort?', ['Bring equal values together', 'Speed', 'Required', 'No reason'], 0, 'To detect duplicates by neighbors.'),
      ch('Alternative method?', ['Counter of remaining values', 'Binary search', 'Stack', 'Sliding window'], 0, 'Pick values with count > 0.'),
    ],
  }),
  make('Generate Parentheses', {
    teach: ['Generate all valid combinations of n pairs of parentheses.', 'DFS with counts open and close. Add "(" if open < n. Add ")" if close < open. Record when the length is 2n.'],
    questions: [
      ch('n = 3 gives how many strings?', ['5', '6', '8', '3'], 0, 'Catalan number C3 = 5.'),
      ch('When can you add ")"?', ['close < open', 'open < n', 'always', 'never'], 0, 'Never close more than opened.'),
      ch('When can you add "("?', ['open < n', 'close < open', 'always', 'never'], 0, 'Only n openers allowed.'),
    ],
  }),
  make('Word Search', {
    teach: ['Does the word exist in a grid by moving up/down/left/right without reusing a cell?', 'DFS from each cell matching word[0]. Mark the cell visited (e.g., set to "#"), explore 4 neighbors for the next letter, then restore the cell.'],
    questions: [
      ch('How do you prevent reuse?', ['Mark visited, then restore', 'Copy the grid every step', 'Ignore', 'Sort'], 0, 'Backtracking.'),
      ch('When is the word found?', ['index == len(word)', 'cell == "#"', 'row == 0', 'never'], 0, 'All letters matched.'),
      ch('Time complexity?', ['O(m * n * 4^L)', 'O(m * n)', 'O(L)', 'O(1)'], 0, 'Up to 4 directions per letter, from each cell.'),
    ],
  }),
  make('Palindrome Partitioning', {
    teach: ['Split a string so every part is a palindrome; list all ways.', 'DFS(start): for end in start..n, if s[start:end+1] is a palindrome, add it, recurse from end + 1, then remove. When start == n record the partition.'],
    questions: [
      ch('"aab" gives?', ['[["a","a","b"],["aa","b"]]', '[["aab"]]', '[["a","ab"]]', '[]'], 0, 'Every part is a palindrome.'),
      ch('When do you record a partition?', ['start == len(s)', 'end == 0', 'always', 'never'], 0, 'The whole string is consumed.'),
      ch('Speed-up?', ['Precompute palindrome table with DP', 'Sorting', 'Hashing', 'None'], 0, 'O(1) palindrome checks.'),
    ],
  }),
  make('Letter Combinations of a Phone Number', {
    teach: ['Phone digits 2-9 map to letters (2: abc, 3: def, ...). List all letter combinations for a digit string.', 'DFS(i, path): for each letter of digits[i] append, recurse to i + 1, pop. Record at i == len(digits).'],
    questions: [
      ch('"23" gives how many strings?', ['9', '6', '5', '12'], 0, '3 * 3 = 9.'),
      ch('Digit 7 maps to how many letters?', ['4', '3', '2', '5'], 0, 'pqrs.'),
      ch('Empty input returns?', ['[] (empty list)', '[""]', 'None', 'error'], 0, 'No digits, no combinations.'),
    ],
  }),
  make('Matchsticks to Square', {
    teach: ['Can all matchsticks form a square (use every stick once)?', 'Total must be divisible by 4: side = total / 4. Sort descending. Backtrack: place each stick into one of 4 sides without exceeding side. Skip identical side states to prune.'],
    questions: [
      ch('First check?', ['total % 4 == 0', 'n == 4', 'max == min', 'sorted'], 0, 'Four equal sides.'),
      ch('Why sort descending?', ['Big sticks fail fast', 'Required', 'Looks nice', 'No reason'], 0, 'Prune early.'),
      ch('The search space is?', ['Assign each stick to one of 4 sides', 'Permutations only', 'Subsets only', 'None'], 0, '4^n at worst.'),
    ],
  }),
  make('Partition to K Equal Sum Subsets', {
    teach: ['Split nums into k subsets with equal sums.', 'target = sum / k (must divide). Backtrack by filling one bucket at a time up to target, using a used[] mask. Sort descending and prune. Bitmask DP also works.'],
    questions: [
      ch('Each subset must sum to?', ['total / k', 'total', 'k', 'max'], 0, 'Equal split.'),
      ch('If total % k != 0?', ['Return false', 'Round', 'Try anyway', 'Return true'], 0, 'Impossible.'),
      ch('Related problem?', ['Matchsticks to Square (k = 4)', 'Two Sum', 'Binary Search', 'LRU Cache'], 0, 'Same idea.'),
    ],
  }),
  make('N Queens', {
    teach: ['Place n queens on an n x n board so none attack each other; list all solutions.', 'Place one queen per row. Track used columns and the two diagonals (row - col and row + col) in sets. Try each column, recurse to the next row, undo.'],
    questions: [
      ch('Diagonal identifiers?', ['row - col and row + col', 'row * col', 'row only', 'col only'], 0, 'Constant along each diagonal.'),
      ch('One queen per what?', ['Row', 'Corner', 'Diagonal', 'Cell'], 0, 'We place row by row.'),
      ch('n = 4 has how many solutions?', ['2', '1', '4', '0'], 0, 'Two arrangements.'),
    ],
  }),
  make('N Queens II', {
    teach: ['Same as N-Queens, but return only the NUMBER of solutions.', 'Reuse the same backtracking with column and diagonal sets, but count instead of building boards.'],
    questions: [
      ch('What changes from N-Queens?', ['Count instead of storing boards', 'Nothing', 'Different board', 'Larger n'], 0, 'Less memory.'),
      ch('n = 1 ->', ['1', '0', '2', '4'], 0, 'One queen, one square.'),
      ch('n = 8 ->', ['92', '64', '8', '40'], 0, 'Classic: 92 solutions.'),
    ],
  }),
  make('Word Break II', {
    teach: ['Add spaces in s to build sentences where every word is in the dictionary; return all sentences.', 'DFS(start) with memoization: for each end where s[start:end] is a word, combine it with all sentences from DFS(end). Cache results per start.'],
    questions: [
      ch('Why memoize?', ['Same suffix is solved many times', 'Speed only for small input', 'No need', 'Sorting'], 0, 'Overlapping subproblems.'),
      ch('DFS(start) returns?', ['All sentences for s[start:]', 'A boolean', 'A count', 'A word'], 0, 'List of strings.'),
      ch('Difference from Word Break I?', ['We return all sentences, not just true/false', 'None', 'Different dictionary', 'Smaller input'], 0, 'Output size can be exponential.'),
    ],
  }),
];
