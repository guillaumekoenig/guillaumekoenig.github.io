---
title: System design
---

# 1. Gather functional vs non-function requirements
Functional:

- Function from the point of view of the user
- API design makes sense for *some* kind of problems

Non-functional:

1. Availability (ie number of 9s)
2. Consistency (eg split brain scenarios)
3. Durability (copies of data you can lose; replication)
4. Scalability (handling variations in load, scale out/in/up/down)
5. Latency (eg time budget per request in ms)

Ask interviewer if you've missed anything.

Know your order of magnitudes for estimates.

|||
| - | - |
| 1 day | ~100k s (3600*24) |
| 1 yr  | ~30e6 s |
| 2 9s  | 3 days |
| 3 9s  | 9 h |
| 4 9s  | 1 h |
| 5 9s  | 5 min |
| 6 9s  | 30s |

Note there's a factor of ~9 between each, because (1-.99)/9=0.1111...-0.11=0.0011...≈1-.999.

Note MemoryDB's SLA is 4 9s availability, evaluated on a monthly basis. Below that, the customer gets credit.

Those are fine, but also know estimates for number of users (at least an upper bound, like 1% of people on Earth).

|||
| - | - |
| SHA1, 160 bits | ~1e48 |
| Atoms on Earth | ~1e50 |
| Atoms in the universe | ~1e80 |

