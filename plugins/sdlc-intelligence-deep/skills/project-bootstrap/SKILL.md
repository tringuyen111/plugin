---
name: project-bootstrap
description: Establish or repair a target project's working context and durable configuration when the project is new, inherited, moved, or internally inconsistent. Inspect existing project/host instruction and configuration surfaces, classify facts by authority/scope/volatility/consumer/canonicality, reconcile conflicts, and materialize only the smallest durable configuration actually needed. Use Project Capability Profile v4 only as an optional compatibility artifact when the project explicitly needs durable cross-system normalization; do not use Bootstrap as a universal lifecycle gate or permission engine.
---

# Project Bootstrap

Use this Skill when work is blocked or unreliable because project context/configuration is missing, conflicting, stale, or attached to the wrong owner. Bootstrap establishes **usable project truth**, not a Plugin-owned control plane.

## Accountable outcome

Complete Bootstrap when the requested consumer can locate the authoritative project context/configuration and can distinguish:

- durable project truth from derived or live observations;
- project instructions from host/runtime settings;
- configured provider preference from current provider availability;
- technical capability from operation authority/permission;
- canonical truth from compatibility projections or caches.

A Project Capability Profile is optional. If existing project-native configuration already owns the needed meaning, reuse or repair it rather than creating a duplicate profile.

## Ownership boundary

Bootstrap may inspect and reconcile project instructions/configuration, add a bounded pointer to an already selected instruction surface, or materialize an explicitly justified compatibility profile. It does not decide Product requirements, architecture, delivery scope, provider implementation, task status, deployment authority, or generic workflow ownership.

A writable tool is not authority. Provider availability is not permission. Schema validity is not semantic freshness.

## Inputs

Use the strongest available evidence, including:

- project-native instruction/context files and their scope/precedence;
- existing configuration/profile files and project documentation;
- canonical source, requirements, design, tracker, decision, and evidence locations;
- explicit project/user authority and durable policy decisions;
- host settings, current tools/connectors/MCP sources, and permissions **only when material to the bootstrap request**;
- persistence capability/location when cross-session discovery is actually required.

Unknown is a valid result. Do not invent values to make a configuration look complete.

## Core decision model

Before creating or persisting anything, read [Context Classification](references/context-classification.md). Classify each material fact by:

```text
authority x scope x volatility x consumer x canonicality
```

Then choose the smallest treatment:

```text
existing authoritative native config suffices -> reuse or repair in place
conflicting authoritative candidates           -> block and reconcile ownership
missing durable project fact                   -> add to the narrowest approved owner
live availability/auth/tool observation        -> discover now; keep live-only
cross-system durable normalization is required -> optional Profile v4 compatibility artifact
operation approval/permission                  -> leave to the real authority/runtime boundary
```

Do not centralize facts merely because they are all useful to an agent.

## Workflow

### 1. Inspect the real project context before creating a new one

Search the project and connected systems for existing instruction/configuration surfaces. Determine their scope and precedence rather than treating every file as a competing global profile.

Examples include repository/project instructions, subtree-specific instructions, host settings, project settings, provider configuration, existing Project Capability Profile files, and canonical domain sources.

If two artifacts both claim the same canonical meaning with unresolved authority, do not create a third artifact. Preserve the conflict and return `BLOCKED` until ownership can be resolved.

### 2. Build a project-context map, not a giant profile

For each material meaning, record:

```yaml
meaning:
  authority:
  scope:
  canonical_source:
  consumer:
  volatility: durable | live
  current_state: established | conflicting | absent | unknown
  treatment: reuse | repair | add | discover-live | normalize | block
```

A canonical source may be a repository file, external document, tracker, design system, host configuration, or another project-owned system. Do not default to GitHub, Jira, Figma, local files, or `work/current/`.

### 3. Resolve only the live questions that matter now

Do not inventory every possible tool/provider just because Bootstrap is running.

When the bootstrap request depends on current runtime capability, inspect the live source/tool contract. Keep configured intent and live observations separate.

Use `capability-resolver` only when provider/source/fidelity/fallback selection is itself a material decision. A single obvious live tool/source does not need a resolver hop.

Do not persist live availability, authentication state, discovered actions, or temporary sandbox reachability as timeless project truth unless a separate artifact explicitly owns freshness/provenance semantics.

### 4. Preserve authority at the correct boundary

Record durable project policy only when the project or authorized owner actually defines it. Missing policy remains unresolved; do not manufacture restrictive or permissive defaults for schema convenience.

Do not turn project bootstrap into an operation authorization engine. Commit/deploy/destructive-action permissions may live in host settings, repository policy, organization controls, or explicit user approval. Bootstrap may point to that authority; it must not silently replace it.

### 5. Materialize only what has earned persistence

Prefer, in order:

1. reuse an already authoritative project-native configuration;
2. make the smallest authorized repair to that configuration;
3. add a bounded pointer/import when the host needs discovery and the meaning already lives elsewhere;
4. create a Project Capability Profile only when the project explicitly selects it or durable cross-system normalization is necessary.

Do not create projection files for tracker labels, domain context, provider state, or status when the canonical system already owns that meaning.

### 6. If Profile v4 is justified, use it as compatibility state

Read [Profile v4 Compatibility](references/profile-v4-compatibility.md) only when an existing Profile v4 must be reconciled/migrated or the project explicitly chooses a new Profile v4.

Before any Profile v4 candidate becomes canonical, run the exact bundled validator from the Skill directory:

```bash
python3 "<skill-dir>/scripts/validate_profile.py" "<candidate-profile.json-or-yaml>"
```

Validation failure keeps the candidate non-canonical. Missing validator dependency/schema means structural qualification is `BLOCKED`. A schema-valid profile may still be stale, unauthorized, or semantically unnecessary.

### 7. Verify persistence and stop at the bootstrap outcome

Persist only at an approved project location and inspect the resulting artifact when possible. If durable persistence is required but unavailable, return `BLOCKED`; if the current bounded task can continue safely with session-visible truth, return `PARTIAL` and state what is not durable.

Do not route back to `/sdlc`, invent a `next_owner`, or serialize a workflow-control result merely because Bootstrap finished.

## Completion semantics

Return the form useful to the request, but make these truths explicit when material:

- what project context/configuration was inspected;
- the authority/scope/canonicality conflicts found;
- what was reused, repaired, added, normalized, or deliberately left live-only;
- persistence result and exact location/revision when a durable artifact changed;
- live observations that must be re-discovered later;
- unresolved authority or missing context;
- Profile v4 validation result when Profile v4 was actually materialized.

`READY` means the requested consumer can proceed without guessing which project truth/configuration applies. It does not mean every provider is available, every policy is decided, or every future workflow is authorized.
