# Tracker Capability Contract

Planning skills own planning semantics. A tracker provider owns only storage and tracker operations. The target project owns the canonical work truth.

## Required resolution

Resolve only the semantic capabilities required by the current branch:

```text
tracker.query              # find candidates by stable planning identity, revision, relationship, or state
tracker.read               # inspect exact canonical items and current state
tracker.create             # create a missing canonical work item
tracker.update             # apply a bounded content/metadata patch
tracker.change_state       # apply an authorized mapped state transition
tracker.link_dependencies  # create or update blocking/parent relationships
```

Do not infer availability from a git remote, installed CLI, remembered MCP schema, provider name, or prior session. Use the Project Capability Profile, live discovery, policy, approval, and `/capability-resolver`.

## Canonical status rule

Exactly one location owns task status for a project. A local Markdown artifact is a provider only when the profile or an established project convention selects its path and identity scheme. Never silently create `tickets.md`, `.scratch/`, `work/current/`, or another ledger as a convenience.

## Stable planning identity

Reconciliation must not match by title alone. Use the strongest available combination of:

```text
canonical parent/scope identity
+ source artifact identity and approved revision
+ stable slice/work-item key
+ canonical tracker identifier when already published
```

A low-confidence or conflicting match is not an update target. Mark the operation as ambiguous and require approval or owner resolution.

## Reconciliation changeset

The planning owner first derives a provider-neutral changeset:

```text
SKIP_ALREADY_CURRENT
CREATE
UPDATE
CHANGE_STATE
LINK_DEPENDENCY
REQUIRES_OWNER_DECISION
```

Every mutation becomes a Capability Operation Envelope and is evaluated through the Capability Execution Policy before provider translation. The changeset declares whether safe independent partial progress exists; default is `false`.

Provider mappings translate semantic work and operation contracts into issues, fields, labels, comments, relationships, files, or links. Missing native relationships use only an explicitly approved mapped representation with named limitations; planning logic is not duplicated in adapters.

Provider examples live in `provider-mappings/tracker-examples.json`. They demonstrate compatibility, not automatic availability.

## Verification and failure truth

- Read-after-write or equivalent consumed-output verification is required for every applied mutation.
- A successful tool response without verified postconditions is `FAILED`.
- Missing canonical work owner: `BLOCKED`; route to project bootstrap or the project owner.
- Read/query available but writes unavailable: analysis may be `PARTIAL`; no mutation may be claimed.
- Local provider selected but path/identity convention missing: `BLOCKED`.
- Provider lacks a required semantic capability: `UNSUPPORTED`; do not improvise an unapproved representation.
- Applied operations plus unresolved operations are `FAILED` unless the changeset declared safe independent partial progress before execution and canonical state remains coherent.
- Never create shadow status to hide partial writes or contradictory canonical state.
