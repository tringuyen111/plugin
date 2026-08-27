# Incident Command and Stabilization Model

Use this reference when active impact requires command coordination, production mitigation, recovery judgment, a sensitive security/data-integrity branch, or command handoff. Keep provider commands, severity thresholds, SLOs, communication cadence, regulatory obligations, and observation durations in project truth.

## Contents

1. Command model
2. Incident outcome semantics
3. Impact and objective model
4. Mutation lane and change coordination
5. Stabilization action loop
6. Mitigation archetypes
7. Ambiguous outcomes and retry safety
8. Security and data-integrity branch
9. Communication truth
10. Recovery confidence
11. Monitoring, resolution, and handoff
12. Anti-patterns

## 1. Command model

An active incident needs one coherent command state even when many specialists contribute.

Separate these lanes:

- **Incident command** — maintains current impact, priorities, roles, decision state, mutation coordination, unresolved risks, and handoff.
- **Operations/mutation lane** — performs authorized state-changing production actions. Incident command coordinates this lane but does not create authority for it.
- **Technical investigation** — under the technical-diagnosis capability when needed, selects a safe discriminating evidence path (`REPRODUCTION | OBSERVATION | FORENSIC | INSUFFICIENT`), forms falsifiable hypotheses, runs probes/instrumentation within authority, and returns causal evidence at the confidence actually supported.
- **Communications** — prepares and sends authorized factual updates without inventing cause, ETA, or recovery confidence.
- **Specialist lanes** — security, data, infrastructure, vendor, legal/compliance, or other project-defined owners contribute their domain evidence without replacing incident command.
- **Scribe/evidence** — preserves one append-only timeline and current incident state.

Read-only investigation may proceed in parallel. State-changing production actions belong to the coordinated mutation lane unless explicit independence is established.

Incident command does **not** choose or strengthen the technical evidence mode. It records the diagnosis owner's selected mode, symptom/provenance/time or state alignment, discriminating result, and confidence. A production-only failure may be investigated from observation or forensic artifacts when replay is unsafe or unrepresentative; `INSUFFICIENT` blocks causal/root-cause claims but does not block an otherwise obvious bounded authorized stabilization action.

### Command handoff

A command handoff is not complete because a new person joined the channel. Transfer a fixed incident snapshot containing:

- current state and impact;
- active objective;
- active and recently completed mitigation actions;
- observed outcomes and unresolved falsifiers;
- current mutation owner and pending side effects;
- communications state and next update commitment;
- recovery-confidence gaps;
- residual divergences and risks;
- next decisions and named authorities.

Require explicit acknowledgement from the receiving commander/authority before treating command transfer as complete. Preserve the previous commander and handoff timestamp in the incident record.

## 2. Incident outcome semantics

Do not collapse these states:

- **Containment** — blast radius or propagation is bounded. The service may still be impaired.
- **Mitigation** — impact is reduced by an intervention. The underlying fault or divergence may remain.
- **Recovery** — applicable technical, user, business, data/security, and capacity/backlog behavior has returned to an evidence-supported acceptable state for the current incident.
- **Resolution** — named authority accepts recovery evidence, residual risk, temporary divergence, follow-up ownership, and monitoring requirements and closes active incident command.

Containment does not imply mitigation. Mitigation does not imply recovery. Recovery does not imply resolution.

`MONITORING` means active mitigation/recovery evidence is sufficient to observe for recurrence under project policy, not that the incident is already resolved.

## 3. Impact and objective model

Maintain impact as current evidence, not as a frozen opening description. Reassess when scope or symptoms change.

Consider only applicable dimensions:

- affected user/persona/tenant/region;
- critical user journeys or operational flows;
- service/API/job availability and correctness;
- business/financial/operational effect;
- data integrity, confidentiality, or unauthorized access concern;
- dependency/downstream propagation;
- capacity saturation, queue/backlog, retry storm, or resource exhaustion;
- duration and rate of change;
- uncertainty and missing observability.

For each active stabilization cycle, write one current objective such as:

> Stop new failed writes while preserving existing data and keeping reads available.

An objective describes the incident outcome sought. It is not the implementation action itself.

## 4. Mutation lane and change coordination

During active impact, uncontrolled concurrent production changes are a hazard.

Default rule:

1. identify the current mutation owner;
2. serialize state-changing mitigations that affect the same causal surface;
3. bind each action to an incident objective and effect boundary;
4. record dependencies on active deployments, migrations, flags, traffic shifts, or infrastructure changes;
5. verify observed outcome before starting another action that would make attribution materially ambiguous.

Parallel state changes are allowed only when all are explicit:

- actions affect independent surfaces or delay creates greater documented risk;
- owners and authorities are named;
- interaction/blast-radius risk is considered;
- evidence can distinguish each action's effect sufficiently for the next decision;
- compensation/recovery interaction is understood.

Do not freeze harmless read-only evidence gathering. The mutation lane controls state-changing production actions, not all incident work.

A project may impose a formal change freeze. If so, consume that policy. Do not invent a global freeze rule; preserve any allowed emergency-change path and its authority.

## 5. Stabilization action loop

Every material mitigation uses an action card before execution:

```text
action id
-> current incident objective
-> proposed action + target scope
-> preconditions / dependency state
-> expected signal(s)
-> falsifier / stop condition
-> side-effect class
-> owner + required authority
-> concurrency / mutation-lane relation
-> recovery / compensation option if applicable
-> execute only if policy permits
-> observed outcome
-> reconcile ambiguous state
-> decision: continue | stop | replan | escalate | continuation
```

### Expected signal

State what would make the mitigation look effective, using available evidence. Examples:

- error rate falls in the affected path;
- successful requests recover for the impacted cohort;
- queue growth stops and begins draining;
- propagation to another region stops;
- new corrupt writes stop;
- dependency timeout rate returns to a project-acceptable range.

Do not hard-code universal thresholds. Use project policy, baseline, incident evidence, or explicit temporary criterion and preserve the source.

### Falsifier / stop condition

State evidence that should stop or reverse the action, for example:

- target signal worsens;
- blast radius expands;
- a new data-integrity/security symptom appears;
- capacity headroom collapses;
- the action does not change the intended signal and its causal usefulness is exhausted;
- observed provider state differs from the requested state.

An approved plan is not permission to continue after its falsifier is observed.

### Correction decision

After observing the action, choose explicitly:

- **continue** — action is producing expected evidence and the next bounded step remains valid;
- **stop** — objective is met or risk now exceeds expected benefit;
- **replan** — evidence contradicts the current mitigation model;
- **escalate** — missing authority/capability/specialist evidence blocks safe continuation;
- **continuation** — the current incident action loop does not own the next domain action; expose the required concern/owner and bounded evidence. Create a handoff only when a real owner/session/runtime state-transfer boundary requires it.

## 6. Mitigation archetypes

Use archetypes as decision prompts, not automatic recommendations. Choose according to impact, reversibility, compatibility, provider capability, and evidence.

### Traffic isolation or shift

Useful for localized failure, dependency isolation, unhealthy region/instance, or progressive containment. Check capacity of the receiving path, state/session compatibility, replication/data concerns, and whether traffic movement hides rather than fixes correctness problems.

### Feature disablement / kill switch / degraded mode

Useful when a bounded feature/path causes impact and exposure can be safely reduced. Verify shared dependencies, data already written, user fallback behavior, and residual divergence. Deployment state and feature exposure are separate truths.

### Rollback

Use only when the prior state is compatible and rollback is actually safer than continuing. Check schema/data compatibility, external side effects, irreversible writes, dependency contracts, and current provider state. A rollback request is not recovery evidence.

### Roll-forward / corrective change

Prefer when rollback is unsafe or the current state can be repaired with a smaller bounded change. Treat the corrective change as a new incident action with its own expected signal/falsifier and authority.

### Capacity action / load shedding

Useful for saturation or retry amplification. Check whether increased capacity addresses the bottleneck, whether downstreams can absorb load, and whether load shedding preserves the most critical behavior.

### Dependency isolation / circuit behavior

Useful when an external/internal dependency drives cascading failure. Check fallback correctness, data consistency, retry behavior, and recovery when the dependency returns.

### Read-only / write restriction / containment mode

Useful when write correctness or integrity is uncertain. Preserve the business cost and criteria for re-enabling writes; do not silently treat degraded operation as full recovery.

### Failover

Use when alternate capacity/state is sufficiently current and compatible. Verify replication lag/data loss bounds, traffic/DNS/session behavior, and re-failback implications using project evidence.

## 7. Ambiguous outcomes and retry safety

Provider acknowledgement, request submission, or transport timeout is not observed success.

For a state-changing action:

1. capture the requested operation identifier when available;
2. inspect the consumed/target state after the request;
3. determine whether the action was applied, partially applied, rejected, queued, or remains unknown;
4. **reconcile before retry** when repeating the request could duplicate or compound the effect;
5. retry only under the operation's idempotency/duplicate-prevention and authority contract;
6. preserve `UNKNOWN`/`PARTIAL` when state cannot be proven.

If provider/source state is unavailable, do not manufacture a successful mitigation from a client-side return value.

## 8. Security and data-integrity branch

When the incident includes suspected unauthorized access, credential compromise, data corruption, loss, confidentiality breach, tampering, or integrity uncertainty:

- mark security/data integrity as an explicit impact axis;
- preserve relevant evidence and timestamps before unnecessary destructive changes when safe and authorized;
- minimize uncontrolled mutation and credential exposure;
- prioritize containment of ongoing harmful behavior;
- do not infer that service availability recovery means security/data recovery;
- identify the project security/data specialist owner and hand specialized investigation to that owner;
- preserve technical diagnosis support separately; incident command does not invent forensic/root-cause conclusions;
- consume project legal/compliance/notification policy if it exists rather than generating generic obligations.

A security/data branch can constrain a normal availability mitigation when that mitigation would destroy evidence or worsen integrity risk. Keep the conflict explicit and escalate to named authority.

## 9. Communication truth

Each communication package should distinguish:

- **known** — supported facts about impact/current state;
- **unknown** — material uncertainty;
- **changed since last update** — new evidence/actions/outcomes;
- **current action** — what the response team is doing at the appropriate abstraction level;
- **next update** — commitment derived from the project's chosen cadence or explicit incident decision.

Do not publish:

- unsupported root cause;
- fabricated ETA;
- internal secrets/credentials/sensitive evidence;
- security details that violate project disclosure policy;
- “resolved” while required recovery axes remain unverified.

Sending pages, external status updates, customer messages, or creating external war rooms are side effects. Incident command does not create communication authority.

## 10. Recovery confidence

Recovery is an evidence aggregation decision, not a single green metric.

Build an applicability-driven matrix:

| Axis | Examples of evidence | Possible result |
|---|---|---|
| Technical health | request success, latency, errors, component health | PASS / FAIL / INCONCLUSIVE / N/A |
| User journey | critical end-to-end behavior for affected users | PASS / FAIL / INCONCLUSIVE / N/A |
| Business/operations | orders/jobs/payments/workflows progressing correctly | PASS / FAIL / INCONCLUSIVE / N/A |
| Data/security | integrity checks, harmful access contained, consistency evidence | PASS / FAIL / INCONCLUSIVE / N/A |
| Capacity/backlog | headroom, queue drain, retry amplification, saturation | PASS / FAIL / INCONCLUSIVE / N/A |
| Recurrence/stability | behavior remains acceptable for an evidence-supported observation window | PASS / FAIL / INCONCLUSIVE / N/A |

Rules:

- determine applicability from incident impact and changes; do not force irrelevant axes;
- an applicable `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` cannot support full recovery;
- derive the observation window from project policy, system dynamics, or explicit evidence; **do not invent a generic observation duration**;
- if observability cannot prove an applicable axis, preserve the gap rather than upgrading confidence;
- temporary mitigation can support recovery while still creating residual divergence that must remain tracked.

## 11. Monitoring, resolution, and handoff

Move toward `MONITORING` only when immediate harmful behavior is contained/mitigated and applicable recovery evidence is sufficient to observe for recurrence under project truth.

Move to `RESOLVED` only when named authority accepts:

- recovery-confidence result;
- current impact state;
- residual risk/unknowns;
- temporary mitigations and **residual divergence**;
- pending cleanup/restoration work and owner;
- communication/support obligations;
- incident-learning/postmortem transition criteria when applicable.

Do not erase temporary changes after resolution. Record disabled features, emergency config, traffic shifts, added capacity, bypasses, degraded modes, manual data repairs, or other divergence until an owner restores or intentionally adopts them.

## 12. Anti-patterns

Reject these patterns:

- everyone changes production independently because the incident is urgent;
- “provider accepted request” == mitigation succeeded;
- “error graph is green” == recovered;
- containment == resolution;
- rollback is always safer than roll-forward;
- root-cause hunt blocks obvious reversible stabilization;
- incident command writes technical root cause without Engineering evidence;
- incident command self-authorizes deployment, destructive changes, or external communications;
- generic SEV/SLO/ETA numbers are presented as project policy;
- security/data integrity is collapsed into normal availability recovery;
- shift handoff occurs without acknowledged state transfer;
- resolved incident silently discards emergency configuration or cleanup debt.

## Contrastive SHOW — stabilization without root-cause laundering

**Unknown cause, obvious mitigation:** one region is producing severe user errors and an already-authorized traffic shift to a healthy region is available. Coordinate the shift and verify impact while technical diagnosis continues in parallel. Do not delay low-regret stabilization for a polished root cause, and do not claim the shift proves why the region failed.

**Rollback timeout:** provider creates rollback operation `R17`, then the client times out. Preserve `R17`, inspect provider and target deployment/exposure state, and continue from observed residual state. Do not issue a second rollback merely because the first client call lacked a final response.
