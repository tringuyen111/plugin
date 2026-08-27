# Operation Responsibility and Effect Topology

Load this reference when a backend operation crosses material frontend/API/backend/database/runtime/provider seams, can execute more than once, makes externally visible effects, or can stop after partial progress. Use it to decide **where responsibility and recovery belong before choosing transaction/retry/reconciliation mechanics**.

Do not turn every backend edit into a distributed-systems diagram. Keep this topology bounded to the fixed operation and the seams that can change correctness or proof.

Use the parent Skill terms **Semantic Authority** and **Enforcement Site** literally. Establish operation/attempt/effect/progress terms locally where the topology first needs them rather than assuming every backend task already loaded them.

## Contents

1. Inventory the current substrate
2. Separate semantic authority from enforcement location
3. Trace data and effects, not only calls
4. Bind operation identity and multiplicity
5. Model durable, possible and unknown residue
6. Own every material composition seam
7. Reuse by semantics rather than shape
8. Preserve specialist truth without absorbing it
9. Completion test

## 1. Inventory the current substrate

Before creating state, validation, retry, tracking or abstraction, inspect what each material layer already does:

```text
frontend/caller
  -> local/advisory state, correlation, optimistic projection
API/backend
  -> trusted validation, authorization, business decision, orchestration
database
  -> existing rows/state, constraints, indexes, transaction/locking seams, triggers
queue/runtime
  -> delivery identity, temporary ownership, redelivery, scheduling, cancellation
cache/resource
  -> key/scope, freshness, invalidation, lifecycle
external provider
  -> provider-side operation identity, effect/status, retry/observation surface
```

Inspect only layers touched by the fixed operation. The question is not “where could this logic live?” but **“what truth and mechanism already exist, and what new responsibility is actually missing?”**

For database-backed behavior, check the current schema/data shape, constraints/indexes, migration state, repository/query/error paths and relevant transaction boundary before adding an application-level invariant or tracker.

## 2. Separate Semantic Authority from Enforcement Sites

One meaning can legitimately appear at several layers when each layer has a different responsibility.

| Role | Typical responsibility | Must not silently become |
| --- | --- | --- |
| Frontend/caller | UX feedback, local derivation, optimistic/presentation state, request correlation | authorization/business authority or sole trust barrier |
| API/backend | trusted validation, authorization, canonical application decision, cross-resource orchestration | duplicate storage engine or invented data/security policy |
| Database | durable relational/row invariants, uniqueness/referential enforcement, atomicity/isolation | arbitrary workflow/product policy owner just because SQL can express it |
| Queue/runtime | delivery/attempt mechanics, temporary ownership, redelivery/scheduling | logical-work/business truth |
| External provider | authoritative fact about provider-side effect/status | application business truth beyond the provider contract |

Do not call layered checks duplicate truth merely because they test similar conditions. A client-side syntax check, server-side validation and database uniqueness guard can coexist safely when one canonical meaning governs them and their responsibilities are distinct.

Treat them as competing truth when they independently define policy/default/state transitions and can disagree across callers or failure paths.

## 3. Trace data and effects, not only calls

A call graph can be locally correct while hiding the operation's real state/effect topology. Trace:

```text
input origin + trust
  -> normalization / validation / authorization
  -> canonical decision
  -> durable state transition(s)
  -> external side effect(s)
  -> event/cache/derived-state propagation
  -> response / observable completion
  -> downstream consumers
```

For each step, state what fact becomes authoritative and which next step depends on it. If data is transformed, cached, serialized or projected, keep enough identity/scope/freshness dimensions to explain whether the consumer is still observing the intended meaning.

Do not manufacture project policy from this map. If the accepted completion meaning, consistency requirement or recovery policy is missing, return that owner gap.

## 4. Bind operation identity and multiplicity

Assume an effectful backend operation can execute more than once unless the real contract/runtime proves otherwise.

Check possible sources:

```text
first request
client retry after timeout
server/application retry
SDK/proxy/provider retry
queue redelivery/replay
scheduler overlap
concurrent duplicate intent
manual/operator replay
```

Then ask two different questions:

1. **Is this another execution?**
2. **Does it represent the same logical intent or a new intent?**

Call one approved business/application intent across retries, replays, redeliveries or concurrent arrivals the **Logical Operation**. Call one concrete processing instance through a request/job/event path an **Execution Attempt**. Same payload, same URL or same backoff loop does not answer whether two attempts belong to the same operation. Bind Logical Operation identity to the approved API/domain/runtime contract and current durable/provider identity seams; do not invent an idempotency key or deduplication lifetime when those are caller-visible/design decisions.

## 5. Model effect evidence and partial progress

At each material failure boundary, classify the **Effect Evidence State** — what authoritative current evidence establishes about each relevant durable/external effect:

- **`ESTABLISHED`** — authoritative evidence proves the particular state/effect happened;
- **`NOT_ESTABLISHED`** — authoritative evidence proves the particular state/effect did not happen;
- **`UNKNOWN`** — the operation crossed a boundary but current evidence cannot prove or refute completion of that effect.

Classify **Partial Progress** separately. Partial Progress means one or more required steps are already `ESTABLISHED` while the Logical Operation is not complete; a different effect may simultaneously be `UNKNOWN`. Do not collapse known progress and uncertainty into one `partial/ambiguous` state.

Use a compact state/effect map:

```text
logical intent / operation identity
  -> authoritative state before
  -> local durable transition
  -> external effect / handoff
       success | definite failure | ambiguous
  -> observable completion
  -> residue after interruption
  -> repeat | resume | observe | reconcile | compensate | terminal
```

A local rollback does not undo an already-completed remote effect. A transport error does not prove the remote effect did not happen. A worker crash does not prove the attempt made no durable progress.

Choose the next action only from approved semantics plus current evidence and available mechanisms.

## 6. Own every material composition seam

A system can be wrong even when every local component follows its contract. The backend operation is insufficiently modeled if a material handoff can produce a partial/unknown state whose next action is owned by nobody.

For each material DB/event/provider/cache/object-store/caller-completion seam, bind:

```text
what is authoritative before crossing
  -> what the receiver can durably establish
  -> success / definite failure / ambiguous outcome
  -> residue in each branch
  -> owner of retry/resume/observation/reconciliation/compensation/terminal disposition
```

Examples of failure classes, not prescribed solutions:

- DB commit succeeds but event publication fails;
- provider effect succeeds or is ambiguous while local finalize fails;
- object storage succeeds while metadata persistence fails;
- optimistic caller state exists but authoritative backend decision rejects it.

Do not jump directly to outbox, saga, distributed lock, global transaction or compensation. First bind the approved consistency/completion contract and inspect existing infrastructure. Use the smallest existing mechanism that actually owns the failure class; otherwise return the missing design/operations/data/runtime decision.

## 7. Reuse by semantics rather than shape

Use current substrate inspection to find established owners, sibling implementations, local fallbacks and parallel enforcers.

A higher-level reuse/consolidation candidate is stronger when these align:

```text
same responsibility / meaning
+ same governing invariant
+ compatible lifecycle
+ compatible failure/recovery semantics
+ sensible common owner
```

Code similarity alone is weak evidence. Request-scoped retry and durable worker redelivery may share backoff arithmetic while requiring different policy owners because deadline, persistence, ambiguity and terminal semantics differ.

Prefer one semantic owner with adapters/enforcers at the edges over two active policy/default implementations. Do not extract a generic framework merely to remove repetition.

## 8. Preserve specialist truth without absorbing it

This topology decides what backend implementation must know; it does not acquire every sibling Skill's authority.

- Caller-visible operation identity/completion/error contract unresolved -> API/design owner.
- Canonical data meaning, migration or storage/concurrency mechanism unresolved -> return the bounded data/design gap; when host-native discovery supplies decision-changing Data/Persistence depth and the implementation mechanism is fixed enough, integrate it against the same bound truth.
- Authorization/trust/credential policy unresolved -> Security owner.
- Service/client lifecycle, deadline, pressure, ambiguity or drain material -> [Service Runtime Discipline](service-runtime-discipline.md).
- Queue/job delivery/attempt ownership material -> [Background Execution Discipline](background-execution-discipline.md).
- Broad source/docs/change consistency review -> preserve the separate frozen-review need and exact revision/context; host-native discovery owns any Code Review capability selection, and Backend does not turn it into implementation ceremony.
- Capacity/SLO/recovery/operator policy unresolved -> NFR/Operations owner.

Backend should stop the affected branch on a material contradiction it encounters; it should not audit the entire repository for contradictions before every change.

## 9. Completion test

The topology is deep enough when the implementer can state, for every material branch of the fixed operation:

- where input/effects originate and end;
- which layer owns the semantic decision and which layers only advise/enforce/transport it;
- what existing state/constraint/runtime/provider mechanism is reused rather than reinvented;
- how the same logical intent is distinguished from a new intent when execution repeats;
- what is durable, absent or unknown after interruption;
- who owns the next action at every material handoff;
- which specialist branch is needed and why.

Then return to the Backend Engineering loop and implement/prove the smallest coherent mechanism. Do not keep expanding the topology without a concrete unresolved correctness or proof question.
