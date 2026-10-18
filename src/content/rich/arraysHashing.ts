import { Lesson } from '../types';
import { make, ch, ord, bl, bug, mt } from '../make';

// Guided lessons: understand the prompt -> the tools -> brute force -> better -> optimal -> type it yourself.
export const richArraysHashing: Lesson[] = [
  make('Concatenation of Array', {
    rich: {
      statement: 'You get an array nums of length n. Build a new array ans of length 2n where ans[i] = nums[i] and ans[i + n] = nums[i]. In other words, nums written twice in a row.',
      example: { input: 'nums = [1, 2, 1]', output: '[1, 2, 1, 1, 2, 1]', why: 'The first three values copy nums, the next three copy it again.' },
      ask: 'Nothing clever is hidden here. We just need the same list twice, so the question is how to write that clearly in code.',
      tools: [
        { name: 'List append', what: 'ans.append(x) adds x at the end of the list ans. Building a list one value at a time is the most basic way to create one.' },
        { name: 'List + list', what: 'In Python, a + b joins two lists into a new list: the values of a, then the values of b.' },
      ],
      approaches: [
        { name: 'Append in two rounds', idea: 'Start with an empty list. Twice, loop over nums and append every value.', code: ['ans = []', 'for _ in range(2):', '    for x in nums:', '        ans.append(x)', 'return ans'], time: 'O(n)', space: 'O(n)', why: 'Clear and works in any language. The answer needs 2n values, so O(n) space is unavoidable.' },
        { name: 'Fill by index', idea: 'Make a list of 2n zeros. Copy nums[i] into positions i and i + n.', code: ['n = len(nums)', 'ans = [0] * (2 * n)', 'for i in range(n):', '    ans[i] = nums[i]', '    ans[i + n] = nums[i]', 'return ans'], time: 'O(n)', space: 'O(n)', why: 'Matches the definition exactly: ans[i] and ans[i + n].' },
        { name: 'Join two lists', idea: 'Python can join lists directly, so the answer is nums + nums.', code: ['return nums + nums'], time: 'O(n)', space: 'O(n)', why: 'Same cost, one line. When a clear built-in does the job, use it.' },
      ],
    },
    questions: [
      ch('nums = [4, 5]. What is the answer?', ['[4, 5, 4, 5]', '[4, 4, 5, 5]', '[8, 10]', '[5, 4, 5, 4]'], 0, 'The whole array is written twice, in the same order.', 'Write [4, 5] two times in a row.'),
      ch('The result for n numbers has how many elements?', ['2n', 'n', 'n²', 'n + 1'], 0, 'Two copies of n values make 2n.', 'How many copies are there?'),
      mt('Match each idea to what it does', [['ans.append(x)', 'Adds x at the end'], ['nums + nums', 'Joins two lists'], ['[0] * (2 * n)', 'Makes 2n placeholder zeros'], ['ans[i + n] = nums[i]', 'Writes the second copy']], 'Each line is a small building block. The three approaches combine them differently.', 'The last one is the second copy of nums.'),
      bl('Append in two rounds: fill in the blank', 'ans = []\nfor _ in range(___):\n    for x in nums:\n        ans.append(x)\nreturn ans', ['2', '1', 'n', '3'], '2', 'We copy the whole array two times, so the outer loop runs twice.', 'How many copies do we need?'),
      ch('Why can the space not be less than O(n)?', ['The answer itself has 2n values', 'Lists are slow', 'Loops use memory', 'It can be O(1)'], 0, 'We must return a list of 2n values, so we store at least that many.', 'Count the values we have to return.'),
      bl('Fill by index: fill in the blank', 'n = len(nums)\nans = [0] * (2 * n)\nfor i in range(n):\n    ans[i] = nums[i]\n    ans[i + ___] = nums[i]', ['n', '1', '2', 'i'], 'n', 'The second copy starts n positions later, so index i + n.', 'The second copy starts after the first n values.'),
      bug('Tap the buggy line', ['n = len(nums)', 'ans = []', 'for i in range(n):', '    ans.append(nums[i % n])', 'return ans'], 2, 'The result needs 2n values, so the loop must run range(2 * n). range(n) only builds one copy.', 'How many values must ans end up with?'),
      ord('Put the fill-by-index solution in order', ['n = len(nums)', 'ans = [0] * (2 * n)', 'for i in range(n):', '    ans[i] = nums[i]', '    ans[i + n] = nums[i]', 'return ans'], 'Know n, make room for 2n values, copy each value twice, return.', true, 'Find n first.'),
      bl('Shortest: fill in the blank', 'def getConcatenation(nums):\n    return nums ___ nums', ['+', '*', '-', '&'], '+', 'The + operator joins two lists into a new one.', 'Which operator joins two lists?'),
    ],
  }),

  make('Majority Element', {
    rich: {
      statement: 'You get an array nums of length n. The majority element is the value that appears more than n / 2 times. It always exists. Return it.',
      example: { input: 'nums = [2, 2, 1, 1, 1, 2, 2]', output: '2', why: '2 appears 4 times, and 4 is more than 7 / 2 = 3.5.' },
      ask: 'One value owns more than half of the array. That is a strong promise: it lets us find it by counting, or even by cancelling pairs of different values.',
      tools: [
        { name: 'Counting with a dict', what: 'A dict maps a value to how many times we have seen it. Reading and updating one key is O(1) on average.' },
        { name: 'Voting (Boyer-Moore)', what: 'Keep one candidate and a vote count. A matching value adds a vote, a different value removes one. If votes hit 0, pick a new candidate. A value with more than half of all votes can never be fully cancelled out.' },
      ],
      approaches: [
        { name: 'Count every value', idea: 'For each value, count how often it appears in the whole list. Return the first one above n / 2.', code: ['for x in nums:', '    if nums.count(x) > len(nums) // 2:', '        return x'], time: 'O(n²)', space: 'O(1)', why: 'nums.count scans the list each time, so n values times n steps.' },
        { name: 'Dict of counts', idea: 'Walk the list once, count each value in a dict, and return as soon as a count passes n / 2.', code: ['count = {}', 'for x in nums:', '    count[x] = count.get(x, 0) + 1', '    if count[x] > len(nums) // 2:', '        return x'], time: 'O(n)', space: 'O(n)', why: 'Each value is handled once, but the dict can hold many different values.' },
        { name: 'Boyer-Moore voting', idea: 'Keep a candidate and votes. Matching values add a vote, others remove one, and 0 votes means pick a new candidate.', code: ['candidate, votes = None, 0', 'for x in nums:', '    if votes == 0:', '        candidate = x', '    votes += 1 if x == candidate else -1', 'return candidate'], time: 'O(n)', space: 'O(1)', why: 'The majority has more votes than everything else put together, so it survives to the end. No extra memory.' },
      ],
    },
    questions: [
      ch('nums = [3, 3, 4]. Which value is the majority?', ['3', '4', '3 and 4', 'none'], 0, '3 appears twice, and 2 is more than 3 / 2 = 1.5.', 'Which value is more than half the array?'),
      ch('How often must the majority element appear?', ['More than n / 2 times', 'At least once', 'Exactly n / 2 times', 'More than n / 3 times'], 0, 'Strictly more than half. This guarantee is what makes voting work.', 'Re-read the problem statement.'),
      mt('Match each approach to its cost', [['Count every value', 'O(n²) time'], ['Dict of counts', 'O(n) time, O(n) space'], ['Boyer-Moore voting', 'O(n) time, O(1) space']], 'Voting is the only one that is both linear in time and constant in space.', 'The best one uses no extra memory.'),
      bl('Brute force: fill in the blank', 'for x in nums:\n    if nums.count(x) > len(nums) ___ 2:\n        return x', ['//', '*', '%', '+'], '//', 'Half of n, rounded down: more than that is a majority.', 'We want n divided by 2.'),
      ch('Why is the brute force slow?', ['count() scans the list for every value', 'It sorts the list', 'It uses recursion', 'It needs a dict'], 0, 'n values times an O(n) scan is O(n²).', 'What does nums.count(x) do inside the loop?'),
      bl('Dict of counts: fill in the blank', 'count = {}\nfor x in nums:\n    count[x] = count.get(x, ___) + 1', ['0', '1', 'None', 'x'], '0', 'A value we have not seen has count 0, then we add 1.', 'What is the count of a new value?'),
      ord('Put the voting solution in order', ['candidate, votes = None, 0', 'for x in nums:', '    if votes == 0:', '        candidate = x', '    votes += 1 if x == candidate else -1', 'return candidate'], 'Pick a new candidate when votes reach 0, then add or remove a vote.', true, 'Start with no candidate.'),
      bug('Tap the buggy line', ['candidate, votes = None, 0', 'for x in nums:', '    if votes == 0:', '        candidate = x', '    votes += 1', 'return candidate'], 4, 'Votes must go down for a different value. Always adding means the last new candidate wins.', 'Do different values cancel a vote?'),
      ch('Space used by Boyer-Moore voting?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only a candidate and a counter are stored.', 'How many variables does it keep?'),
      bl('Optimal: fill in the blank', 'candidate, votes = None, 0\nfor x in nums:\n    if votes == 0:\n        candidate = x\n    votes += 1 if x == candidate else ___\nreturn candidate', ['-1', '0', '1', 'votes'], '-1', 'A different value cancels one vote.', 'A different value removes a vote.'),
    ],
  }),

  make('Remove Element', {
    rich: {
      statement: 'You get an array nums and a value val. Remove every val from nums in place, keep the other values in the first k positions, and return k. What is stored after position k does not matter.',
      example: { input: 'nums = [3, 2, 2, 3], val = 3', output: '2 (nums starts with [2, 2])', why: 'The two 3s are removed. The first 2 positions hold [2, 2].' },
      ask: 'We are not building a new list: we overwrite nums so the values we keep come first. The real question is how to keep a "write position" that only moves when we keep a value.',
      tools: [
        { name: 'In-place', what: 'In place means we change the given list itself and use only O(1) extra memory, instead of building a new list.' },
        { name: 'Two pointers', what: 'One pointer (i) reads every value. A second pointer (k) marks where the next kept value is written. k can only be behind or equal to i.' },
      ],
      approaches: [
        { name: 'Build a new list', idea: 'Collect the values that are not val, copy them back to the front of nums, and return the count.', code: ['rest = [x for x in nums if x != val]', 'nums[:len(rest)] = rest', 'return len(rest)'], time: 'O(n)', space: 'O(n)', why: 'Easy, but it uses extra memory the problem asks us to avoid.' },
        { name: 'Overwrite with a write pointer', idea: 'Read every value. Whenever it is not val, write it at position k and move k forward.', code: ['k = 0', 'for x in nums:', '    if x != val:', '        nums[k] = x', '        k += 1', 'return k'], time: 'O(n)', space: 'O(1)', why: 'One pass, no extra list. Each kept value moves at most to an earlier position.' },
        { name: 'Swap in the last value', idea: 'When nums[i] is val, replace it with the last unchecked value and shrink the list. Only advance i when we keep a value.', code: ['i, n = 0, len(nums)', 'while i < n:', '    if nums[i] == val:', '        nums[i] = nums[n - 1]', '        n -= 1', '    else:', '        i += 1', 'return n'], time: 'O(n)', space: 'O(1)', why: 'Does fewer writes when val is rare. We do not advance i after a swap, because the swapped value is not checked yet.' },
      ],
    },
    questions: [
      ch('nums = [0, 1, 2, 2, 3, 0], val = 2. What do we return?', ['4', '2', '6', '3'], 0, 'Two 2s are removed, so 6 - 2 = 4 values stay.', 'Count the values that are not 2.'),
      ch('What does the returned k mean?', ['How many values are kept', 'The removed value', 'The index of val', 'The array length'], 0, 'The first k positions of nums hold the kept values.', 'Look at the example output.'),
      mt('Match each idea to its role', [['Read pointer', 'Looks at every value'], ['Write pointer k', 'Where the next kept value goes'], ['In place', 'Change nums itself'], ['Return k', 'How many values were kept']], 'Reading and writing separately is the heart of in-place array problems.', 'The write pointer only moves when we keep a value.'),
      bl('New list: fill in the blank', 'rest = [x for x in nums if x ___ val]\nnums[:len(rest)] = rest\nreturn len(rest)', ['!=', '==', '<', 'in'], '!=', 'We keep the values that are different from val.', 'Keep everything except val.'),
      ch('Why does the new-list approach not satisfy "in place"?', ['It uses O(n) extra memory', 'It is too slow', 'It changes nums', 'It uses recursion'], 0, 'The list rest can be as large as nums.', 'What does rest store?'),
      bl('Write pointer: fill in the blank', 'k = 0\nfor x in nums:\n    if x != val:\n        nums[k] = x\n        k ___ 1\nreturn k', ['+=', '-=', '=', '*='], '+=', 'After writing a kept value, move the write position forward.', 'The next kept value goes one position later.'),
      ord('Put the write-pointer solution in order', ['k = 0', 'for x in nums:', '    if x != val:', '        nums[k] = x', '        k += 1', 'return k'], 'Write first, then move k. Return k at the end.', true, 'Start k at 0.'),
      bug('Tap the buggy line', ['k = 0', 'for x in nums:', '    if x != val:', '        nums[k] = x', 'return k'], 3, 'k never moves, so every kept value overwrites position 0. We need k += 1 after the write. (This is the missing line.)', 'What moves the write position?'),
      ch('Space used by the write-pointer solution?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only the counter k is stored.', 'Do we create any list?'),
      bl('Swap version: fill in the blank', 'i, n = 0, len(nums)\nwhile i < n:\n    if nums[i] == val:\n        nums[i] = nums[___]\n        n -= 1\n    else:\n        i += 1\nreturn n', ['n - 1', 'n', 'i + 1', 'k'], 'n - 1', 'The last unchecked value is at index n - 1. It replaces the removed one.', 'The last unchecked position is n - 1.'),
    ],
  }),

  make('Group Anagrams', {
    rich: {
      statement: 'You get a list of strings. Group together the strings that are anagrams of each other (same letters, same counts). Return the groups in any order.',
      example: { input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]', output: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]', why: '"eat", "tea" and "ate" use the same letters. So do "tan" and "nat".' },
      ask: 'Anagrams are "the same thing in a different order". If we find one value that is identical for all anagrams, we can use it as a label and put all strings with the same label in one group.',
      tools: [
        { name: 'Canonical key', what: 'A key that is the same for every anagram. Option 1: the letters sorted ("eat" → "aet"). Option 2: the letter counts (a: 1, e: 1, t: 1).' },
        { name: 'defaultdict(list)', what: 'A dict that creates an empty list the first time you use a key. groups[key].append(s) works without checking whether key exists.' },
        { name: 'Hashable keys', what: 'Dict keys must be hashable. A tuple can be a key, a list cannot. That is why a count list is converted with tuple(count).' },
      ],
      approaches: [
        { name: 'Compare with every group', idea: 'For each string, look through the existing groups and check if it is an anagram of the first member. Otherwise start a new group.', code: ['groups = []', 'for s in strs:', '    for g in groups:', '        if sorted(g[0]) == sorted(s):', '            g.append(s)', '            break', '    else:', '        groups.append([s])', 'return groups'], time: 'O(n² · k log k)', space: 'O(n · k)', why: 'Every string is compared with many groups. n is the number of strings and k the longest length.' },
        { name: 'Sorted letters as the key', idea: 'Sort the letters of each string. All anagrams give the same sorted string, so use it as a dict key.', code: ['groups = defaultdict(list)', 'for s in strs:', '    groups["".join(sorted(s))].append(s)', 'return list(groups.values())'], time: 'O(n · k log k)', space: 'O(n · k)', why: 'One lookup per string. Sorting each string costs k log k.' },
        { name: 'Letter counts as the key', idea: 'Count how many times each letter a-z appears. The 26 counts are the key, which avoids sorting.', code: ['groups = defaultdict(list)', 'for s in strs:', '    count = [0] * 26', '    for ch in s:', '        count[ord(ch) - ord("a")] += 1', '    groups[tuple(count)].append(s)', 'return list(groups.values())'], time: 'O(n · k)', space: 'O(n · k)', why: 'Counting is linear in k, better than sorting. Works for lowercase a-z.' },
      ],
    },
    questions: [
      ch('Which two words are anagrams?', ['listen and silent', 'cat and cut', 'tea and ten', 'bat and bad'], 0, 'listen and silent use exactly the same letters.', 'Same letters, same counts.'),
      ch('What do all strings of one group share?', ['The same sorted letters', 'The same length only', 'The same first letter', 'Nothing'], 0, 'Sorted letters are identical for anagrams, so they work as a group label.', 'What does sorting remove?'),
      mt('Match each key idea to its example', [['Sorted letters', '"eat" → "aet"'], ['Letter counts', 'a:1, e:1, t:1'], ['Hashable key', 'A tuple like (1, 0, 1)'], ['defaultdict(list)', 'Creates the group on first use']], 'The key identifies the group, and the dict collects strings by key.', 'A list cannot be a dict key but a tuple can.'),
      bl('Brute force: fill in the blank', 'for g in groups:\n    if sorted(g[0]) ___ sorted(s):\n        g.append(s)\n        break', ['==', '!=', 'in', '+'], '==', 'Two strings are anagrams when their sorted letters are equal.', 'We want to know if they are the same.'),
      ch('Why is comparing with every group slow?', ['Each string is checked against many groups', 'It uses a dict', 'It sorts the list', 'It uses recursion'], 0, 'With many groups, each string needs many comparisons.', 'How many groups might each string meet?'),
      bl('Sorted key: fill in the blank', 'groups = defaultdict(list)\nfor s in strs:\n    groups["".join(___(s))].append(s)', ['sorted', 'reversed', 'set', 'len'], 'sorted', 'sorted(s) returns the letters in order. join turns them back into a string key.', 'We need the letters in alphabetical order.'),
      ord('Put the letter-count solution in order', ['groups = defaultdict(list)', 'for s in strs:', '    count = [0] * 26', '    for ch in s:', '        count[ord(ch) - ord("a")] += 1', '    groups[tuple(count)].append(s)', 'return list(groups.values())'], 'Count the letters of each string, turn the counts into a key, and drop the string in that group.', true, 'Create the dict first.'),
      bug('Tap the buggy line', ['groups = defaultdict(list)', 'for s in strs:', '    count = [0] * 26', '    for ch in s:', '        count[ord(ch) - ord("a")] += 1', '    groups[count].append(s)', 'return list(groups.values())'], 5, 'A list is not hashable, so it cannot be a dict key. Use tuple(count).', 'Which Python types can be dict keys?'),
      ch('Time of the letter-count solution?', ['O(n · k)', 'O(n²)', 'O(n log n)', 'O(k)'], 0, 'Each of the n strings is counted in k steps.', 'Counting one string takes k steps.'),
      bl('Optimal: fill in the blank', 'count = [0] * 26\nfor ch in s:\n    count[ord(ch) - ord("a")] += 1\ngroups[___(count)].append(s)', ['tuple', 'list', 'set', 'sum'], 'tuple', 'A tuple is hashable, so the counts can be a dict key.', 'Which type can be a key and holds the counts?'),
    ],
  }),

  make('Contains Duplicate', {
    rich: {
      statement: 'You are given a list of numbers called nums. Say whether any value shows up more than once.',
      example: { input: 'nums = [1, 2, 3, 1]', output: 'true', why: 'The number 1 appears twice. For [1, 2, 3, 4] the answer is false.' },
      ask: 'We only need a yes or no: has any value been seen before? The whole problem is answering "have I seen this already?" quickly.',
      tools: [
        { name: 'Set', what: 'A set keeps each value only once and answers "is x inside?" in O(1) on average. No scanning needed. It is a list with a memory.' },
        { name: 'Sorting', what: 'After sorting, equal numbers sit next to each other. So duplicates are easy to spot: just compare each number with its neighbour.' },
      ],
      approaches: [
        { name: 'Compare every pair', idea: 'For each number, look at every number after it. If two match, return true.', code: ['for i in range(len(nums)):', '    for j in range(i + 1, len(nums)):', '        if nums[i] == nums[j]:', '            return True', 'return False'], time: 'O(n²)', space: 'O(1)', why: 'Simple, but with 100,000 numbers that is billions of comparisons.' },
        { name: 'Sort, then compare neighbours', idea: 'Sort the list. Any duplicates are now side by side, so one pass finds them.', code: ['nums.sort()', 'for i in range(1, len(nums)):', '    if nums[i] == nums[i - 1]:', '        return True', 'return False'], time: 'O(n log n)', space: 'O(1)', why: 'Much faster, and it uses no extra memory. Sorting is the cost.' },
        { name: 'Hash set', idea: 'Walk the list once. If the number is already in the set, it is a duplicate. Otherwise add it.', code: ['seen = set()', 'for x in nums:', '    if x in seen:', '        return True', '    seen.add(x)', 'return False'], time: 'O(n)', space: 'O(n)', why: 'We trade memory for speed: one pass, and each check is O(1).' },
      ],
    },
    questions: [
      ch('nums = [4, 7, 9, 7]. What do we return?', ['true', 'false', '7', '[1, 3]'], 0, 'The value 7 appears twice, so the answer is true. We return a yes/no, not the value.', 'Is any value repeated? Return only yes or no.'),
      mt('Match each idea to what it does', [['Brute force', 'Compare every pair'], ['Sorting', 'Puts equal values side by side'], ['Hash set', 'Remembers values already seen']], 'Each approach finds duplicates in its own way. Sets remember, sorting groups, brute force compares everything.', 'Which one keeps a memory of what it has seen?'),
      ch('Why is comparing every pair slow?', ['Two nested loops give about n × n checks', 'It sorts the list', 'It uses recursion', 'It needs extra memory'], 0, 'n numbers each checked against n others is about n² comparisons.', 'Count how many loops are inside each other.'),
      bl('Brute force: fill in the blank', 'for i in range(len(nums)):\n    for j in range(___, len(nums)):\n        if nums[i] == nums[j]:\n            return True\nreturn False', ['i + 1', '0', 'i', 'i - 1'], 'i + 1', 'Starting j at i + 1 skips comparing a number with itself and avoids repeating pairs.', 'j must never equal i.'),
      ch('After sorting, where are duplicates?', ['Next to each other', 'At the ends', 'In the middle', 'Nowhere special'], 0, 'Sorting puts equal values side by side, so only neighbours need comparing.', 'Think of sorted names: same names touch.'),
      bl('Sorting: fill in the blank', 'nums.sort()\nfor i in range(1, len(nums)):\n    if nums[i] == nums[___]:\n        return True\nreturn False', ['i - 1', 'i + 1', 'i', '0'], 'i - 1', 'We compare each number with the one just before it. Starting at 1 means i - 1 always exists.', 'Compare with the previous element.'),
      ord('Put the hash set solution in order', ['seen = set()', 'for x in nums:', '    if x in seen:', '        return True', '    seen.add(x)', 'return False'], 'Check first, then add. If you add first, every number looks like a duplicate of itself.', true, 'Create the set, then loop.'),
      bug('Tap the buggy line', ['seen = set()', 'for x in nums:', '    seen.add(x)', '    if x in seen:', '        return True', 'return False'], 2, 'Adding x before checking means x is always already in the set, so this returns true for every list.', 'What is true right after you add x?'),
      ch('Space used by the hash set solution?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 0, 'If all numbers are different, the set stores all n of them.', 'What if there are no duplicates at all?'),
      bl('Optimal: fill in the blank', 'seen = set()\nfor x in nums:\n    if x in ___:\n        return True\n    seen.add(x)\nreturn False', ['seen', 'nums', 'set', 'x'], 'seen', 'We ask the set of values we have already seen whether x is in it.', 'Which collection is the memory?'),
    ],
  }),

  make('Valid Anagram', {
    rich: {
      statement: 'You get two strings, s and t. Return true if t can be made by rearranging the letters of s. Both must use the same letters the same number of times.',
      example: { input: 's = "anagram", t = "nagaram"', output: 'true', why: 'Both have 3 a, 1 n, 1 g, 1 r, 1 m. For s = "rat", t = "car" the answer is false.' },
      ask: 'Order does not matter, only how many of each letter. So two strings are anagrams exactly when their letter counts are equal.',
      tools: [
        { name: 'Hash map (dict)', what: 'A dict maps a key to a value, here letter → count. Looking up or updating a key is O(1) on average.' },
        { name: 'Sorting', what: 'Sorting rearranges letters into alphabetical order. Two anagrams always sort to exactly the same string.' },
      ],
      approaches: [
        { name: 'Cross letters off', idea: 'Turn t into a list. For each letter of s, find it in the list and remove it. If a letter is missing, return false.', code: ['if len(s) != len(t):', '    return False', 'rest = list(t)', 'for ch in s:', '    if ch in rest:', '        rest.remove(ch)', '    else:', '        return False', 'return True'], time: 'O(n²)', space: 'O(n)', why: 'Each search through the list can take n steps.' },
        { name: 'Sort both', idea: 'Sort the letters of both strings and compare them.', code: ['return sorted(s) == sorted(t)'], time: 'O(n log n)', space: 'O(n)', why: 'Short and clear. Sorting costs a bit more than counting.' },
        { name: 'Count letters', idea: 'Count each letter of s. Then walk t and subtract. If a count would go below zero, t has a letter s does not.', code: ['if len(s) != len(t):', '    return False', 'count = {}', 'for ch in s:', '    count[ch] = count.get(ch, 0) + 1', 'for ch in t:', '    if count.get(ch, 0) == 0:', '        return False', '    count[ch] -= 1', 'return True'], time: 'O(n)', space: 'O(k)', why: 'One pass over each string. k is the number of different letters, at most 26 for lowercase.' },
      ],
    },
    questions: [
      ch('s = "listen", t = "silent". Return?', ['true', 'false', '"listen"', '6'], 0, 'Both use l, i, s, t, e, n once each, so t is a rearrangement of s.', 'Compare the letters, not their order.'),
      ch('If the two strings have different lengths, what is the answer?', ['false', 'true', 'It depends', 'Error'], 0, 'Anagrams use all the same letters, so the lengths must be equal. This check saves work.', 'Can a rearrangement change the number of letters?'),
      mt('Match each approach to its cost', [['Cross letters off', 'O(n²)'], ['Sort both strings', 'O(n log n)'], ['Count letters', 'O(n)']], 'Searching a list is slow, sorting is in between, counting is a single pass.', 'Counting touches each letter once.'),
      bl('Sorting: fill in the blank', 'def isAnagram(s, t):\n    return sorted(s) ___ sorted(t)', ['==', '+', 'in', 'is not'], '==', 'Anagrams sort to exactly the same list of letters, so they are equal.', 'We want to test if two lists are the same.'),
      bl('Counting: fill in the blank', 'count = {}\nfor ch in s:\n    count[ch] = count.get(ch, ___) + 1', ['0', '1', 'None', 'ch'], '0', 'get returns the default when the letter is new. A new letter starts at 0, then we add 1.', 'What count does an unseen letter have?'),
      ord('Put the counting solution in order', ['count = {}', 'for ch in s:', '    count[ch] = count.get(ch, 0) + 1', 'for ch in t:', '    if count.get(ch, 0) == 0:', '        return False', '    count[ch] -= 1', 'return True'], 'Build the counts from s first. Then t uses them up. Any letter with no count left is extra.', true, 'Count s before you read t.'),
      bug('Tap the buggy line', ['count = {}', 'for ch in s:', '    count[ch] = count.get(ch, 0) + 1', 'for ch in t:', '    if count.get(ch, 0) == 0:', '        return False', '    count[ch] += 1', 'return True'], 6, 'Reading a letter from t must use up one count, so it should be -= 1. Adding makes counts grow and extra letters slip through.', 'Reading t should use up counts.'),
      ch('Why is the count solution O(1) space for lowercase letters?', ['At most 26 different keys', 'It stores nothing', 'It sorts in place', 'It is recursive'], 0, 'The dict has at most 26 entries no matter how long the strings are.', 'How many different lowercase letters exist?'),
      bl('Optimal: fill in the blank', 'for ch in t:\n    if count.get(ch, 0) == 0:\n        return False\n    count[ch] ___ 1\nreturn True', ['-=', '+=', '=', '*='], '-=', 'We use up one occurrence of ch. A count of 0 means t has one more of that letter than s.', 'Using up a count means going down.'),
    ],
  }),

  make('Two Sum', {
    rich: {
      statement: 'You get a list of numbers nums and a number target. Find two different positions i and j whose values add up to target, and return [i, j]. Exactly one answer exists.',
      example: { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', why: 'nums[0] + nums[1] = 2 + 7 = 9. We return the positions, not the values.' },
      ask: 'For each number x, we really ask: is target − x somewhere else in the list? Turning "find a pair" into "find one missing partner" is the whole trick.',
      tools: [
        { name: 'Complement', what: 'If x + y = target then y = target − x. We call target − x the complement: the partner x needs.' },
        { name: 'Hash map (dict)', what: 'A dict maps a key to a value and finds a key in O(1) on average, without scanning. Here: key = a number we have seen, value = its position.' },
      ],
      approaches: [
        { name: 'Try every pair', idea: 'Use two loops and test each pair of positions.', code: ['for i in range(len(nums)):', '    for j in range(i + 1, len(nums)):', '        if nums[i] + nums[j] == target:', '            return [i, j]'], time: 'O(n²)', space: 'O(1)', why: 'Always works but gets slow with large lists.' },
        { name: 'Two passes with a hash map', idea: 'First store every number with its position. Then for each number, look up its complement.', code: ['seen = {}', 'for i, x in enumerate(nums):', '    seen[x] = i', 'for i, x in enumerate(nums):', '    j = seen.get(target - x)', '    if j is not None and j != i:', '        return [i, j]'], time: 'O(n)', space: 'O(n)', why: 'Lookups are O(1), so each pass is linear. The j != i check stops a number pairing with itself.' },
        { name: 'One pass with a hash map', idea: 'Walk the list once. Before storing x, ask whether its complement was already seen.', code: ['seen = {}', 'for i, x in enumerate(nums):', '    need = target - x', '    if need in seen:', '        return [seen[need], i]', '    seen[x] = i'], time: 'O(n)', space: 'O(n)', why: 'Checking before storing means we never use one element twice, and we finish in one pass.' },
      ],
    },
    questions: [
      ch('nums = [3, 2, 4], target = 6. What do we return?', ['[1, 2]', '[0, 0]', '[0, 2]', '[2, 2]'], 0, 'nums[1] + nums[2] = 2 + 4 = 6. Using 3 twice (positions 0 and 0) is not allowed.', 'Which two different numbers add to 6?'),
      ch('What does Two Sum ask us to return?', ['The two positions', 'The two values', 'Their sum', 'true or false'], 0, 'The answer is the pair of indices, such as [0, 1].', 'Look at the example output [0, 1].'),
      mt('Match each idea to its role', [['Brute force', 'Check every pair of numbers'], ['Hash map', 'Remember each number and its position'], ['Complement', 'target − x'], ['Check before storing', 'Never use one element twice']], 'Together: for each x look up target − x in the map of what we have seen.', 'The complement is the partner a number needs.'),
      bl('Brute force: fill in the blank', 'for i in range(len(nums)):\n    for j in range(___, len(nums)):\n        if nums[i] + nums[j] == target:\n            return [i, j]', ['i + 1', '0', 'i', 'i - 1'], 'i + 1', 'Starting at i + 1 means we never pair a position with itself and never test a pair twice.', 'j must differ from i.'),
      ch('Why is brute force slow?', ['Two nested loops test about n × n pairs', 'It sorts the list', 'It uses recursion', 'It needs a big dict'], 0, 'Each of n numbers is tested against up to n others, so O(n²).', 'Count the nested loops.'),
      bl('Two passes: fill in the blank', 'seen = {}\nfor i, x in enumerate(nums):\n    seen[x] = ___', ['i', 'x', 'target', 'len(nums)'], 'i', 'The map stores number → position, so we can return the position when we find the partner.', 'We need positions as the answer.'),
      ord('Put the one-pass solution in order', ['seen = {}', 'for i, x in enumerate(nums):', '    need = target - x', '    if need in seen:', '        return [seen[need], i]', '    seen[x] = i'], 'Compute the complement, look it up, and only then store x.', true, 'Create the map, then loop.'),
      bug('Tap the buggy line', ['seen = {}', 'for i, x in enumerate(nums):', '    seen[x] = i', '    need = target - x', '    if need in seen:', '        return [seen[need], i]'], 2, 'Storing x first lets x find itself. With nums = [3] and target = 6 it returns [0, 0], using one element twice.', 'What can the lookup find right after you store x?'),
      ch('Space used by the one-pass hash map?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 0, 'In the worst case we store almost every number before finding the pair.', 'How many entries can the dict hold?'),
      bl('Optimal: fill in the blank', 'seen = {}\nfor i, x in enumerate(nums):\n    need = target - x\n    if need in ___:\n        return [seen[need], i]\n    seen[x] = i', ['seen', 'nums', 'x', 'target'], 'seen', 'We check whether the complement is among the numbers we have already seen.', 'Which dict holds earlier numbers?'),
    ],
  }),
];
