import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const bit: Lesson[] = [
  make('Single Number', {
    teach: ['Every number appears twice except one. Find it in O(n) time and O(1) space.', 'XOR everything. a ^ a = 0 and a ^ 0 = a, so pairs cancel and the single number remains.'],
    questions: [
      ch('[4,1,2,1,2] ->', ['4', '1', '2', '0'], 0, 'Pairs cancel.'),
      ch('a ^ a =', ['0', 'a', '1', '2a'], 0, 'XOR with itself is zero.'),
      ch('Space used?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'One variable.'),
    ],
  }),
  make('Number of 1 Bits', {
    teach: ['Count the set bits in an integer.', 'Brian Kernighan: n & (n - 1) clears the lowest set bit. Loop until n is 0, counting steps. Runs once per set bit.'],
    questions: [
      ch('n = 11 (1011) ->', ['3', '2', '4', '1'], 0, 'Three 1 bits.'),
      ch('n & (n - 1) does what?', ['Clears the lowest set bit', 'Sets a bit', 'Flips all bits', 'Shifts'], 0, 'Kernighan\'s trick.'),
      ch('Loop runs?', ['Once per set bit', 'Always 32 times', 'n times', 'Once'], 0, 'Fast for sparse numbers.'),
    ],
  }),
  make('Counting Bits', {
    teach: ['For each i in 0..n, count its 1 bits.', 'DP: bits[i] = bits[i >> 1] + (i & 1). Shifting right drops the last bit, which we add back.'],
    questions: [
      ch('n = 5 ->', ['[0,1,1,2,1,2]', '[0,1,2,3,4,5]', '[0,1,1,1,1,1]', '[1,1,2,2,3,3]'], 0, 'Bits of 0..5.'),
      ch('bits[i] =', ['bits[i >> 1] + (i & 1)', 'bits[i - 1] + 1', 'i', 'bits[i // 3]'], 0, 'Reuse the answer for i / 2.'),
      ch('Time complexity?', ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], 0, 'One pass.'),
    ],
  }),
  make('Add Binary', {
    teach: ['Add two binary strings.', 'Walk from the right with a carry. total = a_bit + b_bit + carry; digit = total % 2; carry = total // 2. Reverse the result.'],
    questions: [
      ch('"11" + "1" ->', ['"100"', '"10"', '"110"', '"101"'], 0, '3 + 1 = 4.'),
      ch('digit = total % 2, carry =', ['total // 2', 'total % 2', '1', '0'], 0, 'Base 2.'),
      ch('When do you stop?', ['Both strings done and no carry', 'First string done', 'After 32 bits', 'Never'], 0, 'A final carry adds a leading 1.'),
    ],
  }),
  make('Reverse Bits', {
    teach: ['Reverse the bits of a 32-bit unsigned integer.', 'Loop 32 times: shift result left, add the lowest bit of n (n & 1), shift n right.'],
    questions: [
      ch('How many loop iterations?', ['32', '8', '16', 'Until n == 0'], 0, 'All 32 positions must move (leading zeros count).'),
      ch('Take the lowest bit with?', ['n & 1', 'n | 1', 'n ^ 1', 'n >> 1'], 0, 'Mask the last bit.'),
      ch('result = (result << 1) | bit does?', ['Appends the bit at the right', 'Clears a bit', 'Flips the sign', 'Nothing'], 0, 'Builds the reversed number.'),
    ],
  }),
  make('Missing Number', {
    teach: ['Array has n numbers from 0..n with one missing. Find it.', 'Sum formula: n(n+1)/2 - sum(nums). Or XOR all indexes and values: pairs cancel, leaving the missing number.'],
    questions: [
      ch('[3,0,1] ->', ['2', '4', '0', '3'], 0, '0..3 minus 3, 0, 1.'),
      ch('Expected sum of 0..n?', ['n(n+1)/2', 'n²', '2n', 'n!'], 0, 'Gauss.'),
      ch('XOR approach works because?', ['Equal values cancel', 'Sorting', 'Hashing', 'It does not'], 0, 'Only the missing one is unpaired.'),
    ],
  }),
  make('Sum of Two Integers', {
    teach: ['Add two integers without + or -.', 'XOR gives the sum without carries. AND shifted left by 1 gives the carries. Repeat until there is no carry (mask to 32 bits in Python).'],
    questions: [
      ch('a ^ b gives?', ['Sum without carry', 'Carry only', 'Product', 'Difference'], 0, '1 + 1 = 0 (carry 1).'),
      ch('Carry =', ['(a & b) << 1', 'a | b', 'a ^ b', 'a >> 1'], 0, 'Both bits set carry left.'),
      ch('Loop ends when?', ['Carry is 0', 'a is 0', 'b is 1', 'Never'], 0, 'No more carries.'),
    ],
  }),
  make('Reverse Integer', {
    teach: ['Reverse the digits of a signed 32-bit integer; return 0 if it overflows.', 'Pop digits with % 10 and push onto the result (result * 10 + digit). Check for overflow before each push. Handle the sign.'],
    questions: [
      ch('-123 ->', ['-321', '321', '-123', '0'], 0, 'Keep the sign.'),
      ch('Overflow range?', ['-2^31 to 2^31 - 1', '0 to 2^32', '-2^63 to 2^63', '-100 to 100'], 0, '32-bit signed.'),
      ch('Pop the last digit with?', ['x % 10', 'x // 10', 'x & 1', 'x >> 1'], 0, 'The remainder.'),
    ],
  }),
  make('Bitwise AND of Numbers Range', {
    teach: ['AND of every number from left to right.', 'The result is the common binary prefix of left and right. Shift both right until they are equal, counting shifts, then shift back.'],
    questions: [
      ch('[5, 7] ->', ['4', '5', '7', '0'], 0, '101 & 110 & 111 = 100.'),
      ch('The answer is?', ['The common prefix of left and right', 'left', 'right', 'Always 0'], 0, 'Changing bits drop to 0.'),
      ch('Why does it work?', ['Lower differing bits flip at some point in the range', 'Luck', 'Sorting', 'It does not'], 0, 'So they AND to zero.'),
    ],
  }),
  make('Minimum Array End', {
    teach: ['Build an increasing array of n numbers whose bitwise AND is x. Minimize the last element.', 'Every number must contain all set bits of x. Fill the zero bits of x, in order, with the binary digits of (n - 1). The result is the last element.'],
    questions: [
      ch('Every element must contain?', ['All bits of x', 'No bits of x', 'Only the top bit', 'Random bits'], 0, 'So the AND is x.'),
      ch('The free positions are?', ['Zero bits of x', 'One bits of x', 'All bits', 'The sign bit'], 0, 'We can vary those.'),
      ch('n = 3, x = 4 ->', ['6', '5', '7', '8'], 0, 'Sequence 4, 5, 6.'),
    ],
  }),
];
