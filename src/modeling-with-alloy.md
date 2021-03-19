---
date: [2021-05-23 Sun]
title: Modeling with Alloy
---

Exercises in chapter 3 of *Software Abstractions*.

# Properties of Binary Relations

``` alloy
module example

run {
  let Univ = univ - Int | some r: Univ -> Univ {
    some r         -- non-empty
    r.r in r       -- transitive
    no r & iden    -- irreflexive
    ~r in r        -- symmetric
    ~r.r in iden   -- functional
    r.~r in iden   -- injective
    Univ in r.Univ -- total
    Univ in Univ.r -- surjective
  }
} for 4
```

No relation r satisfies all these constraints at the same time, and
the Alloy analyzer says so ("No instance found. Predicate may be
inconsistent."). Removing some constraints starts to show
corresponding relations. I was surprised that univ seems to contain
integers [-8..7], instead of just the atoms Univ0-Univ3 (since I
request max 4 atoms in the universe). I still don't know why, but
hence why I've defined Univ to remove the integers.

Removing just transitive. There are two solutions,
r~1~={(Univ0,Univ1),(Univ1,Univ0)} and
r~2~={(Univ0,Univ3),(Univ3,Univ0),(Univ1,Univ2),(Univ2,Univ1)}. I was
expecting more instances (one with a tuple (Univ0,Univ2) for example),
however asking for more instances (Command-N), yields, "There are no
more satisfying instances. Note: due to symmetry breaking and other
optimizations, some equivalent solutions may have been omitted.".
Which is spot on, ie why I don't see a relation containing
(Univ0,Univ2). Awesome.

Removing just irreflexive. Four instances, all of which are included
in identity.

Removing just symmetric. No instance with the remaining constraints.

Removing just functional. No instance.

Removing just injective. No instance.

Removing just total. No instance.

Removing just surjective. No instance.

Actually no relation other than the empty relation seems to be at the
same time transitive, irreflexive, and symmetric. Hence why no
instance for the last four tests.

Update. The run syntax seems to have the more general form "run { … }
for N Set1, M Set2", where N and M indicate how many atoms Set1 and
Set2 each have. The syntax "run { … } for N" seems to be shorthand for
"run { … } for N Univ". The following seems to work as well to remove
integers (ie without having to define Univ as above):

    run {
      some r: univ -> univ {
        ...
      }
    } for 4 Univ, 0 Int  -- confusingly univ must be capitalized here

Yet another way:

    run {
      some r: univ -> univ {
        ...
      }
    } for 4 but 0 Int

The
[documentation](https://alloy.readthedocs.io/en/latest/language/sets-and-relations.html#integers)
says that the scope for Int defaults to 4 (meaning 4-bit signed
integers), explaining why [-2^3^..2^3^-1] is part of univ. Showing
the parse tree (from the menu) indicates that module integer is opened
automatically.

## Trying out on my own

A relation in a 4-element universe where every element is related to
every other element (including itself):

    module example

    run {
      some r: univ -> univ {
        all s,t: univ | s -> t in r
      }
    } for exactly 4 Univ, 0 Int

First I failed using #r = 16 (ie, forcing cardinality to 16). Even
though it should have worked, there seems to be some integer
overflowing details which I am not understanding (despite "Prevent
overflows: Yes" in the options).

Update: if I do 6 Int (up to 31) to include 16, and define r on
(univ-Int) -\> (univ-Int), it works. However it has many more vars and
hence is longer to evaluate.

# Relational and Predicate Calculus Styles

    assert nonempty {
      all r: univ -> univ | some r iff
        some x, y: univ | x -> y in r
    }
    assert transitive {
      all r: univ -> univ | r.r in r iff
        all x,y,z: univ | x->y in r and y->z in r => x->z in r
    }
    assert irreflexive {
      all r: univ -> univ | no iden & r iff
        all x: univ | x->x not in r
    }
    assert symmetric {
      all r: univ -> univ | r in ~r iff
        all x,y: univ | x->y in r => y->x in r
    }
    assert functional {
      all r: univ -> univ | ~r.r in iden <=>
        all x,y,y': univ | x->y in r and x->y' in r implies y=y'
    }
    assert injective {
      all r: univ -> univ | r.~r in iden <=>
        all x,x',y: univ | x->y in r and x'->y in r implies x=x'
    }
    assert total {
      all r: univ -> univ | univ in r.univ <=>
        all x: univ | some y: univ | x->y in r
    }
    assert surjective {
      all r: univ -> univ | univ in univ.r <=>
        all y: univ | some x: univ | x->y in r
    }

    check nonempty
    check transitive --for 3 but 0 Int
    check irreflexive
    check symmetric
    check functional --for 0 but 1 Int
    check injective --for 0 but 1 Int
    check total
    check surjective

Note in this book, injective is a property of relations in general. In
another book (*How to prove it*), injective is a property of specific
relations only, ie those that are functions (functional and total).

# Refactoring Navigation Expressions

    assert union {
      all s: set univ | all p,q: univ -> univ | s.(p+q) = s.p + s.q
    }
    assert intersection {
      all s: set univ | all p,q: univ -> univ | s.(p& q) = s.p & s.q
    }
    assert difference {
      all s: set univ | all p,q: univ -> univ | s.(p-q) = s.p - s.q
    }

    check union for 4 but 0 Int
    check intersection for 2 but 0 Int
    check difference for 2 but 0 Int

Join seems to be distributive over union: No counterexample is found.

Join is not distributive over intersection: Alloy finds a
counterexample. Even with only two elements. Namely: s={(0),(1)}
p={(0,0)} q={(1,0)}. p&q is empty, but s.p&s.q={(0)}. Alloy's
evaluator is super convenient for checking these values of the
counterexample.

Join is not distributive over difference. Counterexample with only two
elements: s={(0),(1)}, p={(0,0),(0,1)}, q={(1,1),(1,0)}. Then p-q=p,
s.(p-q)=s.p={(0),(1)}. However s.p-s.q={}.

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

For a directed graph and directed tree (with isTree from 5):

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
operator.
