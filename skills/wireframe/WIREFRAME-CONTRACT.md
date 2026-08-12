# Wireframe Contract

Use provider-neutral identities. `canonical_identity` binds the logical
wireframe to the project-selected Design truth location; it is not a tracker or
provider-specific identifier unless the project chose that representation.

```yaml
wireframe_id:
canonical_identity:
project_truth_location:
revision:
maturity: DRAFT | REVIEWED | APPROVED | SUPERSEDED
design_owner:
state_id:
flow_id:
device:
viewport:
page_goal:
primary_action:
secondary_actions:
source_artifacts:
missing_inputs:
unresolved_design_decisions:
inspection_evidence:
affected_artifacts:
next_owner:
next_route:
```

`maturity` describes the Design artifact only. Implementation, QA, UAT, and
release state remain with their canonical owners and are referenced rather than
copied here.

For each meaningful element record as applicable:

```text
business purpose
source field/content
information role / distinct user question when repetition is material
validation/rule
visible states
navigation / continuation semantics
interaction target and nested action/cue/decoration semantics when material
error wording/behavior
edge/security/accessibility notes
```

`inspection_evidence` records the artifact/version actually opened or inspected
when evidence is material to the handoff. Keep unresolved Design decisions and
missing inputs visible; do not hide them in a side summary.
