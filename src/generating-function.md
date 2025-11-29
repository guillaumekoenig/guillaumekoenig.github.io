---
date: [2020-02-19 Wed]
title: Generating function
---

The common example of generating function is that of the Fibonacci
sequence (defined by the recurrence $a_{n+2}=a_{n+1}+a_{n}$, $a_0=0$,
$a_1=1$). It isn't obvious at all that there is a closed-form
(non-recursive) expression for $a_{n}$ (similar to an arithmetic or
geometric recurrence). Turns out you can find one with generating
functions.

An infinitely derivable function $f$ has a unique Taylor series
expansion. What if you define the coefficients to be precisely the
elements of the Fibonacci sequence? ie:

\[f(x) = \sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n =
\sum_{n=0}^{\infty} a_n x^n\]

Given the Fibonacci relation:

\[a_{n+2} = a_{n+1}+a_n\]

multiplying by $x^{n+2}$:

\[a_{n+2} x^{n+2} = a_{n+1} x^{n+1} x + a_n x^n x^2\]

summing over $\mathbb{N}$:

\[f(x)-a_1 x-a_0 = (f(x)-a_0) x + f(x) x^2\]

and refactoring, gives:

\[f(x) = \frac{x}{1-x-x^2}.\]

$f$ is the generating function for the Fibonacci sequence. Note that
equality holds only when infinite sums are numbers. For example, the
sum for $x=1$ would be that of all Fibonacci numbers, which isn't
itself a number (compare to $f(1)=-1$). On the other hand, since
$a_n \leq 2^n$ (check by induction), the sum for $x=\frac{1}{3}$ *is*
a number, and is equal to $f\left(\frac{1}{3}\right)=\frac{3}{5}$.

The interval of validity does not really matter. The Taylor series expansion is used only as a device. (Maybe the interval of validity could even be nil?)

To have an expression for $a_n$, all that's left to do is to find an
expression for $\frac{f^{(n)}(0)}{n!}$. Deriving
$f(x) = \frac{x}{1-x-x^2}$ a few times shows a pattern leading to the
solution. You'll probably need to decompose $f$ into partial fractions
first to make deriving manageable.

Another approach to deriving is to recognize $f$ as the sum of two
functions of the form $\frac{1}{1-cx}$. That form is very close to
$\frac{1}{1-x}$, for which the power series expansion is known. But
this approach is of course specific to $f$.

---

The number of ways to sum to a given integer $n$ ("partition of an
integer") is also defined by a recurrence relation, although more
easily on two dimensions.

The summands are not ordered, ie 1+2 and 2+1 both count as one
partition of 3. To prevent double counting partitions, keep only those with a particular order. For example, use decreasing
summands (terminating when $k=1$). At each step of building a partition, you use an equal or lower summand. If $k$ is the highest summand you can use, either use
it, or skip for a lower one. This gives you
$p(n,k) = p(n-k,k) + p(n,k-1)$.

Apparently there is another recurrence relation directly on $n$, and
an associated generating function. But no (known?) closed-form
expression. The point is that a closed-form expression doesn't always
exist. (And values are easier to compute with a recurrence relation.)
