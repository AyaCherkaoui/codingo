import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const advancedGraphs: Lesson[] = [
  make('Path with Minimum Effort', {
    teach: ['Travel from top-left to bottom-right of a height grid. Effort of a path = largest height difference between consecutive cells. Minimize it.', 'Dijkstra where the "distance" to a cell is the max effort on the path so far. Use a min-heap on that value; new effort = max(current, |height diff|). Binary search + BFS also works.'],
    questions: [
      ch('Effort of a path is?', ['The max difference between adjacent steps', 'The sum of differences', 'Path length', 'Height at the end'], 0, 'Not a sum.', 'Is the effort a sum or something else?'),
      ch('Dijkstra\'s priority is?', ['Max effort so far', 'Steps taken', 'Row index', 'Heights'], 0, 'Minimize the bottleneck.', 'What should the heap pop first?'),
      ch('New effort at a neighbor?', ['max(effort, diff)', 'effort + diff', 'diff', 'effort'], 0, 'Bottleneck path.', 'How do you combine the old effort with one step?'),
      bl('Fill in the blank', 'cost, r, c = heapq.heappop(heap)\nif cost ___ dist[r][c]:\n    continue', ['>', '<', '=='], '>', 'Skip stale heap entries: a better cost for this cell was already found.', 'When is a popped entry outdated?'),
    ],
  }),
  make('Network Delay Time', {
    teach: ['Send a signal from node k through a directed weighted graph. How long until all nodes receive it (or -1)?', 'Dijkstra from k for shortest times to every node. The answer is the maximum shortest time; if some node is unreachable, return -1.'],
    questions: [
      ch('The answer is?', ['Max of the shortest distances', 'Sum of distances', 'Min distance', 'Edge count'], 0, 'The last node to receive it.', 'The signal travels along many paths at once.'),
      ch('Why Dijkstra and not BFS?', ['Edges have different weights', 'Speed', 'Cycles', 'No reason'], 0, 'Weighted graph.', 'Are all edges the same length?'),
      ch('Dijkstra time with a heap?', ['O((V + E) log V)', 'O(V²) only', 'O(V + E)', 'O(E²)'], 0, 'Standard bound.', 'Think about the heap-based cost.'),
      bug('Find the bug in the Dijkstra push', ['dist = {}', 'heap = [(0, k)]', 'while heap:', '    d, u = heapq.heappop(heap)', '    if u in dist: continue', '    dist[u] = d', '    for v, w in graph[u]:', '        heapq.heappush(heap, (w, v))', 'return max(dist.values()) if len(dist) == n else -1'], 7, 'The priority must be the total distance so far: (d + w, v).', 'What distance should a neighbor be queued with?'),
    ],
  }),
  make('Reconstruct Itinerary', {
    teach: ['Use every flight ticket exactly once, starting at "JFK", and return the lexicographically smallest itinerary.', 'This is an Eulerian path: Hierholzer\'s algorithm. Sort destinations; DFS taking the smallest unused edge; add the airport to the route AFTER exploring its edges, then reverse the result.'],
    questions: [
      ch('Every ticket is used?', ['Exactly once', 'At most once', 'Many times', 'Zero'], 0, 'An Eulerian path over edges.', 'Each ticket is an edge to use once.'),
      ch('Why reverse the route at the end?', ['Airports are added in post-order', 'Sorting', 'Looks nicer', 'No reason'], 0, 'Hierholzer builds it backwards.', 'When is an airport finalized in the route?'),
      ch('Ties between destinations?', ['Pick the lexicographically smallest', 'Largest', 'Random', 'First seen'], 0, 'Problem requirement.', 'Think about the order of the final list.'),
      ord('Order the Hierholzer solution', ['for a, b in sorted(tickets, reverse=True): graph[a].append(b)', 'route = []', 'def dfs(a):', '    while graph[a]:', '        dfs(graph[a].pop())', '    route.append(a)', 'dfs("JFK")', 'return route[::-1]'], 'Edges are sorted descending so pop gives the smallest; airports are appended after exploring, so reverse at the end.', true, 'Build the graph, define the DFS, run it, then fix the order.'),
    ],
  }),
  make('Min Cost to Connect All Points', {
    teach: ['Connect all points with minimum total Manhattan distance.', 'Minimum Spanning Tree. Prim\'s with a heap (grow from one point) or Kruskal\'s with Union-Find over sorted edges. Stop after n - 1 edges.'],
    questions: [
      ch('This is a?', ['Minimum spanning tree problem', 'Shortest path problem', 'Topological sort', 'Cycle detection'], 0, 'Connect everything cheaply.', 'You want the cheapest way to link everything.'),
      ch('Edges in an MST of n points?', ['n - 1', 'n', 'n²', '2n'], 0, 'Tree.', 'How many connections make everything one piece?'),
      ch('Cost between points?', ['|x1 - x2| + |y1 - y2|', 'sqrt(dx² + dy²)', 'dx * dy', 'max(dx, dy)'], 0, 'Manhattan distance.', 'Which distance formula does the problem use?'),
      bug('Find the bug in Prim\'s loop', ['visited = set()', 'heap = [(0, 0)]', 'total = 0', 'while len(visited) < n:', '    cost, i = heapq.heappop(heap)', '    total += cost', '    if i in visited: continue', '    visited.add(i)', '    for j in range(n):', '        if j not in visited:', '            d = abs(pts[i][0] - pts[j][0]) + abs(pts[i][1] - pts[j][1])', '            heapq.heappush(heap, (d, j))'], 5, 'Add the cost only after confirming the point is new; otherwise stale entries inflate the total.', 'When should a popped cost count toward the total?'),
    ],
  }),
  make('Swim In Rising Water', {
    teach: ['Grid cell values are the time when water reaches them. Find the least time t to swim from top-left to bottom-right.', 'Dijkstra on the bottleneck: the cost to enter a cell is max(current time, cell value). Use a min-heap; answer when you pop the target. Binary search on t with BFS also works.'],
    questions: [
      ch('You can enter a cell when?', ['Time >= its value', 'Time == its value', 'Never', 'Time < its value'], 0, 'Water must have risen enough.', 'You must wait until the water is high enough.'),
      ch('The path cost is?', ['Max cell value on the path', 'Sum of values', 'Number of cells', 'Last value'], 0, 'Bottleneck again.', 'Is the cost a sum or a worst value?'),
      ch('Similar problem?', ['Path with Minimum Effort', 'Two Sum', 'LRU Cache', 'Valid Parentheses'], 0, 'Bottleneck shortest path.', 'Compare with another grid problem you solved.'),
      bug('Find the bug in the swim DFS', ['heap = [(grid[0][0], 0, 0)]', 'seen = {(0, 0)}', 'while heap:', '    t, r, c = heapq.heappop(heap)', '    if (r, c) == (n - 1, n - 1): return t', '    for nr, nc in neighbors(r, c):', '        if (nr, nc) not in seen:', '            seen.add((nr, nc))', '            heapq.heappush(heap, (grid[nr][nc], nr, nc))'], 8, 'The time to enter a cell is max(t, grid[nr][nc]); otherwise the path time can go backwards.', 'Can you arrive earlier than the water level you already waited for?'),
    ],
  }),
  make('Alien Dictionary', {
    teach: ['Given words sorted in an alien language, derive the letter order.', 'Compare adjacent words; the first differing letter gives an edge a -> b (a before b). Topologically sort the letters. If there is a cycle (or a longer word precedes its own prefix), return "".'],
    questions: [
      ch('Which pairs give edges?', ['Adjacent words\' first differing letters', 'All letters', 'First letters only', 'Last letters'], 0, 'Only the first difference is informative.', 'Which letters of two neighbor words tell you anything?'),
      ch('Algorithm to order letters?', ['Topological sort', 'Binary search', 'Sorting by ASCII', 'Union-Find'], 0, 'Dependencies first.', 'You need an order that respects dependencies.'),
      ch('["abc","ab"] is?', ['Invalid, return ""', 'Valid', 'Gives a->b', 'Gives b->a'], 0, 'A prefix must come first.', 'Check prefixes before comparing letters.'),
      bl('Fill in the blank', 'if x != y:\n    if y ___ adj[x]:\n        adj[x].add(y)\n        indeg[y] += 1\n    break', ['not in', 'in', '=='], 'not in', 'Duplicate edges would increase indeg again while adj (a set) keeps one copy, so Kahn would never free y.', 'Add the edge only the first time you see it.'),
    ],
  }),
  make('Cheapest Flights Within K Stops', {
    teach: ['Find the cheapest price from src to dst with at most k stops.', 'Bellman-Ford limited to k + 1 rounds: relax all edges using the previous round\'s prices (copy the array each round). Or BFS/Dijkstra with state (node, stops).'],
    questions: [
      ch('Edges allowed at most?', ['k + 1', 'k', 'k - 1', 'n'], 0, 'k stops means k + 1 flights.', 'How many flights does k stops allow?'),
      ch('Why copy the price array each round?', ['Use only last round\'s values', 'Speed', 'Memory', 'No reason'], 0, 'Otherwise a round could use more than one new edge.', 'Why can one round only use one new flight?'),
      ch('Why not plain Dijkstra?', ['Cheapest path may exceed k stops', 'Negative edges', 'Cycles', 'It works fine'], 0, 'Stops are a second constraint.', 'A cheaper path might use too many stops.'),
      bl('Fill in the blank', 'for _ in range(k + 1):\n    tmp = prices[:]\n    for u, v, w in flights:\n        if prices[u] != INF and prices[u] + w < tmp[v]:\n            tmp[v] = ___\n    prices = tmp', ['prices[u] + w', 'tmp[u] + w', 'w'], 'prices[u] + w', 'Relax using the previous round (prices), and write into tmp, so each round adds one flight.', 'Which array holds last round values?'),
    ],
  }),
  make('Find Critical and Pseudo Critical Edges in Minimum Spanning Tree', {
    teach: ['Classify edges: critical (in every MST) and pseudo-critical (in some MST).', 'Compute the MST weight with Kruskal. For each edge: if excluding it raises the weight (or disconnects), it is critical. Otherwise, if forcing it in still gives the MST weight, it is pseudo-critical.'],
    questions: [
      ch('Critical edge means?', ['Removing it increases the MST weight', 'It is the heaviest', 'It is the lightest', 'It is in a cycle'], 0, 'Every MST needs it.', 'First get a baseline weight.'),
      ch('Pseudo-critical edge test?', ['Force it in; weight stays minimal', 'Remove it', 'Sort', 'Double it'], 0, 'It appears in some but not all MSTs.', 'Remove an edge: what happens to the cost?'),
      ch('Algorithm used for each trial?', ['Kruskal with Union-Find', 'BFS', 'DP', 'Binary search'], 0, 'Recompute the MST.', 'Force an edge: what should the cost do?'),
      ord('Order the classification', ['Compute base = MST weight with Kruskal', 'For edge i, rebuild the MST skipping it', 'If weight > base or the graph is disconnected: critical', 'Else rebuild the MST forcing edge i first', 'If weight == base: pseudo-critical'], 'Exclusion test first (critical), then the inclusion test for the remaining edges.', false, 'Test removal before testing forced inclusion.'),
    ],
  }),
  make('Build a Matrix With Conditions', {
    teach: ['Place numbers 1..k in a k x k matrix satisfying "above/below" row conditions and "left/right" column conditions.', 'Two independent topological sorts: rows order from the row conditions, columns order from the column conditions. If either has a cycle return empty. Place number x at (rowIndex[x], colIndex[x]).'],
    questions: [
      ch('How many topological sorts?', ['2 (rows and columns)', '1', '3', 'k'], 0, 'Independent dimensions.', 'Rows and columns are independent problems.'),
      ch('A cycle in either graph?', ['Return empty', 'Ignore', 'Pick randomly', 'Return zeros'], 0, 'Impossible.', 'What if a dependency loops back?'),
      ch('Number x goes to?', ['(its row position, its column position)', '(x, x)', '(0, 0)', 'random'], 0, 'From the two orders.', 'Positions come from the two orders.'),
      bl('Fill in the blank', 'row_pos = {x: i for i, x in enumerate(row_order)}\ncol_pos = {x: i for i, x in enumerate(col_order)}\nres = [[0] * k for _ in range(k)]\nfor x in range(1, k + 1):\n    res[row_pos[x]][___] = x', ['col_pos[x]', 'row_pos[x]', 'x'], 'col_pos[x]', 'Row index comes from the row order and column index from the column order.', 'Which map gives the column position?'),
    ],
  }),
  make('Greatest Common Divisor Traversal', {
    teach: ['Can you travel between every pair of indices where gcd(nums[i], nums[j]) > 1 (possibly through other indices)?', 'Union-Find on prime factors: union each number with each of its prime factors. At the end all numbers must be in one component. (Single element: true. Any 1 present with n > 1: false.)'],
    questions: [
      ch('Why union via prime factors?', ['Numbers sharing a prime have gcd > 1', 'Speed only', 'Sorting', 'No reason'], 0, 'Avoid comparing every pair.', 'Which shared number makes gcd greater than 1?'),
      ch('A value of 1 (n > 1) means?', ['Answer is false', 'Answer is true', 'Ignore it', 'Union with 2'], 0, 'gcd(1, x) = 1.', 'What does gcd with 1 always equal?'),
      ch('The answer is true when?', ['All numbers end up in one component', 'All are prime', 'All are even', 'All are equal'], 0, 'Fully connected.', 'Think about the final component count.'),
      bl('Fill in the blank', 'for num in nums:\n    x = num\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            union(num, d)\n            while x % d == 0:\n                x //= d\n        d += 1\n    if x > 1:\n        union(num, ___)', ['x', 'd', 'num // d'], 'x', 'After removing small factors, any leftover x > 1 is itself a prime factor of num.', 'What value is left after dividing out the small primes?'),
    ],
  }),
];
