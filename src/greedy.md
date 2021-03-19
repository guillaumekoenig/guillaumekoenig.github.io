---
title: Greedy algorithms
---

*Many sequence problems rely on maintaining partial solutions as you iterate*.  This results in problems with linear time solutions (when it isn't obvious that they would exist at first).

---

# Increasing triplet subsequence

Given an array, say if there exists $(i,j,k)$ such that $i<j<k$ and $arr[i]<arr[j]<arr[k]$.

A match must satisfy: $min\set{arr[i]|i<j}<arr[j]<max\set{arr[k]|j<k}$.

Hence: Build an array of prefixes using min, and an array of suffixes using max (both in linear time). Then using them you can check each element of $arr$ for an increasing triplet.

Better: Doable in constant space if you scan $arr$ and keep first-min, second-min: then finding one $arr[i]$ > second-min is sufficient and necessary for a match to exist.


