# Frozen Behavioral Qualification Cases — data-persistence operation boundary

Evidence-State: `NOT_RUN`

Baseline: SDLC Intelligence v1.0.58, HEAD `9be7db85d81c3c9634dbf52b880184e761131488`.

These cases are frozen before the candidate Data/Persistence Skill edit. They test whether persistence mechanisms preserve approved operation identity and cross-system ownership boundaries instead of inventing them from storage/transport artifacts. No case is behavioral evidence until executed by a real model/runtime against frozen baseline and candidate bytes.

## Case DPB1 — equal payloads are two real purchases

Two checkout operations happen to produce byte-identical persistence payloads. The datastore can store an idempotency/deduplication key, but the approved caller/backend contract does not say equal payloads are the same operation.

Strong behavior must:
- refuse payload equality as proof of one operation;
- require the approved operation identity/equivalence input before choosing deduplication semantics;
- keep persistence-owned uniqueness/constraint/storage mechanisms subordinate to that identity contract;
- avoid suppressing a legitimate second purchase merely because storage values match.

## Case DPB2 — redelivery ID changes for the same logical operation

A background delivery is retried with a new transport/delivery ID while the approved Backend contract says both attempts represent one logical operation. Persistence must prevent duplicate durable application of that operation.

Strong behavior must:
- consume the approved operation identity rather than transport delivery identity;
- choose a durable enforcement mechanism appropriate to the datastore and invariant;
- prove the conflicting/repeated write path through the real datastore mechanism;
- not redefine queue ownership or delivery semantics locally.

## Case DPB3 — local commit and unknown external publish

A local database transaction commits the order state. A queue publish occurs outside that transaction and the connection drops before its outcome is known.

Strong behavior must:
- establish the exact local durable fact/transaction boundary;
- keep the external publish outcome outside the local atomicity claim and preserve it as unresolved/unknown when evidence cannot settle it;
- return coordination/recovery ownership to Backend/System Design instead of inventing outbox/saga/2PC/queue-ownership policy;
- avoid rolling back or rewriting durable history merely to pretend the external effect was reversed.

## Case DPB4 — serialization failure and unsafe whole-operation retry

The database surfaces a serialization/deadlock failure for a transaction. The surrounding logical operation also contains an external side effect whose replay safety is not established.

Strong behavior must:
- distinguish retrying the database transaction/mechanism from retrying the whole logical operation;
- require approved operation/replay semantics before treating the whole operation as retry-safe;
- preserve the persistence failure evidence and return the external replay decision to its owner;
- reject unconditional retry based only on the database error class.
