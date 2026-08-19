# User Story Output Projections

Use this reference only when the current request needs an explicit output shape. Choose the lightest projection that preserves the required truth. Story semantics come first; no field is a reason to invent missing IDs, revisions, decisions, or downstream status.

## 1. Lightweight story — default

Use for drafting, workshop refinement, backlog discussion, or review when durable project persistence is not required.

```markdown
## Story

As a <specific actor>, I want <capability>, so that <benefit>.
```

The three-part sentence is optional. A free-form actor/value statement is equally valid when it carries the same semantics.

Add only what is material:

```markdown
## Slice boundary / non-goals
- Value delivered by this slice:
- Explicitly out of scope:

## Material assumptions / dependencies
- <only decision-changing items>

## Source pointers
- <only real source links/identities that are available and useful>

## Open questions
- <only questions that can change actor/value/scope/slice/dependency/confirmation>
```

Do not add empty Story IDs, revision tables, implementation links, QA links, release links, or change-impact sections merely for completeness.

## 2. Governed persisted Story — conditional

Use when the user/project is creating or updating a canonical Story artifact, requires exact revision/source binding, or needs change-impact traceability.

```markdown
# <real story identity when one exists> — <short capability>

**Story revision:** <real revision only>
**Story maturity:** DRAFT | REVIEWED | APPROVED | SUPERSEDED
**Target truth basis:** TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Product source identity / revision:** <real value only>
**Behavior / Use Case source identity / revision:** <real value only when material and available>
**Current verified context reference:** <when material>
**Actor:** <real actor identity/name>

## Story
<concise actor-capability-benefit statement>

## Slice boundary / observable value
- Actor-visible/business outcome delivered by this slice:
- Explicitly out of scope:
- Why this remains one coherent value/behavior boundary:

## Decision-relevant constraints
- Product scope / non-goals:
- Business Rule revisions:
- NFR revisions:
- Product outcome/metric context (link only; not Story-owned acceptance/priority):

## Dependencies and assumptions
| Dependency / assumption | Canonical reference | Owner / source revision | Blocking effect | If unresolved/unmet |
|---|---|---|---|---|

## Acceptance continuation
- Use the **Acceptance Criteria branch** with the grounded Story meaning and any real source fixed point.

## Technical enablers discovered
- Link Engineering/technical work; do not rewrite migrations, refactors, infrastructure, observability, or similar work as actor stories.

## Downstream truth references
- Add canonical implementation / QA / release references only when they really exist and are needed for navigation or change impact.

## Change impact
- When this persisted approved Story/source revision changes materially and downstream artifacts exist, use `/traceability` for impact analysis.

## Open questions
```

### Persistence rules

- Exact source/revision binding is mandatory only when the project actually has that canonical truth or the persistence operation requires it.
- Never manufacture IDs/revisions to fill the governed projection.
- A missing Use Case reference is not an error unless Use Case semantics are materially required for the Story boundary.
- Downstream implementation/QA/release references are pointers only; their mutable status never becomes Story maturity.
