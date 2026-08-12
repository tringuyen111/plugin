# Domain Pack Contract

Every reusable domain pack declares:

```markdown
# Domain Pack Contract
## Purpose and explicit non-goals
## Role and decision owners
## Lifecycle coverage
## Skills and invocation policy
## Shared references
## Provider adapters
## Deterministic scripts/tools
## Artifact graph and canonical truth
## Upstream/downstream packs
## Approval and side-effect gates
## Completion model
## Behavioral eval suite
## Component lifecycle and evidence
## Installation and context-load policy
## Versioning, compatibility, migration, and deprecation
```

A domain pack composes with the Delivery Plane router and is governed through the System Plane. It must not introduce a competing router in either plane, duplicate core ownership, or require every project to adopt provider-specific storage.

Review overlap with core and neighboring packs before promotion. Shared methods belong in one owner reference; provider details belong in adapters; project policy stays in the target project.


## Component lifecycle invariant

For every proposed component, record artifact class, bounded capability/gap where applicable, owner, lifecycle state (`DRAFT | REVIEWED | EVALUATED | PROMOTED | MONITORED | REVISED | DEPRECATED` as applicable), assurance tier, evidence status, blockers, and canonical artifact/revision. Pack-level review/evaluation does not promote a child. A component with `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, missing audit, or missing required qualification stays unresolved even when the pack composition proposal is accepted.

This fixed contract is a pack governance artifact. Its headings are **not** a child `SKILL.md` or child skill prompt template; each component keeps the runtime structure appropriate to its own capability and artifact class.
