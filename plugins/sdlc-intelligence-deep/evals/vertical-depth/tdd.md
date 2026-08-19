# TDD vertical-depth behavioral cases

Status: `NOT_RUN` unless executed with a suitable agent/runtime. These cases freeze the expected decision delta from the pre-edit v1.0.9 baseline.

## Rubric

- `TEST_LIST`: maintains a lightweight live set of remaining behavior examples when sequencing matters.
- `NEXT_INFORMATION`: selects the next test because it distinguishes a meaningful behavior/design uncertainty.
- `RED_QUALITY`: distinguishes valid RED from pre-green, harness/setup failure, and characterization baseline.
- `GENERALIZATION`: avoids both one-example overfit and speculative implementation beyond approved behavior.
- `PRESERVE_TARGET`: separates characterization/PRESERVE truth from new TARGET behavior.
- `REFACTOR_ENVELOPE`: refactors only under unchanged green behavior; semantic changes re-enter a new RED.
- `BOUNDARY_DISCIPLINE`: does not absorb broader QA coverage/verification ownership.

## Cases

### T1 — one-example constant fit
A banded shipping rule has only the first example `1kg -> 5`. Expect a next example/boundary that discriminates the real rule before claiming generalization.

### T2 — target test green before change
A new "expired token rejected" target test passes immediately. Expect investigation of existing behavior/assertion/seam/redundancy, not production code to manufacture RED/GREEN.

### T3 — wrong-reason RED
Authorization test fails because fixture construction/test DB startup fails. Expect harness diagnosis/repair; do not change production authorization logic from this failure.

### T4 — boundary-driven generalization
An ordinary pricing example is green; inclusive/exclusive boundary remains unresolved. Expect boundary test next because it changes the behavior partition.

### T5 — failure case has higher information value
Ordinary behavior is constrained; public error behavior remains unresolved. Expect the failure/exception example before another redundant happy example.

### T6 — characterization plus target
Legacy behavior must stay while one new branch is added. Expect existing green characterization to bind PRESERVE and separate failing TARGET to drive the change.

### T7 — refactor after multiple greens
Several cases are green but implementation is duplicated/awkward. Expect behavior-preserving refactor under same tests; a changed public seam requires a new semantic decision/RED.

### T8 — simple near-miss
One unambiguous missing `isEmpty()` branch. Expect ordinary RED -> GREEN -> bounded refactor without loading sequencing machinery or creating a permanent plan artifact.

## Independence / applicability / design-feedback extension

Additional rubric:
- `STANDALONE`: direct invocation binds request/project truth and completes the bounded TDD job without requiring a sibling Skill.
- `DISCOVERY_BOUNDARY`: ordinary implementation does not become TDD merely because tests exist; explicit/project-selected test-first intent does.
- `METHOD_FIT`: does not fabricate TDD when a meaningful deterministic/diagnosable test-first loop cannot be formed.
- `DESIGN_FEEDBACK`: protects externally owned contract meaning while allowing implementation-level seam/interface refinement inside authorized technical space.
- `TEST_VALUE`: chooses test shape from the claim and useful test properties instead of universal integration/assertion-count/mock rules.
- `REFACTOR_DISCIPLINE`: treats behavior-preserving refactor as the third TDD step and reruns the green proof after structural change.

### T9 — direct standalone TDD
The user gives a real repository, a fixed behavior `expired token -> rejected`, and explicitly asks to implement it test-first. No `implement` or other sibling Skill is loaded. Expect TDD to bind the current source/rules/seam and run its bounded method directly; it must not block or request a handoff merely because a parent Skill is absent.

### T10 — generic implementation is not automatically TDD
The user asks "implement retry handling" and does not request test-first/TDD; repository policy also does not require it. Existing tests are present and a failing test could be written. Expect TDD not to claim primary ownership merely because test-first is possible.

### T11 — composed TDD remains bounded
A broader implementation task explicitly selects TDD for one retry/idempotency slice. Expect TDD to return bounded red/green/refactor evidence for that slice while the broader task retains whole-change integration/proof truth. TDD must not claim feature-level QA or completion.

### T12 — test pressure may refine an internal interface
Product/API behavior is fixed, but two internal module interfaces are both technically allowed and neither is canonical. Writing the first test exposes that one interface is awkward and structure-coupled. Expect TDD to propose/refine the implementation-level seam within authorized technical space rather than requiring external approval solely because the internal interface was not predetermined. If the choice would alter an externally owned API/architecture contract, expect re-entry instead.

### T13 — no useful red/green loop
The only available probe for a bounded behavior takes several minutes, is nondeterministic, and often fails before reaching the target mechanism. A smaller reliable seam would remove the mechanism the claim depends on. Expect TDD to surface the method-fit/proof limitation rather than drive production code from invalid RED or manufacture a fast fake as wider proof.

### T14 — expected answer is not known yet
A numerical simulation is being explored and the correct output for the proposed behavior is not yet knowable from any approved oracle. Expect TDD not to invent expected values. It may use characterization/exploration for learnable building blocks, but TARGET red/green for the unknown macro result is not yet valid.

### T15 — one behavior may need multiple assertions
One behavior contract says a successful command returns an accepted status and exposes the created identifier required for subsequent retrieval. A single test uses two assertions that jointly express that one behavior. Expect the Skill to judge one behavioral reason to fail and oracle coherence, not reject the test because assertion count is greater than one.

### T16 — green is followed by a refactor decision
The target behavior is green, but the implementation and test fixture now contain duplication and an awkward name exposed by the example sequence. Expect a bounded behavior-preserving refactor of production and/or test structure followed by rerunning the green proof. If no material structural pressure exists, an explicit no-op refactor decision is sufficient; do not create cosmetic churn.
