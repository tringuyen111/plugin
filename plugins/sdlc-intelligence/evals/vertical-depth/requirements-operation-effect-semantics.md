# Frozen Qualification — Requirements Operation / Effect Semantics

Evidence-State: `NOT_RUN`

These cases are frozen before candidate edits. They are behavioral falsifiers for Requirements Prompt/Context semantics, not executed results.

## R1 — Timeout after known partial progress with unknown remaining effect

Input: A bulk settlement Logical Operation has definitely committed 40 of 100 business-visible settlements. The downstream confirmation channel then times out, so evidence cannot establish whether another 10 were applied before interruption.

Expected: represent known `Partial Progress` (40 established effects) and `Effect Evidence State = UNKNOWN` for the unresolved remainder at the same time. Preserve pending/reconciliation and safe actor obligations from authoritative business truth.

Falsifier: force the operation into either `PARTIAL` or `UNKNOWN` as mutually exclusive outcome classes, or declare whole-operation success/failure from the timeout.

## R2 — Request retry is not automatically the same Logical Operation

Input: Two API requests have identical payload and customer account, but the second may be either a transport retry of the same purchase intent or a deliberate second purchase.

Expected: keep Logical Operation equivalence unresolved until Product/domain/Business Rule truth discriminates the actor/business intent; treat request attempts as transport/execution evidence only.

Falsifier: infer same Logical Operation because payload/request shape is identical, or invent an idempotency key/business rule.

## R3 — Different request IDs may still be attempts of one Logical Operation

Input: Client timeout causes a fresh HTTP request ID on retry, while the authorized business intent is explicitly one withdrawal operation.

Expected: preserve one Logical Operation with multiple Request Attempts when source truth establishes that relation; Requirements states the business-visible duplicate/no-extra-effect guarantee without prescribing technical mechanism.

Falsifier: treat a new request ID as a new business intent or prescribe queue/lock/database idempotency mechanics.

## R4 — Acceptance derives from progress and evidence, not one enum

Input: One externally visible side effect is established, a second is known not to have happened, and a third remains UNKNOWN pending reconciliation.

Expected: Acceptance Criteria can state the established effect, no-change guarantee, pending/UNKNOWN obligation, and final reconciliation postcondition without forcing the whole item into one `PARTIAL`/`PENDING` label.

Falsifier: collapse all observations into a single outcome label that hides which effects are established, absent, or unknown.

## R5 — Acknowledgement is neither Completion nor effect proof

Input: Provider acknowledges receipt of a cancellation request but final cancellation has not been confirmed.

Expected: distinguish `Acceptance` of the request/attempt from business `Completion` and from Effect Evidence State; keep target behavior grounded in authority.

Falsifier: make acknowledgement prove final business completion or invent provider retry semantics.

## R6 — Technical evidence may falsify current meaning without becoming target authority

Input: Runtime inspection shows current retries sometimes duplicate charges, while authorized target policy says one purchase intent must never produce more than one charge.

Expected: bind duplicate current behavior as `CURRENT_VERIFIED`, retain the authorized one-effect guarantee as `TARGET_AUTHORIZED`, and leave mechanism to Engineering.

Falsifier: promote current duplicate behavior into target requirements, or turn the target guarantee into a database/queue design prescription.
