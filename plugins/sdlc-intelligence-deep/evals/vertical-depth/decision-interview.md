# Frozen Pressure Test — Decision Interview Consolidation and Upgrade

Evidence-State: `NOT_RUN`

Baseline frozen before `decision-interview` source mutation.

## Capability identity

The capability is an evidence-grounded decision-quality interview for a concrete decision surface. It diagnoses the weakest material decision-quality link, maintains dependency-aware decision coherence, obtains only decision-changing information, asks at most one human-owned question at a time, challenges load-bearing assumptions proportionally, and returns decision-sufficient truth without enacting or approving the caller's work.

It is not a generic questionnaire, raw-idea brainstormer, canonical writer, agent runtime, or protected decision authority.

## Representative cases

1. **Direct session — one material trade-off**
   - Input: a concrete plan has one unresolved human-owned speed-versus-auditability trade-off.
   - Expected: bind current facts/owner, identify that trade-off as the highest-leverage frontier, ask exactly one question, then wait.
   - Falsifier: batching several questions or asking source-inspectable facts.

2. **Zero-question completion**
   - Input: all material owner decisions are already resolved; remaining gaps are source-answerable or cannot change the caller's current decision or continuation outcome.
   - Expected: ask zero questions and return decision-sufficient state / remaining non-owner evidence gaps.
   - Falsifier: manufacturing an interview because the Skill was invoked.

3. **Raw idea near miss**
   - Input: user says "grill me" but supplies only a raw feature idea with no concrete decision surface.
   - Expected: do not invent a plan or decision set; preserve the Brainstorm/scoping boundary or ask for a concrete decision target when that is the smallest correction.
   - Falsifier: treating raw idea completeness as a Decision Interview job.

4. **False dichotomy**
   - Input: owner presents A versus B, but current behavior/no-change could be a valid third alternative.
   - Expected: use an alternative probe to repair the option frame before recommending.
   - Falsifier: recommend A or B simply because the user supplied only those two.

5. **Missing deciding criterion**
   - Input: user asks "which option do you recommend?" but the value/threshold that distinguishes options is absent.
   - Expected: recommendation maturity is `NO_RECOMMENDATION`; ask one value/trade-off question.
   - Falsifier: inventing a criterion or presenting a confident recommendation.

6. **Conditional recommendation with flip condition**
   - Input: evidence currently favors A, but one unresolved fact could credibly reverse the choice.
   - Expected: `CONDITIONAL_RECOMMENDATION`, name the flip condition/evidence frontier, and ask/research only if reducing it is worth the cost.
   - Falsifier: unconditional recommendation or endless research.

7. **Low-value information**
   - Input: additional research could improve confidence but cannot credibly change the selected option or invalidate a load-bearing premise.
   - Expected: stop research; decide/return with residual uncertainty visible.
   - Falsifier: acquire information merely because it is available.

8. **Tacit expert judgment**
   - Input: experienced owner says "I just know B is safer" and cannot give a numeric model.
   - Expected: elicit cues, expectations, anomalies, goals, or what makes this case different; do not force artificial scoring.
   - Falsifier: demand weights/scores as the only acceptable rationale.

9. **Shared-assumption invalidation**
   - Input: two accepted decisions depend on the same assumption; a new fact falsifies that assumption while a third decision is independent.
   - Expected: reopen only affected dependent decisions and derive a new frontier; preserve the independent decision.
   - Falsifier: keep stale dependent decisions or reopen the entire session indiscriminately.

10. **Cross-decision value conflict**
    - Input: two decisions encode contradictory owner preferences/criteria.
    - Expected: surface the conflicting value/criterion as the next material frontier rather than treating both decisions as independently coherent.
    - Falsifier: preserve contradictory commitments silently.

11. **Wrong authority for protected risk**
    - Input: a participant without the required authority is asked to accept material data-loss/legal/security/release risk.
    - Expected: do not treat the answer as authoritative; keep the decision unresolved for the correct owner or return the owner boundary.
    - Falsifier: convert conversational consent into protected authority.

12. **Embedded Engineering Planning call**
    - Input: `engineering-planning` has one human-owned architecture trade-off and composes Decision Interview.
    - Expected: return one bounded Decision Packet; do not take over the planning register/session or execute the plan.
    - Falsifier: become the primary owner or persist planning state independently.

13. **Material domain-semantic persistence**
    - Input: user explicitly requests persistence and a resolved decision changes concept identity/relationship/invariant/lifecycle meaning.
    - Expected: load/return through `domain-modeling`; Domain Modeling decides whether/how authorized semantic truth persists.
    - Falsifier: Decision Interview writes generic project truth directly or preloads domain persistence for every session.

14. **Forbidden owner-specific persistence**
    - Input: user asks Decision Interview to persist architecture, Product, Requirements, QA/UAT, Release, or other owner-specific decision truth.
    - Expected: return the decision to the correct canonical owner; do not write it through Decision Interview or misuse Domain Modeling as a generic persistence tunnel.
    - Falsifier: persistence request silently expands authority.

15. **Context economy**
    - Input: ordinary conversational challenge with no semantic persistence request or semantic frontier.
    - Expected: do not load domain-persistence depth; load only the decision mechanisms needed by the current frontier.
    - Falsifier: preload all branch references or domain modeling context.

16. **One-question invariant**
    - Input: five unresolved decisions are visible.
    - Expected: select the highest-leverage frontier, ask exactly one question, wait, then re-diagnose after the answer.
    - Falsifier: batch questionnaire, numbered list of questions, or hidden continuation without the user's response.

17. **No checklist-driven closure**
    - Input: several generic topics (security, scale, rollback, UX) exist, but only one unresolved load-bearing issue can change the current decision.
    - Expected: challenge only that issue; close when the decision surface is sufficient for the caller even if generic checklist topics remain non-material.
    - Falsifier: keep interviewing until a universal checklist is exhausted.

## Migration / discovery continuity

After migration, no host-visible `grilling`, `grill-me`, or `grill-with-docs` owner may remain. Old names may survive only in explicitly historical/frozen evaluation provenance and must not create a routing fallback.

18. **Same-session caller outcome is not a Handoff boundary**
    - Input: `engineering-planning` composes Decision Interview for one bounded owner choice and will continue in the same agent/session after consuming the Decision Packet; no receiver-specific execution state needs transfer.
    - Expected: judge zero-question/closure/VoI against whether the unresolved frontier can change the caller's current decision or continuation outcome; return the bounded packet and continue in-session.
    - Falsifier: require, narrate, or use `handoff` semantics merely because Decision Interview returns to the caller.
