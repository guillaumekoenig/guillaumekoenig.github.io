---
title: Probability notes, part 2
date: July 2023
---

# Joint distributions and independence

Joint probability mass/density function of two randvar $X$ and $Y$
: Sample space is $ℝ^2$.\
  *Discrete*: $p_{X,Y}(x,y)=P({X=x}\text{ and }{Y=y})=P(X=x,Y=y)$.\
  *Continuous*: There is a function $f : ℝ^2 \rightarrow ℝ$ such that
  for all $A \subseteq ℝ \times ℝ$, $P((X,Y)∈A) = \iint_A
  f(x,y)\,dx\,dy$.\
  Of course probability remains positive and adding up to 1 over
  the entire sample space.

Joint distribution function
: $F_{X,Y}(x,y)=P(X≤x,Y≤y)$

Marginal distribution functions
: $p_X(x)=P(X=x,Y≤\infty)$\
  $p_Y(y)=P(X≤\infty,Y=y)$\
  (interval instead of scalar for continuous)\
  They are so called because they are found in the "margins" of a
  joint distribution table.

Independence of random variables
: $P(X\in A,Y\in B)=P(X\in A)P(Y\in B)$ for all $A,B \subseteq ℝ$.\
  Intuitively, any event involving $X$ doesn't impact the probability
  of any event involving $Y$.

----------------------------------------------------------------------

I realize at this point it would be easier if I had a stronger
foundation in calculus.

I find the quick exercises tedious and boring. Instead, doing the
harder ones from the get go surfaces what's interesting.

----------------------------------------------------------------------

# Covariance and correlation

How do you define the mean when the sample space is $ℝ^2$?

You need a function $g : ℝ^2 \rightarrow ℝ$. Then you can have a
substitution formula for joint distributions:

- *Discrete*: $E[g(X,Y)]=\sum_x\sum_y g(x,y)P(X=x,Y=y)$
- *Continuous*: $E[g(X,Y)]=\iint g(x,y)f(x,y)\,dx\,dy$

Again, the substitution formula is powerful. From it derives linearity
of expectation. For $r, s, t \in ℝ$:

$E[rX + sY + t] = r E[X] + s E[Y] + t$

Meaning you can easily compute the expectation of the sum of many
random variables (even dependent ones).

Because variance is an expectation, from the substitution formula also
derives:

$Var(X+Y) = E[(X+Y-E(X+Y))^2] = Var(X)+Var(Y)-2E[(X-E[X])(Y-E[Y])]$

When $X$ and $Y$ are independent, the last term vanishes: variance is
additive for independent random variables (not linear though). You can
again compute the variance of many independent variables this way.
Variance of 100 independent Bernoulli trials? $100·Var(X)=100·0.25$.

When they are dependent, it gives an idea how much they vary together
(when adjusted against their mean): the covariance.

Covariance
: $Cov(X,Y)=E[(X-E[X])(Y-E[Y])]$\
  $Cov(X,Y)=E[XY]-E[X]E[Y]$ (by expansion)\
  The expanded formula shows why covariance is 0 when $X$ and $Y$ are
  independent (try plugging the discrete definition of expectation).\
  $Cov(rX+s,tY+u)=rt\,Cov(X,Y)$ for $r,s,t,u ∈ ℝ$\
  The covariance value changes as you scale one or both random
  variables. It'd be great if it wasn't sensitive to scaling, ie if
  $ρ(rX+s,tY+u)=ρ(X,Y)$, by somehow cancelling $rt$. Recall that
  $σ(rX+s)=|r|σ(X)$.

Correlation
: $ρ(X,Y)=Cov(X,Y)/σ_Xσ_Y$\
  This definition satisfies the above constraint, it's called the
  correlation.\
  $ρ(rX+s,X)=r\,Cov(X,X)/(|r|σ_X^2)=1$ (or $-1$)\
  Perfect (linear) correlation amounts to 1 or -1. Everything else
  falls in-between.

----------------------------------------------------------------------

# More computations with more random variables

The previous sections were about the expectation or variance of the
sum or product of multiple random variables. But what about the entire
distribution instead of just the expection or variance?

If the random variables are independent, the joint probability is the
product of the probabilities. (Formulas for the discrete and
continuous cases.)

Gamma: $X\sim Gam(n,λ)$
: The gamma distribution is that of the sum of $n$ *independent*
  $Exp(λ)$ random variables. (I don't think the formula of its PDF is
  too useful to know; it has the gamma function in the denominor, ie
  factorial over reals.) Hence $Gam(1,λ)$ is the same as $Exp(λ)$.

Sum of normal: $X\sim\sum_i N(\mu_i,\sigma_i)$
: The sum of independent normal distributions is normal and its
  expectation and variance has to be the sum of the individual
  expectations and variances. Note that even if not independent, you
  still get a normal distribution, however the total variance now
  needs to account for covariance between random variables.

There are formulas for the probability of the product and quotient of
independent random variables as well.

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

- $E[X]=Var(X)=\lambda$ (don't even need $n$ or $p$!)
- Most of the probability mass is within 3 standard deviations (like
  the normal distribution). Tijms gives real life examples of
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

---

# The law of large numbers

Assuming $n$ iid random variables $X_1$, ..., $X_n$ (typically observations of an experiment), all with mean $\mu$ and variance $\sigma$, define the average $\bar{X_n}=\frac{1}{n}(X_1+...+X_n)$. Then:

- $E[\bar{X_n}]=\frac{1}{n}(E[X_1]+...+E[X_n])=\mu$
- $Var(\bar{X_n})=\frac{1}{n^2}(Var(X_1)+...+Var(X_n))=\frac{\sigma^2}{n}$ (the $X_i$s are independent)

In other words, the expectation of $\bar{X_n}$ is $\mu$ and its standard deviation is $\frac{\sigma}{\sqrt{n}}$. Meaning the typical distance to $\mu$ is $\sqrt{n}$ smaller than for a single $X_i$.

There's a more precise statement using bounds. It looks like with large $n$, most of the probability mass can be made as close to the mean as desired. Consider $P(|\bar{X_n}-\mu|>\epsilon)$. Relate it to the variance.

Consider this general lower bound on variance. By definition, $Var(X)=\int (x-\mu)^2 f(x)\,dx$. Take $a$ positive such that $(x-\mu)^2>a^2$. Then $Var(X)\geq\int_{(x-\mu)^2>a^2} a^2 f(x)\,dx = a^2 P(|x-\mu|>a)$ (Chebyshev's inequality). It might not be the best bound (for example compare to a direct probability mass bound for $Exp(1)$), however it is general.

On an average of iid random variables, you end up with: $P(|\bar{X_n}-\mu|>\epsilon)\leq\frac{1}{\epsilon^2}Var(\bar{X_n})$. It tends to 0 as $n$ grows to infinity (the law of large numbers).

Suppose you can draw many values out of $X$ and want to rebuild its probability distribution. For example, what's the probability of a draw to fall in some interval $I$? The average of many draws (1 it's in, 0 it's out) will get close to the true value as per the law of large numbers.

Beware distributions whose variance is not finite (for those the law of large numbers does not hold).

---

# The central limit theorem

The central limit theorem is a result that extends the law of large numbers. The variance of $\bar{X_n}$ is $\frac{\sigma^2}{n}$ and collapses to 0 as $n$ grows. However, you can normalize it with $\sqrt{n}\frac{\bar{X_n}}{\sigma}$ to get a variance of 1. In fact, $\sqrt{n}\frac{\bar{X_n}-\mu}{\sigma}$ has mean 0 and variance 1. Call this new random variable $Y_n$.

The amazing fact of the central limit theorem is that $\lim_{n\rightarrow\infty} P(Y_n\leq a)=\Phi(a)$. The distribution function of $Y_n$ tends to the standard normal distribution _no matter the distribution of the underlying iid $X_i$s_. In fact, the cover of the book represents just that: a bimodal distribution, that is added (and scaled) repeatedly, until the majority of the mass ends up between the two modes and into a normal shape. _All the math you missed_ gives a proof, it involves Stirling's approximation.

Since a $Bin(n,p)$ distribution is the sum of $n$ $Ber(p)$ random variables, which are thus iid, it is roughly normal for larger $n$. (Note: don't confuse with histograms where each bucket's value is its own random variable sum)

---

# Exploratory data analysis: graphical summaries

We're now in statistics, concerned with a dataset, for which data points (or observations) are denoted $x_1$, ..., $x_n$ (not random variables).

The simplest graphical summaries are histograms. Choosing a bucket size isn't obvious when you want to preserve features of the dataset. (Note also nothing says you have to use a fixed bucket size, eg recall sparse exponential histograms.) There's a way to optimise some cost function for best bucket size, but it still has drawbacks (features not adequately represented). One can also build an empirical distribution function (with the curve stepping up by $1/n$ at each data point).

A smoother alternative are kernel density estimates. A kernel is a symmetric function around 0 that _is_ a density function (positive and whose area under the curve is 1), eg the Epanechnikov kernel $\frac{3}{4}(1-u^2)$ on [-1,1]. Then the kernel density function is a sum of kernels each centered on a data point (and globally scaled to be a density function). It is denoted $f_{n,h}$ and is smooth. The choice of kernel doesn't matter much. $h$ is the bandwidth of the kernels and again there are methods for obtaining an optimal value. Note if your data must be positive with some values close to 0, a symmetric kernel might produce probability mass below 0, there are ways to "fix" this.

Bivariate datasets are visualized with a scatterplot.

---

# Exploratory data analysis: numerical summaries

## Center and variability measures
- Sample mean: $\bar{x_n}=\frac{x_1+x_2+...+x_n}{n}$
- Sample standard deviation: $\sqrt{\frac{1}{n-1}\sum_i (x_i-\bar{x_n})^2}$ (Why $n-1$?)

Both are very sensitive to outliers. For center and variability measures hardly affected by outliers, consider instead:

- Sample median: $Med_n$, the middle data point or the average of the two middle data points, when put in ascending order
- MAD (median of absolute deviations): $Med(|x_1-Med_n|, ...)$

## Empirical quantiles and percentiles
The empirical quantile function ranges over [0,1]. The percentile one ranges over [0,100] (more common). Their domain is the interval between the min and max values of the data points. Put the data points evenly and sorted on the range interval. The p0 percentile hence refers to the min value, p100 to the max. Your quantile or percentile more in general is the linear interpolation of the values of the two closest data points. Experiment with numpy.

They're similar to, but not quite the same as, the inverse of the empirical distribution function (which doesn't interpolate).

## Empirical quartiles, the IQR, and box-and-whisker plot

Quartiles are the .25, .50, .75 quantiles (Q1, Q2, Q3). IQR stands for interquartile range, Q3-Q1, enclosing the middle 50% of the dataset. That's the "box" in box-and-whisker plots. Extend a "whisker" below Q1 of length 1.5IQR, and one above Q3 of same length. Data points beyond either whisker are outliers. (The choice of factor is standard but somewhat arbitrary.)

Box-and-whisker plots fare poorly compared to histograms, for example on bimodal distributions. Still, putting two box-and-whisker plots side by side can be useful to compare two datasets (visually).
