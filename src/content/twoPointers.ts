import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const twoPointers: Lesson[] = [
  make('Reverse String', {
    teach: ['Reverse String: reverse a list of characters in place.', 'Two pointers l and r start at the ends. Swap, move inward, stop when they meet. O(n) time, O(1) space.'],
    questions: [
      ch("['h','e','l','l','o'] ->", ["['o','l','l','e','h']", "['h','e','l','l','o']", "['l','l','o','h','e']", "['o','h','l','l','e']"], 0, 'Mirror the list.', 'Read the list from the last element to the first.'),
      ord('Order the algorithm', ['l = 0, r = len(s) - 1', 'While l < r', 'Swap s[l] and s[r]', 'l += 1, r -= 1'], 'Loop until pointers cross.', false, 'Set up the pointers, then loop: act, then move.'),
      ch('Extra space used?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 1, 'Only two indexes.', 'Count what you allocate besides the input.'),
      bl('Fill in the blank', 'while l ___ r:\n    s[l], s[r] = s[r], s[l]\n    l += 1\n    r -= 1', ['<', '>', '=='], '<', 'Stop once the pointers meet or cross; a middle element needs no swap.', 'When should the loop end as pointers move inward?'),
    ],
  }),
  make('Valid Palindrome', {
    teach: ['Valid Palindrome: reads the same both ways, ignoring case and non-alphanumeric characters.', 'Pointers at both ends. Skip junk characters, compare lowercase characters, move inward.'],
    questions: [
      ch('"A man, a plan, a canal: Panama" is a palindrome?', ['Yes', 'No', 'Only without spaces', 'Only lowercase'], 0, 'After cleaning: amanaplanacanalpanama.', 'Strip spaces and punctuation, then ignore case.'),
      ch('Python check for letter or digit?', ['s.isalpha()', 's.isalnum()', 's.isdigit()', 's.islower()'], 1, 'isalnum() covers both.', 'You need a method that accepts both letters and numbers.'),
      ord('Order the algorithm', ['Pointers at both ends', 'Skip non-alphanumeric characters', 'Compare lowercase characters', 'If different, return false', 'Move inward; return true at the end'], 'Clean as you go.', false, 'Skip junk before you compare anything.'),
      bug('Find the bug', ['l, r = 0, len(s) - 1', 'while l < r:', '    while l < r and not s[l].isalnum(): l += 1', '    while l < r and not s[r].isalnum(): r -= 1', '    if s[l] != s[r]: return False', '    l += 1', '    r -= 1', 'return True'], 4, 'The comparison ignores case, so "A" and "a" count as different. Compare s[l].lower() with s[r].lower().', 'Would "Aa" be accepted by this code?'),
    ],
  }),
  make('Valid Palindrome II', {
    teach: ['Valid Palindrome II: can the string become a palindrome after deleting at most one character?', 'Move inward until a mismatch. Then try skipping the left char or the right char and check if the rest is a palindrome.'],
    questions: [
      ch('"abca" ->', ['true (delete b or c)', 'false', 'true (delete a)', 'error'], 0, 'Deleting c gives "aba".', 'Try removing each character and check the result.'),
      ch('On the first mismatch, how many options do you try?', ['1', '2', '3', 'n'], 1, 'Skip left or skip right.', 'Either of the two mismatched characters could be the extra one.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(2^n)'], 0, 'Each side is checked a constant number of times.', 'The mismatch branch happens once, and each branch scans at most n characters.'),
      bl('Fill in the blank', 'while l < r:\n    if s[l] != s[r]:\n        return isPal(s, l + 1, r) ___ isPal(s, l, r - 1)\n    l += 1\n    r -= 1\nreturn True', ['or', 'and', '+'], 'or', 'Only one deletion has to work, so either skipping left or skipping right is enough.', 'Does one of the two skips have to work, or both?'),
    ],
  }),
  make('Merge Strings Alternately', {
    teach: ['Merge Strings Alternately: take letters from word1 and word2 in turn; append whatever is left of the longer one.', 'Walk index i; append word1[i] if it exists, then word2[i] if it exists.'],
    questions: [
      ch('"abc" + "pqr" ->', ['"apbqcr"', '"abcpqr"', '"prqbca"', '"apbqrc"'], 0, 'a p b q c r.', 'Take one letter from each word in turn, starting with word1.'),
      ch('"ab" + "pqrs" ->', ['"apbqrs"', '"abpqrs"', '"apbq"', '"pqrsab"'], 0, 'The leftover "rs" is appended.', 'Alternate while both have letters, then what is left of the longer one?'),
      ord('Order the algorithm', ['result = []', 'Loop i while either word has letters', 'Append word1[i] if it exists', 'Append word2[i] if it exists', 'Join result'], 'Check bounds each time.', false, 'Build the pieces, then join them at the very end.'),
      bl('Fill in the blank', 'for i in range(___(len(a), len(b))):\n    if i < len(a): res.append(a[i])\n    if i < len(b): res.append(b[i])', ['max', 'min', 'sum'], 'max', 'The loop must cover the longer word so no leftover letters are lost.', 'Which length must the loop reach so no letters are dropped?'),
    ],
  }),
  make('Merge Sorted Array', {
    teach: ['Merge Sorted Array: merge nums2 into nums1, which has spare room at the end.', 'Fill from the back. Compare the largest remaining values and place the larger at the end. Nothing unread gets overwritten.'],
    questions: [
      ch('Why fill from the back?', ['Avoid overwriting unread values', 'It is faster', 'Sorted order requires it', 'No reason'], 0, 'The spare space is at the end.', 'Where is the empty space in nums1?'),
      ch('Starting pointers (i, j, k)?', ['m-1, n-1, m+n-1', '0, 0, 0', 'm, n, m+n', 'm-1, 0, m'], 0, 'Last real values and last slot.', 'Start at the last real element of each array and the last slot.'),
      ch('After nums1 is used up, what remains?', ['Copy rest of nums2', 'Nothing', 'Copy rest of nums1', 'Sort again'], 0, 'Leftover nums2 values go to the front.', 'Leftover nums1 values are already in place; what about the other array?'),
      bug('Find the bug', ['i, j, k = m - 1, n - 1, m + n - 1', 'while j >= 0:', '    if i >= 0 and nums1[i] < nums2[j]:', '        nums1[k] = nums1[i]; i -= 1', '    else:', '        nums1[k] = nums2[j]; j -= 1', '    k -= 1'], 2, 'Filling from the back means placing the LARGER value, so the test must be nums1[i] > nums2[j].', 'Which value belongs in the last slot, the larger or the smaller?'),
    ],
  }),
  make('Remove Duplicates From Sorted Array', {
    teach: ['Remove Duplicates: in a sorted array keep one copy of each value, in place; return the new length.', 'Duplicates sit together. Write pointer k = 1. If nums[i] differs from nums[i - 1], copy it to nums[k] and k += 1.'],
    questions: [
      ch('[0,0,1,1,2] -> k?', ['2', '3', '4', '5'], 1, 'Unique values: 0, 1, 2.', 'Count the distinct values.'),
      bl('Fill in the blank', 'for i in range(1, len(nums)):\n    if nums[i] ___ nums[i - 1]:\n        nums[k] = nums[i]\n        k += 1', ['!=', '==', '>'], '!=', 'A new value is different from the previous.', 'When is nums[i] worth keeping?'),
      ch('Why does this rely on sorting?', ['Duplicates are adjacent', 'Faster loops', 'Smaller numbers first', 'It does not'], 0, 'Equal values sit together.', 'Think about where equal values are located.'),
      bug('Find the bug', ['k = 0', 'for i in range(1, len(nums)):', '    if nums[i] != nums[i - 1]:', '        nums[k] = nums[i]', '        k += 1', 'return k'], 0, 'The first element is always kept, so the write slot starts at 1. With k = 0, [0,0,1] returns 1 instead of 2.', 'The loop starts at index 1; what has already been kept?'),
    ],
  }),
  make('Two Sum II Input Array Is Sorted', {
    teach: ['Two Sum II: the array is sorted; find two numbers that add to target (1-indexed).', 'Pointers at both ends. Sum too small: move left up. Sum too big: move right down. O(n) time, O(1) space.'],
    questions: [
      ch('Sum is smaller than target. What moves?', ['Left pointer right', 'Right pointer left', 'Both', 'Neither'], 0, 'We need a bigger sum.', 'Which pointer holds the smaller value, and how do you grow the sum?'),
      ch('Space complexity?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 1, 'No hash map needed.', 'Sorted order replaces the need for extra storage.'),
      ord('Order the algorithm', ['l = 0, r = n - 1', 'sum = nums[l] + nums[r]', 'If sum == target return [l+1, r+1]', 'If sum < target l += 1 else r -= 1'], 'Sorted order tells us which way to move.', false, 'Compute the sum, check for a match, then adjust a pointer.'),
      bl('Fill in the blank', 'while l < r:\n    s = nums[l] + nums[r]\n    if s == target: return [l + 1, r + 1]\n    elif s < target: l ___ 1\n    else: r -= 1', ['+=', '-=', '*='], '+=', 'A too-small sum needs a larger left value, so l moves right (index increases).', 'Sorted ascending: which direction gives bigger values?'),
    ],
  }),
  make('3Sum', {
    teach: ['3Sum: find all unique triplets that add to 0.', 'Sort. Fix i, then run Two Sum II on the rest with pointers l and r. Skip duplicate values for i, l and r so triplets are unique. O(n²).'],
    questions: [
      ch('Time complexity?', ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'], 2, 'One loop times one two-pointer scan.', 'Multiply the outer loop by the inner scan.'),
      ch('Why sort first?', ['Enables two pointers and easy duplicate skipping', 'Looks nicer', 'Required by Python', 'No reason'], 0, 'Duplicates become adjacent.', 'What does order give you for both the scan and the duplicates?'),
      ch('After finding a triplet you should:', ['Stop', 'Move both pointers and skip duplicates', 'Reset i', 'Only move l'], 1, 'Keep searching for new triplets.', 'There may be more triplets with the same i.'),
      bug('Find the bug', ['nums.sort()', 'for i in range(len(nums) - 2):', '    if i > 0 and nums[i] == nums[i + 1]: continue', '    l, r = i + 1, len(nums) - 1', '    while l < r:', '        s = nums[i] + nums[l] + nums[r]', '        if s < 0: l += 1', '        elif s > 0: r -= 1', '        else:', '            res.append([nums[i], nums[l], nums[r]])', '            l += 1', '            while l < r and nums[l] == nums[l - 1]: l += 1'], 2, 'Skipping when nums[i] equals the NEXT value drops the first copy, so [-1,-1,2] loses its triplet. Compare with nums[i - 1].', 'Which copy of a repeated value should be processed, the first or later ones?'),
    ],
  }),
  make('4Sum', {
    teach: ['4Sum: all unique quadruplets that add to target.', 'Sort. Two nested loops fix the first two numbers; two pointers find the other two. Skip duplicates at every level. O(n³). This generalizes to kSum.'],
    questions: [
      ch('Time complexity?', ['O(n²)', 'O(n³)', 'O(n⁴)', 'O(n)'], 1, 'Two loops plus a two-pointer scan.', 'Two nested loops, then a linear scan inside.'),
      ch('This pattern reduces 4Sum to:', ['3Sum, then 2Sum', 'Binary search', 'Sliding window', 'A stack'], 0, 'Fix one number and solve the smaller problem.', 'Each fixed number leaves a problem with one fewer number.'),
      ch('Duplicates are avoided by:', ['Sorting and skipping equal neighbors', 'A big set only', 'Random order', 'Not needed'], 0, 'Skip same values at each level.', 'Equal values end up next to each other after a certain step.'),
      bl('Fill in the blank', 'nums.sort()\nfor i in range(n - 3):\n    if nums[i] + nums[i+1] + nums[i+2] + nums[i+3] ___ target:\n        break', ['>', '<', '=='], '>', 'The array is sorted, so if the smallest possible sum already exceeds target, no later i can work.', 'The four smallest values from i are the cheapest sum; when is that hopeless?'),
    ],
  }),
  make('Rotate Array', {
    teach: ['Rotate Array: rotate right by k steps, in place.', 'Reverse trick: set k %= n, reverse the whole array, reverse the first k, reverse the rest. O(n) time, O(1) space.'],
    questions: [
      ch('[1,2,3,4,5,6,7], k = 3 ->', ['[5,6,7,1,2,3,4]', '[4,5,6,7,1,2,3]', '[3,2,1,7,6,5,4]', '[1,2,3,7,6,5,4]'], 0, 'Last 3 move to the front.', 'Rotating right moves the tail elements to the front.'),
      ch('Why k %= n?', ['Rotating by n changes nothing', 'Speed only', 'Avoid negatives', 'No reason'], 0, 'k can be larger than n.', 'What happens after a full lap of rotations?'),
      ord('Order the reverse trick', ['k %= n', 'Reverse the whole array', 'Reverse the first k elements', 'Reverse the remaining n - k elements'], 'Three reversals.', false, 'Normalize k, flip everything, then fix each part.'),
      bug('Find the bug', ['k %= len(nums)', 'nums.reverse()', 'nums[:k] = nums[:k][::-1]', 'nums[k + 1:] = nums[k + 1:][::-1]'], 3, 'The second part starts at index k, not k + 1; with k + 1 the element at index k is never fixed.', 'Where does the second part begin after the first k elements?'),
    ],
  }),
  make('Container With Most Water', {
    teach: ['Container With Most Water: pick two lines that hold the most water.', 'Area = min(height[l], height[r]) * (r - l). Start wide and move the SHORTER line inward: moving the taller one can never raise the limiting height.'],
    questions: [
      ch('Which pointer moves?', ['The shorter line', 'The taller line', 'Always left', 'Both'], 0, 'The short side limits the water.', 'Which line limits the water level?'),
      ch('[1,8,6,2,5,4,8,3,7] max area?', ['40', '49', '56', '36'], 1, 'Lines 8 and 7, width 7: 7 * 7 = 49.', 'Try the wide pair using the 8 near the left and the 7 at the end.'),
      bl('Fill in the blank', 'area = ___(height[l], height[r]) * (r - l)', ['min', 'max', 'sum'], 'min', 'Water level is the shorter side.', 'Water spills over the lower wall.'),
      bug('Find the bug', ['l, r = 0, len(height) - 1', 'best = 0', 'while l < r:', '    best = max(best, min(height[l], height[r]) * (r - l))', '    if height[l] > height[r]:', '        l += 1', '    else:', '        r -= 1'], 4, 'It moves the taller line, which can never help. Move l only when height[l] is the shorter one (height[l] < height[r]).', 'Moving the pointer on the taller side keeps the same limiting height but shrinks width.'),
    ],
  }),
  make('Boats to Save People', {
    teach: ['Boats to Save People: each boat holds at most 2 people with total weight <= limit. Minimize boats.', 'Sort. Pair the heaviest with the lightest if they fit; otherwise the heaviest goes alone. Two pointers.'],
    questions: [
      ch('Max people per boat?', ['1', '2', '3', 'limit'], 1, 'The problem caps it at 2.', 'Reread the boat rule in the problem statement.'),
      ch('people = [3,2,2,1], limit = 3. Boats?', ['2', '3', '4', '1'], 1, '(1,2), (2), (3).', 'Pair the lightest with the heaviest when they fit.'),
      ord('Order the algorithm', ['Sort people', 'l = 0, r = n - 1', 'If people[l] + people[r] <= limit, l += 1', 'r -= 1 and boats += 1'], 'The heaviest always boards; the lightest joins if it fits.', false, 'The heaviest person always takes a boat; the lightest may join.'),
      bl('Fill in the blank', 'people.sort()\nl, r, boats = 0, len(people) - 1, 0\nwhile l ___ r:\n    if people[l] + people[r] <= limit:\n        l += 1\n    r -= 1\n    boats += 1', ['<=', '<', '!='], '<=', 'When l == r exactly one person is left and still needs a boat, so the loop must run for l <= r.', 'What happens when exactly one person remains?'),
    ],
  }),
  make('Trapping Rain Water', {
    teach: ['Trapping Rain Water: how much water is trapped between bars?', 'Water above a bar = min(maxLeft, maxRight) - height. Two pointers: move the side with the smaller max, because that side is the limiting wall. O(n) time, O(1) space.'],
    questions: [
      ch('[0,1,0,2,1,0,1,3,2,1,2,1] ->', ['4', '6', '8', '9'], 1, 'Classic example: 6 units.', 'Add up the water above each bar between the walls.'),
      ch('Water above a bar equals?', ['min(leftMax, rightMax) - height', 'max(leftMax, rightMax)', 'height', 'leftMax + rightMax'], 0, 'The lower wall sets the level.', 'Water fills up to the lower of the two surrounding walls.'),
      ch('Which pointer do you process?', ['The side with the smaller max', 'The larger max', 'Always left', 'The tallest bar'], 0, 'That side is bounded by its own max.', 'Process the side whose limit you already know for certain.'),
      bug('Find the bug', ['l, r = 0, len(h) - 1', 'lm = rm = 0', 'water = 0', 'while l < r:', '    if h[l] < h[r]:', '        lm = max(lm, h[l])', '        water += h[l] - lm', '        l += 1', '    else:', '        rm = max(rm, h[r])', '        water += rm - h[r]', '        r -= 1'], 6, 'Water is the wall height minus the bar height: lm - h[l]. The reversed sign gives zero or negative water.', 'Compare this line with the matching line in the else branch.'),
    ],
  }),
];
