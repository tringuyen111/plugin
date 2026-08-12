---
name: use-case
description: Define a goal-oriented interaction between an actor and the system. Use when a workflow needs main, alternate, and error behavior; preconditions and outcomes; or when an existing requirement is too vague to become user stories and acceptance criteria.
---

# Use Case
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **When the actor goal is stateful, interruptible/repeated, partially committed, multi-actor, time-dependent, or current behavior conflicts with target truth:** read [Behavior Semantics Contract](../define-behavior/BEHAVIOR-SEMANTICS-CONTRACT.md) before finalizing flows/postconditions.
<!-- runtime-context:end -->

Define observable business behavior for one actor goal.

This skill owns the behavior sequence and its relationship to actors and
business rules. It does not choose UI layout, API shape, database schema,
framework, module boundaries, test implementation, product priority, or
technical transaction/idempotency/concurrency mechanics.

Read `USE-CASE-FORMAT.md` before writing the artifact.

## Source and truth binding

Prefer the exact canonical **Behavior Package source identity and source revision** when `/define-behavior` already composed the feature. Otherwise bind the exact approved Product/domain source available for the actor goal. Record the Use Case **truth basis** explicitly:

- **TARGET_AUTHORIZED** for authorized target behavior;
- **CURRENT_VERIFIED** when documenting inspectable current behavior;
- **PROPOSED_OR_ASSUMED** for an unresolved/proposed branch.

Current verified behavior does not silently become target authorized behavior. A proposed branch does not become an approved flow merely because it is useful to discuss. If the source revision changes materially, revalidate the Use Case and affected rule/AC links before treating it as current for downstream delivery.

## Source order

Use sources in this order, while keeping conflicts visible:

1. exact approved Behavior Package/Product outcome and feature scope revision;
2. authoritative business/domain rules and domain owner input;
3. current verified runtime behavior for an existing product;
4. current requirements and operational documentation;
5. stakeholder requests and assumptions.

A runtime/requirement mismatch is a finding to resolve, not permission to
silently pick one side. Preserve **current verified**, **target authorized**, and
**proposed/assumed** truth separately when more than one applies.

## Process

1. **Resolve the actor, goal, and source.** Name who initiates the interaction,
   what they are trying to achieve, why it matters, and the exact source identity/revision/truth basis.
2. **Define scope.** State trigger, preconditions, successful postconditions,
   failure/**no-change** postconditions, non-goals, and the **business-visible commitment boundary** when crossing it changes a material obligation/effect.
3. **Write the main flow.** Use business language. Each step states an actor
   action or an observable system response.
4. **Write alternate flows.** Cover valid variations, optional paths, different
   actor states, and material **multi-actor** or **time-dependent** branches when an existing rule defines them. Do not invent ordering/precedence when policy is unresolved.
5. **Write error, interruption, and recovery flows.** Cover validation, permission,
   missing information, external dependency failure, timeout, **unknown outcome**,
   **retry**, **duplicate** intent, **partial** business effect, delayed confirmation,
   cancellation/**compensation**, and recovery where relevant. If the outcome after interruption cannot be known, preserve UNKNOWN/pending semantics and a reconciliation/safe-next-action path rather than assuming success or failure.
6. **Link rules and concepts.** Reference `BR-*`, actors, business concepts, state
   transitions, effective-time/precedence rules, and unresolved conflicts. Invoke
   `/business-rule` when a decision is buried inside prose or lacks an authority/source.
7. **Model business state semantics.** Link meaningful states, events/transition guards,
   invalid transitions and invariants. Do not promote a presentation/screen state into a
   business state unless it changes what the actor/business can observe, do, owe, or expect.
8. **Check observability.** Every outcome must be visible to a user, operator,
   external actor, or machine consumer. Provider acknowledgement alone is not final business completion when a delayed/partial effect remains possible. Remove steps that only describe hidden implementation.
9. **Record open behavior questions.** Assign an owner and whether the question
   blocks downstream work. A missing duplicate/retry/precedence policy remains open rather than being replaced by a technical guess.

## IT-BA boundary

Ask in business language:

- who triggers the action and under what authority;
- when it can happen and which effective-time rule applies;
- what information is needed;
- what the system validates or records in business terms;
- what the actor sees;
- what happens when it cannot complete, completes partially, or the outcome is unknown;
- what business guarantee must hold for retries, duplicates, cancellation, or simultaneous actor actions.

Do not ask for column names, table schemas, function/service names, endpoint
shapes, framework choices, token strategy, hashing algorithms, SDK details,
idempotency-key format, lock type, queue ordering, database transaction strategy,
or retry counts. **Architecture/Engineering** owns those technical mechanisms.

Product metrics/targets remain upstream outcome context and are not Use Case
steps/postconditions merely because they are measurable.

## Completion

`READY` requires:

- one actor goal, exact source identity/revision/truth basis, and clear trigger;
- preconditions and success/failure/no-change postconditions;
- main, relevant alternate, and relevant error/interruption/recovery flows;
- when material: UNKNOWN/reconciliation, retry/duplicate, partial-effect/commitment/compensation, multi-actor/time semantics covered or explicitly owner-blocked;
- linked business rules, state transitions, effective-time/precedence semantics, and unresolved conflicts;
- observable outcomes and invalid-transition guarantees;
- no Product metric/priority, technical, visual, or verification decision disguised as behavior.
