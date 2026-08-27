# Acceptance Model

## Contents
1. Typed truth model
2. Fixed points
3. Currentness and invalidation
4. QA dependency semantics
5. Re-entry examples

## 1. Typed truth model

Use a dependency model rather than a linear UAT phase chain:

```text
[AUTHORIZED ACCEPTANCE BASIS]
  --PROJECTS_TO--> [ACCEPTANCE DESIGN]

[ACCEPTANCE DESIGN]
  --EXECUTED_AGAINST--> [EXECUTION FIXED POINT]

[EXECUTION FIXED POINT]
  --PRODUCES--> [WITNESSED BUSINESS EVIDENCE]

[WITNESSED BUSINESS EVIDENCE]
  --SUPPORTS--> [ACCEPTANCE EVALUATION]

[QA EVIDENCE]
  --SUPPORTS_WHEN_REQUIRED--> [ACCEPTANCE EVALUATION or DECISION]

[ACCEPTANCE EVALUATION]
  --SUPPORTS--> [BUSINESS ACCEPTANCE DECISION]

[BUSINESS ACCEPTANCE DECISION]
  --MAY_BE_PERSISTED_AS--> [ACCEPTANCE RECORD]

[CURRENT ACCEPTANCE RECORD]
  --MAY_BE_CONSUMED_BY--> [RELEASE ASSESSMENT]
```

Edges are dependency claims, not mandatory lifecycle order. A request may legitimately stop after any owned node.

## 2. Fixed points

### Acceptance basis/design fixed point
Bind only what controls designed acceptance meaning:

```text
acceptance objective/scope
+ exact authorized Product/Requirements/domain source revisions when available
+ selected representation/revision
+ business/user context assumptions that change expected meaning
= acceptance-design fixed point
```

A candidate/build, QA report, final approver, or durable record identity is not universally part of this fixed point.

Classify source truth:
- `TARGET_AUTHORIZED` — supported by the authorized target source.
- `PROPOSED_OR_ASSUMED` — material behavior/constraint/outcome lacks authority; may be drafted for clarification but not presented as authorized target truth.

### Execution fixed point
Required when claiming witnessed execution:

```text
acceptance-design fixed point
+ exact candidate/build
+ material environment/config
+ representative business data/state
+ actual performer/representative
+ execution time/window
+ evidence identity/provenance
= execution fixed point
```

Do not claim execution results against an unfixed candidate/context.

### Decision fixed point
Required only for an explicit business acceptance decision:

```text
exact accepted scope/candidate meaning
+ current material acceptance evidence/evaluation
+ any required QA evidence actually consumed
+ decision authority
+ conditions/waivers and their applicability
= acceptance-decision fixed point
```

### Persistence/release fixed point
Required only when downstream durable identity matters:

```text
acceptance-decision fixed point
+ exact record revision/digest/equivalent immutable identity
+ record currentness
= release-consumable acceptance identity
```

## 3. Currentness and invalidation

Use `CURRENT | STALE | UNVERIFIED | CONFLICTING` where a fixed-point validity state matters. Preserve historical truth; do not rewrite old evidence/decisions to look current.

| Change | Design | Witnessed evidence | Evaluation/decision | Persistence/release |
|---|---|---|---|---|
| Candidate/build changes; target meaning unchanged | normally `CURRENT` | affected execution `STALE` | candidate-bound decision `STALE` | corresponding handoff `STALE` |
| Authorized requirement/business meaning changes | affected design `STALE` | dependent evidence `STALE` for current target | dependent evaluation/decision `STALE` | dependent handoff `STALE` |
| Material environment/data/state changes | only if design meaning depended on it | affected execution `STALE` | dependent decision may stale | dependent handoff may stale |
| QA revision changes; UAT did not depend on QA | unchanged | unchanged | unchanged | no automatic stale |
| QA revision changes; evaluation/decision explicitly depended on QA | unchanged | witnessed business evidence remains historical/current for what it observed | dependent evaluation/decision requires re-admission/reconfirmation | dependent handoff non-current until refreshed |
| Condition/waiver expires or changes | unchanged | unchanged | affected decision applicability `STALE`/non-current | release consumability non-current |
| Record digest missing/contradictory but decision semantics unchanged | unchanged | unchanged | decision may remain valid in-session/historical | persistence `UNVERIFIED|CONFLICTING`; release consumability not ready |

Do not blanket-invalidate all axes.

## 4. QA dependency semantics

Ask two separate questions:

1. Is QA evidence **applicable/required** by current project policy for this acceptance truth?
2. Even if not universally required, does this specific acceptance evaluation/decision **materially depend** on QA evidence?

If neither: do not manufacture a QA gate.

If yes: bind exact current `verify-quality` evidence and preserve separately:
- QA workflow state;
- QA verification verdict;
- acceptance readiness;
- candidate/scope fixed point;
- report revision/digest/currentness;
- provenance/separation/attestation when policy requires it;
- open defects/gaps.

A QA `PASS` is not witnessed UAT `PASS` and is not business acceptance. A UAT condition/waiver does not rewrite QA evidence.

## 5. Re-entry examples

**Candidate changes after scenarios were authored:** keep design if target meaning is unchanged; re-run affected witnessed acceptance against the new candidate before claiming current candidate evidence/decision.

**Requirement changes one alternate path:** revalidate the affected representation/path and downstream evidence. Do not stale unrelated acceptance coverage merely because the document revision changed.

**QA Q7 -> Q8 after UAT decision, but UAT decision explicitly consumed Q7:** preserve the witnessed user observations; re-admit Q8 and ask the authorized owner to reconfirm only the dependent decision meaning. Do not erase historical acceptance.

**QA changes but UAT never depended on QA:** no automatic UAT invalidation. Release may independently require QA Q8 under its own policy.
