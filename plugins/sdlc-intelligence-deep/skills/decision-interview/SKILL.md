---
name: decision-interview
description: Improve a concrete human-owned decision through an evidence-grounded, one-question-at-a-time interview. Use when the user asks to be challenged or an owning workflow has a material unresolved human choice. Do not use for raw brainstorming, generic questionnaires, project-wide writing, agent execution, or protected approval authority.
---

# Decision Interview

Treat the job as **decision-quality improvement**, not question generation. The caller or user owns the plan, design, product, architecture, implementation, acceptance, release, or other canonical work. This Skill owns only the bounded decision interview and its in-conversation decision coherence.

## Universal operating contract

1. **Bind the decision surface.** Identify the concrete target/revision when available, intended outcome, explicit non-goals, current authoritative facts, participating humans and their roles, and already-resolved decisions. Do not invent a plan to create something to interview. If the input remains a raw pre-canonical idea and no concrete decision can be named without inventing structure, return the Brainstorm/scoping boundary instead of starting a broad interview.
2. **Separate evidence from judgment and authority.** Inspect available source/runtime/artifacts for factual questions. When external research or a prototype is required, identify the bounded evidence frontier and compose the available `research`/`prototype` owner only when the uncertainty could credibly change the choice and the information cost/delay is justified. Distinguish **decision authority** (who may adopt/defer/accept protected residual risk) from **bounded input authority** (who can supply authoritative evidence/constraints) and **stakeholder value input** (whose objectives/preferences legitimately affect the trade-off). Do not treat any of these as interchangeable.
3. **Select the highest-leverage frontier.** First repair a global frame defect if it invalidates the whole surface; that defect is the frontier. Otherwise enumerate only material candidate frontiers and choose the one whose resolution most changes the reachable decision graph now. Read [Frontier and Value of Information](references/frontier-and-voi.md) when candidates compete, research/prototype is proposed, timing matters, or frontier choice is not obvious.
4. **Diagnose inside the selected frontier.** Determine that frontier's weakest material decision-quality link: frame, alternatives, information, values/trade-offs, reasoning, or commitment/authority. Do not let a locally weak but low-impact branch outrank the selected frontier. Read [Decision Model](references/decision-model.md) when shared premises, dependencies, hard constraints, input/decision authority, or cross-decision criteria interact.
5. **Choose the probe family from the universal map below.** Every non-zero interview uses one family deliberately. Read [Probe Patterns](references/probe-patterns.md) for contrastive HOW+SHOW, recommendation forms, tacit expert judgment, or a realistic near-miss.
6. **Ask at most one human question.** Ask one bounded question to the person who can supply the required owner judgment or legitimate input, then wait. Never batch unresolved questions. If no material human-owned/input frontier remains, use the zero-question path instead of manufacturing an interview.
7. **Update coherence after every material answer/new fact.** Preserve the decision, decision authority, material input provenance, governing evidence/constraints/values, load-bearing assumptions, strongest material alternative when useful, flip condition, and affected dependents. Surface only the useful delta each turn; show the full compact register only on request, checkpoint, or finalization.
8. **Challenge only after the model is coherent enough to challenge.** Stress load-bearing assumptions, strongest credible counter-alternative, sensitivity/flip conditions, value contradictions, or material failure/recovery implications. Read [Challenge and Re-entry](references/challenge-and-reentry.md) when a premise changes, a prior decision may be stale, or closure is uncertain.
9. **Return bounded truth.** In embedded use, return a Decision Packet to the caller; do not take over the caller's artifact/session. In direct conversational use, keep the logical register in conversation. If explicit persistence is requested and a resolved decision materially changes domain semantics, use the conditional projection in [Domain Persistence](references/domain-persistence.md); Decision Interview itself never gains generic write authority.

## Probe-family quick map

Use the selected frontier's failure, not topic keywords, to choose the question:

| Probe | Use when the frontier needs... |
|---|---|
| `FRAME` | a coherent objective, scope, non-goal, or decision unit |
| `ALTERNATIVE` | a credible option set or repair of a false dichotomy |
| `VALUE_TRADEOFF` | the differentiating preference, threshold, or risk posture |
| `ASSUMPTION_DISCONFIRMATION` | a load-bearing premise or credible flip/counter-condition exposed |
| `TACIT_JUDGMENT` | expert cues, expectations, anomalies, or goals made explicit without fake scoring |
| `AUTHORITY_RISK` | decision authority, protected risk boundary, or legitimate bounded input role clarified |
| `COMMITMENT_CLOSURE` | adopt/defer/close only after the earlier links are sufficient |

A mandatory constraint is not a preference: use authoritative constraints to eliminate infeasible options; use values/preferences to rank or trade feasible options. An owner-authorized threshold becomes a hard constraint only when it is explicitly governed as such.

## Recommendation maturity

Use the maturity state implied by current evidence:

- `NO_RECOMMENDATION` — frame, alternatives, facts, criteria, or authority are too weak. Ask the missing decision-quality question without pretending to know the answer.
- `CONDITIONAL_RECOMMENDATION` — current evidence favors one option but a named unresolved flip condition could credibly reverse it. If that flip condition is source/research/prototype-answerable, acquire/authorize that evidence rather than asking the owner to guess the fact.
- `RECOMMEND` — decision-ready. Recommend one option, state the strongest material counterargument, and name what could credibly flip the recommendation.

Never create certainty because the interview format appears to expect a recommendation.

## Zero-question path

Ask **zero** questions when all material decisions are already resolved, remaining gaps are source-answerable, remaining branches cannot change the current caller handoff, or the available participant can neither resolve the decision nor supply decision-changing bounded input. If a non-final participant legitimately owns material evidence, a constraint, or stakeholder value input, collect only that bounded input and keep final disposition unresolved for the decision authority.

## Decision Packet

Return only fields useful to the caller:

- decision question / disposition;
- decision authority or unresolved authority;
- material input authority/provenance when it affects validity;
- governing evidence, hard constraints, and values/preferences;
- material assumptions and strongest alternative when relevant;
- flip/sensitivity condition;
- dependent decisions/artifacts affected by this resolution;
- unresolved/deferred frontier and continuation owner.

Do not turn the packet into a universal template when fewer fields preserve the same decision truth.

## Authority boundaries

- Do not approve or enact Product, Requirements, Design, Architecture, Engineering, QA/UAT, Operations, Release, legal, security, financial, or other protected decisions.
- Do not promote bounded stakeholder/input authority into final decision authority.
- Do not write canonical owner artifacts merely because a decision was resolved in conversation.
- Do not use `domain-modeling` as a generic persistence tunnel.
- Do not assign/run agents, mutate implementation, transition tracker state, deploy, or claim downstream proof.
- Do not replace Brainstorm when the input is still a raw pre-canonical idea without a concrete decision surface.

## Completion

- `READY`: no remaining material human-owned/input frontier can change the caller's current handoff, and resolved/deferred decisions are coherent enough for that caller.
- `PARTIAL`: useful progress exists, but a material decision, decision-changing evidence/input gap, invalidated dependency, or requested authorized continuation remains open.
- `BLOCKED`: the concrete target, required source, required input authority, or final decision authority is unavailable and no bounded truthful progress remains.
- `FAILED`: an attempted required inspection/composition/write failed; report the exact failure and preserve unresolved truth.

Structural or validator success never proves behavioral decision quality; keep runtime uplift `NOT_RUN` unless representative executions were actually run.
