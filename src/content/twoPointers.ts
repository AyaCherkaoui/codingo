import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const twoPointers: Lesson[] = [
  make('Reverse String', {
    teach: ['Reverse String: reverse a list of characters in place.', 'Two pointers l and r start at the ends. Swap, move inward, stop when they meet. O(n) time, O(1) space.'],
    questions: [
      ch("['h','e','l','l','o'] ->", ["['o','l','l','e','h']", "['h','e','l','l','o']", "['l','l','o','h','e']", "['o','h','l','l','e']"], 0, 'Mirror the list.'),
      ord('Order the algorithm', ['l = 0, r = len(s) - 1', 'While l < r', 'Swap s[l] and s[r]', 'l += 1, r -= 1'], 'Loop until pointers cross.'),
      ch('Extra space used?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 1, 'Only two indexes.'),
    ],
  }),
  make('Valid Palindrome', {
    teach: ['Valid Palindrome: reads the same both ways, ignoring case and non-alphanumeric characters.', 'Pointers at both ends. Skip junk characters, compare lowercase characters, move inward.'],
    questions: [
      ch('"A man, a plan, a canal: Panama" is a palindrome?', ['Yes', 'No', 'Only without spaces', 'Only lowercase'], 0, 'After cleaning: amanaplanacanalpanama.'),
      ch('Python check for letter or digit?', ['s.isalpha()', 's.isalnum()', 's.isdigit()', 's.islower()'], 1, 'isalnum() covers both.'),
      ord('Order the algorithm', ['Pointers at both ends', 'Skip non-alphanumeric characters', 'Compare lowercase characters', 'If different, return false', 'Move inward; return true at the end'], 'Clean as you go.'),
    ],
  }),
  make('Valid Palindrome II', {
    teach: ['Valid Palindrome II: can the string become a palindrome after deleting at most one character?', 'Move inward until a mismatch. Then try skipping the left char or the right char and check if the rest is a palindrome.'],
    questions: [
      ch('"abca" ->', ['true (delete b or c)', 'false', 'true (delete a)', 'error'], 0, 'Deleting c gives "aba".'),
      ch('On the first mismatch, how many options do you try?', ['1', '2', '3', 'n'], 1, 'Skip left or skip right.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(2^n)'], 0, 'Each side is checked a constant number of times.'),
    ],
  }),
  make('Merge Strings Alternately', {
    teach: ['Merge Strings Alternately: take letters from word1 and word2 in turn; append whatever is left of the longer one.', 'Walk index i; append word1[i] if it exists, then word2[i] if it exists.'],
    questions: [
      ch('"abc" + "pqr" ->', ['"apbqcr"', '"abcpqr"', '"prqbca"', '"apbqrc"'], 0, 'a p b q c r.'),
      ch('"ab" + "pqrs" ->', ['"apbqrs"', '"abpqrs"', '"apbq"', '"pqrsab"'], 0, 'The leftover "rs" is appended.'),
      ord('Order the algorithm', ['result = []', 'Loop i while either word has letters', 'Append word1[i] if it exists', 'Append word2[i] if it exists', 'Join result'], 'Check bounds each time.'),
    ],
  }),
  make('Merge Sorted Array', {
    teach: ['Merge Sorted Array: merge nums2 into nums1, which has spare room at the end.', 'Fill from the back. Compare the largest remaining values and place the larger at the end. Nothing unread gets overwritten.'],
    questions: [
      ch('Why fill from the back?', ['Avoid overwriting unread values', 'It is faster', 'Sorted order requires it', 'No reason'], 0, 'The spare space is at the end.'),
      ch('Starting pointers (i, j, k)?', ['m-1, n-1, m+n-1', '0, 0, 0', 'm, n, m+n', 'm-1, 0, m'], 0, 'Last real values and last slot.'),
      ch('After nums1 is used up, what remains?', ['Copy rest of nums2', 'Nothing', 'Copy rest of nums1', 'Sort again'], 0, 'Leftover nums2 values go to the front.'),
    ],
  }),
  make('Remove Duplicates From Sorted Array', {
    teach: ['Remove Duplicates: in a sorted array keep one copy of each value, in place; return the new length.', 'Duplicates sit together. Write pointer k = 1. If nums[i] differs from nums[i - 1], copy it to nums[k] and k += 1.'],
    questions: [
      ch('[0,0,1,1,2] -> k?', ['2', '3', '4', '5'], 1, 'Unique values: 0, 1, 2.'),
      bl('Fill in the blank', 'for i in range(1, len(nums)):\\n    if nums[i] ___ nums[i - 1]:\\n        nums[k] = nums[i]\\n        k += 1', ['!=', '==', '>'], '!=', 'A new value is different from the previous.'),
      ch('Why does this rely on sorting?', ['Duplicates are adjacent', 'Faster loops', 'Smaller numbers first', 'It does not'], 0, 'Equal values sit together.'),
    ],
  }),
  make('Two Sum II Input Array Is Sorted', {
    teach: ['Two Sum II: the array is sorted; find two numbers that add to target (1-indexed).', 'Pointers at both ends. Sum too small: move left up. Sum too big: move right down. O(n) time, O(1) space.'],
    questions: [
      ch('Sum is smaller than target. What moves?', ['Left pointer right', 'Right pointer left', 'Both', 'Neither'], 0, 'We need a bigger sum.'),
      ch('Space complexity?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 1, 'No hash map needed.'),
      ord('Order the algorithm', ['l = 0, r = n - 1', 'sum = nums[l] + nums[r]', 'If sum == target return [l+1, r+1]', 'If sum < target l += 1 else r -= 1'], 'Sorted order tells us which way to move.'),
    ],
  }),
  make('3Sum', {
    teach: ['3Sum: find all unique triplets that add to 0.', 'Sort. Fix i, then run Two Sum II on the rest with pointers l and r. Skip duplicate values for i, l and r so triplets are unique. O(n²).'],
    questions: [
      ch('Time complexity?', ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'], 2, 'One loop times one two-pointer scan.'),
      ch('Why sort first?', ['Enables two pointers and easy duplicate skipping', 'Looks nicer', 'Required by Python', 'No reason'], 0, 'Duplicates become adjacent.'),
      ch('After finding a triplet you should:', ['Stop', 'Move both pointers and skip duplicates', 'Reset i', 'Only move l'], 1, 'Keep searching for new triplets.'),
    ],
  }),
  make('4Sum', {
    teach: ['4Sum: all unique quadruplets that add to target.', 'Sort. Two nested loops fix the first two numbers; two pointers find the other two. Skip duplicates at every level. O(n³). This generalizes to kSum.'],
    questions: [
      ch('Time complexity?', ['O(n²)', 'O(n³)', 'O(n⁴)', 'O(n)'], 1, 'Two loops plus a two-pointer scan.'),
      ch('This pattern reduces 4Sum to:', ['3Sum, then 2Sum', 'Binary search', 'Sliding window', 'A stack'], 0, 'Fix one number and solve the smaller problem.'),
      ch('Duplicates are avoided by:', ['Sorting and skipping equal neighbors', 'A big set only', 'Random order', 'Not needed'], 0, 'Skip same values at each level.'),
    ],
  }),
  make('Rotate Array', {
    teach: ['Rotate Array: rotate right by k steps, in place.', 'Reverse trick: set k %= n, reverse the whole array, reverse the first k, reverse the rest. O(n) time, O(1) space.'],
    questions: [
      ch('[1,2,3,4,5,6,7], k = 3 ->', ['[5,6,7,1,2,3,4]', '[4,5,6,7,1,2,3]', '[3,2,1,7,6,5,4]', '[1,2,3,7,6,5,4]'], 0, 'Last 3 move to the front.'),
      ch('Why k %= n?', ['Rotating by n changes nothing', 'Speed only', 'Avoid negatives', 'No reason'], 0, 'k can be larger than n.'),
      ord('Order the reverse trick', ['k %= n', 'Reverse the whole array', 'Reverse the first k elements', 'Reverse the remaining n - k elements'], 'Three reversals.'),
    ],
  }),
  make('Container With Most Water', {
    teach: ['Container With Most Water: pick two lines that hold the most water.', 'Area = min(height[l], height[r]) * (r - l). Start wide and move the SHORTER line inward: moving the taller one can never raise the limiting height.'],
    questions: [
      ch('Which pointer moves?', ['The shorter line', 'The taller line', 'Always left', 'Both'], 0, 'The short side limits the water.'),
      ch('[1,8,6,2,5,4,8,3,7] max area?', ['40', '49', '56', '36'], 1, 'Lines 8 and 7, width 7: 7 * 7 = 49.'),
      bl('Fill in the blank', 'area = ___(height[l], height[r]) * (r - l)', ['min', 'max', 'sum'], 'min', 'Water level is the shorter side.'),
    ],
  }),
  make('Boats to Save People', {
    teach: ['Boats to Save People: each boat holds at most 2 people with total weight <= limit. Minimize boats.', 'Sort. Pair the heaviest with the lightest if they fit; otherwise the heaviest goes alone. Two pointers.'],
    questions: [
      ch('Max people per boat?', ['1', '2', '3', 'limit'], 1, 'The problem caps it at 2.'),
      ch('people = [3,2,2,1], limit = 3. Boats?', ['2', '3', '4', '1'], 1, '(1,2), (2), (3).'),
      ord('Order the algorithm', ['Sort people', 'l = 0, r = n - 1', 'If people[l] + people[r] <= limit, l += 1', 'r -= 1 and boats += 1'], 'The heaviest always boards; the lightest joins if it fits.'),
    ],
  }),
  make('Trapping Rain Water', {
    teach: ['Trapping Rain Water: how much water is trapped between bars?', 'Water above a bar = min(maxLeft, maxRight) - height. Two pointers: move the side with the smaller max, because that side is the limiting wall. O(n) time, O(1) space.'],
    questions: [
      ch('[0,1,0,2,1,0,1,3,2,1,2,1] ->', ['4', '6', '8', '9'], 1, 'Classic example: 6 units.'),
      ch('Water above a bar equals?', ['min(leftMax, rightMax) - height', 'max(leftMax, rightMax)', 'height', 'leftMax + rightMax'], 0, 'The lower wall sets the level.'),
      ch('Which pointer do you process?', ['The side with the smaller max', 'The larger max', 'Always left', 'The tallest bar'], 0, 'That side is bounded by its own max.'),
    ],
  }),
];
