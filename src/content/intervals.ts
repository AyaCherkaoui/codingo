import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const intervals: Lesson[] = [
  make('Insert Interval', {
    teach: ['Insert a new interval into a sorted list of non-overlapping intervals, merging if needed.', 'Three phases: add all intervals ending before the new one starts; merge all that overlap (min of starts, max of ends); add the rest.'],
    questions: [
      ch('[[1,3],[6,9]] + [2,5] ->', ['[[1,5],[6,9]]', '[[1,3],[2,5],[6,9]]', '[[2,5],[6,9]]', '[[1,9]]'], 0, 'Overlaps [1,3].'),
      ch('Intervals overlap when?', ['start <= other end and end >= other start', 'start == start', 'always', 'never'], 0, 'Standard test.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'One pass; input is sorted.'),
    ],
  }),
  make('Merge Intervals', {
    teach: ['Merge all overlapping intervals.', 'Sort by start. Keep the last merged interval. If the next start <= last end, extend the end with max; otherwise start a new one.'],
    questions: [
      ch('[[1,3],[2,6],[8,10],[15,18]] ->', ['[[1,6],[8,10],[15,18]]', '[[1,10],[15,18]]', '[[1,3],[2,6],[8,10],[15,18]]', '[[1,18]]'], 0, '[1,3] and [2,6] merge.'),
      ch('First step?', ['Sort by start', 'Sort by length', 'Hash', 'Reverse'], 0, 'Overlaps become adjacent.'),
      ch('Time complexity?', ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Dominated by sorting.'),
    ],
  }),
  make('Non Overlapping Intervals', {
    teach: ['Minimum number of intervals to remove so the rest do not overlap.', 'Greedy: sort by END time. Keep an interval if it starts at or after the last kept end; otherwise remove it (count++). Earliest finishing leaves the most room.'],
    questions: [
      ch('Sort by?', ['End time', 'Start time', 'Length', 'Random'], 0, 'Finish early to leave room.'),
      ch('[[1,2],[2,3],[3,4],[1,3]] ->', ['1', '0', '2', '3'], 0, 'Remove [1,3].'),
      ch('Touching intervals like [1,2] and [2,3]?', ['Not overlapping', 'Overlapping', 'Invalid', 'Merge'], 0, 'Sharing an endpoint is fine here.'),
    ],
  }),
  make('Meeting Rooms', {
    teach: ['Can one person attend all meetings (no overlaps)?', 'Sort by start. If any meeting starts before the previous one ends, return false.'],
    questions: [
      ch('[[0,30],[5,10],[15,20]] ->', ['false', 'true'], 0, '[5,10] sits inside [0,30].'),
      ch('Check after sorting?', ['start[i] < end[i-1]', 'start[i] == 0', 'end[i] > start[i]', 'None'], 0, 'Overlap with the previous meeting.'),
      ch('Time complexity?', ['O(n log n)', 'O(n)', 'O(n²)', 'O(1)'], 0, 'Sorting.'),
    ],
  }),
  make('Meeting Rooms II', {
    teach: ['Minimum number of meeting rooms needed.', 'Sort starts and ends separately and sweep with two pointers: if the next start is before the earliest end, you need a room (count++); otherwise a room frees up. Or use a min-heap of end times.'],
    questions: [
      ch('[[0,30],[5,10],[15,20]] ->', ['2', '1', '3', '0'], 0, 'Max 2 meetings overlap.'),
      ch('Answer equals?', ['Maximum simultaneous meetings', 'Number of meetings', 'Longest meeting', 'Gaps'], 0, 'Peak overlap.'),
      ch('Heap holds?', ['End times of ongoing meetings', 'Start times', 'Room ids', 'Durations'], 0, 'Reuse the earliest-ending room.'),
    ],
  }),
  make('Meeting Rooms III', {
    teach: ['n rooms; meetings are assigned to the lowest-numbered free room; if none, they are delayed until the earliest room frees (keeping duration). Which room hosts the most meetings?', 'Sort meetings by start. Two heaps: free rooms (by number) and busy rooms (by end time, room). Count meetings per room.'],
    questions: [
      ch('If no room is free?', ['Delay until one frees; keep duration', 'Skip the meeting', 'Cancel', 'Add a room'], 0, 'By the rules.'),
      ch('Free rooms are chosen by?', ['Lowest number', 'Highest number', 'Random', 'Longest idle'], 0, 'Tie-break rule.'),
      ch('Data structures?', ['Two heaps', 'Two stacks', 'A trie', 'A deque'], 0, 'Free and busy rooms.'),
    ],
  }),
  make('Minimum Interval to Include Each Query', {
    teach: ['For each query point, find the size of the smallest interval containing it (or -1).', 'Sort intervals by start and queries ascending (remember original positions). For each query push all intervals starting <= q into a min-heap by size; pop intervals whose end < q; the top is the answer.'],
    questions: [
      ch('Why sort queries?', ['Process intervals incrementally', 'Speed only', 'Memory', 'No reason'], 0, 'Intervals only get added as q grows.'),
      ch('Heap ordered by?', ['Interval size', 'Start', 'Query', 'End'], 0, 'We want the smallest.'),
      ch('Pop from the heap when?', ['The interval end is before q', 'The size is large', 'Always', 'Never'], 0, 'It no longer contains q.'),
    ],
  }),
];
