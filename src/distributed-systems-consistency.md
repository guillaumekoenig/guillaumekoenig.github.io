---
title: Distributed systems consistency
---

# DynamoDB experience

[2021-06-14 Mon]

This is how I think about whether I've modeled things right in
DynamoDB: on a given page the user is on, is all the data coming from
the same machine?

If the entities modeling the data are scattered across tables, the
answer is no. That's because each table partitions data (on the hash
key) independently, and hence the machines where data is retrieved
from may be different.

If the entities are all folded in a single table, and the data for the
user is queried with a single hash key, the answer is yes. That's
because then the data is in one partition, and in the same part of the
partition (hence on a single machine). Each entity is mapped by a sort
key.

---

# Linearizability

[2023-05-28 Sun]

Notes based on paper
[p463-herlihy.pdf](https://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf).

- A **history**, $H$? a sequence of events. (In other words, a set of
  events with a total order: this is *not* Leslie Lamport's
  happens-before partial ordering of events.) The total order captures the real-time ordering of events.
- An **event**? Either an invoke or response from a client/process on an
  object. (Process would be a more ancient term referring to
  single-threaded execution.)
- An **operation**, $e$? Pair of matching invoke and response events (ie
  the next response to an invoke on a given client). The notation $e$
  is a bit unfortunate because you can easily confuse it with event.

Then there's an implicit partial order on operations: $e_1 <_H e_2$
when $res(e_1)$ precedes $inv(e_2)$ in H's sequence of events.

- Operations are **sequential**? $(e_1,e_2) \in\, <_H \lor\, (e_2,e_1)
  \in\, <_H$
- Operations are **concurrent**? They're not sequential, $(e_1,e_2) ∉\,
  <_H \land\, (e_2,e_1) ∉\, <_H$. (Their windows "overlap".)
- A history is sequential? Operations form a sequence, $<_H$ is a
  total order
- A history is concurrent? $<_H$ is a partial order
- **Consistency model**? A set of allowed histories

---

# Quorum

[2024-12-07]

"The impeachment motion needed the approval of eight of the 108 MPs in his People's Power Party for the necessary two-thirds majority. But in the end all except three chose not to vote, and it did not even reach quorum."

I never really thought about what a quorum referred to despite reading about it in distributed system contexts. It's a term used when a group votes for a motion. It refers to the fraction of the group required to be present, above which the session can proceed. The motion is accepted if a majority (usually two-thirds or half) of the quorum votes in favor (regardless of how many did vote).

South Korea has 300 MPs, the quorum is usually a minimum of 151 members. Impeachment is a special case where there's a two-thirds voting *threshold* of the entire assembly (likened to a quorum in the news piece, but not quire an accurate use of the word): 192+3 votes didn't reach the minimum 200 votes threshold.
