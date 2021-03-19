---
date: [2020-05-29 Fri]
title: Proof strategies
---

In logic, statements are either true or false. There is no in-between.
Also, true and false are the negation of one another.

A proof is valid if true statements (the premises), yield, by
deductive reasoning, to another true statement (the conclusion). Any
instance of true premises yielding to the conclusion being false
invalidates the proof (how you disprove something).

# Proving $P\rightarrow Q$ and other formulas with logical connectives

Notice there is no premise here. Only a conclusion. You want to know
whether its formula always comes out true.

  $P$   $Q$   $P\rightarrow Q$
  ----- ----- ------------------
  F     F     T
  F     T     T
  T     F     F
  T     T     T

  : Truth table of $\rightarrow$

When $P$ is false, the formula is true no matter what $Q$ is (first
two lines of the table). So the remaining question is when $P$ is
true. If, from $P$ being true, you show that $Q$ must be true as well,
then the formula is true in that situation (fourth line of the table).
Since you've shown that $Q$ must be true if $P$ is true, the formula
is never false (ie the third line of the table never applies).

Hence the proof strategy: to prove $P\rightarrow Q$, assume $P$ (ie
assume $P$ is true) and show $Q$ (ie show $Q$ is true). In that case
$P\rightarrow Q$ is always true.

Why is this the truth table for implication? It is defined to express
the statement: if $P$ is true, then $Q$ is true. Try on: if $x>2$,
then $x^2>4$.

# Proof by contradiction

Statements are always either true or false. Proving a statement by
contradiction is assuming one of those and showing that it would prove
true another statement that we know to always be false (the
contradiction). So the assumption must have been incorrect, and the
only remaining possibility must be the correct one. It's called
*reductio ad absurdum* in Latin (reduction to absurdity).

For example, checkout these strategies:

-   $(Q\rightarrow R)\land(Q\rightarrow\neg R)$ to show the equivalent
    $\neg Q$
-   $P_1\land P_2\land Q\rightarrow \neg P_1$ to show the equivalent
    $P_1\land P_2\rightarrow\neg Q$

## Example: Irrationality of $\sqrt{2}$

Prove the statement $\sqrt{2} \not \in \mathbb{Q}$. It's a negative
statement, where you can't distribute the negation. It's a classic
example when discussing proofs by contradiction.

Assume $\sqrt{2} \in \mathbb{Q}$. Then there exists two integers $p$
and $q$ such that $\sqrt{2}=\frac{p}{q}$. Further, they can be chosen
so that they aren't both pair (separate proof). So $p^2=2q^2$, $p^2$
is pair. If $p^2$ is pair, $p$ must be as well (separate proof), say
$p=2r$. Hence $(2r)^2=2q^2$, or $4r^2=2q^2$, or $2r^2=q^2$. By the
same argument, $q$ is pair as well. Both $p$ and $q$ are pair,
contradicting the fact that they were chosen to not both be. So the
assumption that $\sqrt{2}$ is rational must have been incorrect.

# Consistency of the logic

Proof by contradiction is powerful. First you assume the statement's
negation, then reject it by showing it doesn't respect the rules of
logic (it leads to a statement that is both true and false). For some
statements, it is the only way to prove them.

The assumption that is made serves as an escape valve. Because it was
only tentative, it is blamed for proving the contradiction. But what
if you proved a contradiction without needing to make any assumption?
That'd be very bad right? It would raise doubt about the whole proof
by contradiction business.

That's what Russell's paradox is.
