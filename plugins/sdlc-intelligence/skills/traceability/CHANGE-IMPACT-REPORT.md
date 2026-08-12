# Change Impact Report Contract

Use the project's selected serialization while preserving these semantics.

```yaml
artifact_id:
artifact_type: change_impact_report
project_truth_location:
owner_role: Business Analysis
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
    next_route:

unaffected_claims:
  - artifact_id:
    invariance_boundary:
    evidence: []
    confirming_owner:

ordered_handoffs:
  - sequence:
    to_owner:
    decision_class:
    source_artifacts: []
    unresolved: []
    requested_decision:
    completion_evidence:

release_consequences:
  compatibility:
  migration:
  rollback:
  monitoring:
  documentation:
  metric_definition:

integration_result_manifest:
  # Canonical machine truth is `architecture/capabilities/integration-result.schema.json` schema v4.
  # Do not copy provider/policy/operation/postcondition/compensation fields into this report.
  record_ref:
  record_sha256:

persistence_note: <human-readable summary or NOT_REQUESTED; never overrides the manifest>

evidence: []
next_owner:
next_route:
```

Rules:

- `next_route` names the next authoritative workflow required to make the branch
  actionable, not the eventual executor.
- An implementation branch may use `/implement` only when a current approved
  canonical work item binds the changed revision, evidence target, and selected
  task-status owner. Otherwise route to `/to-tickets`, the project-selected work
  owner, or `/project-bootstrap` when that owner is unknown.
- Each material `path_from_change` must be inspectable down to revision-bound edge IDs, relationship type, source/target artifact IDs and revisions, edge state, and truth basis. A stale/conflicting/unverified edge stays visible rather than disappearing from the path.
- `graph_quality` must preserve stale, conflicting, and unverified edge counts/findings; missing or superseded endpoint revisions cannot be counted as current graph coverage.
- Do not create a second source of task or artifact status.
- Do not omit unknown branches or denied writes. For any attempted write, open the referenced Integration Result Manifest and preserve failed/unverified postcondition or compensation truth; this report cannot upgrade it.
- Do not claim an artifact is unaffected without an invariance boundary and
  evidence.
- Do not interpret `READY` as downstream implementation, QA, UAT, or release
  completion.
