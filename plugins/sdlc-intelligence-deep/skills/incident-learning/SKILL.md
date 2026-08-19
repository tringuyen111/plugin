---
name: incident-learning
description: "Analyze a stabilized or historical production incident to produce evidence-grounded causal learning, hindsight-resistant decision context, recurrence insight, and traceable corrective recommendations. Use for postmortems, retrospectives, root-cause learning after stabilization, review of incident timelines/records/logs/metrics, evaluation of detection or response contributors, and recommendation quality. Accept authoritative incident evidence from any source; a prior incident-response Skill run is not required. Do not use for active incident command/stabilization, ordinary debugging probes, production mutation, canonical backlog priority, or automatic implementation of recommendations."
---

# Incident Learning

Own the **stabilized/historical incident learning job**. Convert a fixed evidence set into causal, decision, control, and recurrence learning without rewriting history or turning recommendations into execution.

This Skill must remain independently useful when invoked alone. Accept incident evidence from any authoritative source or equivalent record. `incident-response` may provide useful evidence when it happened to run, but it is never a prerequisite.

## Accountable job

```text
stabilized / historical incident evidence
        |
        v
bind fixed incident + evidence boundary
        |
        v
reconstruct factual timeline + decision context
        |
        v
build evidence-bounded causal/control model
        |
        v
inspect counter-evidence + recurrence scope
        |
        v
recommend changed controls/outcomes + proof targets
        |
        v
durable learning artifact / postmortem
```

Complete when history remains intact, material causal claims match evidence/confidence, decision analysis is hindsight-resistant, recommendations trace to observed mechanisms/control gaps with verifiable outcomes, recurrence scope is bounded, and unresolved questions are explicit.

## Boundary

Own:

- incident-evidence fixed point and learning-specific evidence lineage;
- evidence-backed timeline reconstruction without historical rewrite;
- causal-role analysis and confidence/counter-evidence bookkeeping;
- decision-context reconstruction and hindsight-bias control;
- control-effect learning, recommendation traceability, and recurrence generalization;
- durable incident-learning/postmortem artifact.

Do not own:

- active incident command, live stabilization, current recovery decision, or production mutation;
- technical evidence-mode selection, causal probing, or root-cause verification beyond evidence actually supplied by the diagnosis source;
- security/data forensic or policy conclusions without specialist evidence;
- canonical Product/backlog priority or executable work-graph ownership;
- implementation/design/release of recommendations;
- external communication authority or rewriting the original incident record.

## 1. Bind an incident evidence fixed point

Accept the best authoritative incident evidence available, for example:

- an incident record/ticket/timeline;
- logs, traces, metrics, dashboards, alerts, or provider records bound to time/state;
- responder decisions/actions and contemporaneous communications;
- deployment/configuration/change history;
- technical diagnosis evidence and its confidence boundary;
- recovery/cleanup/residual-divergence state;
- user/business impact evidence.

Do **not** require a document created by another Skill. If several sources conflict, preserve the conflict and source identity instead of silently selecting the cleaner story.

Freeze the evidence cutoff/revision before causal synthesis. Distinguish:

```text
what was observed then
what was believed then
what action was taken + why when known
what later evidence established
what is still unknown now
```

A later conclusion may supersede a hypothesis; it does not rewrite what responders knew at the time.

If impact is still actively evolving and the terminal job is stabilization, this is not the primary capability. Preserve available evidence and keep active command outside this Skill.

## 2. Reconstruct timeline and decision context before causal closure

Build an evidence-backed sequence of material observations, decisions, actions, and outcomes. For consequential decisions, reconstruct only what the evidence supports about:

- information/signals available at the time;
- missing, delayed, noisy, or contradictory signals;
- objective and constraints;
- authority/policy boundaries;
- realistic alternatives available then;
- expected outcome/decision model when inspectable;
- later evidence that changed interpretation.

Do not invent motives or mental state. Blameless analysis does not mean every decision was correct; it means system/control gaps are stated without using hindsight evidence as if responders already had it.

## 3. Build a causal/control graph, not a forced single root cause

Use the smallest set of evidence-supported causal roles needed to explain initiation **and** impact:

```text
[Trigger] --INITIATES--> [Failure mechanism / sequence]
[Enabling condition] --ENABLES_OR_AMPLIFIES--> [Failure / impact]
[Failed or absent control] --FAILS_TO_PREVENT_OR_CONTAIN--> [Failure / impact]
[Detection condition] --ACCELERATES_OR_DELAYS_DETECTION--> [Response start]
[Response condition] --ACCELERATES_OR_DELAYS_RECOVERY--> [Recovery]
[Causal claim] --EXPLAINS_WITH_EVIDENCE--> [Observed impact]
```

Keep distinct:

- trigger / initiating event;
- enabling or contributing conditions;
- failed or absent controls;
- detection contributors;
- response/recovery contributors;
- technical causal claims.

A recent deploy can be a trigger without being the whole cause. Human action can be part of the sequence without being a satisfactory system-level explanation. Do not force a linear 5-Whys chain when interacting conditions better explain the incident.

Read [Incident Learning Analysis](references/incident-learning-analysis.md) when causal confidence, counter-evidence, decision-context, recommendation, or recurrence reasoning can change the learning result.

## 4. Preserve evidence strength and counter-evidence

For each material causal claim preserve:

```text
claim
-> UNKNOWN | HYPOTHESIS | SUPPORTED | VERIFIED
-> evidence reference + evidence mode when available
-> provenance / time-state alignment / demonstrated scope
-> supporting evidence
-> counter-evidence / conflicts
-> unknown assumptions / missing observations
-> confidence boundary
-> evidence that would strengthen, weaken, or falsify the claim
```

Do not upgrade confidence because a narrative is coherent, because responders agree, or because a recent change is convenient. If two mechanisms cannot be discriminated, preserve both and name the smallest missing discriminator.

Technical diagnosis may supply causal evidence, but this Skill does not need a diagnosis sibling to exist. With insufficient evidence, produce bounded learning and an explicit investigation gap rather than inventing certainty.

## 5. Turn findings into changed-control hypotheses

A corrective recommendation must connect an observed failure/control gap to an intended effect and a way to tell whether the change worked:

```text
observed failure / unsafe assumption
        |
        v
control deficiency
        |
        v
candidate intervention
        |
        v
intended effect: PREVENT | DETECT | MITIGATE | RECOVER | LEARN
        |
        v
evidence target / verification / falsifier
        |
        v
suggested owner / planning handoff
```

Do not confuse effect classes. A faster alert is usually `DETECT`; a rollback drill may improve `RECOVER`; neither proves `PREVENT` unless the mechanism supports that claim.

Reject vague vigilance-only recommendations such as “be careful,” “monitor more,” or “remember to check” unless they become a concrete changed control/decision aid with an observable effect.

Do not assign canonical priority. If an existing work item already owns the outcome, link/reconcile it rather than creating duplicate tracker truth.

## 6. Generalize recurrence by mechanism, not resemblance

State the generalized failure mechanism or unsafe assumption first. Then identify other services/flows/components only where the same applicability conditions may hold, and name the bounded evidence/probe needed to confirm exposure.

Do not turn one incident into an unbounded architecture audit. Hand broader design/engineering/product work to the appropriate owner with the incident finding, mechanism, scope, and evidence boundary intact.

## 7. Produce the learning artifact without taking execution authority

Use [Learning Record](LEARNING-RECORD.md) when a durable postmortem/retrospective artifact is useful. A conversational analysis may be shorter, but it must preserve the same causal/evidence/decision/recommendation semantics when material.

If later executable work is requested, treat that as a new terminal job. This Skill does not silently implement code/config/provider changes, release fixes, mutate production, send external communications, or prioritize the backlog merely because learning identified an action.

## Failure / re-entry

- If source revisions conflict or the evidence fixed point is unstable, resolve/record lineage before strengthening causal claims.
- If counter-evidence weakens the leading explanation, reopen the causal model rather than defending the narrative.
- If a recommendation cannot name the linked finding, intended effect, and proof target, return to the control gap.
- If the incident becomes active again and stabilization is now the terminal job, stop learning ownership and preserve the fixed evidence already gathered.

## Completion

- `READY` — fixed incident/timeline is preserved; causal/control claims match evidence/confidence; historical decisions are reconstructed without hindsight rewrite; recommendations are traceable and verifiable; recurrence scope and unresolved questions are explicit.
- `PARTIAL` — useful learning exists but a material evidence/causal/decision/recommendation link remains incomplete.
- `BLOCKED` — missing or irreconcilable evidence prevents a trustworthy required learning claim/artifact.
- `FAILED` — an owned analysis/materialization operation failed or left the learning artifact materially incoherent.

Native validation or packaging proves structure only. Behavioral discovery/learning quality remains `NOT_RUN` until representative runtime execution is performed against the exact candidate.
