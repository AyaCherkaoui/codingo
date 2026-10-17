import { Lesson } from './types';
import { make, ch, ord } from './make';

export const tries: Lesson[] = [
  make('Implement Trie Prefix Tree', {
    teach: ['A trie stores words letter by letter in a tree; shared prefixes share nodes.', 'Each node has children (letter -> node) and an end flag. insert walks/creates nodes and marks the end. search needs the end flag; startsWith does not.'],
    questions: [
      ch('Insert "apple". Search "app" returns?', ['false (no end flag)', 'true', 'error', 'None'], 0, '"app" is only a prefix.'),
      ch('startsWith("app") after inserting "apple"?', ['true', 'false'], 0, 'The path exists.'),
      ch('Insert/search time for a word of length L?', ['O(L)', 'O(n)', 'O(log n)', 'O(1)'], 0, 'One step per letter.'),
    ],
  }),
  make('Design Add And Search Words Data Structure', {
    teach: ['A word dictionary where "." matches any single letter.', 'A trie with DFS search: for a letter follow that child; for "." try every child recursively.'],
    questions: [
      ch('How is "." handled?', ['Try all children', 'Skip it', 'Treat as a letter', 'Fail'], 0, 'It matches any letter.'),
      ch('Worst-case search time?', ['Exponential in dots (bounded by trie size)', 'O(1)', 'O(log n)', 'O(L)'], 0, 'Many branches may be explored.'),
      ch('After "bad", does search("b.d") succeed?', ['Yes', 'No'], 0, '. matches a.'),
    ],
  }),
  make('Extra Characters in a String', {
    teach: ['Break s into dictionary words, leaving as few unused characters as possible.', 'DP: dp[i] = fewest extra chars in s[i:]. Either skip s[i] (1 + dp[i+1]) or, if some word starts at i, take dp[i + len(word)]. A trie speeds up finding words from i.'],
    questions: [
      ch('dp[i] means?', ['Min extra chars in s[i:]', 'Count of words', 'Length of s', 'Index'], 0, 'Suffix state.'),
      ch('Option 1 at position i?', ['Skip the char: 1 + dp[i + 1]', 'Delete the string', 'Stop', 'Reverse'], 0, 'It becomes extra.'),
      ch('Why use a trie?', ['Quickly find dictionary words starting at i', 'Sorting', 'Hashing', 'No need'], 0, 'Walk letters while a path exists.'),
    ],
  }),
  make('Word Search II', {
    teach: ['Find all dictionary words in a letter grid (adjacent cells, no cell reused in a word).', 'Build a trie of words. DFS from every cell, following the trie. When a node ends a word, record it and unmark it (to avoid duplicates). Prune dead branches.'],
    questions: [
      ch('Why a trie instead of searching each word?', ['Search all words at once and prune early', 'Less memory only', 'No reason', 'Sorting'], 0, 'Shared prefixes are explored once.'),
      ch('How do you avoid reusing a cell?', ['Mark it visited, then restore', 'Ignore', 'Copy the grid', 'Use recursion limits'], 0, 'Backtracking.'),
      ch('When do you stop a DFS path?', ['No trie child for the next letter', 'Never', 'After 3 letters', 'At the edge only'], 0, 'No word can continue.'),
    ],
  }),
];
