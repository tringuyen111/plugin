# Delivery System Engineering

Use this reference when the DevOps objective changes the path from source to a verifiable production state: CI/build/test integration, artifact publication and promotion, deployment automation, IaC/environment/configuration, observability-as-code, environment protections, credentials/trust boundaries, concurrency, or provider delivery seams.

Treat the delivery path as a **production-affecting system with executable code, trust boundaries, durable state, and evidence contracts**. The job is not to produce a plausible workflow file; it is to make the consumed path correct, reproducible, observable, and recoverable.

## Contents

1. System model
2. Reality binding and assimilation
3. Trigger/trust model
4. Build fixed point and artifact lineage
5. Evidence DAG
6. Delivery code and IaC ownership
7. Environment/configuration/secrets
8. Observability as delivery code
9. Concurrency and external operations
10. Provider/platform primitive selection
11. Failure and re-entry
12. Verification ladder
13. Contrastive cases
14. Informative basis

## 1. System model

Model the smallest delivery system that controls the requested outcome:

```text
TRIGGER / TRUST INPUT
  -> SOURCE + BUILD FIXED POINT
  -> VERIFICATION / EVIDENCE DAG
  -> IMMUTABLE ARTIFACT + PROVENANCE
  -> PROMOTION + ENVIRONMENT POLICY
  -> DEPLOY / EXPOSE
  -> OBSERVE / VERIFY
  -> RECOVER / FEEDBACK
```

Infrastructure, environment configuration, deployment manifests, monitoring configuration, feature/exposure controls, and automation code can all be production-affecting inputs. Record which are versioned in the repository, which live only provider-side, and how drift is observed.

For each material seam identify:

- canonical identity/current source;
- mutable inputs and invalidation triggers;
- executing identity/permissions/credentials;
- provider/external state;
- evidence produced;
- consumer and postcondition;
- recovery/reconciliation behavior.

Do not infer a provider-side setting from repository code when the provider state is inspectable. Do not infer repository truth from a dashboard label when source is inspectable.

## 2. Reality binding and assimilation

Before changing a delivery mechanism, inspect the current path that is actually consumed. Prefer targeted inspection over broad scanning:

1. repository rules and relevant workflow/IaC/config files;
2. trigger/source/build/artifact definitions;
3. current environment/provider state when it controls the outcome;
4. nearby successful patterns and existing automation helpers;
5. current evidence/provenance/monitoring surfaces;
6. known failure/runtime evidence.

Classify material claims as `FACT | INFERENCE | PROPOSAL | UNKNOWN`. A common platform convention is not a fact about this project.

If the system is greenfield, the design space is `PROPOSAL`; bind only real project/tool/provider constraints and then prove the new path after materialization.

## 3. Trigger and trust model

Classify triggers by who can influence their inputs, not by friendly event names. Relevant examples include branch updates, pull/merge requests, forks, tags, schedules, manual dispatch, upstream workflows, package/registry events, webhooks and provider-native deploy hooks.

Keep these axes separate:

```text
event trust
repository/workflow permissions
runner/executor trust
artifact/cache trust
external credential scope
target environment authority
```

A low-trust event must not gain privileged deployment capability merely because one provider feature chains into another. For every privilege transition, state the exact predicate and evidence that permits it.

Treat reusable actions, plugins, images, scripts, package-manager hooks and workflow dependencies as **executable dependencies**. Pin or otherwise control revisions according to project/provider support and risk; bind what permissions/secrets they can see.

## 4. Build fixed point and artifact lineage

Bind the build to inspectable inputs:

```text
source revision
+ build definition revision
+ resolved dependency/toolchain inputs
+ build parameters
= build fixed point
```

Then preserve lineage:

```text
build fixed point
-> artifact identity/digest
-> provenance/build evidence
-> verification evidence
-> promotion identity
-> deployment/exposure record
```

Prefer promoting the **same verified immutable artifact** between environments when compatible with the architecture. If production rebuilds from the same source, treat it as a new artifact identity; source equality is not byte/runtime identity.

Ask four concrete questions:

- What artifact was built?
- What exact artifact was tested?
- What exact artifact was promoted?
- What exact artifact was deployed/served?

If those cannot be cross-bound, the delivery system has a provenance gap even if every job is green.

## 5. Evidence DAG

Model required verification as an **evidence DAG**, not only an execution DAG. For each obligation bind:

- producing job/probe;
- exact input fixed point;
- output/evidence identity;
- applicability/skip semantics;
- required consumer;
- result `PASS | FAIL | INCONCLUSIVE | NOT_RUN`;
- currentness/invalidation rule.

Path filters, matrix jobs, conditions, manual jobs and provider aggregates can make required work disappear silently. A green workflow does not prove a required job ran. Explicitly distinguish a legitimately non-applicable check from a skipped/missing check.

Developer checks, QA verdicts, UAT decisions, release assessment, deployment verification and service health are distinct evidence classes. Preserve their semantics instead of compressing them into a single pipeline status bit.

## 6. Delivery code and IaC ownership

When the terminal objective is a delivery/production system change, DevOps may edit and validate the required repository surfaces directly, including:

- CI/CD workflows and build/release scripts;
- Terraform/Pulumi/CloudFormation or other IaC;
- Kubernetes/Helm/manifests and deployment descriptors;
- environment/configuration automation;
- policy/config used by deployment mechanisms where the policy itself is already authoritative;
- observability-as-code, alert/routing configuration and rollout analysis definitions;
- automation for stable repetitive operations.

Use `implement`, `security-engineering`, `data-persistence-engineering`, or other specialists as supporting depth when the change needs their mechanism. Do not transfer accountability solely because a DevOps change is represented as code.

Do **not** invent Product behavior, security policy, data meaning, retention requirements, SLOs, approval policy or risk appetite to make the automation convenient.

For IaC and environment changes, treat plan/preview/static validation as pre-mutation evidence only. The stronger claim requires provider apply/operation evidence plus target-state readback when execution is in scope and authorized.

## 7. Environment, configuration and secrets

Separate:

```text
artifact identity
configuration identity
environment identity
infrastructure identity
exposure/traffic identity
```

A deployment may reuse the same artifact with different configuration; that is a different runtime fixed point.

For environment protection define:

- who/what can target the environment;
- allowed source/candidate identities;
- approvals/change windows required by actual policy;
- credential scope and lifetime;
- concurrency/lease semantics;
- provider-side settings that must be inspected rather than assumed.

Reference secrets by safe identity/role/store/version; never copy secret values into plans, logs, artifacts or Skill outputs.

Prefer short-lived/federated credentials when the current provider/project supports them and the trust relationship can be constrained. Do not claim federation exists without inspecting provider/project configuration.

## 8. Observability as delivery code

Observability required to decide a rollout or operate a service is part of the delivery system when its configuration must be changed to make the decision possible.

Version and validate monitoring/alert/analysis configuration where the platform supports it. Bind each rollout/health signal to:

- target/candidate/environment identity;
- metric/log/trace/business signal semantics;
- baseline/comparison cohort where applicable;
- observation window/adequacy rule from project truth;
- threshold or decision rule from authoritative policy/baseline;
- missing/conflicting evidence behavior.

Do not invent a generic error-rate threshold or watch duration. A global healthy metric cannot justify progressive promotion if it cannot attribute behavior to the candidate/exposure under decision.

## 9. Concurrency and external operations

Runner/job cancellation does not prove an external mutation stopped. For provider operations preserve operation identity and read provider/target state before retry or supersession.

When two runs can mutate the same environment, registry tag, infrastructure object, schema, traffic target or configuration channel, serialize them with a real current project/provider mechanism or prove independent safety. Do not invent a lease mechanism that the system does not actually enforce.

For deployment pipelines, cancellation/supersession policy must account for already-issued provider operations and partial state.

## 10. Provider/platform primitive selection

Prefer the smallest provider/platform primitive that faithfully implements the required semantics. Managed deployment/IaC/rollout/observability capabilities can reduce custom state and retry/recovery burden.

Choose from requirements and current capability, not brand preference. Compare:

- fidelity to the required semantic action;
- inspectable state and operation identity;
- automation/repeatability;
- policy/auth integration;
- observability and failure diagnosis;
- portability only where the project values it;
- recovery and drift behavior;
- maintenance surface.

Do not build a custom cross-provider abstraction merely to make the Skill look provider-neutral. Provider neutrality belongs in the decision model, not necessarily in the implementation.

## 11. Failure and re-entry

Treat delivery automation failure as a system defect, not just a transient inconvenience.

When a job/provider action fails or yields contradictory state:

1. preserve exact source/build/artifact/workflow/provider operation identities;
2. locate the earliest seam whose observed output contradicts the model;
3. distinguish pipeline-engine failure from application/test/provider/environment failure;
4. repair the smallest causal mechanism;
5. re-run the nearest proof that can falsify the repair;
6. observe the real downstream seam if the completion claim depends on it.

Do not paper over a broken provider path with a fixture or generated success record.

## 12. Verification ladder

Use only the levels actually exercised:

```text
syntax/schema valid
-> local/static semantic checks pass
-> workflow/IaC plan or dry-run observed
-> provider operation created/completed
-> target environment state read back
-> service/behavior health verified
-> exposure/customer path verified when required
```

A higher rung may be unavailable. Report that boundary as `NOT_RUN`, `BLOCKED`, or `INCONCLUSIVE`; do not upgrade it from lower-rung evidence.

## 13. Contrastive cases

### Same source, different production artifact

Staging and production each rebuild commit `abc123`. Both builds succeed. This does **not** prove the production artifact is the one verified in staging. Either promote the same immutable artifact or bind/re-run the policy-required evidence for the new production artifact.

### Green workflow with skipped required job

A path filter prevents migration verification from instantiating, and the provider aggregate is green. If migration verification is required for this candidate, result is `NOT_RUN`/missing evidence, not PASS.

### IaC plan passes, live state differs

Terraform validation/plan passes against source, but provider readback shows an unmanaged resource/policy that changes the target behavior. Reconcile provider truth before claiming the desired environment state.

### AI-generated automation expands faster than platform controls

Do not compensate for AI output speed by adding more procedural handoffs. Strengthen the underlying automated, secure, inspectable path and keep changes in small falsifiable batches.

## 14. Informative basis

Use current provider/project documentation for exact APIs and features. Stable conceptual basis includes:

- DORA, Continuous Delivery: https://dora.dev/capabilities/continuous-delivery/
- DORA, Deployment Automation: https://dora.dev/capabilities/deployment-automation/
- DORA, Monitoring and Observability: https://dora.dev/capabilities/monitoring-and-observability/
- DORA, Platform Engineering: https://dora.dev/capabilities/platform-engineering/
- Google SRE, Release Engineering: https://sre.google/sre-book/release-engineering/
- OpenAI curated deploy Skills as examples of consolidated capability + progressive provider depth: https://github.com/openai/skills/tree/main/skills/.curated
