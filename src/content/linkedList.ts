import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const linkedList: Lesson[] = [
  make('Reverse Linked List', {
    teach: ['Reverse Linked List: flip every pointer so the list runs backwards.', 'Walk with prev = None and cur = head. Save cur.next, point cur.next to prev, then move both forward. Return prev. O(n) time, O(1) space.'],
    questions: [
      ch('1 -> 2 -> 3 becomes?', ['3 -> 2 -> 1', '1 -> 3 -> 2', '2 -> 1 -> 3', '3 -> 1 -> 2'], 0, 'Fully reversed.', 'Think about which direction each arrow ends up pointing.'),
      ord('Order the loop body', ['nxt = cur.next', 'cur.next = prev', 'prev = cur', 'cur = nxt'], 'Save next before you overwrite it.', true, 'What happens to the rest of the list if you overwrite cur.next first?'),
      ch('What do you return?', ['prev', 'cur', 'head', 'nxt'], 0, 'cur is None at the end; prev is the new head.', 'After the loop, which pointer sits on the last real node?'),
      bug('Find the buggy line', ['prev, cur = None, head', 'while cur:', '    cur.next = prev', '    nxt = cur.next', '    prev, cur = cur, nxt', 'return prev'], 2, 'cur.next is overwritten before it is saved, so nxt is just prev and the rest of the list is lost. Save nxt first.', 'Is the original next pointer still available on that line?'),
    ],
  }),
  make('Merge Two Sorted Lists', {
    teach: ['Merge two sorted linked lists into one sorted list.', 'Use a dummy node and a tail pointer. Repeatedly attach the smaller head, advance that list. At the end attach whichever list still has nodes.'],
    questions: [
      ch('Why use a dummy node?', ['Avoids special-casing the first node', 'Faster', 'Needed by Python', 'Stores the length'], 0, 'Return dummy.next at the end.', 'Think about the very first node of the merged list.'),
      ch('1->2->4 and 1->3->4 merged?', ['1->1->2->3->4->4', '1->2->4->1->3->4', '1->1->2->4->3->4', '1->2->3->4'], 0, 'Always pick the smaller head.', 'Compare the two heads, take the smaller, repeat.'),
      ch('Time complexity?', ['O(n + m)', 'O(n * m)', 'O(log n)', 'O(1)'], 0, 'Each node is visited once.', 'Count how many times each node is looked at.'),
      bl('Attach the leftover nodes', 'while l1 and l2:\n    ...\ntail.next = l1 ___ l2', ['or', 'and', '+'], 'or', 'One list is empty (None), so "l1 or l2" picks the one that still has nodes.', 'Exactly one list can still have nodes after the loop.'),
    ],
  }),
  make('Linked List Cycle', {
    teach: ['Does a linked list contain a cycle?', 'Floyd\'s tortoise and hare: slow moves 1 step, fast moves 2. If there is a cycle they must meet; if fast reaches the end there is none. O(n) time, O(1) space.'],
    questions: [
      ch('How fast does the fast pointer move?', ['2 steps', '1 step', '3 steps', 'Random'], 0, 'Slow 1, fast 2.', 'Compare how many nodes each pointer skips per iteration.'),
      ch('Fast reaches None. Result?', ['No cycle', 'Cycle', 'Error', 'Unknown'], 0, 'A cycle never ends.', 'What does a pointer walking off the list tell you?'),
      ch('Alternative with extra memory?', ['Hash set of visited nodes', 'Sorting', 'Binary search', 'Stack'], 0, 'O(n) space.', 'Remember what you visited, at a memory cost.'),
      bl('Complete the loop condition', 'slow = fast = head\nwhile fast and ___:\n    slow = slow.next\n    fast = fast.next.next\n    if slow is fast:\n        return True\nreturn False', ['fast.next', 'slow.next', 'slow'], 'fast.next', 'fast.next.next needs fast.next to exist, otherwise it crashes on None.', 'Fast jumps two nodes; what must exist first?'),
    ],
  }),
  make('Reorder List', {
    teach: ['Reorder L0->L1->...->Ln into L0->Ln->L1->Ln-1->...', 'Three steps: find the middle with slow/fast, reverse the second half, then merge the two halves alternately.'],
    questions: [
      ch('1->2->3->4 becomes?', ['1->4->2->3', '1->2->4->3', '4->1->3->2', '1->3->2->4'], 0, 'First, last, second, second-last.', 'Trace the pairing: first, last, second, second-last.'),
      ord('Order the steps', ['Find the middle', 'Reverse the second half', 'Merge the halves alternately'], 'Middle, reverse, weave.', false, 'What must be done to the list before you can weave from both ends?'),
      ch('How do you find the middle?', ['slow and fast pointers', 'Count then loop', 'Binary search', 'Recursion only'], 0, 'When fast ends, slow is in the middle.', 'One pointer moves twice as fast as the other.'),
      bl('Cut the first half off the second', 'second = slow.next\nslow.next = ___', ['None', 'second', 'head'], 'None', 'Terminate the first half so it does not still link into the reversed half and create a cycle.', 'The first half should end at slow.'),
    ],
  }),
  make('Remove Nth Node From End of List', {
    teach: ['Remove the nth node from the end in one pass.', 'Use a dummy node. Move fast n steps ahead, then move slow and fast together. When fast reaches the end, slow is just before the node to delete.'],
    questions: [
      ch('Why start from a dummy node?', ['Removing the head works the same', 'Speed', 'Memory', 'No reason'], 0, 'Handles n = length.', 'What if the node to delete is the head?'),
      ch('The gap between fast and slow is?', ['n nodes', '1 node', '0 nodes', 'length'], 0, 'Fast starts n ahead.', 'Think about how far apart the two pointers start.'),
      bl('Fill in the blank', 'slow.next = slow.___', ['next.next', 'next', 'prev'], 'next.next', 'Skip over the node.', 'Which link do you rewire to bypass a node?'),
      bug('Find the buggy line', ['dummy = ListNode(0, head)', 'slow = fast = dummy', 'for _ in range(n):', '    fast = fast.next', 'while fast:', '    slow = slow.next', '    fast = fast.next', 'slow.next = slow.next.next', 'return dummy.next'], 4, 'The loop must stop when fast is the LAST node (fast.next is None) so slow ends just before the target. With while fast, slow lands on the target itself.', 'Where should slow stop: before the target or on it?'),
    ],
  }),
  make('Copy List With Random Pointer', {
    teach: ['Deep-copy a list where each node also has a random pointer.', 'Two passes with a hash map old -> new. Pass 1: create a copy of every node. Pass 2: set copy.next and copy.random using the map.'],
    questions: [
      ch('The hash map maps:', ['old node -> new node', 'value -> node', 'index -> value', 'node -> random'], 0, 'Lets us wire random pointers.', 'Each key and value needs a way to find the new copy.'),
      ch('Why can\'t we do it in one pass easily?', ['Random may point ahead to a node not created yet', 'Speed', 'Python limits', 'We can'], 0, 'Create all nodes first.', 'A random pointer may reference a node you have not seen yet.'),
      ch('Time and space?', ['O(n) and O(n)', 'O(n) and O(1)', 'O(n²) and O(1)', 'O(1) and O(1)'], 0, 'Map of n nodes.', 'Count the extra storage for the map.'),
      bl('Wire the random pointer', 'copy = {None: None}\n# pass 1 filled copy[old] for every old node\nwhile cur:\n    copy[cur].next = copy[cur.next]\n    copy[cur].random = ___\n    cur = cur.next', ['copy[cur.random]', 'cur.random', 'copy[cur]'], 'copy[cur.random]', 'The copy must point to the copy of the random target, not the original node. None maps to None.', 'The new node must point at another NEW node.'),
    ],
  }),
  make('Add Two Numbers', {
    teach: ['Add two numbers stored as reversed digit lists.', 'Walk both lists with a carry. digit = (a + b + carry) % 10, carry = (a + b + carry) // 10. Continue while either list or carry remains.'],
    questions: [
      ch('[2,4,3] + [5,6,4] ->', ['[7,0,8]', '[8,0,7]', '[7,8,0]', '[0,7,8]'], 0, '342 + 465 = 807.', 'Add digit by digit from the least significant end.'),
      bl('Fill in the blank', 'carry = total ___ 10', ['//', '%', '*'], '//', 'Integer division gives the carry.', 'Which operation drops the remainder?'),
      ch('When do you stop?', ['Both lists done and no carry', 'First list done', 'Never', 'After 1 digit'], 0, 'A leftover carry adds a new digit.', 'What if both lists end but a carry remains?'),
      bug('Find the buggy line', ['dummy = tail = ListNode()', 'carry = 0', 'while l1 or l2:', '    total = carry + (l1.val if l1 else 0) + (l2.val if l2 else 0)', '    carry, digit = divmod(total, 10)', '    tail.next = ListNode(digit)', '    tail = tail.next', '    l1 = l1.next if l1 else None', '    l2 = l2.next if l2 else None', 'return dummy.next'], 2, '[5] + [5] stops with carry = 1 unprocessed and returns [0]. The loop must also continue while carry is nonzero.', 'Try [5] + [5] and see what happens to the carry.'),
    ],
  }),
  make('Find The Duplicate Number', {
    teach: ['Array of n+1 numbers in 1..n has one repeated value. Find it without changing the array and with O(1) space.', 'Treat nums[i] as a pointer i -> nums[i]. The duplicate creates a cycle. Use Floyd\'s algorithm: find where slow and fast meet, then restart one pointer at the start; they meet at the cycle entry = the duplicate.'],
    questions: [
      ch('Why is there a cycle?', ['Two indexes point to the same value', 'Array is sorted', 'Numbers are negative', 'There is none'], 0, 'Two arrows enter one node.', 'Picture arrows i -> nums[i] and where they collide.'),
      ch('Space used?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only two pointers.', 'How many extra variables are needed?'),
      ch('[1,3,4,2,2] ->', ['1', '2', '3', '4'], 1, '2 appears twice.', 'Find the value that appears twice.'),
      bl('Phase 2 of Floyd', 'slow2 = 0\nwhile slow != slow2:\n    slow = nums[slow]\n    slow2 = ___\nreturn slow', ['nums[slow2]', 'nums[nums[slow2]]', 'slow2 + 1'], 'nums[slow2]', 'Once restarted, both pointers move one step at a time and meet at the cycle entry, the duplicate.', 'In phase 2 both pointers move at the same speed.'),
    ],
  }),
  make('Reverse Linked List II', {
    teach: ['Reverse only the nodes from position left to right.', 'Walk to the node before left. Then repeatedly move the next node to the front of the reversed section (left - right times). Dummy node helps when left = 1.'],
    questions: [
      ch('1->2->3->4->5, left=2, right=4 ->', ['1->4->3->2->5', '1->2->4->3->5', '5->4->3->2->1', '1->3->2->4->5'], 0, 'Only the middle part flips.', 'What if the reversed section begins at the head?'),
      ch('Why a dummy node?', ['left may be 1', 'Speed', 'Memory', 'Recursion'], 0, 'The head may change.', 'Only the nodes between left and right move.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(1)', 'O(right²)'], 0, 'One pass.', 'Count the passes over the list.'),
      bl('Move the next node to the front', 'for _ in range(right - left):\n    node = cur.next\n    cur.next = node.next\n    node.next = ___\n    prev.next = node', ['prev.next', 'cur', 'prev'], 'prev.next', 'node is inserted right after prev, so it must point at what currently follows prev (the old front of the section).', 'Where does the section currently begin?'),
    ],
  }),
  make('Design Circular Queue', {
    teach: ['Design Circular Queue: fixed capacity queue that reuses freed space.', 'Use an array with head index and size. enQueue writes at (head + size) % k. deQueue moves head = (head + 1) % k. Full when size == k, empty when size == 0.'],
    questions: [
      ch('Where does enQueue write?', ['(head + size) % k', 'head', 'size', 'k - 1'], 0, 'The slot after the last item, wrapping around.', 'Think of indexes that wrap past the end.'),
      ch('How do you detect full?', ['size == k', 'head == 0', 'tail == k', 'size == 0'], 0, 'Track size explicitly.', 'Is there a counter that says how many items exist?'),
      ch('Why modulo?', ['Wrap around the array', 'Speed', 'Sorting', 'Hashing'], 0, 'Indexes loop back to 0.', 'What happens at index k - 1 + 1?'),
      bug('Find the buggy line', ['def enQueue(self, v):', '    if self.size == self.k:', '        return False', '    self.q[self.head + self.size] = v', '    self.size += 1', '    return True'], 3, 'Without % k the index can run past the end of the array. It should be (self.head + self.size) % self.k.', 'What if head + size reaches k?'),
    ],
  }),
  make('LRU Cache', {
    teach: ['LRU Cache: get and put in O(1); evict the least recently used when full.', 'Combine a hash map (key -> node) with a doubly linked list ordered by recency. On get/put move the node to the most-recent end. Evict from the least-recent end.'],
    questions: [
      ch('Why a doubly linked list?', ['O(1) removal of any node', 'Sorting', 'Hashing', 'Less memory'], 0, 'We need prev pointers to unlink.', 'Unlinking a middle node needs access to its neighbors.'),
      ch('Why also a hash map?', ['O(1) lookup by key', 'Ordering', 'Eviction', 'Sorting'], 0, 'Find the node instantly.', 'How do you jump straight to a node from a key?'),
      ch('On get(key) for an existing key you:', ['Move it to most recent', 'Delete it', 'Do nothing', 'Move it to least recent'], 0, 'Using it makes it fresh.', 'Using something should change its freshness.'),
      bl('Evict the least recent node', '# left sentinel = LRU end, right sentinel = MRU end\nif len(self.cache) > self.cap:\n    lru = self.left.___\n    self._remove(lru)\n    del self.cache[lru.key]', ['next', 'prev', 'key'], 'next', 'The node right after the left sentinel is the least recently used one.', 'Which node sits right beside the LRU-end sentinel?'),
    ],
  }),
  make('LFU Cache', {
    teach: ['LFU Cache: evict the least FREQUENTLY used key (ties: least recently used).', 'Keep key -> (value, freq), and for each frequency an ordered set of keys. Track min_freq. On access move the key from freq f to f + 1, updating min_freq.'],
    questions: [
      ch('Which key is evicted?', ['Lowest frequency, oldest on ties', 'Newest', 'Highest frequency', 'Random'], 0, 'Frequency first, recency second.', 'Frequency is the primary ordering rule.'),
      ch('What do you track to evict in O(1)?', ['min_freq', 'max_freq', 'size', 'head'], 0, 'Points at the eviction bucket.', 'Which value lets you find the eviction bucket instantly?'),
      ch('After a get, the key\'s frequency?', ['Increases by 1', 'Resets', 'Stays', 'Doubles'], 0, 'It moves to the next bucket.', 'Each access counts as one more use.'),
      bl('Update min_freq', '# key moved from bucket f to f + 1\nif f == self.min_freq and not self.buckets[f]:\n    self.min_freq ___ 1', ['+=', '-=', '='], '+=', 'If the min bucket just emptied, the moved key now lives in bucket min_freq + 1.', 'The only key in the lowest bucket just moved up.'),
    ],
  }),
  make('Merge K Sorted Lists', {
    teach: ['Merge k sorted lists into one.', 'Min-heap approach: push every list head, pop the smallest, push that node\'s next. O(N log k). Or divide and conquer: merge lists in pairs until one remains.'],
    questions: [
      ch('Heap size at most?', ['k', 'N', '1', 'k²'], 0, 'One node per list.', 'Only one candidate per list competes at a time.'),
      ch('Time with a heap?', ['O(N log k)', 'O(N k)', 'O(N²)', 'O(k log N)'], 0, 'N pops, each log k.', 'N pops, each costing a heap operation.'),
      ch('Alternative approach?', ['Merge pairs repeatedly', 'Binary search', 'Two pointers', 'Stack'], 0, 'Divide and conquer.', 'Combine lists two at a time.'),
      bl('Heap tie-breaker', 'for i, node in enumerate(lists):\n    if node:\n        heapq.heappush(heap, (node.val, ___, node))', ['i', 'node.next', 'None'], 'i', 'Equal values would compare the nodes next, and ListNode is not comparable. A unique index breaks ties safely.', 'What if two heads have the same value?'),
    ],
  }),
  make('Reverse Nodes In K Group', {
    teach: ['Reverse the list k nodes at a time; leave a short final group as is.', 'For each group: check k nodes exist, reverse them, reconnect the previous group tail to the new group head and this tail to the next group. Use a dummy node.'],
    questions: [
      ch('1->2->3->4->5, k = 2 ->', ['2->1->4->3->5', '2->1->3->4->5', '5->4->3->2->1', '1->2->4->3->5'], 0, 'The last single node stays.', 'Look at which group is left over at the end.'),
      ch('If fewer than k nodes remain?', ['Leave them unchanged', 'Reverse them', 'Delete them', 'Error'], 0, 'Only full groups flip.', 'What if the group is too short to be complete?'),
      ch('Extra space (iterative)?', ['O(1)', 'O(n)', 'O(k)', 'O(n/k)'], 0, 'Pointer rewiring only.', 'Only pointers change; nothing is copied.'),
      ord('Order the work for one group', ['Check that k nodes remain', 'Reverse the k nodes', 'Link the previous group tail to the new head', 'Link the new tail to the next group'], 'Verify, flip, reconnect backward, reconnect forward.', false, 'Never reverse before knowing the group is full.'),
    ],
  }),
];
