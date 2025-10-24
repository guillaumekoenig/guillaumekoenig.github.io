---
date: [2025-10-12 Sat]
title: Algo review
---

# 1. Search
[Search data structures](./search-data-structures.md)

# 2. Dynamic programming

: Classic recurrence relations

|Output|`p(n,k)`|How to read|
|-|--|--|
| **Partitions of an integer** | `p(n-k,k) + p(n,k-1)` | Either use summand `k`, or skip for a lower one |
| [**Ways to give change**](https://github.com/guillaumekoenig/projecteuler/blob/master/src/Prb/Prb031.hs) | | Variant; either use coin or skip for a coin of different value |
| [**Combinations**](https://gist.github.com/guillaumekoenig/5197a29086f1dbb35bd0cc78cf820c28) | `p(n-1,k-1) + p(n-1,k)` | Either use element from set of `n` this one time, or skip it |
| [**Combinations with rep**](https://gist.github.com/guillaumekoenig/a9ba49446721504bc1d021a7a6f6c90c) | `p(n,k-1) + p(n-1,k)` | Either use element from set of `n`, or skip it |

Remarks:

- You also need to think through the termination condition(s)
- All of these benefit from computing prior values and looking them up to compute the current value (bottom-up dynamic programming)

## Fewest number of coins to give change
`p(n)=1+min{p(n-c)|c in coins}`.

## Kadane: maximum subarray sum
Consider the max of all suffix subarrays ending at `j`: `p(j)=max(p(j-1)+arr[j],arr[j])`. Then you're looking for the max over all `j`s.

## Longest common substring
`LCS(i,j)=if s1[i]==s2[j] { 1+LCS(i-1,j-1) } else 0`. Build the LCS array bottom-up.

Doesn't work to find palindrome with reverse! eg `aaca` and `acaa`. You want to test around a given char for palindrome. Further, notice that `aca` is a palindrome, but so is `bb`.

# 3. Greedy algorithms
*Many sequence problems rely on maintaining partial solutions as you iterate*.  This results in problems with linear time solutions (when it isn't obvious that they would exist at first).

## Increasing triplet subsequence

Given an array, say if there exists `(i,j,k)` such that `i < j < k` and `arr[i] < arr[j] < arr[k]`.

A match must satisfy: `min{arr[i]|i<j} < arr[j] < max{arr[k]|j<k}`.

Hence: Build an array of prefixes using min, and an array of suffixes using max (both in linear time). Then using them you can check each element of `arr` for an increasing triplet.

Better: Doable in constant space if you scan `arr` and keep first-min, second-min: then finding one `arr[i]` > second-min is sufficient and necessary for a match to exist.

## Minimum spanning tree
Kruskal. Start with nodes as disjoint sets. Test edges from minimum weight to maximum weight, keeping those that join sets.

# 4. Python
```python3
for i,v in enumerate(nums):
    pass
```

Reverse a string s="abc": `s[::-1]`. Can use start:stop with regular indices, but beware that 2 and -1 are the same index.

Last 3 chars: `s[-3:]`.

`sortedcontainers`: SortedList/SortedSet/SortedDict, with indexing and bisect methods. `bisect_left` for lowest index whose value is ≥.

Two dimensional array: `[[0] * m for _ in range(n)]`. Force creation of separate lists.

0 is falsy. Use `is not None` where appropriate.

Heaps are under `heapq` in python. `heapify` to turn a list into a heap (in place). Need `heappop` (not `pop`!) to remove the min element. You can peek by looking up the element at index 0. By default it's a min heap. The trick for max heap is to insert opposite values.

For non-prio queues (eg for BFS), use `deque` (in `collections`). pop/popleft, append/appendleft.

# 5. Other
Do first 50 of [spoj classical problems](https://www.spoj.com/problems/classical/).
