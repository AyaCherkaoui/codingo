import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const greedy: Lesson[] = [
  make('Lemonade Change', {
    teach: ['Lemonade costs $5. Customers pay with $5, $10 or $20. Can you always give change?', 'Track counts of $5 and $10 bills. For $10 give one $5. For $20 prefer one $10 + one $5 (greedy), otherwise three $5.'],
    questions: [
      ch('Change for a $20 bill: prefer?', ['$10 + $5', 'Three $5', 'Either equally', 'Refuse'], 0, 'Keep the flexible $5s.', 'Which bill is most flexible for future change?'),
      ch('[5,5,10,10,20] ->', ['false', 'true'], 0, 'The last customer needs $15 but you have only 0 fives left.', 'Simulate: after two 5s and two 10s, count the fives.'),
      ch('Why greedy works?', ['$5 bills are the most useful', 'Random', 'Sorting', 'No reason'], 0, 'Preserve the scarcest, most useful bills.', 'Think about which bills you can spend on small change.'),

      bl('Fill the greedy branch for a $20 bill.', 'five = ten = 0\nfor b in bills:\n    if b == 5: five += 1\n    elif b == 10:\n        if not five: return False\n        five -= 1; ten += 1\n    else:\n        if ten and ___:\n            ten -= 1; five -= 1\n        elif five >= 3: five -= 3\n        else: return False\nreturn True', ['five', 'five >= 3', 'not five', 'ten > 1'], 'five', 'Preferring $10 + $5 still needs one more bill of another kind.', 'What else must you hold alongside the $10?'),
    ],
  }),
  make('Maximum Subarray', {
    teach: ['Largest sum of a contiguous subarray (Kadane\'s algorithm).', 'Keep a running sum. If it drops below 0, reset it to 0 (a negative prefix only hurts). Track the best seen. O(n), O(1).'],
    questions: [
      ch('[-2,1,-3,4,-1,2,1,-5,4] ->', ['6', '5', '7', '4'], 0, '[4,-1,2,1].', 'Add up the best subarray by hand; it is a short slice.'),
      ch('When do you reset the running sum?', ['When it becomes negative', 'Every step', 'Never', 'At the max'], 0, 'Start fresh.', 'Would a negative running total help the next elements?'),
      ch('All numbers negative?', ['Answer is the largest (least negative) number', '0', '-1', 'Empty'], 0, 'Subarray must be non-empty.', 'Subarrays must contain at least one element.'),

      bl('Complete Kadane\'s update.', 'cur = best = nums[0]\nfor x in nums[1:]:\n    cur = ___(x, cur + x)\n    best = max(best, cur)\nreturn best', ['max', 'min', 'sum', 'abs'], 'max', 'Either start fresh at x or extend the previous run; keep the better.', 'You want the larger of starting over or extending.'),
    ],
  }),
  make('Maximum Sum Circular Subarray', {
    teach: ['Maximum subarray sum where the array is circular.', 'Answer = max(normal Kadane max, total - minimum subarray). If all numbers are negative, return the normal max (total - min would be an empty subarray).'],
    questions: [
      ch('A wrapping subarray equals?', ['total - a middle (minimum) subarray', 'Two arrays', 'Sorted array', 'None'], 0, 'Excluding a middle chunk.', 'Wrapping means the unused part is a contiguous chunk in the middle.'),
      ch('All negative numbers?', ['Return the Kadane max', 'Return total', 'Return 0', 'Return min'], 0, 'Avoid the empty subarray.', 'Consider what total - min gives when everything is negative.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Two Kadane passes.', 'Count how many passes over the array you need.'),

      bug('Find the bug in the circular Kadane code.', ['cur_max = cur_min = 0', 'best_max = best_min = nums[0]', 'for x in nums:', '    cur_max = max(cur_max + x, x)', '    cur_min = min(cur_min + x, x)', '    best_max = max(best_max, cur_max)', '    best_min = max(best_min, cur_min)', 'return max(best_max, sum(nums) - best_min) if best_max > 0 else best_max'], 6, 'best_min tracks the smallest subarray sum, so it must use min, not max.', 'Compare the update lines for the max and min trackers.'),
    ],
  }),
  make('Longest Turbulent Subarray', {
    teach: ['A turbulent subarray alternates: up, down, up... Find the longest.', 'Walk through, comparing adjacent pairs. If the comparison sign flips from the last one, extend the length; otherwise restart at 2 (or 1 if equal).'],
    questions: [
      ch('Equal neighbors do what?', ['Break the sequence', 'Extend', 'Are skipped', 'Count twice'], 0, 'A turbulent step needs a strict up or down.', 'Does a strict up or down step occur when two values match?'),
      ch('[9,4,2,10,7,8,8,1,9] ->', ['5', '4', '6', '9'], 0, '[4,2,10,7,8].', 'Compare adjacent differences; trace the longest alternating run.'),
      ch('Technique?', ['Sliding window / running length', 'Binary search', 'Heap', 'Trie'], 0, 'One pass.', 'How many times do you visit each element?'),

      bl('Fill the reset for equal neighbors.', 'res = cur = 1\nfor i in range(1, len(arr)):\n    if arr[i] == arr[i-1]: cur = ___\n    elif i >= 2 and (arr[i]-arr[i-1]) * (arr[i-1]-arr[i-2]) < 0: cur += 1\n    else: cur = 2\n    res = max(res, cur)\nreturn res', ['1', '2', '0', 'cur + 1'], '1', 'An equal pair is not a valid step, so the run is just the current element.', 'How long is a run that contains no valid step?'),
    ],
  }),
  make('Jump Game', {
    teach: ['nums[i] is the max jump length from i. Can you reach the last index?', 'Track the farthest reachable index. For each i: if i > farthest, return false. farthest = max(farthest, i + nums[i]).'],
    questions: [
      ch('[2,3,1,1,4] ->', ['true', 'false'], 0, 'Reach 4 via index 1.', 'Trace the farthest index reachable after each step.'),
      ch('[3,2,1,0,4] ->', ['false', 'true'], 0, 'You get stuck at index 3.', 'Where does the zero trap you in the second array?'),
      ch('When is it false?', ['i > farthest', 'i == 0', 'farthest == n', 'never'], 0, 'You cannot reach index i.', 'What does it mean if the current index is out of reach?'),

      bug('Find the bug in this reachability check.', ['farthest = 0', 'for i, n in enumerate(nums):', '    if i > farthest: return False', '    farthest = max(farthest, n)', 'return True'], 3, 'From index i the reach is i + n, not just n.', 'Reach depends on where you stand as well as the jump length.'),
    ],
  }),
  make('Jump Game II', {
    teach: ['Minimum number of jumps to reach the end (always reachable).', 'BFS in disguise: keep the current range end and the farthest reach. When i hits the end of the current range, make a jump and set end = farthest.'],
    questions: [
      ch('[2,3,1,1,4] ->', ['2', '3', '1', '4'], 0, '0 -> 1 -> 4.', 'Count how many times you must extend the range.'),
      ch('A jump is counted when?', ['i reaches the current range end', 'Every index', 'At farthest', 'Never'], 0, 'You must hop to extend.', 'Think of each jump as one BFS level.'),
      ch('Complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'], 0, 'One pass.', 'Each index is visited once.'),

      ord('Order the greedy Jump Game II code.', ['jumps = end = farthest = 0', 'for i in range(len(nums) - 1):', '    farthest = max(farthest, i + nums[i])', '    if i == end:', '        jumps += 1; end = farthest', 'return jumps'], 'Track the farthest reach; when the current range is exhausted, jump.', true, 'Update farthest before checking whether the range ended.'),
    ],
  }),
  make('Jump Game VII', {
    teach: ['Binary string; from index i you can jump to j if s[j] == "0" and i + minJump <= j <= i + maxJump. Reach the end?', 'BFS or sliding window of reachable positions with a running count (difference array). Track how many reachable indices are in [j - maxJump, j - minJump].'],
    questions: [
      ch('Landing cell must be?', ['"0"', '"1"', 'Either', 'The end only'], 0, 'Only zeros are valid.', 'Which characters can you land on?'),
      ch('Why not check every jump?', ['O(n * maxJump) is too slow', 'Memory', 'Wrong answers', 'No reason'], 0, 'Use a sliding window count.', 'Checking every jump from every index costs a lot.'),
      ch('If the last cell is "1"?', ['false', 'true', 'maybe', 'error'], 0, 'You cannot land there.', 'Look at the last cell first.'),

      bl('Complete the sliding-window count.', 'reach = [False] * n; reach[0] = True; cnt = 0\nfor j in range(1, n):\n    if j >= minJ: cnt += reach[j - minJ]\n    if j > maxJ: cnt -= reach[j - ___ - 1]\n    reach[j] = cnt > 0 and s[j] == "0"\nreturn reach[-1]', ['maxJ', 'minJ', 'j', 'n'], 'maxJ', 'The window drops index j - maxJ - 1 because it is now too far to jump from.', 'Which bound makes a source index fall out of range?'),
    ],
  }),
  make('Gas Station', {
    teach: ['Circular route with gas[i] and cost[i]. Find the starting station to complete a lap (or -1).', 'If total gas < total cost, return -1. Otherwise walk once: if the tank goes negative at i, the start cannot be any station up to i; set start = i + 1 and reset the tank.'],
    questions: [
      ch('Impossible when?', ['sum(gas) < sum(cost)', 'n is odd', 'any cost is 0', 'never'], 0, 'Not enough gas overall.', 'Compare totals before searching for a start.'),
      ch('Tank drops below 0 at station i. Next start?', ['i + 1', 'i', '0', 'i - 1'], 0, 'Everything before also fails.', 'If you run dry at i, can any station before i work?'),
      ch('Complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'One pass.', 'Do you need nested loops?'),

      bug('Find the bug in this one-pass solution.', ['if sum(gas) < sum(cost): return -1', 'start = tank = 0', 'for i in range(len(gas)):', '    tank += gas[i] - cost[i]', '    if tank < 0:', '        start = i', '        tank = 0', 'return start'], 5, 'Station i itself failed, so the next candidate is i + 1.', 'Does the station where you ran dry deserve another try?'),
    ],
  }),
  make('Hand of Straights', {
    teach: ['Can the cards be split into groups of groupSize consecutive values?', 'Count cards. Repeatedly take the smallest remaining value x and require x, x+1, ..., x+groupSize-1 all present; decrement counts. Use a min-heap or sorted keys.'],
    questions: [
      ch('Always start a group from?', ['The smallest remaining card', 'The largest', 'A random card', 'The median'], 0, 'It has no smaller partner to rely on.', 'What must the smallest card pair with?'),
      ch('First check?', ['len(hand) % groupSize == 0', 'sorted', 'unique', 'none'], 0, 'Groups must divide the cards.', 'Divisibility is a quick sanity check.'),
      ch('[1,2,3,6,2,3,4,7,8], size 3 ->', ['true', 'false'], 0, '123, 234, 678.', 'Group the cards by value and consecutive runs.'),

      bl('Complete the count update for a group.', 'cnt = Counter(hand)\nfor x in sorted(cnt):\n    if cnt[x] > 0:\n        need = cnt[x]\n        for y in range(x, x + groupSize):\n            if cnt[y] < need: return False\n            cnt[y] -= ___\nreturn True', ['need', '1', 'groupSize', 'cnt[y]'], 'need', 'All cnt[x] copies of x start groups, so each following value loses that many.', 'How many groups begin at x?'),
    ],
  }),
  make('Dota2 Senate', {
    teach: ['Two parties (R and D) vote in rounds. Each senator can ban an opponent senator. Which party wins?', 'Two queues of indices (R and D). Compare front indices: the smaller index acts first, bans the other, and re-enters the queue at index + n for the next round.'],
    questions: [
      ch('The senator who acts first?', ['Bans the opponent', 'Is banned', 'Skips', 'Wins immediately'], 0, 'Earliest index wins the duel.', 'Who gets to ban first: lower or higher index?'),
      ch('Why index + n?', ['Placed for the next round', 'Sorting', 'Memory', 'No reason'], 0, 'Keeps relative order across rounds.', 'Banned senators vanish, survivors vote again later.'),
      ch('Winner?', ['The party whose queue is non-empty', 'R always', 'D always', 'Larger index'], 0, 'The other has no senators left.', 'What remains once one side is eliminated?'),

      bl('Fill the re-queue index for the winning R senator.', 'while r and d:\n    i, j = r.popleft(), d.popleft()\n    if i < j: r.append(___)\n    else: d.append(j + n)\nreturn "Radiant" if r else "Dire"', ['i + n', 'i', 'i + 1', 'n'], 'i + n', 'The winner goes to the back of the next round while keeping relative order.', 'Match what the else branch does for the other party.'),
    ],
  }),
  make('Merge Triplets to Form Target Triplet', {
    teach: ['Merge triplets by taking the max of each coordinate. Can you form the target?', 'Ignore any triplet with a coordinate greater than the target. From the rest, check that every target coordinate can be matched by some triplet.'],
    questions: [
      ch('A triplet with a coordinate above the target?', ['Unusable', 'Usable', 'Reduce it', 'Ignore the coordinate'], 0, 'Max can never come back down.', 'Max can only grow a coordinate.'),
      ch('Merge operation is?', ['Coordinate-wise max', 'Sum', 'Min', 'Average'], 0, 'By the problem.', 'Which operation is the merge?'),
      ch('Final check?', ['Each target value matched by a valid triplet', 'Sum equals', 'Sorted', 'Unique'], 0, 'Reach all three coordinates.', 'You need all three coordinates to hit exactly their targets.'),

      bug('Find the bug in the triplet filter.', ['good = [False] * 3', 'for t in triplets:', '    if t[0] > target[0] or t[1] > target[1]: continue', '    for k in range(3):', '        if t[k] == target[k]: good[k] = True', 'return all(good)'], 2, 'The filter must also reject triplets whose third coordinate exceeds the target.', 'Does the filter look at every coordinate?'),
    ],
  }),
  make('Partition Labels', {
    teach: ['Partition the string into as many parts as possible so each letter appears in at most one part.', 'Record the last index of each letter. Sweep: keep the farthest last index end of letters seen. When i == end, cut a part.'],
    questions: [
      ch('"ababcbacadefegdehijhklij" first part size?', ['9', '8', '7', '10'], 0, '"ababcbaca".', 'Count the span of the first letter and everything inside it.'),
      ch('When do you cut?', ['i equals the farthest last index so far', 'Every 3 chars', 'At a vowel', 'At a repeat'], 0, 'All letters inside are closed.', 'A cut is safe once no letter inside continues later.'),
      ch('Precompute?', ['Last occurrence of each letter', 'First occurrence', 'Counts', 'Sorted letters'], 0, 'To know where a letter ends.', 'What do you need to know about each letter in advance?'),

      ord('Order the Partition Labels solution.', ['last = {c: i for i, c in enumerate(s)}', 'start = end = 0; res = []', 'for i, c in enumerate(s):', '    end = max(end, last[c])', '    if i == end:', '        res.append(end - start + 1); start = i + 1', 'return res'], 'Precompute last indices, extend end greedily, cut when i reaches end.', true, 'Build the lookup before the sweep.'),
    ],
  }),
  make('Valid Parenthesis String', {
    teach: ['String of "(", ")" and "*" (which can be "(", ")" or empty). Is it valid?', 'Track a range [lo, hi] of possible open counts. "(" -> both +1. ")" -> both -1. "*" -> lo - 1, hi + 1. Clamp lo at 0; if hi < 0 return false. Valid if lo == 0 at the end.'],
    questions: [
      ch('"(*)" ->', ['true', 'false'], 0, '* can be empty.', 'A star can be empty.'),
      ch('The range [lo, hi] tracks?', ['Possible open parenthesis counts', 'Index', 'Stars', 'Length'], 0, 'Every option for the stars.', 'Keep every possible count of unmatched openers.'),
      ch('When return false early?', ['hi < 0', 'lo > 0', 'hi == 0', 'never'], 0, 'Too many closers even with best choices.', 'When is the situation unrecoverable?'),

      bug('Find the bug in the range tracker.', ['lo = hi = 0', 'for c in s:', '    if c == "(": lo += 1; hi += 1', '    elif c == ")": lo -= 1; hi -= 1', '    else: lo -= 1; hi += 1', '    if lo < 0: return False', '    lo = max(lo, 0)', 'return lo == 0'], 5, 'lo may dip below 0 because a star can be empty; only hi < 0 is fatal. Clamp lo instead.', 'Which bound represents the best case for closing?'),
    ],
  }),
  make('Candy', {
    teach: ['Each child needs at least 1 candy; a child with a higher rating than a neighbor needs more than that neighbor. Minimize candies.', 'Two passes: left to right (if rating > left, candy = left + 1), then right to left (if rating > right, candy = max(candy, right + 1)). Sum.'],
    questions: [
      ch('[1,0,2] ->', ['5', '4', '3', '6'], 0, '2 + 1 + 2.', 'Check neighbors one side at a time.'),
      ch('Why two passes?', ['Handle both neighbors', 'Speed', 'Memory', 'No reason'], 0, 'Left rule then right rule.', 'A single pass cannot satisfy both neighbors.'),
      ch('Second pass uses?', ['max with the existing value', 'Overwrite', 'min', 'Sum'], 0, 'Satisfy both constraints.', 'Combining the two passes needs care.'),

      ord('Order the two-pass Candy solution.', ['candy = [1] * n', 'for i in range(1, n):', '    if r[i] > r[i-1]: candy[i] = candy[i-1] + 1', 'for i in range(n - 2, -1, -1):', '    if r[i] > r[i+1]: candy[i] = max(candy[i], candy[i+1] + 1)', 'return sum(candy)'], 'Initialize, enforce the left rule, enforce the right rule, then sum.', true, 'Both neighbor rules must run before summing.'),
    ],
  }),
];
