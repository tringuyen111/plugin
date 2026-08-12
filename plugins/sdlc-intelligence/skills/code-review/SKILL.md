---
name: code-review
description: Review one immutable change surface along separate Standards and Spec axes, using isolated workers when available or frozen sequential notes otherwise. Use for a branch, PR, provided diff, patch, or work-in-progress change that needs source-grounded review without claiming QA or release readiness.
---


<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->
Two-axis review of one immutable change surface:

- **Standards** — does the change conform to documented repository standards?
- **Spec** — does the change faithfully implement the authoritative approved intent governing the change: requirement/spec/AC and, when applicable, an approved technical delivery spec or linked accepted ADR/design-contract/technical-task invariant?

Declare one execution mode before reviewing:

- `ISOLATED_PARALLEL` — two context-isolated workers inspect the same frozen change surface concurrently.
- `ISOLATED_SEQUENTIAL` — context-isolated workers inspect the same frozen change surface one after another.
- `INLINE_SEQUENTIAL` — one model/context completes Standards first and freezes that report before the Spec-axis pass. This mode is ordered but **does not provide context isolation**; Spec information may already be present in the conversation or source context, so do not claim independent or contamination-free axes.

Only the `ISOLATED_*` modes may claim context isolation, and only when the host actually provides it. All modes preserve separate frozen axis outputs and never rerank one axis from the other.

This is always a review-only workflow. If the user asks to "review and fix",
freeze and complete this review first, hand approved corrections to `/implement`,
then capture a **new frozen** change surface after implementation and run a new
code-review revision. This workflow never edits the source it is reviewing and
does not claim runtime QA, visual acceptance, UAT, or release readiness.

## Process

### 1. Freeze the change surface

Use one immutable review input:

- a provided diff or patch;
- a provider-resolved pull/merge request diff; or
- a source-control comparison against a fixed point such as a commit, branch, tag, or merge-base.

Prefer the provided diff when the user supplied one. Resolve source-control capability before running repository commands. When Git is available and the user supplied a fixed point, capture `git diff <fixed-point>...HEAD` and `git log <fixed-point>..HEAD --oneline` once, then review that frozen output. A missing fixed point, unresolved ref, unavailable diff, or empty change surface is `BLOCKED`; do not let either axis infer a different change.

### 2. Classify Spec applicability and resolve its source

Declare the Spec axis as exactly one of:

- `REQUIRED` — the declared review question requires fidelity to an approved requirement/spec.
- `APPLICABLE` — an authoritative spec exists and the declared review scope includes Spec fidelity.
- `NOT_APPLICABLE` — the declared scope is Standards-only or no approved spec governs this change.

Resolve an applicable/required source in this order:

1. A spec, requirement, acceptance criteria, technical delivery spec, or work-item reference supplied by the user.
2. The canonical work item resolved through the project's configured tracker capability, including its current approved links.
3. A project-authorized approved implementation artifact linked from the change or branch metadata, including an applicable technical delivery spec or accepted ADR/design contract/technical-task invariant.

For this workflow, **Spec-axis** authority means approved governing implementation intent, not only Product/BA prose. Admit approved governing technical truth only when the artifact is current, applicable to the frozen change, and already authoritative for implementation. A technical finding must name the governing artifact/revision and invariant or constraint plus the realistic changed execution path. Code review does not create or approve technical design: a missing, stale, conflicting, or materially changed technical decision routes to Architecture or the project's canonical technical owner. Source-level conformance evidence also does not prove runtime acceptance; QA owns runtime/risk verification.

For `INLINE_SEQUENTIAL`, resolve identity/availability before Standards when needed, but defer loading additional Spec contents until after the Standards report is frozen when the runtime permits it. This reduces avoidable contamination but does not make the mode context-isolated.

If no authoritative spec exists and the declared scope is Standards-only, mark the Spec axis `NOT_APPLICABLE`; do not invent requirements or assume a tracker/file location. If Spec is `REQUIRED` but cannot be located, a bounded Standards result may still be useful, but the whole requested review is not `READY`. If a located spec is stale or conflicting, preserve the conflict and route it to the canonical requirement owner rather than selecting a convenient version.

### 3. Identify the standards sources

Anything in the repo that documents how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** below — a fixed set of Fowler code smells (_Refactoring_, ch.3) that applies even when a repo documents nothing. Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation — and, like any standard here, skip anything tooling already enforces.

Each smell reads *what it is* → *how to fix*; match it against the diff:

- **Mysterious Name** — a function, variable, or type whose name doesn't reveal what it does or holds. → rename it; if no honest name comes, the design's murky.
- **Duplicated Code** — the same logic shape appears in more than one hunk or file in the change. → extract the shared shape, call it from both.
- **Feature Envy** — a method that reaches into another object's data more than its own. → move the method onto the data it envies.
- **Data Clumps** — the same few fields or params keep travelling together (a type wanting to be born). → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive or string standing in for a domain concept that deserves its own type. → give the concept its own small type.
- **Repeated Switches** — the same `switch`/`if`-cascade on the same type recurs across the change. → replace with polymorphism, or one map both sites share.
- **Shotgun Surgery** — one logical change forces scattered edits across many files in the diff. → gather what changes together into one module.
- **Divergent Change** — one file or module is edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters, or hooks added for needs the spec doesn't have. → delete it; inline back until a real need shows.
- **Message Chains** — long `a.b().c().d()` navigation the caller shouldn't depend on. → hide the walk behind one method on the first object.
- **Middle Man** — a class or function that mostly just delegates onward. → cut it, call the real target direct.
- **Refused Bequest** — a subclass or implementer that ignores or overrides most of what it inherits. → drop the inheritance, use composition.

### 3.5 Map evidence-relevant surfaces

Read the changed hunks and enough related source to judge the change rather than
syntax in isolation:

- direct callers and public interfaces;
- affected tests and fixtures;
- runtime entrypoint, configuration, migration, or generated artifact when the
  diff changes them;
- approved AC/NFR, Visual Contract, technical delivery spec, ADR/design contract,
  or technical task referenced by the work item.

Do not turn review into a full implementation loop. Run a targeted command only
when it is needed to verify a concrete finding. Declare runtime, visual, data,
and environment surfaces that were not reviewed.

### Finding contract

A blocking or warning finding must include:

```text
Location
Axis: Standards | Spec
Rule, requirement, or invariant
Realistic execution path / trigger
Observed impact
Evidence or reproduction command
Smallest coherent correction
Confidence
```

Do not block on taste, a hypothetical path with no trigger, or a smell already
accepted by a documented repository decision. Baseline smells remain labelled
judgement calls.

### 4. Execute the two axes in the declared mode

Prepare two complete briefs from the same frozen change surface and evidence map.

**Standards brief** — include:

- the frozen diff or patch and commit list when available;
- standards-source material plus the smell baseline from step 3;
- the finding contract;
- the instruction to report documented-standard breaches separately from labelled smell judgements, with realistic trigger and impact.

**Spec brief** — include:

- the same frozen diff or patch;
- the authoritative Spec-axis contents or resolved artifacts, including applicable approved governing technical truth;
- the finding contract;
- the instruction to report missing/partial requirements, unrequested behavior, incorrect implementations, and source-level violations of applicable approved technical invariants with cited governing evidence.

Execute according to the declared mode. In `INLINE_SEQUENTIAL`, complete and freeze the Standards report before starting the Spec-axis pass; do not alter the first report after the second axis begins. Treat this as ordered frozen notes, not context isolation. Run the Spec axis only when `APPLICABLE` or `REQUIRED` and an authoritative source is available; record `NOT_APPLICABLE`, missing, stale, or conflicting truth explicitly instead of inventing a brief.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings. Preserve frozen findings; only normalize formatting. Do **not** merge or rerank findings — the two axes are deliberately separate (see _Why two axes_).

Add `## Evidence limitations` naming unreviewed runtime paths, environments,
visual/data surfaces, missing specs, and commands not run.

End with a one-line summary: total findings per axis, and the worst issue _within each axis_ (if any). Don't pick a single winner across axes — that's the reranking the separation exists to prevent. A clean review means no grounded finding in the reviewed scope, not QA PASS.

## Why two axes

A change can pass one axis and fail the other:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the issue asked but breaks the project's conventions → **Spec pass, Standards fail.**

Reporting them separately stops one axis from masking the other.


## Completion

- `READY` — one frozen change surface was reviewed, the Standards axis is complete, every `APPLICABLE`/`REQUIRED` Spec axis with an available authoritative source is complete, or the Spec axis is explicitly `NOT_APPLICABLE`; findings and unreviewed runtime/visual/data/environment limits are explicit. A Standards-only review may therefore be `READY` when that is the declared scope.
- `PARTIAL` — a useful bounded Standards result exists but a `REQUIRED` Spec is missing/stale/conflicting, or another material review/evidence surface remains incomplete.
- `BLOCKED` — the fixed change surface cannot be resolved, or the declared review question fundamentally requires Spec evidence/owner resolution and no useful bounded review can proceed safely. Missing repository-specific standards alone is not blocking; label that absence and use only the smell baseline as heuristic guidance.
- `FAILED` — a required inspection or review artifact could not be produced truthfully.

A clean review is not QA PASS, UAT acceptance, or release readiness.
