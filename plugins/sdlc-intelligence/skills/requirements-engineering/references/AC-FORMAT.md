# Governed Acceptance Criterion Artifact

Use this projection only when the user/project requires durable canonical Acceptance Criteria, exact source/revision traceability, supersession/change impact, or a formal governed record. Do not use it merely to draft or review lightweight criteria.

```markdown
# AC-<id> — <observable condition>

**Criterion revision:**
**Criterion maturity:** DRAFT | REVIEWED | APPROVED | SUPERSEDED
**Criterion truth basis:** CURRENT_VERIFIED | TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Canonical source identity / revision(s):**
**Business Rule / NFR source revision(s), if material:**
**Acceptance semantics owner / scope:**

## Observable condition

<Concise criterion in checklist, rule statement, Given/When/Then, or other clear domain form.>

## Concrete examples / boundaries

- Example or boundary that materially clarifies scope:
- Negative / no-change guarantee, when material:
- Open question / owning authority, when material:

## Stateful / interrupted semantics

_Include only when material; derive detailed semantics from `AC-CONTINUITY.md`._

- UNKNOWN / pending observable:
- Reconciliation / final observable:
- Already-real partial business effect:
- Duplicate / repeat-intent business guarantee:
- Business-visible commitment / compensation consequence:
- Multi-actor / effective-time branch:

## Source behavior coverage

| Canonical source obligation / revision | Criterion / lineage coverage | Disposition / owner |
|---|---|---|

**Unresolved source obligations:**

## Verification intent

<Observable evidence need that QA can turn into test conditions. Do not prescribe framework, environment setup, test code, storage, or cleanup here.>

## Canonical downstream references

_Add only real canonical references that already exist; do not copy their mutable status._

- Test condition / executable probe:
- QA evidence / verdict record:
- UAT / business acceptance decision:
- Waiver / risk-acceptance record:

## Supersession / change impact

<When this is a material revision, identify the superseded criterion/source fixed point and the downstream artifacts/evidence that require re-evaluation.>
```
