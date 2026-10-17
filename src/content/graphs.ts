import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const graphs: Lesson[] = [
  make('Island Perimeter', {
    teach: ['Perimeter of the single island in a grid of 1s (land) and 0s (water).', 'Each land cell contributes 4 edges, minus 2 for every shared edge with a land neighbor (count right and down only). perimeter = 4 * land - 2 * shared.'],
    questions: [
      ch('A single land cell has perimeter?', ['4', '2', '1', '8'], 0, 'Four sides.', 'Draw one square and count its open sides.'),
      ch('Two adjacent land cells?', ['6', '8', '4', '5'], 0, '8 - 2 for the shared edge.', 'Joining two squares hides some sides. How many?'),
      ch('Time complexity?', ['O(m * n)', 'O(1)', 'O(m + n)', 'O(log n)'], 0, 'Scan the grid.', 'Look at every cell once; no search needed.'),
      bug('Find the bug in the perimeter count', ['land = shared = 0', 'for r in range(m):', '    for c in range(n):', '        if grid[r][c] == 1:', '            land += 1', '            if r > 0 and grid[r - 1][c] == 1: shared += 1', '            if c > 0 and grid[r][c - 1] == 1: shared += 1', 'return 4 * land - shared'], 7, 'Each shared edge hides one side of BOTH cells, so subtract 2 * shared.', 'Check how many sides one shared edge removes.'),
    ],
  }),
  make('Verifying An Alien Dictionary', {
    teach: ['Are words sorted according to an alien alphabet order?', 'Map each letter to its rank. Compare each adjacent pair: find the first differing letter and check rank order. If one word is a prefix of the other, the shorter must come first.'],
    questions: [
      ch('How to compare letters fast?', ['A letter -> rank map', 'Sorting each word', 'Binary search', 'Stack'], 0, 'O(1) rank lookup.', 'Think about what lookup makes comparing two letters instant.'),
      ch('"apple" before "app" is?', ['Invalid (prefix must come first)', 'Valid', 'Depends', 'Equal'], 0, 'The shorter prefix comes first.', 'Compare the shorter word against the longer when it is a prefix.'),
      ch('You only need to compare?', ['Adjacent pairs', 'All pairs', 'First and last', 'None'], 0, 'Sorted order is transitive.', 'If each neighbor pair is ordered, what about the rest?'),
      bug('Find the bug in the pair comparison', ['rank = {c: i for i, c in enumerate(order)}', 'for a, b in zip(words, words[1:]):', '    for i in range(len(a)):', '        if i == len(b): return False', '        if a[i] != b[i]:', '            if rank[a[i]] < rank[b[i]]: return False', '            break', 'return True'], 5, 'A pair is out of order when a letter has the HIGHER rank in the first word: rank[a[i]] > rank[b[i]].', 'Which direction of rank comparison means the words are unsorted?'),
    ],
  }),
  make('Find the Town Judge', {
    teach: ['Town judge: trusts nobody, and everyone else trusts them. Find them.', 'Compute trust score per person: +1 for each person who trusts them, -1 for each person they trust. The judge has score n - 1.'],
    questions: [
      ch('The judge\'s score?', ['n - 1', '0', 'n', '1'], 0, 'Trusted by all others, trusts nobody.', 'Picture arrows between people. What does the judge have?'),
      ch('If nobody has score n - 1?', ['Return -1', 'Return 0', 'Return 1', 'Error'], 0, 'No judge.', 'What if nobody trusts anybody?'),
      ch('This is like tracking?', ['In-degree minus out-degree', 'Shortest paths', 'Cycles', 'Components'], 0, 'Graph degrees.', 'Count arrows coming in and going out.'),
      bl('Fill in the blank', 'score = [0] * (n + 1)\nfor a, b in trust:\n    score[a] -= 1\n    score[b] ___ 1\nfor i in range(1, n + 1):\n    if score[i] == n - 1:\n        return i\nreturn -1', ['+=', '-=', '*='], '+=', 'The person being trusted gains a point; the truster loses one.', 'Think about who gets trusted in the pair (a, b).'),
    ],
  }),
  make('Number of Islands', {
    teach: ['Count islands (groups of connected 1s, 4-directional).', 'Scan every cell. When you find an unvisited 1, count one island and flood-fill it with DFS/BFS (mark cells as visited) so you do not count it again.'],
    questions: [
      ch('Why flood fill?', ['Mark the whole island as visited', 'Count cells', 'Sorting', 'Find the largest'], 0, 'Avoid recounting.', 'What happens if you count the same island twice?'),
      ch('Neighbors considered?', ['Up, down, left, right', 'All 8 directions', 'Only right', 'Diagonals only'], 0, 'Standard 4-direction.', 'Which neighbors share an edge with a cell?'),
      ch('Time complexity?', ['O(m * n)', 'O(m + n)', 'O(2^n)', 'O(log n)'], 0, 'Each cell visited once.', 'How many times is each cell touched overall?'),
      bug('Find the bug in the flood fill guard', ['def dfs(r, c):', '    if r < 0 or c < 0 or r > m or c > n or grid[r][c] != "1":', '        return', '    grid[r][c] = "0"', '    dfs(r + 1, c)', '    dfs(r - 1, c)', '    dfs(r, c + 1)', '    dfs(r, c - 1)'], 1, 'Valid indices stop at m - 1 and n - 1, so the bounds check needs r >= m and c >= n or it can index out of range.', 'Check the largest valid row and column index.'),
    ],
  }),
  make('Max Area of Island', {
    teach: ['The area (cell count) of the largest island.', 'Same as Number of Islands, but DFS returns the size: 1 + sum of the sizes of the 4 neighbors. Track the maximum across islands.'],
    questions: [
      ch('DFS returns?', ['The area of the island found', 'A boolean', 'A coordinate', 'Nothing'], 0, '1 + neighbors.', 'What does a recursive call hand back to its caller?'),
      ch('A water cell contributes?', ['0', '1', '-1', '2'], 0, 'Base case.', 'What stops the recursion at water or edges?'),
      ch('How do you avoid revisits?', ['Set the cell to 0 or use a visited set', 'Ignore', 'Sort', 'Recursion depth'], 0, 'Mark visited.', 'You need a way to not count a cell twice.'),
      bl('Fill in the blank', 'def dfs(r, c):\n    if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == 0:\n        return 0\n    grid[r][c] = 0\n    return 1 + dfs(r + 1, c) + ___ + dfs(r, c + 1) + dfs(r, c - 1)', ['dfs(r - 1, c)', 'dfs(r, c)', 'dfs(r + 1, c + 1)'], 'dfs(r - 1, c)', 'All four neighbors are explored; the up neighbor is missing.', 'Which of the four directions is not yet listed?'),
    ],
  }),
  make('Clone Graph', {
    teach: ['Deep copy a connected undirected graph.', 'DFS/BFS with a hash map old node -> new node. When you reach a node: if already cloned return the clone; else create it, store it, then clone all neighbors.'],
    questions: [
      ch('What does the map prevent?', ['Infinite loops and duplicate clones', 'Sorting', 'Overflow', 'Nothing'], 0, 'Graphs have cycles.', 'Graphs can loop back to a node you already saw.'),
      ch('Map stores?', ['old node -> new node', 'value -> index', 'node -> degree', 'node -> parent'], 0, 'Link originals to copies.', 'You need to find a copy given its original.'),
      ch('Time complexity?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(V)'], 0, 'Visit each node and edge.', 'Count each node and each edge once.'),
      bug('Find the bug in the clone DFS', ['def dfs(node):', '    if node in clones: return clones[node]', '    copy = Node(node.val)', '    for nei in node.neighbors:', '        copy.neighbors.append(dfs(nei))', '    clones[node] = copy', '    return copy'], 5, 'Register the copy in the map BEFORE visiting neighbors, or cycles cause infinite recursion.', 'When must a node be recorded so cycles can find it?'),
    ],
  }),
  make('Walls And Gates', {
    teach: ['Fill each empty room with its distance to the nearest gate (0). Walls are -1.', 'Multi-source BFS: put all gates in the queue at distance 0, then expand level by level, setting distances for unvisited rooms.'],
    questions: [
      ch('Where does BFS start?', ['From all gates at once', 'From each room', 'From walls', 'From one gate'], 0, 'Multi-source.', 'Where would you start if distance comes from the nearest gate?'),
      ch('Why BFS?', ['Gives shortest distance in an unweighted graph', 'Less memory', 'Sorting', 'No reason'], 0, 'Level = distance.', 'Which traversal expands in rings of equal distance?'),
      ch('Time complexity?', ['O(m * n)', 'O((m * n)²)', 'O(gates)', 'O(1)'], 0, 'Each cell is processed once.', 'Does any cell get enqueued twice?'),
      bl('Fill in the blank', 'while q:\n    r, c = q.popleft()\n    for dr, dc in dirs:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == ___:\n            rooms[nr][nc] = rooms[r][c] + 1\n            q.append((nr, nc))', ['INF', '0', '-1'], 'INF', 'Only unvisited empty rooms (still INF) get a distance; this also acts as the visited check.', 'Which value marks a room that has not been reached yet?'),
    ],
  }),
  make('Rotting Oranges', {
    teach: ['Fresh oranges rot when adjacent to a rotten one each minute. How many minutes until none are fresh (or -1)?', 'Multi-source BFS from all rotten oranges, one minute per level. Count fresh oranges; if any remain at the end, return -1.'],
    questions: [
      ch('Each BFS level equals?', ['One minute', 'One orange', 'One row', 'One cell'], 0, 'Simultaneous spreading.', 'What do all oranges do at the same moment?'),
      ch('When is the answer -1?', ['Fresh oranges remain unreachable', 'No rotten oranges', 'Grid is square', 'Never'], 0, 'Some fresh ones are isolated.', 'Think about what stays in the grid at the end.'),
      ch('All oranges already rotten?', ['0 minutes', '1 minute', '-1', 'Infinity'], 0, 'Nothing to do.', 'What if there is nothing to rot?'),
      ord('Order the BFS loop', ['while q and fresh > 0:', '    for _ in range(len(q)):', '        r, c = q.popleft()', '        # rot fresh neighbors, fresh -= 1, enqueue them', '    minutes += 1', 'return minutes if fresh == 0 else -1'], 'Process the whole current level, then add one minute; unreachable fresh oranges give -1.', true, 'The minute counter changes after a full level is processed.'),
    ],
  }),
  make('Pacific Atlantic Water Flow', {
    teach: ['Which cells can flow to both the Pacific (top/left edges) and Atlantic (bottom/right edges)? Water flows to equal or lower cells.', 'Reverse thinking: DFS/BFS from the ocean edges going UPHILL (>=). Collect cells reachable from the Pacific and from the Atlantic; answer is the intersection.'],
    questions: [
      ch('Why search from the oceans inward?', ['One search per ocean instead of per cell', 'Looks simpler', 'Rules', 'No reason'], 0, 'Avoids O((mn)²).', 'Doing a search from every cell is expensive.'),
      ch('Moving inland you can go to cells that are?', ['Equal or higher', 'Strictly lower', 'Any', 'Equal only'], 0, 'Reverse of downhill flow.', 'Reverse the direction of flow.'),
      ch('The answer is?', ['Pacific set ∩ Atlantic set', 'Union', 'Pacific only', 'Edges'], 0, 'Reaches both.', 'A cell must satisfy both oceans.'),
      bug('Find the bug in the uphill DFS', ['def dfs(r, c, seen):', '    seen.add((r, c))', '    for dr, dc in dirs:', '        nr, nc = r + dr, c + dc', '        if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in seen and heights[nr][nc] <= heights[r][c]:', '            dfs(nr, nc, seen)'], 4, 'Searching inward from the ocean must go uphill or level: heights[nr][nc] >= heights[r][c].', 'Which way does the comparison point when moving away from the ocean?'),
    ],
  }),
  make('Surrounded Regions', {
    teach: ['Capture every region of O surrounded by X (flip to X). Regions touching the border are safe.', 'Mark border-connected O cells (DFS from border O cells) as safe. Then flip all remaining O to X and restore the safe ones.'],
    questions: [
      ch('Which O cells survive?', ['Those connected to a border O', 'Those in the middle', 'All', 'None'], 0, 'They cannot be surrounded.', 'Which regions can never be fully enclosed?'),
      ch('First step?', ['DFS from border O cells', 'Flip everything', 'Sort', 'Count'], 0, 'Mark safe cells.', 'Start from the border, not the middle.'),
      ch('Why mark temporarily (e.g., "S")?', ['To distinguish safe O from capturable O', 'Speed', 'Memory', 'No reason'], 0, 'Restore after flipping.', 'You need a third marker besides O and X.'),
      ord('Order the steps', ['Mark border-connected O cells as S with DFS', 'Flip every remaining O to X', 'Turn every S back to O'], 'Only O cells not reachable from the border are captured; S protects the safe ones until the end.', false, 'Protect the safe cells before flipping anything.'),
    ],
  }),
  make('Open The Lock', {
    teach: ['A 4-wheel lock starts at "0000". Each move turns one wheel by one (wrapping 9 <-> 0). Avoid dead-end codes. Fewest moves to target?', 'BFS over states. Each state has 8 neighbors. Skip deadends and visited states. Number of BFS levels = answer.'],
    questions: [
      ch('Neighbors per state?', ['8', '4', '10', '2'], 0, '4 wheels x 2 directions.', 'Each turn changes one wheel by one step.'),
      ch('Why BFS?', ['Shortest number of moves', 'Less memory', 'Sorting', 'Recursion'], 0, 'Unweighted shortest path.', 'Each step costs the same, so which search finds the fewest?'),
      ch('If "0000" is a deadend?', ['Return -1', 'Return 0', 'Continue', 'Return 1'], 0, 'You cannot even start.', 'Check the starting state first.'),
      bl('Fill in the blank', 'for i in range(4):\n    for d in (1, -1):\n        digit = (int(cur[i]) + d) ___ 10\n        nxt = cur[:i] + str(digit) + cur[i + 1:]', ['%', '//', '+'], '%', 'Modulo 10 makes 9 + 1 wrap to 0 and 0 - 1 wrap to 9.', 'Which operator wraps a number around a fixed range?'),
    ],
  }),
  make('Course Schedule', {
    teach: ['Can you finish all courses given prerequisite pairs (a needs b)?', 'Build a directed graph and detect a cycle. DFS with three states (unvisited, visiting, done) or Kahn\'s algorithm with in-degrees: if you can process all courses, there is no cycle.'],
    questions: [
      ch('Impossible when?', ['The graph has a cycle', 'There are no prerequisites', 'n is large', 'Never'], 0, 'Circular dependency.', 'What would make a prerequisite chain impossible?'),
      ch('Kahn\'s algorithm starts with?', ['Courses with in-degree 0', 'Courses with most edges', 'Random', 'Last course'], 0, 'No prerequisites.', 'Who can be taken first?'),
      ch('Time complexity?', ['O(V + E)', 'O(V²)', 'O(E²)', 'O(V)'], 0, 'Each node and edge once.', 'Each node and edge is handled once.'),
      bug('Find the bug in the Kahn setup', ['for a, b in prereqs:', '    adj[b].append(a)', '    indeg[b] += 1', 'q = deque(i for i in range(n) if indeg[i] == 0)', 'done = 0', 'while q:', '    x = q.popleft()', '    done += 1', '    for y in adj[x]:', '        indeg[y] -= 1', '        if indeg[y] == 0: q.append(y)', 'return done == n'], 2, 'The edge is b -> a, so the course that gains an in-degree is a, not b.', 'Which course has to wait on the other?'),
    ],
  }),
  make('Course Schedule II', {
    teach: ['Return a valid order to take the courses (or empty if impossible).', 'Topological sort. Kahn: repeatedly take a course with in-degree 0 and append it; reduce neighbors\' in-degrees. If you output fewer than n courses, there is a cycle.'],
    questions: [
      ch('Order is produced by?', ['Topological sort', 'Binary search', 'Sorting names', 'DP'], 0, 'Dependencies first.', 'What kind of ordering puts dependencies first?'),
      ch('Fewer than n courses output means?', ['A cycle exists', 'Done', 'Disconnected', 'Error in input'], 0, 'Some never reach in-degree 0.', 'What goes wrong if some courses are never processed?'),
      ch('Can several orders be valid?', ['Yes', 'No'], 0, 'Any valid topological order works.', 'Think about whether the order is unique.'),
      bl('Fill in the blank', 'order = []\nwhile q:\n    x = q.popleft()\n    order.append(x)\n    for y in adj[x]:\n        indeg[y] -= 1\n        if indeg[y] == 0:\n            q.append(y)\nreturn order if len(order) == ___ else []', ['numCourses', 'len(prereqs)', '0'], 'numCourses', 'A valid order must contain every course, otherwise a cycle blocked some.', 'How many courses must appear in a complete order?'),
    ],
  }),
  make('Graph Valid Tree', {
    teach: ['Do n nodes and the given undirected edges form a valid tree?', 'A tree has exactly n - 1 edges and is connected (no cycles). Check edges == n - 1, then verify connectivity with DFS/BFS or Union-Find (no edge joins already connected nodes).'],
    questions: [
      ch('A tree with n nodes has how many edges?', ['n - 1', 'n', 'n + 1', '2n'], 0, 'Connected and acyclic.', 'Count edges before doing any search.'),
      ch('Fewer than n - 1 edges means?', ['Not connected', 'A cycle', 'Valid', 'Impossible'], 0, 'Some node is isolated.', 'What does too few edges imply about connectivity?'),
      ch('Union-Find cycle check?', ['An edge joins nodes already in the same set', 'Two sets merge', 'A set is empty', 'None'], 0, 'That edge closes a cycle.', 'Think about an edge between two nodes already linked.'),
      bl('Fill in the blank', 'seen = set()\ndfs(0)\nreturn len(seen) == ___', ['n', 'len(edges)', '1'], 'n', 'After the edge count check, a tree must be connected: DFS from node 0 reaches all n nodes.', 'How many nodes must the search reach?'),
    ],
  }),
  make('Course Schedule IV', {
    teach: ['Answer queries: is course u a (direct or indirect) prerequisite of v?', 'Compute reachability. Floyd-Warshall style: reach[i][j] |= reach[i][k] and reach[k][j]. Or DFS/BFS from each node and store reachable sets.'],
    questions: [
      ch('Indirect prerequisite means?', ['A path exists from u to v', 'A direct edge only', 'Same level', 'No path'], 0, 'Transitive closure.', 'Think of it as reachability between every pair.'),
      ch('Precomputing helps because?', ['Each query becomes O(1)', 'Sorting', 'Memory', 'No reason'], 0, 'Lookup in a table.', 'Do the work once, answer many queries.'),
      ch('Floyd-Warshall time?', ['O(n³)', 'O(n)', 'O(n²)', 'O(n log n)'], 0, 'Three nested loops.', 'Count the nested loops.'),
      bl('Fill in the blank', 'for ___ in range(n):\n    for i in range(n):\n        for j in range(n):\n            reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j])', ['k', 'i', 'j'], 'k', 'The intermediate node k must be the OUTERMOST loop in Floyd-Warshall so paths through earlier nodes are complete.', 'Which variable is the in-between node?'),
    ],
  }),
  make('Number of Connected Components In An Undirected Graph', {
    teach: ['Count connected components given n nodes and edges.', 'Union-Find: start with n components; for each edge, if the endpoints are in different sets, union them and decrement the count. (DFS flood fill also works.)'],
    questions: [
      ch('Start with how many components?', ['n', '1', '0', 'edges'], 0, 'Every node alone.', 'Before any edge, what is each node?'),
      ch('A successful union does what to the count?', ['Decreases by 1', 'Increases by 1', 'Nothing', 'Resets'], 0, 'Two sets became one.', 'What changes when two sets merge?'),
      ch('Two optimizations of Union-Find?', ['Path compression and union by rank', 'Sorting and hashing', 'BFS and DFS', 'None'], 0, 'Near O(1) per operation.', 'Speed up the find operation.'),
      bl('Fill in the blank', 'def find(x):\n    if parent[x] != x:\n        parent[x] = ___\n    return parent[x]', ['find(parent[x])', 'parent[x]', 'x'], 'find(parent[x])', 'Path compression points x directly at its root, flattening the tree for later finds.', 'Recurse to the root and store the result.'),
    ],
  }),
  make('Redundant Connection', {
    teach: ['A tree had one extra edge added. Find that edge (the last one that forms a cycle).', 'Union-Find over edges in order. The first edge whose endpoints are already connected is the redundant one.'],
    questions: [
      ch('Which edge is redundant?', ['One joining already-connected nodes', 'The first edge', 'The longest', 'Random'], 0, 'It closes a cycle.', 'Which edge would close a loop?'),
      ch('Why process edges in order?', ['To return the last valid answer', 'Speed', 'Sorting', 'No reason'], 0, 'The problem asks for the latest one.', 'Which edge does the problem ask for if several qualify?'),
      ch('Time complexity?', ['O(n α(n)) ≈ O(n)', 'O(n²)', 'O(n log n)', 'O(2^n)'], 0, 'Union-Find is almost constant.', 'Think about Union-Find speed.'),
      bug('Find the bug in the Union-Find merge', ['parent = list(range(n + 1))', 'def find(x):', '    while parent[x] != x: x = parent[x]', '    return x', 'for a, b in edges:', '    ra, rb = find(a), find(b)', '    if ra == rb: return [a, b]', '    parent[ra] = a'], 7, 'Link ROOTS together: parent[ra] = rb. Setting it to a, which may not be a root, breaks the sets.', 'What should one root point to when merging?'),
    ],
  }),
  make('Accounts Merge', {
    teach: ['Merge accounts that share at least one email.', 'Union-Find on emails (or accounts): union all emails of one account together. Then group emails by root, sort each group, and attach the account name.'],
    questions: [
      ch('Two accounts share an email. Result?', ['They merge into one', 'Stay separate', 'Delete one', 'Error'], 0, 'Same person.', 'What links two accounts together?'),
      ch('Do names identify people?', ['No, only shared emails do', 'Yes', 'Sometimes', 'Always'], 0, 'Different people may share a name.', 'Is a name a safe identifier?'),
      ch('Final step per group?', ['Sort the emails', 'Reverse them', 'Hash them', 'Drop duplicates only'], 0, 'Output requires sorted emails.', 'Look at the output requirements.'),
      ord('Order the steps', ['Union all emails inside each account', 'Map each email to its root', 'Group emails by root', 'Sort each group and add the account name'], 'Union first, then group by component root, then format each merged account.', false, 'Connect first, then group, then format.'),
    ],
  }),
  make('Evaluate Division', {
    teach: ['Given equations like a / b = 2.0, answer queries like a / c.', 'Build a weighted graph: edge a -> b weight 2.0, b -> a weight 1/2.0. For a query, DFS/BFS from numerator to denominator multiplying weights along the path. No path means -1.0.'],
    questions: [
      ch('a / b = 2. Reverse edge b -> a has weight?', ['0.5', '2', '-2', '1'], 0, '1 / 2.', 'Each equation works in both directions.'),
      ch('Path weights are?', ['Multiplied', 'Added', 'Subtracted', 'Averaged'], 0, 'a/b * b/c = a/c.', 'What operation chains a/b and b/c?'),
      ch('Unknown variable in a query?', ['-1.0', '0', '1', 'error'], 0, 'Cannot be determined.', 'What if a variable never appeared?'),
      bug('Find the bug in the query DFS', ['def dfs(cur, target, seen):', '    if cur == target: return 1.0', '    seen.add(cur)', '    for nxt, w in graph[cur]:', '        if nxt not in seen:', '            r = dfs(nxt, target, seen)', '            if r != -1.0: return w + r', '    return -1.0'], 6, 'Ratios along a path multiply: return w * r.', 'How do you combine a/b with b/c?'),
    ],
  }),
  make('Minimum Height Trees', {
    teach: ['Choose a root so the tree height is minimal. Return all such roots (1 or 2).', 'Trim leaves layer by layer (like topological sort on degrees). The last remaining 1 or 2 nodes are the centers = answer roots.'],
    questions: [
      ch('How many answer roots can there be?', ['1 or 2', 'Exactly 1', 'Up to n', '3'], 0, 'The center of a tree.', 'A tree has a middle; what is it close to?'),
      ch('Algorithm?', ['Peel off leaves until 1-2 nodes remain', 'Try every root with BFS only', 'Sort degrees', 'DP'], 0, 'Work inward.', 'Which nodes are farthest from the center?'),
      ch('n = 1 ->', ['[0]', '[]', '[1]', '[0,1]'], 0, 'The only node.', 'Handle the tiniest tree separately.'),
      bl('Fill in the blank', 'while n > 2:\n    n -= len(leaves)\n    new = []\n    for leaf in leaves:\n        nei = adj[leaf].pop()\n        adj[nei].remove(leaf)\n        if len(adj[nei]) == ___:\n            new.append(nei)\n    leaves = new\nreturn leaves', ['1', '0', '2'], '1', 'A node becomes a new leaf when exactly one neighbor remains.', 'What degree does a leaf have?'),
    ],
  }),
  make('Word Ladder', {
    teach: ['Transform beginWord to endWord changing one letter at a time, each step a word in the list. Shortest sequence length?', 'BFS over words. For each word try replacing each position with a-z (or use wildcard patterns like h*t); if the new word is in the set and unvisited, enqueue it.'],
    questions: [
      ch('Why BFS?', ['Shortest transformation', 'Less memory', 'Sorting', 'DFS fails always'], 0, 'Levels = steps.', 'Words are nodes, one-letter changes are edges.'),
      ch('Two words are neighbors if?', ['They differ by exactly one letter', 'They share a letter', 'Same length', 'Sorted'], 0, 'One change per step.', 'What defines a neighbor?'),
      ch('If endWord is not in the list?', ['0 (impossible)', '1', '-1', 'infinite'], 0, 'Return 0.', 'Check the word list before searching.'),
      bl('Fill in the blank', 'for i in range(len(word)):\n    for c in "abcdefghijklmnopqrstuvwxyz":\n        nxt = word[:i] + ___ + word[i + 1:]\n        if nxt in words and nxt not in seen:\n            seen.add(nxt)\n            q.append((nxt, steps + 1))', ['c', 'word[i]', 'i'], 'c', 'Replace position i with each candidate letter c to generate every one-letter neighbor.', 'Which variable holds the trial letter?'),
    ],
  }),
];
