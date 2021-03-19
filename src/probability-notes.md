---
date: [2019-10-26 Sat]
title: Probability notes
---

Worked out of the book *A modern introduction to probability and
statistics*.

# Outcomes, events, and probability

-   The sample space ($Ω$) is the set of possible outcomes of an
    experiment
-   An event is a set of outcomes
-   Probability is a *function* whose domain are events, and
    satisfies:
    1.  $P(A) ≥ 0$ for every event $A$
    2.  $P(Ω) = 1$
    3.  $P(A_1 ∪ A_2 ∪ …) = P(A_1) + P(A_2) + …$ if the $A_{i}$s are
        disjoint events

$A$ and $B$ being disjoint has the meaning of set theory (their
intersection is empty), which is also expressed as: $A$ and $B$ are
mutually exclusive.

This definition of probability also applies to $Ω$ being countably
infinite. The classic example is the number of coin throws to get the
first heads.

Note that $B = (B ∩ A) ∪ (B ∩ A^c)$, which is a disjoint union, so
$P(B) = P(B ∩ A) + P(B ∩ A^c)$. This pattern of using a partition of
$Ω$ (here $\{A,A^c\}$) comes up again and again.

----------------------------------------------------------------------

# Conditional probability and independence

-   $P(B | A) = P(B ∩ A) / P(A)$, is the conditional probability of
    $B$ given $A$ (defined when $P(A) > 0$)
-   multiplication rule: $P(B ∩ A) = P(B | A) P(A)$
-   law of total probability: $A_1, …, A_k$ a partition of $Ω$, then
    $P(B) = P(B | A_1) P(A_1) + … + P(B | A_k) P(A_k)$

The law of total probability is simply the partition pattern with the
multiplication rule applied.

-   Bayes' rule ties $P(B | A)$ and $P(A | B)$ through $P(A ∩ B)$
-   Independence has 12 equivalent formulas: $P(B | A) = P(B)$, $P(A |
    B) = P(A)$, $P(B ∩ A) = P(B) P(A)$, and the nine other ones
    obtained by replacing $B$ by $B^c$, $A$ by $A^c$, or both.

Useful: $P(B | A) + P(B^c | A) = 1$, and in general $P(· | A)$ being
a probability (ie satisfying the definition). $P_A(B)$ is another
notation for $P(B | A)$, putting forth that $P(· | A)$ is a
probability.

What's the probability of drawing two aces from an ordinary deck of 52
cards? If $A$ is drawing an ace on the first draw and $B$ an ace on
the second draw: $P(A ∩ B)$. In numbers you would probably say that
it's $(4/52)(3/51)$, ie $P(A) P(B | A)$ (the multiplication rule).

----------------------------------------------------------------------

# Discrete random variables

-   A random variable (discrete or continuous) is a mapping $X : Ω
    \rightarrow ℝ$ that assigns a real number to each outcome
-   There's special notation to express events mapped by $X$. If $x ∈
    ℝ$ and $A \subseteq ℝ$:
    - $\{X = x\} = \{ω ∈ Ω \mid X(ω) = x\}$
    - $\{X ∈ A\} = \{ω ∈ Ω \mid X(ω) ∈ A\}$

    Note that $\{X = x\}$ and $\{X ∈ A\}$ are just notation in the
    context of probability, they don't follow the conventional set
    notation (given on the right side).
-   $X$ is a *discrete* random variable if the range of the mapping is
    finite or countably infinite

One then needs to establish the probabilities for $X$.

Further:

-   Its probability mass function (PMF) is $p_X : ℝ → [0,1];\, p_X(x)
    = P(X = x)$
-   Its (cumulative) distribution function (CDF) is $F_X : ℝ →
    [0,1];\, F_X(x) = P(X ≤ x)$ (which is also $1-P(X>x)$)
-   They can each be defined in terms of the other

Note: $P(X)$ is meaningless, only events have probabilities. $X$ and
$Y$ usually represent random variables, whereas $A$ and $B$ usually
represent events.

----------------------------------------------------------------------

# Classic discrete probability distributions

Uniform

:   

Bernoulli: $X\sim Ber(p)$
:   $Ran(X)=\{0,1\}$, models success ($\{X=1\}$) with probability $p$
    and failure ($\{X=0\}$) with probability $1-p$.

Binomial: $X\sim Bin(n,p)$
:   $Ran(X)=\mathbb{N}$, models the number of successes in $n$
    independent $Ber(p)$ trials. Work out the pmf, the binomial
    coefficient should appear (hence the name).

Hypergeometric: $X\sim Hyper(N,K,n)$
:   Cousin to binomial: it also models $n$ trials, but out of a
    (fixed) set of $N$ elements containing $K$ successes, without
    replacement.

Geometric: $X\sim Geo(p)$
:   $Ran(X)=\mathbb{Z}^+$, models how many independent $Ber(p)$ trials
    before getting the first success (ie $P({X=k}) = (1-p)^{k-1}p$).
    Note that $P(X>k)$ (the right tail of the distribution) expands to
    $(1-p)^k$ (which is the probability of $k$ independent failures).
    And then using that fact on the right tail, $P(X>s+t\mid
    X>s)=P(X>t)$. This is the memory-less property.

Negative binomial: $X\sim NB(r,p)$, $r≥1$
:   $Ran(X)=\mathbb{N}$, models the number of failures before $r$
    successes in independent $Ber(p)$ trials. Note that in binomial,
    the number of trials is fixed ($n$). In negative binomial, the
    number of successes is fixed ($r$). $P({X=k}) = {k+r-1\choose k}
    (1-p)^k p^r$.

If an experiment has several outcomes, and you're concentrating on one
of the outcomes, it's sometimes useful to see that particular outcome
as a Bernoulli trial. The probability of that outcome is the
probability of "success" (and the probability of the complement that
of "failure").

When counting possible draws to get a probability, can you fix the
first element to simplify calculations?

----------------------------------------------------------------------

# Continuous random variables

-   $X$ is a *continuous* random variable if there exist $f : ℝ → ℝ$
    such that
    1.  $f(x) ≥ 0$ for all $x$
    2.  $∫_{-∞}^∞ f(x)\, dx = 1$
    3.  $P(a ≤ X ≤ b) = ∫_a^b f(x)\, dx$ for all $a ≤ b$

    Note $f(x)$ can be greater than 1 for some values of $x$.
-   The function $f$ is the PDF of $X$.
-   The concept of PMF isn't useful here since $P(X = x) = 0$.
-   The CDF however is again $F : ℝ → [0,1];\, F(x) = P({X ≤ x})$.
    -   $F$ is the primitive of $f$.

----------------------------------------------------------------------

# Classic continuous probability distributions

Uniform: $X \sim U(a,b)$
:   $f_X = 1/(b-a)$

Exponential: $X \sim Exp(λ)$, $λ > 0$
:   $P(X>x) = e^{-\lambda x}$ for $x ≥ 0$. Question: is the concept of
    half-life related? All exponential distributions I've come across
    seem to be time-based. Also: time intervals between arrivals in a
    queue?\
    Exponential is $Geo(p)$ taken to the limit:
    $P(X>k)=(1-p)^k=(1-λx/k)^k\to e^{-\lambda x}$ when $k\to\infty$.
    For large $k$ (and small $p$), $Geo(p)$ has the same behavior as
    $Exp(\lambda)$ around $x=pk/\lambda$.

Normal: $X \sim N(μ,σ^2)$
:   $P(Z≤z)=Φ(z)$. $Φ$ is the CDF of the *standard* ($μ=0$, $σ=1$)
    normal distribution. Non-standard normal distributions are
    transformed into the standard one with $Z=(X-μ)/σ$ (see
    computations with random variables). A data point $z$ value (its
    z-score) expresses how many standard deviations away from the mean
    it is (applicable to other distributions as well, such as
    Poisson). Surprisingly, there is no expression for $Φ$ using the
    usual functions: you rely on numerical integration of the PDF (erf
    is not a usual function).

Pareto: $X \sim Par(α)$, $α > 0$
:   $P(X > x) = x^{-\alpha}$ for $x ≥ 1$. $X$ is distributed according
    to a power law. Those are extensively mentioned in *The Black
    Swan*. The Pareto distribution models for example income
    distribution and size of cities. Note that the tail doesn't taper
    off as fast as exponential.

The quantile function is the inverse function of the CDF. Note that the CDF
doesn't always have an inverse function, but the quantile function can
still be defined in a meaningful way. In short:

- Distribution function: $F_X : \mathbb{R} \rightarrow [0,1]$
- Quantiles: $q_X : [0,1] \rightarrow \mathbb{R};\, q_X(p)=F_X^{-1}(p)$
- Percentiles: $p90 = q(.90)$

In R, `qnorm` gets you the quantile function of the normal distribution. Like the normal distribution function, it doesn't have a closed form.

----------------------------------------------------------------------

# Simulation

Produce a generator whose output follows a random variable $X$ with distribution function $F_X : ℝ → [0,1]$. You are given $U \sim U(0,1)$.

On one hand, $F_X(x) = P(X ≤ x) ∈ [0,1]$ for $x∈ℝ$. On the other,
$F_U(u) = P(U ≤ u) = u$ for $u∈[0,1]$. Combining the two, $F_U(F_X(x))
= P(U ≤ F_X(x)) = F_X(x)$. Since $F_X$ is increasing, applying its
inverse function (which is also increasing) on both sides of the
inequality, preserves order. Hence $P(F_X^{-1}(U) ≤ x) = F_X(x)$. In
other words, $F_X^{-1}(U)$ has same CDF as $X$. (Note the CDF doesn't
always have an inverse function since it's not required to be
one-to-one. However, a meaningful function can still be worked out.)
In other material (eg on Wikipedia), this is called inverse transform
sampling.

Similar reasoning can be applied if you start with a non-uniform
generator to transform it into a uniform one.

You can now simulate a model. The simulation should be repeated, say a
1000 times, to get a sense of the probability distribution of the
results!

----------------------------------------------------------------------

# Expectation and variance

Expectation (also expected value, mean, "espérance" in French)
:   *Discrete*: $E[X] = ∑_x x\, P(X = x)$\
    *Continuous*: $E[X] = ∫_{-∞}^∞ x\, f(x)\, dx$

**Change-of-variable**. Given $g : ℝ → ℝ$:
:   *Discrete*: $E[g(X)] = ∑_x g(x)\, P(X = x)$\
    *Continuous*: $E[g(X)] = ∫_{-∞}^∞ g(x)\, f(x)\, dx$\
    This one is very important. Linearity of expectation, change of
    unit (including for variance), they all stem from here. In Henk
    Tijms' book it's called *the substitution formula*.

Variance
:   $Var(X) = E[(X - E[X])^2]$ (definition)\
    $Var(X) = E[X^2] - E[X]^2$ really used for calculations

Change-of-unit. Given $r,s ∈ ℝ$:
:   $E[r X + s] = r E[X] + s$\
    $Var(r X + s) = r^2 Var(X)$

Expectation and variance require real numbers and hence apply to
random variables (and not to events in general since events can be
anything). Also, variance is an expectation by definition.

Scaling the dataset by $r$ scales its variance by $r^2$. It'd be great
if instead the amount of variability scaled the same (think scaling
inches to centimers). In other words, if there was a $σ$ such that
$σ(r X + s) = r σ(X)$. There is: $σ(X) = \sqrt{Var(X)}$ satisfies this
constraint (actually $σ(rX+s)=|r|σ(X)$). It's called the standard
deviation of X.

Computing variance with the definition is cumbersome (you need to keep
all values until the end). The alternate formula is much better. You
only need a running sum of values and a sum of their squares. The ping
command [computes the standard deviation of round-trip
times](https://github.com/iputils/iputils/blob/1ab5fafee6261369d962eb27e2fe08c8418bd74e/ping/ping_common.c#L905-L907)
this way.

$Par(α)$ has infinite expectation if $α ≤ 1$ (use integration by
parts). Conclusion: expectation isn't always defined!

----------------------------------------------------------------------

# Computations with random variables

$g : ℝ → ℝ$. $X$ a random variable. What's the new distribution after
transformation, ie of the new random variable $Y = g(X)$?

-   *Discrete $X$*: New outcomes form the set $\{y\mid g(x)=y\}$.
    Probabilities: $P(Y=y) = P(g(X)=y) = P(X\in g^{-1}(y))$.
-   *Continuous $X$*: Can't do the same as missing a PMF. However, the
    CDF is $F_Y(y) = P(Y ≤ y) = P(g(X) ≤ y)$, which you can transform
    into $P(X …)$ depending on the nature of $g$, and finally relate
    to $F_X$. Differentiate $F_Y$ if you need the PDF.\ Example: If
    $X$ is normally distributed, try the change of variable
    $Z=g(X)=(X-μ)/σ$ in the integral definition. It gives you the way
    to relate any normal distribution to the *standard* normal
    distribution.
-   If $g$ is convex ($g'' ≥ 0$, think $x^2$), then $E[g(X)] ≥
    g(E[X])$ (Jensen's inequality).\
    (No proof given, just the visualization when $X$ has two
    outcomes.)\
    If $g$ is concave ($g'' ≤ 0$, think $x^{0.5}$), then
    $E[g(X)] ≤ g(E[X])$.\
    (Proof: if $g$ is concave, $-g$ is convex.)

$X_1,…,X_n$ iid random variables. Distribution of $\max$ and $\min$?

-   $P(\max(X_1,…,X_n) ≤ x) = P(X_1 ≤ x, …, X_n ≤ x)$\
    Which gives, because they're independent (see next section):\
    $F_{\max}(x) = (F_X(x))^n$\
    $F_{\min}(x) = 1-(1-F_X(x))^n$
