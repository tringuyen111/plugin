# Deployment Archetypes and Risk Lenses

## Contents

1. How to use archetypes
2. Stateless service or container
3. Orchestrated/Kubernetes workload
4. Stateful service
5. Serverless, PaaS, static and edge
6. Schema and data migration
7. Infrastructure / IaC change
8. Multi-region and traffic-shift deployment
9. Immutable artifact promotion
10. Feature exposure / runtime control
11. Composite releases
12. Informative technical basis

Load this reference during `PREPARE` when the release shape changes deployment strategy,
compatibility, evidence or recovery. Archetypes are provider-neutral risk lenses, not product
categories; one release may match several.

## 1. How to use archetypes

For each applicable archetype, identify four things:

```text
unique state/risk -> strategy consequence -> evidence requirement -> recovery consequence
```

Do not select a rollout because a platform is famous for it. A managed platform may still expose
stateful, multi-region, feature-exposure or migration risks that require a composed plan.

## 2. Stateless service or container

Typical properties:

- instances are replaceable and durable state lives elsewhere;
- old/new versions may overlap during rolling or progressive rollout;
- capacity, readiness, draining and external compatibility dominate deployment risk.

Planning lens:

- Can old/new versions serve concurrently against the same dependencies and protocol?
- What surge/max-unavailable capacity preserves the required availability?
- When is a new instance ready for real traffic rather than merely started?
- How are long-lived connections, queues, jobs or drains handled?
- Is a rollback to the old artifact still compatible with state written by the new version?

Evidence: exact artifact/config identity, readiness, request success, latency/error/saturation,
dependency compatibility and traffic/exposure attribution.

Recovery: stop progression, restore traffic/known-good artifact, or roll forward if new writes make
old code unsafe.

## 3. Orchestrated/Kubernetes workload

Container orchestration adds controller semantics that must not be confused with application truth.

Planning lens:

- rolling/recreate/controller strategy and progress deadline;
- startup, readiness and liveness are separate proof targets;
- disruption budgets, surge/unavailable capacity and scheduling headroom;
- graceful termination/drain and dependency readiness;
- controller reports `Progressing/Available` versus actual service behavior;
- stateful controller ordering/partition behavior when the workload is not stateless.

A controller reaching its desired replica count proves controller state, not semantic readiness,
correct consumed configuration or user behavior.

Recovery must account for controller revision history and any external state/schema changes that
were not reverted by workload rollback.

## 4. Stateful service

Stateful services cannot inherit stateless replacement assumptions.

Planning lens:

- canonical writer/leader/primary ownership;
- replication/failover and data durability;
- node/member identity and stable storage attachment;
- quorum and availability during replacement;
- drain/checkpoint/snapshot requirements;
- ordered versus parallel updates;
- version/protocol/storage-format compatibility;
- restore/failback feasibility and time.

Evidence must include state ownership/replication health and application semantics, not only process
health. Recovery may require failover, restore, membership repair or manual containment rather than
redeploying an old binary.

## 5. Serverless, PaaS, static and edge

### Serverless/PaaS

Separate provider revision creation from traffic assignment and observed behavior. Consider:

- version/revision identity;
- traffic split/alias promotion;
- cold-start/warm-up or provisioned-capacity effects;
- runtime/config binding and dependency permissions;
- concurrency limits and regional propagation.

A provider reporting a revision `READY` does not prove the intended traffic population consumes it.

### Static / CDN / edge

Consider:

- immutable asset/build identity and content-addressability when available;
- cache-control and invalidation/propagation behavior;
- HTML/manifest versus chunk compatibility during partial propagation;
- edge-region/version skew;
- origin/alias/route switch;
- rollback as pointer/alias restoration versus cache convergence.

Evidence needs representative edge/population checks when stale propagation is a material risk.

## 6. Schema and data migration

Persistent-state changes are deployment transitions, not a script checkbox.

Planning lens:

- old code reading/writing new state;
- new code reading/writing old state;
- expand-compatible schema versus destructive transition;
- backfill size/duration/lock/load and resumable checkpoints;
- dual-read/dual-write or switch semantics when used;
- rollback compatibility with writes already produced by new code;
- data integrity validation and repair path.

A common safe pattern is expand -> compatible application -> backfill -> switch -> contract, but
use the project/domain's valid state machine rather than forcing that exact sequence.

Production migration tooling/scripts should be inspectable, reviewable and idempotent/resumable
where required by the transition; destructive steps require explicit recovery evidence.

## 7. Infrastructure / IaC change

Infrastructure changes may be part of the deployment graph while architecture ownership remains
elsewhere.

Planning lens:

- create/update/replace/delete semantics;
- shared-resource blast radius and ownership;
- address/identity/routing changes;
- quota/capacity headroom;
- stateful resource/data durability;
- dependency ordering with application/schema changes;
- plan/dry-run evidence and drift;
- restore/recreate time and irreversible provider effects.

A provider plan reduces uncertainty; it does not grant authority or prove the applied state.

## 8. Multi-region and traffic-shift deployment

Region/zone/cluster deployment adds ordering and population semantics.

Planning lens:

- rollout order and maximum simultaneously affected regions;
- traffic steering/failover capability;
- replication/data-consistency lag and write ownership;
- region-specific dependencies/configuration;
- baseline/candidate comparability by population;
- recovery when one region succeeds and another fails;
- global versus regional feature exposure.

Progressive success in one region is not global verification. Preserve regional residual state and
choose continue/pause/restore traffic from the declared blast-radius policy.

## 9. Immutable artifact promotion

Prefer stable artifact identity across environments when the release process claims to promote the
same tested build. Bind digest/version/provenance and environment-specific configuration
separately.

If promotion rebuilds/repackages the artifact, treat that as a new identity unless the project's
artifact contract explicitly proves equivalence. Release/QA evidence for one artifact does not
silently transfer to a different build.

Verification must read the artifact actually consumed by the target environment.

## 10. Feature exposure / runtime control

Feature flags, traffic rules or config can change behavior without a new binary deployment and can
also keep newly deployed code inactive.

Model separately:

```text
code/artifact deployment
control-plane flag/traffic state
evaluation context / targeted population
actual behavior exposure
technical + business outcome
```

A flag update is an external side effect with its own provider/authority/evidence. Restoring a flag
may remove exposure without rolling back code; conversely restoring code may not undo a separate
control-plane change.

## 11. Composite releases

Real releases often combine archetypes. Build one change graph rather than choosing one label.
Examples:

- IaC creates capacity -> schema expands -> app canary -> backfill -> feature exposure -> contract;
- immutable static assets -> CDN propagation -> API compatibility -> traffic/feature activation;
- regional stateful upgrade -> replication catch-up -> traffic shift -> next region.

For each edge, state compatibility and evidence. Parallel operations are safe only when their
shared invariants permit it.

## 12. Informative technical basis

These sources support the domain concepts but are not project authority or provider mandates:

- Kubernetes Deployments and probes: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ and https://kubernetes.io/docs/concepts/workloads/pods/probes/
- Kubernetes StatefulSets: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/
- Argo Rollouts progressive delivery/analysis: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/
- AWS Well-Architected deployment-risk practices: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-06.html
- OpenFeature introduction/evaluation: https://openfeature.dev/docs/reference/intro/
- EF Core production migration guidance: https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying
