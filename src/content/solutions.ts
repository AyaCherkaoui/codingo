// Reference code for lessons whose questions have no fill-in-the-blank, so every lesson can end with a coding task.
//  FIXES: the corrected version of the buggy line in the lesson's "tap the bug" question (learner types the fix).
//         at/span (optional) = replace `span` lines starting at line `at` (default: the buggy line, 1 line).
//  SOLUTIONS: a reference snippet; `key` is the line the learner types (or the whole snippet in later lessons).
import { slug } from './curriculum';

export type Fix = string | { fix: string; at?: number; span?: number };
const F: Record<string, Fix> = {
  'Top K Frequent Elements': 'buckets = [[] for _ in range(len(nums) + 1)]',
  'Valid Sudoku': 'box = (r // 3) * 3 + c // 3',
  'First Missing Positive': 'nums[i], nums[j - 1] = nums[j - 1], nums[i]',
  'Valid Palindrome': 'if s[l].lower() != s[r].lower(): return False',
  'Merge Sorted Array': 'if i >= 0 and nums1[i] > nums2[j]:',
  '3Sum': 'if i > 0 and nums[i] == nums[i - 1]: continue',
  'Rotate Array': 'nums[k:] = nums[k:][::-1]',
  'Trapping Rain Water': 'water += lm - h[l]',
  'Longest Repeating Character Replacement': 'count[s[l]] -= 1',
  'Find K Closest Elements': 'r = mid',
  'Guess Number Higher Or Lower': 'elif res == -1: r = mid - 1',
  'Capacity to Ship Packages Within D Days': 'if cur + w > cap:',
  'Search In Rotated Sorted Array': 'if nums[mid] < target <= nums[r]: l = mid + 1',
  'Find in Mountain Array': 'if arr[mid] < arr[mid + 1]: l = mid + 1',
  'Design Circular Queue': 'self.q[(self.head + self.size) % self.k] = v',
  'Valid Parentheses': 'if not stack or stack.pop() != pairs[c]: return False',
  'Implement Queue using Stacks': { fix: 'if not self.out:\n    while self.inn:\n        self.out.append(self.inn.pop())', span: 2 },
  'Online Stock Span': { fix: 'span += stack.pop()[1]', span: 2 },
  'Decode String': 'cur = prev + cur * k',
  'Invert Binary Tree': 'root.left, root.right = right, left',
  'Balanced Binary Tree': 'return 1 + max(l, r)',
  'Subtree of Another Tree': 'return isSubtree(root.left, sub) or isSubtree(root.right, sub)',
  'Delete Node in a BST': 'succ = root.right',
  'Binary Tree Level Order Traversal': 'node = q.popleft()',
  'Validate Binary Search Tree': 'if not (lo < n.val < hi): return False',
  'Delete Leaves With a Given Value': { fix: 'root.left = remove(root.left, t)\nroot.right = remove(root.right, t)\nif not root.left and not root.right and root.val == t: return None', span: 3 },
  'Binary Tree Maximum Path Sum': 'l, r = max(0, dfs(n.left)), max(0, dfs(n.right))',
  'Implement Trie Prefix Tree': 'return True',
  'Combination Sum II': 'if i > start and nums[i] == nums[i - 1]: continue',
  'Permutations': 'used[i] = False',
  'Word Search': 'board[r][c] = word[i]',
  'Last Stone Weight': 'heapq.heappush(h, a - b)',
  'Island Perimeter': 'return 4 * land - 2 * shared',
  'Verifying An Alien Dictionary': 'if rank[a[i]] > rank[b[i]]: return False',
  'Number of Islands': 'if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != "1":',
  'Clone Graph': { fix: 'clones[node] = copy\nfor nei in node.neighbors:\n    copy.neighbors.append(dfs(nei))', at: 3, span: 3 },
  'Pacific Atlantic Water Flow': 'if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in seen and heights[nr][nc] >= heights[r][c]:',
  'Course Schedule': 'indeg[a] += 1',
  'Redundant Connection': 'parent[ra] = rb',
  'Evaluate Division': 'if r != -1.0: return w * r',
  'Network Delay Time': 'heapq.heappush(heap, (d + w, v))',
  'Min Cost to Connect All Points': { fix: 'if i in visited: continue\ntotal += cost', span: 2 },
  'Swim In Rising Water': 'heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))',
  'Min Cost Climbing Stairs': 'return min(a, b)',
  'House Robber II': 'return max(rob(nums[1:]), rob(nums[:-1]))',
  'Palindromic Substrings': 'l, r = c // 2, c // 2 + c % 2',
  'Coin Change': 'dp[a] = min(dp[a], dp[a - c] + 1)',
  'Combination Sum IV': { fix: 'for t in range(target + 1):\n    for n in nums:\n        if t >= n: dp[t] += dp[t - n]', span: 3 },
  'Stone Game III': 'best = max(best, take - dp[i + k])',
  'Longest Common Subsequence': 'dp[i][j] = dp[i-1][j-1] + 1',
  'Coin Change II': { fix: 'for c in coins:\n    for a in range(c, amount + 1):\n        dp[a] += dp[a - c]', span: 3 },
  'Interleaving String': 'if j and dp[i][j-1] and s2[j-1] == s3[i+j-1]: dp[i][j] = True',
  'Edit Distance': 'else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])',
  'Maximum Sum Circular Subarray': 'best_min = min(best_min, cur_min)',
  'Jump Game': 'farthest = max(farthest, i + n)',
  'Gas Station': 'start = i + 1',
  'Merge Triplets to Form Target Triplet': 'if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]: continue',
  'Valid Parenthesis String': 'if hi < 0: return False',
  'Merge Intervals': 'res[-1][1] = max(res[-1][1], e)',
  'Meeting Rooms': 'if intervals[i][0] < intervals[i-1][1]:',
  'Minimum Interval to Include Each Query': 'l, r = intervals[i]; heappush(h, (r - l + 1, r)); i += 1',
  'Counting Bits': 'bits[i] = bits[i >> 1] + (i & 1)',
  'Add Binary': 'res.append(str(total % 2)); carry = total // 2',
  'Sum of Two Integers': 'a = (a ^ b) & mask',
  'Reverse Integer': 'x //= 10',
  'Greatest Common Divisor of Strings': 'g = gcd(len(str1), len(str2))',
  'Rotate Image': 'for j in range(i + 1, n):',
  'Plus One': 'if d[i] < 9:',
  'Multiply Strings': 'res[i + j + 1] %= 10',
};

export type Solution = { code: string; key: string };
const S: Record<string, Solution> = {
  'Minimum Window Substring': { key: 'if need[ch] > 0: missing -= 1', code: `need = Counter(t)
missing = len(t)
l = 0
best = (0, float("inf"))
for r, ch in enumerate(s):
    if need[ch] > 0: missing -= 1
    need[ch] -= 1
    if missing == 0:
        while need[s[l]] < 0:
            need[s[l]] += 1
            l += 1
        if r - l < best[1] - best[0]: best = (l, r)
        need[s[l]] += 1
        missing += 1
        l += 1
return "" if best[1] == float("inf") else s[best[0]:best[1] + 1]` },
  'Reverse Nodes In K Group': { key: 'cur.next, p, cur = p, cur, cur.next', code: `dummy = ListNode(0, head)
prev = dummy
while True:
    kth = prev
    for _ in range(k):
        kth = kth.next
        if not kth: return dummy.next
    nxt = kth.next
    cur, p = prev.next, nxt
    while cur is not nxt:
        cur.next, p, cur = p, cur, cur.next
    first = prev.next
    prev.next = kth
    prev = first` },
  'Binary Tree Preorder Traversal': { key: 'stack.append(node.right)', code: `res, stack = [], [root]
while stack:
    node = stack.pop()
    if not node: continue
    res.append(node.val)
    stack.append(node.right)
    stack.append(node.left)
return res` },
  'Construct Quad Tree': { key: 'if all(grid[i][j] == v for i in range(r, r + n) for j in range(c, c + n)):', code: `def build(r, c, n):
    v = grid[r][c]
    if all(grid[i][j] == v for i in range(r, r + n) for j in range(c, c + n)):
        return Node(v == 1, True)
    h = n // 2
    return Node(True, False, build(r, c, h), build(r, c + h, h),
                build(r + h, c, h), build(r + h, c + h, h))` },
  'Construct Binary Tree From Preorder And Inorder Traversal': { key: 'root.left = build(l, m - 1)', code: `pos = {v: i for i, v in enumerate(inorder)}
pre = iter(preorder)
def build(l, r):
    if l > r: return None
    root = TreeNode(next(pre))
    m = pos[root.val]
    root.left = build(l, m - 1)
    root.right = build(m + 1, r)
    return root
return build(0, len(inorder) - 1)` },
  'Combination Sum': { key: 'dfs(i, path, total + nums[i])', code: `res = []
def dfs(i, path, total):
    if total == target: res.append(path[:]); return
    if total > target or i == len(nums): return
    path.append(nums[i])
    dfs(i, path, total + nums[i])
    path.pop()
    dfs(i + 1, path, total)
dfs(0, [], 0)
return res` },
  'Combinations': { key: 'dfs(x + 1, path)', code: `res = []
def dfs(start, path):
    if len(path) == k: res.append(path[:]); return
    for x in range(start, n + 1):
        path.append(x)
        dfs(x + 1, path)
        path.pop()
dfs(1, [])
return res` },
  'Subsets II': { key: 'if i > start and nums[i] == nums[i - 1]: continue', code: `nums.sort()
res = []
def dfs(start, path):
    res.append(path[:])
    for i in range(start, len(nums)):
        if i > start and nums[i] == nums[i - 1]: continue
        path.append(nums[i])
        dfs(i + 1, path)
        path.pop()
dfs(0, [])
return res` },
  'Permutations II': { key: 'if used[i] or (i > 0 and nums[i] == nums[i - 1] and not used[i - 1]): continue', code: `nums.sort()
res, used = [], [False] * len(nums)
def dfs(path):
    if len(path) == len(nums): res.append(path[:]); return
    for i in range(len(nums)):
        if used[i] or (i > 0 and nums[i] == nums[i - 1] and not used[i - 1]): continue
        used[i] = True; path.append(nums[i])
        dfs(path)
        path.pop(); used[i] = False
dfs([])
return res` },
  'Palindrome Partitioning': { key: 'if part == part[::-1]:', code: `res = []
def dfs(start, path):
    if start == len(s): res.append(path[:]); return
    for end in range(start + 1, len(s) + 1):
        part = s[start:end]
        if part == part[::-1]:
            path.append(part); dfs(end, path); path.pop()
dfs(0, [])
return res` },
  'Matchsticks to Square': { key: 'if sides[j] + matchsticks[i] <= side:', code: `total = sum(matchsticks)
if total % 4: return False
side = total // 4
matchsticks.sort(reverse=True)
sides = [0] * 4
def dfs(i):
    if i == len(matchsticks): return all(x == side for x in sides)
    for j in range(4):
        if sides[j] + matchsticks[i] <= side:
            sides[j] += matchsticks[i]
            if dfs(i + 1): return True
            sides[j] -= matchsticks[i]
    return False
return dfs(0)` },
  'Partition to K Equal Sum Subsets': { key: 'if buckets[j] + nums[i] > target or buckets[j] in seen: continue', code: `total = sum(nums)
if total % k: return False
target = total // k
nums.sort(reverse=True)
buckets = [0] * k
def dfs(i):
    if i == len(nums): return True
    seen = set()
    for j in range(k):
        if buckets[j] + nums[i] > target or buckets[j] in seen: continue
        seen.add(buckets[j])
        buckets[j] += nums[i]
        if dfs(i + 1): return True
        buckets[j] -= nums[i]
    return False
return dfs(0)` },
  'N Queens II': { key: 'if c in cols or r - c in d1 or r + c in d2: continue', code: `cols, d1, d2 = set(), set(), set()
def dfs(r):
    if r == n: return 1
    count = 0
    for c in range(n):
        if c in cols or r - c in d1 or r + c in d2: continue
        cols.add(c); d1.add(r - c); d2.add(r + c)
        count += dfs(r + 1)
        cols.remove(c); d1.remove(r - c); d2.remove(r + c)
    return count
return dfs(0)` },
  'Word Break II': { key: 'if s[i:j] in words:', code: `words = set(wordDict)
memo = {}
def dfs(i):
    if i == len(s): return [""]
    if i in memo: return memo[i]
    res = []
    for j in range(i + 1, len(s) + 1):
        if s[i:j] in words:
            for rest in dfs(j):
                res.append(s[i:j] + (" " + rest if rest else ""))
    memo[i] = res
    return res
return dfs(0)` },
  'K Closest Points to Origin': { key: 'heapq.heappush(heap, (-d, x, y))', code: `heap = []
for x, y in points:
    d = x * x + y * y
    heapq.heappush(heap, (-d, x, y))
    if len(heap) > k: heapq.heappop(heap)
return [[x, y] for _, x, y in heap]` },
  'Task Scheduler': { key: 'cnt = heapq.heappop(heap) + 1', code: `count = Counter(tasks)
heap = [-c for c in count.values()]
heapq.heapify(heap)
time = 0
queue = deque()
while heap or queue:
    time += 1
    if heap:
        cnt = heapq.heappop(heap) + 1
        if cnt: queue.append((cnt, time + n))
    if queue and queue[0][1] == time:
        heapq.heappush(heap, queue.popleft()[0])
return time` },
  'Design Twitter': { key: 'for t, tid in self.tweets[u][-10:]:', code: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)
        self.follows = defaultdict(set)
    def postTweet(self, userId, tweetId):
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1
    def getNewsFeed(self, userId):
        heap = []
        for u in self.follows[userId] | {userId}:
            for t, tid in self.tweets[u][-10:]:
                heapq.heappush(heap, (t, tid))
                if len(heap) > 10: heapq.heappop(heap)
        return [tid for t, tid in sorted(heap, reverse=True)]` },
  'Single Threaded CPU': { key: 'if not heap and i < len(tasks) and t < tasks[i][0]: t = tasks[i][0]', code: `tasks = sorted((e, p, i) for i, (e, p) in enumerate(tasks))
res, heap, t, i = [], [], 0, 0
while len(res) < len(tasks):
    if not heap and i < len(tasks) and t < tasks[i][0]: t = tasks[i][0]
    while i < len(tasks) and tasks[i][0] <= t:
        heapq.heappush(heap, (tasks[i][1], tasks[i][2])); i += 1
    p, idx = heapq.heappop(heap)
    t += p
    res.append(idx)
return res` },
  'Reorganize String': { key: 'if prev[0] < 0: heapq.heappush(heap, prev)', code: `heap = [(-c, ch) for ch, c in Counter(s).items()]
heapq.heapify(heap)
res, prev = [], (0, "")
while heap:
    c, ch = heapq.heappop(heap)
    res.append(ch)
    if prev[0] < 0: heapq.heappush(heap, prev)
    prev = (c + 1, ch)
out = "".join(res)
return out if len(out) == len(s) else ""` },
  'Longest Happy String': { key: 'if len(res) >= 2 and res[-1] == res[-2] == ch:', code: `heap = [(-n, ch) for n, ch in ((a, "a"), (b, "b"), (c, "c")) if n]
heapq.heapify(heap)
res = []
while heap:
    cnt, ch = heapq.heappop(heap)
    if len(res) >= 2 and res[-1] == res[-2] == ch:
        if not heap: break
        cnt2, ch2 = heapq.heappop(heap)
        res.append(ch2)
        if cnt2 + 1: heapq.heappush(heap, (cnt2 + 1, ch2))
        heapq.heappush(heap, (cnt, ch))
    else:
        res.append(ch)
        if cnt + 1: heapq.heappush(heap, (cnt + 1, ch))
return "".join(res)` },
  'Car Pooling': { key: 'diff[end] -= n', code: `diff = [0] * 1001
for n, start, end in trips:
    diff[start] += n
    diff[end] -= n
load = 0
for d in diff:
    load += d
    if load > capacity: return False
return True` },
  'IPO': { key: 'w -= heapq.heappop(heap)', code: `projects = sorted(zip(capital, profits))
heap, i = [], 0
for _ in range(k):
    while i < len(projects) and projects[i][0] <= w:
        heapq.heappush(heap, -projects[i][1]); i += 1
    if not heap: break
    w -= heapq.heappop(heap)
return w` },
  'Surrounded Regions': { key: 'if r in (0, m - 1) or c in (0, n - 1): mark(r, c)', code: `def mark(r, c):
    if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != "O": return
    board[r][c] = "T"
    mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1)
for r in range(m):
    for c in range(n):
        if r in (0, m - 1) or c in (0, n - 1): mark(r, c)
for r in range(m):
    for c in range(n):
        if board[r][c] == "O": board[r][c] = "X"
        elif board[r][c] == "T": board[r][c] = "O"` },
  'Accounts Merge': { key: 'parent[find(email)] = find(acc[1])', code: `parent = {}
def find(x):
    parent.setdefault(x, x)
    if parent[x] != x: parent[x] = find(parent[x])
    return parent[x]
owner = {}
for acc in accounts:
    for email in acc[1:]:
        owner[email] = acc[0]
        parent[find(email)] = find(acc[1])
groups = defaultdict(list)
for email in owner: groups[find(email)].append(email)
return [[owner[r]] + sorted(es) for r, es in groups.items()]` },
  'Find Critical and Pseudo Critical Edges in Minimum Spanning Tree': { key: 'if mst(skip=i) > base: critical.append(edges[i][3])', code: `# mst(skip, force) = cost of the MST (Kruskal) with one edge skipped or forced in; inf if none
base = mst()
critical, pseudo = [], []
for i in range(len(edges)):
    if mst(skip=i) > base: critical.append(edges[i][3])
    elif mst(force=i) == base: pseudo.append(edges[i][3])
return [critical, pseudo]` },
  'Stone Game II': { key: 'return max(suffix[i] - best(i + x, max(M, x)) for x in range(1, 2 * M + 1))', code: `n = len(piles)
suffix = [0] * (n + 1)
for i in range(n - 1, -1, -1): suffix[i] = suffix[i + 1] + piles[i]
@cache
def best(i, M):
    if i + 2 * M >= n: return suffix[i]
    return max(suffix[i] - best(i + x, max(M, x)) for x in range(1, 2 * M + 1))
return best(0, 1)` },
  'Meeting Rooms II': { key: 'if heap and heap[0] <= start: heapq.heapreplace(heap, end)', code: `intervals.sort()
heap = []
for start, end in intervals:
    if heap and heap[0] <= start: heapq.heapreplace(heap, end)
    else: heapq.heappush(heap, end)
return len(heap)` },
  'Set Matrix Zeroes': { key: 'if r in rows or c in cols: matrix[r][c] = 0', code: `rows, cols = set(), set()
for r in range(m):
    for c in range(n):
        if matrix[r][c] == 0: rows.add(r); cols.add(c)
for r in range(m):
    for c in range(n):
        if r in rows or c in cols: matrix[r][c] = 0` },
};

const byId = <T,>(o: Record<string, T>) => new Map(Object.entries(o).map(([k, v]) => [slug(k), v] as [string, T]));
export const FIXES = byId(F);
export const SOLUTIONS = byId(S);
