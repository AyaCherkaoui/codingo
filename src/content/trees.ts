import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const trees: Lesson[] = [
  make('Binary Tree Inorder Traversal', {
    teach: ['Inorder traversal visits Left, then Node, then Right. On a BST it gives sorted order.', 'Recursive: go left, record node, go right. Iterative: use a stack, push all left children, pop, record, move to the right child.'],
    questions: [
      ch('Visit order for inorder?', ['Left, Node, Right', 'Node, Left, Right', 'Left, Right, Node', 'Right, Node, Left'], 0, 'The node sits in the middle.'),
      ch('Inorder of a BST gives?', ['Sorted values', 'Reverse sorted', 'Level by level', 'Random'], 0, 'Left < node < right.'),
      ch('Tree 1 with right child 2 with left child 3. Inorder?', ['[1,3,2]', '[1,2,3]', '[3,2,1]', '[2,1,3]'], 0, '1, then 3 (left of 2), then 2.'),
    ],
  }),
  make('Binary Tree Preorder Traversal', {
    teach: ['Preorder visits Node, then Left, then Right.', 'Great for copying a tree. Iterative: push the root; pop, record, push right then left (so left is processed first).'],
    questions: [
      ch('Visit order for preorder?', ['Node, Left, Right', 'Left, Node, Right', 'Left, Right, Node', 'Right, Left, Node'], 0, 'Node first.'),
      ch('Iterative: which child do you push first?', ['Right', 'Left', 'Either', 'Neither'], 0, 'So left pops first.'),
      ch('Preorder is useful for?', ['Copying or serializing a tree', 'Sorting a BST', 'Finding height only', 'Nothing'], 0, 'Parents come before children.'),
    ],
  }),
  make('Binary Tree Postorder Traversal', {
    teach: ['Postorder visits Left, then Right, then Node.', 'Children before parent, which is handy for deleting a tree or computing heights. Trick: reverse a (Node, Right, Left) traversal.'],
    questions: [
      ch('Visit order for postorder?', ['Left, Right, Node', 'Node, Left, Right', 'Left, Node, Right', 'Right, Left, Node'], 0, 'Node last.'),
      ch('When do you need postorder?', ['Child results needed before the parent', 'Sorted output', 'Level order', 'Never'], 0, 'Like height or deletion.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 0, 'Each node once.'),
    ],
  }),
  make('Invert Binary Tree', {
    teach: ['Invert Binary Tree: mirror it by swapping every left and right child.', 'Recursive: if node is None return None. Swap left and right, then invert both children. O(n) time.'],
    questions: [
      ch('What changes at each node?', ['Left and right children swap', 'Values double', 'Nothing', 'Parent changes'], 0, 'Mirror image.'),
      ord('Order the function', ['If root is None, return None', 'Swap root.left and root.right', 'invert(root.left)', 'invert(root.right)', 'return root'], 'Base case first.'),
      ch('Space (recursion depth)?', ['O(h)', 'O(1)', 'O(n²)', 'O(log log n)'], 0, 'h is the tree height.'),
    ],
  }),
  make('Maximum Depth of Binary Tree', {
    teach: ['Maximum Depth: the number of nodes on the longest root-to-leaf path.', '1 + max(depth(left), depth(right)); an empty tree has depth 0. Or BFS level by level.'],
    questions: [
      bl('Fill in the blank', 'def depth(root):\\n    if not root: return 0\\n    return 1 + ___(depth(root.left), depth(root.right))', ['max', 'min', 'sum'], 'max', 'The deeper side wins.'),
      ch('Depth of an empty tree?', ['0', '1', '-1', 'None'], 0, 'Base case.'),
      ch('A single node has depth?', ['1', '0', '2', '-1'], 0, '1 + max(0, 0).'),
    ],
  }),
  make('Diameter of Binary Tree', {
    teach: ['Diameter: the longest path between any two nodes (counted in edges).', 'For each node the best path through it is leftHeight + rightHeight. Compute heights bottom-up and track the max of that sum in one DFS.'],
    questions: [
      ch('Best path through a node =', ['leftHeight + rightHeight', 'max of heights', 'height', 'n'], 0, 'Down one side, up the other.'),
      ch('Does the diameter pass through the root?', ['Not always', 'Always', 'Never', 'Only for BST'], 0, 'It may sit deeper.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(h)'], 0, 'One DFS.'),
    ],
  }),
  make('Balanced Binary Tree', {
    teach: ['Balanced: for every node the left and right heights differ by at most 1.', 'DFS returns the height, or -1 if the subtree is unbalanced. If either child is -1 or the heights differ by more than 1, return -1. O(n).'],
    questions: [
      ch('What does -1 signal?', ['Unbalanced subtree', 'Empty tree', 'Leaf', 'Error'], 0, 'Propagate failure up.'),
      ch('Allowed height difference?', ['At most 1', 'Exactly 0', 'At most 2', 'Any'], 0, 'By definition.'),
      ch('Why is the single-DFS version better?', ['Avoids O(n²) recomputing heights', 'Shorter code only', 'It is not', 'Uses less memory only'], 0, 'Naive checks recompute heights at every node.'),
    ],
  }),
  make('Same Tree', {
    teach: ['Same Tree: are two trees identical in structure and values?', 'Both None -> true. One None -> false. Values differ -> false. Otherwise recurse on left pair and right pair.'],
    questions: [
      ch('Both nodes are None. Result?', ['true', 'false'], 0, 'Equal empty trees.'),
      ch('One is None, the other is not?', ['false', 'true'], 0, 'Structure differs.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(1)', 'O(log n)'], 0, 'Visit each pair once.'),
    ],
  }),
  make('Subtree of Another Tree', {
    teach: ['Is subRoot a subtree of root (same structure and values from some node down)?', 'For each node in root, run Same Tree against subRoot. If any matches, true. O(m * n) simple, serialization works in O(m + n).'],
    questions: [
      ch('What helper do you reuse?', ['isSameTree', 'invertTree', 'maxDepth', 'inorder'], 0, 'Compare at each node.'),
      ch('An empty subRoot is?', ['Always a subtree', 'Never a subtree', 'Error', 'Depends on root'], 0, 'By convention.'),
      ch('Naive time complexity?', ['O(m * n)', 'O(n)', 'O(log n)', 'O(1)'], 0, 'A comparison at every node.'),
    ],
  }),
  make('Lowest Common Ancestor of a Binary Search Tree', {
    teach: ['LCA in a BST: the lowest node that has both p and q as descendants.', 'Start at root. If both p and q are smaller, go left. If both are larger, go right. Otherwise this node splits them: it is the LCA.'],
    questions: [
      ch('p and q are both smaller than the node. Go?', ['Left', 'Right', 'Stay', 'Up'], 0, 'Both live in the left subtree.'),
      ch('p < node < q means?', ['This node is the LCA', 'Go left', 'Go right', 'No LCA'], 0, 'They split here.'),
      ch('Time complexity?', ['O(h)', 'O(n)', 'O(1)', 'O(n²)'], 0, 'One path down.'),
    ],
  }),
  make('Insert into a Binary Search Tree', {
    teach: ['Insert a value into a BST.', 'Walk down: smaller goes left, larger goes right. When you reach an empty spot (None), create the new node there.'],
    questions: [
      ch('Where does a new node always end up?', ['As a leaf', 'As the root', 'In the middle', 'Anywhere'], 0, 'At the first empty spot.'),
      ch('val < node.val. Go?', ['Left', 'Right', 'Stop', 'Up'], 0, 'BST rule.'),
      ch('Average time (balanced)?', ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], 0, 'Height is log n.'),
    ],
  }),
  make('Delete Node in a BST', {
    teach: ['Delete a node from a BST.', 'Find it. 0 children: remove. 1 child: replace by that child. 2 children: replace its value with the inorder successor (smallest in the right subtree), then delete that successor.'],
    questions: [
      ch('Node with two children: replace with?', ['Inorder successor', 'The root', 'Its parent', 'A leaf at random'], 0, 'Smallest value larger than it.'),
      ch('Node with one child?', ['Replace it by that child', 'Delete both', 'Move to root', 'Impossible'], 0, 'Bypass the node.'),
      ch('Where is the inorder successor?', ['Leftmost node of the right subtree', 'Rightmost of the left', 'Root', 'Parent'], 0, 'Smallest value in the right subtree.'),
    ],
  }),
  make('Binary Tree Level Order Traversal', {
    teach: ['Level Order: return values level by level (BFS).', 'Use a queue. For each level, process exactly len(queue) nodes, collect their values, and enqueue their children.'],
    questions: [
      ch('Which structure does BFS use?', ['Queue', 'Stack', 'Heap', 'Hash set'], 0, 'First in, first out.'),
      ch('How do you separate levels?', ['Loop len(queue) times per level', 'Add a marker value', 'Sort', 'Recursion only'], 0, 'Snapshot the level size.'),
      ch('Tree 3 / (9, 20 / (15, 7)). Result?', ['[[3],[9,20],[15,7]]', '[[3,9,20],[15,7]]', '[[3],[20,9],[7,15]]', '[[9],[3],[20]]'], 0, 'Top to bottom, left to right.'),
    ],
  }),
  make('Binary Tree Right Side View', {
    teach: ['Right Side View: the values you see looking from the right.', 'Do a level order traversal and keep the LAST node of each level. (DFS visiting right first also works: take the first node at each new depth.)'],
    questions: [
      ch('From each level you keep?', ['The last (rightmost) node', 'The first node', 'The max', 'All nodes'], 0, 'It hides the others.'),
      ch('A left child can be visible when?', ['The right side is shorter there', 'Never', 'Always', 'Only at the root'], 0, 'If the right subtree is not deep enough.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(h)'], 0, 'Every node is visited.'),
    ],
  }),
  make('Construct Quad Tree', {
    teach: ['Construct Quad Tree: compress an n x n grid of 0s and 1s.', 'If the whole region is one value, make a leaf. Otherwise split into four quadrants (top-left, top-right, bottom-left, bottom-right) and recurse; the node is not a leaf.'],
    questions: [
      ch('When is a node a leaf?', ['The region is all one value', 'The region has size 1 only', 'It has no neighbors', 'Never'], 0, 'No need to split.'),
      ch('How many children does an internal node have?', ['4', '2', '3', '8'], 0, 'Four quadrants.'),
      ch('Technique?', ['Divide and conquer', 'Two pointers', 'Binary search', 'Sliding window'], 0, 'Split the grid recursively.'),
    ],
  }),
  make('Count Good Nodes In Binary Tree', {
    teach: ['A node is good if no node on its root path has a larger value.', 'DFS carrying the maximum value seen so far on the path. If node.val >= max, count it. Pass max(max, node.val) to the children.'],
    questions: [
      ch('What does DFS carry down?', ['Max value on the path so far', 'The depth', 'The parent', 'Sum'], 0, 'To compare with each node.'),
      ch('The root is?', ['Always good', 'Never good', 'Sometimes', 'Depends on k'], 0, 'No ancestors.'),
      ch('Condition for good?', ['node.val >= max_so_far', 'node.val > max_so_far', 'node.val < max_so_far', 'always'], 0, 'Equal still counts.'),
    ],
  }),
  make('Validate Binary Search Tree', {
    teach: ['Validate BST: every node must be within an allowed range, not just larger than its parent.', 'DFS with (low, high). Root range is (-inf, inf). Going left tightens high to node.val; going right tightens low. Strict inequalities.'],
    questions: [
      ch('Why not just compare with the parent?', ['A deep node can break an ancestor\'s rule', 'Speed', 'Memory', 'You can'], 0, 'The whole subtree must respect every ancestor.'),
      ch('Going left, the new bound is?', ['high = node.val', 'low = node.val', 'both', 'none'], 0, 'Left values must be smaller.'),
      ch('Alternative check?', ['Inorder is strictly increasing', 'Preorder is sorted', 'Height equal', 'Sum'], 0, 'BST inorder is sorted.'),
    ],
  }),
  make('Kth Smallest Element In a Bst', {
    teach: ['Kth smallest value in a BST.', 'Inorder gives sorted order. Traverse inorder (iteratively with a stack), count nodes, and stop at the kth.'],
    questions: [
      ch('Which traversal helps?', ['Inorder', 'Preorder', 'Postorder', 'Level order'], 0, 'It is sorted.'),
      ch('When can you stop early?', ['After visiting k nodes', 'Never', 'At the leaf', 'At the root'], 0, 'No need to traverse the rest.'),
      ch('Time complexity?', ['O(h + k)', 'O(n²)', 'O(1)', 'O(k²)'], 0, 'Walk down, then k steps.'),
    ],
  }),
  make('Construct Binary Tree From Preorder And Inorder Traversal', {
    teach: ['Rebuild a tree from its preorder and inorder lists.', 'The first preorder value is the root. Find it in inorder: everything left of it is the left subtree, everything right is the right subtree. Recurse; a value->index map makes the lookup O(1).'],
    questions: [
      ch('Which list gives the root?', ['First of preorder', 'Last of preorder', 'First of inorder', 'Middle of inorder'], 0, 'Preorder starts with the root.'),
      ch('What does inorder tell you?', ['Which values are left and right of the root', 'The depth', 'The height', 'Nothing'], 0, 'Split at the root\'s position.'),
      ch('Speed-up trick?', ['Hash map value -> inorder index', 'Sorting', 'Binary search', 'Stack'], 0, 'Avoid scanning to find the root.'),
    ],
  }),
  make('House Robber III', {
    teach: ['Houses form a tree. You cannot rob a parent and its child. Maximize the loot.', 'DFS returns two numbers for each node: (best if you rob this node, best if you skip it). Rob = val + skip(left) + skip(right). Skip = max(left pair) + max(right pair).'],
    questions: [
      ch('If you rob a node, the children?', ['Must be skipped', 'Must be robbed', 'Either', 'Are doubled'], 0, 'Adjacent houses alarm.'),
      ch('What does each DFS call return?', ['A (rob, skip) pair', 'One number', 'A list', 'A boolean'], 0, 'Both options for the subtree.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(2^n)', 'O(log n)'], 0, 'Each node once.'),
    ],
  }),
  make('Delete Leaves With a Given Value', {
    teach: ['Delete leaves equal to target; if a parent becomes a leaf with target, delete it too.', 'Postorder: fix the children first, then check the node: if it has no children now and val == target, return None.'],
    questions: [
      ch('Which traversal?', ['Postorder', 'Preorder', 'Inorder', 'Level order'], 0, 'Children are handled before the parent.'),
      ch('Why can parents disappear?', ['They become leaves after their children are removed', 'They are random', 'Never', 'By value only'], 0, 'Cascade upward.'),
      ch('Return value of the function?', ['The (possibly None) subtree root', 'Count', 'Boolean', 'Depth'], 0, 'The parent reassigns its children.'),
    ],
  }),
  make('Binary Tree Maximum Path Sum', {
    teach: ['Max path sum: any path between two nodes, values can be negative.', 'DFS returns the best downward path from a node: val + max(0, left, right). At each node also try the path through it: val + max(0, left) + max(0, right), and update the global best.'],
    questions: [
      ch('Why max(0, child)?', ['Ignore negative branches', 'Avoid overflow', 'Speed', 'No reason'], 0, 'Dropping a negative path is better.'),
      ch('What can a parent extend?', ['Only a single downward branch', 'Both branches', 'Any path', 'Nothing'], 0, 'A path cannot fork upward.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(h)'], 0, 'One DFS.'),
    ],
  }),
  make('Serialize And Deserialize Binary Tree', {
    teach: ['Turn a tree into a string and back.', 'Preorder with null markers: "1,2,N,N,3,4,N,N,5,N,N". Deserialize by reading values in the same order with an index/queue and recursing; N means no node.'],
    questions: [
      ch('Why include null markers?', ['To recover the exact shape', 'To save space', 'Sorting', 'Decoration'], 0, 'Preorder alone is ambiguous.'),
      ch('Another valid approach?', ['Level order (BFS) with nulls', 'Random order', 'Inorder only', 'Depth only'], 0, 'Both rebuild uniquely.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], 0, 'Visit each node once.'),
    ],
  }),
];
