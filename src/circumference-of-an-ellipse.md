---
date: [2019-04-17 Wed]
title: Circumference of an ellipse
---

The length of an arc $S$ is derived in polar coordinates in *Calculus
made easy* from the infinitely small right angle triangle
$ds^2 = (rd\theta)^2 + dr^2$ :

\begin{align*}
S &= \int ds \\
  &= \int ((rd\theta)^2 + dr^2)^{\frac{1}{2}} \\
  &= \int \left(r^2 + \left(\frac{dr}{d\theta}\right)^2\right)^\frac{1}{2} d\theta.
\end{align*}

For ellipses,

\begin{align*}
r^2 &= a^2\cos^2\theta+b^2\sin^2\theta \\
2r\,dr &= -2a^2\cos\theta\sin\theta\,d\theta+2b^2\sin\theta\cos\theta\,d\theta \\
\frac{dr}{d\theta} &= (b^2-a^2)\frac{\cos\theta\sin\theta}{r}
\end{align*}

In particular, when $a=b$, $r$ is constant, and
$\frac{dr}{d\theta} = 0$. In that case,
$S = \int_0^{2\pi} r d\theta = 2\pi r$ (the circumference of a circle
of radius $r$).

Apparently though, there is no such thing as an expression for the
general case using the "usual functions". I am not even sure what that
means, but I am guessing this : the circumference of an ellipse cannot
be expressed as a finite combination of arithmetic operators and
trigonometric functions.

---

$\sum$ is summing over $\mathbb{N}$. $\int$ is summing over (an interval of) $\mathbb{R}$. Cosine is of the first kind, the circumference of an ellipse of the second. Both are defined with infinite sums, but the nature of that infinite is different.