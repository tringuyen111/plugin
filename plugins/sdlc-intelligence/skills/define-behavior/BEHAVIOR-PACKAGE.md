# Behavior Package Index

The identifiers used by this package are **provider-neutral logical SDLC identities** when these formats are used: `EPC-*`, `UC-*`, `BR-*`, `US-*`, `AC-*`, `NFR-*`, and `ACT-*`. They are not tracker/provider IDs and must not replace a stronger canonical project identity. A provider may map one logical ID to its own resource identifier while the logical ID remains stable across BA artifacts.

`ACT-*` is package-level actor identity, not an independently owned Actor artifact or Skill. Define an actor once in the registry, then reference **one logical actor ID** consistently from Use Cases, User Stories, UAT scenarios, and other BA artifacts. Do not create a second `ACT-*` merely because another provider or artifact uses a different external identifier.

The package is an index/coverage surface. Canonical Use Case, Business Rule, User Story, Acceptance Criteria, NFR, and traceability details remain in their owning artifacts rather than being copied here.

```markdown
# Behavior Package — <feature>

**Status:** DRAFT | REVIEWED | APPROVED | SUPERSEDED
**Product source identity:** <canonical project identity; OUT/EPC logical ID when applicable>
**Product source location:** <canonical resource/path/URL or inline reference>
**Product source revision:**
**BA owner:**

## Product decision-relevant constraints

| Constraint / assumption / non-goal | Product source / revision | Why it constrains behavior | Status / owner |
|---|---|---|---|
| ... | ... | ... | ... |

Preserve only constraints material to BA behavior (for example target segment, unresolved Product assumption, evidence/selection/transferability limit, counter-evidence, or metric/guardrail caveat). Link the canonical Product artifact instead of copying its full evidence corpus. Product metric targets are not automatically BA acceptance criteria.

## Behavior truth model

| Truth class | Behavior statement / scope | Evidence or authority | Affected primitive(s) / decision |
|---|---|---|---|
| CURRENT_VERIFIED | ... | runtime/source/current authority | ... |
| TARGET_AUTHORIZED | ... | exact Product/domain decision revision | ... |
| PROPOSED_OR_ASSUMED | ... | stakeholder/assumption/unresolved | owner / blocker |

## Actor registry

| Logical actor ID | Canonical name / role | Source / authority | Scope | Project / external identity mapping |
|---|---|---|---|---|
| ACT-... | ... | ... | ... | ... |

## Actors and business concepts

Use the actor registry above for identity. This section may explain actor relationships, responsibilities, and domain concepts without redefining an `ACT-*` identity.

## Use Cases

- UC-...

## Business Rules

- BR-...

## User Stories

- US-...

## Acceptance Criteria

- AC-...

## Non-Functional Requirements

- NFR-...

## Business states and errors

Summarize only cross-primitive state coverage; detailed flow/rule/AC semantics stay in their canonical artifacts.

## Semantic coverage

Use only rows material to this feature; a simple stateless interaction need not populate every concern.

| Concern / business operation | Canonical primitive owner / artifact | Covered behavior / guarantee | Open semantic gap / owner |
|---|---|---|---|
| State / invalid transition | UC-/BR-/AC-... | ... | ... |
| Interruption / unknown outcome | UC-/BR-/AC-... | ... | ... |
| Retry / duplicate intent | UC-/BR-/AC-... | ... | ... |
| Partial business effect / compensation | UC-/BR-/AC-... | ... | ... |
| Multi-actor conflict / authority | BR-/UC-... | ... | ... |
| Time-dependent / effective-period rule | BR-... | ... | ... |

## Conflicts and open decisions

| Decision / conflict | Sources / revisions | Authority / precedence basis | Owner | Blocking | Affected artifacts |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## Traceability status

## Design handoff

## Architecture handoff

Include business-visible commitment/recovery guarantees when they constrain technical design; do not prescribe transaction/idempotency/concurrency mechanisms.

## Planning handoff

## QA handoff

Include materially relevant invalid transitions, interruption/unknown outcome, retry/duplicate, partial-effect and time/multi-actor branches as verification intentions; do not author QA verdicts.
```
