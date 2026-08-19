# Frozen Behavioral Qualification Cases — code-review

The cases below were derived and pressure-tested **before** the `code-review` candidate source revision. This file snapshots the pre-edit criteria for later execution. Runtime execution is `NOT_RUN` until a real model/Skill runner can compare baseline versus candidate behavior.

## Rubric dimensions

- `SEMANTIC_CHANGE`: identifies what behavior/meaning changed before treating files as independent units.
- `SCENARIO_REASONING`: derives material happy, edge/state, failure/partial-progress, concurrency/order, and recovery branches from the mechanism.
- `INVARIANT_AUTHORITY`: states the governing state/invariant/authority without inventing unsupported policy.
- `SEMANTIC_IMPACT`: traces concrete readers/writers/enforcers/consumers/invalidators/recovery paths beyond local imports when material.
- `OWNERSHIP_REUSE`: finds an existing semantic owner or rejects forced reuse based on meaning/lifecycle/failure semantics rather than syntax.
- `LENS_FOCUS`: activates only domain lenses justified by risky seams and applies them to those seams.
- `TRUTH_CONSISTENCY`: detects material docs/docs, docs/code, code/code/config/test contradictions with authority/freshness provenance.
- `BOUNDARY_DISCIPLINE`: reports the defect/ownership conflict without stealing implementation, architecture, diagnosis, QA, merge, or release authority.

## Case C1 — sync cancel becomes accepted/async

`POST /orders/{id}/cancel` changes from synchronous `200 {status:"cancelled"}` to `202 {operation_id}`; a worker completes cancellation later. Handler/worker are changed, but one generated client, UI branch, old docs, and monitoring assumptions are outside the diff.

Strong behavior must:
- identify the semantic shift `request completion == business completion` -> `acceptance != completion`;
- reconstruct operation persistence, worker/redelivery, refund/inventory/event and client observation;
- cover duplicate intent, partial effects, stuck operation and retry-after-lost-response branches;
- search consumers that depend on the old completion meaning, including SDK/UI/monitoring;
- activate API + async/data/test lenses rather than only reviewing changed files;
- detect old docs/tests/client contracts that still encode synchronous completion.

## Case C2 — rolling migration with new identity invariant

A migration backfills `normalized_username = lower(username)`, adds uniqueness, and new code reads/writes it while old binaries may still write only `username`; production already contains `Alice` and `alice`.

Strong behavior must:
- model old/new code coexistence, backfill, constraint enforcement, login/search and rollback/restart;
- identify the normalized-identity uniqueness invariant and the migration phase in which it becomes enforceable;
- cover collisions, concurrent writers, partial backfill and rerun/rollback;
- trace identity consumers, error mapping, fixtures and runbook outside the migration file;
- activate data/migration + deployment/API/test lenses as supported;
- refuse to call the migration safe merely because application validation exists.

## Case C3 — authorization cached in token

A path stops reading current tenant membership and trusts a role embedded in a signed token valid for 15 minutes. Security policy says admin revocation must take effect immediately.

Strong behavior must:
- separate authentication validity from current authorization authority;
- model revocation, tenant move, role downgrade, alternate sensitive paths and token refresh;
- identify the freshness/authority invariant;
- trace policy, TTL/config, all sensitive sinks, alternate enforcers and audit/test claims;
- activate security plus API/cache lenses as material;
- surface the distributed policy/config/code/test contradiction without assuming one source is authoritative solely by type.

## Case C4 — stale frontend completion

A debounced search sends overlapping requests and updates results whenever any response returns. URL synchronization, selection/focus and analytics live outside the changed hook.

Strong behavior must:
- model query/request/result authority and user-visible state transitions;
- cover older response after newer, clear/unmount, selection into changed results and error-after-success;
- state that stale completion must not overwrite newer authority;
- trace selection/focus/router/analytics dependencies even when they are not direct callers;
- activate frontend + network/test lenses;
- notice tests whose mocks always resolve in request order are a weak oracle for the changed claim.

## Case C5 — shared user cache in multi-tenant system

`getUser(id)` gains a process-wide 10-minute cache. Numeric IDs are unique only inside a tenant and role changes should become visible quickly on authorization-sensitive screens.

Strong behavior must:
- infer cache validity dimensions from tenant/user identity and consuming authority;
- model hit/miss/update/invalidation/expiry and stale/tenant-collision branches;
- trace every material writer/invalidator and auth-sensitive consumer;
- activate performance + security/data lenses;
- detect conflict between cache TTL, security freshness policy, schema identity and one-tenant tests.

## Case C6 — reuse/extend the existing semantic owner

A cancellation endpoint adds a local `canCancel(order)` state list while `OrderTransitionPolicy.canTransition(from,to)` already governs the same transition for worker/admin paths; only API reason formatting differs.

Strong behavior must:
- recognize two enforcers of one state-transition invariant, not merely duplicated syntax;
- identify `OrderTransitionPolicy` as the likely existing semantic owner;
- recommend convergence on one policy owner with presentation adaptation at the edge;
- avoid prescribing a specific new interface when that is a material design choice;
- surface the drift risk even if both implementations currently return the same answer.

## Case C7 — reject forced reuse despite similar retry code

An HTTP request retry loop and a durable worker redelivery loop both use exponential backoff and are merged into a shared `RetryManager`.

Strong behavior must:
- distinguish request deadline/cancellation/ambiguous remote completion from durable progress/redelivery/dead-letter semantics;
- reject one high-level policy owner merely because loop structure matches;
- allow that a tiny stateless backoff/jitter primitive could still be shareable if its semantics align;
- activate API/backend failure models to justify the distinction;
- flag any abstraction/config/docs that falsely make `attempt`, timeout, or terminal failure mean the same thing in both contexts.

## Case C8 — duplicate active truth via local fallback

Central config defines `retention_days` default `30`; a cleanup worker adds local fallback `90` when configuration is absent while documentation still says default 30.

Strong behavior must:
- identify configuration/default resolution as the semantic owner of retention policy;
- treat the worker constant as a bypass/second active truth, not harmless defensive coding;
- trace config schema, worker, docs, tests and operator-visible behavior;
- recommend consuming/extending the canonical resolved owner rather than retaining both defaults;
- record docs/config/code/test conflict with provenance.
