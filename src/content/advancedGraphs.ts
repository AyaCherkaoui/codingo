import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const advancedGraphs: Lesson[] = [
  make('Path with Minimum Effort', {
    teach: ['Travel from top-left to bottom-right of a height grid. Effort of a path = largest height difference between consecutive cells. Minimize it.', 'Dijkstra where the "distance" to a cell is the max effort on the path so far. Use a min-heap on that value; new effort = max(current, |height diff|). Binary search + BFS also works.'],
    questions: [
      ch('Effort of a path is?', ['The max difference between adjacent steps', 'The sum of differences', 'Path length', 'Height at the end'], 0, 'Not a sum.'),
      ch('Dijkstra\'s priority is?', ['Max effort so far', 'Steps taken', 'Row index', 'Heights'], 0, 'Minimize the bottleneck.'),
      ch('New effort at a neighbor?', ['max(effort, diff)', 'effort + diff', 'diff', 'effort'], 0, 'Bottleneck path.'),
    ],
  }),
  make('Network Delay Time', {
    teach: ['Send a signal from node k through a directed weighted graph. How long until all nodes receive it (or -1)?', 'Dijkstra from k for shortest times to every node. The answer is the maximum shortest time; if some node is unreachable, return -1.'],
    questions: [
      ch('The answer is?', ['Max of the shortest distances', 'Sum of distances', 'Min distance', 'Edge count'], 0, 'The last node to receive it.'),
      ch('Why Dijkstra and not BFS?', ['Edges have different weights', 'Speed', 'Cycles', 'No reason'], 0, 'Weighted graph.'),
      ch('Dijkstra time with a heap?', ['O((V + E) log V)', 'O(V²) only', 'O(V + E)', 'O(E²)'], 0, 'Standard bound.'),
    ],
  }),
  make('Reconstruct Itinerary', {
    teach: ['Use every flight ticket exactly once, starting at "JFK", and return the lexicographically smallest itinerary.', 'This is an Eulerian path: Hierholzer\'s algorithm. Sort destinations; DFS taking the smallest unused edge; add the airport to the route AFTER exploring its edges, then reverse the result.'],
    questions: [
      ch('Every ticket is used?', ['Exactly once', 'At most once', 'Many times', 'Zero'], 0, 'An Eulerian path over edges.'),
      ch('Why reverse the route at the end?', ['Airports are added in post-order', 'Sorting', 'Looks nicer', 'No reason'], 0, 'Hierholzer builds it backwards.'),
      ch('Ties between destinations?', ['Pick the lexicographically smallest', 'Largest', 'Random', 'First seen'], 0, 'Problem requirement.'),
    ],
  }),
  make('Min Cost to Connect All Points', {
    teach: ['Connect all points with minimum total Manhattan distance.', 'Minimum Spanning Tree. Prim\'s with a heap (grow from one point) or Kruskal\'s with Union-Find over sorted edges. Stop after n - 1 edges.'],
    questions: [
      ch('This is a?', ['Minimum spanning tree problem', 'Shortest path problem', 'Topological sort', 'Cycle detection'], 0, 'Connect everything cheaply.'),
      ch('Edges in an MST of n points?', ['n - 1', 'n', 'n²', '2n'], 0, 'Tree.'),
      ch('Cost between points?', ['|x1 - x2| + |y1 - y2|', 'sqrt(dx² + dy²)', 'dx * dy', 'max(dx, dy)'], 0, 'Manhattan distance.'),
    ],
  }),
  make('Swim In Rising Water', {
    teach: ['Grid cell values are the time when water reaches them. Find the least time t to swim from top-left to bottom-right.', 'Dijkstra on the bottleneck: the cost to enter a cell is max(current time, cell value). Use a min-heap; answer when you pop the target. Binary search on t with BFS also works.'],
    questions: [
      ch('You can enter a cell when?', ['Time >= its value', 'Time == its value', 'Never', 'Time < its value'], 0, 'Water must have risen enough.'),
      ch('The path cost is?', ['Max cell value on the path', 'Sum of values', 'Number of cells', 'Last value'], 0, 'Bottleneck again.'),
      ch('Similar problem?', ['Path with Minimum Effort', 'Two Sum', 'LRU Cache', 'Valid Parentheses'], 0, 'Bottleneck shortest path.'),
    ],
  }),
  make('Alien Dictionary', {
    teach: ['Given words sorted in an alien language, derive the letter order.', 'Compare adjacent words; the first differing letter gives an edge a -> b (a before b). Topologically sort the letters. If there is a cycle (or a longer word precedes its own prefix), return "".'],
    questions: [
      ch('Which pairs give edges?', ['Adjacent words\' first differing letters', 'All letters', 'First letters only', 'Last letters'], 0, 'Only the first difference is informative.'),
      ch('Algorithm to order letters?', ['Topological sort', 'Binary search', 'Sorting by ASCII', 'Union-Find'], 0, 'Dependencies first.'),
      ch('["abc","ab"] is?', ['Invalid, return ""', 'Valid', 'Gives a->b', 'Gives b->a'], 0, 'A prefix must come first.'),
    ],
  }),
  make('Cheapest Flights Within K Stops', {
    teach: ['Find the cheapest price from src to dst with at most k stops.', 'Bellman-Ford limited to k + 1 rounds: relax all edges using the previous round\'s prices (copy the array each round). Or BFS/Dijkstra with state (node, stops).'],
    questions: [
      ch('Edges allowed at most?', ['k + 1', 'k', 'k - 1', 'n'], 0, 'k stops means k + 1 flights.'),
      ch('Why copy the price array each round?', ['Use only last round\'s values', 'Speed', 'Memory', 'No reason'], 0, 'Otherwise a round could use more than one new edge.'),
      ch('Why not plain Dijkstra?', ['Cheapest path may exceed k stops', 'Negative edges', 'Cycles', 'It works fine'], 0, 'Stops are a second constraint.'),
    ],
  }),
  make('Find Critical and Pseudo Critical Edges in Minimum Spanning Tree', {
    teach: ['Classify edges: critical (in every MST) and pseudo-critical (in some MST).', 'Compute the MST weight with Kruskal. For each edge: if excluding it raises the weight (or disconnects), it is critical. Otherwise, if forcing it in still gives the MST weight, it is pseudo-critical.'],
    questions: [
      ch('Critical edge means?', ['Removing it increases the MST weight', 'It is the heaviest', 'It is the lightest', 'It is in a cycle'], 0, 'Every MST needs it.'),
      ch('Pseudo-critical edge test?', ['Force it in; weight stays minimal', 'Remove it', 'Sort', 'Double it'], 0, 'It appears in some but not all MSTs.'),
      ch('Algorithm used for each trial?', ['Kruskal with Union-Find', 'BFS', 'DP', 'Binary search'], 0, 'Recompute the MST.'),
    ],
  }),
  make('Build a Matrix With Conditions', {
    teach: ['Place numbers 1..k in a k x k matrix satisfying "above/below" row conditions and "left/right" column conditions.', 'Two independent topological sorts: rows order from the row conditions, columns order from the column conditions. If either has a cycle return empty. Place number x at (rowIndex[x], colIndex[x]).'],
    questions: [
      ch('How many topological sorts?', ['2 (rows and columns)', '1', '3', 'k'], 0, 'Independent dimensions.'),
      ch('A cycle in either graph?', ['Return empty', 'Ignore', 'Pick randomly', 'Return zeros'], 0, 'Impossible.'),
      ch('Number x goes to?', ['(its row position, its column position)', '(x, x)', '(0, 0)', 'random'], 0, 'From the two orders.'),
    ],
  }),
  make('Greatest Common Divisor Traversal', {
    teach: ['Can you travel between every pair of indices where gcd(nums[i], nums[j]) > 1 (possibly through other indices)?', 'Union-Find on prime factors: union each number with each of its prime factors. At the end all numbers must be in one component. (Single element: true. Any 1 present with n > 1: false.)'],
    questions: [
      ch('Why union via prime factors?', ['Numbers sharing a prime have gcd > 1', 'Speed only', 'Sorting', 'No reason'], 0, 'Avoid comparing every pair.'),
      ch('A value of 1 (n > 1) means?', ['Answer is false', 'Answer is true', 'Ignore it', 'Union with 2'], 0, 'gcd(1, x) = 1.'),
      ch('The answer is true when?', ['All numbers end up in one component', 'All are prime', 'All are even', 'All are equal'], 0, 'Fully connected.'),
    ],
  }),
];
