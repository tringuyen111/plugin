# Deployment Strategy and Change Compatibility

## Contents

1. Strategy is a constraint solution
2. Strategy families
3. Multi-surface change graph
4. Schema/data compatibility and expand-contract
5. Configuration and secret changes
6. Infrastructure changes
7. Concurrency and deployment leases
8. Informative technical basis

Load this reference when choosing/validating rollout strategy, sequencing a multi-surface
change, or reasoning about schema/data/exposure compatibility. It is provider-neutral domain
guidance; the active project profile/provider owns concrete commands and available features.

## 1. Strategy is a constraint solution

Do not choose a rollout mechanism by habit. Start with the release/change graph and solve for:

| Decision variable | Questions |
|---|---|
| Availability | Is downtime allowed? What minimum service capacity must survive? |
| Blast radius | How much traffic/resource population may see an unproven change at once? |
| Parallel capacity | Can old/new environments coexist temporarily? At what cost? |
| Traffic control | Can traffic be shifted by percentage, cohort, tenant, region, or service selector? |
| State compatibility | Can old/new revisions read/write the same schema/data/external protocol safely? |
| Observability | Can the rollout produce timely, attributable, sufficiently sampled evidence? |
| Reversibility | Is rollback technically safe after writes/migrations/external side effects? |
| Warm-up | Does the candidate need startup/cache/model/data warm-up before meaningful evaluation? |
| Change window | Does policy constrain time, approver availability, concurrent changes, or rollback window? |

The strategy is valid only if its required primitives exist in the target environment and its
failure mode fits the approved recovery plan.

## 2. Strategy families

### Rolling / incremental replacement

Useful when old/new instances can coexist and capacity can tolerate bounded replacement.
Key controls:

- maximum unavailable capacity;
- surge/temporary capacity;
- readiness before traffic;
- progress deadline/stall detection;
- graceful termination/drain behavior;
- old/new version compatibility during the overlap window.

Do not call rolling “zero downtime” unless the actual availability/readiness/capacity evidence
supports it. A rolling controller progressing does not prove the application is semantically
ready.

### Blue/green / parallel environment

Useful when parallel capacity is affordable and traffic can switch between old/new targets.
Separate:

```text
new environment becomes technically ready
→ pre-promotion verification
→ traffic/exposure switch
→ post-promotion verification
→ old environment retirement after recovery window
```

Do not scale down/remove the known-good side before the defined rollback/observation window
closes unless authority explicitly accepts the reduced recovery option.

### Canary / progressive rollout

Useful when the environment can expose a bounded population and compare/observe behavior before
full promotion. A canary is not merely “deploy fewer replicas.” Define:

- exposure unit and representative population;
- stage weights/cohorts/regions/tenants;
- pause/observation windows;
- success/failure/inconclusive criteria;
- signal adequacy/minimum traffic or sample requirements;
- abort/restore behavior.

If the candidate population is too small or non-representative for the declared claim, the
analysis is `INCONCLUSIVE`, not PASS.

### Recreate / maintenance-window / in-place

Useful only when downtime or temporary unavailability is explicitly acceptable, the current
state is recoverable, and the change cannot/need not support overlap. Treat this strategy as a
high-consequence availability choice rather than a fallback because the provider lacks safer
mechanisms.

### Feature-controlled or traffic-controlled exposure

Runtime feature flags and traffic controls can decouple **deployment** from **exposure**.
Keep separate identities and evidence for:

```text
artifact/config deployed
provider/control plane ready
feature/traffic activation state
population receiving behavior
business/technical outcomes
```

A feature can be deployed but off; activation may be rolled back without redeploying code.
Conversely a provider/control-plane error can make exposure state `UNKNOWN` even while code
remains deployed.

## 3. Multi-surface change graph

Treat a release as a directed graph, not a list of scripts. Nodes may include:

- application binaries/images/packages;
- jobs/workers/consumers;
- API/protocol versions;
- configuration and secret **references/versions**;
- infrastructure/resources/routing;
- schema changes;
- data backfill/transformations;
- caches/indexes/search materialization;
- feature/traffic controls;
- external integrations.

Edges express compatibility and sequencing. Examples:

```text
new schema must exist before new writer starts
new writer must tolerate old reader during rolling overlap
backfill must reach checkpoint before read-path switch
new service endpoint must exist before callers migrate
old field/table cannot be removed while rollback can restore old code
traffic must not switch before preview readiness/analysis passes
```

Parallel provider resources are not automatically independent if they share a state invariant.

## 4. Schema/data compatibility and expand-contract

When a release changes persistent state, reason explicitly about the **mixed-version compatibility** window and ask separately:

- Can old code read new state?
- Can new code read old state?
- Can both write without corrupting meaning?
- Can a rollback observe/handle writes produced by the new version?
- Is the migration transactional, resumable, idempotent, or irreversible?
- What is the lock/load/duration impact at production scale?

A common compatibility-preserving sequence is:

```text
EXPAND
add compatible schema/state without removing old meaning

DEPLOY COMPATIBLE CODE
old + new revisions can coexist during rollout

MIGRATE / BACKFILL
make progress observable and resumable; bind data checkpoints

SWITCH
move reads/writes/traffic to new meaning after evidence

CONTRACT
remove legacy state only after old revisions/rollback obligations are gone
```

This is a reasoning pattern, not a universal migration script. If the application/domain cannot
support an expand-compatible sequence, make the irreversible boundary explicit and design
roll-forward/containment rather than pretending rollback remains safe.

## 5. Configuration and secret changes

Never expose secret values in deployment evidence. Bind references such as secret/config
version, checksum, revision, or provider identity when available. Verify that the workload
consumes the intended configuration, not merely that a secret/config object write succeeded.

Dynamic configuration may change without a binary deploy. Treat it as part of the deployment
fixed point when it materially changes candidate behavior or recovery safety.

## 6. Infrastructure changes

Provider plan/dry-run evidence can reduce uncertainty but does not grant authority. Evaluate:

- resource creation/deletion/replacement;
- blast radius and shared-resource ownership;
- capacity/quota headroom;
- dependency ordering;
- address/identity/routing change;
- stateful resource replacement/data durability;
- rollback/restore behavior.

A broad infrastructure mutation may require a separate approval even when the application
artifact deployment is preauthorized.

## 7. Concurrency and deployment leases

Normal deployment should have one coherent writer for a target environment/change set.
Before mutation:

- detect an active deployment/rollout or conflicting environment change;
- bind current provider deployment identity/revision;
- serialize or explicitly coordinate a declared multi-component release;
- re-check stale release eligibility when another change altered the target state.

A timeout does not prove failure. Reconcile provider/deployment identity before retrying so a
retry does not duplicate a successful but unacknowledged mutation.

## Informative technical basis

These sources ground the domain concepts but are not project authority or mandatory providers:

- Kubernetes, **Update a Deployment Without Downtime** — rolling update, pause/resume, progress, rollback: https://kubernetes.io/docs/tasks/run-application/update-deployment-rolling/
- Kubernetes, **Liveness, Readiness, and Startup Probes** — distinct startup/liveness/readiness semantics: https://kubernetes.io/docs/concepts/workloads/pods/probes/
- Argo Rollouts, **Analysis & Progressive Delivery** — canary/blue-green analysis with Success/Failed/Inconclusive outcomes: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/
- Argo Rollouts, **BlueGreen** and **Rollback Windows** — pre/post-promotion analysis and recovery window concepts: https://argo-rollouts.readthedocs.io/en/stable/features/bluegreen/ and https://argo-rollouts.readthedocs.io/en/stable/features/rollback/
- AWS Well-Architected, **Employ safe deployment strategies** and **Plan for unsuccessful changes** — bounded rollout, monitoring, rollback/fix-forward planning: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_deploy_mgmt_sys.html and https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_plan_for_unsucessful_changes.html
- OpenFeature, **Introduction** — runtime feature flags decouple behavior activation from code deployment: https://openfeature.dev/docs/reference/intro/
- EF Core, **Applying Migrations** — inspect/test production migrations because schema changes may be destructive: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying
