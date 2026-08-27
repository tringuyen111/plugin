---
name: sdlc
description: Apply proportional SDLC judgment to broad, cross-lifecycle, or explicitly strict/full SDLC work by identifying only the material concerns, missing truths, authority gates, evidence needs, and next safe/correct action for the user's outcome. Use when the user asks to follow SDLC or when several lifecycle concerns genuinely interact; do not use as a central route registry or to force every phase.
---

# SDLC

## Runtime context

- **When strict/full SDLC, "do not skip steps", or lifecycle applicability is material:** read [SDLC Applicability Discipline](references/applicability.md).
- **When multiple material concerns interact, controls must be ordered by dependency, or new evidence may justify de-escalation:** read [SDLC Rigor Synthesis](references/rigor-synthesis.md) after choosing the core rigor posture below.

Use this Skill to reason about **which SDLC concerns are material now**, not to simulate a delivery organization inside the prompt.

## Glossary — control vocabulary

- **Material concern** — an SDLC concern whose resolution can change the next safe/correct action, authority need, risk, or proof burden for the requested outcome.
- **Semantic uncertainty** — uncertainty about what the target behavior, requirement, constraint, state, or claim actually means; it is different from uncertainty about whether an already-defined behavior was executed successfully.
- **Consequence** — the cost or blast radius of being wrong, including reversibility, user/business impact, data/security impact, and recovery difficulty.
- **Authority** — who or what may decide or authorize a target truth or side effect. Evidence can inform authority but does not create it.
- **Proof** — evidence strong enough for the exact claim at the boundary being asserted; implementation evidence does not automatically prove acceptance, release, or operations.
- **Frontier** — the smallest unresolved decision or action that materially advances the requested outcome now. It is not a prescribed next-Skill route.

Use these terms consistently. Do not introduce lifecycle jargon when the distinction does not change the current decision.

Strict/full SDLC means: apply every control that can materially change correctness, risk, authority, or proof for the current goal. It does **not** mean every lifecycle phase, every artifact, or every installed Skill must run.

For a load-bearing claim that is contradicted, uncertain, or would authorize a costly/hard-to-reverse action, inspect the smallest sufficient current evidence before relying on it. Keep factual evidence separate from decision authority: an authorized risk decision does not convert `FAIL`, `NOT_RUN`, `MISSING`, or conflicting evidence into success.

Use **semantic uncertainty x consequence** as the core rigor gate; authority and explicit policy remain independent gates:

| Semantic uncertainty | Consequence | Default posture |
|---|---|---|
| Low | Low | Proceed on the bounded job with bounded proof; use only capability depth that is material. |
| High | Low | Clarify or explicitly bound the smallest consequential uncertainty before dependent work. |
| Low | High | Keep settled meaning fixed; strengthen containment/recovery and representative proof. |
| High | High | Stop only the affected mutation until the consequential uncertainty is resolved; then establish containment/recovery and stronger proof. |

Do not preload generic replacement, artifact-linking, or handoff contracts. When replacement/cutover, persisted lineage, or real cross-session/runtime continuation becomes material, identify that bounded job and keep SDLC at applicability/judgment level; host-native discovery/invocation supplies any specific capability depth.

## Job

For a broad or cross-lifecycle request:

1. **Bind the requested outcome and current truth.** Read the actual user mandate, project/repository authority, current artifacts/source/runtime, and already-resolved decisions that can change the result. Do not rebuild truth from summaries when the source is inspectable.
2. **Identify material concerns only.** Consider idea/value, behavior, UX/visual, technical design, implementation, verification/acceptance, release, operations, documentation, and learning only to the extent each can change the next safe/correct action. Mark unrelated concerns non-material instead of manufacturing ceremony. When concerns interact, synthesize rigor from their actual uncertainty, consequence, proof, authority, policy, and continuation effects instead of counting phases.
3. **Separate resolved truth from decision gaps.** A missing artifact is not automatically a gap; name the missing decision, evidence, authority, or runtime fact that actually matters. Reversible low-risk assumptions may proceed when explicit. Material ambiguity stays visible.
4. **Keep domain work with the capability that actually owns it without simulating an organization.** Native Skill discovery and invocation metadata are the host-owned selection surface. SDLC identifies the unresolved job/concern and its constraints; it does not rank installed Skills, maintain a Delivery route table, or prescribe a next-Skill transition. When another Skill is natively active, it adds bounded procedural knowledge to the same user outcome rather than creating a new workflow owner or mandatory handoff.
5. **Keep real authority boundaries real.** Product/behavior/design/security-policy/release/risk decisions stay with the actual authorized source or human/project owner. Do not invent them merely to keep execution moving. Tool availability is not authority.
6. **Close with evidence, not lifecycle theater.** Require proof proportional to the claim and blast radius. Developer evidence does not become QA, acceptance, release, or operational proof by narration. After a decision, control, or new evidence changes the situation, re-evaluate the material concern set: close only the concern the evidence actually resolves, shed no-longer-relevant context, and expose only the material unresolved job/concern; host-native discovery may add capability depth when useful. Continue in the same capable/authorized session by default; expose routing, local Skill states, and internal checklists only when they affect the user decision or were requested.

## Useful distinctions

- A clear bounded technical change may go straight to implementation even when no Product/BA/Design packet exists, if those semantics are already fixed or non-material.
- A broad feature request may need Product/BA/Design/Architecture work before coding when those decisions are genuinely unresolved.
- A bug with unknown cause needs diagnosis before a causal fix; a bug with proven root cause can go straight to implementation.
- A completed implementation does not require QA, UAT, release, documentation, or handoff unless the requested outcome, project policy, risk, or real downstream consumer makes them material.
- A provider/tool decision is part of the active domain job unless provider governance, permissions, or side effects create a real separate constraint.

## Completion

Return a concise SDLC checkpoint only when useful:

- requested outcome;
- material concerns currently in play;
- resolved truth versus material gaps;
- the next material job/action, if any, without prescribing a Skill route;
- authority or evidence blocker that prevents progress;
- what would falsify the current readiness claim.

`READY` means the SDLC applicability/judgment requested here is coherent enough to proceed. It does not mean downstream domain work is complete. Preserve `PARTIAL`, `BLOCKED`, or `FAILED` when the broad request cannot be truthfully reduced to a safe next action.
