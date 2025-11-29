---
date: [2021-05-23 Sun]
title: Modeling with Alloy
---

Exercises in chapter 3 of *Software Abstractions*.

# Characterizing Trees

    pred isTree(r: univ -> univ) {
      some univ

      no x: univ | some x.^r & x  -- no cycle
      all x: univ | lone r.x      -- each node has at most one parent
      one x: univ | no r.x        -- exactly one root node
    }

    run isTree for 4 but 0 Int

No cycle: no node is in its transitive closure through r.

In Alloy's visualizer, Command+N shows more instances.

# Spanning Trees

For a directed graph and directed tree (with isTree from above):

    pred spans(g1,g2: univ -> univ) {
      g1 in g2
    }
    pred show(g,t1,t2: univ -> univ) {
      spans [t1,g] and isTree[t1]
      spans [t2,g] and isTree[t2]
      t1 not = t2
    }
    run show for 3 but 0 Int

For an undirected graph but still a directed tree, simply add \~g in
g.

The characterization of [undirected tree is
different](https://en.wikipedia.org/wiki/Tree_%28graph_theory%29) (in
particular, it doesn't require a single root). I followed [this
hint](http://cs.brown.edu/courses/cs195y/2017/assignments/alloy-2.html).

    pred isUndirectedTree(r: univ -> univ) {
      ~r in r  -- symmetric
      all u,v: univ { u != v => u->v in ^r }  -- connected
      all u,v: univ { u->v in r => u->v not in ^(r - u->v) }
        -- no other path, ie acyclic
      no iden & r  -- no cycle on self
    }

    run isUndirectedTree for 4 Univ, 0 Int

# Characterizing Rings

    sig Node {
      next: set Node
    }

    pred isRing() {
      all n,n': Node { n->n' in ^next }  -- connected
      all n: Node { one n.next }  -- single next element
    }

    run isRing for exactly 4 Node

----------------------------------------------------------------------

# 8 queens and the need to define sequences

[2021-09-07 Tue]

How do you model a checkerboard? In a standard programming language,
you'd probably use an array of array, and index into it. In Alloy, not
so. Everything is a relation. So you might have the set of rows, the
set of columns, and a relation from rows to columns to represent
positions.

    sig Row {}
    sig Col {}
    fun row(r: Row): Row->Col {r <: Row->Col}
    pred show(r: Row, example: Row->Col) {
      example = row[r]
    }
    run show for exactly 4 Row, exactly 4 Col

The above gives an example of a complete row (a relation from one
element of Row to every element of Col). Great. What about diagonals?
This is where it gets more complex. Row and Col elements now need to
be ordered (you guessed right if you guessed introducing new
relations). A sequence instead of a full blown order suffices.

    sig A { next: lone A }
    fact {
      -- remove loops
      no ^(A<:next) & iden
      -- no two elements have the same next (including empty)
      no disj a,a": A | a.next = a".next
    }

Now, both Row and Col need to be ordered. Turns out the only way to
parameterize types in Alloy is via modules:

    module sequence[T]
    ...code using T

However, you can't write sig T {} now as that would redefine type T
that you're precisely trying to pass as parameter to the module.
Still, sig is the only way to introduce new relations to shape via
constraints (function bodies can only be expressions). So there is
this trick of wrapping T in a singleton type (which then gives you an
expression):

    module sequence[T]
    private one sig Ord {
      next: T->lone T
    }
    fun next: T->T { Ord.next }
    fact {
      no ^this/next & iden
      no disj t,t": T | t.this/next = t".this/next
    }

`Ord.next`{.verbatim} is the expression. `this/next`{.verbatim} is the
function (with 0 param). You can add first and last in a similar
fashion. (prev is simply \~this/next.) In fact, Alloy already has a
module with that functionality, called util/ordering. (This is where I
got the singleton trick from.) It also taps into internals to
guarantee that atoms are ordered numerically.

Defining a diagonal is then a matter of saying which starting position
is in the relation, and given a position in the diagonal, which other
position is in the diagonal (sort of defining inductively). From there
you almost have a complete 8 queens.

----------------------------------------------------------------------

# Reflexive transitive closure operator

[2022-08-14 Sun]

You'd expect the below to give a reflexive, transitive relation.
Instead, the evaluator doesn't find any instance. What's going on?

    sig A { r: set A }
    run { r = *r } for 4

Turns out `*r = ^r + iden`{.verbatim}. And iden is the identity
including *all* elements of Univ, not just those of A. By default,
some integers are part of Univ and hence iden. r is constrained on A,
but also required to include iden which has elements outside of A.
Clearly that's not possible, hence why there is no instance.

In this case, a fix is to exclude integers from Univ. But it's a bit
contrived: add another set B, and you have the same problem (B must
remain empty to satisfy the constraint on A because of this indirect
reference to Univ). Really \*r was meant to be used with the join
operator (ie, dot in Alloy).
