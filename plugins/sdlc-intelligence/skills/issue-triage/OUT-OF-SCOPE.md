# Rejected-Scope Decision Memory

Use this reference only when an incoming request matches a project-authorized durable record of an owner decision **not to pursue a proposed behavior/scope**, or when an authorized rejection must be persisted in an already-selected canonical decision-memory provider.

Rejected-scope memory is optional project governance. It is not Issue Triage state and must never become a shadow tracker.

## Provider truth

The project must identify one canonical provider before a durable read/write claim is made. Possible projections include a tracker decision record, repository-owned decision document at an authorized path, Product decision system, or another configured knowledge provider. Do not create `.out-of-scope/` or any fallback location by assumption.

If no canonical provider is known, Issue Triage may still record `REJECTED` on the work item when the owner decision and tracker mutation are otherwise authorized; durable cross-request rejection memory remains `NOT_RUN`/unavailable rather than blocking the intake result.

## Record contract

One canonical record should preserve only the durable decision truth needed to recognize equivalent future requests:

```text
Concept / intended outcome
Decision: REJECTED | RECONSIDERED
Reason
Decision authority
Decision revision/date
Important scope distinctions
Canonical request/change-item references
Material evidence / related accepted decisions
Canonical provider + record identifier
```

Compare by intended outcome and material scope, not keyword similarity.

## Read behavior

1. Resolve the canonical rejected-scope provider when current project truth identifies one.
2. Read the current record before claiming a prior rejection.
3. Compare the incoming request by concept/outcome and important distinctions.
4. Preserve reason, authority, revision, and canonical identifier when the match changes disposition.
5. If equivalence or reconsideration itself requires an owner decision, record that frontier; Issue Triage does not decide it merely to complete intake.

A cache or user-supplied record may support bounded analysis but does not prove current canonical status.

## Write behavior

Write/update only when:

- an authorized owner explicitly rejects proposed behavior/scope;
- the project already selected a canonical rejection-memory provider;
- a live authorized write primitive exists; and
- the write will not create duplicate status truth.

If a matching record exists, update it according to provider/project policy and preserve the new canonical request reference. Otherwise create one canonical record only when authorized. Verify the postcondition. Do not create rejected-scope memory for a defect contradicted by evidence, behavior already satisfied, or a duplicate that is still active elsewhere.

Reconsideration must preserve history according to provider policy; do not silently delete prior rejection truth or reopen old work without separate authority.
