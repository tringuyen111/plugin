# Eval — improve-codebase-architecture Prompt / Context architecture

Evidence-State: `NOT_RUN`

Freeze-State: `FROZEN_BEFORE_MUTATION`
Purpose: falsify the claim that architecture-improvement discovery can use deep-module reasoning without rewriting project-native architecture vocabulary or prematurely loading detailed design context.

## Case 1 — service names are source truth, not forbidden vocabulary

**Prompt / context**
A repository explicitly names `PaymentService`, `FraudService`, and `LedgerService`; ADRs and deployment manifests use those names. Repeated payment-normalization edits cross all three services.

**Expected behavior**
- Keep those service names in evidence and candidate records.
- May reason that normalization knowledge leaks across a seam/owner boundary.
- Do not rename services to generic `modules` merely to fit the Skill vocabulary.
- If a proposed consolidation would erase a real deployment/trust boundary, reject or reframe it.

**Failure**
The report replaces the project nouns with “module” and loses traceability to inspected source.

## Case 2 — component is canonical project architecture vocabulary

**Prompt / context**
A frontend repository defines `CheckoutComponent` as a real framework/runtime boundary. Recent changes show state ownership leaking into three child components.

**Expected behavior**
Use `CheckoutComponent` and child component names in the candidate record. `owner`, `seam`, `locality`, or `depth` may be an analytical legend when useful; they are not mandatory replacement nouns.

**Failure**
The Skill says `component` is non-canonical or rewrites it to `module` in the artifact.

## Case 3 — discovery stays shallow until a fixed technical decision exists

**Prompt / context**
The user asks for architecture improvement opportunities across a large codebase. Evidence supports two candidate friction clusters but no candidate is selected.

**Expected behavior**
- Inspect and rank evidence-grounded candidates.
- Do not load or imitate detailed `codebase-design` alternatives/migration workflow.
- Preserve `DISCOVERY_ONLY` completion if that is the requested scope.

**Failure**
The agent starts designing exact interfaces for both candidates or manufactures an architecture decision before selection.

## Case 4 — optional HTML uses project names

**Prompt / context**
An authorized HTML report is requested for a repository whose canonical units are `OrderAPI`, `CheckoutWorker`, and `PricingPolicy`.

**Expected behavior**
- Candidate cards and diagrams use those source names.
- Add a compact analytical legend only if terms such as `seam`, `leakage`, or `depth` materially clarify the relation.
- Do not require a universal “module/interface/deep module” legend when the report does not use it.

**Failure**
The HTML format forces every project element into generic module/interface vocabulary.

## Case 5 — no-change remains valid

**Prompt / context**
A 900-line parser has a stable public interface; changes remain local and callers do not know internals.

**Expected behavior**
Return no eligible architecture candidate if deeper evidence does not show friction. Do not create a candidate from file size or from the opportunity to use deep-module terminology.

**Failure**
The agent invents a “deep module” refactor because the file is large.

## Case 6 — fixed technical branch preserves evidence names and standalone completion

**Prompt / context**
The user selects a candidate involving `Payments API` and `LedgerWriter`; source inspection shows the architecture direction is grounded but a fixed technical owner/interface/seam decision remains.

**Expected behavior**
Finish the architecture-improvement result with `Payments API` and `LedgerWriter` preserved as source-grounded names, plus the surviving evidence, constraints, quality trade-offs, compatibility/reversibility pressure, proofability, and exact fixed-design frontier. If the broader request includes detailed design and `codebase-design` is available, a distinct continuation may use it. If it is unavailable, the completed architecture-improvement sub-result remains complete; only the broader detailed-design continuation is unexecuted.

**Failure**
The workflow renames the system, invents exact interface/migration design, or marks its own architecture judgment `PARTIAL` solely because `codebase-design` cannot be loaded.

## Near-miss — repository has no meaningful architecture nomenclature

If source uses only anonymous/local helper names and no project-level architecture vocabulary, neutral analytical terms such as `owner`, `interface`, `seam`, or `module` may be used directly. This is not permission to overwrite meaningful source terminology when it exists.

## Proof level
These cases are frozen source-level behavioral expectations. They do not constitute a runtime cohort execution. Behavioral uplift remains `NOT_RUN` until a real agent runtime executes representative baseline/candidate cases.
