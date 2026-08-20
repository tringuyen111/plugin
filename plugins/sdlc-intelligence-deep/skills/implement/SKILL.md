---
name: implement
description: Implement a clear feature, fix, refactor, configuration, or integration change in a real codebase when Product, behavior, design, and policy truth are fixed enough to code. Bind the real source/runtime path, use the smallest coherent mechanism, iterate on execution feedback, and prove behavior at the consumed seam.
---

# Implement

Implement the requested Engineering change against **bound project truth and the real consumed seam**. Do not fill gaps in the current system with a plausible imagined feature, API, data shape, ownership rule, or runtime path. Imagination is valid only inside an explicitly authorized open implementation/design space, and it remains a proposal until materialized and proved.

## Reality contract — always active

These gates control progress and `READY`. They are not advisory review notes. Keep the working model honest with four states:

```text
FACT       directly supported by the bound project/source/runtime evidence
INFERENCE  derived from bound facts and still falsifiable
PROPOSAL   an authorized choice for open design/implementation space
UNKNOWN    material current truth not yet bound
```

Do not create a permanent ledger unless the project needs one; preserve these distinctions in working context. If new evidence contradicts a material fact/inference, invalidate dependent reasoning and re-enter at the earliest broken binding or mechanism assumption.

### 1. Bind before infer

For an **existing feature/system**, inspect enough relevant current truth before materially reasoning about or mutating it:

- the requested/approved behavior and repository/workspace rules;
- the actual target source and the smallest production path that reaches the behavior;
- decision-changing providers, consumers, state/persistence, registration/config/generated surfaces, contracts, and existing tests/proof;
- runtime/consumed output when the claim depends on runtime rather than source shape alone.

Trace relevance, not folders. Stop expanding context when more reading cannot materially change the implementation decision or proof. One representative production path is better than a ritual repository scan.

Do not infer current behavior from model memory, framework convention, summaries, handoffs, filenames, nearby code, or documentation alone when inspectable project truth can resolve it. If a current-state detail remains material and unbound, keep it `UNKNOWN`; do not silently convert it into an implementation assumption.

For **greenfield or explicitly generative scope**, nonexistent current implementation is not a blocker. Bind the constraints that do exist, then reason in `PROPOSAL` space. Do not invent unrelated current capabilities such as backend support, permissions, contracts, or data merely because they would make the proposal convenient.

### 2. Separate authority from current state

Current approved Product/behavior/design/policy/technical truth defines what **should** be correct. Source/runtime/configuration establish what the candidate **currently does**. Tests, snapshots, fixtures, generated outputs, docs, and legacy behavior are evidence with scope; none becomes canonical merely because it exists.

When authoritative intent and current implementation disagree, preserve the disagreement until it is resolved; do not silently redefine Product truth from code or force code to match stale documentation. When an affected existing test disagrees with current authoritative truth, classify it before changing production behavior:

| Disposition | Use when |
|---|---|
| `PRESERVE` | it still proves a valid invariant/contract |
| `UPDATE` | the invariant remains valid but interface, data shape, or oracle changed |
| `REPLACE` | the old test exercises the wrong mechanism/boundary or weaker proof |
| `DELETE` | it encodes superseded behavior, obsolete implementation detail, or redundant/invalid proof |

Never add compatibility branches, fixture-specific behavior, hidden fallbacks, or retain superseded production logic solely to keep a stale test green. If no stronger truth exists and a test may encode a real contract, investigate that contract before changing either code or test; age alone does not make a test stale.

### 3. Bind real boundaries; never substitute synthetic truth

When the implementation claim depends on a real API, database, provider, filesystem, browser/runtime registration, generated surface, durable state, or other production boundary, prove that boundary at the real consumed seam.

A real-boundary failure is implementation evidence to diagnose and re-enter; it is **not permission to manufacture success with synthetic data**. Mocks, fixtures, stubs, Storybook/static renders, fake providers, and test harnesses may prove isolated seams, but they must not silently replace a failed required dependency, count as proof of that dependency, or make an integrated feature appear complete while the production path is broken.

Synthetic behavior is valid when it is itself approved Product truth, such as an explicit demo/offline mode. Keep the selector and proof scope explicit: proving the synthetic mode does not prove the real online/integration path.

### 4. Implement the semantic mechanism, not the fixture

Production logic must generalize across the valid semantic class. Challenge irrelevant particulars that could make a test green—IDs, names, ordering, counts, timestamps, captured payloads, or one sample response—and perturb them or add another representative instance when needed. Hardcode a literal only when that literal has real domain/configuration semantics.

Migrate affected tests with the behavior using `PRESERVE | UPDATE | REPLACE | DELETE`; do not weaken an oracle or preserve old behavior to manufacture an all-green historical suite. Keep unrelated baseline failures separate.

### 5. Bind proof strength and re-enter on contradiction

Keep proof states distinct:

```text
SPECIFIED -> IMPLEMENTED -> EXECUTED -> OBSERVED -> PASS / FAIL
```

A Markdown scenario is not executed E2E evidence. An implemented test that never ran is `NOT_RUN`. A real request with an insufficient oracle does not prove a stronger claim. `E2E` requires actual execution across the boundaries named by that claim.

If a material current truth remains `UNKNOWN`, a required real seam remains unproved, or observed evidence contradicts the working model, the implementation cannot be `READY`. Re-bind/replan instead of layering a workaround over a false model.

## Conditional context

- **WHEN** the codebase is unfamiliar, the production path/ownership/convention is not yet bound, or local patterns can change the mechanism **READ** [Codebase Assimilation](references/codebase-assimilation.md) **BEFORE** choosing the patch shape.
- **WHEN** the change crosses old/new readers or writers, generated/config/registration surfaces, independently updated consumers, durable representation, feature-selected paths, or another cutover edge **READ** [Change Topology and Cutover](references/change-topology-and-cutover.md) **TO** sequence a coherent migration without permanent duplicate truth.
- **WHEN** correctness depends on a version-sensitive framework/library/SDK/tool/provider API that current project source does not establish **READ** [Dependency API Truth](references/dependency-api-truth.md) **BEFORE** dependent mutation.
- **WHEN** two or more engineering dimensions can materially change the same bounded implementation, or a broad change has no single domain proof boundary **READ** [Multi-specialist Composition](references/multi-specialist-composition.md) **TO** collect bounded specialist depth, reconcile overlapping semantics/conflicts, fan in shared mutation decisions, and integrate proof without inventing a scheduler.

Load `/frontend-engineering`, `/backend-engineering`, `/api-engineering`, `/data-persistence-engineering`, `/security-engineering`, `/tdd`, `/diagnosing-bugs`, `/codebase-design`, or another installed specialist only when its procedural depth can change the implementation. When this Skill remains the primary implementation job, use co-loaded specialists as bounded supporting depth rather than independent scope/mutation/completion owners; direct specialist invocation remains standalone outside this composition.

Do not spend coding context on a permanent owner graph, route registry, semantic ledger, or capability-profile ceremony unless a real external consumer requires it. Use graphs only when ownership/dependency/topology edges materially change reasoning; they do not enforce the reality contract above.

## Entry gate

Proceed when the requested technical outcome is clear enough to implement without inventing missing Product behavior, UX/visual meaning, architecture authority, data meaning, security policy, or another external decision.

A ticket, Product packet, tracker, delivery graph, or prior lifecycle artifact is not required merely to code. Use one when it exists and materially constrains the change. If an unresolved external truth can materially change the implementation, stop only that affected scope and name the exact gap.

## Coding loop

1. **Bind.** Read the actual request/rules and bind the smallest decision-relevant current truth: target source, governing contract/docs, production path, relevant providers/consumers/state/registration, existing tests/proof, and runtime/configuration where material. Mark `FACT | INFERENCE | PROPOSAL | UNKNOWN`; do not proceed on an imagined current-state detail.
2. **Define the falsifiable change.** State what should change, what must remain stable, which invariants survive, which parts are authorized open implementation space, and the smallest consumed seam that could falsify the claim. Record/reproduce a baseline when it distinguishes the change from unrelated failures.
3. **Compose decision-changing depth when material.** If several engineering dimensions can change the same bounded decision, use the multi-specialist composition method before finalizing shared seams: give supporting depth the same bound truth, reconcile constraints/failure models/proof obligations, and produce one compatible implementation model. Do not load every specialist for a local change or let parallel/supporting work create competing mutation truth.
4. **Choose the smallest coherent mechanism.** Reuse or extend an inspected project/platform seam that actually fits the semantics; reject nearby legacy/accidental patterns and avoid abstractions justified only by hypothetical reuse. Resolve material version/cutover questions before coding against remembered behavior.
5. **Edit -> execute -> observe -> compare -> re-enter.** Make the smallest coherent mutation that can teach you something, run the closest relevant proof, inspect the actual result, and compare it with the bound model. If evidence contradicts the model—API error, missing registration, different schema, alternate route, stale assumption—return to the earliest invalidated binding/mechanism instead of faking success or continuing the plan unchanged.
6. **Migrate proof with behavior.** Classify affected existing tests, strengthen/add proof for the new semantic mechanism, challenge fixture-shaped implementations, and exercise representative failure/integration paths that can falsify the claim.
7. **Inspect what is really consumed.** Open the real UI, inspect actual request/response behavior, query durable state, inspect runtime registration/logs/generated output, or otherwise observe the consumed artifact when relevant. Compile/isolated tests/static renders prove only their own seam.
8. **Review and finish truthfully.** Re-run affected proof after the final mutation; inspect sibling callers/failure paths/synthetic paths/legacy fallbacks/scope growth. Report changed seams, observed evidence, remaining `UNKNOWN`/`NOT_RUN`/failures, and the exact external decision if one prevents a stronger claim. Use `/code-review` when separate review is required or materially useful, not ceremonially.

## Contrastive near-misses

**Existing feature, plausible framework pattern:** the request names a model selector but the current data source/eligibility ownership is uninspected. Do not invent a common React hook/API shape; bind the actual path first.

**Authorized greenfield:** the user supplies a clear behavior contract for a new standalone utility. There is no previous implementation to inspect. Bind project/toolchain constraints, choose an implementation in `PROPOSAL` space, then prove the resulting executable behavior.

**Real API failure + fixture:** `/models` returns HTTP 500 while a fixture renders the component correctly. The fixture may prove isolated presentation; the integrated feature remains failed/unproved until the real API path is diagnosed and proved.

**Stale test after approved behavior change:** a historical test expects behavior current truth intentionally removed. Update/replace/delete the stale proof as appropriate; do not restore superseded production behavior just to recover green.

## Engineering boundaries

- Do not silently redefine Product behavior, approved UX/visual meaning, architecture, data meaning, security policy, release authority, or risk acceptance for implementation convenience.
- Do not claim current-system facts from memory, summaries, handoffs, or plausible convention when inspectable source/docs/runtime can bind them.
- Do not keep synthetic/test-only data paths reachable from production unless Product truth explicitly defines that mode.
- Do not preserve old/new active implementations after replacement parity/cutover unless a named compatibility obligation requires coexistence.
- Do not treat tool availability as permission for deployment, destructive production mutation, or another protected side effect.

## Completion

- `READY` — the change is coherent against bound current/target truth; every material current-state fact needed for the decision was inspected or truthfully resolved; authorized proposals were materialized without being confused with prior fact; when multiple specialist dimensions were decision-changing, their material constraints/failure semantics/proof obligations were reconciled into one compatible implementation rather than competing mutation truth; every material production boundary required by the claim has direct claim-relevant proof; affected tests were truthfully preserved/updated/replaced/deleted; consumed output was inspected when relevant; no fixture-shaped/superseded fallback remains; and no unresolved external decision prevents the claim.
- `PARTIAL` — useful code exists but a material current truth, required real-seam proof, integration path, test migration, bounded cleanup, or generalization check remains incomplete.
- `BLOCKED` — a required external decision, authority, source/runtime fact, environment, or capability prevents safe continuation.
- `FAILED` — a required mutation or verification attempt failed or left unverified/incoherent state. Do not hide this state behind synthetic or imagined success.

Implementation completion is developer evidence for this technical scope only. It does not manufacture QA, UAT, release, or production-operation success.
