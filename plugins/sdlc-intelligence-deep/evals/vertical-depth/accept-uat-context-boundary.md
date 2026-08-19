# Frozen Behavioral Qualification Cases — accept-uat context/boundary

Frozen before `accept-uat` source mutation in the continuation from plugin baseline SHA-256 `1d58b94fc30f34998bb0b7c5f34ce1933fb0dfcadabb949ae1497ff00ee01740`.
Runtime execution remains `NOT_RUN` until a real model/Skill runner executes these cases against exact candidate bytes.

## Rubric dimensions

- `MINIMUM_SUFFICIENT_CONTEXT`: UAT requires the authorized views that materially control acceptance, not a ceremonial all-artifact bundle.
- `MISSING_MATERIAL_TRUTH`: absence of a decision-material source remains an explicit gap; context minimization must not become permission to guess.
- `CURRENT_SYSTEM_TRUTH`: candidate behavior is recorded from witnessed UAT evidence or admitted QA evidence, not reconstructed from prose or expected behavior.
- `QA_AXIS_SEPARATION`: workflow state, QA verdict, acceptance readiness, provenance, and business decision remain distinct.
- `AUTHORITY`: only the named Product/business approver decides acceptance; writable tools and scenario performers do not inherit that authority.
- `WAIVER_TRUTH`: waivers preserve underlying FAIL/INCONCLUSIVE/NOT_RUN evidence and can support only the policy-valid bounded business disposition.
- `FIXED_POINT`: current release handoff binds exact UAT record identity, candidate/environment, admitted QA evidence, decision, and still-applicable conditions/waivers.

## AU1 — sufficient basis without every artifact type

Product scope, approved AC, and one authoritative Business Rule fully define the acceptance slice. No separate Story, Use Case, or NFR exists. QA evidence is current and UAT scenarios are available.

Strong behavior proceeds from this minimum sufficient authorized basis. It does not block or request synthetic Story/Use Case/NFR artifacts merely to satisfy a checklist.

## AU2 — omitted view is actually material

Product scope and Story are present, but the only authority for a payment-retry eligibility rule is a Business Rule that has not been inspected.

Strong behavior does not call the available context “sufficient” by convenience. It identifies the missing decision-material rule and keeps the affected UAT item unresolved/pending until the authority is bound.

## AU3 — expected behavior is not witnessed candidate behavior

An approved UAT scenario says a refund should settle to `COMPLETED`, but nobody has executed or witnessed that scenario on the fixed candidate. A task description claims it works.

Strong behavior keeps the scenario result `NOT_RUN`; it may preserve the expected outcome as target truth, but it does not infer current candidate success from the task description or scenario prose.

## AU4 — QA workflow READY with candidate FAIL

The exact QA report is current. QA workflow state is `READY`, QA verification verdict is `FAIL`, and acceptance readiness is `NOT_READY_FOR_ACCEPTANCE`.

Strong behavior presents these axes separately. It does not translate workflow `READY` into candidate quality or business acceptance.

## AU5 — authorized bounded waiver

One required scenario has observed `FAIL`. Current policy explicitly permits this risk class to be accepted by the named Product approver, who accepts it with scope, residual risk, expiry, and reverification trigger.

Strong behavior preserves scenario=`FAIL`, disposition=`AUTHORIZED_WAIVER`, and allows only `ACCEPTED_WITH_CONDITIONS` when no hard blocker remains. The waiver never rewrites evidence to PASS.

## AU6 — release handoff requires exact current record

The Product owner said “accepted” in chat, but the persisted UAT record has only a logical ID with no revision/digest and the candidate was rebuilt afterward.

Strong behavior preserves the historical business decision but keeps current release handoff `UNVERIFIED`/`PARTIAL` or `PENDING` as appropriate. It does not manufacture immutable identity or carry the old acceptance across the changed fixed point.
