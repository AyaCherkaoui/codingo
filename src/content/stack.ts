import { Lesson } from './types';
import { make, ch, ord, bl, bug } from './make';

export const stack: Lesson[] = [
  make('Baseball Game', {
    teach: ['Baseball Game: process operations that add scores or change them.', 'Use a stack of scores. A number pushes. "+" pushes the sum of the last two. "D" pushes double the last. "C" pops the last. Answer is the sum of the stack.'],
    questions: [
      ch('["5","2","C","D","+"] ->', ['30', '15', '12', '25'], 0, '5, 2 -> remove 2 -> D=10 -> + = 15; total 30.', 'Walk through the operations one at a time.'),
      ch('"C" does what?', ['Pops the last score', 'Clears all', 'Doubles', 'Adds'], 0, 'It cancels the previous score.', 'Which earlier score does it remove?'),
      ch('Why a stack?', ['We only touch the most recent scores', 'Sorting', 'Speed', 'Hashing'], 0, 'Last in, first out.', 'Which scores do operations touch?'),
      bl('Complete the "D" rule', 'elif op == "D":\n    stack.append(___)', ['2 * stack[-1]', 'stack[-1] + stack[-2]', 'stack.pop()'], '2 * stack[-1]', 'D doubles the previous score and pushes it; the previous score stays on the stack.', 'Double the top without removing it.'),
    ],
  }),
  make('Valid Parentheses', {
    teach: ['Valid Parentheses: are brackets (), [], {} closed in the right order?', 'Push opening brackets. On a closing bracket, the stack top must be its matching opener; pop it. At the end the stack must be empty.'],
    questions: [
      ch('"([)]" is valid?', ['Yes', 'No'], 1, 'The ] closes while ( is on top.', 'Where is the top of the stack when ] arrives?'),
      ch('"{[]}" is valid?', ['Yes', 'No'], 0, 'Properly nested.', 'Check each closer against the latest opener.'),
      ch('At the end the stack must be:', ['Empty', 'Full', 'Sorted', 'One item'], 0, 'No unmatched openers remain.', 'Leftover openers mean trouble.'),
      bug('Find the buggy line', ['pairs = {")": "(", "]": "[", "}": "{"}', 'stack = []', 'for c in s:', '    if c in pairs:', '        if stack.pop() != pairs[c]: return False', '    else:', '        stack.append(c)', 'return not stack'], 4, 'For input ")" the stack is empty and pop() raises IndexError. Check "not stack" first and return False.', 'What if the string starts with a closing bracket?'),
    ],
  }),
  make('Implement Stack Using Queues', {
    teach: ['Build a stack (LIFO) from queues (FIFO).', 'Single queue trick: after push(x), rotate the queue by moving the older elements behind x (size - 1 times). The front is then the newest item.'],
    questions: [
      ch('After push, what do you rotate?', ['The older elements behind the new one', 'The new element', 'Nothing', 'Everything twice'], 0, 'Newest must reach the front.', 'Think about where the newest element lands in the queue.'),
      ch('pop() on this stack is:', ['Queue pop from the front', 'Queue pop from the back', 'A scan', 'A sort'], 0, 'Front is the top of the stack.', 'Which end of the queue is the stack top?'),
      ch('push cost?', ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], 0, 'The rotation touches n - 1 items.', 'How many elements are moved each push?'),
      bl('Rotate after push', 'self.q.append(x)\nfor _ in range(len(self.q) - ___):\n    self.q.append(self.q.popleft())', ['1', '0', '2'], '1', 'Move the n - 1 older items behind x so x ends up at the front.', 'Every item except the new one moves behind it.'),
    ],
  }),
  make('Implement Queue using Stacks', {
    teach: ['Build a queue (FIFO) from stacks (LIFO).', 'Two stacks: in and out. push goes onto in. For pop/peek, if out is empty move everything from in to out (reverses order), then pop out. Amortized O(1).'],
    questions: [
      ch('When do you move items from in to out?', ['Only when out is empty', 'Every push', 'Every pop', 'Never'], 0, 'Otherwise the order breaks.', 'Compare when moving is safe versus harmful.'),
      ch('Why does moving fix the order?', ['Reversing a stack twice gives FIFO', 'It sorts', 'It hashes', 'It does not'], 0, 'The oldest item ends up on top.', 'Reversing twice restores the original order.'),
      ch('Amortized pop cost?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Each item moves at most once.', 'Count how often a single item is moved.'),
      bug('Find the buggy line', ['def pop(self):', '    while self.inn:', '        self.out.append(self.inn.pop())', '    return self.out.pop()'], 1, 'Transferring while out still has items puts newer items on top of older ones, breaking FIFO. Only transfer when out is empty.', 'Is out always empty at this point?'),
    ],
  }),
  make('Min Stack', {
    teach: ['Min Stack: push, pop, top and getMin all in O(1).', 'Store pairs (value, min so far) on the stack, or keep a second stack of minimums. The current minimum is always on top.'],
    questions: [
      ch('How is getMin O(1)?', ['Store the running min with each item', 'Scan the stack', 'Sort it', 'Use a heap'], 0, 'Each entry remembers the min below it.', 'What extra data lives alongside each value?'),
      bl('Fill in the blank', 'new_min = ___(val, self.stack[-1][1] if self.stack else val)', ['min', 'max', 'sum'], 'min', 'Running minimum.', 'Look at what is below an item.'),
      ch('When you pop, the min?', ['Reverts automatically', 'Needs a rescan', 'Becomes 0', 'Is lost'], 0, 'The entry below already stored it.', 'After popping, what is the new top\'s stored min?'),
      bug('Find the buggy line', ['def push(self, val):', '    cur_min = min(val, self.stack[-1][1]) if self.stack else val', '    self.stack.append((val, val))'], 2, 'The stored min must be cur_min, not val. Otherwise getMin returns the top value, not the minimum.', 'What should the second tuple item remember?'),
    ],
  }),
  make('Evaluate Reverse Polish Notation', {
    teach: ['Evaluate Reverse Polish Notation: operators come after their operands.', 'Push numbers. On an operator, pop b then a, compute a op b, and push the result. Careful: division truncates toward zero, and order matters for - and /.'],
    questions: [
      ch('["2","1","+","3","*"] ->', ['9', '5', '7', '6'], 0, '(2 + 1) * 3.', 'Evaluate the inner pair first.'),
      ch('You pop b first, then a. Result is?', ['a op b', 'b op a', 'a + b', 'b'], 0, 'a was pushed earlier, so it is the left operand.', 'Which operand was pushed earlier?'),
      ch('["4","13","5","/","+"] ->', ['6', '7', '4', '17'], 0, '13 / 5 = 2, 4 + 2 = 6.', 'Integer division truncates.'),
      bl('Truncating division', 'a, b = stack.pop(...)  # see order above\nstack.append(int(___))', ['a / b', 'a // b', 'a % b'], 'a / b', 'int() truncates toward zero. a // b floors, so -7 // 2 gives -4 instead of -3.', 'Floor division rounds toward negative infinity.'),
    ],
  }),
  make('Asteroid Collision', {
    teach: ['Asteroids move left (negative) or right (positive); equal speed. Which survive?', 'Stack of survivors. For each asteroid, while it moves left and the top moves right, they collide: smaller explodes, equal both explode. Push it if it survives.'],
    questions: [
      ch('[5, 10, -5] ->', ['[5, 10]', '[10]', '[5]', '[]'], 0, '-5 explodes against 10.', 'A collision only occurs in one specific direction pairing.'),
      ch('[8, -8] ->', ['[]', '[8]', '[-8]', '[8, -8]'], 0, 'Equal sizes destroy each other.', 'Equal sizes behave specially.'),
      ch('Do two asteroids moving the same direction collide?', ['No', 'Yes', 'Sometimes', 'Only if equal'], 0, 'Same speed, same direction.', 'Same speed, same direction.'),
      bl('Collision condition', 'for a in asteroids:\n    while stack and a < 0 and ___:\n        ...', ['stack[-1] > 0', 'stack[-1] < 0', 'stack[-1] == a'], 'stack[-1] > 0', 'Only a left-mover hitting a right-moving top asteroid collides.', 'The top must be heading toward the new asteroid.'),
    ],
  }),
  make('Daily Temperatures', {
    teach: ['For each day, how many days until a warmer temperature?', 'Monotonic stack of indices with decreasing temperatures. When today is warmer than the top day, pop it and set its answer to today - that index.'],
    questions: [
      ch('[73,74,75,71,69,72,76,73] ->', ['[1,1,4,2,1,1,0,0]', '[1,1,1,1,1,1,0,0]', '[2,2,4,2,1,1,0,0]', '[1,1,4,2,1,1,1,0]'], 0, 'Days until warmer.', 'Compare a stack of unresolved days with the answers.'),
      ch('The stack holds:', ['Indices still waiting for a warmer day', 'All temperatures', 'Sorted values', 'Answers'], 0, 'Unresolved days.', 'What does the stack keep waiting?'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Each index pushed and popped once.', 'Each index enters and leaves once.'),
      bl('Resolve a day', 'for i, t in enumerate(temps):\n    while stack and temps[stack[-1]] < t:\n        j = stack.pop()\n        ans[j] = ___', ['i - j', 'j - i', 't'], 'i - j', 'The waiting day j gets the number of days until today (index i).', 'Distance between today and the waiting day.'),
    ],
  }),
  make('Online Stock Span', {
    teach: ['Stock Span: for each new price, count consecutive previous days with price <= today (including today).', 'Keep a stack of (price, span). For a new price, pop entries with price <= it, adding their spans. Push (price, total span).'],
    questions: [
      ch('Prices 100, 80, 60, 70, 60, 75, 85. Span of 85?', ['6', '5', '4', '7'], 0, 'It covers the previous 5 days plus itself.', 'Count the days it can absorb.'),
      ch('Why store the span with the price?', ['Reuse spans already counted', 'Looks nice', 'Sorting', 'No reason'], 0, 'Avoid recounting days.', 'Why recompute spans you already know?'),
      ch('Amortized time per call?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Each entry is popped once.', 'Think of total pops over all calls.'),
      bug('Find the buggy line', ['span = 1', 'while stack and stack[-1][0] <= price:', '    span += 1', '    stack.pop()', 'stack.append((price, span))'], 2, 'The popped entry already holds a span of earlier days; add that span (stack.pop()[1]), not just 1.', 'What does a popped entry already represent?'),
    ],
  }),
  make('Car Fleet', {
    teach: ['Cars drive to a target; a faster car catches up and then travels at the slower car\'s speed (forming a fleet). How many fleets arrive?', 'Sort by position descending. Compute each car\'s time to target. Walk from nearest to the target: if a car\'s time is greater than the fleet ahead, it starts a new fleet.'],
    questions: [
      ch('Which car do we process first?', ['Closest to the target', 'Farthest', 'Fastest', 'Slowest'], 0, 'The cars ahead set the pace.', 'Who sets the pace for cars behind it?'),
      ch('time = ?', ['(target - position) / speed', 'speed / distance', 'position * speed', 'target / speed'], 0, 'Distance divided by speed.', 'Distance over speed.'),
      ch('A car with time <= the fleet ahead:', ['Joins that fleet', 'Starts a new fleet', 'Is removed', 'Overtakes'], 0, 'It catches up before the target.', 'Compare arrival times.'),
      bl('New fleet check', 'for p, s in sorted(zip(pos, speed), reverse=True):\n    t = (target - p) / s\n    if not fleets or t ___ fleets[-1]:\n        fleets.append(t)', ['>', '<', '<='], '>', 'A strictly slower arrival cannot catch the fleet ahead, so it forms a new fleet. Equal times merge.', 'Arriving later than the fleet ahead means what?'),
    ],
  }),
  make('Simplify Path', {
    teach: ['Simplify Path: convert a Unix path to its canonical form.', 'Split by "/". Skip empty and ".". For "..", pop the stack if possible. Otherwise push the name. Result is "/" + "/".join(stack).'],
    questions: [
      ch('"/a/./b/../../c/" ->', ['"/c"', '"/a/c"', '"/a/b/c"', '"/"'], 0, 'a, b, back, back, c.', 'Resolve each path component step by step.'),
      ch('".." at the root does what?', ['Nothing', 'Error', 'Adds ..', 'Clears all'], 0, 'You cannot go above root.', 'What stops at the root?'),
      ch('Why a stack?', ['".." undoes the most recent folder', 'Sorting', 'Speed', 'Hashing'], 0, 'Last in, first out.', 'What should \'..\' undo?'),
      bl('Handle ".."', 'elif part == "..":\n    if stack:\n        stack.___()', ['pop', 'append', 'clear'], 'pop', 'Go up one directory by removing the most recent folder, but only if one exists.', 'Undo only the latest folder.'),
    ],
  }),
  make('Decode String', {
    teach: ['Decode String: "3[a2[c]]" becomes "accaccacc".', 'Use a stack. On "[" push the current string and the current number. On "]" pop them: current = previous + current * number. Digits build the number; letters extend the current string.'],
    questions: [
      ch('"3[a]2[bc]" ->', ['"aaabcbc"', '"abcabc"', '"aaabc"', '"3a2bc"'], 0, 'aaa + bcbc.', 'Work from the innermost brackets outward.'),
      ch('What do you push on "["?', ['Current string and the multiplier', 'Only the string', 'Only the number', 'Nothing'], 0, 'To restore it after the bracket closes.', 'Why remember the outer context?'),
      ch('On "]" you compute:', ['prev + cur * num', 'cur + prev', 'num * prev', 'cur'], 0, 'Repeat the inner string, append to what came before.', 'Which parts combine when a bracket closes?'),
      bug('Find the buggy line', ['for c in s:', '    if c.isdigit():', '        num = num * 10 + int(c)', '    elif c == "[":', '        stack.append((cur, num))', '        cur, num = "", 0', '    elif c == "]":', '        prev, k = stack.pop()', '        cur = cur + prev * k', '    else:', '        cur += c'], 8, 'The inner string is repeated and appended after prev: cur = prev + cur * k. Here prev is repeated instead.', 'Which string should be multiplied?'),
    ],
  }),
  make('Maximum Frequency Stack', {
    teach: ['Maximum Frequency Stack: pop returns the most frequent element (ties: most recently pushed).', 'Keep freq[val] and a map from frequency -> stack of values. Track max_freq. Push: freq +1 and add to that bucket. Pop: take from the max_freq bucket; if it empties, max_freq -= 1.'],
    questions: [
      ch('Pops come from which bucket?', ['The highest frequency', 'The lowest', 'Random', 'The first'], 0, 'Max frequency, newest first.', 'Which group is chosen on pop?'),
      ch('Why a stack per frequency?', ['Ties pop the most recent', 'Sorting', 'Hashing', 'Memory'], 0, 'Each bucket is LIFO.', 'Why not just one list per frequency?'),
      ch('push and pop time?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Only hash lookups and stack ops.', 'Only hash lookups and stack operations.'),
      bl('Pop bookkeeping', 'val = self.groups[self.max_freq].pop()\nself.freq[val] ___ 1\nif not self.groups[self.max_freq]:\n    self.max_freq -= 1', ['-=', '+=', '='], '-=', 'Popping removes one occurrence, so the value\'s frequency drops by 1.', 'The count of this value goes down.'),
    ],
  }),
  make('Largest Rectangle In Histogram', {
    teach: ['Largest Rectangle in a Histogram.', 'Monotonic stack of increasing bar heights (with start indexes). When a shorter bar arrives, pop taller bars: area = height * (i - start). The popped start extends to the new bar\'s start. At the end pop the rest with width to n.'],
    questions: [
      ch('[2,1,5,6,2,3] ->', ['8', '10', '12', '6'], 1, 'Bars 5 and 6 give 5 * 2 = 10.', 'Taller bars cannot extend past a shorter one.'),
      ch('When do you pop?', ['A shorter bar arrives', 'A taller bar arrives', 'Always', 'Never'], 0, 'The taller bars can extend no further right.', 'What condition ends a bar\'s reach to the right?'),
      ch('Time complexity?', ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'], 0, 'Each bar is pushed and popped once.', 'Each bar enters and leaves once.'),
      bl('Compute the area', 'while stack and stack[-1][1] > h:\n    idx, height = stack.pop()\n    best = max(best, height * (i - ___))', ['idx', 'i', '0'], 'idx', 'The popped bar started at idx, so its width runs from idx up to the current index i.', 'Where did this bar\'s run begin?'),
    ],
  }),
];
