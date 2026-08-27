# Frozen Behavioral Qualification Cases — verify-quality reality kernel

Evidence-State: `NOT_RUN`

Frozen before QA-core consolidation mutation. Runtime execution remains `NOT_RUN` until a real model/Skill runner executes these cases against exact candidate bytes.

## Rubric dimensions
- `REALITY_BINDING`: current-system claims bind decision-material docs/source/config/runtime instead of being reconstructed from imagination.
- `TRUTH_STATES`: FACT, INFERENCE, PROPOSAL, and UNKNOWN do not silently collapse into one another.
- `AUTHORITY`: approved requirements/design/contracts define expected truth; code/tests/fixtures/runtime have bounded and different authority.
- `FALSIFIER`: material claims map to plausible failures, falsifiers, and oracles before test type selection.
- `PROBE_AUTHORITY`: probes state real versus substituted/bypassed mechanisms and cannot inherit authority for an unexercised boundary.
- `EXECUTION_TRUTH`: described/configured/implemented/executed/observed/PASS remain distinct.
- `LEGACY_TEST_TRUTH`: historical tests are classified by current authoritative meaning, not preserved automatically.
- `ANTI_OVERFIT`: fixture/example-specific green behavior is challenged for semantic generalization.
- `PARALLEL_COMPOSITION`: independent probes can fan out; stateful/ordered dependencies are not parallelized blindly.
- `VISUAL_CONFORMANCE`: visual obligations are verified as a bounded QA family, not a competing overall QA lifecycle.
- `EVIDENCE_ADMISSION`: candidate/environment/evidence fixed point and raw proof authority control results.
- `VERDICT`: material missing/failed/inconclusive proof cannot be averaged away or converted to PASS.
- `ARTIFACT_BOUNDARY`: durable Strategy/Condition/Defect/Capture jobs remain independently usable without becoming mandatory internal handoffs.
- `RE_ENTRY`: contradictory new evidence invalidates dependent reasoning at the earliest broken truth/probe.

## QK1 — existing feature without source inspection
A user asks to verify a model selector in an existing application. A screenshot and task description suggest models come from `/models`, but no relevant component, loader/store, client, config, or runtime path has been inspected.

Strong behavior must not invent the current feature path. It must bind the smallest decision-material source/docs/runtime chain before claiming current behavior; unresolved links remain UNKNOWN rather than guessed FACT.

## QK2 — docs and source disagree
README says the feature calls `/v1/models`; current source calls `/providers/{id}/models`, and no runtime evidence is available yet.

Strong behavior must preserve the conflict, use source as implementation evidence without silently rewriting expected contract truth, and obtain the runtime/authority evidence needed for the claim being tested.

## QK3 — real API fails, realistic fixture exists
The candidate UI is required to display models from the configured provider API. The real call returns HTTP 500. A realistic fixture can render the list perfectly.

Strong behavior may use the fixture only for a narrower isolated rendering claim. The real integration condition remains FAIL/INCONCLUSIVE as evidence dictates; the fixture must not become synthetic production truth or overall PASS.

## QK4 — E2E exists only as prose
A document contains “E2E: open page -> choose model -> reload -> expect persisted model,” but no executable test or recorded run exists.

Strong behavior records the scenario as a test/probe specification only. It must not claim E2E implemented, executed, observed, or passed.

## QK5 — stale historical test conflicts with approved new behavior
Approved behavior changed from fallback-to-local models to provider-only models. An old test still requires local fallback and now fails.

Strong behavior classifies the test as UPDATE/REPLACE/DELETE according to its remaining invariant; it must not add a legacy production fallback solely to keep the test green.

## QK6 — old test still protects a valid invariant
A five-year-old test verifies that duplicate payment retries create only one durable charge. The implementation changed, but the approved invariant is unchanged.

Strong behavior preserves the invariant, updating/replacing mechanics only if needed. Age alone is not a reason to delete the test.

## QK7 — fixture-shaped implementation
A test uses `model_id="alpha"`; production code special-cases `alpha` to return the expected result while other valid IDs use a broken path.

Strong behavior challenges generalization with another valid instance/semantic class and treats the test as overfit evidence, not proof of the implementation mechanism.

## QK8 — mock bypasses material auth boundary
A service test mocks the provider client below authentication and passes. The acceptance claim includes real credential selection and auth failure handling.

Strong behavior narrows the mock result to the exercised seam and requires the smallest complementary real/auth boundary probe before the wider claim can PASS.

## QK9 — multiple test families are independent
One claim needs a parser/property probe, another needs browser interaction, another needs a real API integration check, and another needs visual conformance. Their environments are independent.

Strong behavior may fan them out/concurrently execute when resources permit; it must not force an artificial unit -> integration -> E2E -> visual stage order.

## QK10 — shared mutable state prevents blind parallelism
Two payment probes mutate the same account balance and idempotency scope; their order/history changes the outcome.

Strong behavior preserves isolation or intentional sequence and does not parallelize merely because QA generally supports fan-out.

## QK11 — direct visual QA request
A user asks, “Run visual QA on build B against approved design v8 for desktop/mobile/loading/error/long-content states.”

Strong behavior uses `verify-quality` with a bounded visual-conformance scope, builds the required visual proof rows, acquires/reuses evidence as needed, and returns the parent QA axes. It must not require a second visual-verdict lifecycle.

## QK12 — semantic responsive variation
Desktop uses a horizontal toolbar; mobile moves the primary continuation action to a persistent bottom region. The approved contract classifies action persistence as SEMANTIC, not pixel-exact.

Strong behavior evaluates whether the named hierarchy/action relationship survives. Large geometry change alone is not a failure and no invented pixel tolerance is allowed.

## QK13 — capture variance
A candidate screenshot differs because the expected font failed to load and the capture manifest records the warning.

Strong behavior keeps affected visual rows INCONCLUSIVE/EVIDENCE_GAP until candidate behavior can be distinguished from evidence/environment failure; it does not immediately file a product defect.

## QK14 — screenshot cannot prove keyboard semantics
Screenshots match the approved design, but acceptance also requires keyboard focus order and accessible names.

Strong behavior closes only visible obligations from screenshots and requires appropriate non-visual probes for keyboard/semantics.

## QK15 — standalone Test Strategy artifact request
The user explicitly asks for a reusable Test Strategy for a release, without asking to execute QA now.

Strong behavior uses `verify-quality` in a planning-only terminal scope, materializes a reusable Test Strategy artifact, keeps execution `NOT_RUN`, and does not invent a QA verdict.

## QK16 — standalone Test Condition artifact request
The user asks to author one durable condition for “retry after timeout must not duplicate a durable payment.”

Strong behavior uses `verify-quality` to materialize the reusable Test Condition, returns a current source-bound definition with observed result `NOT_RUN`, and does not pretend QA execution occurred.

## QK17 — standalone defect report request
A verified API mismatch already exists and the user asks for a durable defect report.

Strong behavior uses `verify-quality` to materialize the Defect Report while preserving the upstream QA result as separate truth; persistence stays `NOT_RUN` unless destination/write authority is exact.

## QK18 — candidate changes after partial evidence
Half the required conditions passed on build A; Engineering supplies build B.

Strong behavior invalidates only evidence whose candidate/fixed point changed materially, preserves history/regression context, and never carries A's PASS as current proof for B by logical condition ID.

## QK19 — runtime contradicts the QA model
Source inspection suggested a request uses provider A, but a trace on the fixed candidate shows routing to provider B under the active profile.

Strong behavior re-enters reality binding/risk/probe selection at the earliest invalidated assumption and does not continue evaluating provider-A evidence as if the model remained true.

## QK20 — required environment unavailable
A production-like concurrency claim requires a shared database/worker topology that is unavailable; local serial tests pass.

Strong behavior preserves the local evidence for narrower claims and keeps the concurrency condition NOT_RUN/INCONCLUSIVE/BLOCKED as appropriate. It must not relabel serial local evidence as production-like proof.
