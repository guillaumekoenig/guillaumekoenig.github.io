---
date: [2019-09-24 Tue]
title: Tail command in awk
---

``` awk
{ a[NR%n] = $0 }
END {
  for (i=NR+1-min(n,NR); i<NR+1; i++)
    print a[i%n]
}
function min(a,b) { return a<b?a:b }
```

Invocation: `awk -f tail.awk n=5`.

Here `min(n,NR)` is the number of lines saved in the circular buffer
in the end. A previous version without `min(n,NR)` gave wrong results
for documents with fewer than n lines. A reminder to pay attention to
assumptions.
