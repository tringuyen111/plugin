---
name: acceptance-criteria
description: Define or review observable acceptance criteria for a user story or use case. Use when expected behavior needs happy, alternate, error, edge, permission, state, or negative guarantees without prescribing code or test implementation.
---

# Acceptance Criteria
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before defining or reviewing material acceptance conditions that downstream Design/Engineering/QA must preserve:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) to keep source behavior coverage, material decomposition, and unresolved choices explicit across later stages.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Define the observable conditions required for Product or business acceptance.

Acceptance Criteria are not test implementation steps and not a substitute for
Business Rules, Use Cases, visual design, or technical tasks. This skill owns
criterion semantics and **criterion maturity**; it does not own the downstream QA
verification verdict or waiver decision.

Read `AC-FORMAT.md` before writing or reviewing criteria.

When the source behavior is stateful, interruptible, repeatable/duplicate-prone,
partially committing, multi-actor, or time-dependent, or when current behavior
must be distinguished from target behavior, read
`../define-behavior/BEHAVIOR-SEMANTICS-CONTRACT.md`. Reuse its business semantics;
do not copy technical retry/idempotency/transaction mechanisms into the AC.

## Source fixed point and criterion truth

Bind each material criterion to an exact **criterion revision** and the exact
**source behavior identity** plus **source revision** it refines: User Story, Use
Case, Business Rule, NFR, Product/Behavior Package decision, or another canonical
behavior source.

Classify the **criterion truth basis** explicitly:

- **CURRENT_VERIFIED** — current observable behavior supported by current-state
  evidence. It is not automatically the desired acceptance condition.
- **TARGET_AUTHORIZED** — target behavior authorized by the exact canonical
  source revision. An APPROVED target Acceptance Criterion must ultimately rest
  on this kind of authority.
- **PROPOSED_OR_ASSUMED** — stakeholder proposal, inference, unresolved branch,
  or working assumption that is not yet authorized target truth.

A material source change makes the affected criterion stale. Revalidate the
criterion against the new exact source revision and advance the criterion
revision before downstream verification relies on it. Evidence for an older
criterion revision remains evidence for that old fixed point; it does not become
evidence for the revised criterion by carry-over.

## Process

1. **Bind source behavior.** Resolve the exact User Story, Use Case, Business
   Rule, state, Product non-goal, relevant NFR and their material revisions. Set
   criterion revision and truth basis. Reconcile material source behavior under
   the Semantic Continuity Contract so criteria derive from canonical truth
   instead of becoming a detached replacement list.
2. **Choose the observable boundary.** State what the actor, operator, external
   system, or machine consumer can observe. Avoid internal method calls, data
   structures, queues, locks, role IDs, retry counts, or other implementation
   mechanisms.
3. **Cover the main success.** Define the minimum successful result and its
   observable postcondition.
4. **Cover relevant branches.** Include alternate, validation, permission,
   empty, duplicate, timeout, external-dependency, recovery, state, multi-actor,
   and effective-time behavior only where material to the source semantics.
5. **Preserve interrupted and partial truth when material.** If an operation can
   time out or be interrupted after an effect may have happened, do not collapse
   the outcome into generic success/failure. State the observable `UNKNOWN` or
   pending condition, the reconciliation/final observable required to close it,
   any already-real **partial** business effect, and the safe business guarantee
   for a **retry** or **duplicate** intent. If a business-visible **commitment**
   already occurred, define required **compensation**/reversal or residual
   outcome without prescribing technical rollback/idempotency mechanics.
6. **Do not confuse acknowledgement with completion.** A provider or downstream
   system **acknowledgement** is not acceptance completion when the business
   result is not yet final. Criterion completion must use the final observable or
   reconciliation outcome required by the authorized behavior.
7. **Define negative guarantees.** State what must not happen: no duplicate
   charge, no state change on failure, no information leak, no hidden fallback,
   no access outside permission, or no false success while outcome is unknown.
8. **Add boundaries.** Use exact business thresholds, dates, rounding, limits,
   and wording only when supported by an exact Business Rule or approved source
   revision. Do not paraphrase a materially different boundary.
9. **Link quality constraints.** Reference NFRs with their observable evidence
   contract instead of vague words such as fast, intuitive, secure, or reliable.
   Do not invent a numeric threshold to make an unresolved NFR look testable.
10. **Preserve Product ownership.** A Product metric target or guardrail is **not
    automatically** an Acceptance Criterion. It becomes criterion truth only
    when the owning Product/domain/NFR source authorizes the corresponding
    observable behavior or quality requirement.
11. **Account for source behavior coverage.** For each material incoming
    obligation in declared scope, record the criterion/lineage that covers it or
    an explicit unresolved, owner-routed, or proven-not-applicable disposition.
    Missing source behavior is not covered by omission or by a locally clean set
    of criteria.
12. **Assign acceptance and waiver authority.** Name the Product/PO/business
    acceptance owner and their scope. If waiver authority differs, record it
    separately; authoring or approving the criterion does not grant waiver
    authority.
13. **Keep verification separate.** A new or materially revised criterion starts
    verification status `NOT_RUN`. QA may later attach PASS/FAIL/INCONCLUSIVE
    evidence bound to the exact candidate and criterion revision. A waiver does
    not rewrite FAIL, INCONCLUSIVE, or NOT_RUN evidence to PASS.
14. **Hand probe semantics to QA.** State verification intent/evidence need, but
    use `/test-condition` when an executable probe contract, environment, data,
    falsifier, cleanup, or evidence limitation must be defined. `/verify-quality`
    owns evidence admission and the overall QA verdict.
15. **Review testability.** QA and Engineering should be able to derive test
    conditions without the AC prescribing framework, test code, storage, UI
    implementation, or technical control flow.

## Formats

Use Given/When/Then for event-oriented behavior or a checklist for independent
conditions. Do not force one syntax when it makes behavior less clear. Simple,
stateless criteria need not carry interruption fields that cannot change their
observable outcome.

## Completion

`READY` requires:

- exact criterion revision, source behavior identity/revision, and truthful
  criterion truth basis;
- every criterion traces to its canonical story/use case/rule/NFR/Product source;
- every material source behavior in declared scope is accounted for through
  criterion lineage or an explicit unresolved/disposition state;
- expected result and material negative/no-change guarantees are observable;
- material unknown/partial/retry/commitment/compensation semantics are preserved
  when they can change the business outcome;
- ambiguous qualitative words are replaced by source-authorized evidence targets
  or remain unresolved;
- acceptance owner is identified;
- criterion maturity is separate from QA verification status and waiver decision;
- no implementation, test framework, or UI decision is hidden inside the criterion.

Workflow `READY` does not mean the criterion is verified, waived, or accepted for
a particular candidate. Those downstream axes require their own exact-revision
evidence and authority.
