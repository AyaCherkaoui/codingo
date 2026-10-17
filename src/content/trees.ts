import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const trees: Lesson[] = [
  make('Binary Tree Inorder Traversal', {
    teach: ['Inorder traversal visits Left, then Node, then Right. On a BST it gives sorted order.', 'Recursive: go left, record node, go right. Iterative: use a stack, push all left children, pop, record, move to the right child.'],
    questions: [
      ch('Visit order for inorder?', ['Left, Node, Right', 'Node, Left, Right', 'Left, Right, Node', 'Right, Node, Left'], 0, 'The node sits in the middle.', 'Where does the node sit relative to its two subtrees?'),
      ch('Inorder of a BST gives?', ['Sorted values', 'Reverse sorted', 'Level by level', 'Random'], 0, 'Left < node < right.', 'Think about the BST rule: left < node < right.'),
      ch('Tree 1 with right child 2 with left child 3. Inorder?', ['[1,3,2]', '[1,2,3]', '[3,2,1]', '[2,1,3]'], 0, '1, then 3 (left of 2), then 2.', 'Go left as far as possible first, then handle the node.'),
      bl('Fill in the blank (iterative inorder)', 'def inorder(root):\n    res, stack, cur = [], [], root\n    while cur or stack:\n        while cur:\n            stack.append(cur)\n            cur = cur.left\n        cur = stack.pop()\n        res.append(cur.val)\n        cur = ___', ['cur.right', 'cur.left', 'stack[-1]'], 'cur.right', 'After recording a node, its left side and itself are done.', 'Only one side of the popped node is still unvisited.'),
    ],
  }),
  make('Binary Tree Preorder Traversal', {
    teach: ['Preorder visits Node, then Left, then Right.', 'Great for copying a tree. Iterative: push the root; pop, record, push right then left (so left is processed first).'],
    questions: [
      ch('Visit order for preorder?', ['Node, Left, Right', 'Left, Node, Right', 'Left, Right, Node', 'Right, Left, Node'], 0, 'Node first.', 'The name tells you when the node is handled.'),
      ch('Iterative: which child do you push first?', ['Right', 'Left', 'Either', 'Neither'], 0, 'So left pops first.', 'A stack is last in, first out: whoever is pushed last pops first.'),
      ch('Preorder is useful for?', ['Copying or serializing a tree', 'Sorting a BST', 'Finding height only', 'Nothing'], 0, 'Parents come before children.', 'Parents must be seen before their children.'),
      ord('Order the iterative preorder', ['Push the root onto the stack', 'Pop a node and record its value', 'Push its right child if it exists', 'Push its left child if it exists', 'Repeat until the stack is empty'], 'Right goes in before left so left pops first.', false, 'Remember the stack reverses push order.'),
    ],
  }),
  make('Binary Tree Postorder Traversal', {
    teach: ['Postorder visits Left, then Right, then Node.', 'Children before parent, which is handy for deleting a tree or computing heights. Trick: reverse a (Node, Right, Left) traversal.'],
    questions: [
      ch('Visit order for postorder?', ['Left, Right, Node', 'Node, Left, Right', 'Left, Node, Right', 'Right, Left, Node'], 0, 'Node last.', 'The name tells you when the node is handled.'),
      ch('When do you need postorder?', ['Child results needed before the parent', 'Sorted output', 'Level order', 'Never'], 0, 'Like height or deletion.', 'Think about what must be finished before a parent can be processed.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 0, 'Each node once.', 'Count how many times each node is touched.'),
      bl('Fill in the blank (recursive postorder)', 'def post(root, res):\n    if not root: return\n    post(root.left, res)\n    ___\n    res.append(root.val)', ['post(root.right, res)', 'res.append(root.left)', 'return res'], 'post(root.right, res)', 'Both subtrees are finished before the node is recorded.', 'What must happen between the left call and the node?'),
    ],
  }),
  make('Invert Binary Tree', {
    teach: ['Invert Binary Tree: mirror it by swapping every left and right child.', 'Recursive: if node is None return None. Swap left and right, then invert both children. O(n) time.'],
    questions: [
      ch('What changes at each node?', ['Left and right children swap', 'Values double', 'Nothing', 'Parent changes'], 0, 'Mirror image.', 'Picture a mirror: what flips?'),
      ord('Order the function', ['If root is None, return None', 'Swap root.left and root.right', 'invert(root.left)', 'invert(root.right)', 'return root'], 'Base case first.', false, 'Handle the empty tree before touching children.'),
      ch('Space (recursion depth)?', ['O(h)', 'O(1)', 'O(n²)', 'O(log log n)'], 0, 'h is the tree height.', 'The recursion stack follows one root-to-leaf path.'),
      bug('Find the bug', ['def invert(root):', '    if not root: return None', '    left, right = invert(root.left), invert(root.right)', '    root.left, root.right = left, right', '    return root'], 3, 'The children are put back in the same places, so nothing is swapped. It must be root.left, root.right = right, left.', 'Compare where each inverted child ends up with where it started.'),
    ],
  }),
  make('Maximum Depth of Binary Tree', {
    teach: ['Maximum Depth: the number of nodes on the longest root-to-leaf path.', '1 + max(depth(left), depth(right)); an empty tree has depth 0. Or BFS level by level.'],
    questions: [
      bl('Fill in the blank', 'def depth(root):\n    if not root: return 0\n    return 1 + ___(depth(root.left), depth(root.right))', ['max', 'min', 'sum'], 'max', 'The deeper side wins.', 'What should be chosen between the two sides?'),
      ch('Depth of an empty tree?', ['0', '1', '-1', 'None'], 0, 'Base case.', 'Nothing to descend into.'),
      ch('A single node has depth?', ['1', '0', '2', '-1'], 0, '1 + max(0, 0).', 'One node plus its empty children.'),
      bug('Find the bug', ['def depth(root):', '    if not root: return 1', '    return 1 + max(depth(root.left), depth(root.right))'], 1, 'An empty tree has depth 0. Returning 1 makes a single node report 2.', 'Trace a single node with no children.'),
    ],
  }),
  make('Diameter of Binary Tree', {
    teach: ['Diameter: the longest path between any two nodes (counted in edges).', 'For each node the best path through it is leftHeight + rightHeight. Compute heights bottom-up and track the max of that sum in one DFS.'],
    questions: [
      ch('Best path through a node =', ['leftHeight + rightHeight', 'max of heights', 'height', 'n'], 0, 'Down one side, up the other.', 'Think of the path going down one side and up the other.'),
      ch('Does the diameter pass through the root?', ['Not always', 'Always', 'Never', 'Only for BST'], 0, 'It may sit deeper.', 'Is the longest path forced to include the root?'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(h)'], 0, 'One DFS.', 'How many times does each node get visited?'),
      bl('Fill in the blank', 'best = 0\ndef height(node):\n    nonlocal best\n    if not node: return 0\n    l, r = height(node.left), height(node.right)\n    best = max(best, ___)\n    return 1 + max(l, r)', ['l + r', '1 + max(l, r)', 'max(l, r)'], 'l + r', 'The path through a node uses both child heights; the return value serves the parent.', 'What you track differs from what you return.'),
    ],
  }),
  make('Balanced Binary Tree', {
    teach: ['Balanced: for every node the left and right heights differ by at most 1.', 'DFS returns the height, or -1 if the subtree is unbalanced. If either child is -1 or the heights differ by more than 1, return -1. O(n).'],
    questions: [
      ch('What does -1 signal?', ['Unbalanced subtree', 'Empty tree', 'Leaf', 'Error'], 0, 'Propagate failure up.', 'A sentinel value can carry failure up the recursion.'),
      ch('Allowed height difference?', ['At most 1', 'Exactly 0', 'At most 2', 'Any'], 0, 'By definition.', 'Read the definition: how much may heights differ?'),
      ch('Why is the single-DFS version better?', ['Avoids O(n²) recomputing heights', 'Shorter code only', 'It is not', 'Uses less memory only'], 0, 'Naive checks recompute heights at every node.', 'What gets recomputed in the naive approach?'),
      bug('Find the bug', ['def h(n):', '    if not n: return 0', '    l, r = h(n.left), h(n.right)', '    if l == -1 or r == -1 or abs(l - r) > 1: return -1', '    return max(l, r)'], 4, 'The height of a node is 1 + the taller child. Without the + 1 every height stays 0 and imbalance is never seen.', 'What is the height of a single leaf?'),
    ],
  }),
  make('Same Tree', {
    teach: ['Same Tree: are two trees identical in structure and values?', 'Both None -> true. One None -> false. Values differ -> false. Otherwise recurse on left pair and right pair.'],
    questions: [
      ch('Both nodes are None. Result?', ['true', 'false'], 0, 'Equal empty trees.', 'What are two empty trees?'),
      ch('One is None, the other is not?', ['false', 'true'], 0, 'Structure differs.', 'If only one side is empty, what differs?'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(1)', 'O(log n)'], 0, 'Visit each pair once.', 'How many node pairs get compared?'),
      bl('Fill in the blank', 'def same(p, q):\n    if not p and not q: return True\n    if not p or not q: return ___\n    return p.val == q.val and same(p.left, q.left) and same(p.right, q.right)', ['False', 'True', 'None'], 'False', 'Exactly one is empty here, so the shapes differ.', 'The both-empty case is already handled above.'),
    ],
  }),
  make('Subtree of Another Tree', {
    teach: ['Is subRoot a subtree of root (same structure and values from some node down)?', 'For each node in root, run Same Tree against subRoot. If any matches, true. O(m * n) simple, serialization works in O(m + n).'],
    questions: [
      ch('What helper do you reuse?', ['isSameTree', 'invertTree', 'maxDepth', 'inorder'], 0, 'Compare at each node.', 'You already know how to compare two whole trees.'),
      ch('An empty subRoot is?', ['Always a subtree', 'Never a subtree', 'Error', 'Depends on root'], 0, 'By convention.', 'What is the empty tree contained in?'),
      ch('Naive time complexity?', ['O(m * n)', 'O(n)', 'O(log n)', 'O(1)'], 0, 'A comparison at every node.', 'Cost of one comparison times number of start nodes.'),
      bug('Find the bug', ['def isSubtree(root, sub):', '    if not root: return False', '    if isSame(root, sub): return True', '    return isSubtree(root.left, sub)'], 3, 'The match could be in the right subtree too. Use isSubtree(left) or isSubtree(right).', 'Which part of the tree never gets searched?'),
    ],
  }),
  make('Lowest Common Ancestor of a Binary Search Tree', {
    teach: ['LCA in a BST: the lowest node that has both p and q as descendants.', 'Start at root. If both p and q are smaller, go left. If both are larger, go right. Otherwise this node splits them: it is the LCA.'],
    questions: [
      ch('p and q are both smaller than the node. Go?', ['Left', 'Right', 'Stay', 'Up'], 0, 'Both live in the left subtree.', 'Compare both values to the current node using the BST rule.'),
      ch('p < node < q means?', ['This node is the LCA', 'Go left', 'Go right', 'No LCA'], 0, 'They split here.', 'What if one is smaller and one is larger?'),
      ch('Time complexity?', ['O(h)', 'O(n)', 'O(1)', 'O(n²)'], 0, 'One path down.', 'You never branch, only walk down.'),
      bl('Fill in the blank', 'while root:\n    if p.val < root.val and q.val < root.val:\n        root = root.left\n    elif p.val > root.val and q.val > root.val:\n        root = ___\n    else:\n        return root', ['root.right', 'root.left', 'root.parent'], 'root.right', 'Both targets are larger, so they live on the other side.', 'Mirror of the branch above it.'),
    ],
  }),
  make('Insert into a Binary Search Tree', {
    teach: ['Insert a value into a BST.', 'Walk down: smaller goes left, larger goes right. When you reach an empty spot (None), create the new node there.'],
    questions: [
      ch('Where does a new node always end up?', ['As a leaf', 'As the root', 'In the middle', 'Anywhere'], 0, 'At the first empty spot.', 'Where is there free room in a BST?'),
      ch('val < node.val. Go?', ['Left', 'Right', 'Stop', 'Up'], 0, 'BST rule.', 'Use the BST ordering rule at each node.'),
      ch('Average time (balanced)?', ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], 0, 'Height is log n.', 'Cost depends on the path length.'),
      bl('Fill in the blank', 'def insert(root, val):\n    if not root: return TreeNode(val)\n    if val < root.val:\n        root.left = ___\n    else:\n        root.right = insert(root.right, val)\n    return root', ['insert(root.left, val)', 'insert(root.right, val)', 'TreeNode(val)'], 'insert(root.left, val)', 'Recurse into the same side you are assigning to and relink the result.', 'Look at how the else branch is written.'),
    ],
  }),
  make('Delete Node in a BST', {
    teach: ['Delete a node from a BST.', 'Find it. 0 children: remove. 1 child: replace by that child. 2 children: replace its value with the inorder successor (smallest in the right subtree), then delete that successor.'],
    questions: [
      ch('Node with two children: replace with?', ['Inorder successor', 'The root', 'Its parent', 'A leaf at random'], 0, 'Smallest value larger than it.', 'It must keep the BST order intact.'),
      ch('Node with one child?', ['Replace it by that child', 'Delete both', 'Move to root', 'Impossible'], 0, 'Bypass the node.', 'One child means there is nothing to choose.'),
      ch('Where is the inorder successor?', ['Leftmost node of the right subtree', 'Rightmost of the left', 'Root', 'Parent'], 0, 'Smallest value in the right subtree.', 'Think smallest value greater than the node.'),
      bug('Find the bug (two-child case)', ['if root.left and root.right:', '    succ = root.left', '    while succ.left: succ = succ.left', '    root.val = succ.val', '    root.right = delete(root.right, succ.val)'], 1, 'The successor lives in the right subtree, so start at root.right. Starting left finds the minimum of the wrong side.', 'Which subtree holds values just larger than root?'),
    ],
  }),
  make('Binary Tree Level Order Traversal', {
    teach: ['Level Order: return values level by level (BFS).', 'Use a queue. For each level, process exactly len(queue) nodes, collect their values, and enqueue their children.'],
    questions: [
      ch('Which structure does BFS use?', ['Queue', 'Stack', 'Heap', 'Hash set'], 0, 'First in, first out.', 'Which structure serves things in arrival order?'),
      ch('How do you separate levels?', ['Loop len(queue) times per level', 'Add a marker value', 'Sort', 'Recursion only'], 0, 'Snapshot the level size.', 'You need to know where one level ends.'),
      ch('Tree 3 / (9, 20 / (15, 7)). Result?', ['[[3],[9,20],[15,7]]', '[[3,9,20],[15,7]]', '[[3],[20,9],[7,15]]', '[[9],[3],[20]]'], 0, 'Top to bottom, left to right.', 'Walk top to bottom, left to right.'),
      bug('Find the bug', ['q = deque([root])', 'while q:', '    node = q.pop()', '    visit(node)', '    if node.left: q.append(node.left)', '    if node.right: q.append(node.right)'], 2, 'pop() takes from the right end, acting like a stack and visiting depth first. Use popleft() for FIFO.', 'Which end of the deque should you take from?'),
    ],
  }),
  make('Binary Tree Right Side View', {
    teach: ['Right Side View: the values you see looking from the right.', 'Do a level order traversal and keep the LAST node of each level. (DFS visiting right first also works: take the first node at each new depth.)'],
    questions: [
      ch('From each level you keep?', ['The last (rightmost) node', 'The first node', 'The max', 'All nodes'], 0, 'It hides the others.', 'What is hidden behind the rightmost node?'),
      ch('A left child can be visible when?', ['The right side is shorter there', 'Never', 'Always', 'Only at the root'], 0, 'If the right subtree is not deep enough.', 'Can a shorter right branch reveal something?'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(h)'], 0, 'Every node is visited.', 'Does every node get looked at?'),
      bl('Fill in the blank (DFS right first)', 'def dfs(node, depth):\n    if not node: return\n    if depth == len(res):\n        res.append(node.val)\n    dfs(node.___, depth + 1)\n    dfs(node.left, depth + 1)', ['right', 'left', 'val'], 'right', 'The first node reached at a new depth must be the visible one, so visit that side first.', 'Which child should be explored first to be seen?'),
    ],
  }),
  make('Construct Quad Tree', {
    teach: ['Construct Quad Tree: compress an n x n grid of 0s and 1s.', 'If the whole region is one value, make a leaf. Otherwise split into four quadrants (top-left, top-right, bottom-left, bottom-right) and recurse; the node is not a leaf.'],
    questions: [
      ch('When is a node a leaf?', ['The region is all one value', 'The region has size 1 only', 'It has no neighbors', 'Never'], 0, 'No need to split.', 'When can you stop splitting?'),
      ch('How many children does an internal node have?', ['4', '2', '3', '8'], 0, 'Four quadrants.', 'Think about a 2D grid cut in half both ways.'),
      ch('Technique?', ['Divide and conquer', 'Two pointers', 'Binary search', 'Sliding window'], 0, 'Split the grid recursively.', 'Break a big problem into same-shaped smaller ones.'),
      ord('Order the construction', ['Check whether every cell in the region has the same value', 'If so, return a leaf with that value', 'Otherwise split the region into four quadrants', 'Recurse on each quadrant', 'Attach the four results as children of a non-leaf node'], 'Check uniformity first, split only if needed.', false, 'Decide leaf or not before splitting.'),
    ],
  }),
  make('Count Good Nodes In Binary Tree', {
    teach: ['A node is good if no node on its root path has a larger value.', 'DFS carrying the maximum value seen so far on the path. If node.val >= max, count it. Pass max(max, node.val) to the children.'],
    questions: [
      ch('What does DFS carry down?', ['Max value on the path so far', 'The depth', 'The parent', 'Sum'], 0, 'To compare with each node.', 'The child needs context about its ancestors.'),
      ch('The root is?', ['Always good', 'Never good', 'Sometimes', 'Depends on k'], 0, 'No ancestors.', 'Does the root have anything above it?'),
      ch('Condition for good?', ['node.val >= max_so_far', 'node.val > max_so_far', 'node.val < max_so_far', 'always'], 0, 'Equal still counts.', 'Is a tie with the max allowed?'),
      bl('Fill in the blank', 'def dfs(node, mx):\n    if not node: return 0\n    good = 1 if node.val >= mx else 0\n    mx = max(mx, node.val)\n    return good + dfs(node.left, mx) + ___', ['dfs(node.right, mx)', 'dfs(node.right, node.val)', '1'], 'dfs(node.right, mx)', 'Both children receive the updated path maximum.', 'Mirror the left call.'),
    ],
  }),
  make('Validate Binary Search Tree', {
    teach: ['Validate BST: every node must be within an allowed range, not just larger than its parent.', 'DFS with (low, high). Root range is (-inf, inf). Going left tightens high to node.val; going right tightens low. Strict inequalities.'],
    questions: [
      ch('Why not just compare with the parent?', ['A deep node can break an ancestor\'s rule', 'Speed', 'Memory', 'You can'], 0, 'The whole subtree must respect every ancestor.', 'Think about grandparents, not just parents.'),
      ch('Going left, the new bound is?', ['high = node.val', 'low = node.val', 'both', 'none'], 0, 'Left values must be smaller.', 'Which bound changes when you go left?'),
      ch('Alternative check?', ['Inorder is strictly increasing', 'Preorder is sorted', 'Height equal', 'Sum'], 0, 'BST inorder is sorted.', 'What does a BST look like when read left to right?'),
      bug('Find the bug', ['def ok(n, lo, hi):', '    if not n: return True', '    if not (lo <= n.val <= hi): return False', '    return ok(n.left, lo, n.val) and ok(n.right, n.val, hi)'], 2, 'BSTs here need strict bounds, so equal values must fail. Use lo < n.val < hi.', 'What about a tree with two equal values?'),
    ],
  }),
  make('Kth Smallest Element In a Bst', {
    teach: ['Kth smallest value in a BST.', 'Inorder gives sorted order. Traverse inorder (iteratively with a stack), count nodes, and stop at the kth.'],
    questions: [
      ch('Which traversal helps?', ['Inorder', 'Preorder', 'Postorder', 'Level order'], 0, 'It is sorted.', 'Which traversal yields sorted order?'),
      ch('When can you stop early?', ['After visiting k nodes', 'Never', 'At the leaf', 'At the root'], 0, 'No need to traverse the rest.', 'Do you need the rest of the tree after the answer?'),
      ch('Time complexity?', ['O(h + k)', 'O(n²)', 'O(1)', 'O(k²)'], 0, 'Walk down, then k steps.', 'Descend the left spine, then count k nodes.'),
      bl('Fill in the blank', 'while True:\n    while cur:\n        stack.append(cur)\n        cur = cur.left\n    cur = stack.pop()\n    k -= 1\n    if k == ___: return cur.val\n    cur = cur.right', ['0', '1', 'k'], '0', 'k counts down once per visited node; the kth visit is when it runs out.', 'k has just been decremented before the check.'),
    ],
  }),
  make('Construct Binary Tree From Preorder And Inorder Traversal', {
    teach: ['Rebuild a tree from its preorder and inorder lists.', 'The first preorder value is the root. Find it in inorder: everything left of it is the left subtree, everything right is the right subtree. Recurse; a value->index map makes the lookup O(1).'],
    questions: [
      ch('Which list gives the root?', ['First of preorder', 'Last of preorder', 'First of inorder', 'Middle of inorder'], 0, 'Preorder starts with the root.', 'Which list starts with the top node?'),
      ch('What does inorder tell you?', ['Which values are left and right of the root', 'The depth', 'The height', 'Nothing'], 0, 'Split at the root\'s position.', 'Values on each side of the root separate the subtrees.'),
      ch('Speed-up trick?', ['Hash map value -> inorder index', 'Sorting', 'Binary search', 'Stack'], 0, 'Avoid scanning to find the root.', 'Searching a list repeatedly is slow.'),
      ord('Order the recursive build', ['Take the next preorder value as the root', 'Find its index in inorder', 'Build the left subtree from values left of that index', 'Build the right subtree from values right of it', 'Return the root'], 'Preorder consumes left before right.', false, 'Preorder pointer moves left subtree first.'),
    ],
  }),
  make('House Robber III', {
    teach: ['Houses form a tree. You cannot rob a parent and its child. Maximize the loot.', 'DFS returns two numbers for each node: (best if you rob this node, best if you skip it). Rob = val + skip(left) + skip(right). Skip = max(left pair) + max(right pair).'],
    questions: [
      ch('If you rob a node, the children?', ['Must be skipped', 'Must be robbed', 'Either', 'Are doubled'], 0, 'Adjacent houses alarm.', 'Adjacent houses are parent and child.'),
      ch('What does each DFS call return?', ['A (rob, skip) pair', 'One number', 'A list', 'A boolean'], 0, 'Both options for the subtree.', 'Each subtree has two possible states.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(2^n)', 'O(log n)'], 0, 'Each node once.', 'Every node is processed once.'),
      bl('Fill in the blank', 'def dfs(node):\n    if not node: return (0, 0)\n    L, R = dfs(node.left), dfs(node.right)\n    rob = node.val + L[1] + R[1]\n    skip = ___\n    return (rob, skip)', ['max(L) + max(R)', 'L[0] + R[0]', 'max(L[0], R[0])'], 'max(L) + max(R)', 'If this node is skipped, each child is free to choose its best option independently.', 'Children are unconstrained when the parent is skipped.'),
    ],
  }),
  make('Delete Leaves With a Given Value', {
    teach: ['Delete leaves equal to target; if a parent becomes a leaf with target, delete it too.', 'Postorder: fix the children first, then check the node: if it has no children now and val == target, return None.'],
    questions: [
      ch('Which traversal?', ['Postorder', 'Preorder', 'Inorder', 'Level order'], 0, 'Children are handled before the parent.', 'Children must be settled before judging the parent.'),
      ch('Why can parents disappear?', ['They become leaves after their children are removed', 'They are random', 'Never', 'By value only'], 0, 'Cascade upward.', 'What changes about a parent after its kids vanish?'),
      ch('Return value of the function?', ['The (possibly None) subtree root', 'Count', 'Boolean', 'Depth'], 0, 'The parent reassigns its children.', 'Recursion can hand back the new subtree.'),
      bug('Find the bug', ['def remove(root, t):', '    if not root: return None', '    if not root.left and not root.right and root.val == t: return None', '    root.left = remove(root.left, t)', '    root.right = remove(root.right, t)', '    return root'], 2, 'The leaf check runs before the children are cleaned, so parents that become leaves are never removed. Recurse first, then check.', 'When is the leaf test evaluated relative to the recursion?'),
    ],
  }),
  make('Binary Tree Maximum Path Sum', {
    teach: ['Max path sum: any path between two nodes, values can be negative.', 'DFS returns the best downward path from a node: val + max(0, left, right). At each node also try the path through it: val + max(0, left) + max(0, right), and update the global best.'],
    questions: [
      ch('Why max(0, child)?', ['Ignore negative branches', 'Avoid overflow', 'Speed', 'No reason'], 0, 'Dropping a negative path is better.', 'What is better than a negative branch?'),
      ch('What can a parent extend?', ['Only a single downward branch', 'Both branches', 'Any path', 'Nothing'], 0, 'A path cannot fork upward.', 'A path cannot fork when handed to the parent.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(h)'], 0, 'One DFS.', 'One visit per node.'),
      bug('Find the bug', ['def dfs(n):', '    if not n: return 0', '    l, r = dfs(n.left), dfs(n.right)', '    best[0] = max(best[0], n.val + l + r)', '    return n.val + max(l, r)'], 2, 'Negative branch sums must be clamped to 0: l = max(0, dfs(n.left)) and likewise for r. Otherwise a bad branch drags the path down.', 'What if a child sum is negative?'),
    ],
  }),
  make('Serialize And Deserialize Binary Tree', {
    teach: ['Turn a tree into a string and back.', 'Preorder with null markers: "1,2,N,N,3,4,N,N,5,N,N". Deserialize by reading values in the same order with an index/queue and recursing; N means no node.'],
    questions: [
      ch('Why include null markers?', ['To recover the exact shape', 'To save space', 'Sorting', 'Decoration'], 0, 'Preorder alone is ambiguous.', 'A list of values alone loses structure.'),
      ch('Another valid approach?', ['Level order (BFS) with nulls', 'Random order', 'Inorder only', 'Depth only'], 0, 'Both rebuild uniquely.', 'Another traversal order can also work.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 0, 'Visit each node once.', 'Each node is written and read once.'),
      bl('Fill in the blank (deserialize)', 'def build():\n    val = next(vals)\n    if val == "N": return None\n    node = TreeNode(int(val))\n    node.left = build()\n    node.right = ___\n    return node', ['build()', 'None', 'build(node)'], 'build()', 'Read in the same preorder: left subtree consumed first, then right.', 'The iterator already tracks position.'),
    ],
  }),
];
