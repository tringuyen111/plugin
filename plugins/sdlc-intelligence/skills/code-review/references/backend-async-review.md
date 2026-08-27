# Backend and Async Review Lens

Load when the change coordinates database work, external side effects, queues/jobs/schedulers, retries/redelivery, cancellation/timeouts, shutdown, or partial progress.

## Transaction and side-effect ordering

Trace the failure boundary around durable state and external effects:

- What commits first?
- Can an external effect happen while the database transaction later rolls back?
- Can durable state commit while the external effect fails?
- On retry, can either side execute twice or be skipped?
- Is reconciliation/recovery observable when the two sides diverge?

Do not prescribe an outbox/saga/transaction pattern by default. Report the concrete failure mechanism and smallest correction direction; material architecture choice belongs to `codebase-design`.

## Ambiguous completion and redelivery

A timeout, worker crash, missing acknowledgement, lease expiry, or lost response does not prove the previous attempt made no effect. Inspect:

- logical work identity versus delivery/attempt identity;
- retry/redelivery path;
- dedupe/repeat/resume semantics when required;
- durable progress/checkpoints;
- late completion or concurrent takeover;
- terminal/exhausted behavior.

## Partial progress and recovery

For multi-step work, identify the last durable state and what a repeat/resume does after each material interruption. Flag cases where retry starts from an unsafe point, skips required work, repeats an external effect, or leaves an unreachable partial state.

## Cancellation, timeout, and lifetime

Check whether cancellation/timeout is advisory or actually stops work, and whether owned resources/tasks are released on success, error, cancellation, and shutdown paths. Detached work must not outlive the state/authority/resource it depends on unless the runtime contract intentionally permits it.

## Evidence boundary

Static source can prove an ordering/lifetime defect when the path is explicit. Queue delivery guarantees, process shutdown, lease behavior, timing and external service behavior require actual runtime/provider evidence before being called reproduced. Missing retry budget/SLO/recovery policy routes to its canonical owner rather than being invented in review.
