---
date: [2020-05-29 Fri]
title: Proof strategies
---

In logic, statements are either true or false. There is no in-between.
You might not know whether a statement is true or false, but logic says that it is one or the other. Also, the negation of a true statement is false, and vice versa.

A proof is valid if statements held to be true (the premises of the proof), lead, by
deductive reasoning, to another true statement (the conclusion of the proof). Finding a proof leading to the negation of the conclusion aimed for disproves it. For example: If the conclusion is of the form "for all", finding a single counter-example is enough to make the conclusion false.

Deductive reasoning is combining true statements with logical connectives into further true statements.

# Proving $P\rightarrow Q$ and other formulas with logical connectives

Given $P$ and $Q$, is $P\rightarrow Q$ true? It depends on the particular $P$ and $Q$. The truth table of $\rightarrow$ informs us how.

  $P$   $Q$   $P\rightarrow Q$   $\neg P\lor Q$
  ----- ----- ------------------ ---------------
  F     F     T                  T
  F     T     T                  T
  T     F     F                  F
  T     T     T                  T

  : Truth table of $\rightarrow$

To show that the formula is always true, you need to show the third
line cannot happen.

Hence the proof strategy: to prove $P\rightarrow Q$, assume $P$ (ie
assume $P$ is true) and show $Q$ (ie show $Q$ is true). In that case
$P\rightarrow Q$ is always true, because then the third line of the
truth table never applies.

Why is this the truth table for implication? It is defined to express
the statement: if $P$ is true, then $Q$ is true. Try on: if $x>2$,
then $x^2>4$.

# Proof by contradiction

Statements are always either true or false. Proving a statement by
contradiction starts by assuming the negation of the conclusion aimed
for to be true. If you manage to show that it leads to a contradiction, then
having assumed the negation of the conclusion must have been incorrect, and the only remaining possibility is that the original conclusion
must actually be true.

What's a contradiction? When deductive reasoning leads to a statement
that is both true and false (which is impossible in logic).

It's called
*reductio ad absurdum* in Latin (reduction to absurdity).

For example, checkout these strategies:

-   $(\neg Q\rightarrow R)\land(\neg Q\rightarrow\neg R)$ to show the equivalent
    $Q$
-   $P_1\land P_2\land\neg Q\rightarrow \neg P_1$ to show the equivalent
    $P_1\land P_2\rightarrow Q$[*](https://gist.github.com/guillaumekoenig/05335f973d17f74dbe4604fc39b486de)

## Example: Irrationality of $\sqrt{2}$

Prove the statement $\sqrt{2} \not \in \mathbb{Q}$. It's a negative
statement, where you can't distribute the negation. It's a classic
example when discussing proofs by contradiction.

Assume the negation, $\sqrt{2} \in \mathbb{Q}$. Then there exists two integers $p$
and $q$ such that $\sqrt{2}=\frac{p}{q}$. Further, they can be chosen
so that they aren't both even (separate proof). So $p^2=2q^2$, $p^2$
is even. If $p^2$ is even, $p$ must be as well (separate proof), say
$p=2r$. Hence $(2r)^2=2q^2$, or $4r^2=2q^2$, or $2r^2=q^2$. By the
same argument, $q$ is even as well. Both $p$ and $q$ are even,
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
