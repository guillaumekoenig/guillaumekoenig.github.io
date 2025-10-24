---
title: System design
---

# 1. Delivery framework
# 1.1. Gather functional vs non-function requirements
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

Know your orders of magnitude for estimates.

- 1 day ~100k s (3600*24)
- 1 yr ~30e6 s

| Number of 9s (% uptime) | Equivalent time (assuming year basis) |
| - | - |
| 2 9s  | 3 days |
| 3 9s  | 9 h |
| 4 9s  | 1 h |
| 5 9s  | 5 min |
| 6 9s  | 30s |

Note there's a factor of ~9 between each, because (1-.99)/9=0.1111...-0.11=0.0011...≈1-.999.

Note MemoryDB's SLA is 4 9s availability (evaluated on a month basis though!). Below that, the customer gets credit.

Those are fine, but also know estimates for number of users (at least an upper bound, like 1% of people on Earth).

# 1.2. Define core entities

# 1.3. Define API/interface

# 1.4. Dataflow (optional)

# 1.5. High-level design
It should answer the functional requirements.

# 1.6. Deep dives
They should address the non-functional requirements.

# 2. Authn: Redis session vs JSON Web Token (JWT)

Using Redis to store the user session in the backend makes your API stateful. If Redis crashes, the user is logged out. If you shard the sessions across several Redis nodes, your API needs to reach the right one, now requiring routing.

These problems are overcome with JWT. It encrypts the user/expiry payload at login into a token blob that is then passed around. Encryption is with a server-side private key, so that only backend nodes can read it. In fact any backend node can read it, allowing for scaling without specific routing.

Just use short expiry times.

OAuth2 is often used for the dance to get the JWT token in the first place (eg sign in with Google).

# 3. Cache: write-through vs write-back

| Write-through | Write-back (behind) |
| - | - |
| Synchronously write to storage | Asynchronously write to storage in batch |
| Think MemoryDB | Think pure Redis with aof |
| | Lower latency but can lose data |

# 4. DynamoDB

(primary,sort) key. Primary key value determines the partition holding the data (ie which shard, or machine). Eventually consistency reads by default (unless `ConsistentReads=true`). Good for both read (especially eventual) and writes, but no complex queries like with SQL.

# 5. Token bucket algorithm for rate limiting

Bucket of tokens with constant refill rate. A request consumes a token. If out of token, the request is rate limited. Bucket is usually per customer. It allows for bursts of traffic in addition to steady state traffic. Can be implemented in a Redis lua script to read and update count atomically.

HTTP 429 to reject a request (+ helpful headers).

You want to apply rate limiting at the gateway level, to protect your backend services/microservices.

# 6. Apache kafka vs Redis streams

Topics, partitions, consumer groups.

# n. Use Excalidraw :)
