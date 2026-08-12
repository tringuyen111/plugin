# Deployment Verification and Recovery

## Contents

1. Verify the claim the deployment actually needs
2. Signal attribution and adequacy
3. Progressive-analysis outcomes
4. Provider result versus deployment truth
5. Failure taxonomy
6. Recovery decision model
7. Partial progress and compensation
8. Recovery verification
9. Post-deployment handoff
10. Informative technical basis

Load this reference when defining stage evidence, interpreting progressive signals, diagnosing a
stalled/partial rollout, or choosing rollback versus another recovery action.

## 1. Verify the claim the deployment actually needs

Do not use one generic “health check.” Name the proof target:

| Evidence class | Question |
|---|---|
| Startup/initialization | Did the candidate finish initialization/warm-up rather than remain stuck? |
| Readiness/servability | Can it safely receive intended work/traffic and reach required dependencies? |
| Liveness/progress | Is the process making forward progress rather than merely existing? |
| Identity/consumed state | Is the intended artifact/config/schema/infrastructure actually active? |
| Functional/synthetic | Does a critical request/job/journey work against the deployed candidate? |
| Metrics | Did declared rates/latencies/errors/saturation stay inside release guardrails? |
| Logs | Are blocking errors, retries, crashes, integrity/security events absent/present as expected? |
| Traces | Do dependency paths, latency distribution, errors, and version attribution support the claim? |
| Business/user guardrail | Did the declared user/business risk remain acceptable where required? |
| Exposure | Which population/traffic/tenant/region actually receives the new behavior? |

Not every deployment needs every class. The release risk model chooses the necessary axes.
Missing required axes remain missing; do not compensate by adding more evidence on an easier axis.

## 2. Signal attribution and adequacy

A progressive signal must be attributable enough to the candidate/exposure population. Before
using metrics/telemetry to continue rollout, bind when possible:

- candidate revision/deployment identity;
- environment/region/cluster/tenant/population;
- baseline/control identity when comparing;
- observation window and warm-up delay;
- sample/event/traffic adequacy;
- success/failure thresholds;
- known telemetry lag/missing-data conditions.

Telemetry absence is not automatically healthy. If expected signals are missing or too sparse,
mark the decision `INCONCLUSIVE` and pause/escalate according to the plan.

OpenTelemetry distinguishes metrics, traces, and logs as different signals; use that distinction
to avoid pretending one signal answers another. Project monitoring/SLO definitions remain the
canonical thresholds.

## 3. Progressive-analysis outcomes

Use three semantic outcomes for an analysis/checkpoint:

```text
PASS         evidence supports advancing the declared stage
FAIL         evidence crosses a blocking condition or contradicts required postconditions
INCONCLUSIVE signal is missing, conflicting, too early, too sparse, or between declared decision bounds
```

`INCONCLUSIVE` does not auto-promote. It may cause pause, additional observation, explicit human
decision when policy allows, or abort/recovery. A timer expiring is not itself a PASS.

For baseline-vs-candidate analysis, avoid comparing populations that differ materially in traffic,
tenant mix, region, warm-up, or feature exposure without declaring the limitation.

## 4. Provider result versus deployment truth

Keep these layers separate:

```text
request accepted by provider
operation/job created
provider operation finished
expected target state observed
service/behavior verification passed
exposure verified
```

Only the claims actually observed may be reported. A provider job marked success can still leave
an application not ready, wrong config consumed, failed migration, or broken business behavior.

A write with no read-after-write/consumed-state equivalent remains unverified under the shared
Capability Execution Policy.

## 5. Failure taxonomy

Classify enough to choose a safe next action:

- **PRECONDITION_STALE** — candidate/environment/profile/current state changed;
- **AUTHORITY_BLOCKED** — approval/policy/identity is missing or denied;
- **PROVIDER_UNSUPPORTED/DENIED** — no suitable live provider mapping/scope;
- **STARTUP_FAILURE** — candidate cannot initialize;
- **READINESS_FAILURE** — candidate cannot safely serve required work;
- **ROLLOUT_STALLED** — provider/controller stops making expected progress;
- **ANALYSIS_FAILED** — declared progressive guardrail failed;
- **ANALYSIS_INCONCLUSIVE** — insufficient/ambiguous signal;
- **MIGRATION_FAILURE** — schema/data transition failed or cannot reach checkpoint;
- **PARTIAL_APPLY** — some change-graph nodes applied and others did not;
- **EXPOSURE_FAILURE** — traffic/flag activation is wrong or cannot be verified;
- **POSTCONDITION_MISMATCH** — provider says success but consumed/target state differs;
- **RECOVERY_FAILURE** — rollback/restore/fix-forward action failed or cannot be verified;
- **UNKNOWN** — evidence cannot establish current state after bounded diagnostics.

Do not compress `UNKNOWN` into success/failure solely to finish the workflow.

## 6. Recovery decision model

Freeze further rollout first unless continued execution is required to reach a safe checkpoint.
Then evaluate current state, not the original plan.

### Rollback to known-good

Choose only when:

- known-good target still exists or can be restored;
- old revision remains compatible with current schema/data/external state;
- rollback operation is authorized and supported;
- rollback postconditions are verifiable;
- rollback blast radius is safer than staying/rolling forward.

### Traffic restore / blue-green restore

Useful when old environment remains healthy and state compatibility still holds. Restoring traffic
is not the same as reverting schema/data or infrastructure changes; record remaining mutations.

### Feature disablement

Useful when runtime feature control safely removes user exposure without requiring code rollback.
Verify provider/control-plane state and actual evaluation/exposure when the release risk depends on
it. Do not claim the binary deployment itself was rolled back.

### Roll-forward / repair

Prefer when rollback is unsafe or impossible because of irreversible schema/data/external state,
or when a bounded corrective change is safer. A roll-forward is a **new candidate/change** unless
the approved recovery contract already defines the exact repair operation inside the deployment
transaction; otherwise route back through the required release/authority gates.

### Manual recovery / containment

Use when automation cannot establish a safe reversible action. Preserve exact residual state,
protect data/traffic, and hand control to the named Operations/incident authority.

## 7. Partial progress and compensation

Do not report `PARTIAL` merely because some steps passed. Shared operation policy permits safe
partial progress only when the changeset declared independent partial progress before execution
and canonical state remains coherent.

Otherwise:

```text
some mutations applied + unresolved/failed required mutations
→ FAILED
→ compensate/rollback/contain where safe
→ record each operation result and residual state
```

A successful compensation restores a state boundary; it does not make the attempted deployment
successful. Preserve the original failure.

## 8. Recovery verification

Recovery needs its own evidence:

- intended known-good/repair revision observed;
- traffic/exposure state observed;
- readiness/service health restored;
- schema/data compatibility checked;
- critical user/business behavior checked when required;
- monitoring window/reoccurrence risk recorded.

If rollback was requested but final state cannot be observed, use `ROLLBACK_FAILED` or `UNKNOWN`.
Never infer restored service from a rollback command exit code alone.

## 9. Post-deployment handoff

A technically verified deployment can still carry residual obligations:

- monitoring window;
- runbook/documentation update;
- cleanup/contract migration after rollback window;
- capacity/resource cleanup;
- Product metric observation;
- incident/postmortem work.

Hand those to canonical owners. Do not keep the deployment workflow alive just to consume every
downstream lifecycle step.

## Informative technical basis

- OpenTelemetry, **Signals** — metrics/traces/logs are distinct observability signals: https://opentelemetry.io/docs/concepts/signals/
- Argo Rollouts, **Analysis & Progressive Delivery** — Successful/Failed/Inconclusive analysis semantics and progressive abort/pause: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/
- Kubernetes, **Liveness, Readiness, and Startup Probes** — readiness removes unready workloads from traffic while liveness/startup serve different purposes: https://kubernetes.io/docs/concepts/workloads/pods/probes/
- Kubernetes, **Update a Deployment Without Downtime** — rollout progress, stall detection, pause/resume and rollback: https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/
- GitHub Docs, **Deployments and environments** — environment approval/protection rules and deployment history: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
- AWS Well-Architected, **Plan for unsuccessful changes** — rollback/fix-forward policy, monitoring and recovery planning: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_plan_for_unsucessful_changes.html
