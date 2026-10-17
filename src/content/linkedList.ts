import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const linkedList: Lesson[] = [
  make('Reverse Linked List', {
    teach: ['Reverse Linked List: flip every pointer so the list runs backwards.', 'Walk with prev = None and cur = head. Save cur.next, point cur.next to prev, then move both forward. Return prev. O(n) time, O(1) space.'],
    questions: [
      ch('1 -> 2 -> 3 becomes?', ['3 -> 2 -> 1', '1 -> 3 -> 2', '2 -> 1 -> 3', '3 -> 1 -> 2'], 0, 'Fully reversed.'),
      ord('Order the loop body', ['nxt = cur.next', 'cur.next = prev', 'prev = cur', 'cur = nxt'], 'Save next before you overwrite it.', true),
      ch('What do you return?', ['prev', 'cur', 'head', 'nxt'], 0, 'cur is None at the end; prev is the new head.'),
    ],
  }),
  make('Merge Two Sorted Lists', {
    teach: ['Merge two sorted linked lists into one sorted list.', 'Use a dummy node and a tail pointer. Repeatedly attach the smaller head, advance that list. At the end attach whichever list still has nodes.'],
    questions: [
      ch('Why use a dummy node?', ['Avoids special-casing the first node', 'Faster', 'Needed by Python', 'Stores the length'], 0, 'Return dummy.next at the end.'),
      ch('1->2->4 and 1->3->4 merged?', ['1->1->2->3->4->4', '1->2->4->1->3->4', '1->1->2->4->3->4', '1->2->3->4'], 0, 'Always pick the smaller head.'),
      ch('Time complexity?', ['O(n + m)', 'O(n * m)', 'O(log n)', 'O(1)'], 0, 'Each node is visited once.'),
    ],
  }),
  make('Linked List Cycle', {
    teach: ['Does a linked list contain a cycle?', 'Floyd\'s tortoise and hare: slow moves 1 step, fast moves 2. If there is a cycle they must meet; if fast reaches the end there is none. O(n) time, O(1) space.'],
    questions: [
      ch('How fast does the fast pointer move?', ['2 steps', '1 step', '3 steps', 'Random'], 0, 'Slow 1, fast 2.'),
      ch('Fast reaches None. Result?', ['No cycle', 'Cycle', 'Error', 'Unknown'], 0, 'A cycle never ends.'),
      ch('Alternative with extra memory?', ['Hash set of visited nodes', 'Sorting', 'Binary search', 'Stack'], 0, 'O(n) space.'),
    ],
  }),
  make('Reorder List', {
    teach: ['Reorder L0->L1->...->Ln into L0->Ln->L1->Ln-1->...', 'Three steps: find the middle with slow/fast, reverse the second half, then merge the two halves alternately.'],
    questions: [
      ch('1->2->3->4 becomes?', ['1->4->2->3', '1->2->4->3', '4->1->3->2', '1->3->2->4'], 0, 'First, last, second, second-last.'),
      ord('Order the steps', ['Find the middle', 'Reverse the second half', 'Merge the halves alternately'], 'Middle, reverse, weave.'),
      ch('How do you find the middle?', ['slow and fast pointers', 'Count then loop', 'Binary search', 'Recursion only'], 0, 'When fast ends, slow is in the middle.'),
    ],
  }),
  make('Remove Nth Node From End of List', {
    teach: ['Remove the nth node from the end in one pass.', 'Use a dummy node. Move fast n steps ahead, then move slow and fast together. When fast reaches the end, slow is just before the node to delete.'],
    questions: [
      ch('Why start from a dummy node?', ['Removing the head works the same', 'Speed', 'Memory', 'No reason'], 0, 'Handles n = length.'),
      ch('The gap between fast and slow is?', ['n nodes', '1 node', '0 nodes', 'length'], 0, 'Fast starts n ahead.'),
      bl('Fill in the blank', 'slow.next = slow.___', ['next.next', 'next', 'prev'], 'next.next', 'Skip over the node.'),
    ],
  }),
  make('Copy List With Random Pointer', {
    teach: ['Deep-copy a list where each node also has a random pointer.', 'Two passes with a hash map old -> new. Pass 1: create a copy of every node. Pass 2: set copy.next and copy.random using the map.'],
    questions: [
      ch('The hash map maps:', ['old node -> new node', 'value -> node', 'index -> value', 'node -> random'], 0, 'Lets us wire random pointers.'),
      ch('Why can\'t we do it in one pass easily?', ['Random may point ahead to a node not created yet', 'Speed', 'Python limits', 'We can'], 0, 'Create all nodes first.'),
      ch('Time and space?', ['O(n) and O(n)', 'O(n) and O(1)', 'O(n²) and O(1)', 'O(1) and O(1)'], 0, 'Map of n nodes.'),
    ],
  }),
  make('Add Two Numbers', {
    teach: ['Add two numbers stored as reversed digit lists.', 'Walk both lists with a carry. digit = (a + b + carry) % 10, carry = (a + b + carry) // 10. Continue while either list or carry remains.'],
    questions: [
      ch('[2,4,3] + [5,6,4] ->', ['[7,0,8]', '[8,0,7]', '[7,8,0]', '[0,7,8]'], 0, '342 + 465 = 807.'),
      bl('Fill in the blank', 'carry = total ___ 10', ['//', '%', '*'], '//', 'Integer division gives the carry.'),
      ch('When do you stop?', ['Both lists done and no carry', 'First list done', 'Never', 'After 1 digit'], 0, 'A leftover carry adds a new digit.'),
    ],
  }),
  make('Find The Duplicate Number', {
    teach: ['Array of n+1 numbers in 1..n has one repeated value. Find it without changing the array and with O(1) space.', 'Treat nums[i] as a pointer i -> nums[i]. The duplicate creates a cycle. Use Floyd\'s algorithm: find where slow and fast meet, then restart one pointer at the start; they meet at the cycle entry = the duplicate.'],
    questions: [
      ch('Why is there a cycle?', ['Two indexes point to the same value', 'Array is sorted', 'Numbers are negative', 'There is none'], 0, 'Two arrows enter one node.'),
      ch('Space used?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only two pointers.'),
      ch('[1,3,4,2,2] ->', ['1', '2', '3', '4'], 1, '2 appears twice.'),
    ],
  }),
  make('Reverse Linked List II', {
    teach: ['Reverse only the nodes from position left to right.', 'Walk to the node before left. Then repeatedly move the next node to the front of the reversed section (left - right times). Dummy node helps when left = 1.'],
    questions: [
      ch('1->2->3->4->5, left=2, right=4 ->', ['1->4->3->2->5', '1->2->4->3->5', '5->4->3->2->1', '1->3->2->4->5'], 0, 'Only the middle part flips.'),
      ch('Why a dummy node?', ['left may be 1', 'Speed', 'Memory', 'Recursion'], 0, 'The head may change.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(1)', 'O(right²)'], 0, 'One pass.'),
    ],
  }),
  make('Design Circular Queue', {
    teach: ['Design Circular Queue: fixed capacity queue that reuses freed space.', 'Use an array with head index and size. enQueue writes at (head + size) % k. deQueue moves head = (head + 1) % k. Full when size == k, empty when size == 0.'],
    questions: [
      ch('Where does enQueue write?', ['(head + size) % k', 'head', 'size', 'k - 1'], 0, 'The slot after the last item, wrapping around.'),
      ch('How do you detect full?', ['size == k', 'head == 0', 'tail == k', 'size == 0'], 0, 'Track size explicitly.'),
      ch('Why modulo?', ['Wrap around the array', 'Speed', 'Sorting', 'Hashing'], 0, 'Indexes loop back to 0.'),
    ],
  }),
  make('LRU Cache', {
    teach: ['LRU Cache: get and put in O(1); evict the least recently used when full.', 'Combine a hash map (key -> node) with a doubly linked list ordered by recency. On get/put move the node to the most-recent end. Evict from the least-recent end.'],
    questions: [
      ch('Why a doubly linked list?', ['O(1) removal of any node', 'Sorting', 'Hashing', 'Less memory'], 0, 'We need prev pointers to unlink.'),
      ch('Why also a hash map?', ['O(1) lookup by key', 'Ordering', 'Eviction', 'Sorting'], 0, 'Find the node instantly.'),
      ch('On get(key) for an existing key you:', ['Move it to most recent', 'Delete it', 'Do nothing', 'Move it to least recent'], 0, 'Using it makes it fresh.'),
    ],
  }),
  make('LFU Cache', {
    teach: ['LFU Cache: evict the least FREQUENTLY used key (ties: least recently used).', 'Keep key -> (value, freq), and for each frequency an ordered set of keys. Track min_freq. On access move the key from freq f to f + 1, updating min_freq.'],
    questions: [
      ch('Which key is evicted?', ['Lowest frequency, oldest on ties', 'Newest', 'Highest frequency', 'Random'], 0, 'Frequency first, recency second.'),
      ch('What do you track to evict in O(1)?', ['min_freq', 'max_freq', 'size', 'head'], 0, 'Points at the eviction bucket.'),
      ch('After a get, the key\'s frequency?', ['Increases by 1', 'Resets', 'Stays', 'Doubles'], 0, 'It moves to the next bucket.'),
    ],
  }),
  make('Merge K Sorted Lists', {
    teach: ['Merge k sorted lists into one.', 'Min-heap approach: push every list head, pop the smallest, push that node\'s next. O(N log k). Or divide and conquer: merge lists in pairs until one remains.'],
    questions: [
      ch('Heap size at most?', ['k', 'N', '1', 'k²'], 0, 'One node per list.'),
      ch('Time with a heap?', ['O(N log k)', 'O(N k)', 'O(N²)', 'O(k log N)'], 0, 'N pops, each log k.'),
      ch('Alternative approach?', ['Merge pairs repeatedly', 'Binary search', 'Two pointers', 'Stack'], 0, 'Divide and conquer.'),
    ],
  }),
  make('Reverse Nodes In K Group', {
    teach: ['Reverse the list k nodes at a time; leave a short final group as is.', 'For each group: check k nodes exist, reverse them, reconnect the previous group tail to the new group head and this tail to the next group. Use a dummy node.'],
    questions: [
      ch('1->2->3->4->5, k = 2 ->', ['2->1->4->3->5', '2->1->3->4->5', '5->4->3->2->1', '1->2->4->3->5'], 0, 'The last single node stays.'),
      ch('If fewer than k nodes remain?', ['Leave them unchanged', 'Reverse them', 'Delete them', 'Error'], 0, 'Only full groups flip.'),
      ch('Extra space (iterative)?', ['O(1)', 'O(n)', 'O(k)', 'O(n/k)'], 0, 'Pointer rewiring only.'),
    ],
  }),
];
