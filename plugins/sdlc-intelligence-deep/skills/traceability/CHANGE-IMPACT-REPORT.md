# Change Impact Report Contract

Use the project's selected serialization while preserving these semantics.

```yaml
artifact_id:
artifact_type: change_impact_report
project_truth_location:
owner_capability: traceability
status: READY | PARTIAL | BLOCKED | FAILED
analysis_revision:

approved_change:
  artifact_id:
  old_revision:
  new_revision:
  decision_owner:
  approval_evidence: []
  change_reason:
  materiality:
  scope: []

source_authority: []
graph_revision:
graph_quality:
  current_edge_count:
  stale_edge_count:
  conflicting_edge_count:
  unverified_edge_count:
  findings: []
assumptions: []
unresolved: []

impact_summary:
  direct_count:
  transitive_count:
  evidence_stale_count:
  release_exposed_count:
  unknown_count:
  no_material_impact_count:

affected_artifacts:
  - artifact_id:
    artifact_type:
    current_revision:
    maturity:
    dependency_class: SEMANTIC | CONTRACT | IMPLEMENTATION | VERIFICATION | RELEASE | DOCUMENTATION | METRIC | UNKNOWN
    impact_classes: []
    path_from_change:
      - edge_id:
        relationship_type:
        source_artifact_id:
        source_revision:
        target_artifact_id:
        target_revision:
        edge_state: CURRENT | STALE | CONFLICTING | UNVERIFIED
        truth_basis:
    stale_reason:
    confidence: CONFIRMED | LIKELY | POSSIBLE | UNKNOWN
    evidence: []
    canonical_owner:
    required_actions: []
    blocking_dependencies: []
    first_unresolved_owner_action:

unaffected_claims:
  - artifact_id:
    invariance_boundary:
    evidence: []
    confirming_owner:

ordered_owner_actions:
  - sequence:
    owner:
    decision_or_artifact:
    source_artifacts: []
    unresolved: []
    requested_action:
    completion_evidence:

release_consequences:
  compatibility:
  migration:
  rollback:
  monitoring:
  documentation:
  metric_definition:

persistence:
  requested: false
  canonical_target:
  status: NOT_REQUESTED | WRITTEN | DENIED | UNAVAILABLE | FAILED | UNVERIFIED
  provider_result_ref:
  postcondition_evidence: []
  limitation:

evidence: []
```

Rules:

- Record the first unresolved owner action needed to make an affected branch actionable; do not encode a workflow route table.
- An implementation branch is actionable only when a current approved canonical work item binds the changed revision and evidence target. Otherwise the canonical planning/work owner must reconcile that work contract first.
- Each material `path_from_change` must be inspectable down to revision-bound edge IDs, relationship type, source/target artifact IDs and revisions, edge state, and truth basis. A stale/conflicting/unverified edge stays visible rather than disappearing from the path.
- `graph_quality` must preserve stale, conflicting, and unverified edge counts/findings; missing or superseded endpoint revisions cannot be counted as current graph coverage.
- Do not create a second source of task or artifact status.
- Persistence is optional unless explicitly required. When attempted, preserve the actual canonical target, provider/tool result when one exists, and re-read postcondition evidence. A denied or unverified write cannot be upgraded by this report.
- Do not claim an artifact is unaffected without an invariance boundary and evidence.
- Do not interpret `READY` as downstream implementation, QA, UAT, or release completion.
