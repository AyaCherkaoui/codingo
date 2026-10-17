import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const heap: Lesson[] = [
  make('Kth Largest Element In a Stream', {
    teach: ['Keep the kth largest as numbers arrive.', 'Maintain a MIN-heap of size k. The top is the kth largest. On add: push; if size > k pop the smallest.'],
    questions: [
      ch('Which heap?', ['Min-heap of size k', 'Max-heap of size n', 'Sorted list', 'Stack'], 0, 'The smallest of the top k is the kth largest.', 'The smallest of the top k elements is special.'),
      ch('The answer sits at?', ['The heap top', 'The heap bottom', 'Index k', 'Last pushed'], 0, 'heap[0].', 'Where is the extreme value of a heap?'),
      ch('add() cost?', ['O(log k)', 'O(n)', 'O(1)', 'O(n log n)'], 0, 'One push and maybe one pop.', 'A push or pop on a size-k heap.'),
      bl('Fill in the eviction', 'def add(self, val):\n    heapq.heappush(self.h, val)\n    if len(self.h) > self.k:\n        ___\n    return self.h[0]', ['heapq.heappop(self.h)', 'self.h.pop()', 'self.h.pop(0)', 'heapq.heappush(self.h, val)'], 'heapq.heappop(self.h)', 'Pop the smallest so only the k largest remain.', 'Remove the smallest while keeping the heap valid.'),
    ],
  }),
  make('Last Stone Weight', {
    teach: ['Smash the two heaviest stones repeatedly. If unequal, the difference remains.', 'Use a max-heap (Python: push negatives). Pop two, push their difference if non-zero. Return the last stone or 0.'],
    questions: [
      ch('[2,7,4,1,8,1] ->', ['1', '0', '2', '4'], 0, 'Ends with a single stone of weight 1.', 'Smash 8 and 7 first, then continue.'),
      ch('Python max-heap trick?', ['Store negative values', 'heap.reverse()', 'Sort descending', 'Use a stack'], 0, 'heapq is a min-heap.', 'heapq only supports one kind of heap.'),
      ch('Time complexity?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], 0, 'n heap operations.', 'n pops/pushes, each logarithmic.'),
      bug('Find the bug', ['h = [-s for s in stones]', 'heapq.heapify(h)', 'while len(h) > 1:', '    a = heapq.heappop(h)', '    b = heapq.heappop(h)', '    if a != b:', '        heapq.heappush(h, b - a)', 'return -h[0] if h else 0'], 6, 'Values are negated, so a <= b and the negated difference is a - b. b - a pushes a positive value.', 'Remember the values are stored negative.'),
    ],
  }),
  make('K Closest Points to Origin', {
    teach: ['Return the k points closest to (0, 0).', 'Distance can be compared with x² + y² (no sqrt). Keep a MAX-heap of size k (negate distances); pop when it grows beyond k. Or quickselect for O(n) average.'],
    questions: [
      ch('Do you need the square root?', ['No, compare x² + y²', 'Yes', 'Sometimes', 'Only for ties'], 0, 'Order is preserved.', 'Does squaring change the ordering?'),
      ch('Why a max-heap of size k?', ['The farthest of the k sits on top for eviction', 'Speed only', 'Sorting', 'No reason'], 0, 'Remove the worst candidate.', 'Which candidate do you want to evict?'),
      ch('Time with the heap?', ['O(n log k)', 'O(n²)', 'O(k)', 'O(log n)'], 0, 'n pushes of cost log k.', 'n pushes into a heap bounded by k.'),
      ch('points [[1,3],[-2,2]], k = 1 ->', ['[[-2,2]]', '[[1,3]]', '[]', 'both points'], 0, 'Squared distances are 10 and 8, so [-2,2] is closer.', 'Compute x² + y² for each point.'),
    ],
  }),
  make('Kth Largest Element In An Array', {
    teach: ['Find the kth largest element in an unsorted array.', 'Min-heap of size k: O(n log k). Or Quickselect: partition around a pivot, recurse into the side containing the kth position, O(n) average.'],
    questions: [
      ch('[3,2,1,5,6,4], k = 2 ->', ['5', '6', '4', '3'], 0, 'Sorted desc: 6, 5, ...', 'Sort descending and index.'),
      ch('Quickselect average time?', ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], 0, 'Only one side is processed.', 'Partition like quicksort but recurse into one side.'),
      ch('Heap size used?', ['k', 'n', '1', 'n/2'], 0, 'Keep only the top k.', 'Keep only the best k seen.'),
      bl('Fill in the quickselect target', 'target = ___  # index in sorted ascending order\nlo, hi = 0, len(nums) - 1', ['len(nums) - k', 'k', 'k - 1', 'len(nums) - k - 1'], 'len(nums) - k', 'The kth largest is at index n - k in ascending order.', 'The largest is at index n - 1.'),
    ],
  }),
  make('Task Scheduler', {
    teach: ['Run tasks with a cooldown n between identical tasks; find the least time (idle slots allowed).', 'Math: let maxFreq be the highest count and numMax how many tasks have it. Answer = max(len(tasks), (maxFreq - 1) * (n + 1) + numMax). A max-heap simulation also works.'],
    questions: [
      ch('["A","A","A","B","B","B"], n = 2 ->', ['8', '6', '7', '9'], 0, 'A B idle A B idle A B.', 'Lay out frames of size n+1 around A.'),
      ch('The answer is at least?', ['len(tasks)', 'n', 'maxFreq', '0'], 0, 'Every task needs a slot.', 'Every task must run at some time.'),
      ch('The idle time is driven by?', ['The most frequent task', 'The rarest task', 'Alphabet', 'Random'], 0, 'It sets the frame.', 'Which task creates the most waiting?'),
      ch('["A","A","A","B","B","C"], n = 2 ->', ['7', '6', '8', '9'], 0, 'maxFreq 3, numMax 1: (3-1)*3+1 = 7 vs len 6, so 7.', 'Plug into the formula and compare with len(tasks).'),
    ],
  }),
  make('Design Twitter', {
    teach: ['Design Twitter: postTweet, follow, unfollow, getNewsFeed (10 most recent from you and followees).', 'Store tweets per user with a global timestamp counter. For the feed, merge the recent tweets of all followees using a max-heap by time (like Merge K Sorted Lists) and take 10.'],
    questions: [
      ch('Which pattern builds the feed?', ['Merge k sorted lists with a heap', 'Binary search', 'Sliding window', 'Union find'], 0, 'Each user\'s tweets are time-ordered.', 'Think of merging several sorted lists.'),
      ch('Why a global counter?', ['Order tweets across users', 'IDs', 'Speed', 'No reason'], 0, 'A timestamp for comparison.', 'How do you compare tweets across users?'),
      ch('Followees stored as?', ['A set per user', 'A list', 'A heap', 'A string'], 0, 'Fast follow/unfollow.', 'Follow and unfollow need fast add/remove.'),
      ch('How should the heap start for getNewsFeed?', ['Each followee\'s latest tweet; push the next older one after each pop', 'Every tweet from everyone', 'Only your own tweets', 'Sorted by user id'], 0, 'Like merging k sorted lists: only the heads are needed at first.', 'Do you need all tweets in the heap at once?'),
    ],
  }),
  make('Single Threaded CPU', {
    teach: ['Tasks have (enqueueTime, processingTime). The CPU picks the available task with the shortest processing time (ties: lowest index). Return the order.', 'Sort tasks by enqueue time. Keep a min-heap by (processingTime, index) of available tasks. If idle, jump time to the next enqueue time.'],
    questions: [
      ch('Heap key?', ['(processingTime, index)', '(enqueueTime)', 'index only', 'name'], 0, 'Shortest first, tie-break by index.', 'Shortest job first, with a tie-break.'),
      ch('When no task is available?', ['Jump to the next enqueue time', 'Stop', 'Wait 1 unit', 'Crash'], 0, 'Skip idle time.', 'What should the clock do when nothing is ready?'),
      ch('Time complexity?', ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], 0, 'Sorting plus heap ops.', 'Sort once, then heap operations.'),
      ord('Order the main loop', ['Sort tasks by enqueue time', 'If the heap is empty, jump time to the next enqueue time', 'Push every task with enqueue <= time', 'Pop the best task and advance time by its duration'], 'Sort once, then repeat: fix idle gaps, add ready tasks, run the shortest.', false, 'You cannot push tasks before the clock is right.'),
    ],
  }),
  make('Reorganize String', {
    teach: ['Rearrange a string so no two adjacent characters are the same.', 'Count letters. If any count > (n + 1) / 2, impossible. Otherwise repeatedly take the two most frequent letters from a max-heap, append both, decrement and push back.'],
    questions: [
      ch('When is it impossible?', ['maxCount > (n + 1) // 2', 'n is even', 'There are 3 letters', 'Never'], 0, 'One letter dominates.', 'Compare the largest count to half the length.'),
      ch('Greedy choice?', ['Place the most frequent letters first, alternating', 'Alphabetical', 'Rarest first', 'Random'], 0, 'Spread the biggest group out.', 'Spread the biggest groups apart.'),
      ch('"aab" ->', ['"aba"', '"aab"', '"baa"', '""'], 0, 'a b a.', 'Try alternating the two letters.'),
      ch('"aaab" ->', ['""', '"abaa"', '"aaba"', '"baaa"'], 0, 'a appears 3 times, more than (4 + 1) // 2 = 2, so it is impossible.', 'Compare the highest count to (n + 1) // 2.'),
    ],
  }),
  make('Longest Happy String', {
    teach: ['Build the longest string using at most a "a", b "b", c "c" with no "aaa", "bbb" or "ccc".', 'Max-heap by count. Take the most frequent letter unless it would make three in a row; then take the second most frequent. Stop when you cannot.'],
    questions: [
      ch('Greedy pick?', ['Most remaining letter, unless it makes 3 in a row', 'Always a', 'Least remaining', 'Random'], 0, 'Spend the biggest pile carefully.', 'Biggest pile first, but watch the run length.'),
      ch('Forbidden pattern?', ['Three identical letters in a row', 'Two identical', 'Any repeat', 'Palindromes'], 0, '"aaa", "bbb", "ccc".', 'Which runs are banned?'),
      ch('Data structure?', ['Max-heap of (count, letter)', 'Stack', 'Queue', 'Trie'], 0, 'Always know the biggest pile.', 'You always need the largest remaining count.'),
      ch('a = 1, b = 1, c = 7 gives a result of length?', ['8', '9', '7', '10'], 0, '"ccaccbcc" uses 6 c, 1 a, 1 b; the last c would make three in a row.', 'Only a and b can break up the runs of c.'),
    ],
  }),
  make('Car Pooling', {
    teach: ['A car with fixed capacity drives east. Trips: (passengers, from, to). Can it serve all trips without exceeding capacity?', 'Difference array / sweep line: +passengers at from, -passengers at to. Walk positions in order, keep a running sum, and check it never exceeds capacity.'],
    questions: [
      ch('At position `to` the passengers do?', ['Get off (subtract)', 'Board (add)', 'Stay', 'Double'], 0, 'They leave there.', 'What happens when a trip ends?'),
      ch('The check is?', ['running load <= capacity at every point', 'sum of all trips <= capacity', 'trips <= 2', 'none'], 0, 'Peak load matters.', 'What must hold at every position?'),
      ch('Alternative with a heap?', ['Min-heap of drop-off points', 'Max-heap of capacity', 'Stack', 'Queue'], 0, 'Release passengers whose trip ended.', 'Which trips are over by the next pickup?'),
      ch('trips [[2,1,5],[3,3,7]], capacity = 4 ->', ['False', 'True', 'Depends', 'Error'], 0, 'Between positions 3 and 5 both trips are on board: load 5 > 4.', 'Find the position where trips overlap and add loads.'),
    ],
  }),
  make('Find Median From Data Stream', {
    teach: ['Add numbers one by one and get the median at any time.', 'Two heaps: a max-heap for the smaller half and a min-heap for the larger half. Keep sizes equal (or the max-heap one bigger). Median = top of max-heap, or the average of both tops.'],
    questions: [
      ch('Heaps used?', ['Max-heap (low half) + min-heap (high half)', 'Two max-heaps', 'One min-heap', 'Stack'], 0, 'Tops are the middle values.', 'Split the data into a lower and upper half.'),
      ch('Even count median?', ['Average of both tops', 'Left top', 'Right top', 'Sum'], 0, 'Two middle values.', 'Two middle values when the count is even.'),
      ch('addNum cost?', ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], 0, 'A couple of heap operations.', 'Each insert touches a few heaps.'),
      bl('Fill in the rebalance', 'heapq.heappush(self.lo, -num)\nheapq.heappush(self.hi, -heapq.heappop(self.lo))\nif len(self.hi) > len(self.lo):\n    heapq.heappush(self.lo, ___)', ['-heapq.heappop(self.hi)', 'heapq.heappop(self.hi)', '-num', 'num'], '-heapq.heappop(self.hi)', 'Move the smallest of the upper half into the lower (max) heap, negated.', 'lo stores negated values.'),
    ],
  }),
  make('IPO', {
    teach: ['Pick up to k projects to maximize capital. Each needs minimum capital to start and gives a profit.', 'Sort projects by required capital. For each of k rounds, push the profits of all projects you can afford into a max-heap and take the biggest profit; add it to your capital.'],
    questions: [
      ch('Each round you choose?', ['The most profitable affordable project', 'The cheapest', 'The first', 'Random'], 0, 'Greedy.', 'Greedy on profit, constrained by capital.'),
      ch('Why a max-heap of profits?', ['Quickly get the best affordable profit', 'Sorting names', 'Memory', 'No reason'], 0, 'Top of the heap.', 'Which structure gives the max quickly?'),
      ch('If nothing is affordable?', ['Stop early', 'Take any', 'Add capital', 'Crash'], 0, 'No progress is possible.', 'What if capital never increases?'),
      ch('k = 2, w = 0, profits [1,2,3], capital [0,1,1] ->', ['4', '3', '6', '1'], 0, 'Round 1: only project 0 (+1, w=1). Round 2: pick profit 3, w = 4.', 'Capital grows after each round.'),
    ],
  }),
];
