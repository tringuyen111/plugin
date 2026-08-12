---
name: user-story
description: Write or refine user stories that trace to product scope, actor goals, use cases, and business rules. Use when a capability needs to be expressed as user value without turning technical tasks, UI controls, or implementation details into stories.
---

# User Story
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Express one valuable user capability in a negotiable delivery unit.

A User Story connects Product intent to behavior. It does not own business-rule
authority, detailed acceptance, Product priority, Product metric targets, visual
design, technical tasks, test cases, QA evidence, or release truth. **Story maturity**
is requirement maturity only; downstream implementation, verification, and release
state stays with its canonical owner.

Read `USER-STORY-FORMAT.md` before writing or reviewing stories. When a story is
oversized, dependency-heavy, proposed as frontend/backend/database work, or cannot
be split without losing actor value, read `USER-STORY-SLICING-CONTRACT.md` before
choosing the slice boundary.

## Story fixed point and target truth

Bind the artifact to an exact **Story revision**, exact **Product source identity**
and **Product source revision**, and the exact Behavior/Use Case/Business Rule
revisions that materially define the capability when they exist.

Classify the Story's **target truth basis**:

- **TARGET_AUTHORIZED** — the actor capability/scope is authorized by the exact
  Product/domain source revision.
- **PROPOSED_OR_ASSUMED** — the requested capability, benefit, scope, dependency,
  or assumption still lacks sufficient Product/domain authority.

**Current verified** runtime/business behavior may constrain refinement for an
existing product, but it does not silently become the target when it conflicts
with `TARGET_AUTHORIZED` intent.

A material Product/Behavior/Rule source change makes the affected Story stale.
Revalidate actor, capability, benefit, scope, dependencies, assumptions and AC
handoff against the new source revision before preserving maturity. Prior Story
maturity and downstream evidence remain bound to the revision they actually
consumed; they **do not carry forward** by ID or wording similarity.

## Source order

Use:

1. exact authorized Product outcome and feature scope revision;
2. exact Behavior Package / actor / Use Case revisions when they exist;
3. exact approved Business Rule and NFR revisions that constrain the slice;
4. current verified behavior for an existing product as current-state context;
5. open assumptions clearly marked as such.

If no actor goal or use case exists, route to `/use-case` rather than inventing
one from the proposed implementation.

## Process

1. **Resolve the specific actor.** Use a specific business/user role, not generic
   “user”, when the distinction changes the capability, value, permission or
   behavior.
2. **Resolve the capability.** Describe what the actor needs to accomplish, not
   the UI control or code mechanism.
3. **Resolve the benefit.** State the user/business outcome or reason that makes
   the Story valuable. Link Product outcome/metric context where useful, but a
   Product **metric target** does not become Story acceptance or Story-owned
   priority.
4. **Carry decision-relevant context.** Link exact Product/Behavior/Use Case/Rule/
   NFR revisions and preserve only constraints that can change actor, capability,
   benefit, scope, acceptance path or slice boundary. Do not copy the Product
   evidence corpus or another artifact's mutable status.
5. **Resolve dependency and assumption truth.** For each material dependency,
   record canonical reference/revision, owner, whether it is **blocking** or
   **non-blocking**, and what fails or remains unavailable if it is unmet. Record
   assumptions whose resolution can change actor/capability/benefit/scope. A Story
   can be coherent and valuable with declared dependencies; “independent” does
   **not mean dependency-free** implementation.
6. **Check the value slice.** The Story should be independently understandable
   as actor value, negotiable, valuable, estimable enough for planning, small
   enough for one coherent delivery slice, and capable of routing to observable
   acceptance. Use `USER-STORY-SLICING-CONTRACT.md` when this boundary is unclear.
7. **Split by value or behavior boundary.** Preserve a vertical/end-to-end actor
   outcome. Do not split by **technical layers** such as frontend, backend, API,
   database, queue, or infrastructure merely to make each piece smaller.
8. **Name technical enablers separately.** Refactors, migrations, observability,
   infrastructure and similar work are **technical enablers** linked to the Story,
   rule, NFR or invariant; they are not fake actor stories.
9. **Route acceptance.** Invoke `/acceptance-criteria` after the Story fixed point,
   value slice, material dependencies and assumptions are stable enough to define
   observable acceptance. Pass the exact Story/source revisions; do not write
   detailed AC inside the Story owner.
10. **Handle material revisions through traceability.** If an approved Story or
    source revision changes after AC/design/tasks/tests exist, route impact through
    `/traceability`; do not silently rewrite downstream artifacts or copy their
    stale/current status into Story maturity.
11. **Keep downstream state linked, not copied.** A Story may link canonical
    execution/work, QA evidence and release artifacts, but it must not copy their
    mutable status into Story maturity. A Story can remain `APPROVED` while
    canonical work, QA and release state change independently.

## Ownership boundaries

- **Product owns priority**, Product outcomes/metrics, feature-scope authorization
  and opportunity cost. User Story may link these decisions but does not reprioritize.
- `/acceptance-criteria` **owns detailed acceptance**; User Story owns actor value,
  source fixed point and the delivery-facing slice.
- Business Rule and NFR owners keep their rule/quality semantics; Story links exact
  revisions without restating or weakening them.
- Architecture/Engineering **own technical** design, tasks, implementation and
  technical enablers. A dependency or enabler does not become an actor Story to
  move technical work into BA ownership.
- `/traceability` **owns** downstream impact/staleness traversal after material
  approved revisions. Story does not silently mutate AC/design/tasks/tests.
- QA owns verification evidence/verdict. Story maturity never becomes QA, UAT or
  release status.

## Anti-patterns

Invalid:

```text
As the database, I want a new index so queries are faster.
As a user, I want a dropdown so I can select a value.
As engineering, we want to refactor the service.
```

Prefer:

```text
As a property manager, I want to settle several eligible rooms in one review so
that monthly collection work does not require repeating the same checks room by
room.
```

## Completion

`READY` requires an **exact Story/source fixed point**, specific actor,
capability, benefit, explicit scope/value-slice boundary, material dependency and
assumption truth, source links, and a clear **route to `/acceptance-criteria`**.
A blocking dependency or assumption that can materially change actor, capability,
benefit, scope or acceptance keeps the workflow `PARTIAL` or `BLOCKED` until the
canonical owner resolves it; a declared non-blocking dependency does not by itself
make a coherent Story non-ready.

Technical enablers discovered during refinement are recorded separately rather
than embedded in the Story. Workflow `READY` and Story maturity **does not assert
implementation**, QA, UAT, Product priority or release completion.
