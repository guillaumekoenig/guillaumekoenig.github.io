---
title: Search data structures
---

# Binary search complexity

[2019-09-28 Sat]

Okay, $\log_2(n)$ in the worst case, but why?

The search is over an array of $n$ sorted elements, with input an
element to search for. Let $f(n)$ be the number of steps to either
reach the element, or conclude it is absent from the array.

How does $f$ behave? An array twice as large adds only a single extra
step: testing the middle element. Hence $f(2n)=f(n)+1$. Also $f(1)=1$. Does $f$ have a closed form? Yes, check the recurrence relation solves to $f=\log_2$. (For example
changing $n$ for $2^m$.)

Also: [Master
theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)).

---

# Search within sorted collections

[2023-09-23 Sat]

Note that any data structure in which elements are sorted can be
binary-searched over. Moreover, they offer **range queries**: find the
lower and upper elements and return all elements in between. (This is
in contrast to hashes, which only offer point queries.)

Examples of data structures with sorted elements include red-black trees, AVL-trees,
B-trees (self balancing search trees more in general), prefix trees, and skip
lists. The defining characteristic is logarithmic search time.

Amazingly, in Python none of them come by default. Only hash-based data structures do. You would have to import from the third-party `sortedcontainers`. In C++ some do come by default. For example, `map<K,V>` are implemented with red-black trees.

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

---

# Prefix trees (tries) / radix trees

- An implementation (Redis): [rax](https://github.com/redis/redis/blob/unstable/src/rax.c) (but implement one for your needs!)

Basic data structure:

```
Node {
  Useful payload
  Children: (substring to match) -> Node
}
```

Useful payload can be many things. It could be:

1. A bool (to implement set)
1. A count (to implement multiset, or count for a particular prefix)
1. A list/maxheap of completions (to implement autocomplete)
1. A list of keyspaces associated with this particular prefix

Note the last two: In the former, the input is a prefix. In the latter, the input is a string for which we want to find all matching prefixes in the tree (keyspaces).

Children is a map from the next bits of data (to match) to corresponding nodes. There are many optimization opportunities there. Bits could be an entire substring ("path compression"). Bonus points if 1) inlined in the node and 2) combined with payload and node pointer, it fits in a cache line (64 bytes). Children could also be a small inline associative array of a few byte values to Node (again to fit in cache line). Beyond cache line size, Children could be a heap allocated 256 associative array (also called a 256-radix tree). The takeaway is you optimize your implementation by juggling different node types.

Complexity: $O(\text{length of datum})$ for point queries, regardless of the number of elements in the collection.
