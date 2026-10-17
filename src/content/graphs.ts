import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const graphs: Lesson[] = [
  make('Island Perimeter', {
    teach: ['Perimeter of the single island in a grid of 1s (land) and 0s (water).', 'Each land cell contributes 4 edges, minus 2 for every shared edge with a land neighbor (count right and down only). perimeter = 4 * land - 2 * shared.'],
    questions: [
      ch('A single land cell has perimeter?', ['4', '2', '1', '8'], 0, 'Four sides.'),
      ch('Two adjacent land cells?', ['6', '8', '4', '5'], 0, '8 - 2 for the shared edge.'),
      ch('Time complexity?', ['O(m * n)', 'O(1)', 'O(m + n)', 'O(log n)'], 0, 'Scan the grid.'),
    ],
  }),
  make('Verifying An Alien Dictionary', {
    teach: ['Are words sorted according to an alien alphabet order?', 'Map each letter to its rank. Compare each adjacent pair: find the first differing letter and check rank order. If one word is a prefix of the other, the shorter must come first.'],
    questions: [
      ch('How to compare letters fast?', ['A letter -> rank map', 'Sorting each word', 'Binary search', 'Stack'], 0, 'O(1) rank lookup.'),
      ch('"apple" before "app" is?', ['Invalid (prefix must come first)', 'Valid', 'Depends', 'Equal'], 0, 'The shorter prefix comes first.'),
      ch('You only need to compare?', ['Adjacent pairs', 'All pairs', 'First and last', 'None'], 0, 'Sorted order is transitive.'),
    ],
  }),
  make('Find the Town Judge', {
    teach: ['Town judge: trusts nobody, and everyone else trusts them. Find them.', 'Compute trust score per person: +1 for each person who trusts them, -1 for each person they trust. The judge has score n - 1.'],
    questions: [
      ch('The judge\'s score?', ['n - 1', '0', 'n', '1'], 0, 'Trusted by all others, trusts nobody.'),
      ch('If nobody has score n - 1?', ['Return -1', 'Return 0', 'Return 1', 'Error'], 0, 'No judge.'),
      ch('This is like tracking?', ['In-degree minus out-degree', 'Shortest paths', 'Cycles', 'Components'], 0, 'Graph degrees.'),
    ],
  }),
  make('Number of Islands', {
    teach: ['Count islands (groups of connected 1s, 4-directional).', 'Scan every cell. When you find an unvisited 1, count one island and flood-fill it with DFS/BFS (mark cells as visited) so you do not count it again.'],
    questions: [
      ch('Why flood fill?', ['Mark the whole island as visited', 'Count cells', 'Sorting', 'Find the largest'], 0, 'Avoid recounting.'),
      ch('Neighbors considered?', ['Up, down, left, right', 'All 8 directions', 'Only right', 'Diagonals only'], 0, 'Standard 4-direction.'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(2^n)', 'O(log n)'], 0, 'Each cell visited once.'),
    ],
  }),
  make('Max Area of Island', {
    teach: ['The area (cell count) of the largest island.', 'Same as Number of Islands, but DFS returns the size: 1 + sum of the sizes of the 4 neighbors. Track the maximum across islands.'],
    questions: [
      ch('DFS returns?', ['The area of the island found', 'A boolean', 'A coordinate', 'Nothing'], 0, '1 + neighbors.'),
      ch('A water cell contributes?', ['0', '1', '-1', '2'], 0, 'Base case.'),
      ch('How do you avoid revisits?', ['Set the cell to 0 or use a visited set', 'Ignore', 'Sort', 'Recursion depth'], 0, 'Mark visited.'),
    ],
  }),
  make('Clone Graph', {
    teach: ['Deep copy a connected undirected graph.', 'DFS/BFS with a hash map old node -> new node. When you reach a node: if already cloned return the clone; else create it, store it, then clone all neighbors.'],
    questions: [
      ch('What does the map prevent?', ['Infinite loops and duplicate clones', 'Sorting', 'Overflow', 'Nothing'], 0, 'Graphs have cycles.'),
      ch('Map stores?', ['old node -> new node', 'value -> index', 'node -> degree', 'node -> parent'], 0, 'Link originals to copies.'),
      ch('Time complexity?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(V)'], 0, 'Visit each node and edge.'),
    ],
  }),
  make('Walls And Gates', {
    teach: ['Fill each empty room with its distance to the nearest gate (0). Walls are -1.', 'Multi-source BFS: put all gates in the queue at distance 0, then expand level by level, setting distances for unvisited rooms.'],
    questions: [
      ch('Where does BFS start?', ['From all gates at once', 'From each room', 'From walls', 'From one gate'], 0, 'Multi-source.'),
      ch('Why BFS?', ['Gives shortest distance in an unweighted graph', 'Less memory', 'Sorting', 'No reason'], 0, 'Level = distance.'),
      ch('Time complexity?', ['O(m * n)', 'O((m * n)²)', 'O(gates)', 'O(1)'], 0, 'Each cell is processed once.'),
    ],
  }),
  make('Rotting Oranges', {
    teach: ['Fresh oranges rot when adjacent to a rotten one each minute. How many minutes until none are fresh (or -1)?', 'Multi-source BFS from all rotten oranges, one minute per level. Count fresh oranges; if any remain at the end, return -1.'],
    questions: [
      ch('Each BFS level equals?', ['One minute', 'One orange', 'One row', 'One cell'], 0, 'Simultaneous spreading.'),
      ch('When is the answer -1?', ['Fresh oranges remain unreachable', 'No rotten oranges', 'Grid is square', 'Never'], 0, 'Some fresh ones are isolated.'),
      ch('All oranges already rotten?', ['0 minutes', '1 minute', '-1', 'Infinity'], 0, 'Nothing to do.'),
    ],
  }),
  make('Pacific Atlantic Water Flow', {
    teach: ['Which cells can flow to both the Pacific (top/left edges) and Atlantic (bottom/right edges)? Water flows to equal or lower cells.', 'Reverse thinking: DFS/BFS from the ocean edges going UPHILL (>=). Collect cells reachable from the Pacific and from the Atlantic; answer is the intersection.'],
    questions: [
      ch('Why search from the oceans inward?', ['One search per ocean instead of per cell', 'Looks simpler', 'Rules', 'No reason'], 0, 'Avoids O((mn)²).'),
      ch('Moving inland you can go to cells that are?', ['Equal or higher', 'Strictly lower', 'Any', 'Equal only'], 0, 'Reverse of downhill flow.'),
      ch('The answer is?', ['Pacific set ∩ Atlantic set', 'Union', 'Pacific only', 'Edges'], 0, 'Reaches both.'),
    ],
  }),
  make('Surrounded Regions', {
    teach: ['Capture every region of O surrounded by X (flip to X). Regions touching the border are safe.', 'Mark border-connected O cells (DFS from border O cells) as safe. Then flip all remaining O to X and restore the safe ones.'],
    questions: [
      ch('Which O cells survive?', ['Those connected to a border O', 'Those in the middle', 'All', 'None'], 0, 'They cannot be surrounded.'),
      ch('First step?', ['DFS from border O cells', 'Flip everything', 'Sort', 'Count'], 0, 'Mark safe cells.'),
      ch('Why mark temporarily (e.g., "S")?', ['To distinguish safe O from capturable O', 'Speed', 'Memory', 'No reason'], 0, 'Restore after flipping.'),
    ],
  }),
  make('Open The Lock', {
    teach: ['A 4-wheel lock starts at "0000". Each move turns one wheel by one (wrapping 9 <-> 0). Avoid dead-end codes. Fewest moves to target?', 'BFS over states. Each state has 8 neighbors. Skip deadends and visited states. Number of BFS levels = answer.'],
    questions: [
      ch('Neighbors per state?', ['8', '4', '10', '2'], 0, '4 wheels x 2 directions.'),
      ch('Why BFS?', ['Shortest number of moves', 'Less memory', 'Sorting', 'Recursion'], 0, 'Unweighted shortest path.'),
      ch('If "0000" is a deadend?', ['Return -1', 'Return 0', 'Continue', 'Return 1'], 0, 'You cannot even start.'),
    ],
  }),
  make('Course Schedule', {
    teach: ['Can you finish all courses given prerequisite pairs (a needs b)?', 'Build a directed graph and detect a cycle. DFS with three states (unvisited, visiting, done) or Kahn\'s algorithm with in-degrees: if you can process all courses, there is no cycle.'],
    questions: [
      ch('Impossible when?', ['The graph has a cycle', 'There are no prerequisites', 'n is large', 'Never'], 0, 'Circular dependency.'),
      ch('Kahn\'s algorithm starts with?', ['Courses with in-degree 0', 'Courses with most edges', 'Random', 'Last course'], 0, 'No prerequisites.'),
      ch('Time complexity?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(V)'], 0, 'Each node and edge once.'),
    ],
  }),
  make('Course Schedule II', {
    teach: ['Return a valid order to take the courses (or empty if impossible).', 'Topological sort. Kahn: repeatedly take a course with in-degree 0 and append it; reduce neighbors\' in-degrees. If you output fewer than n courses, there is a cycle.'],
    questions: [
      ch('Order is produced by?', ['Topological sort', 'Binary search', 'Sorting names', 'DP'], 0, 'Dependencies first.'),
      ch('Fewer than n courses output means?', ['A cycle exists', 'Done', 'Disconnected', 'Error in input'], 0, 'Some never reach in-degree 0.'),
      ch('Can several orders be valid?', ['Yes', 'No'], 0, 'Any valid topological order works.'),
    ],
  }),
  make('Graph Valid Tree', {
    teach: ['Do n nodes and the given undirected edges form a valid tree?', 'A tree has exactly n - 1 edges and is connected (no cycles). Check edges == n - 1, then verify connectivity with DFS/BFS or Union-Find (no edge joins already connected nodes).'],
    questions: [
      ch('A tree with n nodes has how many edges?', ['n - 1', 'n', 'n + 1', '2n'], 0, 'Connected and acyclic.'),
      ch('Fewer than n - 1 edges means?', ['Not connected', 'A cycle', 'Valid', 'Impossible'], 0, 'Some node is isolated.'),
      ch('Union-Find cycle check?', ['An edge joins nodes already in the same set', 'Two sets merge', 'A set is empty', 'None'], 0, 'That edge closes a cycle.'),
    ],
  }),
  make('Course Schedule IV', {
    teach: ['Answer queries: is course u a (direct or indirect) prerequisite of v?', 'Compute reachability. Floyd-Warshall style: reach[i][j] |= reach[i][k] and reach[k][j]. Or DFS/BFS from each node and store reachable sets.'],
    questions: [
      ch('Indirect prerequisite means?', ['A path exists from u to v', 'A direct edge only', 'Same level', 'No path'], 0, 'Transitive closure.'),
      ch('Precomputing helps because?', ['Each query becomes O(1)', 'Sorting', 'Memory', 'No reason'], 0, 'Lookup in a table.'),
      ch('Floyd-Warshall time?', ['O(n³)', 'O(n)', 'O(n²)', 'O(n log n)'], 0, 'Three nested loops.'),
    ],
  }),
  make('Number of Connected Components In An Undirected Graph', {
    teach: ['Count connected components given n nodes and edges.', 'Union-Find: start with n components; for each edge, if the endpoints are in different sets, union them and decrement the count. (DFS flood fill also works.)'],
    questions: [
      ch('Start with how many components?', ['n', '1', '0', 'edges'], 0, 'Every node alone.'),
      ch('A successful union does what to the count?', ['Decreases by 1', 'Increases by 1', 'Nothing', 'Resets'], 0, 'Two sets became one.'),
      ch('Two optimizations of Union-Find?', ['Path compression and union by rank', 'Sorting and hashing', 'BFS and DFS', 'None'], 0, 'Near O(1) per operation.'),
    ],
  }),
  make('Redundant Connection', {
    teach: ['A tree had one extra edge added. Find that edge (the last one that forms a cycle).', 'Union-Find over edges in order. The first edge whose endpoints are already connected is the redundant one.'],
    questions: [
      ch('Which edge is redundant?', ['One joining already-connected nodes', 'The first edge', 'The longest', 'Random'], 0, 'It closes a cycle.'),
      ch('Why process edges in order?', ['To return the last valid answer', 'Speed', 'Sorting', 'No reason'], 0, 'The problem asks for the latest one.'),
      ch('Time complexity?', ['O(n α(n)) ≈ O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'], 0, 'Union-Find is almost constant.'),
    ],
  }),
  make('Accounts Merge', {
    teach: ['Merge accounts that share at least one email.', 'Union-Find on emails (or accounts): union all emails of one account together. Then group emails by root, sort each group, and attach the account name.'],
    questions: [
      ch('Two accounts share an email. Result?', ['They merge into one', 'Stay separate', 'Delete one', 'Error'], 0, 'Same person.'),
      ch('Do names identify people?', ['No, only shared emails do', 'Yes', 'Sometimes', 'Always'], 0, 'Different people may share a name.'),
      ch('Final step per group?', ['Sort the emails', 'Reverse them', 'Hash them', 'Drop duplicates only'], 0, 'Output requires sorted emails.'),
    ],
  }),
  make('Evaluate Division', {
    teach: ['Given equations like a / b = 2.0, answer queries like a / c.', 'Build a weighted graph: edge a -> b weight 2.0, b -> a weight 1/2.0. For a query, DFS/BFS from numerator to denominator multiplying weights along the path. No path means -1.0.'],
    questions: [
      ch('a / b = 2. Reverse edge b -> a has weight?', ['0.5', '2', '-2', '1'], 0, '1 / 2.'),
      ch('Path weights are?', ['Multiplied', 'Added', 'Subtracted', 'Averaged'], 0, 'a/b * b/c = a/c.'),
      ch('Unknown variable in a query?', ['-1.0', '0', '1', 'error'], 0, 'Cannot be determined.'),
    ],
  }),
  make('Minimum Height Trees', {
    teach: ['Choose a root so the tree height is minimal. Return all such roots (1 or 2).', 'Trim leaves layer by layer (like topological sort on degrees). The last remaining 1 or 2 nodes are the centers = answer roots.'],
    questions: [
      ch('How many answer roots can there be?', ['1 or 2', 'Exactly 1', 'Up to n', '3'], 0, 'The center of a tree.'),
      ch('Algorithm?', ['Peel off leaves until 1-2 nodes remain', 'Try every root with BFS only', 'Sort degrees', 'DP'], 0, 'Work inward.'),
      ch('n = 1 ->', ['[0]', '[]', '[1]', '[0,1]'], 0, 'The only node.'),
    ],
  }),
  make('Word Ladder', {
    teach: ['Transform beginWord to endWord changing one letter at a time, each step a word in the list. Shortest sequence length?', 'BFS over words. For each word try replacing each position with a-z (or use wildcard patterns like h*t); if the new word is in the set and unvisited, enqueue it.'],
    questions: [
      ch('Why BFS?', ['Shortest transformation', 'Less memory', 'Sorting', 'DFS fails always'], 0, 'Levels = steps.'),
      ch('Two words are neighbors if?', ['They differ by exactly one letter', 'They share a letter', 'Same length', 'Sorted'], 0, 'One change per step.'),
      ch('If endWord is not in the list?', ['0 (impossible)', '1', '-1', 'infinite'], 0, 'Return 0.'),
    ],
  }),
];
