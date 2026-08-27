# Operational Health Model

## Table of contents

1. Purpose and boundary
2. Operational fixed point
3. Expected state and objectives
4. Evidence quality
5. Applicability-driven health dimensions
6. Health-state semantics
7. Incident boundary
8. Post-deployment monitoring
9. Capacity, backlog and dependency risk
10. Signal conflict and missing evidence
11. Decision patterns
12. Primary domain references

## 1. Purpose and boundary

Operational health answers a bounded question: **what does current evidence support about the
service's ability to operate within the project-defined expectations for this exact scope now?**

It is not:

- a dashboard summary;
- an inferred technical root cause;
- a Product-success verdict;
- a release/deployment decision;
- an incident declaration without the project's incident policy/authority;
- proof that every possible service dimension is healthy.

A health assessment becomes useful only when its fixed point, evidence definitions and coverage are
inspectable enough that another owner can reproduce why the state was claimed.

## 2. Operational fixed point

Bind material identity before comparing signals:

```text
service/workload
exact environment / region / tenant / population scope as applicable
current release/deployment/config identity when it changes expected behavior
operational objective / SLO / alert-policy revisions when defined
evidence cutoff / observation window / telemetry-definition revision
critical dependency versions/state when material
capacity/backlog/data assumptions when material
known maintenance, temporary divergence, or post-deploy monitoring condition
current incident/change/concurrency state
```

Material identity drift makes prior evidence potentially non-current. Rebind before carrying a
health verdict forward. An old `HEALTHY` label is not a cache that survives a changed release,
telemetry definition, dependency, SLO, environment or maintenance state.

## 3. Expected state and objectives

Use the strongest available project-owned truth:

1. explicit SLO/SLI or service objective;
2. explicit health/alert/guardrail policy;
3. verified service/runbook/deployment postconditions;
4. architecture/operational expectation with visible evidence limitations.

**Do not invent an SLO, threshold, error budget, latency target, capacity headroom, observation
window or incident trigger.** When policy is absent, distinguish observation from judgment:

```text
Observation: queue depth doubled over the last 20 minutes.
Policy/limit: not provided.
Claim: trend is observable; whether it violates an operational limit is UNKNOWN.
Next: obtain the owned capacity/queue policy or compare with a source-backed safe bound.
```

Historical normal values can be contextual evidence but do not silently become authoritative
thresholds.

## 4. Evidence quality

For every load-bearing signal preserve:

- signal/metric/log/event identity and definition;
- source/provider and environment;
- population/instance/region scope;
- time window and evidence cutoff;
- freshness/lag;
- coverage and missing partitions;
- instrumentation/schema/version change;
- aggregation/statistical caveats;
- known sampling/filtering/exclusion;
- conflicts with another source.

A fresh provider response can still be the wrong metric, wrong population or partial coverage.
Conversely, an unavailable signal does not block a health claim when that dimension is demonstrably
not applicable to the claimed scope and the reason is explicit.

## 5. Applicability-driven health dimensions

Do not use a universal checklist. Select dimensions whose failure could materially invalidate the
claimed health scope.

### Availability and critical behavior

Consider request/task success, critical user/system journeys, endpoint/job availability, expected
background processing, scheduled work, or other project-defined service function.

### Latency and responsiveness

Use appropriate distributions/percentiles or task completion timing when defined. Averages can hide
tail degradation. Do not invent a percentile target.

### Errors and correctness

Separate infrastructure/provider failure, application errors, rejected requests, retries,
duplicates, incorrect outputs, and silent correctness/data errors when they have different meaning.

### Saturation, capacity and backlog

Assess headroom and work accumulation using project evidence: compute/memory/connections/threads,
queue depth/age, backlog drain rate, retry amplification, quotas, storage, rate limits, worker
capacity, or other bottlenecks that are actually material.

A service can be functionally green while becoming `AT_RISK` because saturation/backlog evidence
shows that safe operating headroom is disappearing.

### Dependencies

A locally green service is not globally healthy when a critical dependency is failing, stale,
rate-limited or capacity-constrained in a way that threatens the claimed scope. Preserve dependency
scope and fallback/degraded-mode truth.

### Data integrity

When the service writes/transforms durable data, health may require freshness, completeness,
replication/consistency, duplicate/loss bounds, schema compatibility, backlog or reconciliation
checks. Do not treat HTTP success as data correctness.

### Operational objectives and guardrails

Evaluate explicit SLO/SLI/guardrail/error-budget or service-policy truth only when definitions and
windows are available. SLO compliance is important evidence, but service health may also need
immediate correctness/capacity/dependency evidence outside the SLO aggregation window.

## 6. Health-state semantics

### `HEALTHY`

Use only when current evidence sufficiently covers every **applicable** dimension needed for the
claimed scope and no material contradiction is unresolved.

`HEALTHY` does not mean perfect, no latent defects, no future risk, or Product success.

### `DEGRADED`

Use when current evidence supports impaired service behavior, quality, guardrail compliance or
required operational function. State impact scope and uncertainty. Degradation alone does not
self-declare an incident.

### `AT_RISK`

Use when current behavior may remain acceptable but evidence shows material impending risk:
shrinking headroom, growing backlog, expiring temporary mitigation, dependency instability,
maintenance debt, known capacity limit, or another source-backed condition requiring recheck/action.

### `UNKNOWN`

Use when missing/ambiguous/conflicting/stale evidence prevents a defensible current health claim.
`UNKNOWN` is often safer and more actionable than optimistic inference.

## 7. Incident boundary

Normal operations must not absorb incident command.

Use project-owned incident criteria and authority. A transition may be justified by current user/
production impact, critical operation failure, data/security consequences, sustained policy breach,
or another owned trigger. Do not invent a generic severity or duration.

When the condition meets that boundary:

1. freeze current service/environment/evidence identity;
2. preserve known recent changes/operations and residual state;
3. hand active command to `incident-response`;
4. continue only as a supporting evidence/operations source when that owner requests it.

When the boundary is not met, retain normal `DEGRADED`, `AT_RISK`, or `UNKNOWN` operational truth.

## 8. Post-deployment monitoring

A closed Deployment Execution Record may provide the next operational fixed point:

- final deployment state;
- feature exposure state;
- residual mutations/risk;
- monitoring window;
- expiry/recheck condition;
- known temporary divergence;
- next material objective/owner when one exists.

Normal operations consumes that **exact fixed point** after the deployment transaction closes. Switch from `RELEASE_CHANGE` to `OPERATE_SERVICE` rather than keeping release execution active merely to poll health. Conversely, stay in `RELEASE_CHANGE` while rollback/roll-forward remains part of the active deployment transaction.

At monitoring-window expiry or trigger:

```text
rebind current service/deployment truth
-> read current applicable evidence
-> compare against declared post-deploy/recovery/operational expectations
-> classify health/risk
-> close recheck | continue monitoring | routine action | incident transfer | return to RELEASE_CHANGE | ENGINEER_SYSTEM
```

## 9. Capacity, backlog and dependency risk

Capacity reasoning should distinguish current utilization from **headroom under expected demand and
failure modes**. Useful questions include:

- Is the limiting resource identified or only assumed?
- Is backlog stable, growing or draining?
- Is work age increasing even if queue length is stable?
- Are retries/duplicate work amplifying load?
- Can the service tolerate loss of one instance/zone/dependency path under current headroom?
- Is a temporary capacity increase itself creating downstream pressure or cost/risk?
- Are quotas/rate limits close enough to make current traffic unsafe?

Do not generalize one resource metric into system saturation. A healthy CPU graph cannot disprove a
connection, storage, quota, queue or downstream bottleneck.

## 10. Signal conflict and missing evidence

Conflict is evidence, not noise to average away.

Examples:

- synthetic journey passes while real error rate rises;
- local service metrics are green while dependency errors rise;
- aggregate latency is stable while one critical region degrades;
- queue length is stable while oldest-item age rises;
- dashboard metric is green after an instrumentation definition changed.

Preserve the conflict, identify what conclusion it blocks, and collect discriminating evidence. Do
not cherry-pick the signal most convenient for a desired health state.

## 11. Decision patterns

### One green signal

Result: not enough for global health unless the claimed scope truly has one applicable dimension.
State coverage explicitly.

### Missing threshold but obvious trend

Result: report the trend and risk hypothesis; do not invent a threshold. Obtain project policy or a
source-backed engineering bound before declaring breach/compliance.

### Degraded but below incident boundary

Result: retain `DEGRADED`; choose bounded recheck/routine action/diagnosis as evidence supports.

### Healthy but expiring temporary mitigation

Result: current health may be `HEALTHY` while operational risk is `AT_RISK`; schedule the declared
recheck/cleanup owner rather than hiding the temporary divergence.

### Conflicting metrics/logs

Result: `UNKNOWN` or the narrowest supported degraded claim until conflict is resolved.

## 12. Primary domain references

Informative grounding; project policy remains authoritative:

- Google SRE Book, Monitoring/operations principles and service responsibilities: https://sre.google/sre-book/introduction/
- Google SRE Book, Eliminating Toil: https://sre.google/sre-book/eliminating-toil/
- AWS Well-Architected Operational Excellence, Operate: https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/operate.html
- AWS Well-Architected, Use runbooks to perform procedures: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_use_runbooks.html
- OpenTelemetry signal concepts: https://opentelemetry.io/docs/concepts/signals/
