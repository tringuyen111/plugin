---
name: codebase-design
description: Design one approved technical module/interface boundary with source-grounded ownership, alternatives, compatibility, migration, rollback, and proof. Use when the technical decision is already named; use as supporting deep-module vocabulary when another workflow owns candidate discovery or implementation.
---

# Codebase Design
<!-- runtime-context:start -->
## Runtime context

- **Final result / owner transition:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) before reporting completion or continuing across an owner boundary.
- **Owner, approval, or artifact conflict:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) before deciding.
- **Persist / supersede / handoff project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) before writing durable continuation truth.
- **Write / source control / deploy / destructive / communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) before acting.
- **Tracker / repository / storage / browser / connector / provider / tool choice or fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) before choosing.
- **Approved shared/foundation UI-system or frontend-system decision:** read [Frontend System Design Reference](FRONTEND-SYSTEM-DESIGN.md) before choosing library, component-interface, state-ownership, token/styling, responsive, accessibility, or large-data seams.
- **Material CI/CD / build / publication-promotion / pipeline / runner / environment-gate decision:** read [Delivery Pipeline System Design Reference](DELIVERY-PIPELINE-SYSTEM-DESIGN.md) before choosing pipeline trust, evidence, artifact, cache, credential, promotion, concurrency, or retry/reconciliation semantics.
- **Replacement / coexistence / compatibility / schema migration / removal:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) before choosing cutover, version, or removal semantics.
<!-- runtime-context:end -->


Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. The aim is leverage for callers, locality for maintainers, and testability for everyone.

This skill has two modes:

- **Technical-design owner** — the `/sdlc` router has selected `DESIGN_TECHNICAL`, the decision question is fixed, and this skill must produce the module/interface boundary, migration, rollback, and proof plan.
- **Supporting vocabulary** — another workflow such as `/improve-codebase-architecture`, `/implement`, or `/code-review` owns the result and uses the deep-module concepts without transferring ownership here.

When the fixed decision concerns a material backend/API operation contract, read
[Backend / API System Design Reference](BACKEND-API-SYSTEM-DESIGN.md) before
choosing retry, duplicate, concurrency, transaction, external-side-effect,
continuation, error, or observability semantics.

When the fixed decision changes durable data, schema, persistence, backfill,
canonical/derived representations, or query/write consistency, read
[Data / Persistence System Design Reference](DATA-PERSISTENCE-SYSTEM-DESIGN.md)
before selecting storage, migration, concurrency, cutover, or recovery mechanics.

When the fixed decision materially affects authentication, authorization,
tenant/resource isolation, session/token lifecycle, secrets, signed external
requests, abuse/replay resistance, or another security enforcement seam, read
[Security / Auth System Design Reference](SECURITY-SYSTEM-DESIGN.md) before
choosing technical controls or proof.

When the fixed decision materially changes CI/CD, build/promotion automation, pipeline triggers,
runner/execution identity, artifact provenance, environment protections, or delivery evidence, read
[Delivery Pipeline System Design Reference](DELIVERY-PIPELINE-SYSTEM-DESIGN.md) before choosing
trust boundaries, evidence DAG, artifact lineage, cache semantics, permissions/credentials,
promotion/concurrency, or retry/reconciliation behavior.

## Preconditions

For owner mode, resolve:

- approved Product/BA/Design behavior that the technical design must preserve;
- exact decision question and affected runtime path;
- current source, callers, tests, data/state truth, integrations, and existing ADRs;
- compatibility, migration, rollback, security, performance, and operational constraints;
- authorized destination and decision owner for any durable design artifact.

If the request is only a generic “clean up architecture” with no observed friction or fixed decision, do not invent a boundary. Route observed codebase friction to `/improve-codebase-architecture`; route unresolved terminology/invariants to `/domain-modeling` as support.

## Technical design workflow

1. **Freeze the decision.** State the exact behavior and technical uncertainty, current fixed point, non-goals, and decisions owned outside Engineering.
2. **Inspect the real path.** Map current truth owners, callers, interfaces, implementation detail leaked across seams, tests, runtime entry points, persistence/integration edges, and failure behavior.
   For frontend-system decisions, inspect the approved Visual Contract and use `FRONTEND-SYSTEM-DESIGN.md`; do not infer a library, component API, or state manager from visual preference.
3. **Resolve domain meaning.** Read the project glossary and accepted rules. Invoke `/domain-modeling` only when terms or invariants are genuinely unresolved; it does not choose the code seam.
4. **Apply [Engineering Economy Discipline](../../resources/shared/references/engineering-economy-discipline.md), then design alternatives.** First test whether no new mechanism, the existing canonical seam, a standard/runtime primitive, a supported native platform capability, or an approved installed dependency already satisfies the fixed decision. Only then produce the smallest set of materially different interface/seam options that remains: **minimum two** when a real decision still exists; use three when the decision space is not genuinely binary and a third distinct seam is feasible. Do not fabricate a custom option merely to hit a count. Read [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md) for alternative isolation, and [DEEPENING.md](DEEPENING.md) when deepening an existing dependency cluster.
5. **Compare explicitly.** Evaluate ownership, interface knowledge, locality, leverage, test surface, observability, data consistency, provider coupling, compatibility, migration cost, rollback, and future change pressure. Do not select by file count or diagram neatness.
6. **Choose or preserve uncertainty.** Recommend one option only when evidence and authority support it. Record rejected alternatives and unresolved decisions; return `PARTIAL` when owner approval or source evidence is missing.
7. **Classify delivery impact.** Apply [Foundation-Aware Delivery Discipline](../../resources/shared/references/foundation-aware-delivery-discipline.md) to each material seam. If the selected option is `SHARED` or `FOUNDATION`, name current consumers/invariants, the minimum runway, dependent work, and one representative walking-skeleton path; do not create foundation for hypothetical future reuse.
8. **Define delivery proof.** Name representative tests/runtime probes, walking-skeleton proof when applicable, migration and rollback checks, compatibility guarantees, telemetry or failure signals, and what evidence would falsify the design.
9. **Persist truthfully.** Write an ADR or technical design artifact only at an authorized project location. Reopen it, verify links and decision status, and do not mark a proposed option as accepted without the named owner.

## Replacement, version, and database discipline

When the design replaces an active path, state whether it is `REPLACEMENT_IN_PROGRESS`, `SUPPORTED_COEXISTENCE`, or `REMOVE`. A compatibility seam/version requires named current consumers and an intentional support window; hypothetical future providers or callers do not justify parallel APIs. Define parity, cutover, complete removal surface, and rollback/recovery evidence.

For schema/data changes, classify the environment as `EPHEMERAL`, `SHARED_TEST`, `UPGRADE_REHEARSAL`, or `PRODUCTION`. Local and staging names do not prove disposal rights. A pre-release disposable baseline may be reset only without durable consumers and with checksum, empty-to-latest, and failure-path proof. A released upgrade uses a new migration plus previous-release-to-latest evidence; do not squash away a supported upgrade path.

## Required technical design artifact

```markdown
# Technical design decision

## Decision question and fixed point
## Approved behavior and constraints
## Current ownership and runtime path
## Alternatives
## Selected module, interface, seam, and adapters
## Mechanism economy and reuse decision
## Foundation impact, runway, and walking-skeleton dependency
## Hidden implementation responsibility
## Data, error, side-effect, and observability contract
## Compatibility, migration, and rollback
## Test/runtime proof plan
## Rejected alternatives and trade-offs
## Approval, open decisions, and downstream impact
## Persistence result
```

## Completion

- `READY` — the decision is source-grounded, approved or explicitly ready for the named approver, alternatives and trade-offs are visible, and migration/rollback/proof are defined.
- `PARTIAL` — a useful design exists but source, constraint, approval, migration, or proof evidence is incomplete.
- `BLOCKED` — the fixed behavior, representative source path, required authority, or non-negotiable constraint is unavailable.
- `FAILED` — an authorized write or design artifact contradicts its declared source/decision and no safe fallback preserves the result.

A technical design does not implement the change, rewrite Product/BA/Design truth, or claim QA/release readiness.

## Glossary

Use these terms exactly — don't substitute "component," "service," "API," or "boundary." Consistent language is the whole point.

**Module** — anything with an interface and an implementation. Deliberately scale-agnostic: a function, class, package, or tier-spanning slice. _Avoid_: unit, component, service.

**Interface** — everything a caller must know to use the module correctly: the type signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics. _Avoid_: API, signature (too narrow — they refer only to the type-level surface).

**Implementation** — what's inside a module, its body of code. Distinct from **Adapter**: a thing can be a small adapter with a large implementation (a Postgres repo) or a large adapter with a small implementation (an in-memory fake). Reach for "adapter" when the seam is the topic; "implementation" otherwise.

**Depth** — leverage at the interface: the amount of behaviour a caller (or test) can exercise per unit of interface they have to learn. A module is **deep** when a large amount of behaviour sits behind a small interface, **shallow** when the interface is nearly as complex as the implementation.

**Seam** _(Michael Feathers)_ — a place where you can alter behaviour without editing in that place; the *location* at which a module's interface lives. Where to put the seam is its own design decision, distinct from what goes behind it. _Avoid_: boundary (overloaded with DDD's bounded context).

**Adapter** — a concrete thing that satisfies an interface at a seam. Describes *role* (what slot it fills), not substance (what's inside).

**Leverage** — what callers get from depth: more capability per unit of interface they learn. One implementation pays back across N call sites and M tests.

**Locality** — what maintainers get from depth: change, bugs, knowledge, and verification concentrate in one place rather than spreading across callers. Fix once, fixed everywhere.

## Deep vs shallow

**Deep module** = small interface + lots of implementation:

```
┌─────────────────────┐
│   Small Interface   │  ← Few methods, simple params
├─────────────────────┤
│                     │
│  Deep Implementation│  ← Complex logic hidden
│                     │
└─────────────────────┘
```

**Shallow module** = large interface + little implementation (avoid):

```
┌─────────────────────────────────┐
│       Large Interface           │  ← Many methods, complex params
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through
└─────────────────────────────────┘
```

When designing an interface, ask:

- Can I reduce the number of methods?
- Can I simplify the parameters?
- Can I hide more complexity inside?

## Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, mockable, swappable parts — they just aren't part of the interface. A module can have **internal seams** (private to its implementation, used by its own tests) as well as the **external seam** at its interface.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. If you want to test *past* the interface, the module is probably the wrong shape.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a seam unless something actually varies across it.

## Designing for testability

Good interfaces make testing natural:

1. **Accept dependencies, don't create them.**

   ```typescript
   // Testable
   function processOrder(order, paymentGateway) {}

   // Hard to test
   function processOrder(order) {
     const gateway = new StripeGateway();
   }
   ```

2. **Return results, don't produce side effects.**

   ```typescript
   // Testable
   function calculateDiscount(cart): Discount {}

   // Hard to test
   function applyDiscount(cart): void {
     cart.total -= discount;
   }
   ```

3. **Small surface area.** Fewer methods = fewer tests needed. Fewer params = simpler test setup.

## Relationships

- A **Module** has exactly one **Interface** (the surface it presents to callers and tests).
- **Depth** is a property of a **Module**, measured against its **Interface**.
- A **Seam** is where a **Module**'s **Interface** lives.
- An **Adapter** sits at a **Seam** and satisfies the **Interface**.
- **Depth** produces **Leverage** for callers and **Locality** for maintainers.

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines** (Ousterhout): rewards padding the implementation. We use depth-as-leverage instead.
- **"Interface" as the TypeScript `interface` keyword or a class's public methods**: too narrow — interface here includes every fact a caller must know.
- **"Boundary"**: overloaded with DDD's bounded context. Say **seam** or **interface**.

## Going deeper

- **Deepening a cluster given its dependencies** — see [DEEPENING.md](DEEPENING.md): dependency categories, seam discipline, and replace-don't-layer testing.
- **Exploring alternative interfaces** — see [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md): generate frozen, materially different alternatives using isolated workers when available or a disciplined inline-sequential mode, then compare depth, locality, and seam placement.

## Delivery proof for a chosen design

When the design will drive implementation, record current owner, proposed owner,
caller and compatibility impact, migration/rollback, representative test seam,
and the runtime or maintenance evidence that would prove better locality and
leverage. A cleaner diagram alone does not prove a deeper module.
