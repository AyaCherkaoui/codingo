import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const backtracking: Lesson[] = [
  make('Sum of All Subsets XOR Total', {
    teach: ['Sum the XOR of every subset of nums.', 'Backtrack: at each index choose to include or exclude the number, carrying the running XOR. At the end add the XOR to the total. 2^n subsets.'],
    questions: [
      ch('How many subsets for n numbers?', ['2^n', 'n²', 'n!', 'n'], 0, 'Each element in or out.', 'Each element has two choices.'),
      ch('[1,3] ->', ['6', '4', '7', '2'], 0, '0 + 1 + 3 + (1^3=2) = 6.', 'Work out 1, 3, and 1^3 separately and add.'),
      ch('The XOR of the empty subset?', ['0', '1', '-1', 'undefined'], 0, 'XOR identity is 0.', 'What leaves a value unchanged under XOR?'),
      bl('Fill in the exclude branch', 'def dfs(i, cur):\n    if i == len(nums): return cur\n    return dfs(i + 1, cur ^ nums[i]) + dfs(i + 1, ___)', ['cur', 'cur ^ nums[i]', '0', 'nums[i]'], 'cur', 'Excluding nums[i] leaves the running XOR unchanged.', 'If you skip nums[i], what changes in the XOR?'),
    ],
  }),
  make('Subsets', {
    teach: ['Return all subsets (the power set) of distinct numbers.', 'DFS(i, path): at each index choose to take nums[i] or skip it. When i reaches the end, record a copy of path. Undo the choice after recursing (backtrack).'],
    questions: [
      ch('[1,2,3] has how many subsets?', ['8', '6', '9', '3'], 0, '2³ = 8.', 'Think binary: in or out per element.'),
      ord('Order the "include" branch', ['path.append(nums[i])', 'dfs(i + 1)', 'path.pop()'], 'Choose, explore, un-choose.', true, 'Choose, explore, then undo.'),
      ch('Why copy path when recording?', ['path keeps changing', 'Speed', 'Python needs it', 'No reason'], 0, 'Otherwise all results alias one list.', 'What happens when you store a reference to a list you keep mutating?'),
      ch('Time complexity of generating all subsets?', ['O(n * 2^n)', 'O(2^n)', 'O(n²)', 'O(n!)'], 0, '2^n subsets, each copy costs up to O(n).', 'Count subsets, then the cost to copy each.'),
    ],
  }),
  make('Combination Sum', {
    teach: ['Find all combinations of candidates (reuse allowed) that sum to target.', 'DFS(i, path, total). Either take candidates[i] again (stay at i) or move to i + 1. Stop when total == target (record) or total > target (prune).'],
    questions: [
      ch('Reuse of a number is allowed. After taking nums[i], recurse with?', ['The same index i', 'i + 1', 'i - 1', '0'], 0, 'You can pick it again.', 'Can the same candidate be chosen again immediately?'),
      ch('When do you prune?', ['total > target', 'total < target', 'always', 'never'], 0, 'Positive numbers only grow.', 'What happens to the running total as you add positives?'),
      ch('Why move forward in index?', ['Avoid duplicate combinations in a different order', 'Speed only', 'Sorting', 'No reason'], 0, '[2,3] and [3,2] are the same.', 'Compare picking [2,3] vs [3,2].'),
      ch('candidates [2,3,6,7], target 7 gives how many combinations?', ['2', '1', '3', '4'], 0, '[2,2,3] and [7].', 'Try 7 alone, then combos of 2s and 3.'),
    ],
  }),
  make('Combination Sum II', {
    teach: ['Candidates may have duplicates; each number is used at most once; the result must have no duplicate combinations.', 'Sort. In the loop at a given level skip a value equal to the previous one (i > start and nums[i] == nums[i-1]). Recurse with i + 1.'],
    questions: [
      ch('Why sort first?', ['So equal values are adjacent and can be skipped', 'Speed only', 'Required by Python', 'No reason'], 0, 'Dedupe by neighbors.', 'Equal values should be neighbors to compare.'),
      ch('Skip condition?', ['i > start and nums[i] == nums[i-1]', 'i == start', 'nums[i] > target', 'always'], 0, 'Same value at the same level.', 'Duplicates only matter among siblings at the same level.'),
      ch('Recurse with which index?', ['i + 1', 'i', '0', 'start'], 0, 'Each number once.', 'Each number can be used only once.'),
      bug('Find the bug in the duplicate skip', ['nums.sort()', 'def dfs(start, total):', '    for i in range(start, len(nums)):', '        if i > 0 and nums[i] == nums[i - 1]: continue', '        dfs(i + 1, total + nums[i])'], 3, 'i > 0 also skips a value used at a deeper level. It must be i > start so only same-level siblings are skipped.', 'Is the previous equal number always a sibling?'),
    ],
  }),
  make('Combinations', {
    teach: ['Choose k numbers from 1..n (all combinations).', 'DFS(start, path): for num in start..n, append, recurse with num + 1, pop. Record when len(path) == k. Prune when not enough numbers remain.'],
    questions: [
      ch('n = 4, k = 2. How many combinations?', ['6', '4', '8', '12'], 0, 'C(4,2) = 6.', 'Use the binomial coefficient n choose k.'),
      ch('Why recurse with num + 1?', ['No repeats and no reordering', 'Speed', 'Sorting', 'No reason'], 0, 'Combinations ignore order.', 'Combinations ignore order, so only look ahead.'),
      ch('When do you record a result?', ['len(path) == k', 'num == n', 'start == 1', 'always'], 0, 'Path is complete.', 'When is the path full-size?'),
      ch('Time complexity of generating all combinations?', ['O(k * C(n, k))', 'O(n!)', 'O(n²)', 'O(k)'], 0, 'C(n,k) results, each copy costs O(k).', 'Count the results and the cost per copy.'),
    ],
  }),
  make('Permutations', {
    teach: ['All orderings of distinct numbers.', 'DFS(path, used). At each step try every unused number. When path has n numbers record it. Mark used before recursing and unmark after.'],
    questions: [
      ch('[1,2,3] has how many permutations?', ['6', '3', '8', '9'], 0, '3! = 6.', 'Count arrangements: n factorial.'),
      ch('How do you avoid reusing a number?', ['A used[] array', 'Sort', 'Hash', 'Stack'], 0, 'Mark and unmark.', 'You need to remember which items are taken.'),
      ch('Difference from subsets?', ['Order matters and all elements are used', 'None', 'Subsets use order', 'Permutations are smaller'], 0, 'Different arrangement = different result.', 'Does order change the result here?'),
      bug('Find the bug in the backtracking step', ['def dfs(path):', '    if len(path) == n:', '        res.append(path[:]); return', '    for i in range(n):', '        if used[i]: continue', '        used[i] = True', '        path.append(nums[i])', '        dfs(path)', '        path.pop()', '        used[i] = True'], 9, 'After recursing you must un-choose: used[i] = False. Otherwise the number stays blocked.', 'Does the undo restore every choice?'),
    ],
  }),
  make('Subsets II', {
    teach: ['Subsets of an array that may contain duplicates, without duplicate subsets.', 'Sort. In the loop-style DFS, for each start skip nums[i] if i > start and nums[i] == nums[i-1]. Record every path.'],
    questions: [
      ch('[1,2,2] gives how many unique subsets?', ['6', '8', '4', '3'], 0, '[], [1], [1,2], [1,2,2], [2], [2,2].', 'Dedupe [2] from the two 2s, then count each size.'),
      ch('Duplicates are handled by?', ['Sorting and skipping equal neighbors at the same level', 'A giant set at the end only', 'Ignoring', 'Counting'], 0, 'Prune early.', 'Skip repeated values among siblings, not deeper levels.'),
      ch('When do you record?', ['At every node of the recursion', 'Only at leaves', 'Only at the end', 'Never'], 0, 'Every path is a subset.', 'Is every partial path itself a subset?'),
      ord('Order one DFS call', ['Record path as a subset', 'Loop i from start to the end', 'Skip nums[i] if it equals nums[i-1] and i > start', 'Append nums[i], dfs(i + 1), pop'], 'Record first (every node is a subset), then loop, skip sibling duplicates, then choose-explore-undo.', false, 'Record before looping, skip before choosing.'),
    ],
  }),
  make('Permutations II', {
    teach: ['All unique permutations of numbers that may repeat.', 'Sort. Use used[]. Skip nums[i] if it equals nums[i-1] and nums[i-1] is not used (it would create the same arrangement). Or use a count map.'],
    questions: [
      ch('[1,1,2] has how many unique permutations?', ['3', '6', '2', '4'], 0, '112, 121, 211.', 'Count distinct arrangements, not 3!.'),
      ch('Why sort?', ['Bring equal values together', 'Speed', 'Required', 'No reason'], 0, 'To detect duplicates by neighbors.', 'Equal values must be adjacent to detect repeats.'),
      ch('Alternative method?', ['Counter of remaining values', 'Binary search', 'Stack', 'Sliding window'], 0, 'Pick values with count > 0.', 'Track how many of each value remain.'),
      ch('Worst-case time for permutations of n distinct numbers?', ['O(n * n!)', 'O(n!)', 'O(2^n)', 'O(n²)'], 0, 'n! results, each copy costs O(n).', 'Count the leaves and the cost to copy each.'),
    ],
  }),
  make('Generate Parentheses', {
    teach: ['Generate all valid combinations of n pairs of parentheses.', 'DFS with counts open and close. Add "(" if open < n. Add ")" if close < open. Record when the length is 2n.'],
    questions: [
      ch('n = 3 gives how many strings?', ['5', '6', '8', '3'], 0, 'Catalan number C3 = 5.', 'This is a famous counting sequence: 1, 1, 2, 5, ...'),
      ch('When can you add ")"?', ['close < open', 'open < n', 'always', 'never'], 0, 'Never close more than opened.', 'A closer needs an unmatched opener.'),
      ch('When can you add "("?', ['open < n', 'close < open', 'always', 'never'], 0, 'Only n openers allowed.', 'You have a budget of n openers.'),
      bl('Fill in the closing call', 'def dfs(cur, open, close):\n    if len(cur) == 2 * n: res.append(cur); return\n    if open < n: dfs(cur + "(", open + 1, close)\n    if close < open: dfs(cur + ")", open, ___)', ['close + 1', 'open + 1', 'close - 1', 'close'], 'close + 1', 'Adding ")" uses one more closer.', 'Which counter changes when you add ")"?'),
    ],
  }),
  make('Word Search', {
    teach: ['Does the word exist in a grid by moving up/down/left/right without reusing a cell?', 'DFS from each cell matching word[0]. Mark the cell visited (e.g., set to "#"), explore 4 neighbors for the next letter, then restore the cell.'],
    questions: [
      ch('How do you prevent reuse?', ['Mark visited, then restore', 'Copy the grid every step', 'Ignore', 'Sort'], 0, 'Backtracking.', 'Undo your change after exploring.'),
      ch('When is the word found?', ['index == len(word)', 'cell == "#"', 'row == 0', 'never'], 0, 'All letters matched.', 'What does reaching the end of the word mean?'),
      ch('Time complexity?', ['O(m * n * 4^L)', 'O(m * n)', 'O(L)', 'O(1)'], 0, 'Up to 4 directions per letter, from each cell.', 'Each cell starts a search, each step has 4 choices.'),
      bug('Find the bug in the backtracking', ['def dfs(r, c, i):', '    if i == len(word): return True', '    if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != word[i]: return False', "    board[r][c] = '#'", '    found = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or dfs(r,c+1,i+1) or dfs(r,c-1,i+1)', "    board[r][c] = '#'", '    return found'], 5, "The cell must be restored to word[i] after exploring, otherwise later paths see it as blocked.", 'What should the cell hold after you finish with it?'),
    ],
  }),
  make('Palindrome Partitioning', {
    teach: ['Split a string so every part is a palindrome; list all ways.', 'DFS(start): for end in start..n, if s[start:end+1] is a palindrome, add it, recurse from end + 1, then remove. When start == n record the partition.'],
    questions: [
      ch('"aab" gives?', ['[["a","a","b"],["aa","b"]]', '[["aab"]]', '[["a","ab"]]', '[]'], 0, 'Every part is a palindrome.', 'Every piece must read the same both ways.'),
      ch('When do you record a partition?', ['start == len(s)', 'end == 0', 'always', 'never'], 0, 'The whole string is consumed.', 'When is the entire string used up?'),
      ch('Speed-up?', ['Precompute palindrome table with DP', 'Sorting', 'Hashing', 'None'], 0, 'O(1) palindrome checks.', 'Repeated palindrome checks are wasteful.'),
      ch('Worst-case time for "aaaa...a" of length n?', ['O(n * 2^n)', 'O(n²)', 'O(n!)', 'O(n)'], 0, 'Up to 2^(n-1) partitions, each built and copied in O(n).', 'Every cut position is independently on or off.'),
    ],
  }),
  make('Letter Combinations of a Phone Number', {
    teach: ['Phone digits 2-9 map to letters (2: abc, 3: def, ...). List all letter combinations for a digit string.', 'DFS(i, path): for each letter of digits[i] append, recurse to i + 1, pop. Record at i == len(digits).'],
    questions: [
      ch('"23" gives how many strings?', ['9', '6', '5', '12'], 0, '3 * 3 = 9.', 'Multiply the letter counts of each digit.'),
      ch('Digit 7 maps to how many letters?', ['4', '3', '2', '5'], 0, 'pqrs.', 'Recall the phone keypad: 7 is special.'),
      ch('Empty input returns?', ['[] (empty list)', '[""]', 'None', 'error'], 0, 'No digits, no combinations.', 'What is the product over zero digits, and what should be returned?'),
      bl('Fill in the recursive call', 'def dfs(i, path):\n    if i == len(digits):\n        res.append("".join(path)); return\n    for letter in phone[digits[i]]:\n        path.append(letter)\n        dfs(___, path)\n        path.pop()', ['i + 1', 'i', 'letter', 'len(path)'], 'i + 1', 'Move on to the next digit.', 'Which digit is handled next?'),
    ],
  }),
  make('Matchsticks to Square', {
    teach: ['Can all matchsticks form a square (use every stick once)?', 'Total must be divisible by 4: side = total / 4. Sort descending. Backtrack: place each stick into one of 4 sides without exceeding side. Skip identical side states to prune.'],
    questions: [
      ch('First check?', ['total % 4 == 0', 'n == 4', 'max == min', 'sorted'], 0, 'Four equal sides.', 'What must hold for four equal sides to exist?'),
      ch('Why sort descending?', ['Big sticks fail fast', 'Required', 'Looks nice', 'No reason'], 0, 'Prune early.', 'Which sticks are hardest to place?'),
      ch('The search space is?', ['Assign each stick to one of 4 sides', 'Permutations only', 'Subsets only', 'None'], 0, '4^n at worst.', 'Each stick has a few places it can go.'),
      ch('[3,3,3,3,4] can form a square?', ['True', 'False', 'Depends on the order', 'Error'], 1, 'Total 16 gives side 4. The 4 fills one side, but each 3 cannot be completed with the others.', 'Compute the side and try to complete it.'),
    ],
  }),
  make('Partition to K Equal Sum Subsets', {
    teach: ['Split nums into k subsets with equal sums.', 'target = sum / k (must divide). Backtrack by filling one bucket at a time up to target, using a used[] mask. Sort descending and prune. Bitmask DP also works.'],
    questions: [
      ch('Each subset must sum to?', ['total / k', 'total', 'k', 'max'], 0, 'Equal split.', 'Divide the total equally among buckets.'),
      ch('If total % k != 0?', ['Return false', 'Round', 'Try anyway', 'Return true'], 0, 'Impossible.', 'Equal buckets need an exact split.'),
      ch('Related problem?', ['Matchsticks to Square (k = 4)', 'Two Sum', 'Binary Search', 'LRU Cache'], 0, 'Same idea.', 'Recall another problem with equal sides.'),
      ch('If any number is greater than total / k?', ['Return false', 'Put it in its own bucket', 'Skip it', 'Return true'], 0, 'No bucket can hold it without exceeding the target (positive numbers).', 'Can any bucket hold that number?'),
    ],
  }),
  make('N Queens', {
    teach: ['Place n queens on an n x n board so none attack each other; list all solutions.', 'Place one queen per row. Track used columns and the two diagonals (row - col and row + col) in sets. Try each column, recurse to the next row, undo.'],
    questions: [
      ch('Diagonal identifiers?', ['row - col and row + col', 'row * col', 'row only', 'col only'], 0, 'Constant along each diagonal.', 'Cells on a diagonal share a quantity.'),
      ch('One queen per what?', ['Row', 'Corner', 'Diagonal', 'Cell'], 0, 'We place row by row.', 'Think about how to limit choices per step.'),
      ch('n = 4 has how many solutions?', ['2', '1', '4', '0'], 0, 'Two arrangements.', 'Try a 4x4 board by hand.'),
      bl('Fill in the conflict check', 'for c in range(n):\n    if c in cols or (r - c) in diag1 or (r + c) in ___:\n        continue', ['diag2', 'cols', 'diag1', 'rows'], 'diag2', 'The anti-diagonal set tracks r + c.', 'You already checked the columns and r - c.'),
    ],
  }),
  make('N Queens II', {
    teach: ['Same as N-Queens, but return only the NUMBER of solutions.', 'Reuse the same backtracking with column and diagonal sets, but count instead of building boards.'],
    questions: [
      ch('What changes from N-Queens?', ['Count instead of storing boards', 'Nothing', 'Different board', 'Larger n'], 0, 'Less memory.', 'What do you no longer need to build?'),
      ch('n = 1 ->', ['1', '0', '2', '4'], 0, 'One queen, one square.', 'One queen on a 1x1 board.'),
      ch('n = 8 ->', ['92', '64', '8', '40'], 0, 'Classic: 92 solutions.', 'Recall the famous 8-queens count.'),
      ch('n = 3 ->', ['0', '1', '2', '3'], 0, 'No placement exists for n = 2 or 3.', 'Try placing queens by hand on a 3x3 board.'),
    ],
  }),
  make('Word Break II', {
    teach: ['Add spaces in s to build sentences where every word is in the dictionary; return all sentences.', 'DFS(start) with memoization: for each end where s[start:end] is a word, combine it with all sentences from DFS(end). Cache results per start.'],
    questions: [
      ch('Why memoize?', ['Same suffix is solved many times', 'Speed only for small input', 'No need', 'Sorting'], 0, 'Overlapping subproblems.', 'Same suffix, many prefixes reach it.'),
      ch('DFS(start) returns?', ['All sentences for s[start:]', 'A boolean', 'A count', 'A word'], 0, 'List of strings.', 'Think about what each call builds for its suffix.'),
      ch('Difference from Word Break I?', ['We return all sentences, not just true/false', 'None', 'Different dictionary', 'Smaller input'], 0, 'Output size can be exponential.', 'Word Break I asks yes/no.'),
      ch('What does dfs(len(s)) return?', ['[""] (one empty sentence)', '[]', 'None', '[s]'], 0, 'Reaching the end completes one sentence; the empty tail lets words be appended.', 'An empty suffix is still a valid way to finish.'),
    ],
  }),
];
