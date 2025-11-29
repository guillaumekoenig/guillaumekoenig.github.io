---
title: Probability notes 2
date: July 2023
---

# Joint distributions and independence

With two randvar $X$ and $Y$, sample space is $\R^2$.

## Joint mass function (density function)
- *Discrete*: $p_{X,Y}(x,y)=P(X=x,Y=y)$
  - It reads as: "the probability that $X$ takes on the value $x$ *and* $Y$ takes on the value $y$". \
- *Continuous*: $f(x,y)$ is a PDF for $(X,Y)$ if
  1. $f\geq 0$
  1. integrates to 1 over the whole sample space, and
  1. for any set $A\subseteq\R^2$, $P((X,Y)∈A) = \iint_A f(x,y)\,dx\,dy$.

## Joint distribution function
$F_{X,Y}(a,b)=P(X≤a,Y≤b)$ (both discrete and continuous)

## Marginal distribution functions
- $F_X(a)=\lim_{b\rightarrow \infty} F_{X,Y}(a,b)$
- $F_Y(b)=\lim_{a\rightarrow \infty} F_{X,Y}(a,b)$
- Marginal functions are so called because they are found in the "margins" of a joint distribution table.

## Independence of random variables
- $X$ and $Y$ are independent if for all $A,B\subseteq \R$, $P(X\in A,Y\in B)=P(X\in A)P(Y\in B)$.
- Intuitively, any event involving $X$ doesn't impact the probability of any event involving $Y$.
- This is also $F_{X,Y}(x,y)=F_X(x)F_Y(y)$. Differentiating with respect to the first and second variables, you get in addition the joint density being the product of densities: $f_{X,Y}(x,y)=f_X(x)f_Y(y)$.

----------------------------------------------------------------------

I realize at this point it would be easier if I had a stronger
foundation in calculus.

I find the quick exercises tedious and boring. Instead, doing the
harder ones from the get go surfaces what's interesting.

----------------------------------------------------------------------

# Covariance and correlation

How do you define the mean when the sample space is $ℝ^2$? You need a function $g : ℝ^2 \rightarrow ℝ$. Then you can have a **substitution formula for joint distributions**:

\begin{align*}
&\E{g(X,Y)}=\sum_x\sum_y g(x,y)P(X=x,Y=y) \\
&\E{g(X,Y)}=\iint g(x,y)f(x,y)\,dx\,dy
\end{align*}

Again, the substitution formula is powerful. You get **linearity of expectation**: For $r, s, t \in ℝ$: $\E{rX + sY + t} = r \E{X} + s \E{Y} + t$. Meaning you can easily compute the expectation of the sum of many random variables (even dependent ones).

You also get **additivity of variance** on independent random variables:
\begin{align*}
\var{X+Y} &= \E{(X+Y-\E{X+Y})^2} \\
&= \var{X}+\var{Y}-2\E{(X-\E{X})(Y-\E{Y})} \\
&= \var{X}+\var{Y}
\end{align*}

The last term vanishes only when $X$ and $Y$ are independent (variance is not linear in general). Then you can again easily compute the variance of many independent variables. Variance of 100 independent Bernoulli trials? $100·\var{X}=100·0.25$.

When they are dependent, the last term gives an idea of how much $X$ and $Y$ vary together (when adjusted against their mean): it's the covariance.

## Covariance
\begin{align*}
Cov(X,Y)&\eqdef\E{(X-\E{X})(Y-\E{Y})} \\
&=\E{XY}-\E{X}\E{Y}
\end{align*}
The expanded formula shows why covariance is 0 when $X$ and $Y$ are
independent (try plugging the discrete definition of expectation).

\[Cov(rX+s,tY+u)=rt\,Cov(X,Y) \text{ for $r,s,t,u ∈ ℝ$}\]

The covariance value changes as you scale one or both random
variables. It'd be great if it wasn't sensitive to scaling, ie if
$ρ(rX+s,tY+u)=ρ(X,Y)$, by somehow cancelling $rt$. Recall that
$σ(rX+s)=|r|σ(X)$. This takes you to...

## Correlation
\[ρ(X,Y)\eqdef Cov(X,Y)/σ_Xσ_Y\]

This definition isn't sensitive to scaling, it's called the
correlation.

\begin{align*}
ρ(rX+s,X)&=r\,Cov(X,X)/(|r|σ_X^2) \\
&=1 \text{ (or $-1$)}
\end{align*}

Perfect (linear) correlation amounts to 1 or -1. Everything else
falls in-between.

----------------------------------------------------------------------

# More computations with more random variables

The previous sections were about the expectation or variance of the
sum or product of multiple random variables. But what about the entire
distribution instead of just the expectation or variance?

If the random variables are independent, the joint probability is the
product of the probabilities (ie $f_{X,Y}(x,y)=f_X(x)f_Y(y)$). For the sum $Z=X+Y$, you have that $F_Z(z)=P(Z\leq z)=P(X+Y\leq z)=\iint_{x+y\leq z} f_{X,Y}(x,y)\,dx\,dy$. Then, the **probability of the sum of two independent random variables** is:

\begin{align*}
F_Z(z)&=\iint_{x+y\leq z} f_{X,Y}(x,y)\,dx\,dy \\
&=\iint_{x+y\leq z} f_X(x)f_Y(y)\,dx\,dy \\
&=\int\left(\int_{-\infty}^{z-y} f_X(x)\,dx\right)f_Y(y)\,dy \\
&=\int F_X(z-y)\,f_Y(y)\,dy \\
f_Z(z)&=\int_{-\infty}^{\infty} f_X(z-y)\,f_Y(y)\,dy \qquad\text{(convolution integral)}
\end{align*}

(The last line is obtained from the previous one with something called Leibniz's rule for differentiation under the integral?). The $f_Z$ formula should make sense: you're after the density along a line: $z=x+y$, where $z$ is fixed. Hence there's only one independent variable to vary on, and hence its reduction to a 1D integral.

**Sum of exponential**: $X\sim \sum Exp(\lambda) = Gam(n,λ)$
: The **gamma distribution** is that of the sum of $n$ *independent*
  $Exp(λ)$ random variables. (I don't think the formula of its PDF is
  too useful to know; it has the gamma function in the denominor, ie
  factorial over reals.) Hence $Gam(1,λ)$ is the same as $Exp(λ)$.

**Sum of normal**: $X\sim\sum_i N(\mu_i,\sigma_i^2)=N(\sum_i\mu_i,\sum_i\sigma_i^2+\text{"covar terms"})$
: The sum of independent normal distributions is normal again and its
  expectation and variance has to be the sum of the individual
  expectations and variances. Note that even if not independent, you
  still get a normal distribution, however the total variance now
  needs to account for covariance between random variables.

Outline of proof that independent $X_1\sim N(0,1)\land X_2\sim N(0,1)\implies X_1+X_2\sim N(0,2)$: Start from the convolution integral for the density of sum above:

\begin{align*}
f_{X_1+X_2}(z)&=\int_{-\infty}^{\infty} f_{X_1}(z-y)f_{X_2}(y)\,dy \\
&=\int_{-\infty}^{\infty}\frac{1}{\sqrt{2\pi\cdot 1}}e^{-\frac{(z-y)^2}{2\cdot 1}}\frac{1}{\sqrt{2\pi\cdot 1}}e^{-\frac{y^2}{2\cdot 1}}\,dy\\
&=...\\
\text{(to show)}&=\frac{1}{\sqrt{2\pi\cdot 2}}e^{-\frac{z^2}{2\cdot 2}}
\end{align*}

Ingredients:

1. $\int_{-\infty}^{\infty} e^{-\frac{u^2}{2}}\,du=\sqrt{2\pi}$ (from probability of $N(0,1)$ over $\R$)
2. $y^2-zy+(\frac{z}{2})^2=(y-\frac{z}{2})^2$
3. Change of variable $u=\sqrt{2}(y-\frac{z}{2})$

Outline of proof that normal stays normal under scaling by $s$, $s\neq 0$. Suppose $X\sim N(\mu,\sigma^2)$. What's the distribution of $Y=sX$? $P(Y\leq y)=P(sX\leq y)=F_X(y/s)=\int_{-\infty}^{y/s} f_X(t)\,dt$. Now do the change of variable $u=st$ so that you integrate from $-\infty$ to $y$. You end up with the cumulative probability for $N(s\mu,s^2\sigma^2)$.

Normal stays normal under sum and under scaling: it stays normal when taking the average. Note this behaviour is not universal, especially with discrete probability distributions (think sum of two Bernoulli random variables).

There are formulas for the **probability of the product and quotient of independent random variables** as well.

Is independence common? In stats, observations stemming from a single
random process are assumed to be independent (and regarded as many
independent random variables).

----------------------------------------------------------------------

# The Poisson distribution and the Poisson process

**The Poisson distribution** is a discrete probability distribution.
It's the binomial distribution taken to the limit (on the number of
trials). My guess is that it gives a single distribution that is
independent of the number of trials and is a useful approximation to
various real life situations.

If $X\sim Bin(n,p)$, $p_X(k)={n\choose k}p^k(1-p)^{n-k}$. Assume an
average rate of events $\lambda>0$ over a $\mathbb{R}$ interval ("unit
time"). Slicing that interval into ever smaller buckets, each bucket
will eventually have 0 or 1 event, making them Bernoulli trials.
Conditioning $p$ on the number of trials: $p=\lambda/n$, or
$\lambda=np$.

In the limit, when $n\to\infty$: ${n\choose
k}(\lambda/n)^k\to\lambda^k/k!$ and $(1-\lambda/n)^{n-k}\to
e^{-\lambda}$. Hence, if $X\sim Pois(\lambda)$,
$p_X(k)=\lambda^ke^{-\lambda}/k!$. If $n$ is large enough (and $p$
small enough), $Bin(n,p)$ behaves like $Pois(\lambda=np)$. Check in
Excel.

Other notes:

- $\E{X}=\var{X}=\lambda$ (don't even need $n$ or $p$!)
  - Hence why the parameter is sometimes simply referred to as $\mu$ (=$\E{X}$)
- Most of the probability mass is within 3 standard deviations (like
  any distribution actually, see Chebyshev's inequality). Tijms gives real life examples of
  comparing z-scores against 3 to determine the probability of a
  situation happening (eg for the purposes of exposing fraud when the
  situation's right tail probability under Poisson is very low).

**The Poisson process** appears when the number of events over a time
(or space) interval follows a Poisson distribution. You're no longer
just looking at unit time with average rate of events $\lambda$, but
any time interval $t$ with average rate $\lambda t$, ie the number of
events on $t$ follows a $Pois(\lambda t)$ distribution. It models well
radioactive decay, certain queuing situations, phone calls received at
an exchange.

The time *between* events follows an $Exp(\lambda)$ distribution. More
surprisingly, given there are $k$ points generated by a Poisson
process on an interval, the points are uniformly distributed on the
interval. In formula, for one point on an interval starting at 0:
$P(X_1\leq s|N([0,t])=1)=\frac{s}{t}$ with $s$ varying over $[0,t]$.

The classic example over space is the grid of London split in 576 squares (unit space), to estimate if London was bombed at random during WW2. An event is a square being hit.

---

# The law of large numbers

Assuming $n$ iid random variables $X_1$, ..., $X_n$ (typically observations of an experiment), all with mean $\mu$ and variance $\sigma$, define the average randvar $\avg{X_n}=\frac{1}{n}(X_1+...+X_n)$. Then:

\begin{align*}
&\E{\avg{X_n}}=\frac{1}{n}(\E{X_1}+...+\E{X_n})=\mu \\
&\var{\avg{X_n}}=\frac{1}{n^2}(\var{X_1}+...+\var{X_n})=\frac{\sigma^2}{n}
\end{align*}

(Note the $X_i$s are independent, hence why additivity of variance applies.) The expectation of $\avg{X_n}$ is $\mu$ and its standard deviation is $\frac{\sigma}{\sqrt{n}}$. The typical distance of $\avg{X_n}$ to $\mu$ is $\sqrt{n}$ smaller than for one $X_i$.

There's a more precise statement using bounds. It looks like with large $n$, most of the probability mass can be made as close to the mean as desired. If you know the underlying distribution, you can compute $P(|\avg{X_n}-\mu|>\epsilon)$ directly, and it will tend to 0 as $n$ grows to infinity. In fact, it holds for any distribution, as can be shown using the following general bound.

**Chebyshev's inequality**: By definition, on the one hand $P(|X-\mu|\geq a)=\int_{|x-\mu|\geq a} f(x)\,dx$, and on the other $\var{X}=\int (x-\mu)^2 f(x)\,dx$. Then think how to get rid of $(x-\mu)^2$ to be able to relate the two integrals. Consider the values of $x$ for which $(x-\mu)^2\geq 1$. Then $\var{X}\geq\int_{(x-\mu)^2\geq 1} f(x)\,dx = P(|X-\mu|\geq 1)$. Swap 1 for $a^2$: $\var{X}\geq\int_{(x-\mu)^2\geq a^2} a^2 f(x)\,dx = a^2 P(|X-\mu|\geq a)$, or $P(|X-\mu|\geq a)\leq\frac{\sigma^2}{a^2}$. It might not be the best bound (compare to a direct probability mass bound for $Exp(1)$), or even a useful bound ($P(|X-\mu|\geq \sigma^2)\leq 1$), however it is *general*. Note for instance that *any* distribution has at least 88% of its probabability mass within 3 standard deviations of its mean, and at least 75% within 2 standard deviations.

**The law of large numbers**: On an average of iid random variables, you end up with: $P(|\avg{X_n}-\mu|>\epsilon)\leq\frac{1}{\epsilon^2}\var{\avg{X_n}}$. It tends to 0 as $n$ grows to infinity.

Suppose you can draw many values out of $X$ and want to rebuild its probability distribution. For example, what's the probability of a draw to fall in some interval $I$? The average of many draws (1 it's in, 0 it's out) will get close to the true value as per the law of large numbers.

Beware distributions whose variance is not finite (for those the law of large numbers does not hold).

---

# The central limit theorem

The law of large numbers said something about the mean and variance of $\avg{X_n}$, the average of iid $X_i$s. The central limit theorem extends that result by giving the entire probability distribution at the limit (after some normalizing).

The variance of $\avg{X_n}$ is $\frac{\sigma^2}{n}$ and collapses to 0 as $n$ grows. However, you can normalize $\avg{X_n}$ to $\sqrt{n}\frac{\avg{X_n}}{\sigma}$ to get a variance of 1. In fact, $\sqrt{n}\frac{\avg{X_n}-\mu}{\sigma}$ has variance 1 and mean 0. Call this new random variable $Y_n$.

The amazing fact of the central limit theorem is that $\lim_{n\rightarrow\infty} P(Y_n\leq a)=\Phi(a)$. The distribution function of $Y_n$ tends to the standard normal distribution _no matter the distribution of the underlying iid $X_i$s_. In fact, the cover of the book represents just that: a bimodal probability distribution, that is added (and scaled) repeatedly, until the majority of the mass ends up between the two modes and into a normal shape. _All the math you missed_ gives a proof, it involves Stirling's approximation.

Since a $Bin(n,p)$ random variable is the sum of $n$ independent $Ber(p)$ random variables, which are thus iid, $\frac{1}{n} Bin(n,p)$ looks roughly normal for sufficiently large $n$ (for example $n>30$). Draw many samples and build a histogram to verify.
