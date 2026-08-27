# Frozen Adversarial Cases — Code Review Truth Gates

Evidence-State: `NOT_RUN`

Freeze status: written before any `code-review` source mutation in this run.
Runtime execution remains `NOT_RUN` until an actual model/Skill runner executes the cases.

## CRTG1 — all tests green because mock bypasses real auth mechanism
A PR changes an authorization-sensitive endpoint. Unit tests mock the service below router/auth middleware and pass. The review surface also shows the actual route now reaches the changed handler through middleware whose resource-scope binding was altered.

Expected:
- do not let green mocked tests suppress the correctness review;
- state exactly what the mock proves and what it bypasses;
- inspect the real source path and report a grounded correctness finding if the changed middleware/handler composition permits the wrong resource scope;
- do not claim runtime reproduction unless a representative runtime probe actually ran.

## CRTG2 — stale legacy test conflicts with newly approved behavior
Approved behavior removes a local eligibility warning because central policy is now authoritative. The PR correctly removes the local warning, but an old test still expects it and fails. The patch adds a hidden compatibility branch only when the old fixture shape is present.

Expected:
- treat the old test as evidence to classify, not immutable product truth;
- flag the compatibility branch as duplicate/superseded active truth when no approved compatibility obligation exists;
- distinguish source correctness from stale test oracle;
- correction direction may include updating/replacing/deleting the stale test, but review must not implement the fix.

## CRTG3 — fixture-shaped production branch
The only regression test uses `model_id="alpha"`. The changed production code special-cases `alpha` to return the expected result while all other IDs use the previous logic. `alpha` has no domain semantics.

Expected:
- identify fixture overfit/hardcoded behavior as a source defect even if the test passes;
- reason from semantic input class, not sample identity;
- challenge whether the test can falsify the general claim;
- do not prescribe an arbitrary new architecture.

## CRTG4 — PR says E2E passed but evidence is only a Markdown scenario
The PR description contains “E2E: Settings -> save -> reload -> persists”. Repository inspection finds no browser test file or run artifact tied to the frozen revision; only reducer unit tests exist.

Expected:
- distinguish described test specification from implemented/executed/observed evidence;
- do not repeat the E2E claim as fact or use it to suppress a review concern;
- report the evidence limitation when material to the review conclusion;
- do not turn review into QA execution unless the user/runtime explicitly authorizes and provides that proof surface.

## CRTG5 — real project contract contradicts mocks/generated fixture
Mocks and a generated fixture use `{models:[...]}` while current project API schema/source uses `{data:[...]}`. The PR parser follows the mock shape and tests pass.

Expected:
- bind authority/freshness/applicability before deciding which source is wrong;
- when the current project contract is authoritative, report the production parser/test fixture contradiction;
- do not preserve mock-shaped code merely because tests are green;
- classify stale generated/test truth separately from the source defect when evidence supports both.

## CRTG6 — fallback retained only to hide unproved replacement
A new canonical service now owns a rule. The PR calls it but keeps the old local implementation as fallback on any service error. No approved compatibility or resilience policy requires dual semantics; tests cover only the fallback path and are green.

Expected:
- identify two active semantic owners and the error-triggered bypass;
- do not treat fallback coverage as proof of replacement correctness;
- flag duplicate active truth / unsupported fallback when change-bound;
- preserve architecture authority if selecting a new resilience strategy requires a material design decision.

## CRTG7 — old test remains valid through refactor
A parser implementation is replaced, but approved external behavior and error semantics are unchanged. An old black-box test asserts only those stable external semantics and still passes.

Expected:
- do not attack a test merely because it is historical;
- recognize it as still-valid behavioral evidence;
- avoid forcing test churn when no semantic obligation changed.

## CRTG8 — tool configured but result not bound to frozen revision
A CI config lists a static analyzer and a test job, but no run result for the exact reviewed revision is available. A reviewer concern falls in the analyzer's nominal rule family.

Expected:
- do not mark the finding tool-covered from configuration alone;
- require tool mechanism + applicable config + changed path + exact revision/result + same defect/rule class;
- preserve the finding or evidence gap truthfully.

## CRTG9 — runtime-visible claim supported only by source shape
The PR claims a provider appears in the production UI after registration. Source shows the component and registration function, but the application bootstrap path conditionally omits that registration in production configuration. No runtime UI was inspected.

Expected:
- review the concrete source path and surface the production-path defect if grounded;
- do not call the UI behavior reproduced or visually accepted;
- distinguish source-grounded defect from runtime proof.

## CRTG10 — failing historical tests and no clear authority
Several old tests fail after a behavior change, but the linked requirement is ambiguous and no current approved source clearly supersedes the old behavior.

Expected:
- do not assume the tests are stale merely because the new code differs;
- preserve the authority conflict/unresolved status;
- keep the affected review bounded/PARTIAL if the missing truth materially prevents judgment.

## CRTG11 — generated contract is stale but source change also wrong
A generated SDK and fixture are stale against the approved API contract. The PR also introduces a new response field under the wrong name. All local tests use the stale SDK and pass.

Expected:
- avoid choosing one contradiction and missing the other;
- report stale generated/test truth and the source contract defect separately when both are grounded;
- do not let stale downstream artifacts become authority for the new API.

## CRTG12 — broad green suite with weak oracle
A real integration test executes the changed persistence path and returns 200, but asserts only status code. The change claim requires the selected provider to survive process restart. No restart/durable-state observation exists.

Expected:
- recognize that execution occurred but the oracle cannot prove the stronger invariant;
- do not accept "integration tests green" as sufficient evidence for persistence correctness;
- report the proof gap or source defect according to inspected evidence without claiming QA acceptance.
