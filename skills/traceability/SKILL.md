---
name: traceability
description: Build or audit traceability from product outcomes through scope, behavior, tasks, tests, evidence, release, and documentation. Use when canonical links are missing, an approved material artifact revision requires downstream impact and reverification analysis, or delivery must be proven against intent.
---

# Traceability
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **When an approved material artifact change requires downstream analysis:** read [Change Impact Decision Model](CHANGE-IMPACT-DECISION-MODEL.md) and use [Change Impact Report Contract](CHANGE-IMPACT-REPORT.md) before classifying impact, stale evidence, or owner order.
- **Before writing stale/review state into a canonical repository or tracker:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md), verify authority, and never create a shadow status source as fallback. Every attempted write must materialize the canonical **Integration Result Manifest** from `architecture/capabilities/integration-result.schema.json` schema v4; the traceability report stores only its `record_ref` + `record_sha256`, not a copied subset of operation truth.
<!-- runtime-context:end -->


Maintain the artifact graph without becoming a second task tracker.

`/define-behavior` remains the Business Analysis entry workflow and orchestrates
the behavior package. `traceability` owns the graph and change-impact report
artifact beneath that flow, and may be invoked directly when the graph or an
approved material revision is already the dominant uncertainty. It does not
become a second Delivery router.

Read [`TRACEABILITY-CONTRACT.md`](TRACEABILITY-CONTRACT.md) before creating or auditing links.

## Process

1. **Select scope.** Name the Product outcome, feature/epic, release, or change
   being audited.
2. **Read canonical sources.** Use the project’s actual Product docs, BA docs,
   design source, issue tracker, Git/source, test/evidence store, and release
   record. Do not infer task status from a handoff or summary.
3. **Build forward links.** Outcome → scope → behavior → design/ADR → task →
   implementation → test/evidence → acceptance → release → docs/metrics. Bind
   each material edge to its `edge_id`, exact source revision, exact target
   revision, relationship type, truth basis/evidence, and edge state.
4. **Build backward links.** Every task, test, and release item must explain
   which exact AC, NFR, risk, or technical-invariant revision justifies it. An
   unchanged artifact ID or ID similarity does not preserve link continuity when
   endpoint meaning changed.
5. **Classify graph quality and gaps.** Distinguish edge state `CURRENT`,
   `STALE`, `CONFLICTING`, or `UNVERIFIED`, then classify missing, conflicting,
   stale, orphaned, duplicated, or unverifiable graph truth. Missing endpoint
   revision/evidence cannot count as current coverage.
6. **Run change impact.** When an approved artifact changes materially, load
   the Change Impact Decision Model. Anchor the approved revisions, traverse
   exact revision-bound semantic and observed dependency edges, preserve the
   exact edge path used for every material impact claim, classify direct/transitive impact,
   stale evidence, release exposure, confidence, and evidence-backed unaffected
   branches. A stale/conflicting/unverified edge remains visible during traversal
   and cannot be laundered into current coverage. Observed edges may inform the
   analysis but do not become canonical writes without authority. Produce the Change Impact Report and ordered canonical-owner
   handoffs. Before an implementation branch receives a `next_route`, resolve
   planning readiness: only a current approved canonical work item bound to the
   changed revision, evidence target, and task-status owner may route to
   `/implement`. Otherwise route to the canonical planning/work owner first.
   Persist stale/review state only through the selected truth source with
   authority. Record the exact capability-resolution digest, policy/operation result,
   precondition, **postcondition**, resources, and **compensation** truth in the canonical
   Integration Result Manifest v4, then bind the impact report to that manifest by
   `record_ref` and `record_sha256`. If authority/write capability is unavailable,
   preserve the intended write as `PARTIAL` or `BLOCKED`
   without creating parallel status. Traceability must not reopen, supersede, or otherwise mutate tracker work state; hand the impact evidence to `/to-tickets` or the canonical work owner for reconciliation.
7. **Assign owners.** Every gap names the role and canonical artifact that must
   resolve it.
8. **Report coverage truthfully.** A link proves relationship, not correctness.
   Evidence and acceptance still require their own workflows.

## Completion

`READY` requires a scoped graph, forward and backward coverage, classified gaps,
stale impact, canonical owners, and explicit unverified surfaces. When the
change-impact branch runs, it also requires an approved change identity, an
inspectable impact report, evidence-backed unaffected claims, ordered owner and
reverification handoffs, a planning-readiness gate before implementation, and a
truthful persistence result. `READY` does not
mean downstream artifacts are revised or accepted. Traceability must not
silently invent missing artifacts or task status.
