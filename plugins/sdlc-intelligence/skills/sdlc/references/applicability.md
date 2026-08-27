# SDLC Applicability Discipline

Use this reference when deciding what “follow SDLC”, “strict SDLC”, “full SDLC”, “do not skip steps”, or similar delivery-discipline language requires for the current task. It is a shared applicability rule, not a lifecycle owner, phase checklist, or second workflow.

## Core rule

**SDLC compliance means satisfying every discipline that is material to the current goal. It does not mean executing every conceivable lifecycle phase.**

A lifecycle activity is applicable only when omitting it could materially change correctness, safety, authority, evidence truth, maintainability of the current change, or the ability of a real downstream consumer to continue safely.

User emphasis changes the strength of compliance, not the set of concerns by itself:

- “follow SDLC” -> apply every material control;
- “strict/full SDLC” or “do not skip steps” -> do not waive, hand-wave, or silently assume a material control;
- none of those phrases alone makes Product, BA, Design, planning, review, QA, documentation, release, or handoff applicable.

If the user explicitly names a specific activity (“run code review”, “write an ADR”, “do QA”, “create a handoff”), treat that named activity as requested scope unless it conflicts with a higher authority or safety boundary.

## Materiality test

Evaluate only concerns that can change the next safe/correct action. A discipline is material when at least one of these is true:

1. **Semantic uncertainty** — unresolved Product, behavior, UX, visual, technical, data, security, or operational meaning could produce materially different correct implementations or decisions.
2. **Reversibility / blast radius** — the action is difficult to undo, affects many consumers, changes compatibility, migrates data, or can cause broad rework or user harm.
3. **Evidence claim** — the strength of the intended claim requires stronger proof than the current evidence provides.
4. **Authority / side effects** — approval, protected data, production, destructive mutation, external communication, deployment, security, or another authority boundary is involved.
5. **Persistence / continuation** — another owner, session, runtime, or durable consumer genuinely needs state that canonical sources plus the ordinary result cannot reconstruct safely.
6. **Specific policy** — repository/workspace policy or an explicit user instruction names a concrete required control for this task.

A phase, artifact, route, review, approval, or handoff is not material merely because it normally appears before or after the current work in a lifecycle diagram.

When two or more material concerns interact, or when it is unclear how much rigor is enough, use [SDLC Rigor Synthesis](rigor-synthesis.md) to map concerns to the smallest controls that can discharge them and to re-evaluate rigor after new evidence.

## Direct-work bias

When the requested outcome is clear, the change is bounded and reversible, the source/runtime can be inspected, no protected authority is crossed, and no unresolved semantic decision can change correctness:

- use the most specific capability that can satisfy the goal directly;
- use the user request plus current repository/source truth as sufficient local intent when no stronger canonical artifact is required;
- perform the smallest coherent change;
- verify proportionately to the claim and blast radius;
- do not create planning artifacts, trackers, approvals, review workflows, QA continuation, documentation, or handoff without a material concern or real consumer.

Low-risk reversible gaps may be explicit assumptions. Do not convert them into artificial blockers solely to make the lifecycle look complete.

## Escalation rule

Increase rigor when a material concern appears. Examples include:

- unresolved user/business behavior -> resolve the smallest material behavior decision from the authoritative Product/BA/user source before dependent implementation;
- architecture or compatibility choice with material alternatives -> technical design/decision owner;
- data migration/backfill -> data invariants, compatibility, failure/recovery and representative proof;
- security/identity boundary -> authoritative security enforcement and proof;
- release/production/destructive action -> readiness, authority, recovery/rollback and observability appropriate to the action;
- real owner/session/runtime/persistence continuation -> bounded continuation state or handoff when canonical sources are insufficient.

Escalation is concern-driven. Do not restart already-settled lifecycle areas that cannot change the current decision.

## Consumer rule

Before creating an artifact or continuation step, name its consumer and the decision/action it enables. If no consumer or material control exists, omit it.

This applies to plans, specs, tickets, ADRs, review records, QA continuation, user docs, handoffs, and similar workflow outputs. Existing project policy may itself provide the consumer; do not invent one.

## Stop discipline

When the user’s goal is satisfied, every material applicable control has passed or been truthfully dispositioned, and no real continuation boundary remains, **stop**.

A `next_route`, common lifecycle sequence, or available Skill does not create more work. Continue only because an unresolved material concern or explicit requested outcome requires another owner/action.

## Calibration examples

- Explicit typo, no semantic change -> inspect, change, targeted proof, stop.
- Reproducible bug with unknown cause -> diagnose first; once cause is proven, fix + regression proof.
- Ambiguous feature behavior -> define the material behavior before coding; do not manufacture unrelated artifacts.
- Approved data-model migration -> implement with migration/data safety and representative proof; do not restart Product discovery.
- Production deployment -> preserve release/operations authority and recovery evidence even when the code change was small.
