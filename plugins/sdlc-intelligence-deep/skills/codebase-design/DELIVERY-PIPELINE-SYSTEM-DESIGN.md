# Delivery Pipeline System Design Reference

## Contents

1. Scope and ownership
2. Pipeline system model
3. Trigger and trust-boundary model
4. Source/build fixed point and artifact lineage
5. Evidence DAG and conditional execution
6. Cache and reusable-state semantics
7. Runner, permission, credential, and secret boundaries
8. Executable dependency and supply-chain trust
9. Promotion, environment, concurrency, and change ordering
10. Provider-side state and portability seam
11. Failure, cancel, retry, and reconciliation
12. Architecture alternatives and selection pressure
13. Proof model
14. Required design meanings
15. Anti-patterns
16. Informative technical basis

## 1. Scope and ownership

Use this reference when a fixed architecture-significant technical decision materially changes
CI/CD, build automation, artifact publication/promotion, pipeline triggers, runner/execution identity,
environment gates, or delivery evidence production because ownership, trust/provenance, lifecycle,
interfaces, cross-system constraints, or durable architecture trade-offs are under decision.

Treat the delivery pipeline as a **technical system with trust boundaries and durable evidence**, not
as a YAML file or a sequence of shell commands.

`codebase-design` owns the design-only terminal decision only when that fixed delivery question is architecture-significant rather than routine/local delivery-system design. A request for CI/CD, IaC, promotion, environment-gate, or workflow design does not transfer primary ownership here merely because implementation is deferred. When the terminal objective is a local or end-to-end delivery/production outcome, this reference can provide bounded architecture depth while the delivery-system owner remains accountable across design, repository/config implementation, provider execution, and runtime verification. Do not force an ownership handoff merely because the design becomes workflow/IaC/config code.

When the target project already has a current approved Deployment Plan, consume that exact project artifact as deployment input; do not weaken its automation/capability/evidence requirements to fit an existing pipeline. A bundled sibling Skill template is not a substitute for current project truth.

This reference does **not** own:

- Product behavior, QA verdicts, UAT acceptance, or release readiness;
- release-readiness decision and the normal deployment/exposure transaction, owned by `devops-engineering` when those are the active delivery objective;
- provider selection/translation, owned by the provider-selection/integration surface rather than this design reference;
- cloud/application architecture beyond the pipeline-facing interface;
- provider-specific administration commands or secret values.

A green pipeline is evidence. It is not release approval and is not deployment authority.

## 2. Pipeline system model

Model one pipeline fixed point as six connected planes:

```text
EVENT/TRUST INPUT
    -> SOURCE + BUILD FIXED POINT
    -> EXECUTION / EVIDENCE DAG
    -> ARTIFACT + PROVENANCE
    -> PROMOTION / ENVIRONMENT POLICY
    -> DEVOPS DEPLOY / EXPOSE SEAM
```

For each plane name the canonical identity, mutable inputs, authority, external/provider state,
observable output, and invalidation triggers. The interface between planes should be smaller and
more stable than the provider-specific implementation behind it.

Pipeline design is incomplete when it describes jobs without proving what evidence or artifact
identity crosses each seam.

## 3. Trigger and trust-boundary model

Classify every trigger by **who or what can influence its inputs**, not by its friendly name.
Examples include trusted branch updates, merge/pull requests, fork-originated changes, tags,
schedules, manual dispatch, upstream pipeline calls, package/registry events, and external
webhooks.

For each trigger determine:

- source revision/ref actually evaluated;
- whether untrusted code/config can execute;
- repository/workflow/job permissions available at that point;
- runner/executor trust class;
- caches/artifacts/secrets/credentials readable or writable;
- provider/environment operations reachable;
- whether the event can cause a more privileged later workflow to consume its output.

A low-trust event must not silently cross into a privileged execution context merely because the
provider permits the workflow to run. Separate **event trust**, **repository permission**,
**job permission**, **runner trust**, and **external credential scope** as different axes.

When a provider offers a privileged trigger variant, reusable workflow, or cross-pipeline event,
design the trust transition explicitly. Never assume the event name itself is a security boundary.

## 4. Source/build fixed point and artifact lineage

Bind the build to inspectable inputs:

```text
source revision
+ build definition/revision
+ resolved dependency inputs
+ build parameters
+ relevant toolchain/builder identity
= build fixed point
```

Then preserve lineage:

```text
build fixed point
-> artifact identity/digest
-> provenance / build evidence
-> verification evidence
-> promotion identity
-> deployment/exposure seam
```

Prefer promotion of the **same verified immutable artifact** across environments when that matches
the project architecture. If an environment rebuilds, treat that output as a distinct artifact and
prove equivalence or re-run the evidence required by policy; source-revision equality does not prove
byte/runtime identity.

Record enough non-secret identity to answer:

- what source/build definition produced this artifact;
- which artifact was tested;
- which artifact was promoted;
- which artifact was handed to deployment;
- which evidence becomes stale if any identity changes.

Artifact provenance may be a digest-bound manifest, provider attestation, signed provenance, or
another project-approved mechanism. Do not claim stronger supply-chain assurance than the actual
builder/provenance mechanism proves.

## 5. Evidence DAG and conditional execution

Design the pipeline as an **evidence DAG**, not merely an execution DAG.

For every required obligation identify:

- producing job/stage/probe;
- exact input/fixed-point binding;
- output/evidence identity;
- consumers/gates;
- skip/conditional semantics;
- failure and `NOT_RUN` meaning;
- invalidation/re-run conditions.

Matrix expansion, path filters, change detection, optional jobs, manual jobs, and conditional
expressions are control flow. They must not make a required obligation disappear silently.

A provider aggregate can be green while a required job was skipped or never instantiated. Define
required evidence independently from provider color/status. When a condition legitimately makes a
check not applicable, make the applicability rule inspectable and bind it to the same fixed point.

Do not collapse developer checks, QA verdicts, release gates, and deployment verification into one
pipeline success bit. Preserve the owner and semantic meaning of each result.

## 6. Cache and reusable-state semantics

Treat cache as **reusable state with trust and correctness risk**, not merely a speed feature.

For each cache or restored intermediate state define:

- content class and whether it can influence executable output;
- key inputs and collision domain;
- branch/ref/event/trust scope;
- writer eligibility and reader eligibility;
- integrity validation where material;
- invalidation/expiry semantics;
- behavior on partial/stale restore;
- whether a cache miss/failure changes correctness or only performance.

A low-trust workflow must not be able to poison state later trusted by a privileged build. Never
store secret values or credentials in general cache contents. A cache hit is not provenance and is
not evidence that the restored content corresponds to the current source/build fixed point unless
that relationship is explicitly verified.

If correctness cannot tolerate uncertain cache identity, prefer rebuild/revalidation over a broad
fallback restore.

## 7. Runner, permission, credential, and secret boundaries

Model execution identity as layers:

```text
pipeline/workflow identity
-> job identity + repository permissions
-> runner/executor trust
-> external credential or federated identity
-> target resource scope
```

Use least privilege for the actual job. Separate jobs when one stage needs materially higher
privilege than another so untrusted build/test code does not inherit deploy/publish authority.

Prefer short-lived/federated credentials over long-lived static credentials when the selected
provider/project supports them and the trust relationship can be constrained to the required
repository/workflow/ref/environment identity. This is a design preference, not a claim that every
provider exposes federation.

Do not put secret values in technical design artifacts, logs, caches, provenance, or handoffs.
Record only safe secret/credential identities, scopes, roles, versions, and rotation/expiry
constraints when needed.

Runner isolation is part of the trust model. Reused/self-hosted executors may retain state across
jobs; ephemeral hosted runners may still execute untrusted code with granted permissions. Model
what must be isolated, cleaned, or recreated rather than assuming runner type implies safety.

## 8. Executable dependency and supply-chain trust

Pipeline code executes third-party actions/plugins/images/scripts/reusable workflows and build
toolchains with access to source, tokens, artifacts, or signing identities. Treat those as
**executable dependencies**.

For each material dependency define:

- canonical source/owner;
- immutable or otherwise controlled revision identity;
- update/patch policy;
- integrity/verification mechanism when available;
- permissions/secrets visible to it;
- failure/blast radius if the dependency changes unexpectedly.

Prefer immutable identities for executable pipeline dependencies where the platform supports them.
If a mutable tag/channel is intentionally used, make the drift/update authority and monitoring
explicit.

Supply-chain provenance is only meaningful when the build inputs, builder identity, and provenance
record can be bound and verified. Do not add an attestation step whose claims cannot be traced to
the artifact consumed downstream.

## 9. Promotion, environment, concurrency, and change ordering

Separate these decisions:

```text
artifact is verified
artifact is eligible for promotion
provider environment allows a job
current release assessment establishes READY_FOR_RELEASE
operation authority permits deployment
```

None implies the next automatically.

For environment/promotion design, specify:

- environment identity/tier and provider-side protection state;
- allowed source refs/tags/candidates;
- approval/change-window requirements;
- which secrets/credentials become reachable and when;
- artifact promotion/copy semantics and digest verification;
- concurrency key/lease/resource ownership;
- queue/cancel/supersede policy;
- interaction with Deployment Plan ordering and migration constraints.

If two pipeline runs may mutate the same artifact channel, registry tag, environment configuration,
or deployment target, serialize or prove safe independent concurrency. Cancellation of a runner job
does not prove an external provider mutation stopped.

## 10. Provider-side state and portability seam

Repository workflow source is only one part of pipeline truth. Provider-side state may include:

- environment protection/approval rules;
- runner pools and trust labels;
- repository/organization workflow policies;
- branch/ref protections;
- secrets/variables/identity bindings;
- artifact/package registry policies;
- concurrency/resource-group settings;
- required checks or deployment gates.

Represent those as explicit external seams with read/verify requirements and authorized mutation
owners. A repository diff cannot prove provider-side settings that were not inspected.

Keep the design in semantic capabilities and invariants. Provider syntax belongs to project source
or provider integrations. If provider-side administration is required but the capability catalog or
live provider mapping cannot represent it, return an explicit capability/integration gap rather than
inventing shell/API calls.

## 11. Failure, cancel, retry, and reconciliation

Classify failure by where truth may have changed:

```text
PRE_EXECUTION_FAILURE      no external mutation accepted
BUILD_OR_TEST_FAILURE      evidence/artifact not eligible
ARTIFACT_PUBLICATION_UNKNOWN
PROVIDER_REQUEST_UNKNOWN   request may have escaped runner
PROVIDER_OPERATION_FAILED  provider observed failure
PIPELINE_RUNNER_FAILED     external operation state may be independent
VERIFICATION_FAILED        mutation may have succeeded but required proof failed
```

Retry only after resolving the relevant state. For ambiguous external writes, reconcile provider or
consumed target state before retrying. A runner timeout, cancellation, or lost acknowledgment is not
proof of non-execution.

Define idempotency/deduplication keys where the external operation supports them. If it does not,
define how duplicate publication/promotion/deployment requests are detected or safely contained.

Successful compensation/restoration does not rewrite the attempted pipeline operation as success;
preserve the failure and the restored state separately.

## 12. Architecture alternatives and selection pressure

Do not choose a pipeline architecture by vendor feature count. Compare materially different seams,
for example:

- single pipeline vs validation + privileged promotion pipeline;
- repository-local workflow vs reusable centrally governed workflow;
- build-per-environment vs build-once/promote;
- single-platform artifact vs matrix/multi-architecture build;
- monorepo global pipeline vs dependency-aware/selective subgraphs;
- provider-native deployment stage vs an explicit DevOps-controlled deployment seam.

Evaluate alternatives against:

- trust-boundary simplicity;
- artifact/evidence lineage;
- reproducibility and invalidation;
- least-privilege feasibility;
- failure isolation and retry safety;
- environment/promotion policy;
- provider portability/coupling;
- runtime cost/latency only after correctness and safety;
- operational inspectability and recovery.

Do not force a globally reusable pipeline abstraction when repositories have materially different
trust, artifact, or deployment models. Reuse a module/workflow only when its interface hides more
responsibility than it exports and its consumers genuinely share the same invariants.

## 13. Proof model

A pipeline technical design must state falsifiable proof. Depending on the change, include:

- event/trigger tests or dry-runs proving low-trust paths cannot reach privileged capabilities;
- workflow/static validation plus representative provider execution;
- required-job/conditional/matrix cases including intentionally skipped branches;
- artifact digest/provenance verification from build through promotion;
- cache hit/miss/stale/poisoning controls;
- credential/permission inspection without exposing secret values;
- provider-side environment/protection/concurrency state inspection;
- retry/cancel/ambiguous-operation reconciliation cases;
- handoff proof that release/deployment owners receive exact artifact/evidence identities.

Mocks or local workflow parsers prove syntax/control logic only when they bypass the real provider,
runner, identity, artifact registry, environment protection, or external mutation mechanism. Carry
that limitation forward explicitly.

## 14. Required design meanings

When this lens is active, add these meanings to the normal technical design artifact as appropriate;
do not force headings when the project format expresses them clearly elsewhere:

- pipeline fixed point and source/build identities;
- event/trigger trust matrix;
- execution/evidence DAG and required obligations;
- artifact/provenance/promotion lineage;
- cache/reusable-state trust model;
- runner/permission/credential/secret boundaries;
- executable dependency/supply-chain policy;
- environment/provider-side policy seams;
- concurrency/cancel/retry/reconciliation contract;
- deployment/release fixed-point consumers and authority boundaries;
- representative proof and invalidation plan.

## 15. Anti-patterns

Reject designs that rely on any of these shortcuts without explicit bounded justification:

- "CI is green, therefore release-ready";
- "same commit, therefore same artifact";
- "cache is only a performance concern";
- "masked variable means malicious job cannot read it";
- "workflow permission implies external operation authority";
- "job canceled, therefore provider operation stopped";
- "environment name implies protection policy";
- "provider ACK implies consumed target state";
- "all matrix jobs passed" when required variants were never instantiated;
- "repository YAML is the whole pipeline configuration";
- mutable third-party executable dependencies with no drift/update control;
- copying provider-specific syntax into the portable design contract.

## 16. Informative technical basis

These sources ground the domain hazards and provider examples; they do not make provider-specific
syntax normative for SDLC Intelligence:

- GitHub deployment environments/protection rules: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments
- GitHub dependency cache security: https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
- GitHub secure use / executable workflow dependencies: https://docs.github.com/en/actions/reference/security/secure-use
- GitHub OIDC execution identity: https://docs.github.com/en/actions/reference/security/oidc
- GitHub workflow artifacts and attestations: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
- GitLab pipeline security: https://docs.gitlab.com/ci/pipeline_security/
- GitLab protected environments: https://docs.gitlab.com/ci/environments/protected_environments/
- GitLab deployment safety/resource serialization: https://docs.gitlab.com/ci/environments/deployment_safety/
- SLSA Build Provenance: https://slsa.dev/spec/v1.2/build-provenance
