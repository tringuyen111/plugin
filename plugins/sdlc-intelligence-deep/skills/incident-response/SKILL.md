---
name: incident-response
description: "Coordinate an active or explicitly declared production incident from current impact through stabilization, factual communication, recovery confidence, and command transition. Use when user/critical-operation impact is active and coordinated incident command is required, including uncertain-cause outages, mitigation/containment, rollback or failover under incident conditions, ambiguous operation outcomes, command handoff, or recovery assessment. Do not use for ordinary degraded-but-nonincident operations, historical postmortem/causal-learning work, generic debugging without incident command, or as automatic authority for production writes, security/data forensics, legal decisions, or external communications."
---

# Incident Response

Own the **active incident response state**. Stabilize the current incident under real authority and evidence; do not turn active command into postmortem analysis or ordinary operations.

This Skill must remain independently useful when invoked alone. It may consume technical, security, data, DevOps, or communication evidence when available, but no sibling Skill is a prerequisite for incident command.

## Accountable job

```text
active/declared incident
        |
        v
bind current impact + authority + command state
        |
        v
coordinate bounded stabilization actions
        |
        v
observe + reconcile actual outcomes
        |
        v
reassess impact / recovery confidence
        |
        +--> still active -> continue/replan/escalate
        |
        `--> stable enough -> monitoring/resolution/handoff
```

Complete when current incident state, mutation/communication ownership, recovery evidence, residual divergence, unresolved risk, and next authority are coherent. A postmortem or causal-learning artifact is a separate later job.

## Boundary

Own:

- current incident identity, impact, objective, command state, roles, and mutation coordination;
- containment/mitigation/recovery decision state and evidence;
- factual incident communications package within actual communication authority;
- operation identity, ambiguous-outcome reconciliation, residual state, and retry safety;
- recovery-confidence aggregation and command handoff/closure state.

Do not own:

- technical hypothesis/probe/root-cause mechanism; use technical diagnosis evidence when material, but response can stabilize before cause is known;
- routine release/deployment/scaling/service work below the project incident boundary;
- project severity/SLO/update-cadence/security/privacy/data/legal/public-communication policy;
- security/data forensic conclusions without specialist evidence;
- production-write or destructive authority merely because incident command requests an action;
- historical postmortem/causal-learning ownership, backlog priority, or implementation of later recommendations.

## 1. Bind live incident truth

Use the current incident record or the best authoritative equivalent when one exists. If no formal record exists, construct the smallest working state using [Incident Record](INCIDENT-RECORD.md).

Bind:

- incident identity, environment/services/scope, evidence cutoff and timezone;
- observed user/business/operational impact and material unknowns;
- current project incident/severity policy when available;
- commander/decision owner, mutation owner, communications/specialist owners, and authority gaps;
- active mitigations, provider/request/operation identities, observed postconditions, residual divergence, and recovery state.

Keep these historical truths separate:

```text
observed at time T
believed/hypothesized at time T
action taken + contemporaneous reason
later evidence/conclusion
still unknown now
```

Do not rewrite earlier incident history after later diagnosis.

If current conditions are degraded but do not meet an explicit user/project incident boundary, keep normal operations outside this Skill. If policy is missing, report observed impact and uncertainty rather than inventing a generic severity label.

## 2. Establish command objective and mutation lane

State the current incident objective in terms of impact to reduce or behavior to restore. Maintain one coherent command state even when multiple specialists contribute.

Separate:

- incident command — objective, priority, coordination, decisions, handoff;
- mutation/operations lane — authorized state-changing production actions;
- technical investigation — causal evidence and discriminating probes;
- communications — factual authorized updates;
- specialist lanes — security/data/infrastructure/vendor/legal as project truth requires;
- scribe/evidence — append-only timeline and current state.

Command coordinates; it does **not** authorize. For every protected action, bind the actual production/security/data/legal/communication authority before execution.

## 3. Stabilize before polishing root cause

Do not block an obvious authorized low-regret mitigation merely because root cause is unknown. Technical diagnosis may proceed independently or in parallel.

For each candidate action, reason about:

```text
current impact
+ expected stabilizing effect
+ reversibility / recovery path
+ blast radius / side-effect class
+ preconditions / authority
+ expected signal
+ falsifier / stop condition
+ interaction with other active mutations
```

Prefer bounded actions whose effect can be observed and reversed or contained. Mitigation success is operational evidence; it is not automatic proof of a unique cause.

Read [Incident Command and Stabilization](references/incident-command-stabilization.md) when detailed command structure, mitigation archetypes, security/data branches, ambiguous provider outcomes, communications, or recovery judgment can change the decision.

## 4. Preserve operation identity and reconcile before retry

For every state-changing response action preserve:

```text
target
-> semantic action
-> request/provider/operation identity
-> acknowledgement
-> observed consumed/target postcondition
-> residual effects / divergence
-> next decision
```

A provider acknowledgement, client return, or timeout is not observed success. After timeout or ambiguous outcome, inspect provider/target state before retry when repetition could duplicate or compound effects. Continue from observed residual state, not the desired plan.

## 5. Communicate only current truth

Build updates from:

- supported current impact;
- known mitigation/recovery state;
- material unknowns;
- what changed since the prior update;
- current action at an appropriate abstraction level;
- next update condition/time only when project policy or explicit authority supplies it.

Do not publish an unsupported cause, fabricated ETA, sensitive evidence, or `resolved` while required recovery axes remain unproven. Tool availability is not communication authority.

## 6. Prove stabilization and recovery proportionally

Recovery is not one green graph. Evaluate only applicable axes such as:

- technical health;
- affected user journey;
- business/operational flow;
- data/security integrity;
- capacity/backlog/dependency state;
- recurrence/stability over an evidence-supported observation window.

An applicable `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` cannot support full recovery. Derive observation duration from project policy/system dynamics/evidence; do not invent a generic waiting period.

Keep these meanings distinct:

```text
CONTAINED != MITIGATED != RECOVERED != RESOLVED
```

Move to monitoring/resolution only under named project authority and with residual divergence, cleanup/restoration ownership, support/communication obligations, and unresolved risks explicit.

## 7. Handoff without hidden dependency

For command handoff, transfer a fixed state containing current impact, objective, active/recent actions and outcomes, mutation ownership, communications state, recovery gaps, residual divergence, risks, and next decisions. Require receiving acknowledgement before treating command transfer as complete.

If the user later asks for stabilized-incident causal learning, preserve this fixed incident evidence for that separate job. The learning capability may consume it, but this response Skill is complete without loading or invoking `incident-learning`.

## Failure / re-entry

- If impact or provider state changes materially, re-bind current truth before continuing the plan.
- If an action falsifier fires, stop/replan/escalate rather than continuing because the action was approved earlier.
- If production/security/data/communication authority is missing, block that side effect while continuing safe evidence/coordination work when useful.
- If active command is no longer the terminal job, close/handoff response truth rather than silently continuing into postmortem, implementation, QA, or routine operations.

## Completion

- `READY` — active incident command/impact/mutation/communication/recovery truth is coherent; named authority reached the appropriate monitoring/resolved/handoff state; temporary divergence, residual risk, cleanup obligations, and unknowns are explicit.
- `PARTIAL` — useful response exists but a material current-state/evidence/coordination/recovery link remains incomplete.
- `BLOCKED` — missing authority/capability/policy/current evidence prevents a required safe action or trustworthy response decision.
- `FAILED` — an owned command/state operation failed or left incident truth materially incoherent/unreconciled.

Native validation or packaging proves structure only. Behavioral discovery/response quality remains `NOT_RUN` until representative runtime execution is performed against the exact candidate.
