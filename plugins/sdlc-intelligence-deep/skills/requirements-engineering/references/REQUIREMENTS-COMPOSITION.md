# Requirements Composition

Use this projection only when durable cross-session/cross-view governance or a requested requirements document view is materially useful. It is an index/projection over canonical Product/BA/technical truth, not a mandatory requirements artifact and not a substitute for child semantics.

Do not create synthetic identities merely to fill the projection. Use project-native identities/revisions when they exist. If no durable composition/document record is required, keep the result inline and persistence `NOT_RUN`.

## Contents

1. Semantic / representation / document distinction
2. Composition projection
3. Cross-lifecycle continuity
4. Downstream document sections
5. Closure rules


## Keep three things distinct

```text
REQUIREMENT SEMANTICS
  business / stakeholder / functional / quality / transition meaning
        |
        v
SEMANTIC REPRESENTATION
  rule / decision table / use case / story / AC / quality claim / model
        |
        v
DOCUMENT / AUDIENCE PROJECTION
  project-native PRD / BRD / SRS / requirements package / other view
```

A document may aggregate many semantics. Its existence does not create a new semantic owner unless project authority explicitly says that document is canonical for a particular claim.

## Composition projection

```markdown
# Requirements Composition / Document View — <scope / material question>

**Projection identity / revision:** <project-native, only when governed>
**Projection type / audience:** <composition index | PRD | BRD | SRS | project-native view | other>
**Status / authority:** <project-native lifecycle state, only when governed>
**Product/domain source identity / revision:**
**BA owner / document owner:**

## Material question and decision boundary

- Question / downstream decision this view must make clear:
- Audience / use of this projection:
- Declared scope / non-goals:
- What would make the projection insufficient or stale:

## Source truth

| Truth class | Statement / scope | Exact evidence or authority | Affected semantic question / owner |
|---|---|---|---|
| CURRENT_VERIFIED | ... | ... | ... |
| TARGET_AUTHORIZED | ... | ... | ... |
| PROPOSED_OR_ASSUMED | ... | ... | ... |

## Requirement hierarchy coverage

Include only material rows; do not manufacture a full hierarchy.

| Requirement class | Canonical meaning / source | Exact revision | Why material | Unresolved limit |
|---|---|---|---|---|
| business | ... | ... | ... | ... |
| stakeholder | ... | ... | ... | ... |
| functional solution | ... | ... | ... | ... |
| quality solution | ... | ... | ... | ... |
| transition | ... | ... | ... | ... |

## Selected semantic representations

Include only material rows.

| Semantic need | Canonical owner / artifact or inline result | Exact revision / source | Why this representation is needed | Current status / unresolved limit |
|---|---|---|---|---|
| concept/context | domain-modeling / ... | ... | ... | ... |
| actor goal/interaction | Requirements Use Case branch / ... | ... | ... | ... |
| policy/rule | Requirements Business Rule branch / ... | ... | ... | ... |
| delivery value slice | Requirements User Story branch / ... | ... | ... | ... |
| observable acceptance | Requirements Acceptance Criteria branch / ... | ... | ... | ... |
| measurable quality | Requirements Quality Requirement branch / ... | ... | ... | ... |
| project-native state/decision/other model | ... | ... | ... | ... |

Do not add an empty row merely because a capability exists.

## Cross-cutting requirement truth

Record only dimensions that can change interpretation or lifecycle.

| Semantic claim | Source / authority | Rationale / value link | Scope / effective time | Assumption / dependency | Conflict / precedence | Validation / unresolved falsifier |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |

## Shared identities / semantic alignment

Record only identities/meanings that span multiple selected views and could be misread downstream. Prefer canonical domain/project identities; do not invent a registry by default.

| Shared meaning | Canonical identity / context | Views using it | Conflict / translation risk |
|---|---|---|---|
| ... | ... | ... | ... |

## Cross-view consistency and conflicts

| Shared dimension | Views / exact revisions | Consistent meaning or conflict | Canonical owner for correction | Downstream impact |
|---|---|---|---|---|
| actor / concept / scope / state / rule / acceptance / quality / transition | ... | ... | ... | ... |

## Material behavior semantics

Only when relevant, summarize cross-view coverage for state, invalid transition, interruption/UNKNOWN outcome, duplicate/retry intent, partial effect/compensation, multi-actor conflict, or effective-time semantics. Link canonical child truth; do not copy full flow/rule/AC bodies.

## Open decisions

| Decision / missing authority | Evidence / conflicting sources | Owner | Blocking scope | Re-entry point |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## Cross-lifecycle continuity

Only when an authorized requirement revision already has downstream consumers/evidence and lineage/change-impact analysis is material, record the exact changed source/revision and use `traceability`. Do not add traceability as an empty requirement-view row.

## Downstream / document sections

Project the canonical semantics needed by the actual audience. A PRD/BRD/SRS-like section may summarize or link Product/BA/technical truth, but it must not silently redefine a child-owned semantic claim.

### Design

### Architecture

### Planning

### QA
```

## Closure rules

A durable composition/document projection is current only while its source fixed point and linked material revisions remain current for the meaning consumed. When a linked source changes materially, reopen only affected semantics/sections/consumers first; do not rewrite unrelated truth.

An older **Behavior Package** or project document may be consumed as historical/source evidence during migration. Resolve its canonical semantic sources and current authority, but do not keep extending a duplicate fixed-section package when the authoritative truth lives elsewhere.
