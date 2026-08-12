---
name: define-behavior
description: Turn approved Product intent into a traceable behavior package of actors, use cases, business rules, user stories, acceptance criteria, NFRs, and open decisions.
---

# Define Behavior
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **When behavior is stateful, interruptible/repeated, multi-actor, time-dependent, rule-heavy, or current behavior conflicts with target intent:** read [Behavior Semantics Contract](BEHAVIOR-SEMANTICS-CONTRACT.md) before declaring package coverage/readiness.
<!-- runtime-context:end -->

Translate approved Product intent into observable, testable business behavior.

This is the Business Analysis entry workflow. It orchestrates existing BA
primitives rather than redefining their rules.

It owns **Behavior Package composition** and **package readiness**:

- package-level actor registry, business concepts, and cross-primitive boundaries;
- exact Product-to-BA source binding and decision-relevant constraint carry-forward;
- separating current verified, target authorized, and proposed/assumed behavior;
- selecting the smallest required BA primitives and linking their canonical artifacts;
- cross-primitive state/error/interruption coverage, conflicts, open behavior decisions, stale-impact visibility, and downstream handoff completeness;
- orchestration of requirement traceability and change impact through the `traceability` artifact owner.

Each BA primitive owns its own artifact semantics. `/use-case` owns Use Case behavior sequence, `/business-rule` owns Business Rule semantics, `/user-story` owns delivery-facing actor value, `/acceptance-criteria` owns observable acceptance criteria, `/non-functional-requirement` owns measurable quality constraints, and `/traceability` owns the traceability graph/change-impact artifact. When a primitive must be created or revised, execute that primitive owner; this orchestrator assembles and checks the package rather than rewriting the primitive's rules. In short: the **primitive owns** its artifact; `define-behavior` owns their coherent package.

It does not own product priority, visual design, architecture, technical tasks,
implementation, QA verdicts, UAT approval, or release. Product metrics/guardrails
remain upstream outcome context unless an authorized business rule or acceptance
condition independently makes a threshold part of behavior.

Read `BEHAVIOR-PACKAGE.md` before writing or updating artifacts.

## Preconditions

Start from an approved Product definition/decision with its **exact Product source identity and revision** when available. `OUT-*` / `EPC-*` are supported logical representations, not mandatory global Product identifiers.

Carry forward only the **decision-relevant Product constraints** that can change behavior: target actor/segment, scope/non-goals, unresolved Product assumptions, and material evidence/selection/transferability/counter-evidence or metric/guardrail caveats. Link the Product artifact; do not copy its full evidence corpus or strengthen its claims.

If outcome, metric, priority, or scope is unresolved, route to
`/product-definition`. If there is only a solution idea, route to
`/product-discovery`.

## Process

### 1. Read before asking

Read the exact Product definition revision, existing BA artifacts, domain glossary, ADRs,
current runtime/source behavior when the feature already exists, error/state
artifacts, support evidence, and current documentation.

Do not ask a question already answered in the current session or an existing
source. When an answer is partial, ask only for the missing branch.

### 2. Establish actors, concepts, boundaries, and truth altitude

Identify:

- primary and supporting actors;
- business concepts and overloaded terms;
- **current verified** behavior/process when inspectable;
- **target authorized** Product/domain behavior for the exact revision;
- **proposed or assumed** behavior that still lacks authority/evidence;
- trigger and completion boundaries;
- affected business states;
- explicit non-goals and decision-relevant Product constraints.

Do not turn current runtime behavior into desired truth when it conflicts with the authorized target. Do not turn a stakeholder proposal or Product assumption into a deterministic Rule/AC without the canonical owner decision.

Invoke `/domain-modeling` when terminology or a consequential decision needs a
canonical glossary or ADR.

### 3. Define behavior with primitives

Use the smallest required set:

- `/use-case` for actor goals and main/alternate/error flows;
- `/business-rule` for policy, validation, permission, calculation, derivation,
  transition, obligation, exceptions, source authority, effective scope, and rule conflict;
- `/non-functional-requirement` for measurable quality constraints;
- `/user-story` for delivery-facing actor value;
- `/acceptance-criteria` for observable acceptance and negative guarantees;
- `/traceability` to connect the package and detect stale/missing links.

Do not duplicate a primitive’s template inside the orchestrator output.

### 4. Model states, interruptions, and errors at business altitude

For every meaningful business state or outcome, identify or link:

- how it is entered and the business event/trigger;
- actor-visible result/obligation;
- valid next actions and invalid transitions;
- error/recovery behavior and no-change guarantees;
- rules and AC that govern it.

When an operation is materially interruptible, repeated, partially committed,
**multi-actor**, or **time-dependent**, use `BEHAVIOR-SEMANTICS-CONTRACT.md` to
check the business-visible commitment boundary, interruption/unknown outcome,
**retry**, **duplicate** intent, **partial** business effect, cancellation/compensation,
actor conflict, and effective-time semantics. Record an unresolved owner decision
instead of inventing business policy.

Keep business semantics separate from technical mechanisms. Architecture/Engineering own database transactions, API retry policy, technical idempotency, locks, queues, merge algorithms, and implementation concurrency controls.

One screen or process step may have mutually exclusive states. Keep business states
separate in behavior artifacts so Design and QA do not interpret them as simultaneously
visible, but do not promote every presentation/screen state into a business state.

### 5. Resolve conflicts and open decisions

When Product intent, current runtime, stakeholder request, rule, or docs
conflict:

1. record each source/revision and the conflict;
2. state the affected artifacts/branches;
3. assign the authorized owner;
4. apply rule precedence/effective period only when an authoritative Business Rule/policy defines it;
5. record downstream artifacts as potentially affected and invoke
   `/traceability` to classify stale or blocked impact; leave canonical status
   changes to the canonical artifact or work owner;
6. do not synthesize a compromise without approval.

### 6. Prepare downstream handoff

The behavior package must tell:

- **Design** which journeys, business states, content, errors, and device questions need experience decisions;
- **Architecture** which NFRs, integrations, data concepts, business-visible commitment/recovery guarantees, and irreversible constraints need technical decisions;
- **Planning** which approved stories/AC/NFRs are ready to slice;
- **QA** which risks, branches, invalid transitions, interruption/duplicate/partial outcomes, and evidence intentions need verification.

It must not make those downstream decisions itself.

### 7. Write or update artifacts

Use the project-selected BA artifact location. If no canonical location is
configured, return the complete behavior package inline with persistence
`NOT_RUN`. Use `PARTIAL` when the current session can consume it and `BLOCKED`
when durable or cross-session truth is required. Do not create a repository path
by default.

- New artifacts are `DRAFT` until the accountable BA/PO/domain owner reviews
  them.
- Editing an approved artifact requires showing the affected links and change
  impact before applying the change.
- If the user or project policy requires a plan/diff approval, follow it. Do not
  impose a universal approval ritual on unrelated engineering work.

## Completion

`READY` requires:

- exact approved Product source identity/revision and material decision-relevant constraints linked;
- current verified, target authorized, and proposed/assumed behavior separated where more than one exists;
- actors, scope, concepts, and behavior boundaries;
- relevant Use Cases, Rules, Stories, AC, and NFRs linked;
- material state/transition/error coverage and, when applicable, interruption/retry/duplicate/partial/multi-actor/time-dependent behavior covered or explicitly owner-blocked;
- open conflicts, rule authority/precedence gaps, and owners visible;
- traceability and stale impact reviewed;
- explicit Design, Architecture, Planning, and QA handoff;
- no Product metric, priority, visual, technical, or QA decision silently made.
