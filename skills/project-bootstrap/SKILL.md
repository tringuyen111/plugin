---
name: project-bootstrap
description: Establish or validate a target project's canonical truth locations, live capabilities, environments, side-effect policy, and retention profile before other skills persist artifacts or choose providers.
---

# Project Bootstrap

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

Use this workflow when a project is new, inherited, moved to a different runtime, or missing a trustworthy answer to any of these questions:

- Where do source, requirements, design, work status, decisions, and evidence live?
- Which environments and capabilities are actually available now?
- Which provider is preferred, and what fallback is acceptable?
- Which writes, commits, deployments, destructive actions, or communications require confirmation?
- Where may handoffs and evidence be retained?
- Which instruction file, triage vocabulary, and domain-context locations should engineering skills consume without creating duplicate projection files?

## Ownership

Project Bootstrap owns discovery and maintenance of the **Project Capability Profile**. It does not own Product discovery, requirements, technical architecture, delivery planning, provider implementation, or project task status.

The profile belongs to the target project or its selected truth system. Never store a user's active profile as reusable state inside this skill pack. Use Project Capability Profile schema version `4`; `profile_revision` identifies the exact profile revision consumed by downstream capability and policy decisions.

`project.id` is the canonical logical project identity used by downstream operation policy. Repository slugs, tracker keys, design-file IDs, and other provider identifiers remain provider/resource mappings; they must not silently substitute another project's policy. Acquire `project.type` and `project.lifecycle_stage` only from project evidence or an authorized owner decision. When either classification is not established, persist `null` and record the unresolved field; do not invent a taxonomy to satisfy schema validation.

## Inputs

Use the strongest available project evidence:

- existing profile and its schema version;
- repository or document structure;
- tracker, design, decision, and evidence locations;
- installed/live tools, connectors, MCP servers, and runtime primitives;
- environment access;
- project policy or explicit owner decisions;
- user request when no durable project source exists;
- existing instruction files and any `extensions.sdlc` engineering-consumer settings.

Unknown is a valid result. Do not infer permission from a missing field.

## Workflow

### 1. Inspect before asking or creating

Search the target project and connected truth systems for an existing profile or equivalent configuration. Record every candidate and which meaning it claims.

If two profiles claim canonical ownership, do not create a third. Return `BLOCKED` until the project owner selects or reconciles the canonical profile.

### 2. Map canonical truth

For each meaning, identify one canonical owner and location:

```yaml
truth:
  source:
  requirements:
  design:
  work_tracker:
  decisions:
  evidence:
```

A value may be `none`, `absent`, `inline`, or `unknown`. Do not default to a repository, `work/current/`, GitHub, Jira, Figma, or local filesystem.

### 3. Discover live capability

Inspect current runtime/tool availability rather than relying on remembered schemas or configured provider names. Invoke `capability-resolver` for each capability needed by the next workflow.
For tracker-backed work, inspect the exact semantic capabilities such as `tracker.read`, `tracker.query`, `tracker.create`, `tracker.update`, and `tracker.change_state` instead of inferring a provider from repository metadata.

Classify observations as:

```text
AVAILABLE | PARTIAL | UNAVAILABLE | DENIED | UNKNOWN
```

Configured provider and live availability remain separate facts.

### 4. Establish policy and retention

Capture policy values **and their authority state**. Under profile schema v4, unresolved policy and protected-decision identity are represented explicitly rather than serialized as guessed values:

```yaml
policy:
  authority:
    status: OWNER_APPROVED | PARTIAL | UNRESOLVED
    owner: <project authority or null>
    evidence: []
    unresolved_fields: []
  commit_policy: forbidden | explicit-confirmation | allowed | null
  deployment_requires_confirmation: true | false | null
  destructive_actions: forbidden | explicit-confirmation | null
  capability_execution:
    auto_apply_reversible: true | false | null
    max_resources_per_operation: <integer or null>
    max_resources_per_changeset: <integer or null>
    same_project_only: true | false | null
    require_postcondition_verification: true | false | null
    cross_system_requires_approval: true | false | null
    public_visibility_requires_approval: true | false | null
    downstream_invalidation_requires_approval: true | false | null
    ambiguous_identity_requires_approval: true | false | null
    decision_class_registry:
      - id: <exact project-owned opaque identifier>
        protected: true | false
retention:
  handoff:
  evidence:
```

Decision-class IDs are exact, case-sensitive, project-owned policy identifiers. Do not normalize aliases, casing, punctuation, or semantically similar labels. Every mutating operation must use IDs that exist in the active profile registry; an unregistered or ambiguous class is unresolved policy and cannot support `ALLOW`. A registry entry with `protected: true` is never compatible with operation authority `NOT_REQUIRED`.

`null` means UNKNOWN / unresolved owner decision and never means permission. Every material unresolved policy path belongs in `policy.authority.unresolved_fields`; use `PARTIAL` or `UNRESOLVED` authority status as applicable. Do not persist a guessed restrictive boolean, budget, or enum merely to make the profile schema-valid. Conservative execution is a downstream operation-policy behavior: when a concrete operation depends on unresolved policy, `/capability-resolver` plus the Capability Execution Policy must yield `REQUIRE_APPROVAL` or `BLOCK`, never infer `ALLOW`.

### 5. Configure engineering consumers in the same profile

When engineering skills need tracker vocabulary or domain-context pointers, store
those settings only under the project-owned `extensions.sdlc` namespace:

```yaml
extensions:
  sdlc:
    instruction_file: AGENTS.md | null
    instruction_pointer: NOT_REQUIRED | REQUIRED | APPLIED | NOT_RUN
    triage_roles:
      needs-triage:
      needs-info:
      ready-for-agent:
      ready-for-human:
      wontfix:
    domain_context:
      mode: single_context | multi_context
      context_location:
      adr_location:
```

The canonical tracker still owns task status. Provider-specific labels, fields,
states, transitions, or frontmatter values are mappings only. Domain pointers do
not duplicate domain truth.

Do not create `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md`, or
`docs/agents/domain.md` by default. If the selected agent host requires discovery,
add only one small pointer to the already selected instruction file. Preserve all
surrounding user content and update an existing pointer in place.

### 6. Reconcile or version the profile

- Update the existing canonical profile when authorized.
- Bind the resulting artifact to an exact `profile_revision` using the target project's established revision convention; downstream resolution and operation policy must reference that exact revision.
- Record schema migration and material changes.
- For profile v3 -> v4 migration, replace `protected_decision_classes` with `decision_class_registry`. Preserve every existing protected string **byte-for-byte** as `{id: <same string>, protected: true}`; do not normalize it and do not invent unprotected classes. Until the project owner establishes the registry entries needed for intended automatic execution, add `policy.capability_execution.decision_class_registry` to `policy.authority.unresolved_fields` and keep authority `PARTIAL`/`UNRESOLVED` as applicable.
- Preserve provider-specific details beneath capability mappings; do not let them redefine domain workflow.
- Preserve project-specific data under the schema-valid top-level `extensions` object. During migration, move unrecognized legacy fields into a stable project-owned namespace instead of deleting them, leaving invalid root keys, or reinterpreting them as core policy.
- Record the previous schema/profile identity, material changes, extension moves, policy authority evidence/unresolved fields, and evidence used. Do not claim migration complete when identity or provenance is unresolved.
- Keep the bootstrap execution result separate from durable profile truth, but bind the result/handoff to the exact `profile_revision` so a later consumer can recover which authority gaps and evidence applied to the profile it read.

### 7. Persist only at an approved location

The writes owned by this workflow are the profile, its explicit migration record, and an optional bounded pointer in an already selected instruction file. Never use `work/current/` or another convenient repository path as the target project's canonical profile unless the project explicitly selected it.

When no approved file or external write capability exists, return the complete profile inline and state that persistence was `NOT_RUN`:

- return `PARTIAL` when the inline profile is sufficient for the current bounded workflow and the next owner can consume it in this session;
- return `BLOCKED` when durable or cross-session profile persistence is required before the requested work can proceed.

Do not report `READY` for an unpersisted profile when the next workflow depends on durable discovery.

## Domain output semantics

The bootstrap result must make the canonical profile location (or truthful non-persistence), profile schema version, exact `profile_revision`, persistence result, project identity, truth/environment/capability summary, policy authority status/evidence/unresolved fields, policy/retention/engineering-consumer settings, assumptions/unresolved decisions, inspected evidence, profile migration/change, and next owner available to the next workflow. The canonical Project Capability Profile remains the durable machine-readable artifact when persistence is required; generic workflow-control evidence does not get stuffed into the profile merely to make provenance visible.

Use the shared Workflow Result Contract for machine-facing workflow state/evidence/blocker/handoff metadata. Present the bootstrap result in the format appropriate to the user's request instead of forcing a fixed result section. `READY` means the next workflow can locate required truth, understand live capability limits, follow policy, and read required triage/domain settings from the canonical profile without a second projection tree. It does not mean every optional capability is available.

Route back to `/sdlc` after bootstrap unless the next owner is already unambiguous.
