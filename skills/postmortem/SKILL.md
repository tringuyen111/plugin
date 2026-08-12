---
name: postmortem
description: Create or review an evidence-grounded blameless postmortem after an incident is stabilized. Use when impact, timeline, mitigation, recovery, technical diagnosis, and follow-up need durable learning; do not infer root cause, rewrite the incident timeline, or create a second action tracker.
---

# Postmortem
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
- **When causal structure, historical decisions, recommendations, or recurrence require analysis beyond a factual summary:** read [Postmortem Analysis Contract](POSTMORTEM-ANALYSIS-CONTRACT.md).
<!-- runtime-context:end -->


Create durable learning from one fixed incident record. Read [POSTMORTEM-FORMAT.md](POSTMORTEM-FORMAT.md). The postmortem may state root cause only at the confidence supported by Engineering diagnosis and evidence. It owns the action recommendation set produced from that learning; it does not own the executable work graph, canonical backlog priority, or tracker-state reconciliation.

## Process

1. **Fix the source set.** Incident record/timeline, alerts, logs/traces, deployment/config changes, communications, mitigation, recovery evidence, and technical diagnosis.
2. **Separate facts and inference.** Keep observation, contributing condition, hypothesis, supported cause, and verified root cause distinct.
3. **Reconstruct the timeline.** Preserve timestamps, source provenance, and contradictions; do not smooth gaps into a persuasive story. Causal interpretation may evolve later without rewriting what happened or what responders knew then.
4. **Describe impact and detection.** Users, duration, operations/business/data/security impact, detection path, and uncertainty.
5. **Build the causal learning model.** Read the analysis contract. Separate trigger/initiating event, enabling conditions, failed/absent controls, detection/response contributors, and one or more evidence-supported causal claims. Consume `/diagnosing-bugs` evidence for technical mechanism. If root cause remains unknown, preserve uncertainty and record an investigation recommendation rather than forcing a single root cause or “5 Whys” chain.
6. **Reconstruct decision context and evaluate response.** For consequential decisions, record information/constraints available at the time and what later evidence changed the interpretation. Evaluate what helped, delayed, increased risk, reduced impact, or lacked control/ownership. Stay blameless without erasing demonstrated system/process gaps.
7. **Derive traceable follow-up recommendations.** Link each recommendation to a causal finding/risk, state the recommended outcome, suggested effect class when useful (`PREVENT | DETECT | MITIGATE | RECOVER | LEARN`), suggested owner role, evidence target, and verification/falsifier. If an exact existing canonical work item already represents the recommendation, link it instead of duplicating it. If executable work must be created or reconciled, hand the recommendation set to `/to-tickets` (or the project-selected canonical work-graph owner when different). Postmortem may explain urgency/risk but does not assign canonical priority and does not mutate the executable work graph.
8. **Generalize recurrence carefully.** State the failure mechanism/unsafe assumption first, then identify related services/flows where that mechanism may exist and the evidence needed to confirm or reject exposure. Do not turn the postmortem into an unbounded architecture audit.

## Completion

`READY` requires a fixed incident source, factual timeline, impact, a causal model with evidence-confidence/counter-evidence truth, decision-context analysis where material, response analysis, a traceable action recommendation set with verifiable outcomes plus existing-work links or an explicit planning handoff, recurrence scope, and explicit unresolved questions. A polished narrative with unsupported causal certainty, hindsight blame, or recommendations detached from findings is `FAILED`, not READY.
