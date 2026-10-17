import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const math: Lesson[] = [
  make('Excel Sheet Column Title', {
    teach: ['Convert a column number to its Excel title (1 -> A, 26 -> Z, 27 -> AA).', 'It is base 26 but 1-indexed. Loop: n -= 1; letter = chr(65 + n % 26); n //= 26. Prepend each letter.'],
    questions: [
      ch('28 ->', ['"AB"', '"BA"', '"AA"', '"Z1"'], 0, '26 = Z, 27 = AA, 28 = AB.'),
      ch('Why n -= 1 first?', ['The system is 1-indexed', 'Speed', 'Overflow', 'No reason'], 0, 'Maps 1..26 to 0..25.'),
      ch('Letters are built?', ['From the last to the first', 'First to last', 'Randomly', 'In pairs'], 0, 'Least significant digit first.'),
    ],
  }),
  make('Greatest Common Divisor of Strings', {
    teach: ['Largest string x that divides both str1 and str2 (each is x repeated).', 'If str1 + str2 != str2 + str1, return "". Otherwise the answer is the first gcd(len1, len2) characters of str1.'],
    questions: [
      ch('Check for a common divisor?', ['str1 + str2 == str2 + str1', 'len equal', 'sorted', 'None'], 0, 'They must be built from the same block.'),
      ch('Answer length?', ['gcd(len1, len2)', 'min length', 'max length', '1'], 0, 'Number-theory gcd.'),
      ch('"ABCABC" and "ABC" ->', ['"ABC"', '"AB"', '"ABCABC"', '""'], 0, 'gcd(6, 3) = 3.'),
    ],
  }),
  make('Insert Greatest Common Divisors in Linked List', {
    teach: ['Between every two adjacent nodes insert a new node holding their gcd.', 'Walk the list; for each pair compute gcd(a, b) (Euclid), create the node, and relink: cur.next = new; new.next = nxt.'],
    questions: [
      ch('gcd(18, 6) =', ['6', '3', '12', '2'], 0, '6 divides both.'),
      ch('Euclid\'s algorithm?', ['gcd(a, b) = gcd(b, a % b)', 'a * b', 'a + b', 'a - b only'], 0, 'Repeat until b is 0.'),
      ch('New nodes go?', ['Between each adjacent pair', 'At the end', 'At the start', 'Nowhere'], 0, 'By the problem.'),
    ],
  }),
  make('Transpose Matrix', {
    teach: ['Flip a matrix over its diagonal: rows become columns.', 'result[c][r] = matrix[r][c]. The result has dimensions n x m for an m x n input.'],
    questions: [
      ch('A 2 x 3 matrix transposed is?', ['3 x 2', '2 x 3', '3 x 3', '6 x 1'], 0, 'Rows and columns swap.'),
      ch('result[c][r] =', ['matrix[r][c]', 'matrix[c][r]', 'matrix[r][r]', '0'], 0, 'Swap indices.'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(1)', 'O(n²) always'], 0, 'Every cell moves once.'),
    ],
  }),
  make('Rotate Image', {
    teach: ['Rotate an n x n matrix 90 degrees clockwise in place.', 'Transpose the matrix, then reverse each row. O(n²) time, O(1) space.'],
    questions: [
      ch('Two steps for 90° clockwise?', ['Transpose, then reverse each row', 'Reverse rows then columns', 'Sort', 'Swap corners only'], 0, 'Classic trick.'),
      ch('[[1,2],[3,4]] rotated clockwise ->', ['[[3,1],[4,2]]', '[[2,4],[1,3]]', '[[4,3],[2,1]]', '[[1,3],[2,4]]'], 0, 'First column becomes the first row, reversed.'),
      ch('Extra space?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'In place.'),
    ],
  }),
  make('Spiral Matrix', {
    teach: ['Return matrix elements in spiral order.', 'Maintain four boundaries: top, bottom, left, right. Walk right along top, down along right, left along bottom, up along left, shrinking the boundaries each time.'],
    questions: [
      ch('[[1,2,3],[4,5,6],[7,8,9]] ->', ['[1,2,3,6,9,8,7,4,5]', '[1,2,3,4,5,6,7,8,9]', '[1,4,7,8,9,6,3,2,5]', '[5,4,1,2,3,6,9,8,7]'], 0, 'Clockwise spiral.'),
      ch('You track?', ['Four boundaries', 'A visited set only', 'A stack', 'Nothing'], 0, 'Shrink after each side.'),
      ch('Watch out for?', ['Single row or column left over', 'Negative numbers', 'Duplicates', 'Overflow'], 0, 'Check boundaries before walking back.'),
    ],
  }),
  make('Set Matrix Zeroes', {
    teach: ['If a cell is 0, set its entire row and column to 0, in place.', 'Use the first row and first column as markers for which rows/columns to zero. Remember separately if the first row/column themselves had a zero. O(1) extra space.'],
    questions: [
      ch('Why not zero immediately while scanning?', ['New zeros would cause extra zeroing', 'Speed', 'Memory', 'No reason'], 0, 'Record first, apply later.'),
      ch('Markers live in?', ['First row and first column', 'A hash set', 'A new matrix', 'The diagonal'], 0, 'Constant extra space.'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(1)', 'O(n²)'], 0, 'A couple of passes.'),
    ],
  }),
  make('Happy Number', {
    teach: ['Repeatedly replace n by the sum of the squares of its digits. Happy if it reaches 1, unhappy if it loops forever.', 'Detect the loop with a set of seen numbers or Floyd\'s slow/fast pointers.'],
    questions: [
      ch('19 is happy?', ['Yes', 'No'], 0, '1 + 81 = 82 -> 68 -> 100 -> 1.'),
      ch('How do you detect an endless loop?', ['Seen set or slow/fast pointers', 'Count to 10', 'Sort', 'Binary search'], 0, 'A repeated value means a cycle.'),
      ch('Next value of 2?', ['4', '2', '1', '0'], 0, '2² = 4.'),
    ],
  }),
  make('Plus One', {
    teach: ['A number is stored as a digit array. Add one.', 'From the right: if the digit is < 9, increment and return. Otherwise set it to 0 and carry. If all were 9, prepend 1.'],
    questions: [
      ch('[1,2,9] ->', ['[1,3,0]', '[1,2,10]', '[1,3,9]', '[2,0,0]'], 0, '129 + 1 = 130.'),
      ch('[9,9] ->', ['[1,0,0]', '[0,0]', '[9,9,1]', '[1,0]'], 0, 'A new leading digit appears.'),
      ch('Time complexity?', ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'], 0, 'Worst case walks all digits.'),
    ],
  }),
  make('Roman to Integer', {
    teach: ['Convert a Roman numeral to an integer.', 'Map symbols to values. Scan left to right: if the current value is less than the next, subtract it (like IV = 4); otherwise add it.'],
    questions: [
      ch('"MCMXCIV" ->', ['1994', '1904', '2014', '1894'], 0, '1000 + 900 + 90 + 4.'),
      ch('"IV" ->', ['4', '6', '14', '5'], 0, 'I before V subtracts.'),
      ch('Rule for subtracting?', ['Current < next', 'Current > next', 'Always', 'Never'], 0, 'Smaller before larger.'),
    ],
  }),
  make('Pow(x, n)', {
    teach: ['Compute x raised to n efficiently.', 'Fast exponentiation: x^n = (x^(n/2))² (times x if n is odd). For negative n compute 1 / x^(-n). O(log n).'],
    questions: [
      ch('2^10 uses about how many multiplications?', ['~4-5 (log n)', '10', '100', '1'], 0, 'Repeated squaring.'),
      ch('Negative n?', ['Use 1 / x^|n|', 'Return 0', 'Error', 'Use n squared'], 0, 'Reciprocal.'),
      ch('x^n for odd n =', ['x * (x^(n//2))²', '(x^n)²', 'x + x^(n-1)', 'x^(n+1)'], 0, 'Extra factor of x.'),
    ],
  }),
  make('Multiply Strings', {
    teach: ['Multiply two non-negative numbers given as strings, without converting them to integers directly.', 'Grade-school multiplication: result[i + j + 1] += d1[i] * d2[j], then propagate carries from the right. Digit positions i + j and i + j + 1 hold the product.'],
    questions: [
      ch('"2" * "3" ->', ['"6"', '"5"', '"23"', '"8"'], 0, 'Simple product.'),
      ch('Result length is at most?', ['len1 + len2', 'max(len1, len2)', 'len1 * len2', '2'], 0, 'Digits of the product.'),
      ch('Digit pair (i, j) contributes to position?', ['i + j + 1', 'i * j', 'i - j', 'j'], 0, 'With carry into i + j.'),
    ],
  }),
  make('Detect Squares', {
    teach: ['Add points; count() queries how many axis-aligned squares can be formed with a query point as one corner.', 'Keep a counter of points. For a query (x, y), consider each stored point diagonal to it (same |dx| = |dy| > 0) and multiply the counts of the two other corners.'],
    questions: [
      ch('Squares are?', ['Axis-aligned', 'Rotated', 'Any shape', 'Circles'], 0, 'Sides parallel to the axes.'),
      ch('Diagonal point condition?', ['|dx| == |dy| and dx != 0', 'dx == 0', 'dy == 0', 'dx == dy == 0'], 0, 'Equal side lengths.'),
      ch('Count multiplies?', ['Counts of the 3 other corners', 'Just one count', 'Sum of counts', 'Nothing'], 0, 'Duplicate points create more squares.'),
    ],
  }),
];
