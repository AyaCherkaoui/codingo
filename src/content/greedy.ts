import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const greedy: Lesson[] = [
  make('Lemonade Change', {
    teach: ['Lemonade costs $5. Customers pay with $5, $10 or $20. Can you always give change?', 'Track counts of $5 and $10 bills. For $10 give one $5. For $20 prefer one $10 + one $5 (greedy), otherwise three $5.'],
    questions: [
      ch('Change for a $20 bill: prefer?', ['$10 + $5', 'Three $5', 'Either equally', 'Refuse'], 0, 'Keep the flexible $5s.'),
      ch('[5,5,10,10,20] ->', ['false', 'true'], 0, 'The last customer needs $15 but you have only 0 fives left.'),
      ch('Why greedy works?', ['$5 bills are the most useful', 'Random', 'Sorting', 'No reason'], 0, 'Preserve the scarcest, most useful bills.'),
    ],
  }),
  make('Maximum Subarray', {
    teach: ['Largest sum of a contiguous subarray (Kadane\'s algorithm).', 'Keep a running sum. If it drops below 0, reset it to 0 (a negative prefix only hurts). Track the best seen. O(n), O(1).'],
    questions: [
      ch('[-2,1,-3,4,-1,2,1,-5,4] ->', ['6', '5', '7', '4'], 0, '[4,-1,2,1].'),
      ch('When do you reset the running sum?', ['When it becomes negative', 'Every step', 'Never', 'At the max'], 0, 'Start fresh.'),
      ch('All numbers negative?', ['Answer is the largest (least negative) number', '0', '-1', 'Empty'], 0, 'Subarray must be non-empty.'),
    ],
  }),
  make('Maximum Sum Circular Subarray', {
    teach: ['Maximum subarray sum where the array is circular.', 'Answer = max(normal Kadane max, total - minimum subarray). If all numbers are negative, return the normal max (total - min would be an empty subarray).'],
    questions: [
      ch('A wrapping subarray equals?', ['total - a middle (minimum) subarray', 'Two arrays', 'Sorted array', 'None'], 0, 'Excluding a middle chunk.'),
      ch('All negative numbers?', ['Return the Kadane max', 'Return total', 'Return 0', 'Return min'], 0, 'Avoid the empty subarray.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Two Kadane passes.'),
    ],
  }),
  make('Longest Turbulent Subarray', {
    teach: ['A turbulent subarray alternates: up, down, up... Find the longest.', 'Walk through, comparing adjacent pairs. If the comparison sign flips from the last one, extend the length; otherwise restart at 2 (or 1 if equal).'],
    questions: [
      ch('Equal neighbors do what?', ['Break the sequence', 'Extend', 'Are skipped', 'Count twice'], 0, 'A turbulent step needs a strict up or down.'),
      ch('[9,4,2,10,7,8,8,1,9] ->', ['5', '4', '6', '9'], 0, '[4,2,10,7,8].'),
      ch('Technique?', ['Sliding window / running length', 'Binary search', 'Heap', 'Trie'], 0, 'One pass.'),
    ],
  }),
  make('Jump Game', {
    teach: ['nums[i] is the max jump length from i. Can you reach the last index?', 'Track the farthest reachable index. For each i: if i > farthest, return false. farthest = max(farthest, i + nums[i]).'],
    questions: [
      ch('[2,3,1,1,4] ->', ['true', 'false'], 0, 'Reach 4 via index 1.'),
      ch('[3,2,1,0,4] ->', ['false', 'true'], 0, 'You get stuck at index 3.'),
      ch('When is it false?', ['i > farthest', 'i == 0', 'farthest == n', 'never'], 0, 'You cannot reach index i.'),
    ],
  }),
  make('Jump Game II', {
    teach: ['Minimum number of jumps to reach the end (always reachable).', 'BFS in disguise: keep the current range end and the farthest reach. When i hits the end of the current range, make a jump and set end = farthest.'],
    questions: [
      ch('[2,3,1,1,4] ->', ['2', '3', '1', '4'], 0, '0 -> 1 -> 4.'),
      ch('A jump is counted when?', ['i reaches the current range end', 'Every index', 'At farthest', 'Never'], 0, 'You must hop to extend.'),
      ch('Complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'], 0, 'One pass.'),
    ],
  }),
  make('Jump Game VII', {
    teach: ['Binary string; from index i you can jump to j if s[j] == "0" and i + minJump <= j <= i + maxJump. Reach the end?', 'BFS or sliding window of reachable positions with a running count (difference array). Track how many reachable indices are in [j - maxJump, j - minJump].'],
    questions: [
      ch('Landing cell must be?', ['"0"', '"1"', 'Either', 'The end only'], 0, 'Only zeros are valid.'),
      ch('Why not check every jump?', ['O(n * maxJump) is too slow', 'Memory', 'Wrong answers', 'No reason'], 0, 'Use a sliding window count.'),
      ch('If the last cell is "1"?', ['false', 'true', 'maybe', 'error'], 0, 'You cannot land there.'),
    ],
  }),
  make('Gas Station', {
    teach: ['Circular route with gas[i] and cost[i]. Find the starting station to complete a lap (or -1).', 'If total gas < total cost, return -1. Otherwise walk once: if the tank goes negative at i, the start cannot be any station up to i; set start = i + 1 and reset the tank.'],
    questions: [
      ch('Impossible when?', ['sum(gas) < sum(cost)', 'n is odd', 'any cost is 0', 'never'], 0, 'Not enough gas overall.'),
      ch('Tank drops below 0 at station i. Next start?', ['i + 1', 'i', '0', 'i - 1'], 0, 'Everything before also fails.'),
      ch('Complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'One pass.'),
    ],
  }),
  make('Hand of Straights', {
    teach: ['Can the cards be split into groups of groupSize consecutive values?', 'Count cards. Repeatedly take the smallest remaining value x and require x, x+1, ..., x+groupSize-1 all present; decrement counts. Use a min-heap or sorted keys.'],
    questions: [
      ch('Always start a group from?', ['The smallest remaining card', 'The largest', 'A random card', 'The median'], 0, 'It has no smaller partner to rely on.'),
      ch('First check?', ['len(hand) % groupSize == 0', 'sorted', 'unique', 'none'], 0, 'Groups must divide the cards.'),
      ch('[1,2,3,6,2,3,4,7,8], size 3 ->', ['true', 'false'], 0, '123, 234, 678.'),
    ],
  }),
  make('Dota2 Senate', {
    teach: ['Two parties (R and D) vote in rounds. Each senator can ban an opponent senator. Which party wins?', 'Two queues of indices (R and D). Compare front indices: the smaller index acts first, bans the other, and re-enters the queue at index + n for the next round.'],
    questions: [
      ch('The senator who acts first?', ['Bans the opponent', 'Is banned', 'Skips', 'Wins immediately'], 0, 'Earliest index wins the duel.'),
      ch('Why index + n?', ['Placed for the next round', 'Sorting', 'Memory', 'No reason'], 0, 'Keeps relative order across rounds.'),
      ch('Winner?', ['The party whose queue is non-empty', 'R always', 'D always', 'Larger index'], 0, 'The other has no senators left.'),
    ],
  }),
  make('Merge Triplets to Form Target Triplet', {
    teach: ['Merge triplets by taking the max of each coordinate. Can you form the target?', 'Ignore any triplet with a coordinate greater than the target. From the rest, check that every target coordinate can be matched by some triplet.'],
    questions: [
      ch('A triplet with a coordinate above the target?', ['Unusable', 'Usable', 'Reduce it', 'Ignore the coordinate'], 0, 'Max can never come back down.'),
      ch('Merge operation is?', ['Coordinate-wise max', 'Sum', 'Min', 'Average'], 0, 'By the problem.'),
      ch('Final check?', ['Each target value matched by a valid triplet', 'Sum equals', 'Sorted', 'Unique'], 0, 'Reach all three coordinates.'),
    ],
  }),
  make('Partition Labels', {
    teach: ['Partition the string into as many parts as possible so each letter appears in at most one part.', 'Record the last index of each letter. Sweep: keep the farthest last index end of letters seen. When i == end, cut a part.'],
    questions: [
      ch('"ababcbacadefegdehijhklij" first part size?', ['9', '8', '7', '10'], 0, '"ababcbaca".'),
      ch('When do you cut?', ['i equals the farthest last index so far', 'Every 3 chars', 'At a vowel', 'At a repeat'], 0, 'All letters inside are closed.'),
      ch('Precompute?', ['Last occurrence of each letter', 'First occurrence', 'Counts', 'Sorted letters'], 0, 'To know where a letter ends.'),
    ],
  }),
  make('Valid Parenthesis String', {
    teach: ['String of "(", ")" and "*" (which can be "(", ")" or empty). Is it valid?', 'Track a range [lo, hi] of possible open counts. "(" -> both +1. ")" -> both -1. "*" -> lo - 1, hi + 1. Clamp lo at 0; if hi < 0 return false. Valid if lo == 0 at the end.'],
    questions: [
      ch('"(*)" ->', ['true', 'false'], 0, '* can be empty.'),
      ch('The range [lo, hi] tracks?', ['Possible open parenthesis counts', 'Index', 'Stars', 'Length'], 0, 'Every option for the stars.'),
      ch('When return false early?', ['hi < 0', 'lo > 0', 'hi == 0', 'never'], 0, 'Too many closers even with best choices.'),
    ],
  }),
  make('Candy', {
    teach: ['Each child needs at least 1 candy; a child with a higher rating than a neighbor needs more than that neighbor. Minimize candies.', 'Two passes: left to right (if rating > left, candy = left + 1), then right to left (if rating > right, candy = max(candy, right + 1)). Sum.'],
    questions: [
      ch('[1,0,2] ->', ['5', '4', '3', '6'], 0, '2 + 1 + 2.'),
      ch('Why two passes?', ['Handle both neighbors', 'Speed', 'Memory', 'No reason'], 0, 'Left rule then right rule.'),
      ch('Second pass uses?', ['max with the existing value', 'Overwrite', 'min', 'Sum'], 0, 'Satisfy both constraints.'),
    ],
  }),
];
