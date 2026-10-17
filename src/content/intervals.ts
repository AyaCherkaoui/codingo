import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const intervals: Lesson[] = [
  make('Insert Interval', {
    teach: ['Insert a new interval into a sorted list of non-overlapping intervals, merging if needed.', 'Three phases: add all intervals ending before the new one starts; merge all that overlap (min of starts, max of ends); add the rest.'],
    questions: [
      ch('[[1,3],[6,9]] + [2,5] ->', ['[[1,5],[6,9]]', '[[1,3],[2,5],[6,9]]', '[[2,5],[6,9]]', '[[1,9]]'], 0, 'Overlaps [1,3].', 'Does [2,5] touch [1,3] or [6,9]?'),
      ch('Intervals overlap when?', ['start <= other end and end >= other start', 'start == start', 'always', 'never'], 0, 'Standard test.', 'Neither interval may be fully before the other.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'One pass; input is sorted.', 'Is any sorting needed here?'),
      bl('Fill in the blank (merge phase)', 'new[0] = min(new[0], iv[0])\nnew[1] = ___(new[1], iv[1])', ['max', 'min', 'sum'], 'max', 'The merged interval starts at the smaller start and ends at the larger end.', 'The merged end must cover both intervals.'),
    ],
  }),
  make('Merge Intervals', {
    teach: ['Merge all overlapping intervals.', 'Sort by start. Keep the last merged interval. If the next start <= last end, extend the end with max; otherwise start a new one.'],
    questions: [
      ch('[[1,3],[2,6],[8,10],[15,18]] ->', ['[[1,6],[8,10],[15,18]]', '[[1,10],[15,18]]', '[[1,3],[2,6],[8,10],[15,18]]', '[[1,18]]'], 0, '[1,3] and [2,6] merge.', 'Which neighbors share some range?'),
      ch('First step?', ['Sort by start', 'Sort by length', 'Hash', 'Reverse'], 0, 'Overlaps become adjacent.', 'Overlapping intervals should end up next to each other.'),
      ch('Time complexity?', ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Dominated by sorting.', 'Which step is the most expensive?'),
      bug('Find the bug', ['intervals.sort(key=lambda x: x[0])', 'res = [intervals[0]]', 'for s, e in intervals[1:]:', '    if s <= res[-1][1]:', '        res[-1][1] = e', '    else: res.append([s, e])'], 4, 'Use max(res[-1][1], e). For [1,10] and [2,3], assigning e would shrink the interval.', 'Can the next interval end before the current one?'),
    ],
  }),
  make('Non Overlapping Intervals', {
    teach: ['Minimum number of intervals to remove so the rest do not overlap.', 'Greedy: sort by END time. Keep an interval if it starts at or after the last kept end; otherwise remove it (count++). Earliest finishing leaves the most room.'],
    questions: [
      ch('Sort by?', ['End time', 'Start time', 'Length', 'Random'], 0, 'Finish early to leave room.', 'Which choice leaves the most room for later intervals?'),
      ch('[[1,2],[2,3],[3,4],[1,3]] ->', ['1', '0', '2', '3'], 0, 'Remove [1,3].', 'Find the interval that blocks the others.'),
      ch('Touching intervals like [1,2] and [2,3]?', ['Not overlapping', 'Overlapping', 'Invalid', 'Merge'], 0, 'Sharing an endpoint is fine here.', 'Does one start strictly before the other ends?'),
      bl('Fill in the blank (sorted by end)', 'if s >= end:\n    end = e\nelse:\n    ___', ['count += 1', 'end = s', 'end = e'], 'count += 1', 'An overlapping interval is dropped; the kept end stays the same.', 'What happens to the interval that overlaps?'),
    ],
  }),
  make('Meeting Rooms', {
    teach: ['Can one person attend all meetings (no overlaps)?', 'Sort by start. If any meeting starts before the previous one ends, return false.'],
    questions: [
      ch('[[0,30],[5,10],[15,20]] ->', ['false', 'true'], 0, '[5,10] sits inside [0,30].', 'Does any meeting start before another ends?'),
      ch('Check after sorting?', ['start[i] < end[i-1]', 'start[i] == 0', 'end[i] > start[i]', 'None'], 0, 'Overlap with the previous meeting.', 'Compare a meeting with the one just before it.'),
      ch('Time complexity?', ['O(n log n)', 'O(n)', 'O(n²)', 'O(1)'], 0, 'Sorting.', 'The scan is cheap; what about the sort?'),
      bug('Find the bug', ['intervals.sort()', 'for i in range(1, len(intervals)):', '    if intervals[i][0] < intervals[i-1][0]:', '        return False', 'return True'], 2, 'After sorting, starts are always in order. Compare the start with the previous END: intervals[i-1][1].', 'Is that condition ever true after sorting by start?'),
    ],
  }),
  make('Meeting Rooms II', {
    teach: ['Minimum number of meeting rooms needed.', 'Sort starts and ends separately and sweep with two pointers: if the next start is before the earliest end, you need a room (count++); otherwise a room frees up. Or use a min-heap of end times.'],
    questions: [
      ch('[[0,30],[5,10],[15,20]] ->', ['2', '1', '3', '0'], 0, 'Max 2 meetings overlap.', 'How many meetings are running at the busiest time?'),
      ch('Answer equals?', ['Maximum simultaneous meetings', 'Number of meetings', 'Longest meeting', 'Gaps'], 0, 'Peak overlap.', 'Rooms are only needed while meetings run together.'),
      ch('Heap holds?', ['End times of ongoing meetings', 'Start times', 'Room ids', 'Durations'], 0, 'Reuse the earliest-ending room.', 'Which room could free up first?'),
      ord('Order the two-pointer sweep', ['Sort starts and ends separately', 'Set rooms = 0 and e = 0', 'For each start s: if s < ends[e], rooms += 1', 'Else e += 1 (a room was freed and reused)', 'Return rooms'], 'Each start either needs a new room or reuses the earliest freed one.', false, 'Prepare the data, set counters, then sweep, then return.'),
    ],
  }),
  make('Meeting Rooms III', {
    teach: ['n rooms; meetings are assigned to the lowest-numbered free room; if none, they are delayed until the earliest room frees (keeping duration). Which room hosts the most meetings?', 'Sort meetings by start. Two heaps: free rooms (by number) and busy rooms (by end time, room). Count meetings per room.'],
    questions: [
      ch('If no room is free?', ['Delay until one frees; keep duration', 'Skip the meeting', 'Cancel', 'Add a room'], 0, 'By the rules.', 'Check what the problem says about delays.'),
      ch('Free rooms are chosen by?', ['Lowest number', 'Highest number', 'Random', 'Longest idle'], 0, 'Tie-break rule.', 'Which room does the problem prefer?'),
      ch('Data structures?', ['Two heaps', 'Two stacks', 'A trie', 'A deque'], 0, 'Free and busy rooms.', 'You need the min of two different orderings.'),
      bl('Fill in the blank (no free room, meeting [s, e])', 'end, room = heapq.heappop(busy)\nheapq.heappush(busy, (end + (e - ___), room))', ['s', 'end', 'room', '0'], 's', 'The delayed meeting starts at the old end and keeps its duration e - s.', 'Duration is end time minus start time of the meeting.'),
    ],
  }),
  make('Minimum Interval to Include Each Query', {
    teach: ['For each query point, find the size of the smallest interval containing it (or -1).', 'Sort intervals by start and queries ascending (remember original positions). For each query push all intervals starting <= q into a min-heap by size; pop intervals whose end < q; the top is the answer.'],
    questions: [
      ch('Why sort queries?', ['Process intervals incrementally', 'Speed only', 'Memory', 'No reason'], 0, 'Intervals only get added as q grows.', 'What does an ascending q let you reuse?'),
      ch('Heap ordered by?', ['Interval size', 'Start', 'Query', 'End'], 0, 'We want the smallest.', 'What are we trying to minimize?'),
      ch('Pop from the heap when?', ['The interval end is before q', 'The size is large', 'Always', 'Never'], 0, 'It no longer contains q.', 'When does an interval stop covering q?'),
      bug('Find the bug', ['intervals.sort()', 'for q in sorted(queries):', '    while i < len(intervals) and intervals[i][0] <= q:', '        l, r = intervals[i]; heappush(h, (r - l, r)); i += 1', '    while h and h[0][1] < q: heappop(h)', '    res[q] = h[0][0] if h else -1'], 3, 'Intervals are inclusive, so the size is r - l + 1.', 'How many integers are in [3, 5]?'),
    ],
  }),
];
