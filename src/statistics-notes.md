---
title: Statistics notes
date: 2024
---

# Exploratory data analysis: graphical summaries

This part is now statistics, concerned with a dataset, for which data points (or observations) are denoted $x_1$, ..., $x_n$ (not random variables).

The simplest graphical summaries are **histograms**. Choosing a bucket size isn't obvious when you want to preserve features of the dataset. (Note also nothing says you have to use a fixed bucket size, eg recall sparse exponential histograms.) There's a way to optimize some cost function for best bucket size, but it still has drawbacks (features not adequately represented). One can also build an **empirical distribution function** (with the curve stepping up by $1/n$ at each data point).

A smoother alternative are **kernel density estimates**. A kernel is a symmetric function around 0 that _is_ a density function (positive and whose area under the curve is 1), eg the Epanechnikov kernel $\frac{3}{4}(1-u^2)$ on $[-1,1]$. Then the kernel density function is a sum of kernels each centered on a data point (and globally scaled to be a density function). It is denoted $f_{n,h}$ and is smooth. The choice of kernel doesn't matter much. $h$ is the bandwidth of the kernels and again there are methods for obtaining an optimal value. Note if your data must be positive with some values close to 0, a symmetric kernel might produce probability mass below 0, there are ways to "fix" this.

Bivariate datasets are visualized with a scatterplot.

---

# Exploratory data analysis: numerical summaries

## Center and variability measures
- **Sample mean**: $\avg{x_n}=\frac{x_1+x_2+...+x_n}{n}$
- **Sample standard deviation**: $s_n=\sqrt{\frac{1}{n-1}\sum_i (x_i-\avg{x_n})^2}$ (Why $n-1$?)

Both are very sensitive to outliers. For center and variability measures hardly affected by outliers, consider instead:

- **Sample median**: $Med_n$, the middle data point or the average of the two middle data points, when put in ascending order
- **Median of absolute deviations (MAD)**: $\med{|x_1-Med_n|, ...}$

## Empirical quantiles and percentiles
The empirical quantile function is defined on $[0,1]$, the percentile function on $[0,100]$ (more common). More precisely, the domain is split evenly with the number of data points, such that $q((i-1)/(n-1))=x_{(i)}$, where the $x_{(i)}$s are the so called order statistics (the data points reordered such that they are sorted). Hence the range of the quantile and percentile functions is the interval between the min and max values of the data points. The p0 percentile maps to the min value, p100 to the max value. The rest of the domain is defined by linear interpolation of the two closest data points. Experiment with numpy.

They're similar to, but not quite the same as, the inverse of the empirical distribution function (which doesn't have interpolation).

## Empirical quartiles, the IQR, and box-and-whisker plot

Quartiles are the .25, .50, .75 quantiles (Q1, Q2, Q3). IQR stands for interquartile range, Q3-Q1, enclosing the middle 50% of the dataset. That's the "box" in box-and-whisker plots. Extend a "whisker" below Q1 of length 1.5IQR, and one above Q3 of same length. Data points beyond either whisker are outliers. (The choice of factor is standard but somewhat arbitrary.)

Box-and-whisker plots fare poorly compared to histograms, for example on bimodal distributions. Still, putting two box-and-whisker plots side by side can be useful to compare two datasets (visually).

---

# Basic statistical models

**Random sample** (from a distribution $F$/density $f$/mass $p$): A collection of *iid* random variables $X_1$, ..., $X_n$. Can also refer to the realized values $x_1$, ..., $x_n$ depending on context ($X_1$/$x_1$ is a single observation from the sample).

**Sample statistic**: $h(X_1,...,X_n)$/$h(x_1,...,x_n)$ ($h$ is a "summary function"). The former is as a random variable (with so-called sampling distribution), the latter as realized value (after observing data). In both contexts, they are called sample statistic. Examples include: sample mean, sample median, sample standard deviation.

**Statistical model 1** (of repeated measurement of the same quantity): The dataset $x_1$, ..., $x_n$ is modeled as a realization of the random sample $X_1$, ..., $X_n$.

$F$ is the *model distribution*. It refers to a class of distributions (such as all exponential distributions if talking about Poisson events), or all continuous distributions if the underlying process is unknown.

The goal of stats is to extract, from the dataset, estimates of: parameters, features (statistics), or even all, of the "true" distribution. As example, for a Poisson distribution, getting the mean of the dataset gives an estimate of $\lambda$, the average rate of events per unit time/space (since $\E{X}=\lambda$). For exponential, $\E{X}=\frac{1}{\lambda}$ (estimate $\lambda$). For binomial, $\E{X}=np$ (estimate $n$ or $p$). Etc. Sample points of curves in excel and compare to a histogram of the dataset.

The law of large numbers says that the more data points you have, the closer the sample mean (realization of the average randvar) is to the "true" distribution's feature. The central limit theorem says how much its normalized form varies in the limit.

**Statistical model 2** (of bivariate data): The dataset $(x_1,y_1)$, ..., $(x_n,y_n)$ is modeled as a realization of randvars $Y_1$, ..., $Y_n$ such that: $Y_i=g(x_i) + U_i$ and the $U_i$s are independent with mean 0 and some equal finite variance (random fluctuation). The $Y_i$s do NOT form a random sample, as their means vary, hence they're not iid. $g$ is the *regression model*.

With $g: x \rightarrow \alpha+\beta x$, you have a simple linear regression model. With an additional $\gamma x^2$, you have multiple linear regression.

---

# The bootstrap

A sample statistic will vary depending on the realization of the random sample. How much?

The bootstrap principle works for any sample statistic, and with finite sample size (unlike the law of large numbers and the central limit theorem). **In particular, it applies to small datasets**.

The dataset $x_1$, ..., $x_n$ is a realization of the random sample $X_1$, ... $X_n$ drawn from $F$, but $F$ is unknown. Instead the dataset can be used to build an estimate $\est{F}$ distribution. From $\est{F}$ you build a "bootstrap" random sample $X_1^*$, ..., $X_n^*$, and the "bootstrapped" sample statistic $h(X_1^*, ..., X_n^*)$, whose distribution serves to estimate that of $h(X_1, ..., X_n)$ (since $F$ is unknown).

## Empirical bootstrap (ie non-parametric)

In the empirical bootstrap, $\est{F}$ is simply the empirical distribution function $F_n$, where each element $x_1$, ..., $x_n$ occurs with probability $1/n$.

Draw 1000 realizations of $X_1^*$, ..., $X_n^*$ from $\est{F}$. For each, compute $h(x_1^*, ..., x_n^*)$: their distribution serves to estimate that of $h(X_1, ..., X_n)$.

There's a math argument that estimations work better with *centered* statistics, eg $\avg{X_n}-\mu$ and also $\med{X_1, ..., X_n}-F^{\text{inv}}(0.5)$. (Yes $F^{\text{inv}}(0.5)$ is the median of the true distribution.)

Note with the 1000 realizations you can also compute an estimate for: $P(|\avg{X_n} - \mu| > 5)$, ie the probability that the average of the sample from the true mean is greater than 5. (Only in likeliness... $F$ is still unknown.)

## Parametric bootstrap

In the parametric bootstrap, $\est{F}$ is obtained by estimating the parameter(s) $\theta$ of the true distribution, ie $\est{F}=F_{\est{\theta}}$. Then you again draw 1000 realizations of $X_1^*$, ..., $X_n^*$ from $F_{\est{\theta}}$ to build a distribution estimate for the (centered) statistic of interest.

Here's an intriguing statistic. In this situation you have both an empirical distribution function $F_n$ and a parametric one $F_{\est{\theta}}$. You can compute the max distance between them. This is the Kolmogorov-Smirnov distance.

If the parametric model is adequate, the KS distance should be small. How small depends. To find out a typical small value, you run a simulation to estimate the distribution of the KS distance.

---

# Estimators

An **estimate** $t$ is a value, function of a dataset (which is not necessarily the realization of a random sample): \[t=h(x_1,...,x_n)\]

Note estimate and sample statistic (realization) refer to the same thing.

An **estimator** $T$ is a random variable, function of random variables (that do not necessarily form a random sample): \[T=h(X_1,...,X_n)\]

The distribution of $T$ is called the **sampling distribution**.

The estimator is unbiased if $E[T]=\theta$, where $\theta$ is the population parameter being estimated.

Is $V_n^2=\frac{1}{n}\sum_i (X_i-\avg{X_n})^2$ an unbiased estimator of the underlying distribution's $\sigma^2$?

\begin{align*}
\E{V_n^2} &= \frac{1}{n}\sum_i \E{(X_i-\avg{X_n})^2} \\
&= \frac{1}{n}\sum_i (\var{X_i-\avg{X_n}} - \E{X_i-\avg{X_n}}^2) \\
&= \frac{1}{n}\sum_i \var{X_i-\avg{X_n}} \\
&= \frac{1}{n}\sum_i \var{\frac{n-1}{n}X_i-\sum_{j\neq i}\frac{X_j}{n}} \\
&= ... \\
&= \frac{n-1}{n}\sigma^2
\end{align*}

The answer is no: $\E{V_n^2}<\sigma^2$ and hence $V_n^2$ is a negatively biased estimator of $\sigma^2$. However, $S_n^2=\frac{1}{n-1}\sum_i (X_i-\avg{X_n})^2$ is an unbiased estimator of $\sigma^2$, since $\E{S_n^2}=\sigma^2$ (by a similar calculation as above). That's the reason of the $n-1$ denominator for the sample variance.

Does it carry over to standard deviation? is $S_n$ an unbiased estimator of $\sigma$? No: $\E{\sqrt{S_n^2}} < \sqrt{\E{S_n^2}}=\sigma$ (By Jensen's inequality, square root being strictly concave). So $S_n$ is a biased estimator for standard deviation, but is still widely used in practice (the biasness becomes less than 1% with $n>30$). Some applications like [ping](https://github.com/iputils/iputils/blob/1ab5fafee6261369d962eb27e2fe08c8418bd74e/ping/ping_common.c#L905-L907) don't seem to even bother with the $n-1$ denominator.

Unbiasness does carry over when $g$ is affine ("change-of-unit").

---

# Mean squared error

Given two unbiased estimators for the same parameter, the most desirable one is the one with less variance (it is said to be more efficient). Even a slightly biased estimator against an unbiased one can be more desirable if it has less variance. Hence the concept of MSE, regardless of biasness:

\begin{align*}
MSE(T)&\eqdef\E{(T-\theta)^2}\\
&=\E{(T-\E{T})^2}+(\E{T}-\theta)^2\\
&=\var{T}+\text{bias}^2
\end{align*}

In other words, the MSE is the sum of the variance of the estimator, plus of the square of its bias. For unbiased estimators, their MSE equals their variance. Again, an estimator with lower MSE is said to be more efficient than another estimator for the same parameter. The ratio of two MSEs gives the relative efficiency.

Exercises in the book keep mentioning three estimators for the slope of a linear regression without intercept. They're all unbiased, but the "least squares" estimator has lower variance, hence why it's the one used in practice.

---

# Maximum likelihood

*Motivation*: You can come up with many different estimators. If $x_1$, ..., $x_n$ are modeled as the realization of a random sample from a Poisson distribution, $-\ln(|\set{x_i|x_i=0}|/n)$ gives an estimate for the $\lambda$ parameter. However, it doesn't use all of the information provided by the dataset.

**Maximum likelihood principle**: Given a dataset, choose the parameter value (or vector of values) such that the data are most likely (all of the data).

In other words, what value $\est{\theta}$ maximizes $L(\theta)=P(X_1=x_1,...,X_n=x_n)$, ie maximizes (assuming random sample):

*Discrete*: $p_\theta(x_1)p_\theta(x_2)...p_\theta(x_n)$\
*Continuous* (*): $f_\theta(x_1)f_\theta(x_2)...f_\theta(x_n)$

(*) Justification for continuous: $\prod P(x_i-\epsilon\leq X_i\leq x_i+\epsilon) \approx \prod 2\epsilon f_\theta(x_i)$ and you can drop the $2\epsilon$ since it doesn't impact finding the max.

If $L$ is smooth, you use calculus to find the max (ie take the derivative, find zeroes, etc). In one exercise you estimate the maximum likehood of the probability of heads of an unfair coin, given throw experiments.

However, $L$ is not always smooth, so you should really check first. Consider the simple case of $x_1$, ..., $x_n$, a realization of a random sample from $U(0,\theta)$. You're tempted to conclude that $L(\theta)=1/\theta^n$, which is correct, but only on $[\max(x_1,...,x_n),\infty[$. It is 0 outside. Hence there is a discontinuity and taking the derivative of $L$ won't work. In this particular case $L$ is maximum in $\est{\theta}=\max(x_1,...,x_n)$.

**Loglikelihood**: $\ln(L(\theta))$. Oftentimes it's just easier to find the max with the log of the likelihood (given all the products involved). It's valid since log is increasing.

That estimate reaching the maximum of $L$ is going to be a function of $(x_1, ..., x_n)$, say $h$. The corresponding randvar $T=h(X_1, ..., X_n)$ is the **maximum likelihood estimator** for $\theta$. Maximum likelihood estimators have the following properties:

1. They carry over invertible functions (square, sqrt, exp, ln).
2. They can be biased (eg variance estimator of normal), but are asymptotically unbiased.
3. Their variance asymptotically hits the Cramér-Rao lower bound.

---

# The method of least squares

*Motivation*: Maximum likelihood estimation assumes you know the underlying distribution (see example in previous section with points assumed to be uniformly distributed on $[0,\theta]$).

It's not universal: consider the simple linear regression model $Y_i=\alpha+\beta x_i+U_i$, where the $U_i$s are iid with mean 0 and finite variance (random fluctuations). The method of least squares gives you estimates for $\alpha$ and $\beta$ without further assumption on the $U_i$s.

The method of least squares prescribes to minimize the sum of the square of residuals (vertical distance to the estimated line, squared). In the case of simple linear regression: \[S(\alpha,\beta)=\sum(Y_i-\alpha-\beta x_i)^2\]

Because $S$ is smooth, you take the derivative and find:

\[\left\{
\begin{aligned}
    \frac{\partial S}{\partial \alpha} &= 0 \Leftrightarrow n\alpha + \beta \sum x_i = \sum y_i  \\
    \frac{\partial S}{\partial \beta} &= 0 \Leftrightarrow \alpha \sum x_i + \beta \sum x_i^2 = \sum x_i y_i
\end{aligned}
\right.\]

With some linear algebra this gives you a (somewhat unwieldy) expression for $\est{\beta}$. And then $\est{\alpha}=\avg{y_n}-\est{\beta}\avg{x_n}$.

The $\est{\alpha}$ and $\est{\beta}$ notation is common as both *estimate* (using the $y_i$s), and *estimator* (using the $Y_i$s). For the estimators, you can check that $\est{\beta}$ is unbiased, and that $\est{\alpha}$ is too (using linearity of expectation). Variance needs a tweak because the $Y_i$s have different expectation. You can rely on $U_i=Y_i-\alpha-\beta x_i$ instead. You need to adjust by a weird $1/(n-2)$ factor to get an unbiased estimator for variance.

**Residuals** are the quantities $r_i=y_i-\est{\alpha}-\est{\beta} x_i$. They always sum up to 0 (not clear if this by design or a by-product of the method). Their scatterplot should be purely random. If instead there is some pattern, it suggests the simple linear regression model isn't appropriate (eg try multiple linear regression if it displays a somewhat parabolic shape). If they "fan out" with bigger $x_i$, that's called **heteroscedasticity**. There are techniques to get **homoscedasticity** (all $U_i$s have equal variance).

**Relation with maximum likelihood**: If the $U_i$s have a known distribution, the maximum likelihood principle can be applied. For $U_i$s following a normal distribution, it turns out it gives the same $\est{\alpha}$ and $\est{\beta}$ estimators to the least square method.

**Non-linear curves**: What if you have an exponential-looking set of data points? Making a change of variable by applying $\ln$ allows you to transform it into a linear curve and get estimates for its parameters using linear regression. On one hand it's practical, on the other the transformation likely induces biases. Alternatively, the least squares method can be applied directly by minimizing $\sum (Y_i - e^{\alpha + \beta x_i})^2$. However this doesn't yield closed form estimates, hence you need to rely on numerical methods such as... gradient descent.

**Squaring vs absolute distance**: Using absolute distance has an immediate problem: it's not smooth at $x=0$, preventing you from using tools from calculus to find the minimum. Even then, on a 3 data point dataset where the points are not aligned, it yield estimates going through two of the data points (it doesn't look "desirable").

---

# Confidence intervals for the mean

1. $X\sim N(\mu,\sigma^2)$: $X$ is within $2\sigma$ of the mean with 95% probability
1. In general, Chebyshev's inequality says that any randvar is within $2\sigma$ of its mean with at least 75% probability
1. $X\in(\mu-2\sigma,\mu+2\sigma)$ with at least 75% probability
1. Turned on its head: $\mu\in(X-2\sigma,X+2\sigma)$ with at least 75% probability
1. $\mu\in(x-2\sigma,x+2\sigma)$ is *true* for at least 75% of $x$s, realizations of $X$
1. If $T$ is an unbiased estimator for $\theta$ (ie that has some distribution such that $E[T]=\theta$), and $t$ a single point estimate for $\theta$ (ie a realization of $T$), then $\theta\in(t-2\sigma,t+2\sigma)$ is a 75% confidence interval for $\theta$
1. Example: $T$ is the average of randvars, $t$ the sample mean

Note the assumption above that $\sigma$ is known.

## Shape of distrib known, variance known

Following on the example: take $\avg{X_n}=\frac{1}{n}\sum X_i$ where $X_i \sim N(\mu,\sigma^2)$ and iid. You know from before that $X_1+...+X_n\sim N(n\mu,n\sigma^2)$, and, scaling by $\frac{1}{n}$, that $\avg{X_n}\sim N\left(\frac{1}{n}n\mu,\left(\frac{1}{n}\right)^2 n \sigma^2\right)$. In other words, $\avg{X_n}\sim N(\mu,\frac{\sigma^2}{n})$. (Note that the parameters follow from the law of large numbers too.)

$\E{\avg{X_n}}=\mu$ so $\avg{X_n}$ is an unbiased estimator for $\mu$, and $(\avg{x_n}-2\frac{\sigma}{\sqrt{n}},\avg{x_n}+2\frac{\sigma}{\sqrt{n}})$ is a 95% confidence interval for an estimate $\avg{x_n}$ of $\mu$ from $\avg{X_n}$. (Since $\avg{X_n}\sim N(\mu,\frac{\sigma^2}{n})$, $P(\mu\in(\avg{X_n}-2\frac{\sigma}{\sqrt{n}},\avg{X_n}+2\frac{\sigma}{\sqrt{n}}))\approx 95\%$.)


## Shape of distrib known, variance unknown

If you don't know $\sigma^2$, you can't compute a confidence interval the same way. One remaining possibility is to use the sample variance $S_n^2=\frac{1}{n-1}\sum(X_i-\avg{x_n})^2$ instead. However, the probabilities change, something something student t.

## Shape of distrib unknown

## In the limit
