# Traceability Contract

Traceability is a revision-bound graph. An artifact ID identifies a logical
artifact; it does not prove that a relationship still holds for the artifact's
current meaning.

## Revision-bound edge fixed point

Every material canonical graph edge must preserve at least:

```yaml
edge_id:
relationship_type:
source_artifact_id:
source_revision:
target_artifact_id:
target_revision:
truth_basis:
  kind: CANONICAL_DECLARATION | OWNER_CONFIRMATION | SOURCE_OBSERVATION | RUNTIME_OBSERVATION | EVIDENCE
  evidence: []
edge_state: CURRENT | STALE | CONFLICTING | UNVERIFIED
```

`CURRENT` means the relationship is established for the **exact**
`source_revision` and `target_revision` recorded on the edge and its truth basis
is still usable. Missing endpoint revision, unresolved evidence/provenance, or
an unknown truth basis is `UNVERIFIED`, never current coverage.

When either endpoint changes materially, every edge bound to the superseded
revision becomes `STALE` until the relationship is revalidated against the new
revision. Continuity of artifact ID, title, filename, keyword, or link similarity
does not preserve edge freshness by itself.

When canonical declarations and observed/source/runtime dependency evidence
disagree, keep the competing facts visible and use `CONFLICTING` until the
canonical owner resolves them. Analysis-derived or observed edges may be used
as impact-analysis evidence, but they do not silently become canonical graph
writes. Persisting or changing a canonical edge requires the selected truth
source plus authority under the external side-effect policy.

## Relationship vocabulary

Minimum relationship types:

```text
OUTCOME_SUPPORTS_SCOPE
SCOPE_CONTAINS_USE_CASE
RULE_GOVERNS_BEHAVIOR
USE_CASE_REALIZED_BY_STORY
STORY_ACCEPTED_BY_AC
QUALITY_REQUIREMENT_VERIFIED_BY_TEST
AC_IMPLEMENTED_BY_TASK
TASK_CHANGES_SOURCE
TEST_PRODUCES_EVIDENCE
EVIDENCE_SUPPORTS_AC
UAT_ACCEPTS_SCOPE
RELEASE_CONTAINS_TASK
GUIDE_DOCUMENTS_RELEASE
METRIC_EVALUATES_OUTCOME
SUPERSEDES
```

## Gap classifications

```text
MISSING
CONFLICTING
STALE
ORPHANED
DUPLICATED_TRUTH
UNVERIFIABLE
```

Graph coverage must distinguish `CURRENT`, `STALE`, `CONFLICTING`, and
`UNVERIFIED` edges. A traceability artifact references canonical status; it does
not own status. A link proves a relationship at a bound fixed point, not the
correctness or acceptance of either endpoint.
