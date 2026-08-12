---
name: to-tickets
description: Create and reconcile a canonical executable work graph from approved planning truth, applying bounded policy-authorized tracker mutations and handing only a current approved frontier to implementation.
---

# To Tickets
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before decomposing approved truth into executable slices or reconciling the implementation frontier:** read [Semantic Continuity Contract](../../resources/shared/references/semantic-continuity-contract.md) to preserve material obligations, use one deep-ACTIVE planning unit at a time, and reject silent coverage loss.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any tracker mutation:** read [Capability Execution Policy](../../resources/shared/references/capability-execution-policy.md) and [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md).
- **Before choosing a tracker, provider, connector, MCP action, or local fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md).
<!-- runtime-context:end -->

Own the current executable work graph: vertical work items, stable planning identity, blocking edges, traceability, evidence targets, and the implementation frontier. Read [Tracker Capability Contract](../../architecture/capabilities/TRACKER-CAPABILITY-CONTRACT.md) and resolve every required `tracker.*` capability through `/capability-resolver`.

The target project must identify exactly one canonical work-status owner. If it does not, return `BLOCKED` and route to `/project-bootstrap`; never create a convenient local ledger.

## Ownership boundary

`to-tickets` may diagnose planning readiness, propose options, ask the user to close small gaps, create/reconcile the work graph, and apply planning-owned tracker mutations allowed by policy.

It must not own Product scope, business priority, Architecture decisions, implementation results, quality verdicts, UAT acceptance, or release approval. It may expose those gaps and route them to the canonical owner, but tool availability never authorizes it to close them.

Coordination:

- `traceability` identifies change impact, affected artifacts/work, and why; `to-tickets` reconciles the work graph. `traceability` does not reopen or mutate tracker state.
- `wayfinder` owns destination/decision fog. Work that cannot yet be stated as an independently verifiable slice stays with `wayfinder` or the relevant decision owner.
- `/implement` consumes one item from the current approved frontier. It does not rewrite planning identity, dependencies, or canonical work state to make execution convenient.

## Lifecycle branches

- `CREATE` — approved planning truth exists and no corresponding work graph exists.
- `RECONCILE` — canonical work exists; match current items, skip already-current work, patch bounded drift, and create only missing work.
- `REPLAN` — an approved requirement, ADR, evidence target, or scope revision changed; use change-impact evidence to propose reopen, supersede, update, create, or relink operations.
- `DIAGNOSE` — planning truth, canonical ownership, identity, authority, provider support, or required decisions are missing/conflicting. Preserve the draft and route the exact blocker.

## Process

### 1. Gather authoritative context

Read the approved delivery spec or exact source artifacts, canonical parent/work items, comments/decisions, current tracker state, and linked Product scope, Story/AC/NFR, Visual Contract, ADR, prototype decision, risk, and evidence plan. Build a shallow map of the material incoming semantic obligations and dependencies, then deep-reconcile one planning unit at a time under the Semantic Continuity Contract instead of loading every sibling work item deeply.

Do not recreate missing requirements or prioritize the backlog. A missing or contradictory material truth becomes an explicit discovery/owner gap; route Product, BA, Design, Architecture, QA, UAT, and Release decisions to their owners before treating them as planning truth. Routine reversible planning refinement inside approved truth does not require repeated owner approval.

### 2. Resolve current work and stable planning identity

Use `tracker.query` to find candidates and `tracker.read` to inspect exact items. Match with the strongest available stable planning identity:

```text
canonical parent/scope identity
+ source artifact identity and approved revision
+ stable slice/work-item key
+ canonical tracker identity when already published
```

Never update by title similarity alone. Conflicting or ambiguous identity becomes `REQUIRE_APPROVAL` or a routed owner decision; it is not an automatic mutation target.

### 3. Build or reconcile the executable work graph

Apply [Foundation-Aware Delivery Discipline](../../resources/shared/references/foundation-aware-delivery-discipline.md), then classify each work item with its vocabulary when material:

```text
ARCHITECTURE_DECISION | FOUNDATION | WALKING_SKELETON | VERTICAL_SLICE | MIGRATION | HARDENING | VERIFICATION
```

Every work item must:

- fit one fresh implementation/decision context;
- trace to approved AC/NFR/risk/invariant/technical decision and revision;
- consume named material semantic obligations or preserve an explicit continuity disposition/gap;
- name the runtime entrypoint or observable artifact when executable;
- name the proof boundary and exact evidence required before DONE;
- declare blocking edges, canonical owner, and non-goals.

A `FOUNDATION` item is valid only when approved/source-grounded `SHARED`/`FOUNDATION` impact names current consumers/invariants, the canonical technical decision, and the minimum shared seam required by current work. A `WALKING_SKELETON` must exercise one thin representative path through the real foundation/production boundaries before dependent scale-out. A `VERTICAL_SLICE` delivers a narrow complete approved behavior across already-ready prerequisites. Do not invent foundation for hypothetical future reuse, and do not postpone a proved foundation until duplication/friction appears.

Wide mechanical replacements use expand–migrate–contract when required to preserve green behavior and explicit cutover. Keep migrations/hardening/verification separate when their failure/proof model cannot safely fit inside a feature slice.

For existing work, derive one of:

```text
SKIP_ALREADY_CURRENT
CREATE
UPDATE
CHANGE_STATE
LINK_DEPENDENCY
REQUIRES_OWNER_DECISION
```

Do not create duplicates. Do not reopen or supersede a work item merely because a newer artifact exists; require explicit change-impact evidence and the mapped planning-state transition.

Before the graph can become an implementation frontier, run the Semantic Continuity coverage handshake. Every material incoming obligation must map to one or more slices, a valid REFINE/SPLIT/DERIVE/SUPERSEDE lineage operation, `N_A_PROVEN`, an explicit discovery gap, or an authorized delivery disposition. An unaccounted material obligation is a planning gap; keep the affected frontier `PARTIAL`/`BLOCKED` rather than silently shrinking scope.

### 4. Review granularity and reconciliation

Present or inspect the proposed graph and changes as a numbered list. For each work item preserve work type, title, blockers, delivered behavior/decision, semantic obligation coverage, traceability/revision, evidence target, stable planning identity, and proposed action. Request an owner decision only when granularity/reopen/supersession would change protected intent or another material truth outside Planning authority; otherwise reconcile reversible planning details autonomously.

### 5. Create a reconciliation changeset

Create a provider-neutral changeset before any write. Default `safe_partial: false`.

For every operation record:

```yaml
schema_version: 2
operation_id:
capability: tracker.create | tracker.update | tracker.change_state | tracker.link_dependencies
capability_resolution:
  record_ref:
  record_sha256:
profile_revision:
operation:
operation_parameters_sha256:
side_effect_class:
requested_by: to-tickets
canonical_owner: Engineering Planning
target:
  project_id: <profile.project.id>
  canonical: true
responsibility:
authority:
capability_support:
fallback_approved:
precondition_status:
impact:
verification:
compensation:
```

Use `architecture/capabilities/capability-operation.schema.json`. Operations that modify Product scope, priority, Architecture, implementation/quality/UAT/release truth are outside responsibility and must be `BLOCK` or handed off.

### 6. Resolve capability and apply policy

Resolve only the capabilities required by the changeset. Then evaluate every envelope and the aggregate changeset against `policy.capability_execution`, including unique-resource, project, and provider budgets.

- `ALLOW` — execute the bounded reversible operation.
- `ALLOW_WITH_LIMITS` — execute only the approved lower-fidelity mapping and report limitations.
- `REQUIRE_APPROVAL` — preview the exact operation and impact; do not execute before approval.
- `BLOCK` — preserve the changeset and name missing responsibility, authority, precondition, verification, or policy.
- `UNSUPPORTED` — preserve the semantic operation; do not improvise an unapproved provider behavior.

Automatic execution is permitted only for planning-owned, authorized, same-project, reversible, unambiguous operations inside configured resource budgets with verified postconditions. Bulk, cross-system-within-project, public, destructive/irreversible, protected-decision, ambiguous-match, or downstream-invalidating operations require approval. Cross-project operations are blocked and routed to the other project's profile/owner; approval under the current profile cannot authorize them.

### 7. Execute narrowly and verify

Publish creates before dependency links so stable identifiers exist. Use `tracker.update` for bounded content/metadata patches and `tracker.change_state` for mapped transitions with expected-current-state preconditions.

After every mutation, read the canonical consumed state and verify declared postconditions. Tool success without verified state is `FAILED`. If a later operation fails, apply compensation only when its strategy was declared and authorized; record restored state as `COMPENSATED`, but keep the attempted workflow `FAILED`.

Per-operation results:

```text
APPLIED
SKIPPED_ALREADY_CURRENT
REQUIRES_APPROVAL
BLOCKED_AUTHORITY
BLOCKED_PRECONDITION
UNSUPPORTED_PROVIDER
FAILED
COMPENSATED
```

Record every operation through the Integration Result Manifest. Applied plus unresolved operations are `FAILED` unless the changeset explicitly established safe independent partial progress before execution and canonical state remains coherent.

### 8. Derive the current approved frontier

Re-query/read the canonical graph after publication. The current approved frontier contains only work items that:

- bind the approved source revision and stable planning identity;
- have all blockers complete in canonical truth;
- retain unresolved decisions as blockers rather than assumptions;
- name the runtime/evidence target;
- have semantic coverage closed for the material obligations assigned to the item, with no unexplained incoming obligation loss;
- are not stale, superseded, duplicate, or awaiting approval.

Handoff one implementation-owned frontier item at a time to `/implement`, including a ready `FOUNDATION`, `WALKING_SKELETON`, `VERTICAL_SLICE`, `MIGRATION`, or `HARDENING` item as applicable. A dependent item is never frontier-ready while a required architecture decision/foundation/migration/walking-skeleton blocker is incomplete. If no item satisfies these conditions, return `PARTIAL` or `BLOCKED`; do not hand off a convenient draft.

## Work-item content

Each canonical work item contains:

```text
Parent / scope
Stable planning identity and approved revision
What to build
Acceptance criteria
Blocked by
Traceability
Runtime entrypoint and evidence target
Non-goals
```

Avoid brittle implementation snippets or speculative file lists. Preserve decision-rich prototype fragments only when they encode an approved invariant more precisely than prose.

## Completion

- `READY` — the canonical graph matches approved planning truth, the semantic coverage handshake accounts for every material incoming obligation in scope, every applied mutation has verified postconditions, operation results are recorded, and a current approved frontier can be derived.
- `PARTIAL` — analysis/draft or an explicitly safe lower-fidelity/independent partial result exists; limitations and non-executed operations are explicit.
- `BLOCKED` — canonical owner, planning truth, identity, required capability, authority, approval, precondition, or verification is missing.
- `FAILED` — an attempted changeset contains an unverified/failed write, failed compensation, or contradictory canonical state. Report exact successful, skipped, blocked, failed, and compensated operations.
