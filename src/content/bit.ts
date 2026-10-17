import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const bit: Lesson[] = [
  make('Single Number', {
    teach: ['Every number appears twice except one. Find it in O(n) time and O(1) space.', 'XOR everything. a ^ a = 0 and a ^ 0 = a, so pairs cancel and the single number remains.'],
    questions: [
      ch('[4,1,2,1,2] ->', ['4', '1', '2', '0'], 0, 'Pairs cancel.', 'Which value has no partner?'),
      ch('a ^ a =', ['0', 'a', '1', '2a'], 0, 'XOR with itself is zero.', 'XOR is 1 only where bits differ.'),
      ch('Space used?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'One variable.', 'How many variables do you keep?'),
      bl('Fill in the blank', 'res = 0\nfor n in nums:\n    res ___= n', ['^', '&', '|', '+'], '^', 'XOR-ing everything cancels pairs and leaves the single number.', 'Which operator cancels equal values?'),
    ],
  }),
  make('Number of 1 Bits', {
    teach: ['Count the set bits in an integer.', 'Brian Kernighan: n & (n - 1) clears the lowest set bit. Loop until n is 0, counting steps. Runs once per set bit.'],
    questions: [
      ch('n = 11 (1011) ->', ['3', '2', '4', '1'], 0, 'Three 1 bits.', 'Count the 1s in 1011.'),
      ch('n & (n - 1) does what?', ['Clears the lowest set bit', 'Sets a bit', 'Flips all bits', 'Shifts'], 0, 'Kernighan\'s trick.', 'Try n = 12 (1100): 12 & 11.'),
      ch('Loop runs?', ['Once per set bit', 'Always 32 times', 'n times', 'Once'], 0, 'Fast for sparse numbers.', 'Each iteration removes one bit.'),
      bl('Fill in the blank', 'while n:\n    n = n & (n ___ 1)\n    count += 1', ['-', '+', '|'], '-', 'Subtracting 1 flips the lowest set bit and the zeros below it, so AND clears that bit.', 'Which operation gives the Kernighan trick?'),
    ],
  }),
  make('Counting Bits', {
    teach: ['For each i in 0..n, count its 1 bits.', 'DP: bits[i] = bits[i >> 1] + (i & 1). Shifting right drops the last bit, which we add back.'],
    questions: [
      ch('n = 5 ->', ['[0,1,1,2,1,2]', '[0,1,2,3,4,5]', '[0,1,1,1,1,1]', '[1,1,2,2,3,3]'], 0, 'Bits of 0..5.', 'Write 0 to 5 in binary and count 1s.'),
      ch('bits[i] =', ['bits[i >> 1] + (i & 1)', 'bits[i - 1] + 1', 'i', 'bits[i // 3]'], 0, 'Reuse the answer for i / 2.', 'Dropping the last bit gives a smaller known number.'),
      ch('Time complexity?', ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], 0, 'One pass.', 'Each entry is O(1) work.'),
      bug('Find the bug', ['bits = [0] * (n + 1)', 'for i in range(1, n + 1):', '    bits[i] = bits[i >> 1] + (i | 1)', 'return bits'], 2, 'The last bit is i & 1. Using i | 1 always gives 1 for odd or even i.', 'What extracts only the last bit?'),
    ],
  }),
  make('Add Binary', {
    teach: ['Add two binary strings.', 'Walk from the right with a carry. total = a_bit + b_bit + carry; digit = total % 2; carry = total // 2. Reverse the result.'],
    questions: [
      ch('"11" + "1" ->', ['"100"', '"10"', '"110"', '"101"'], 0, '3 + 1 = 4.', 'Convert to decimal, add, convert back.'),
      ch('digit = total % 2, carry =', ['total // 2', 'total % 2', '1', '0'], 0, 'Base 2.', 'How many full 2s fit in the total?'),
      ch('When do you stop?', ['Both strings done and no carry', 'First string done', 'After 32 bits', 'Never'], 0, 'A final carry adds a leading 1.', 'Consider "1" + "1".'),
      bug('Find the bug', ['i, j, carry, res = len(a) - 1, len(b) - 1, 0, []', 'while i >= 0 or j >= 0 or carry:', '    total = carry', '    if i >= 0: total += int(a[i]); i -= 1', '    if j >= 0: total += int(b[j]); j -= 1', '    res.append(str(total // 2)); carry = total % 2', 'return "".join(reversed(res))'], 5, 'The digit is total % 2 and the carry is total // 2; they are swapped.', 'Which one is the digit and which is the carry?'),
    ],
  }),
  make('Reverse Bits', {
    teach: ['Reverse the bits of a 32-bit unsigned integer.', 'Loop 32 times: shift result left, add the lowest bit of n (n & 1), shift n right.'],
    questions: [
      ch('How many loop iterations?', ['32', '8', '16', 'Until n == 0'], 0, 'All 32 positions must move (leading zeros count).', 'Leading zeros become trailing zeros.'),
      ch('Take the lowest bit with?', ['n & 1', 'n | 1', 'n ^ 1', 'n >> 1'], 0, 'Mask the last bit.', 'You need a mask that keeps only one bit.'),
      ch('result = (result << 1) | bit does?', ['Appends the bit at the right', 'Clears a bit', 'Flips the sign', 'Nothing'], 0, 'Builds the reversed number.', 'Shift makes room, OR fills it.'),
      ord('Order the code', ['res = 0', 'for _ in range(32):', 'res = (res << 1) | (n & 1)', 'n >>= 1', 'return res'], 'Each pass moves the lowest bit of n to the low end of res, shifting earlier bits up.', true, 'Initialize, loop, build result, consume n, return.'),
    ],
  }),
  make('Missing Number', {
    teach: ['Array has n numbers from 0..n with one missing. Find it.', 'Sum formula: n(n+1)/2 - sum(nums). Or XOR all indexes and values: pairs cancel, leaving the missing number.'],
    questions: [
      ch('[3,0,1] ->', ['2', '4', '0', '3'], 0, '0..3 minus 3, 0, 1.', 'Which of 0..3 is absent?'),
      ch('Expected sum of 0..n?', ['n(n+1)/2', 'n²', '2n', 'n!'], 0, 'Gauss.', 'Try n = 3: 0+1+2+3.'),
      ch('XOR approach works because?', ['Equal values cancel', 'Sorting', 'Hashing', 'It does not'], 0, 'Only the missing one is unpaired.', 'Which value appears once overall?'),
      bl('Fill in the blank', 'n = len(nums)\nreturn n * (n + 1) // 2 - ___', ['sum(nums)', 'max(nums)', 'len(nums)'], 'sum(nums)', 'Expected total minus actual total is the missing value.', 'Subtract what is actually present.'),
    ],
  }),
  make('Sum of Two Integers', {
    teach: ['Add two integers without + or -.', 'XOR gives the sum without carries. AND shifted left by 1 gives the carries. Repeat until there is no carry (mask to 32 bits in Python).'],
    questions: [
      ch('a ^ b gives?', ['Sum without carry', 'Carry only', 'Product', 'Difference'], 0, '1 + 1 = 0 (carry 1).', 'Think bit by bit without carrying.'),
      ch('Carry =', ['(a & b) << 1', 'a | b', 'a ^ b', 'a >> 1'], 0, 'Both bits set carry left.', 'A carry appears when both bits are 1.'),
      ch('Loop ends when?', ['Carry is 0', 'a is 0', 'b is 1', 'Never'], 0, 'No more carries.', 'What is left to add?'),
      bug('Find the bug', ['mask = 0xFFFFFFFF', 'while b != 0:', '    carry = ((a & b) << 1) & mask', '    a = (a | b) & mask', '    b = carry', 'return a if a <= 0x7FFFFFFF else ~(a ^ mask)'], 3, 'The carry-free sum is a ^ b, not a | b (OR would count 1 + 1 as 1).', 'Which operator gives 0 for 1 and 1?'),
    ],
  }),
  make('Reverse Integer', {
    teach: ['Reverse the digits of a signed 32-bit integer; return 0 if it overflows.', 'Pop digits with % 10 and push onto the result (result * 10 + digit). Check for overflow before each push. Handle the sign.'],
    questions: [
      ch('-123 ->', ['-321', '321', '-123', '0'], 0, 'Keep the sign.', 'Reverse digits, not the sign.'),
      ch('Overflow range?', ['-2^31 to 2^31 - 1', '0 to 2^32', '-2^63 to 2^63', '-100 to 100'], 0, '32-bit signed.', 'Signed 32-bit has one sign bit.'),
      ch('Pop the last digit with?', ['x % 10', 'x // 10', 'x & 1', 'x >> 1'], 0, 'The remainder.', 'Which operation gives the ones digit?'),
      bug('Find the bug', ['sign = -1 if x < 0 else 1; x = abs(x); res = 0', 'while x:', '    res = res * 10 + x % 10', '    x //= 2', 'res *= sign', 'return res if -2**31 <= res <= 2**31 - 1 else 0'], 3, 'We work in base 10, so remove the last digit with x //= 10, not 2.', 'Which base are the digits in?'),
    ],
  }),
  make('Bitwise AND of Numbers Range', {
    teach: ['AND of every number from left to right.', 'The result is the common binary prefix of left and right. Shift both right until they are equal, counting shifts, then shift back.'],
    questions: [
      ch('[5, 7] ->', ['4', '5', '7', '0'], 0, '101 & 110 & 111 = 100.', 'AND the three numbers in binary.'),
      ch('The answer is?', ['The common prefix of left and right', 'left', 'right', 'Always 0'], 0, 'Changing bits drop to 0.', 'Which bits are the same across the whole range?'),
      ch('Why does it work?', ['Lower differing bits flip at some point in the range', 'Luck', 'Sorting', 'It does not'], 0, 'So they AND to zero.', 'Counting up toggles low bits repeatedly.'),
      bl('Fill in the blank', 'shift = 0\nwhile left ___ right:\n    left >>= 1\n    right >>= 1\n    shift += 1\nreturn left << shift', ['!=', '==', '>'], '!=', 'Keep shifting until both equal the common prefix, then restore with a left shift.', 'When should shifting stop?'),
    ],
  }),
  make('Minimum Array End', {
    teach: ['Build an increasing array of n numbers whose bitwise AND is x. Minimize the last element.', 'Every number must contain all set bits of x. Fill the zero bits of x, in order, with the binary digits of (n - 1). The result is the last element.'],
    questions: [
      ch('Every element must contain?', ['All bits of x', 'No bits of x', 'Only the top bit', 'Random bits'], 0, 'So the AND is x.', 'A bit missing from one element is missing from the AND.'),
      ch('The free positions are?', ['Zero bits of x', 'One bits of x', 'All bits', 'The sign bit'], 0, 'We can vary those.', 'Which positions are not forced to be 1?'),
      ch('n = 3, x = 4 ->', ['6', '5', '7', '8'], 0, 'Sequence 4, 5, 6.', 'List the smallest valid numbers in order.'),
      bl('Fill in the blank', 'n -= 1; res = x; bit = 1\nwhile n:\n    if not (x & bit):\n        if n & 1: res ___ bit\n        n >>= 1\n    bit <<= 1\nreturn res', ['|=', '&=', '-='], '|=', 'Set the free bit in res whenever the current digit of n - 1 is 1 (n = 2, x = 5 gives 7).', 'The bit must be turned on, not cleared.'),
    ],
  }),
];
