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
binding_freshness: CURRENT | STALE | UNBOUND
verification_state: VERIFIED | UNVERIFIED
agreement_state: CONSISTENT | CONFLICTING | NOT_ASSESSED
```

Treat these as independent edge truth axes:

- **Binding Freshness** is `CURRENT` when the exact recorded endpoint revisions
  still match the current canonical endpoint meanings, `STALE` when a materially
  superseded endpoint revision remains bound, and `UNBOUND` when an exact source
  or target revision is missing. Revision equality is not relationship proof.
- **Verification State** is `VERIFIED` when usable truth basis/evidence establishes
  the relationship for the revisions actually recorded on the edge; otherwise it
  is `UNVERIFIED`. Historical verification can remain true after Binding Freshness
  becomes `STALE`; it simply no longer proves current coverage.
- **Agreement State** is `CONSISTENT` when canonical declarations and material
  observed/source/runtime evidence agree, `CONFLICTING` when they disagree, and
  `NOT_ASSESSED` when that comparison has not been made or is not required for the
  bounded claim. Rebinding or verification does not silently resolve disagreement.

One edge may therefore be `STALE + VERIFIED + CONFLICTING`, or
`UNBOUND + UNVERIFIED + CONFLICTING`. Current coverage requires
`Binding Freshness = CURRENT`, `Verification State = VERIFIED`, and no unresolved
`CONFLICTING` Agreement State for the claim being made.

When either endpoint changes materially, every edge bound to the superseded
revision becomes `STALE` until the relationship is rebound/revalidated against
the new revision. Continuity of artifact ID, title, filename, keyword, or link
similarity does not preserve Binding Freshness by itself.

When canonical declarations and observed/source/runtime dependency evidence
disagree, keep the competing facts visible as `Agreement State = CONFLICTING`
until the canonical owner resolves them. Analysis-derived or observed edges may
be used as impact-analysis evidence, but they do not silently become canonical
graph writes. Persisting or changing a canonical edge requires the selected
truth source plus authority under the external side-effect policy.

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

Graph coverage must preserve Binding Freshness, Verification State, and
Agreement State independently. Counts/findings may overlap because one edge can
carry multiple defects. A traceability artifact references canonical status; it
does not own status. A link proves a relationship at a bound fixed point, not the
correctness or acceptance of either endpoint.
