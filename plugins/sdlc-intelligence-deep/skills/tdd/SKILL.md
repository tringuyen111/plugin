---
name: tdd
description: "Apply test-driven development directly or as an optional implementation method for one bounded behavior: choose a stable observable seam, drive informative red-green-refactor cycles, and bind each green result to the mechanism it actually proves. Use when the user or project explicitly selects TDD, test-first, red-green-refactor, or an equivalent bounded test-first coding job. Do not auto-own ordinary implementation merely because tests can be written, and do not own independent QA, immutable review, acceptance, release, or whole-feature proof."
---

# Test-Driven Development

## Runtime contract

Bind the current request/project truth needed for the bounded behavior: expected behavior or proof target, repository rules, relevant source and existing tests, the smallest observable seam, and authority to edit source/tests. **Direct invocation is valid.** Do not require `implement`, diagnosis, QA, or another named sibling Skill merely to perform TDD. When TDD is composed into a broader coding/debugging task, inherit the same bounded truth and return the slice evidence to that task without taking over its wider completion claim.

Protected Product/Design/Architecture/policy decisions and production/deployment/external side effects remain subject to their real authority. Ordinary source/test edits inside the authorized coding scope remain part of the same TDD task.

TDD drives a bounded **red -> green -> refactor** feedback loop. It is not a substitute for independent QA or whole-feature acceptance. The point of the loop is not ceremony: each test should make the next implementation/design decision more informed while leaving useful, maintainable developer proof behind.

## Method-fit gate

Before starting or continuing a TARGET cycle, check whether TDD can provide useful feedback for this slice.

| Question | If yes | If no / weak |
|---|---|---|
| Is the expected behavior/oracle known well enough to state a falsifiable example? | proceed to seam/example selection | use characterization/exploration for learnable current truth; do not invent TARGET expectations |
| Can a test reach the intended mechanism with enough determinism and diagnosability to drive code? | use the smallest useful seam | seek a smaller claim-preserving seam; if that removes the mechanism that matters, preserve the limitation instead of manufacturing fast fake proof |
| Can the TARGET test fail for the intended missing/wrong behavior before production change? | a valid RED may drive code | pre-green or wrong-reason failure requires investigation/re-entry, not code written to manufacture the cycle |
| Can developer-level examples compose into useful confidence for this bounded behavior? | continue the loop | keep emergent/system-level proof outside the TDD claim and return the remaining proof need explicitly |

If the user explicitly required TDD and no valid test-first loop can be formed, report the exact blocker/limitation rather than silently switching methods or fabricating RED. When TDD is only supporting a broader task, return the limitation so that task can choose another implementation/proof method for the affected part.

## Core cycle

1. **Bind the behavior and seam.** State the bounded behavior, what must remain stable, and the smallest stable interface where the behavior can be observed without specifying incidental implementation structure.
2. **Choose the next informative example.** Maintain only a lightweight live list when sequencing matters. Prefer the example that distinguishes a material behavior partition, failure class, invariant, compatibility obligation, or design pressure. Read [Example Sequencing and Informative RED](references/example-sequencing-and-informative-red.md) when the next example is not obvious, one example can be overfit, TARGET is unexpectedly green, or the observed RED may be invalid.
3. **RED — prove the test can disagree for the intended reason.** Run the TARGET test before production mutation. A test that is already green, cannot reach the behavior, or fails in setup/environment for an unrelated reason is not a valid RED.
4. **GREEN — make the smallest coherent change.** Implement only enough of the approved behavior to satisfy the now-informative examples without special-casing the current fixture or speculating beyond known behavior. Run the same proof again.
5. **REFACTOR — improve structure under the green envelope.** Inspect production and test structure for duplication, awkward naming/interface pressure, brittle setup, or unnecessary coupling exposed by the cycle. Refactor only while externally observable behavior remains unchanged, then rerun the green proof. A deliberate no-op refactor decision is valid when there is no material structural pressure; do not create cosmetic churn for ceremony.
6. **Continue only if another example can still teach something material.** Otherwise return the bounded evidence and remaining proof/risk to the current task.

## Observable seams and design feedback

A **seam** is the stable interface where the behavior can be falsified. Prefer a behavior-facing/module-facing interface over private implementation details, but do not equate "good TDD" with one fixed test size. A small unit seam, owned module API, service boundary, real database boundary, or controlled collaborator interaction can each be correct when it contains the mechanism the claim depends on and gives a useful feedback loop.

Resolve the seam from the strongest current evidence:

1. existing externally consumed contract/behavior and current callers;
2. approved AC/NFR/technical decision that fixes observable semantics;
3. established module/service interface that already owns the behavior;
4. an implementation-level seam proposed inside the already-authorized technical design space.

TDD may **shape or refine an implementation-level interface** when test pressure reveals awkward coupling or poor usability and the external behavior/architecture authority remains unchanged. Do not ask for external approval merely because two internal interfaces are both technically possible. Stop and surface the decision when the test-driven seam choice would redefine an externally owned API, Product behavior, durable data meaning, security policy, or material architecture contract.

Read [Test Design for TDD](tests.md) for the quality model and contrastive examples. Read [Test Doubles and Proof Fidelity](mocking.md) whenever the slice may replace a collaborator/runtime boundary with a real implementation, fake, stub, spy/mock, simulator, or in-memory substitute.

## Choose proof mechanism from the claim

Start from the behavior claim and the production mechanism it depends on. Prefer the highest-fidelity, least-brittle mechanism that still keeps the current developer loop deterministic, diagnosable, and fast enough to teach the next step.

A double is valid when it preserves the mechanism needed for the **bounded developer claim** or intentionally narrows the claim to caller behavior. If a fake/stub/mock/simulator removes the mechanism that the wider claim depends on, record what the green result still proves and what remains unproved. Do not inflate a fast developer test into database/provider/browser/system evidence.

Re-enter proof/seam selection when representative real-boundary evidence contradicts a double-backed green.

## Failure patterns to correct, not normalize

- **Implementation-coupled test** — breaks under behavior-preserving refactor because it asserts incidental private calls/order/shape. Re-state the behavior and find a more stable seam, unless that interaction is itself the material contract.
- **Tautological oracle** — derives the expected value with the same logic as production. Replace it with an independent example/spec/oracle.
- **Horizontal TDD** — writes a speculative suite first and implementation later. Keep only a lightweight behavior list; drive one vertical slice at a time so each cycle can change what comes next.
- **Invalid RED** — harness/build/environment failure occurs before the target behavior. Repair/diagnose the harness or rebind the seam; do not change production code from unrelated red.
- **Pre-green TARGET** — target already passes. Inspect whether behavior exists, the assertion is weak, the seam is wrong, or the test is redundant; do not add code to manufacture a cycle.
- **Green overfit** — one example passes through a constant/special case even though another already-known approved partition would falsify it. Add the next discriminating example before generalizing by intuition.
- **Refactor-by-requirement** — test edits bless new behavior during the refactor step. A behavior/public-contract change is a new semantic decision and a new TARGET cycle, not refactor.

## Evidence discipline

For every material cycle record enough evidence to distinguish:

```text
TARGET behavior / oracle source
observable seam
RED command -> intended failure
GREEN change -> same command -> observed pass
test mechanism / substituted boundary
bounded claim proved
wider claim still unproved when material
refactor decision + post-refactor green result when structure changed
```

Existing tests remain evidence, not automatic product authority. Characterization tests may intentionally start green to bind `PRESERVE` truth; TARGET tests for new/changed behavior require a valid RED before production mutation.

## Completion

Return the bounded behavior/proof target, bound seam and its authority, active example/test role, red command and intended failure, smallest coherent green change, green command/result, proof mechanism and any substituted boundary, refactor decision/result, material design discoveries, and remaining risks/proof needs.

- `READY` — the declared TDD slice had a valid TARGET RED, coherent GREEN, and completed refactor decision under unchanged approved behavior; any material proof limitation is explicitly scoped.
- `PARTIAL` — useful test-first progress/evidence exists but the current cycle or required proof boundary remains incomplete.
- `BLOCKED` — missing/contradictory behavior truth, authority, environment, seam, or method-fit condition prevents a valid TDD cycle.
- `FAILED` — an authorized required mutation or verification attempt failed or left incoherent/unverified state.

When invoked directly, these states close the bounded TDD job without requiring another Skill. When composed, return them to the broader task. `READY` is developer evidence for the declared slice only: it does not prove broader feature integration, independent QA, immutable review, UAT, release readiness, or deployment success.
