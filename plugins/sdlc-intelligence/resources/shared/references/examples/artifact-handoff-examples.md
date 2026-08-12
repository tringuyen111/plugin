# Cross-Role Artifact and Handoff Examples

These examples demonstrate the semantic envelope. They do not prescribe one storage format.

## Product to Business Analysis

```yaml
artifact_id: OUT-014
artifact_type: product-outcome
project_truth_location: docs/product/outcome.md
owner_role: Product
status: APPROVED
source_artifacts: [EVD-PROB-008, OPP-005]
decisions:
  - Reduce failed first-time workspace setup.
assumptions:
  - Existing instrumentation distinguishes new workspaces.
unresolved:
  - Exact permission exceptions need domain-owner input.
evidence: [analytics/query-2026-08-04.md]
affected_artifacts: []
next_owner: Business Analysis
next_route: /define-behavior
```

## Engineering to QA

```yaml
artifact_id: TASK-118
artifact_type: technical-task-result
project_truth_location: tracker://TASK-118
owner_role: Engineering
status: IMPLEMENTED
source_artifacts: [US-031, AC-031-1, ADR-009]
decisions:
  - Keep authorization enforcement server-side.
assumptions: []
unresolved:
  - Production identity provider was not exercised.
evidence:
  - tests/auth-integration.log
  - artifacts/access-denied-response.json
affected_artifacts: [TEST-044]
next_owner: QA
next_route: /verify-quality
```

## QA to UAT or Release

```yaml
artifact_id: EVD-204
artifact_type: qa-verification-package
project_truth_location: evidence://release-candidate-17/qa
owner_role: QA
status: VERIFIED
source_artifacts: [AC-031-1, NFR-012, TASK-118]
decisions:
  - Acceptance behavior passed in test environment.
assumptions: []
unresolved:
  - Production rollout authority remains outside QA.
evidence:
  - evidence://release-candidate-17/qa/results.json
supersedes: []
affected_artifacts: [UAT-021, REL-017]
next_owner: Business/UAT Approver
next_route: /accept-uat
```
