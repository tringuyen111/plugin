---
name: traceability
description: Build or audit revision-bound cross-lifecycle traceability and change impact across product intent, requirements, design/architecture, work, implementation, verification, release, operations, documentation, and metrics. Use when canonical continuity is missing, an approved material revision may invalidate downstream artifacts or evidence, or delivery must be proven against intent.
---

# Traceability
## Conditional depth

- **WHEN** an approved material artifact change requires downstream analysis, **READ** [Change Impact Decision Model](CHANGE-IMPACT-DECISION-MODEL.md) and [Change Impact Report Contract](CHANGE-IMPACT-REPORT.md) **BECAUSE** impact traversal must preserve revision-bound edge truth, stale evidence, release exposure, and canonical ownership without becoming a downstream decision owner; **RETURN** the affected/unaffected branches, exact edge paths with all edge truth axes, stale evidence, confidence, first unresolved canonical-owner actions, and truthful persistence result.
- **WHEN** creating or auditing durable links, **READ** [Traceability Contract](TRACEABILITY-CONTRACT.md) **BECAUSE** a relationship needs exact revision binding, truth basis, and independent edge truth axes before it can count as coverage; **RETURN** the revision-bound edge identity, Binding Freshness, Verification State, Agreement State, truth basis/evidence, and any gap that prevents current coverage.

Maintain the revision-bound artifact graph and cross-lifecycle change-impact truth without becoming a second task tracker, requirements author, verification owner, or release authority.

`traceability` is the primary owner when the material question is continuity across exact artifact revisions, downstream impact of an approved change, stale evidence, or proof that delivery still maps to intent. It may be invoked from Product, Requirements, Design, Architecture, Planning, Engineering, QA/UAT, Release, Operations, Documentation, or Metrics work. It does not become a second domain owner: each affected owner still decides and updates the artifact they own.

## Edge truth axes — use these terms literally

- **Binding Freshness** — whether the exact source/target revisions recorded on an edge still bind the current canonical endpoint meanings: `CURRENT | STALE | UNBOUND`. It is not evidence that the relationship itself is true.
- **Verification State** — whether usable truth basis/evidence establishes the relationship for the revisions actually recorded on the edge: `VERIFIED | UNVERIFIED`. Historical verification can remain true even when Binding Freshness later becomes `STALE`.
- **Agreement State** — whether canonical declarations and relevant observed/source/runtime evidence agree about the relationship: `CONSISTENT | CONFLICTING | NOT_ASSESSED`. Rebinding or verification does not automatically resolve a conflict.

These axes are independent. One edge may be `STALE + VERIFIED + CONFLICTING`, or `UNBOUND + UNVERIFIED + CONFLICTING`. Current coverage requires `Binding Freshness = CURRENT`, `Verification State = VERIFIED`, and no unresolved `CONFLICTING` Agreement State for the claim being made.

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
   revision, relationship type, truth basis/evidence, Binding Freshness,
   Verification State, and Agreement State.
4. **Build backward links.** Every task, test, and release item must explain
   which exact AC, quality-requirement, risk, or technical-invariant revision justifies it. An
   unchanged artifact ID or ID similarity does not preserve link continuity when
   endpoint meaning changed.
5. **Classify graph quality and gaps.** Classify Binding Freshness, Verification
   State, and Agreement State independently, then classify missing, conflicting,
   stale, orphaned, duplicated, or unverifiable graph truth. One edge may
   contribute to several graph-quality findings; the diagnostic counts are not a
   mutually-exclusive partition. Missing endpoint revision/evidence cannot count
   as current coverage.
6. **Run change impact.** When an approved artifact changes materially, load
   the Change Impact Decision Model. Anchor the approved revisions, traverse
   exact revision-bound semantic and observed dependency edges, preserve the
   exact edge path used for every material impact claim, classify direct/transitive impact,
   stale evidence, release exposure, confidence, and evidence-backed unaffected
   branches. Any `STALE`/`UNBOUND` Binding Freshness, `UNVERIFIED` Verification
   State, or `CONFLICTING` Agreement State remains visible during traversal and
   cannot be laundered into current coverage. Observed edges may inform the
   analysis but do not become canonical writes without authority. Produce the Change Impact Report and ordered canonical-owner
   actions. For an implementation impact, reuse a current approved canonical work item when the project requires that work contract and it binds the changed revision/evidence target. If project policy or the canonical workflow requires such a work item and none is current, the first unresolved action belongs to the canonical planning/work owner. When no work-item gate is established and the bounded implementation is already authorized and execution-ready, report that implementation obligation directly rather than manufacturing a planning hop. Traceability never creates or reopens work items merely because impact was detected. Persist stale/review state only when persistence is explicitly requested or required by project policy, using the actual canonical source with available authority. Reopen or re-read the resulting canonical state to verify the postcondition. If the write is denied, unavailable, failed, or unverifiable, keep the intended update and exact owner action visible as `PARTIAL`/`BLOCKED` without creating a shadow status source. A provider-specific machine result may be linked when one actually exists; a generic Integration Result Manifest is not a prerequisite for traceability analysis.
7. **Assign owners.** Every gap names the role and canonical artifact that must
   resolve it.
8. **Report coverage truthfully.** A link proves relationship, not correctness.
   Evidence and acceptance still require their own workflows.

## Completion

`READY` requires a scoped graph, forward and backward coverage, classified gaps,
stale impact, canonical owners, and explicit unverified surfaces. When the
change-impact branch runs, it also requires an approved change identity, an
inspectable impact report, evidence-backed unaffected claims, ordered owner and
reverification handoffs, any project-required planning/work-contract gate before implementation, and a
truthful persistence result. `READY` does not
mean downstream artifacts are revised or accepted. Traceability must not
silently invent missing artifacts or task status.
