---
date: [2021-01-02 Sat]
title: Functions
---

Chapter 5 of *How to prove it*.

# Functions

-   What is a function from $A$ to $B$? A function is a *relation*
    from $A$ to $B$, where every element of $A$ appears exactly once.
    $∀x ∈ A (∃!y ∈ B ((x,y) ∈ f))$.
-   What is the notation for indicating $f$ is a function from $A$ to
    $B$? $f : A → B$.

It's fun seeing how relations are more general than functions. Since
functions are relations and relations are sets, functions are sets :
let $f = \{(x,y) ∈ ℝ^2 \mid y = x^2\}$, then $(2,4) ∈ f$.

# One-to-one and onto

-   A function $f : A → B$ is one-to-one (injective)? $¬∃a,a' ∈ A
    (f(a) = f(a') ∧ a ≠ a')$.
-   A function $f : A → B$ is onto (surjective)? $∀b ∈ B ∃a ∈ A (f(a)
    = b)$.

One way to think about injective and surjective is as properties of
the range of the function. Injective: each element of the range is
mapped from at most one element (of the domain). Surjective: each
element of the range is mapped from at least one element (of the
domain).

If the function is both injective and surjective, each element of the
range is mapped from at most and at least one element of the domain,
ie it's mapped from exactly one element of the domain. The function is
bijective.

In another book, I have seen the definition of injective and
surjective being applied to relations (not just functions). However in
that case injective and surjective together do not imply bijective,
since unlike a function, a relation doesn't have to map every element
of the domain to an element of the range.

# Inverses of functions

-   $f : A → B$ and $X ⊆ A$. Image of $X$ under $f$? $f(X) = \{f(x)
    \mid x ∈ X\}$.
-   $f : A → B$ and $Y ⊆ B$. Inverse image of $Y$ under $f$?
    $f^{-1}(Y) = \{a ∈ A \mid f(a) ∈ Y\}$.

Note that in this definition, $f^{-1}$ needs not be a function.
(However check that it matches the other definition of $f^{-1}$
defined when $f$ is one-to-one and onto.)

----------------------------------------------------------------------

# Theorems

-   $f$ and $g$ functions from $A$ to $B$. If $∀x ∈ A (f(x) = g(x))$,
    then $f = g$.
-   One-to-one is logically equivalent to $∀a,a' ∈ A (f(a) = f(a') → a
    = a')$.
-   $f : A → B$ is one-to-one and onto. Then $f^{-1} : B → A$ (ie, the
    inverse relation is a function from $B$ to $A$).

----------------------------------------------------------------------

# Big-oh

$F = \{f \mid f : \mathbb{Z}^+ \to \mathbb{R}\}$. $g \in F$. Then $f
\in O(g)$ ("$f$ is big-oh of $g$") if:

$\exists a \in \mathbb{Z}^+ \exists c \in \mathbb{R}^+ \forall k≥a,
|f(k)|≤c |g(k)|$.
