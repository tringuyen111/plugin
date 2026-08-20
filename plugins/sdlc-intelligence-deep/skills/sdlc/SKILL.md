---
name: sdlc
description: Apply proportional SDLC judgment to broad, cross-lifecycle, or explicitly strict/full SDLC work by identifying only the material concerns, missing truths, authority gates, evidence needs, and next capability needed for the user's outcome. Use when the user asks to follow SDLC or when several lifecycle concerns genuinely interact; do not use as a central route registry or to force every phase.
---

# SDLC

## Runtime context

- **When strict/full SDLC, "do not skip steps", or lifecycle applicability is material:** read [SDLC Applicability Discipline](references/applicability.md).
- **When multiple material concerns interact, the required rigor/ordering is unclear, or new evidence may justify de-escalation:** read [SDLC Rigor Synthesis](references/rigor-synthesis.md).

Use this Skill to reason about **which SDLC concerns are material now**, not to simulate a delivery organization inside the prompt.

Strict/full SDLC means: apply every control that can materially change correctness, risk, authority, or proof for the current goal. It does **not** mean every lifecycle phase, every artifact, or every installed Skill must run.

For a load-bearing claim that is contradicted, uncertain, or would authorize a costly/hard-to-reverse action, inspect the smallest sufficient current evidence before relying on it. Keep factual evidence separate from decision authority: an authorized risk decision does not convert `FAIL`, `NOT_RUN`, `MISSING`, or conflicting evidence into success.

Do not preload generic replacement, artifact-linking, or handoff contracts. When replacement/cutover, persisted lineage, or real cross-session/runtime continuation becomes material, use the most specific capability that owns that job and keep SDLC at applicability/judgment level.

## Job

For a broad or cross-lifecycle request:

1. **Bind the requested outcome and current truth.** Read the actual user mandate, project/repository authority, current artifacts/source/runtime, and already-resolved decisions that can change the result. Do not rebuild truth from summaries when the source is inspectable.
2. **Identify material concerns only.** Consider idea/value, behavior, UX/visual, technical design, implementation, verification/acceptance, release, operations, documentation, and learning only to the extent each can change the next safe/correct action. Mark unrelated concerns non-material instead of manufacturing ceremony. When concerns interact, synthesize rigor from their actual uncertainty, consequence, proof, authority, policy, and continuation effects instead of counting phases.
3. **Separate resolved truth from decision gaps.** A missing artifact is not automatically a gap; name the missing decision, evidence, authority, or runtime fact that actually matters. Reversible low-risk assumptions may proceed when explicit. Material ambiguity stays visible.
4. **Use the most specific installed capability for domain work without simulating an organization.** Native Skill discovery and the Skill descriptions are the capability-selection surface. Prefer the narrow capability that owns the actual job; do not consult or maintain a central Delivery route table. Loading another Skill adds bounded procedural knowledge to the active user outcome; it does not create a new workflow owner or require a handoff artifact.
5. **Keep real authority boundaries real.** Product/behavior/design/security-policy/release/risk decisions stay with the actual authorized source or human/project owner. Do not invent them merely to keep execution moving. Tool availability is not authority.
6. **Close with evidence, not lifecycle theater.** Require proof proportional to the claim and blast radius. Developer evidence does not become QA, acceptance, release, or operational proof by narration. After a decision, control, or new evidence changes the situation, re-evaluate the material concern set: close only the concern the evidence actually resolves, shed no-longer-relevant context, and activate another capability only for a material unresolved concern. Continue in the same capable/authorized session by default; expose routing, local Skill states, and internal checklists only when they affect the user decision or were requested.

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
- the most specific capability/job needed next, if any;
- authority or evidence blocker that prevents progress;
- what would falsify the current readiness claim.

`READY` means the SDLC applicability/judgment requested here is coherent enough to proceed. It does not mean downstream domain work is complete. Preserve `PARTIAL`, `BLOCKED`, or `FAILED` when the broad request cannot be truthfully reduced to a safe next action.
