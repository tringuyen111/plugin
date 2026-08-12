---
name: tdd
description: Apply a bounded red-green test-first implementation method to one approved behavior and resolved public seam. Use inside implementation or bug fixing when a failing test can express the next vertical slice; return behavior-preserving cleanup to the caller after green, and do not own QA strategy or acceptance.
---

# Test-Driven Development
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before defining the next red/green slice for a material ACTIVE unit:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) to consume the current expected truth/proof boundary without inventing upstream behavior or claiming parent closure.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


TDD is the red → green loop. This skill is the supporting implementation method that makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop. `/implement` or `/diagnosing-bugs` owns the work item, source baseline, runtime verification, review, and completion state. TDD owns only the next test-first vertical slice. Every section applies on every cycle — consult them before and during the loop, not after.

When exploring the codebase, resolve the project-authorized glossary, domain
context, and accepted technical decisions before naming tests or public seams.
Use `CONTEXT.md` or an ADR directory only when the project selected those
conventions; do not invent fixed paths when another canonical store owns them.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification — "user can checkout with valid cart" tells you exactly what capability exists — and survives refactors because it doesn't care about internal structure.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## Seams — where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at resolved seams.** Before writing a test, bind the slice to the ACTIVE semantic obligation/proof expectation, then name the public seam and its source. If expected truth is still ambiguous or requires an owner decision, return that gap to the owning workflow instead of encoding a convenient behavior in the test. Resolve seams in this order:

1. existing public contracts and behavior tests;
2. approved AC/NFR, technical task, or ADR;
3. established module interfaces and callers;
4. user confirmation when two materially different public seams remain.

Do not stop to ask when the repository already has one authoritative seam. Do
not silently choose when the choice changes the public contract, architecture,
or long-term test surface.

## Anti-patterns

- **Implementation-coupled** — mocks internal collaborators, tests private methods, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological** — the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth — a known-good literal, a worked example, the spec.
- **Horizontal slicing** — writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead — one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Red before green.** Write the failing test first, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One ACTIVE proof target, one seam, one test, one minimal implementation per cycle. A new material behavior discovered by the cycle returns to the owning workflow for semantic refinement/discovery handling before TDD continues.
- **Keep the TDD loop red → green.** After green, return any behavior-preserving cleanup/refactor observation to the caller (`/implement` or `/diagnosing-bugs`). The caller may perform the smallest bounded cleanup, rerun the same green proof, then freeze that post-cleanup change surface for review-only `/code-review`. TDD does not widen the behavior or perform speculative cleanup, and Code Review does not mutate the source it reviews.
- **Record the red and green evidence.** The red must fail for the intended reason; the green must run the same test/probe after the smallest coherent implementation. When a mock/fake/stub/simulator replaces a material production boundary, record that substituted boundary, the bounded claim the test can prove, and the wider mechanism it does not prove.
- **TDD is not independent QA.** It guides implementation and protects developer-facing seams. QA still verifies acceptance, integration risk, visual/accessibility behavior, and release evidence as relevant.

## Completion

Return the slice to the owning workflow with the ACTIVE semantic unit/proof
target, public seam, red command and intended failure, smallest green change,
green command/result, evidence binding, any substituted production boundary and
resulting proof limitation, material discoveries, any behavior-preserving
cleanup observations returned to the caller, and remaining risks. `READY` means the
declared developer slice completed red then green and preserved the public
contract; it does not make the parent semantic obligation `PROVEN`, and it does
not mean the work item passed QA or is release-ready. Use `PARTIAL`, `BLOCKED`,
or `FAILED` when the seam, expected behavior, environment, red/green evidence,
or required semantic decision is missing or contradictory.
