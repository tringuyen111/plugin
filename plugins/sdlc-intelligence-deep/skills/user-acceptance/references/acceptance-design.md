# Acceptance Design

## Contents
1. Select the representation
2. Design mechanism
3. Stateful/interrupted business semantics
4. Evidence intent and limitations
5. Contrastive examples

## 1. Select the representation

Choose the form that exposes the business acceptance oracle with the least distortion.

| Dominant reasoning shape | Prefer | Avoid |
|---|---|---|
| End-to-end actor goal with meaningful branch/recovery | Business scenario | exploding every QA assertion into prose steps |
| Many explicit conditions/rules decide outcome | Decision table / business-rule path | hiding combinations inside one narrative |
| Few independent observable business-acceptance obligations | Acceptance evidence/test-case matrix | manufacturing a journey that adds no meaning |
| Learning/usability/workflow uncertainty is material | Exploratory acceptance charter | pretending expected behavior is already fully known |
| Mixed coverage across several representations | Compact acceptance evidence matrix referencing each | duplicating the same oracle in multiple formats |

A representation is not a first-class capability. Use whichever one makes business meaning and limitations easiest to evaluate. A business-acceptance matrix consumes authorized requirement Acceptance Criteria when they exist; it does **not** redefine those criteria. A UAT test-case/evidence row is also not a `/verify-quality` Test Condition or automated QA probe.

## 2. Design mechanism

For each material acceptance slice:

1. **Trace exact target meaning.** Bind only authoritative Product/Requirements/domain views that actually control the slice. Flag `PROPOSED_OR_ASSUMED` material instead of laundering it into target truth.
2. **Name the business/user goal.** State what the actor/operation needs to accomplish and why it matters for acceptance.
3. **Select representative context.** Roles, permission, state, dates, volume, boundary values, domain examples, and operational conditions should reflect the business risk/decision. Representative does not mean statistically representative unless the project has real sampling evidence.
4. **Define observable oracle.** Express user/business-visible result, state/effect, negative guarantees, and material limitations. Avoid implementation internals unless they are themselves business-visible obligations.
5. **Cover critical alternate/failure behavior proportionally.** Cover branches that can flip acceptance, not every QA condition.
6. **State evidence intent.** Identify what the later witness could inspect—screen state, record/export, business event, notification, settlement, audit trail—without claiming it already exists.
7. **Keep execution `NOT_RUN`.** Expected behavior is not observed behavior.

A design-only request can complete here. Candidate/environment/final approver are optional metadata unless they materially constrain the design.

## 3. Stateful/interrupted business semantics

When behavior is stateful, async, interruptible, repeated, multi-actor, time-dependent, externally settled, or capable of partial effect, make the business-visible semantics explicit:

- commitment point: when a real business obligation/effect exists;
- partial effect: what changed before failure/timeout;
- UNKNOWN outcome: when the immediate result cannot be known;
- reconciliation: how the business/user later knows the final state;
- compensation/reversal: how a committed/partial effect is corrected when required;
- retry/duplicate semantics: whether a new attempt can duplicate or conflict with prior state;
- final observable state: what counts as complete for acceptance.

Do not assert “failure leaves state unchanged” when a real commitment may already exist. Provider acknowledgement is not completion when the target meaning requires later settlement/consumption.

## 4. Evidence intent and limitations

For each representation preserve:
- what evidence would demonstrate the oracle;
- what it does **not** prove;
- untested roles/branches/conditions;
- known assumption/proposal status;
- whether technical proof must come from `/verify-quality` rather than UAT witnessing.

Do not use one representative scenario as statistical proof of all users or exhaustive QA coverage.

## 5. Contrastive examples

### Good scenario choice
"A merchant refunds an already-settled order; provider times out after commitment; UI initially shows UNKNOWN; reconciliation later shows REFUNDED; a duplicate retry must not create a second refund."

The journey, commitment, UNKNOWN, reconciliation, and duplicate semantics are acceptance-critical, so a scenario is useful.

### Bad scenario inflation
Five independent admin settings each have a clear criterion and no shared journey. Creating five long narratives adds ceremony. Use a compact criteria/evidence matrix.

### Business-rule case
Eligibility depends on account tier × region × verification status. Use a decision table or rule path; a single happy-path scenario hides material combinations.

### Exploratory case
The feature meets formal criteria but the key question is whether intended support agents can reliably recover an interrupted customer case without losing context. Use a **business/user acceptance** exploratory charter with mission, representative tasks, business oracle, evidence to capture, and stop/learning conditions. Do not turn this into general exploratory QA or fabricate deterministic expected steps before the workflow is understood.
