import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const math: Lesson[] = [
  make('Excel Sheet Column Title', {
    teach: ['Convert a column number to its Excel title (1 -> A, 26 -> Z, 27 -> AA).', 'It is base 26 but 1-indexed. Loop: n -= 1; letter = chr(65 + n % 26); n //= 26. Prepend each letter.'],
    questions: [
      ch('28 ->', ['"AB"', '"BA"', '"AA"', '"Z1"'], 0, '26 = Z, 27 = AA, 28 = AB.', 'Test 26 and 27 to see where letters wrap.'),
      ch('Why n -= 1 first?', ['The system is 1-indexed', 'Speed', 'Overflow', 'No reason'], 0, 'Maps 1..26 to 0..25.', 'Letters A to Z map to 1 to 26, not 0 to 25.'),
      ch('Letters are built?', ['From the last to the first', 'First to last', 'Randomly', 'In pairs'], 0, 'Least significant digit first.', 'Which digit do you get first when dividing?'),

      bl('Fill the letter lookup.', 'res = ""\nwhile n:\n    n -= 1\n    res = chr(65 + ___) + res\n    n //= 26\nreturn res', ['n % 26', 'n // 26', 'n % 25', 'n'], 'n % 26', 'After shifting n down by one, the remainder picks the letter.', 'Which operation yields the current least significant digit?'),
    ],
  }),
  make('Greatest Common Divisor of Strings', {
    teach: ['Largest string x that divides both str1 and str2 (each is x repeated).', 'If str1 + str2 != str2 + str1, return "". Otherwise the answer is the first gcd(len1, len2) characters of str1.'],
    questions: [
      ch('Check for a common divisor?', ['str1 + str2 == str2 + str1', 'len equal', 'sorted', 'None'], 0, 'They must be built from the same block.', 'If a divisor exists, order of concatenation should not matter.'),
      ch('Answer length?', ['gcd(len1, len2)', 'min length', 'max length', '1'], 0, 'Number-theory gcd.', 'Think of lengths as numbers with a number-theory answer.'),
      ch('"ABCABC" and "ABC" ->', ['"ABC"', '"AB"', '"ABCABC"', '""'], 0, 'gcd(6, 3) = 3.', 'Try two strings built from the same block.'),

      bug('Find the bug in the length choice.', ['from math import gcd', 'if str1 + str2 != str2 + str1:', '    return ""', 'g = min(len(str1), len(str2))', 'return str1[:g]'], 3, 'The block length must divide both lengths: use gcd, not min (ABABAB, ABAB).', 'Does the shorter length always divide the longer?'),
    ],
  }),
  make('Insert Greatest Common Divisors in Linked List', {
    teach: ['Between every two adjacent nodes insert a new node holding their gcd.', 'Walk the list; for each pair compute gcd(a, b) (Euclid), create the node, and relink: cur.next = new; new.next = nxt.'],
    questions: [
      ch('gcd(18, 6) =', ['6', '3', '12', '2'], 0, '6 divides both.', 'Which number divides both and is largest?'),
      ch('Euclid\'s algorithm?', ['gcd(a, b) = gcd(b, a % b)', 'a * b', 'a + b', 'a - b only'], 0, 'Repeat until b is 0.', 'Reduce the pair until one number is zero.'),
      ch('New nodes go?', ['Between each adjacent pair', 'At the end', 'At the start', 'Nowhere'], 0, 'By the problem.', 'Where exactly does each new node attach?'),

      ord('Order the insertion loop.', ['cur = head', 'while cur.next:', '    g = gcd(cur.val, cur.next.val)', '    cur.next = ListNode(g, cur.next)', '    cur = cur.next.next', 'return head'], 'Insert after cur, then skip past the new node to the next original node.', true, 'Compute the gcd before relinking.'),
    ],
  }),
  make('Transpose Matrix', {
    teach: ['Flip a matrix over its diagonal: rows become columns.', 'result[c][r] = matrix[r][c]. The result has dimensions n x m for an m x n input.'],
    questions: [
      ch('A 2 x 3 matrix transposed is?', ['3 x 2', '2 x 3', '3 x 3', '6 x 1'], 0, 'Rows and columns swap.', 'Count rows and columns before and after.'),
      ch('result[c][r] =', ['matrix[r][c]', 'matrix[c][r]', 'matrix[r][r]', '0'], 0, 'Swap indices.', 'Which index of the result is the old column?'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(1)', 'O(n²) always'], 0, 'Every cell moves once.', 'Each cell is touched once.'),

      bl('Size the result rows correctly.', 'm, n = len(a), len(a[0])\nres = [[0] * ___ for _ in range(n)]\nfor r in range(m):\n    for c in range(n):\n        res[c][r] = a[r][c]\nreturn res', ['m', 'n', 'm * n', '1'], 'm', 'The result has n rows, each with one entry per original row.', 'Each new row has as many cells as the old matrix had rows.'),
    ],
  }),
  make('Rotate Image', {
    teach: ['Rotate an n x n matrix 90 degrees clockwise in place.', 'Transpose the matrix, then reverse each row. O(n²) time, O(1) space.'],
    questions: [
      ch('Two steps for 90° clockwise?', ['Transpose, then reverse each row', 'Reverse rows then columns', 'Sort', 'Swap corners only'], 0, 'Classic trick.', 'First swap across the diagonal, then flip.'),
      ch('[[1,2],[3,4]] rotated clockwise ->', ['[[3,1],[4,2]]', '[[2,4],[1,3]]', '[[4,3],[2,1]]', '[[1,3],[2,4]]'], 0, 'First column becomes the first row, reversed.', 'Trace the 2 x 2 example cell by cell.'),
      ch('Extra space?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'In place.', 'Is a second matrix required?'),

      bug('Find the bug in the transpose step.', ['n = len(m)', 'for i in range(n):', '    for j in range(n):', '        m[i][j], m[j][i] = m[j][i], m[i][j]', 'for row in m: row.reverse()'], 2, 'Looping j over the full range swaps every pair twice, undoing it. Use range(i + 1, n).', 'What happens when each pair gets swapped more than once?'),
    ],
  }),
  make('Spiral Matrix', {
    teach: ['Return matrix elements in spiral order.', 'Maintain four boundaries: top, bottom, left, right. Walk right along top, down along right, left along bottom, up along left, shrinking the boundaries each time.'],
    questions: [
      ch('[[1,2,3],[4,5,6],[7,8,9]] ->', ['[1,2,3,6,9,8,7,4,5]', '[1,2,3,4,5,6,7,8,9]', '[1,4,7,8,9,6,3,2,5]', '[5,4,1,2,3,6,9,8,7]'], 0, 'Clockwise spiral.', 'Write the order for the 3 x 3 grid.'),
      ch('You track?', ['Four boundaries', 'A visited set only', 'A stack', 'Nothing'], 0, 'Shrink after each side.', 'What changes after each side is traversed?'),
      ch('Watch out for?', ['Single row or column left over', 'Negative numbers', 'Duplicates', 'Overflow'], 0, 'Check boundaries before walking back.', 'What if one row remains?'),

      bl('Guard the last side of the loop.', 'top, bot, left, right = 0, len(m)-1, 0, len(m[0])-1\nwhile top <= bot and left <= right:\n    for c in range(left, right+1): res.append(m[top][c])\n    top += 1\n    for r in range(top, bot+1): res.append(m[r][right])\n    right -= 1\n    if top <= bot:\n        for c in range(right, left-1, -1): res.append(m[bot][c])\n        bot -= 1\n    if ___:\n        for r in range(bot, top-1, -1): res.append(m[r][left])\n        left += 1', ['left <= right', 'top <= bot', 'left < top', 'right > bot'], 'left <= right', 'Walking up the left side needs a column to still exist after shrinking right.', 'Match the bottom-side guard but for columns.'),
    ],
  }),
  make('Set Matrix Zeroes', {
    teach: ['If a cell is 0, set its entire row and column to 0, in place.', 'Use the first row and first column as markers for which rows/columns to zero. Remember separately if the first row/column themselves had a zero. O(1) extra space.'],
    questions: [
      ch('Why not zero immediately while scanning?', ['New zeros would cause extra zeroing', 'Speed', 'Memory', 'No reason'], 0, 'Record first, apply later.', 'What goes wrong if you zero as you scan?'),
      ch('Markers live in?', ['First row and first column', 'A hash set', 'A new matrix', 'The diagonal'], 0, 'Constant extra space.', 'Reuse existing cells to store flags.'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(1)', 'O(n²)'], 0, 'A couple of passes.', 'How many passes over the grid?'),

      ord('Order the O(1)-space algorithm.', ['Note whether row 0 and column 0 contain a zero', 'Scan the rest; mark m[i][0] and m[0][j] for each zero', 'Zero cells whose row or column marker is 0', 'Zero row 0 and column 0 if they had a zero'], 'Do the marker row/column last, or you would destroy your flags.', false, 'The marker row and column are cleared last.'),
    ],
  }),
  make('Happy Number', {
    teach: ['Repeatedly replace n by the sum of the squares of its digits. Happy if it reaches 1, unhappy if it loops forever.', 'Detect the loop with a set of seen numbers or Floyd\'s slow/fast pointers.'],
    questions: [
      ch('19 is happy?', ['Yes', 'No'], 0, '1 + 81 = 82 -> 68 -> 100 -> 1.', 'Try 19 by hand.'),
      ch('How do you detect an endless loop?', ['Seen set or slow/fast pointers', 'Count to 10', 'Sort', 'Binary search'], 0, 'A repeated value means a cycle.', 'Your sequence either hits 1 or revisits a value.'),
      ch('Next value of 2?', ['4', '2', '1', '0'], 0, '2² = 4.', 'Square each digit of 2 and add.'),

      bl('Complete the seen-set loop.', 'seen = set()\nwhile n != 1 and n not in seen:\n    seen.___(n)\n    n = sum(int(d) ** 2 for d in str(n))\nreturn n == 1', ['add', 'append', 'push', 'insert'], 'add', 'Python sets use add; a revisited value proves a cycle.', 'Which set method inserts one element?'),
    ],
  }),
  make('Plus One', {
    teach: ['A number is stored as a digit array. Add one.', 'From the right: if the digit is < 9, increment and return. Otherwise set it to 0 and carry. If all were 9, prepend 1.'],
    questions: [
      ch('[1,2,9] ->', ['[1,3,0]', '[1,2,10]', '[1,3,9]', '[2,0,0]'], 0, '129 + 1 = 130.', 'Add one to 129 by hand.'),
      ch('[9,9] ->', ['[1,0,0]', '[0,0]', '[9,9,1]', '[1,0]'], 0, 'A new leading digit appears.', 'What do all-nines do to the length?'),
      ch('Time complexity?', ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'], 0, 'Worst case walks all digits.', 'Worst case touches every digit.'),

      bug('Find the bug in the carry logic.', ['for i in range(len(d) - 1, -1, -1):', '    if d[i] <= 9:', '        d[i] += 1', '        return d', '    d[i] = 0', 'return [1] + d'], 1, 'A 9 must carry: only digits below 9 can simply be incremented.', 'What would happen to a 9 in this check?'),
    ],
  }),
  make('Roman to Integer', {
    teach: ['Convert a Roman numeral to an integer.', 'Map symbols to values. Scan left to right: if the current value is less than the next, subtract it (like IV = 4); otherwise add it.'],
    questions: [
      ch('"MCMXCIV" ->', ['1994', '1904', '2014', '1894'], 0, '1000 + 900 + 90 + 4.', 'Split 1994 into thousands, hundreds, tens, ones.'),
      ch('"IV" ->', ['4', '6', '14', '5'], 0, 'I before V subtracts.', 'What does a smaller symbol before a larger mean?'),
      ch('Rule for subtracting?', ['Current < next', 'Current > next', 'Always', 'Never'], 0, 'Smaller before larger.', 'Compare neighbors as you scan.'),

      bl('Choose the subtraction test.', 'total = 0\nfor i in range(len(s)):\n    if i + 1 < len(s) and val[s[i]] ___ val[s[i+1]]:\n        total -= val[s[i]]\n    else:\n        total += val[s[i]]\nreturn total', ['<', '>', '==', '<='], '<', 'Equal neighbors such as II must be added, so use a strict comparison.', 'Which comparison matches IV but not II?'),
    ],
  }),
  make('Pow(x, n)', {
    teach: ['Compute x raised to n efficiently.', 'Fast exponentiation: x^n = (x^(n/2))² (times x if n is odd). For negative n compute 1 / x^(-n). O(log n).'],
    questions: [
      ch('2^10 uses about how many multiplications?', ['~4-5 (log n)', '10', '100', '1'], 0, 'Repeated squaring.', 'Repeated squaring halves the exponent.'),
      ch('Negative n?', ['Use 1 / x^|n|', 'Return 0', 'Error', 'Use n squared'], 0, 'Reciprocal.', 'Flip the sign somewhere.'),
      ch('x^n for odd n =', ['x * (x^(n//2))²', '(x^n)²', 'x + x^(n-1)', 'x^(n+1)'], 0, 'Extra factor of x.', 'Parity tells if an extra factor is needed.'),

      bl('Complete the recursive call.', 'def power(x, n):\n    if n == 0: return 1\n    if n < 0: return 1 / power(x, -n)\n    half = power(x, ___)\n    return half * half * (x if n % 2 else 1)', ['n // 2', 'n - 1', 'n / 2', 'n // 3'], 'n // 2', 'Halving with integer division keeps exponents whole and gives O(log n).', 'Use the call that halves n and stays an integer.'),
    ],
  }),
  make('Multiply Strings', {
    teach: ['Multiply two non-negative numbers given as strings, without converting them to integers directly.', 'Grade-school multiplication: result[i + j + 1] += d1[i] * d2[j], then propagate carries from the right. Digit positions i + j and i + j + 1 hold the product.'],
    questions: [
      ch('"2" * "3" ->', ['"6"', '"5"', '"23"', '"8"'], 0, 'Simple product.', 'Multiply 2 and 3 digit by digit.'),
      ch('Result length is at most?', ['len1 + len2', 'max(len1, len2)', 'len1 * len2', '2'], 0, 'Digits of the product.', 'Product of two numbers has about the sum of the digit counts.'),
      ch('Digit pair (i, j) contributes to position?', ['i + j + 1', 'i * j', 'i - j', 'j'], 0, 'With carry into i + j.', 'Which cell takes the low digit of a pair?'),

      bug('Find the bug in the carry handling.', ['res = [0] * (len(a) + len(b))', 'for i in range(len(a) - 1, -1, -1):', '    for j in range(len(b) - 1, -1, -1):', '        res[i + j + 1] += int(a[i]) * int(b[j])', '        res[i + j] += res[i + j + 1] // 10', '        res[i + j + 1] //= 10'], 5, 'The cell must keep the remainder (%= 10); // 10 keeps the carry instead.', 'What should remain in a digit cell after carrying out?'),
    ],
  }),
  make('Detect Squares', {
    teach: ['Add points; count() queries how many axis-aligned squares can be formed with a query point as one corner.', 'Keep a counter of points. For a query (x, y), consider each stored point diagonal to it (same |dx| = |dy| > 0) and multiply the counts of the two other corners.'],
    questions: [
      ch('Squares are?', ['Axis-aligned', 'Rotated', 'Any shape', 'Circles'], 0, 'Sides parallel to the axes.', 'Only squares with sides parallel to the axes count.'),
      ch('Diagonal point condition?', ['|dx| == |dy| and dx != 0', 'dx == 0', 'dy == 0', 'dx == dy == 0'], 0, 'Equal side lengths.', 'Diagonal points fix the other two corners.'),
      ch('Count multiplies?', ['Counts of the 3 other corners', 'Just one count', 'Sum of counts', 'Nothing'], 0, 'Duplicate points create more squares.', 'Duplicates matter; think counting.'),

      bl('Complete the corner product.', 'def count(self, p):\n    x, y = p; res = 0\n    for (px, py), c in list(self.cnt.items()):\n        if abs(px - x) == abs(py - y) and px != x:\n            res += c * self.cnt[(px, y)] * ___\n    return res', ['self.cnt[(x, py)]', 'self.cnt[(px, py)]', 'self.cnt[(x, y)]', '1'], 'self.cnt[(x, py)]', 'The diagonal is (px, py); the other corners are (px, y) and (x, py).', 'Which corner shares x with the query but y with the diagonal?'),
    ],
  }),
];
