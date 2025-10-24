---
date: [2024-06-21 Fri]
title: The rule of 72
---

There's a rule of thumb called the rule of 72, that approximates how long it takes to double some quantity. It assumes a given rate of increase per unit of time (say $x$). How many units of time $n$ to double the initial quantity?

In other words what's $n$ given $x$ in $(1+x)^n=2$?

\begin{align*}
(1+x)^n &= 2 \\
n \ln(1+x) &= \ln(2) \\
n x &≈ \ln(2) & \text{for small $x$} \\
n &≈ \frac{\ln(2)}{x}.
\end{align*}

$\ln(2)$ is roughly 0.69. Meaning divide 69% by your rate $x$ to get $n$. At 3%, you need 23 units of time to double the quantity. (And indeed 1.03^23 is a bit above 1.97.) Cool.

Except it's called the rule of 72, not the rule of 69.

Why?

First note that 72 also gives a good approximation: 72%/3%=24 and 1.03^24 is about 2.03.

Why is 72 appealing?

Why is a point defined such that there are 72 of them per inch, and not 69 or some other number? (Note: dpi, dots per inch, bridges the gap between dot count and physical length, for printing or display on a screen.)

Why is 72 appealing?

---

72 has the highest multiplicity of any number from 2 to 100. You can slice it in many different ways. Factors are 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. It's convenient.

While the above is true, I am [realizing now](https://gist.github.com/guillaumekoenig/838c7626ac22ab3855e326933cb97a94) that 60, 84, 90, 96 have the same multiplicity as 72:

```python
>>> [p for p in range(2,150) if totalFactors(p)>=12]
[60, 72, 84, 90, 96, 108, 120, 126, 132, 140, 144]
>>> primeFactors(60)
[(2, 2), (3, 1), (5, 1)]
>>> primeFactors(72)
[(2, 3), (3, 2)]
>>> primeFactors(84)
[(2, 2), (3, 1), (7, 1)]
>>> primeFactors(90)
[(2, 1), (3, 2), (5, 1)]
>>> primeFactors(96)
[(2, 5), (3, 1)]
```

In particular 96 dpi would have been a useful definition for point as well.
