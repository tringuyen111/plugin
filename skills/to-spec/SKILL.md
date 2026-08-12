---
name: to-spec
description: Synthesize approved Product, BA, Design, and Architecture artifacts plus current source into a technical delivery specification for multi-session implementation. Do not create missing product outcomes, stories, acceptance criteria, or visual decisions.
---

# To Technical Delivery Spec
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Create an engineering delivery specification from decisions that already exist.
This is not a PRD and does not interview the user to rediscover approved work.

## Preconditions

Resolve and read, as relevant:

- approved Product outcome, metric, priority, and epic scope;
- Behavior Package with Use Cases, Rules, Stories, AC, and NFRs;
- UX Package and approved Visual Contract;
- ADRs, domain glossary, prototype learning, and current source/runtime;
- canonical work item and tracker configuration.

If a required Product, behavior, or Design decision is missing or conflicting,
route to its owner. Open technical decisions may remain explicit in the spec.

## Process

1. **Inspect current technical truth.** Read related modules, callers,
   interfaces, runtime entrypoints, adapters/persistence, tests, configuration,
   migrations, observability, and known failures. Apply [Engineering Evidence
   Discipline](../../resources/shared/references/ENGINEERING-EVIDENCE-DISCIPLINE.md) to record baseline and proof targets.
2. **Synthesize accepted technical scope.** Inspect and link current owners,
   accepted interfaces/seams/ADRs, compatibility constraints, migration/rollout,
   rollback, and failure behavior. Do not create architecture truth inside the
   delivery spec. When a missing choice is consequential enough to establish or
   change a public contract, module/interface seam, durable compatibility path,
   migration architecture, or ADR, route that fixed decision question to
   `/codebase-design` (or the named canonical architecture owner), then consume
   the accepted result. Minor sequencing choices may remain in the spec only
   when they do not create a new public or architecture contract.
3. **Classify foundation impact and prerequisites.** Apply [Foundation-Aware Delivery Discipline](../../resources/shared/references/foundation-aware-delivery-discipline.md) across material UI, backend/API, data/persistence, security, and delivery/runtime seams. Record `NONE | CONTAINED | SHARED | FOUNDATION` from approved source/design evidence. For every `SHARED`/`FOUNDATION` seam, link the accepted fixed technical decision or keep the decision explicitly blocking, then name the minimum runway, dependent work, and representative walking-skeleton proof. Do not invent platform work for hypothetical reuse.
4. **Resolve test and evidence strategy.** Reuse authoritative public seams,
   map AC/NFR/risk to developer and QA evidence, and name real output that must
   be inspected. Do not restate TDD as QA acceptance.
5. **Write the delivery spec.** Reference upstream artifact IDs/links instead of
   copying or weakening them. Do not create new Stories or AC inside Engineering.
6. **Review unresolved technical decisions.** Keep open questions explicit.
   Route consequential architecture decisions to `/codebase-design` or their
   named owner before claiming planning readiness; ask directly only when the
   missing owner decision cannot be resolved from current source/artifacts.
7. **Publish with approval.** Preview the artifact and side effects before
   writing to an external tracker. Apply configured labels only after approval.

## Delivery spec format

```markdown
# Technical Delivery Spec — <name>

## Status, owner, and canonical work item

## Source artifacts and maturity

## Delivery goal and non-goals

## Current technical baseline
- Related modules/interfaces/callers
- Runtime entrypoints
- Existing tests/evidence
- Known failures or constraints

## Technical decisions and ADR links

## Foundation impact, architecture runway, and walking skeleton
- Per-domain impact: NONE | CONTAINED | SHARED | FOUNDATION
- Required foundation decisions/nodes and blockers
- Representative walking-skeleton path and proof

## Data, migration, compatibility, and rollback

## Failure behavior and observability

## Security, privacy, performance, and accessibility implementation constraints

## Test and evidence plan
- AC/NFR/risk links
- Developer seams and commands
- QA/visual/UAT/release handoff
- User-visible or machine-consumed output to inspect

## Delivery boundaries and sequencing constraints

## Open technical questions

## Risks and mitigations
```

## Completion

Keep **Technical Delivery Spec readiness** separate from the shared workflow
state. `READY_FOR_PLANNING` is a domain readiness label: it requires a
source-grounded current state, linked approved artifacts, accepted or correctly
owned technical decisions, an explicit foundation-impact/runway map, migration/rollback, failure and observability
behavior, evidence plan, risks, and explicit non-blocking open questions. It is
not itself a workflow control state.

- `READY` — the declared spec-authoring scope completed truthfully and, when the
  requested output must be persisted/published, that write was authorized and
  verified. The domain spec may be `READY_FOR_PLANNING` only when its separate
  readiness conditions are met.
- `PARTIAL` — a useful spec exists but source coverage, a required architecture
  decision, evidence plan, or requested persistence/publication remains
  unresolved.
- `BLOCKED` — required approved upstream truth, representative source/runtime,
  canonical owner, or a consequential architecture decision needed for a
  planning-safe spec is unavailable.
- `FAILED` — an attempted required publication/write/validation failed or left
  unverified external state. Do not hide that failure behind
  `READY_FOR_PLANNING`.

The spec must not claim upstream acceptance that has not occurred.
