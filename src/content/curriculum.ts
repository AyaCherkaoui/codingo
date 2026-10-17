// NeetCode 150 core order (days 1-150). Days 151-250 = extra NeetCode 250 problems (to be added).
const raw: Record<string, string[]> = {
  'Arrays & Hashing': ['Contains Duplicate','Valid Anagram','Two Sum','Group Anagrams','Top K Frequent Elements','Encode and Decode Strings','Product of Array Except Self','Valid Sudoku','Longest Consecutive Sequence'],
  'Two Pointers': ['Valid Palindrome','Two Sum II','3Sum','Container With Most Water','Trapping Rain Water'],
  'Sliding Window': ['Best Time to Buy and Sell Stock','Longest Substring Without Repeating Characters','Longest Repeating Character Replacement','Permutation in String','Minimum Window Substring','Sliding Window Maximum'],
  'Stack': ['Valid Parentheses','Min Stack','Evaluate Reverse Polish Notation','Generate Parentheses','Daily Temperatures','Car Fleet','Largest Rectangle in Histogram'],
  'Binary Search': ['Binary Search','Search a 2D Matrix','Koko Eating Bananas','Find Minimum in Rotated Sorted Array','Search in Rotated Sorted Array','Time Based Key-Value Store','Median of Two Sorted Arrays'],
  'Linked List': ['Reverse Linked List','Merge Two Sorted Lists','Reorder List','Remove Nth Node From End of List','Copy List with Random Pointer','Add Two Numbers','Linked List Cycle','Find the Duplicate Number','LRU Cache','Merge k Sorted Lists','Reverse Nodes in k-Group'],
  'Trees': ['Invert Binary Tree','Maximum Depth of Binary Tree','Diameter of Binary Tree','Balanced Binary Tree','Same Tree','Subtree of Another Tree','Lowest Common Ancestor of a BST','Binary Tree Level Order Traversal','Binary Tree Right Side View','Count Good Nodes in Binary Tree','Validate Binary Search Tree','Kth Smallest Element in a BST','Construct Binary Tree from Preorder and Inorder','Binary Tree Maximum Path Sum','Serialize and Deserialize Binary Tree'],
  'Tries': ['Implement Trie','Design Add and Search Words','Word Search II'],
  'Heap / Priority Queue': ['Kth Largest Element in a Stream','Last Stone Weight','K Closest Points to Origin','Kth Largest Element in an Array','Task Scheduler','Design Twitter','Find Median from Data Stream'],
  'Backtracking': ['Subsets','Combination Sum','Permutations','Subsets II','Combination Sum II','Word Search','Palindrome Partitioning','Letter Combinations of a Phone Number','N-Queens'],
  'Graphs': ['Number of Islands','Max Area of Island','Clone Graph','Walls and Gates','Rotting Oranges','Pacific Atlantic Water Flow','Surrounded Regions','Course Schedule','Course Schedule II','Redundant Connection','Number of Connected Components','Graph Valid Tree','Word Ladder'],
  'Advanced Graphs': ['Reconstruct Itinerary','Min Cost to Connect All Points','Network Delay Time','Swim in Rising Water','Alien Dictionary','Cheapest Flights Within K Stops'],
  '1-D Dynamic Programming': ['Climbing Stairs','Min Cost Climbing Stairs','House Robber','House Robber II','Longest Palindromic Substring','Palindromic Substrings','Decode Ways','Coin Change','Maximum Product Subarray','Word Break','Longest Increasing Subsequence','Partition Equal Subset Sum'],
  '2-D Dynamic Programming': ['Unique Paths','Longest Common Subsequence','Best Time to Buy and Sell Stock with Cooldown','Coin Change II','Target Sum','Interleaving String','Longest Increasing Path in a Matrix','Distinct Subsequences','Edit Distance','Burst Balloons','Regular Expression Matching'],
  'Greedy': ['Maximum Subarray','Jump Game','Jump Game II','Gas Station','Hand of Straights','Merge Triplets to Form Target Triplet','Partition Labels','Valid Parenthesis String'],
  'Intervals': ['Insert Interval','Merge Intervals','Non-overlapping Intervals','Meeting Rooms','Meeting Rooms II','Minimum Interval to Include Each Query'],
  'Math & Geometry': ['Rotate Image','Spiral Matrix','Set Matrix Zeroes','Happy Number','Plus One','Pow(x, n)','Multiply Strings','Detect Squares'],
  'Bit Manipulation': ['Single Number','Number of 1 Bits','Counting Bits','Reverse Bits','Missing Number','Sum of Two Integers','Reverse Integer'],
};

export interface Entry { day: number; id: string; problem: string; topic: string }
export interface Unit { topic: string; entries: Entry[] }

let day = 0;
export const units: Unit[] = Object.entries(raw).map(([topic, probs]) => ({
  topic,
  entries: probs.map(problem => {
    day += 1;
    return { day, id: `day-${String(day).padStart(3, '0')}`, problem, topic };
  }),
}));
export const allEntries: Entry[] = units.flatMap(u => u.entries);
