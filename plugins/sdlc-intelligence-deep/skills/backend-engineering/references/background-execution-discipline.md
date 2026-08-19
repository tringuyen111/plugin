# Background Execution Discipline

Read this reference when queue, job, scheduler, consumer, or similar background execution makes redelivery/replay, temporary ownership, partial progress, retry exhaustion, shutdown/drain, or overload material to correctness or proof.

This reference owns **implementation and proof discipline** for a backend execution attempt. It does not redefine the logical operation, caller-visible API contract, canonical data semantics, security policy, retry budget, SLO/capacity target, or operational recovery policy. Consume those from their canonical owners.

## Bind source authority first

Before changing background code, bind the material truth from three sources:

1. **Approved semantics** — logical work/operation identity, retryability, transaction/external-effect contract, data invariants, security decisions, and applicable NFR/operational constraints.
2. **Observed runtime facts** — how this actual queue, scheduler, host, worker runtime, or provider dispatches, redelivers, leases/locks, acknowledges, cancels, terminates, and limits in-flight work.
3. **Current implementation evidence** — durable progress markers, side effects, retry state, observability, and the real path a repeated or interrupted attempt takes.

Treat an unknown material item as an exact owner/runtime-fact gap. Do not fill it with a familiar provider pattern.

## Model the attempt lifecycle

Use **attempt lifecycle** as the execution lens:

```text
approved logical work identity
        +
observed dispatch/runtime facts
        ↓
dispatch/delivery identity, when the runtime has one
        ↓
execution attempt ownership/window
        ↓
durable progress + external effects
        ↓
success | retry | terminal | handback/cancel
```

The logical operation remains upstream design truth. A dispatch or delivery is a runtime carrier when such an identity exists. An attempt is one processing ownership window, not proof that the logical work is unique.

For the active path, identify only the dimensions that can change correctness or proof:

- what makes this the same logical work versus a different request/intent;
- whether a separate dispatch/delivery identity exists and what redelivery means;
- how an attempt acquires, renews, loses, or hands back temporary ownership;
- what durable progress exists before each externally visible effect;
- what can be safely repeated, resumed, reconciled, cancelled, or declared terminal;
- what the runtime does when the process stops, the ownership window expires, or pressure rises.

## Correct ambiguous completion

Treat a missing acknowledgement, timeout, worker crash, or lost response as **ambiguous completion** until durable evidence resolves what happened.

Before replaying work:

1. inspect the approved logical-work identity and retry contract;
2. inspect durable progress and externally visible effects;
3. determine whether the next action is repeat, resume, reconcile, hand back, or return an owner gap;
4. keep duplicate/recovery behavior observable enough to prove which path occurred.

A runtime redelivery signal is evidence that another attempt may run; it is not evidence that the previous attempt made no effect.

## Respect temporary ownership

When the actual runtime exposes a lease, visibility period, lock, claim, or equivalent temporary ownership mechanism, bind implementation behavior to its real semantics:

- define what the attempt may do while ownership is valid;
- account for expiry, renewal failure, concurrent takeover, cancellation, or late completion when material;
- preserve a recovery path when the worker can lose ownership after partial progress;
- avoid treating temporary ownership as an exactly-once guarantee.

If the runtime has no comparable mechanism, omit this branch rather than importing one from another provider.

### Contrastive example: visibility is temporary ownership, not exactly-once

If the inspected runtime is an Amazon SQS standard queue, a visibility timeout makes a received message temporarily less available to other consumers, but the service remains at-least-once and duplicate delivery can still occur. Treat the receipt/visibility window as attempt-level runtime ownership, not as proof that the logical work or its external effects will happen exactly once. Durable progress and the approved logical-work/effect contract still control replay, reconciliation and late completion.

The near-miss is to infer an exactly-once guarantee from a lease/visibility mechanism or to import SQS visibility semantics into a queue that does not expose them. Inspect and prove the actual provider's redelivery/ownership behavior.

## Make partial progress replayable by contract

Use existing canonical durable seams to distinguish progress that has happened from work that is still pending.

- Resume or reconcile only where approved operation/data semantics make that safe.
- Keep side effects ordered according to the approved transaction/external-effect contract.
- If safe replay requires a new checkpoint, schema, reconciliation rule, or caller-visible idempotency contract, return the exact Design/Data/API gap instead of inventing it inside the worker.

The goal is not universal idempotency. The goal is a truthful repeat/resume/recovery path for the approved semantics.

## Bound retry and terminal behavior

Implement the retry behavior already authorized for the unit and make exhaustion observable.

- Keep retry layers visible when multiple components can repeat work so amplification can be reasoned about.
- Preserve the approved terminal disposition when attempts are exhausted or the work becomes non-retryable.
- Return missing retry budget, quarantine/dead-letter policy, manual recovery action, or other operational policy to its canonical owner.

A dead-letter queue, backoff algorithm, circuit breaker, or retry count is an implementation option, not a default requirement of this discipline.

## Drain within the real shutdown lifecycle

Bind shutdown behavior to the actual host/runtime lifecycle and approved constraints.

When shutdown is material:

1. stop or reduce intake so new work does not outrun the shutdown window;
2. classify in-flight attempts as finishable, hand-back/retryable, cancellable, or requiring reconciliation;
3. honor the real deadline and account for forced termination;
4. preserve durable/observable recovery truth for work that cannot finish safely.

Do not call shutdown graceful merely because a signal handler exists; prove the in-flight disposition that matters to the claim.

## Bound pressure at the execution seam

When input can exceed sustainable processing, keep in-flight work bounded at the smallest seam that actually controls pressure.

Use approved NFR/architecture/operational constraints and observed runtime behavior to choose the local mechanism. Depending on the system, this may be bounded concurrency, admission control, demand signaling, queue limits, shedding, or another established mechanism.

Do not invent SLOs, capacity thresholds, or operational health policy. If those values determine correctness and are missing, return the owning NFR/Operations/Design gap.

Proof should demonstrate the mechanism under representative saturation or queue pressure rather than only a low-load happy path.

## Challenge the failure path

For every material background dimension, choose the smallest probe that could falsify the implementation claim:

- repeat or redeliver the same logical work after ambiguous completion;
- interrupt after durable progress but before acknowledgement;
- expire or lose temporary ownership when the runtime supports it;
- exhaust the approved retry path and inspect terminal observability;
- terminate during in-flight work and inspect drain/handback/recovery;
- apply representative pressure and inspect bounded in-flight behavior.

Use real integration/runtime seams when the claim depends on their semantics. A mock that bypasses delivery, ownership, persistence, shutdown, or pressure narrows the proof to the seam it actually executes.

## Return owner gaps precisely

Stop the affected backend work instead of inventing truth when correctness depends on an unresolved decision outside the current technical mandate. Name the missing class explicitly:

- **API/design gap** — caller-visible idempotency, error/precondition, retryability, or ambiguous-result contract;
- **Data/design gap** — canonical progress/checkpoint/schema/backfill/reconciliation semantics;
- **Security gap** — replay, authorization, tenant/resource, or enforcement policy;
- **NFR/Operations gap** — retry budget, shutdown deadline, capacity/SLO threshold, service-health or recovery policy;
- **Runtime-fact gap** — actual provider/host delivery, ownership, cancellation, or termination semantics are unverified.

## Completion

The background branch is complete only when every **material** dimension is in one of these states:

```text
implemented + proof-bound
OR
returned as an exact missing-owner/runtime-fact gap
```

Do not activate lease, replay, shutdown, or pressure branches merely because they are common. Materiality comes from the approved unit, actual runtime path, failure model, and proof claim.
