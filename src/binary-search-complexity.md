---
date: [2019-09-28 Sat]
title: Binary search complexity
---

Okay, $\log_2(n)$ in the worst case, but why?

The search is over an array of $n$ sorted elements, with input an
element to search for. Let $f(n)$ be the number of steps to either
reach the element, or conclude it is absent from the array.

How does $f$ behave? An array twice as large adds only a single extra
step: testing the middle element. Hence $f(2n)=f(n)+1$. Also $f(1)=1$.
Check this recurrence relation solves to $f=\log_2$. (For example
changing $n$ for $2^m$.)

Also: [Master
theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)).

---

# Search within sorted collections

[2023-09-23 Sat]

Note that any data structure in which elements are sorted can be
binary-searched over. Moreover, they offer range queries: find the
lower and upper elements and return all elements in between. (This is
in contrast to hashes, which only offer point queries.)

Examples of data structures with sorted elements include AVL-trees,
B-trees (self balancing trees more in general), prefix trees, and skip
lists. The defining characteristic is logarithmic search time.

---

# Skip lists

- Original paper:
[pugh-skiplists-cacm1990.pdf](https://15721.courses.cs.cmu.edu/spring2018/papers/08-oltpindexes1/pugh-skiplists-cacm1990.pdf)
- An implementation (Redis): [zskiplist](https://github.com/redis/redis/blob/2aad03fa399f520febb8b7db972459bc97484104/src/server.h#L1337-L1357)

Elements (nodes) of the zskiplist contain score, ele, and a variable
number of pointers depending on the level of the node picked (at
random, see paper). Elements of the zskiplist are sorted on (score,
ele). The second key allows the implementation to additionally do
lexicographical search (with the requirement for this to be meaningful
that all the ele's must have the same score). An additional dict
points to nodes of the zskiplist for constant time ele lookup.
