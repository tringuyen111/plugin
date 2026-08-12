# Artifact Linking Reference

Read this reference before creating, superseding, materially changing, or handing off an artifact that another workflow will consume.

**Canonical maintainer source:** Artifact Continuity (canonical source only)

## Project owns truth

The skill system does not own project status. A project may keep requirements, designs, work items, source, and evidence in different systems, but exactly one selected source owns each meaning—especially task status.

A report or handoff references canonical artifacts; it must not create a shadow tracker or silently overwrite a materially changed decision.

## Minimum portable envelope

Use these fields when applicable; the project may serialize them as Markdown, YAML, JSON, a tracker item, or another selected format:

```yaml
artifact_id:
artifact_type:
project_truth_location:
owner_role:
status:
source_artifacts: []
decisions: []
assumptions: []
unresolved: []
evidence: []
supersedes: []
affected_artifacts: []
next_owner:
next_route:
```

Required whenever applicable: `project_truth_location`, `owner_role`, `status`, `source_artifacts`, `unresolved`, `evidence`, and `next_owner`.

Omit genuinely irrelevant fields, but never omit a blocker, fallback, missing evidence, supersession, or downstream impact merely to shorten output.

## Linking and change rules

- A technical task traces to acceptance, a non-functional requirement, a technical invariant, a migration, a risk, or an evidence requirement.
- A test result becomes evidence only when captured in the relevant environment.
- A release decision references the evidence used.
- Documentation traces to released or explicitly preview behavior.
- Material changes record `supersedes`, `change_reason`, `affected_artifacts`, `reverification_required`, and `approval_required`.
- Learning updates an opportunity or product decision; it does not silently mutate approved scope.

See [cross-role examples](examples/artifact-handoff-examples.md).
