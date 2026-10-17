import { Lesson } from './types';
import { make, ch, ord, bl } from './make';

export const stack: Lesson[] = [
  make('Baseball Game', {
    teach: ['Baseball Game: process operations that add scores or change them.', 'Use a stack of scores. A number pushes. "+" pushes the sum of the last two. "D" pushes double the last. "C" pops the last. Answer is the sum of the stack.'],
    questions: [
      ch('["5","2","C","D","+"] ->', ['30', '15', '12', '25'], 0, '5, 2 -> remove 2 -> D=10 -> + = 15; total 30.'),
      ch('"C" does what?', ['Pops the last score', 'Clears all', 'Doubles', 'Adds'], 0, 'It cancels the previous score.'),
      ch('Why a stack?', ['We only touch the most recent scores', 'Sorting', 'Speed', 'Hashing'], 0, 'Last in, first out.'),
    ],
  }),
  make('Valid Parentheses', {
    teach: ['Valid Parentheses: are brackets (), [], {} closed in the right order?', 'Push opening brackets. On a closing bracket, the stack top must be its matching opener; pop it. At the end the stack must be empty.'],
    questions: [
      ch('"([)]" is valid?', ['Yes', 'No'], 1, 'The ] closes while ( is on top.'),
      ch('"{[]}" is valid?', ['Yes', 'No'], 0, 'Properly nested.'),
      ch('At the end the stack must be:', ['Empty', 'Full', 'Sorted', 'One item'], 0, 'No unmatched openers remain.'),
    ],
  }),
  make('Implement Stack Using Queues', {
    teach: ['Build a stack (LIFO) from queues (FIFO).', 'Single queue trick: after push(x), rotate the queue by moving the older elements behind x (size - 1 times). The front is then the newest item.'],
    questions: [
      ch('After push, what do you rotate?', ['The older elements behind the new one', 'The new element', 'Nothing', 'Everything twice'], 0, 'Newest must reach the front.'),
      ch('pop() on this stack is:', ['Queue pop from the front', 'Queue pop from the back', 'A scan', 'A sort'], 0, 'Front is the top of the stack.'),
      ch('push cost?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 0, 'The rotation touches n - 1 items.'),
    ],
  }),
  make('Implement Queue using Stacks', {
    teach: ['Build a queue (FIFO) from stacks (LIFO).', 'Two stacks: in and out. push goes onto in. For pop/peek, if out is empty move everything from in to out (reverses order), then pop out. Amortized O(1).'],
    questions: [
      ch('When do you move items from in to out?', ['Only when out is empty', 'Every push', 'Every pop', 'Never'], 0, 'Otherwise the order breaks.'),
      ch('Why does moving fix the order?', ['Reversing a stack twice gives FIFO', 'It sorts', 'It hashes', 'It does not'], 0, 'The oldest item ends up on top.'),
      ch('Amortized pop cost?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Each item moves at most once.'),
    ],
  }),
  make('Min Stack', {
    teach: ['Min Stack: push, pop, top and getMin all in O(1).', 'Store pairs (value, min so far) on the stack, or keep a second stack of minimums. The current minimum is always on top.'],
    questions: [
      ch('How is getMin O(1)?', ['Store the running min with each item', 'Scan the stack', 'Sort it', 'Use a heap'], 0, 'Each entry remembers the min below it.'),
      bl('Fill in the blank', 'new_min = ___(val, self.stack[-1][1] if self.stack else val)', ['min', 'max', 'sum'], 'min', 'Running minimum.'),
      ch('When you pop, the min?', ['Reverts automatically', 'Needs a rescan', 'Becomes 0', 'Is lost'], 0, 'The entry below already stored it.'),
    ],
  }),
  make('Evaluate Reverse Polish Notation', {
    teach: ['Evaluate Reverse Polish Notation: operators come after their operands.', 'Push numbers. On an operator, pop b then a, compute a op b, and push the result. Careful: division truncates toward zero, and order matters for - and /.'],
    questions: [
      ch('["2","1","+","3","*"] ->', ['9', '5', '7', '6'], 0, '(2 + 1) * 3.'),
      ch('You pop b first, then a. Result is?', ['a op b', 'b op a', 'a + b', 'b'], 0, 'a was pushed earlier, so it is the left operand.'),
      ch('["4","13","5","/","+"] ->', ['6', '7', '4', '17'], 0, '13 / 5 = 2, 4 + 2 = 6.'),
    ],
  }),
  make('Asteroid Collision', {
    teach: ['Asteroids move left (negative) or right (positive); equal speed. Which survive?', 'Stack of survivors. For each asteroid, while it moves left and the top moves right, they collide: smaller explodes, equal both explode. Push it if it survives.'],
    questions: [
      ch('[5, 10, -5] ->', ['[5, 10]', '[10]', '[5]', '[]'], 0, '-5 explodes against 10.'),
      ch('[8, -8] ->', ['[]', '[8]', '[-8]', '[8, -8]'], 0, 'Equal sizes destroy each other.'),
      ch('Do two asteroids moving the same direction collide?', ['No', 'Yes', 'Sometimes', 'Only if equal'], 0, 'Same speed, same direction.'),
    ],
  }),
  make('Daily Temperatures', {
    teach: ['For each day, how many days until a warmer temperature?', 'Monotonic stack of indices with decreasing temperatures. When today is warmer than the top day, pop it and set its answer to today - that index.'],
    questions: [
      ch('[73,74,75,71,69,72,76,73] ->', ['[1,1,4,2,1,1,0,0]', '[1,1,1,1,1,1,0,0]', '[2,2,4,2,1,1,0,0]', '[1,1,4,2,1,1,1,0]'], 0, 'Days until warmer.'),
      ch('The stack holds:', ['Indices still waiting for a warmer day', 'All temperatures', 'Sorted values', 'Answers'], 0, 'Unresolved days.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Each index pushed and popped once.'),
    ],
  }),
  make('Online Stock Span', {
    teach: ['Stock Span: for each new price, count consecutive previous days with price <= today (including today).', 'Keep a stack of (price, span). For a new price, pop entries with price <= it, adding their spans. Push (price, total span).'],
    questions: [
      ch('Prices 100, 80, 60, 70, 60, 75, 85. Span of 85?', ['6', '5', '4', '7'], 0, 'It covers the previous 5 days plus itself.'),
      ch('Why store the span with the price?', ['Reuse spans already counted', 'Looks nice', 'Sorting', 'No reason'], 0, 'Avoid recounting days.'),
      ch('Amortized time per call?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Each entry is popped once.'),
    ],
  }),
  make('Car Fleet', {
    teach: ['Cars drive to a target; a faster car catches up and then travels at the slower car\'s speed (forming a fleet). How many fleets arrive?', 'Sort by position descending. Compute each car\'s time to target. Walk from nearest to the target: if a car\'s time is greater than the fleet ahead, it starts a new fleet.'],
    questions: [
      ch('Which car do we process first?', ['Closest to the target', 'Farthest', 'Fastest', 'Slowest'], 0, 'The cars ahead set the pace.'),
      ch('time = ?', ['(target - position) / speed', 'speed / distance', 'position * speed', 'target / speed'], 0, 'Distance divided by speed.'),
      ch('A car with time <= the fleet ahead:', ['Joins that fleet', 'Starts a new fleet', 'Is removed', 'Overtakes'], 0, 'It catches up before the target.'),
    ],
  }),
  make('Simplify Path', {
    teach: ['Simplify Path: convert a Unix path to its canonical form.', 'Split by "/". Skip empty and ".". For "..", pop the stack if possible. Otherwise push the name. Result is "/" + "/".join(stack).'],
    questions: [
      ch('"/a/./b/../../c/" ->', ['"/c"', '"/a/c"', '"/a/b/c"', '"/"'], 0, 'a, b, back, back, c.'),
      ch('".." at the root does what?', ['Nothing', 'Error', 'Adds ..', 'Clears all'], 0, 'You cannot go above root.'),
      ch('Why a stack?', ['".." undoes the most recent folder', 'Sorting', 'Speed', 'Hashing'], 0, 'Last in, first out.'),
    ],
  }),
  make('Decode String', {
    teach: ['Decode String: "3[a2[c]]" becomes "accaccacc".', 'Use a stack. On "[" push the current string and the current number. On "]" pop them: current = previous + current * number. Digits build the number; letters extend the current string.'],
    questions: [
      ch('"3[a]2[bc]" ->', ['"aaabcbc"', '"abcabc"', '"aaabc"', '"3a2bc"'], 0, 'aaa + bcbc.'),
      ch('What do you push on "["?', ['Current string and the multiplier', 'Only the string', 'Only the number', 'Nothing'], 0, 'To restore it after the bracket closes.'),
      ch('On "]" you compute:', ['prev + cur * num', 'cur + prev', 'num * prev', 'cur'], 0, 'Repeat the inner string, append to what came before.'),
    ],
  }),
  make('Maximum Frequency Stack', {
    teach: ['Maximum Frequency Stack: pop returns the most frequent element (ties: most recently pushed).', 'Keep freq[val] and a map from frequency -> stack of values. Track max_freq. Push: freq +1 and add to that bucket. Pop: take from the max_freq bucket; if it empties, max_freq -= 1.'],
    questions: [
      ch('Pops come from which bucket?', ['The highest frequency', 'The lowest', 'Random', 'The first'], 0, 'Max frequency, newest first.'),
      ch('Why a stack per frequency?', ['Ties pop the most recent', 'Sorting', 'Hashing', 'Memory'], 0, 'Each bucket is LIFO.'),
      ch('push and pop time?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only hash lookups and stack ops.'),
    ],
  }),
  make('Largest Rectangle In Histogram', {
    teach: ['Largest Rectangle in a Histogram.', 'Monotonic stack of increasing bar heights (with start indexes). When a shorter bar arrives, pop taller bars: area = height * (i - start). The popped start extends to the new bar\'s start. At the end pop the rest with width to n.'],
    questions: [
      ch('[2,1,5,6,2,3] ->', ['8', '10', '12', '6'], 1, 'Bars 5 and 6 give 5 * 2 = 10.'),
      ch('When do you pop?', ['A shorter bar arrives', 'A taller bar arrives', 'Always', 'Never'], 0, 'The taller bars can extend no further right.'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Each bar is pushed and popped once.'),
    ],
  }),
];
