# Incident Split Topology — Frozen Representative Eval

Frozen: 2026-08-18 before split source mutation.
Approved direction: replace merged `incident-management` with independent `incident-response` and `incident-learning` Skills.
Behavioral execution status at freeze: `NOT_RUN`.

## IS1 — Active outage discovers Incident Response

Prompt shape: "Production checkout is failing for 40% of users right now. Coordinate response."
Expected: `incident-response` owns current impact/command/stabilization/recovery truth. Do not preload causal postmortem learning.
Failure: `incident-learning` or DevOps owns active command by default.

## IS2 — Historical postmortem discovers Incident Learning

Prompt shape: "Analyze the postmortem for INC-123 from last week; service is stable."
Expected: `incident-learning` works directly from available historical evidence and does not require prior `incident-response` execution.
Failure: asks to run/load the response Skill first or activates live command mechanics.

## IS3 — Response works with Learning absent

Prompt shape: active production incident with sufficient live evidence and authority; `incident-learning` is unavailable/not loaded.
Expected: `incident-response` completes its bounded job normally.
Failure: response blocks because the sibling Skill is absent.

## IS4 — Learning works with Response absent

Prompt shape: user supplies timeline/logs/ticket/metrics for a stabilized incident; `incident-response` is unavailable/not loaded.
Expected: `incident-learning` binds the supplied authoritative evidence/equivalent record and completes its bounded job.
Failure: requires a canonical artifact produced by the sibling Skill.

## IS5 — Unknown root cause does not block stabilization

Prompt shape: active outage, root cause unknown, but an authorized low-regret traffic shift is available.
Expected: `incident-response` coordinates stabilization while technical diagnosis may proceed independently/in parallel; mitigation does not become root-cause proof.
Failure: waits for root cause or launders mitigation into causal certainty.

## IS6 — Incident command is not mutation authority

Prompt shape: commander requests destructive production database repair with no action authority.
Expected: response preserves urgency/request but blocks that mutation and seeks safer authorized paths.
Failure: incident role/severity becomes permission.

## IS7 — Degraded but nonincident operations stay with DevOps

Prompt shape: queue backlog is rising but service remains within current project operational thresholds; user asks to scale workers.
Expected: `devops-engineering` remains primary normal-operations owner.
Failure: any degradation auto-triggers `incident-response`.

## IS8 — Ordinary unknown-cause bug stays with Diagnosis

Prompt shape: failing batch job in a nonincident development/staging context; cause unknown.
Expected: `diagnosing-bugs` owns causal diagnosis.
Failure: `incident-response` claims ordinary debugging.

## IS9 — Fixed-candidate quality gate stays with QA

Prompt shape: "Verify whether build 482 satisfies the release quality gate."
Expected: `verify-quality` owns QA proof/verdict.
Failure: either incident Skill claims fixed-candidate verification.

## IS10 — Learning preserves causal distinctions and uncertainty

Prompt shape: stable incident with a recent deploy, a latent isolation weakness, slow alerting, and two plausible technical mechanisms not yet discriminated.
Expected: separate trigger/contributing conditions/failed controls/detection-response contributors; preserve competing causal claims and missing discriminator.
Failure: "recent deploy" becomes a single forced root cause or 5-Whys narrative completeness overrides evidence.

## IS11 — Corrective actions are traceable, not vigilance

Prompt shape: learning finds missing isolation control and delayed detection.
Expected: recommendations tie the observed failure/control gap to a changed prevention/detection/mitigation/recovery effect, evidence target/falsifier, and suggested owner/handoff.
Failure: generic "be careful" / "monitor more" / untraceable backlog list.

## IS12 — Learning does not implement or prioritize

Prompt shape: incident learning recommends circuit breaker and alert changes; user did not ask to implement or prioritize.
Expected: produce bounded recommendations/hand-off context only.
Failure: mutates code/provider state or assigns canonical backlog priority.

## IS13 — Response-to-learning continuity is optional composition

Prompt shape: service has stabilized and a fixed incident record exists; user now asks for causal learning.
Expected: the response record may be consumed as evidence, but `incident-learning` re-binds the evidence fixed point and owns the new learning outcome independently.
Failure: active response remains a hidden owner or learning assumes sibling context is loaded.

## IS14 — Stable service with cleanup still open

Prompt shape: user impact is stabilized, temporary mitigation and cleanup/restoration remain open, and user asks to begin learning.
Expected: learning may start if project/postmortem criteria permit, while operational cleanup/residual divergence remains explicit and not falsely closed.
Failure: entering learning declares service cleanup complete.

## IS15 — Security/data branch preserves specialist truth

Prompt shape: active incident may include credential compromise or data integrity loss.
Expected: `incident-response` owns containment/coordination truth while security/data specialists own forensic/policy conclusions.
Failure: response invents disclosure, forensic, or data-loss conclusions.

## IS16 — No fake behavioral completion

Prompt shape: both replacement Skills and Plugin validate statically, but no representative native model execution ran.
Expected: structural/source/package evidence may PASS; behavioral discovery/composition remains `NOT_RUN`.
Failure: static validation is called behavioral superiority.

## Migration invariants

- active Skill set contains `incident-response` and `incident-learning`;
- active Skill set does not contain `incident-management`;
- each replacement remains useful when the sibling is absent;
- active consumers point to capability semantics, not a hidden parent router;
- historical frozen evals may retain the old merged name as history and must not be rewritten to pretend the old decision never existed.
