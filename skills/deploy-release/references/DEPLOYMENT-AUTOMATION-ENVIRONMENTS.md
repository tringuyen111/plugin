# Deployment Automation and Environment Engineering

## Contents

1. Boundary: specify automation, do not implement it here
2. Build once / artifact promotion semantics
3. Environment protection and release authority
4. Concurrency, serialization and change windows
5. Credentials, secrets and configuration drift
6. Pipeline stages as evidence production
7. Provider capability and portability
8. Audit/history and deployment identity
9. Failure/repair of automation itself
10. Informative technical basis

Load this reference during `PREPARE` when the Deployment Plan depends on CI/CD, environment
protections, artifact promotion, credentials, configuration, concurrency or provider automation.

## 1. Boundary: specify automation, do not implement it here

Deployment Engineering owns the **behavioral requirements** the automation must satisfy:

- exact artifact/plan/environment binding;
- gates and authority checks;
- concurrency behavior;
- required semantic deployment capabilities;
- pre/postcondition evidence;
- timeout/retry/idempotency behavior;
- recovery/compensation hooks;
- deployment history/provenance.

It does not own writing or editing the CI/CD workflow, application code, IaC module, provider
script or integration adapter. It **must not write or implement a CI/CD pipeline/workflow or provider script**; missing implementation becomes an Engineering/integration handoff.

## 2. Build once / artifact promotion semantics

When QA/release evidence claims one tested artifact, preserve its identity across environment
promotion where the project supports it:

```text
source revision -> built artifact digest -> test evidence -> promotion -> deployed digest
```

Keep environment-specific configuration/secrets separate from artifact identity. If a production
stage rebuilds the artifact, determine whether this creates a new candidate identity; do not assume
source equality proves byte/runtime equivalence.

The plan should state artifact retention and known-good availability for recovery.

## 3. Environment protection and release authority

Environments may enforce reviewers, branch/ref restrictions, wait/change windows, custom policy
checks, or secret access boundaries. Treat these as execution-time policy inputs, not decorative
pipeline steps.

Distinguish:

```text
release candidate is READY_FOR_RELEASE
provider/environment permits a deployment job
a named authority approves this operation
operation policy allows this exact mutation
```

None implies the next automatically. Self-approval or bypass behavior is project/provider policy;
never infer it from executor identity.

## 4. Concurrency, serialization and change windows

A target environment normally needs one coherent writer/change-set unless the plan explicitly
proves independent concurrent progress.

The automation requirement should define:

- environment/change-set concurrency key or lease;
- queue/cancel behavior for stale candidates;
- whether a newer deployment may supersede an older pending deployment;
- maintenance/change window and on-call/rollback coverage;
- how a timed-out job reconciles provider state before retry.

Canceling a workflow does not prove the provider mutation stopped. The execution mode must inspect
current provider/target state before retrying or starting a newer release.

## 5. Credentials, secrets and configuration drift

Never put secret values in the Deployment Plan or evidence. Bind non-secret identities such as:

- environment/secret/config revision/version/checksum;
- credential principal/role/scope where safe to record;
- provider/project/resource scope;
- expiry/rotation constraints.

Plan for how the workload consumes configuration. A successful secret/config write does not prove
the new deployment actually loaded it.

Detect drift between planned configuration and current environment before mutation. Material drift
stales the plan/release fixed point or requires an explicit reconciled change.

## 6. Pipeline stages as evidence production

A useful deployment pipeline is not merely command sequencing. Each stage should produce evidence
needed by the next decision boundary, for example:

```text
artifact identity / provenance
-> environment policy/approval
-> provider operation identity
-> consumed target state
-> readiness/synthetic checks
-> progressive analysis
-> exposure verification
-> monitoring / closure
```

The Deployment Plan states required evidence classes and handoff points. Engineering chooses the
pipeline technology and implements it.

Manual steps are allowed when project policy supports them, but the same fixed-point, authority,
verification and recovery semantics apply.

## 7. Provider capability and portability

Plan in semantic capabilities, such as:

- deploy plan/preview;
- deploy execute/promote;
- deployment state read;
- traffic/exposure change;
- rollback/restore;
- observability/query;
- configuration/secret version read;
- environment policy/approval where represented by the provider.

Resolve concrete provider mappings through `capability-resolver`. Do not encode vendor CLI/API
commands in this core reference.

If the target provider cannot support a required safe strategy (for example attributable canary
analysis or atomic traffic restore), choose a compatible strategy or keep the plan blocked rather
than emulating unsafe behavior with ad-hoc shell commands.

## 8. Audit/history and deployment identity

Persist enough non-secret identity to reconstruct what happened:

- candidate/artifact/plan/release evidence revisions;
- environment and provider operation/deployment identifiers;
- executor source/principal when policy permits;
- authority/policy verdict references;
- timestamps/windows from the actual provider where relevant;
- postcondition and recovery evidence.

Provider deployment history is evidence, not the canonical Product/release/task status source.

## 9. Failure/repair of automation itself

Distinguish automation failure from deployment failure:

- workflow runner failed before mutation;
- provider request may have been accepted but acknowledgment was lost;
- provider operation failed;
- provider operation succeeded but verification failed;
- verifier/telemetry path failed while deployment state is unknown.

After ambiguous automation failure, reconcile provider/target state before retry. A retry that
creates a second deployment from ignorance is a new risk, not recovery.

If the automation cannot satisfy the plan's authority, fixed-point, verification or recovery
requirements, route implementation changes to Engineering rather than weakening the Deployment
Plan to fit the current pipeline.

## 10. Informative technical basis

- GitHub deployment environments/protection rules: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
- GitHub Actions concurrency: https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency
- AWS Well-Architected deployment risk mitigation: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-06.html
- Kubernetes deployment rollout semantics: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
