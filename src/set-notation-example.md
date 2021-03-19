---
date: [2020-05-02 Sat]
title: Set notation example
---

Rewrite
$\mathcal{P}(\cup_{i\in I}A_i)\nsubseteq\cup_{i\in I}\mathcal{P}(A_i)$
with logical connectives (p. 81 in *How to prove it*). $\mathcal{P}$
is the powerset operator.

Start with the outermost symbol, "is a subset of", negated:
\[\neg\forall x(x\in \mathcal{P}(\cup_{i\in I}A_i)\to x\in \cup_{i\in
I}\mathcal{P}(A_i))\]

Let's simplify by defining the statements
$P(x)=x\in\mathcal{P}(\cup_{i\in I}A_i)$ and
$Q(x)=x\in\cup_{i\in I}\mathcal{P}(A_i)$:
\[\neg\forall x(P(x)\to Q(x))\]

Rewrite implication, and distribute negation:
\begin{align*}
&\neg\forall x(\neg P(x)\lor Q(x)) \\
&\exists x \neg(\neg P(x)\lor Q(x)) \\
&\exists x (P(x)\land \neg Q(x))
\end{align*}

Work on $P$ (note $x$ is a set):
\begin{align*}
&P(x)\\
&\leftrightarrow x \in \mathcal{P}(\cup_{i\in I}A_i)\\
&\leftrightarrow x \subseteq \cup_{i \in I}A_i              &&\text{definition of elementhood of $\mathcal{P}$}\\
&\leftrightarrow \forall y(y\in x\to y\in \cup_{i\in I}A_i) &&\text{definition of subset}\\
&\leftrightarrow \forall y(y\in x\to \exists i\in I(y\in A_i))
\end{align*}

Work on $Q$:
\begin{align*}
&Q(x) \\
&\leftrightarrow x\in \cup_{i\in I}\mathcal{P}(A_i) \\
&\leftrightarrow \exists i\in I (x\in \mathcal{P}(A_i)) &&\text{definition of set union} \\
&\leftrightarrow \exists i\in I (x\subseteq A_i) &&\text{definition of elementhood of $\mathcal{P}$} \\
&\leftrightarrow \exists i\in I (\forall y(y\in x\to y\in A_i)) &&\text{definition of subset} \\
&\leftrightarrow \exists i\in I (\forall y(y\not\in x \lor y\in A_i)) &&\text{implication} \\
\end{align*}

Putting it together,
$\mathcal{P}(\cup_{i\in I}A_i)\nsubseteq\cup_{i\in I}\mathcal{P}(A_i)$
is equivalent to:

\[
\exists x(\forall y(y\in x\to \exists i\in I(y\in A_i)) \land \forall i\in I(\exists y(y\in x \land y\not\in A_i)))
\]

# Other things to note

The contrapositive of $P\to Q$ is $\neg Q \to \neg P$ and is
equivalent. The converse of $P\to Q$ is $Q\to P$ and is not equivalent
(nor is it the negation). Check with truth tables.

If an implication and its converse are true, you've established the
equivalence of the two propositions.

Existence distributes over disjunction, universality over conjunction:
\begin{align*}
&\exists x(P(x)\lor Q(x)) \\
&\leftrightarrow \neg\neg \exists x(P(x)\lor Q(x)) \\
&\leftrightarrow \neg \forall x(\neg P(x) \land \neg Q(x)) \\
&\leftrightarrow \neg(\forall x\neg P(x) \land \forall x\neg Q(x)) &&\text{assuming the latter} \\
&\leftrightarrow \exists x P(x) \lor \exists x Q(x) &&\text{distribute negation}
\end{align*}

# Closing remarks

Logic symbols: $\land$, $\lor$, $\neg$, $\to$, $\leftrightarrow$. You
have propositional logic (or sentential logic), ie the logic of
sentences.

Quantifiers: $\exists$, $\forall$. Added to the logic symbols, you
have quantificational logic.

Set notation is simply a convenience on top. For example,
$S=\{x | P(x)\}$ is the set of elements for which $P$ is true.
$x\in S$ is another notation for $P(x)$.

Collectively, the propositions, quantifiers, and set notation are
called first-order logic. It's the language of mathematical
statements.
