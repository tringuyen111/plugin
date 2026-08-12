---
name: uat-scenario
description: Define or review a business-facing user acceptance scenario from approved Use Cases, Stories, Acceptance Criteria, Business Rules, NFRs, and representative operational data. Use when an authorized Product or business owner needs observable end-to-end scenarios without technical test implementation or an inferred acceptance decision.
---

# UAT Scenario
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Define one representative business scenario for an authorized acceptance owner.
The scenario expresses business intent and observable outcome. It does not
implement tests, declare QA PASS, choose the UAT decision, or authorize release.
A scenario definition is separate from a witnessed execution result.

Read [UAT-SCENARIO-FORMAT.md](UAT-SCENARIO-FORMAT.md). When source behavior is
stateful, interruptible/repeated, partial, multi-actor, time-dependent, or can
finish with an unknown business outcome, read
`../define-behavior/BEHAVIOR-SEMANTICS-CONTRACT.md` before finalizing expected/
negative outcomes.

## Scenario fixed point and source truth

Bind an exact **scenario revision** to the exact authorized **source identity**
and **source revision** set it represents: Product scope, Story, Use Case, AC,
Business Rule, NFR and Behavior Package as materially applicable.

Classify scenario source truth:

- **TARGET_AUTHORIZED** — the scenario exercises behavior authorized by the exact
  Product/domain/requirement sources.
- **PROPOSED_OR_ASSUMED** — a material behavior, condition, data rule or expected
  outcome lacks authority. Such a scenario may be drafted for clarification but
  is not acceptance-ready evidence of target truth.

**Current verified** behavior/environment can be recorded as context, but it does
not replace authorized target behavior when the two conflict.

A material source revision or scenario-definition change makes the affected
scenario stale. Revalidate steps, data/context, expected/negative outcomes,
limitations and evidence intent against the new fixed point and advance the
scenario revision. Witnessed execution evidence remains bound to the exact
scenario/candidate/environment/source revision it observed and **does not carry
forward** by scenario ID or wording similarity.

## Process

1. **Trace the exact source.** Link exact Product scope, actor, Use Case, Story,
   AC, Rule, NFR and Behavior revisions that materially define the scenario.
   Reject an orphan or materially proposed scenario presented as authorized truth.
2. **Name the business goal.** State what the actor or operation must accomplish
   and why it matters to the acceptance owner.
3. **Choose representative data and context.** Use realistic roles, permission,
   state, volume, dates, boundaries and domain examples without exposing PII.
   “Representative” means relevant to the business risk/decision; it is **not
   statistical** proof that one scenario represents every user, population or QA
   condition.
4. **Define preconditions and trigger.** Use business language and a **fixed
   candidate/environment**; do not reference internal methods or unstable paths.
5. **Define observable steps.** Keep the scenario end-to-end enough for business
   acceptance while avoiding duplication of every QA condition or automated test.
6. **Define expected business outcome and negative guarantees.** Include
   postconditions, operational effect, unchanged state on failure, and critical
   exceptions supported by the source. When behavior permits **UNKNOWN** outcome,
   state the observable **reconciliation** path/final state. When a failure occurs
   after a real **partial** effect or business **commitment**, preserve that state
   and required business **compensation**/reversal/recovery rather than pretending
   nothing happened. A provider **acknowledgement** is not completion when the
   source requires later settlement/consumed state.
7. **Link evidence intent.** Name QA reports, screenshots, records, exports,
   events or other artifacts the approver can inspect. This is expected evidence
   intent during authoring, not proof that the scenario ran.
8. **Record limitations and decision boundary.** State what the scenario does not
   prove, including important business branches not exercised. Separately name the
   **scenario actor / representative** and the **acceptance approver / authority**;
   the performer/representative need not be the authorized approver.
9. **Keep authoring separate from execution.** A freshly authored scenario has
   execution result `NOT_RUN`. Do not populate PASS/FAIL/INCONCLUSIVE/
   NOT_APPLICABLE from expected behavior, a QA verdict or author confidence.
10. **Bind later witnessed execution.** A non-`NOT_RUN` scenario result may be
    recorded only from actual **witnessed execution** under `/accept-uat` or another
    explicitly authorized UAT execution/recording owner, bound to exact scenario
    revision/source fixed point, candidate/environment, representative, time and
    execution evidence. That scenario result **does not imply the overall UAT
    decision**.

## Ownership boundaries

- `/accept-uat` **owns witnessed** scenario result recording and the overall UAT
  acceptance decision for the fixed candidate/scope. Scenario authoring owns only
  the business scenario definition and expected evidence intent.
- `/verify-quality` and other QA owners retain QA evidence/verdict authority. A QA
  PASS/FAIL is evidence presented to UAT; it is not copied into scenario execution
  result without witnessed UAT execution.
- `/test-condition`/QA own technical probe/test detail. UAT Scenario uses business
  language and does not own **test implementation**, framework or exhaustive QA
  coverage.
- Product/business approver authority is explicit. The scenario actor/representative
  does not automatically own the **overall UAT decision** or release authority.

## Completion

`READY` requires an **exact scenario/source fixed point**, authorized source truth,
business goal, actor/context, **representative data**, **fixed candidate/environment**,
fixed preconditions, observable steps, **expected and negative outcomes** including
material interrupted/partial semantics, evidence intent, **limitations**, and a
named decision authority.

For scenario authoring, `READY` is compatible with execution result `NOT_RUN`; it
**does not mean** the scenario passed or UAT accepted the candidate. Any non-
`NOT_RUN` execution result requires exact witnessed evidence under its execution
owner and cannot carry to a changed scenario/candidate/environment/source fixed
point.
