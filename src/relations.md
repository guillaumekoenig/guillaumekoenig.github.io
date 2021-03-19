---
date: [2020-09-10 Thu]
title: Relations
---

Chapter 4 of *How to prove it*.

# Relations

-   Ordered pair ? $(a,b)$
-   Cartesian product $A × B$ ? $\{(a,b) \mid a ∈ A ∧ b ∈ B\}$
-   Truth set of $P(x,y)$, $x ∈ A$, $y ∈ B$ ? $\{(a,b) ∈ A × B \mid
    P(a,b)\}$
-   Relation $R$ from $A$ to $B$ ? $R ⊆ A × B$
-   Domain($R$) ? $\{a ∈ A \mid ∃b ∈ B ((a,b) ∈ R)\}$
-   Range($R$) ? $\{b ∈ B \mid ∃a ∈ A ((a,b) ∈ R)\}$
-   Inverse of $R$, $R^{-1}$ ? $\{(b,a) ∈ B × A \mid (a,b) ∈ R\}$
-   $S \circ R$ ? $\{(a,c) ∈ A × C \mid ∃b ∈ B ((a,b) ∈ R ∧ (b,c) ∈
    S)\}$
-   $R$ is reflexive (on $A$) ? $∀x ∈ A (xRx)$. Example: $=$
-   $R$ is symmetric (on $A$) ? $∀(x,y) ∈ A × A (xRy → yRx)$
-   $R$ is transitive (on $A$) ? $∀x,y,z ∈ A (xRy ∧ yRz → xRz)$
-   Identity (on $A$) ? $\{(x,x) \mid x ∈ A\}$

# Ordering relations

An order has two main charateristics: 1) it cannot display symmetry
(after all, you're ordering elements), and 2) it is transitive. Then
you have variants on whether it includes identity, and on whether any
two elements are ordered.

-   $R$ is **antisymmetric** (on $A$) ? $∀(x,y) ∈ A × A (xRy ∧ yRx → x
    = y)$. (An element can be in relation with itself.) Example: $≤$.
-   $R$ is **asymmetric** (on $A$): $∀(x,y) ∈ A × A ((x,y) ∈ R → (y,x)
    ∉ R)$. (No element can be in relation with itself.) Example: $<$.
    Asymmetry implies antisymmetry (converse not true).
-   $R$ is a **partial order** (on $A$) ? Reflexive, transitive, and
    antisymmetric. (Not any two elements are ordered.) Example:
    concurrent operations.
-   $R$ is a **total order** (on $A$) ? Partial order relation, and
    $∀(x,y) ∈ A × A (xRy ∨ yRx)$. (Any two elements are ordered.)
    Example: sequential operations, and in general any sequence.
-   $R$ is **irreflexive** ? $∀x ∈ A ((x,x) ∉ R)$
-   $R$ is a **strict partial order** ? $R$ is irreflexive and
    transitive (the two imply antisymmetry)
-   $R$ is a **strict total order** ? $R$ is a strict partial order
    and $∀(x,y) ∈ A × A (xRy ∨ yRx ∨ x = y)$

To think about:

-   Is identity symmetric or antisymmetric ? Both.

# Closures

In the following, $R$ is a partial order on $A$, and $B \subseteq A$.

-   $b$ is a $R$-**minimal element** of $B$ ? $¬∃x ∈ B (xRb ∧ x ≠ b)$.
    (No other element is in relation with it; there can be several if
    $R$ is not a total order.)
-   $b$ is the $R$-**smallest element** of $B$ ? $∀x ∈ B (bRx)$. (It's
    in relation with all the elements; uniquess, ie "the", is proven
    from the definition, however it may not exist, eg $\{1/k \mid k
    \in \mathbb{Z}^+\}$.)
-   $a$ is a **lower bound** for $B$ ? $a ∈ A ∧ ∀x ∈ B (aRx)$.
    (Similar to smallest except need not belong to $B$.) $a$ an
    **upper bound** for $B$ ? $\forall x \in B (xRa)$.
-   What's the **least upper bound** (LUB) of a set ? The smallest
    element in the set of upper bounds for that set (needs not exist).
-   What's the **closure** of a relation $R ⊆ A × A$, on some
    *property* ? the *smallest set* $⊆ A × A$ among those that include
    $R$ and satisfies *property* (if there is such a smallest set).
    Example: the transitive closure of dependencies in package
    management.

# Equivalence relations

-   $R$ is an **equivalence relation** ? $R$ is reflexive, symmetric
    and transitive.
-   $R$ is a **partial equivalence relation** ? $R$ is symmetric and
    transitive (it doesn't need to be reflexive). Example: equality of
    IEEE 754 floating-point numbers, because
    $(\text{NaN},\text{NaN})\not\in R_=$.
-   What's the **equivalence class** of $x$ (with respect to $R$, $R$
    equivalence relation) ? $[x]_R = \{y ∈ A \mid yRx\}$.
-   What's the **set of all equivalence classes** of elements of $A$
    (with respect to $R$, $R$ equivalence relation) ? $A/R \text{(A
    modulo R)} = \{[x]_R \mid x ∈ A\}$.
-   $F$ is a **partition** of $A$ ?
    1) $∪F = A$
    2) The elements of $F$ are pairwise disjoint
    3) $∀X ∈ F (X ≠ \emptyset)$

    Example: The shards of a database, which collectively hold the
    entire dataset.

Note the definition of partition is unrelated to the definition of
equivalence.

-   $m ∈ ℤ^+$, $(x,y) ∈ ℤ^2$, $x$ is congruent to $y$ modulo $m$ ? $∃k
    ∈ ℤ (x - y = km)$.
-   notation of $x$ is congruent to $y$ modulo $m$ ? $x ≡ y \pmod{m}$.
    (Weirdly, the Unicode name for $≡$ is "identical to".)

----------------------------------------------------------------------

# Theorems

-   $(S \circ R)^{-1} = R^{-1} \circ S^{-1}$
-   $R$ is symmetric iff $R = R^{-1}$
-   If $R$ is an equivalence relation on $A$, then $A/R$ is a
    partition of $A$.
-   If $F$ is a partition of $A$, then $S = ∪_{X ∈ F} (X × X)$ is an
    equivalence relation and $A/S = F$.
-   $m ∈ ℤ^+$, $C_m = \{(x,y) ∈ ℤ^2 \mid x ≡ y \pmod{m}\}$ is an
    equivalence relation on $ℤ$.

----------------------------------------------------------------------

# Practice

In general, focus on the goal, and in particular its definition. The
given is considered after, to prove the goal. Also, rid yourself of
quantifiers using "arbitrary object" on goal and "universal
instantiation" on given (see infer and goal strategies in Proof
Designer).

Knowing theorems on top of definitions is useful as intermediary steps
to other proofs.

----------------------------------------------------------------------

# Cool finds
Given a set, its set of 2-partitions is half as large as its powerset. Think of the bijection from powerset to binary numbers. Observe that a binary number and the one with its bits flipped represent the same 2-partition.
