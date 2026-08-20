---
name: code-review
description: Review one immutable change surface through separate Code and Spec passes. Use for a branch, PR, provided diff, patch, or work-in-progress change that needs source-grounded correctness, scoped standards, and approved-intent findings without claiming implementation, QA, merge, or release authority.
---

## Runtime context

Freeze one exact review surface, read the project-native governing standards/spec sources that actually apply, and use live repository/runtime tools only when they can prove or falsify a concrete review claim. Review is read-only: tool availability is not merge/release authority, and the Skill does not need a Plugin-global workflow/profile record to report findings truthfully.


Review exactly one immutable change surface through two primary passes:

- **Code** — is the changed source correct on realistic affected paths, and does it conform to the standards that actually govern those paths?
- **Spec** — does the same frozen change faithfully implement the authoritative approved intent governing it: requirement/spec/AC and, when applicable, an approved technical delivery spec or linked accepted ADR/design-contract/technical-task invariant?

The Code pass contains two ordered sub-sweeps: **Correctness first, then Standards/maintainability**. Keep findings frozen and labelled by `Kind` so lower-consequence standards observations cannot hide correctness defects.

Declare one execution mode before reviewing:

- `ISOLATED_PARALLEL` — a context-isolated Code worker and Spec worker inspect the same frozen change concurrently; the Code worker still performs Correctness before Standards.
- `ISOLATED_SEQUENTIAL` — context-isolated Code and Spec workers inspect the same frozen change one after another.
- `INLINE_SEQUENTIAL` — one model/context completes and freezes the Code report before the Spec pass. This is ordered but **not context-isolated**; do not claim independent or contamination-free passes.

Only `ISOLATED_*` modes may claim context isolation, and only when the host actually provides it. All modes preserve separate frozen Code and Spec outputs and never rewrite one pass after learning the other pass's findings.

This is always review-only. If the user asks to **review and fix**, freeze and complete the current review first, then perform the authorized implementation as a separate mutation step (using `implement` when useful/available), capture a **new frozen revision**, and run a new code review. Never edit the source under review. Static source review does not claim runtime reproduction, QA/visual acceptance, UAT, merge approval, or release readiness.

## Review truth gates — always active

Apply these gates before trusting a clean diff, green suite, configured tool, fixture, generated artifact, or historical behavior. They are completion controls, not optional test-review advice.

### 1. Authority gate — existing artifacts are evidence, not equal truth

Bind authority, applicability, and freshness before using a requirement, test, fixture, generated contract, config, comment, or current implementation as the expected behavior. A passing historical test does not make old behavior canonical; a failing historical test does not automatically make the new source wrong.

When changed behavior conflicts with existing tests or generated artifacts, determine whether the artifact still protects a valid invariant, encodes superseded behavior, has a weak/false oracle, is stale against a stronger current contract, or remains unresolved because no stronger authority is available. Review may recommend `PRESERVE`, `UPDATE`, `REPLACE`, or `DELETE` for a test as correction direction, but it does not perform the mutation. Never recommend production fallback/compatibility behavior solely to keep a stale test green.

### 2. Evidence-strength gate — bind every proof to the seam it exercised

Do not collapse these states:

```text
DESCRIBED / CONFIGURED
!= IMPLEMENTED
!= EXECUTED ON THE FROZEN REVISION
!= OBSERVED AT THE MATERIAL SEAM
!= SUFFICIENT TO PROVE THE CLAIM
```

A mock/fake/fixture, static analyzer, unit test, integration test, screenshot, or CI job proves only the mechanism, environment, oracle, path, and exact revision actually exercised. A described E2E scenario is not E2E execution. A configured tool is not a bound result. A real request with a weak oracle can still fail to prove the claimed invariant. Do not suppress a grounded concern with stronger wording than the evidence supports.

If a claim is runtime-only, preserve the source-level finding/evidence limit and leave reproduction/acceptance to the applicable runtime or QA owner.

### 3. Generalization gate — reject fixture-shaped production semantics

Challenge branches, constants, selectors, IDs, names, ordering, payload shapes, and defaults that exist only because the reviewed tests/examples use those particulars. Ask what semantic rule makes the special case valid and whether another valid instance of the same class would behave correctly. If no domain/contract meaning supports the distinction, treat green example-based tests as possible overfit rather than proof.

Synthetic data is legitimate evidence only for the isolated/demo/test seam it actually represents. It cannot make a broken production integration appear correct unless synthetic behavior is itself an approved production mode.

### 4. Single-active-truth gate — challenge hidden legacy survival

Trace old/new owners, fallbacks, compatibility branches, defaults, generated consumers, and alternate enforcers when a change replaces behavior or moves authority. A fallback kept only because the replacement is unproved, or a legacy branch retained only for historical tests/fixtures, is not defensive correctness; it is competing active truth unless a named compatibility/resilience obligation requires coexistence.

A material unresolved conflict in authority, proof strength, generalization, or active-truth ownership prevents a **clean/full-coverage review claim** for that area. Keep it `UNRESOLVED`/`PARTIAL` when evidence cannot decide. The review workflow may still be `READY` with grounded `BLOCKING` findings; `READY` never upgrades weak evidence or competing truth into correctness.

## Process

### 1. Freeze the change surface

Use one immutable review input:

- a provided diff or patch;
- a provider-resolved pull/merge request diff; or
- a source-control comparison against a fixed point such as a commit, branch, tag, or merge-base.

Prefer a user-provided diff. Inspect the live source-control capability directly. When Git is available and the user supplied a fixed point, capture `git diff <fixed-point>...HEAD` and `git log <fixed-point>..HEAD --oneline` once, then review that frozen output. A missing fixed point, unresolved ref, unavailable diff, or empty change surface is `BLOCKED`; do not let either pass infer a different change.

Record what the frozen surface can and cannot prove. Source inspection may support a source-level defect claim; a runtime-only failure requires a representative runtime probe owned by the applicable implementation/QA workflow before it can be called reproduced or accepted.

### 2. Classify Spec applicability and resolve its source

Declare the Spec pass as exactly one of:

- `REQUIRED` — the declared review question requires fidelity to an approved requirement/spec.
- `APPLICABLE` — authoritative governing intent exists and the declared scope includes Spec fidelity.
- `NOT_APPLICABLE` — no approved governing intent is available or the declared review scope is Code-only.

Resolve an applicable/required source in this order:

1. A spec, requirement, acceptance criteria, technical delivery spec, or work-item reference supplied by the user.
2. The canonical work item resolved through the project's configured tracker capability, including its current approved links.
3. A project-authorized approved implementation artifact linked from the change or branch metadata, including an applicable technical delivery spec or accepted ADR/design contract/technical-task invariant.

Spec authority means approved governing implementation intent, not only Product/BA prose. Admit technical truth only when it is current, applicable to the frozen change, and already authoritative for implementation. Code review does not create or approve technical design: a missing, stale, conflicting, or materially changed technical decision routes to Architecture or the project's canonical technical owner.

For `INLINE_SEQUENTIAL`, resolve Spec identity/availability before Code only when needed, and defer loading extra Spec contents until the Code report is frozen when the runtime permits it. If Spec is `REQUIRED` but missing/stale/conflicting, a bounded Code result may remain useful but the whole requested review cannot be `READY`.

### 3. Reconstruct the changed system behavior

Read the changed hunks and enough surrounding source to identify the **semantic change** before distributing attention across files. For any non-trivial behavior/state/contract/ownership change, read [System Change Reasoning](references/system-change-reasoning.md) and reconstruct only the bounded model needed to expose:

- the E2E path from trigger to observable outcome;
- material happy, edge/state, failure/partial-progress, concurrency/order, and recovery branches supported by the mechanism;
- changed state authority and invariants;
- a semantic impact/ownership graph covering concrete callers, readers/writers, enforcers/policy owners, persistence/cache invalidators, consumers/contracts, recovery paths, and sibling implementations/fallbacks/defaults;
- existing semantic owners that may make the new logic redundant, or superficially similar code that must remain separate because lifecycle/failure semantics differ;
- the risky seams/changed assumptions that determine which expert lenses need depth.

For a genuinely mechanical change that preserves behavior and ownership, record the evidence and keep this model shallow. Search outside the diff only along concrete semantic edges; do not turn review into an unbounded repository audit.

Run a targeted command only when needed to confirm or falsify a concrete review hypothesis. Declare runtime, visual, data, provider, and environment surfaces not actually inspected.

### 4. Build the coverage ledger and select risk lenses

After behavioral/ownership reconstruction has identified the risk seams, read [Coverage and Risk Selection](references/coverage-and-risk-selection.md). Use the ledger as a **completeness backstop**, not as the mechanism that decides where review depth belongs. Account for every material changed unit and discovered cross-cutting edge as exactly one of:

```text
REVIEWED
NOT_MATERIAL(reason)
UNRESOLVED(reason)
```

Do not silently skip a material unit. A material `UNRESOLVED` item is an evidence/qualification limitation and prevents a full-coverage claim. For a large change, chunk by coherent execution/contract boundaries and reconcile cross-chunk edges; reviewing only selected hotspots must be reported as bounded coverage, not as a complete review.

Select expert lenses from the **mechanism, invariant, and risky seam actually changed**, not from filenames or generic technology expectations. Load only the lenses that are material:

- caller-visible API/retry/pagination/compatibility -> [API Review](references/api-review.md)
- transaction/queue/job/redelivery/async/cancel/timeout -> [Backend and Async Review](references/backend-async-review.md)
- persistence/concurrent writers/schema/migration/backfill -> [Data and Migration Review](references/data-migration-review.md)
- trust/authn/authz/tenant/untrusted input/secrets/replay -> [Security Review](references/security-review.md)
- browser/UI state/focus/keyboard/SSR-client/network state -> [Frontend Review](references/frontend-review.md)
- changed/missing tests or review claims that rely on test evidence -> [Test Quality Review](references/test-quality-review.md)
- fan-out/repeated I/O/resource lifetime/contention/scale-sensitive work -> [Performance and Resource Review](references/performance-resource-review.md)

Multiple lenses may apply to one unit. Framework/provider-specific branches activate only when inspected project/runtime evidence proves that mechanism applies. If the reviewer lacks material context/qualification for an activated lens, mark the affected ledger item `UNRESOLVED`, name the missing evidence/owner, and keep the review `PARTIAL` rather than treating that area as clean.

### 5. Code pass — Correctness first

A `Correctness` finding is eligible only when all material predicates hold:

1. **Discrete and actionable** — one identifiable defect or regression can be corrected.
2. **Change-bound** — the frozen change introduced the defect or materially exposed a previously dormant path; a merely pre-existing defect is not a change finding.
3. **Realistic path** — identify the caller/input/state/environment needed for the defect to occur and the affected code or system path.
4. **Source-grounded impact** — explain the consequence from inspected evidence; do not upgrade static suspicion into runtime reproduction.
5. **Not merely intentional difference** — do not call an explicitly approved behavior change a correctness bug because it differs from the old behavior.

Correctness does **not** require a repository Rule field. It may derive from the changed source and its realistic execution semantics. Reject hypothetical affected modules with no concrete path, generic "could break" claims, and unrelated pre-existing defects as Code findings.

When a correctness question depends on an unresolved module/interface/seam decision, record the concrete review evidence and route that decision to `codebase-design`; do not choose the Architecture answer inside review.

### 6. Apply the selected expert risk lenses

After the general Correctness sweep, apply every lens selected from the reconstructed risk seams and reconciled through the coverage ledger to the exact material units/edges that activated it. Use each lens to expose mechanism-specific failure paths and proof boundaries; do not turn a lens into a generic checklist over unrelated code.

A lens concern becomes a finding only when it still satisfies the normal finding contract: change-bound cause, realistic affected path/trigger, source/evidence-grounded impact, and an actionable correction direction. A lens may instead produce `UNRESOLVED` coverage when the needed runtime/project authority is unavailable.

Do not import implementation authority from neighboring engineering Skills. These local references are review-only failure models. Concrete fixes remain `/implement`; material seams remain `codebase-design`; unknown root-cause diagnosis remains `/diagnosing-bugs`; runtime/risk acceptance remains `/verify-quality`.

### 7. Code pass — resolve scoped Standards and maintainability

Resolve standards for each changed path by authority and applicability, not by a flat global checklist:

1. explicit user/project rules that govern the review scope;
2. applicable path-scoped repository instructions or standards;
3. broader current repository standards such as `CONTRIBUTING.md` or coding conventions;
4. generic maintainability signals only when no stronger applicable rule resolves the question.

A more specific applicable rule overrides a broader one. When two current authoritative rules conflict and scope/specificity cannot resolve them, preserve the conflict and keep the affected judgment unresolved; do not select the convenient rule.

Generic maintainability concepts are **signals, not repository law**. Use signals such as unclear naming, duplicated logic, excessive coupling, shotgun change, speculative abstraction, message chains, middle-man behavior, or awkward inheritance to ask:

```text
signal -> inspected evidence -> maintenance consequence -> correction direction
```

For duplication/reuse, reason from semantic ownership rather than syntax. Two implementations that enforce the same policy/default/invariant may be competing active truths even when their code differs; conversely, similar loops may need separate owners when lifecycle and failure semantics differ. Use [System Change Reasoning](references/system-change-reasoning.md) when this distinction is material.

Do not jump from a smell name to a mandatory refactor recipe. Several corrections may be valid. If deciding the correction requires a material module/interface/seam choice, return that decision to `codebase-design`.

#### Tool evidence gate

Do not suppress a Code finding because a linter/static analyzer/test is merely configured, remembered, or expected to cover it. Mark a duplicate `TOOL_COVERED` only when inspected evidence binds all of:

```text
tool mechanism + applicable config + changed path + exact frozen revision/result + same defect/rule class
```

If any binding is missing, keep the human review judgment and state the tool evidence gap. Tool output does not prove runtime behavior outside the mechanism it actually exercised.

### 8. Finding contract and consequence severity

Every grounded finding records:

```text
Location
Pass: Code | Spec | Cross-check
Kind: Correctness | Standards | Spec | Consistency
Severity: BLOCKING | IMPORTANT | ADVISORY
Governing rule/requirement/invariant when one exists
Realistic execution path / trigger
Observed or source-grounded impact
Evidence / command and its proof boundary
Correction direction
Confidence
Tool coverage when material
```

Use consequence severity independently from confidence:

- `BLOCKING` — a grounded defect materially threatens correctness, security/integrity, supported compatibility, or required governing behavior and should be remediated before downstream acceptance of this revision.
- `IMPORTANT` — a grounded issue materially worsens maintainability, performance, testability, operability, or non-critical contract quality and deserves planned correction/disposition.
- `ADVISORY` — a bounded improvement or low-consequence maintainability observation that should not masquerade as a required defect fix.

Severity describes remediation obligation inside review. It is **not** merge approval, QA verdict, UAT acceptance, release readiness, or deployment authority. A review workflow may complete `READY` while reporting `BLOCKING` findings because workflow completion and change quality are separate state axes.

### 9. Execute Code and Spec in the declared mode

Prepare both briefs from the same frozen change and evidence map.

**Code brief** includes:

- the frozen diff/patch and commit list when available;
- the bounded semantic-change/E2E/state-invariant/ownership model and evidence map;
- the coverage ledger, discovered cross-cutting edges, selected lenses, and unresolved qualification/context;
- Correctness eligibility and finding contract;
- scoped standards sources and unresolved conflicts;
- tool evidence actually bound to the frozen revision/path;
- the instruction to run **Correctness -> selected risk lenses -> Standards** and freeze findings by `Kind`.

**Spec brief** includes:

- the same frozen diff/patch;
- authoritative governing intent or its missing/stale/conflicting state;
- the finding contract;
- the instruction to report missing/partial requirements, unrequested behavior, incorrect implementations, and source-level violations of applicable approved technical invariants with cited governing evidence.

Execute according to the declared mode. In `INLINE_SEQUENTIAL`, freeze the complete Code report before the Spec pass and never rewrite it from Spec findings. Run Spec only when `APPLICABLE`/`REQUIRED` and its authoritative source is available; record missing/stale/conflicting truth instead of inventing a brief.

### 10. Cross-check material truth without contaminating the frozen passes

After Code and Spec outputs are frozen, compare the material behavioral/ownership claims discovered during review across authoritative spec/ADR/policy, descriptive docs/runbooks/comments, code/config/schema, and tests/fixtures/generated contracts. Use [System Change Reasoning](references/system-change-reasoning.md) for the authority/freshness and duplicate-truth method.

Do not treat every source as equal authority and do not rewrite either frozen primary pass. A newly discovered contradiction is a provenance-labelled `Cross-check/Consistency` finding only when it is change-bound or materially exposed by the frozen change and has a concrete affected behavior/owner. Classify the conflict direction when evidence supports it: source defect, stale documentation, false test oracle, config/schema mismatch, duplicate active truth, or unresolved design/authority question. Route material seam/design choices to `codebase-design`.

### 11. Aggregate without stealing downstream authority

Present frozen results as:

```markdown
## Coverage

## Code
### Correctness
### Standards

## Spec

## Cross-consistency

## Evidence limitations
```

Keep Coverage concise but truthful: identify reviewed material units/edges, explicit `NOT_MATERIAL` exclusions, activated lenses, and any `UNRESOLVED` area. Do not expose a giant internal checklist when a bounded coverage summary is enough.

Preserve frozen Code/Spec findings; normalize presentation only. Cross-consistency is a later synthesis with explicit provenance and must not silently reclassify either primary pass. Do not merge or rerank Code versus Spec into one universal score. Within Code, keep `Kind` visible so advisory standards observations cannot mask correctness defects.

State counts and worst consequence **within each primary pass**, plus material Cross-consistency findings, evidence limitations, and unresolved owner gaps. A clean review means no grounded finding in the reviewed source scope; it is not QA PASS or a merge/release verdict.

If remediation is authorized and still part of the active user outcome, the same capable session may continue through `/implement` without a handoff artifact. Freeze the review result first: any source mutation invalidates the reviewed revision and re-review must bind the new exact revision. Independent QA/runtime verification is a distinct claim; activate `/verify-quality` or a specialist only when the requested outcome, risk, or policy makes that proof material.

## Why Code + Spec

The two passes answer different failure questions:

- Source can be locally incorrect even when no documented standard or governing Spec names the defect -> **Code/Correctness** must still catch it.
- Source can be correct and well-maintained but implement the wrong approved behavior -> **Code pass, Spec fail**.
- Source can implement the approved behavior but violate applicable project/path standards -> **Spec pass, Code/Standards fail**.

Keeping Code and Spec separate prevents governing intent from masking source defects and prevents style/maintainability observations from being confused with correctness.

## Completion

- `READY` — one frozen change was fully reviewed through the Code pass; every material assigned change unit/discovered cross-cutting edge is accounted for with no material `UNRESOLVED` coverage; every activated risk lens was applied; every `APPLICABLE`/`REQUIRED` Spec pass with available authoritative source was completed or Spec was explicitly `NOT_APPLICABLE`; the always-active authority/evidence/generalization/active-truth gates were satisfied or produced explicit grounded findings; material truth conflicts discovered by the bounded cross-check are visible; all grounded findings/evidence limitations are visible; and owner boundaries are preserved. `READY` may coexist with `BLOCKING` findings; it means the review workflow completed, not that the change is accepted or that tests/tools proved more than their bound seam.
- `PARTIAL` — a useful bounded Code result exists but a material coverage/lens item is `UNRESOLVED`, a truth-gate conflict remains materially undecidable, the reviewer lacks material context/qualification, a `REQUIRED` Spec is missing/stale/conflicting, an authoritative standards conflict blocks a material judgment, or another declared material review/evidence surface remains incomplete.
- `BLOCKED` — the frozen change cannot be resolved, or the declared review question fundamentally requires unavailable owner/source evidence and no useful bounded review can proceed safely.
- `FAILED` — a required inspection or review artifact could not be produced truthfully.

A clean review is not implementation completion, QA PASS, UAT acceptance, merge approval, or release readiness.
