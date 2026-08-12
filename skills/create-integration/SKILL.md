---
name: create-integration
description: Create or revise a provider adapter that maps live external capabilities to the core capability vocabulary with explicit auth, side effects, partial success, provenance, fallback, and behavioral evals.
---

# Create Integration
<!-- runtime-context:start -->
## Runtime context

- **Before returning a workflow or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) and preserve missing evidence, approval, or execution as PARTIAL/BLOCKED.
- **Before changing ownership or an active discovery surface:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and keep proposal, evaluation, and promotion decisions distinct.
- **When the request originated in project delivery:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) and preserve project truth rather than embedding customer policy in the reusable system.
- **Before repository, provider, publication, or destructive actions:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.
<!-- runtime-context:end -->


Read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`, `../../resources/system/references/INTEGRATION-CREATOR-STANDARD.md`, and `../../resources/system/references/SKILL-LIFECYCLE.md`.

This workflow owns provider translation. It must not copy or replace the domain workflow. A runtime-only environment may inspect a live provider and produce a bounded integration proposal, but canonical installation, package/discovery changes, and repository-native eval publication require the canonical source workspace plus lifecycle authority. If installation is requested without those surfaces, the proposal may remain useful while canonical installation is `BLOCKED`; never report the adapter as installed/promoted.

## 1. Prove an integration gap

Identify the domain skill's abstract capability request and show why an existing provider mapping or generic adapter cannot satisfy it. Reject a wrapper that only renames one tool call and adds no discovery, translation, verification, or failure semantics.

If the proposal introduces a new business/design/architecture/QA/operations decision, route that capability to the domain owner before creating an adapter.

## 2. Inspect the live provider

Use current primary provider documentation and live tool/resource/prompt/action discovery when available. Record provider identity/version, authentication/scopes, resource model, operation schemas, limits, pagination, rate limits, retries, idempotency, concurrency, partial success, rollback, and observed divergence from remembered contracts.

Configured or documented capability is not proof of current availability or authorization.

## 3. Map capabilities

Map each provider operation to an existing abstract capability. Propose a new capability only when input/output or side-effect semantics genuinely differ across providers.

For each mapping declare:

```text
provider operation
abstract capability
input translation
output translation
side-effect class
auth/scope
availability discovery
verification
fallback/blocker
limitations
```

Provider identity and IDs stay in the adapter/result detail, not in domain artifacts or capability names.

## 4. Define safety and failure

Classify read, local write, external write, source control, deployment, destructive, and external communication from the canonical abstract capability semantics. For each concrete operation preserve the canonical sequence:

```text
provider/capability resolution
→ Capability Operation Envelope
→ project capability-execution policy
→ policy verdict
→ approval only when verdict = REQUIRE_APPROVAL
→ bounded execution or BLOCK/UNSUPPORTED
→ postcondition verification and compensation truth
```

`ALLOW` or `ALLOW_WITH_LIMITS` does not require the adapter to invent an extra approval step; `REQUIRE_APPROVAL` must stop before execution until the named authority approves; `BLOCK` stays blocked when responsibility, authority, preconditions, verification, or recovery evidence is missing. Sensitive, destructive, deployment, public, or otherwise protected operations remain subject to their policy-defined escalation and recovery requirements.

Define idempotency key or duplicate prevention, retryable versus terminal failure, partial-write truth, rollback/recovery, sensitive-data handling, and rate-limit behavior. Never claim success from provider acknowledgement alone when the consumed resource can be inspected.

## 5. Produce result provenance

Treat `../../architecture/capabilities/integration-result.schema.json` **schema version `4`** as the canonical exact field contract; do not maintain a competing prose field list. Preserve these semantic invariants in every adapter proposal and eval:

- `capability_resolution` binds the exact provider-resolution record/reference and SHA-256 consumed by the operation;
- `operation_envelope` binds the exact policy-evaluated Capability Operation Envelope record/reference and SHA-256 consumed by the provider execution; a result for different operation bytes cannot inherit that verdict;
- `executor` records the actual provider/source identity that executed the operation rather than the requested provider name;
- `policy_verdict` records the operation-policy decision separately from `approval_status`;
- `operation_result` records what happened to the concrete operation, while workflow `status` records the aggregate workflow/integration truth; never collapse the two;
- `precondition_status` and `postcondition_status` preserve before/after verification; provider acknowledgement is not a verified postcondition;
- `resources_touched`, `compensation_status`, fallback, limitations, and evidence preserve partial/failure/recovery truth.

Keep provider-specific detail in a linked adapter manifest. Generated examples and eval fixtures must validate against the current machine schema rather than a copied historical field summary.

## 6. Create evals

Minimum cases:

- provider present and successful;
- provider absent with approved fallback or blocker;
- authorization denied;
- partial capability;
- partial write or ambiguous acknowledgement;
- stale remembered schema versus live discovery;
- domain-ownership takeover attempt;
- sensitive data and approval guard.

## Domain output semantics

The integration proposal must preserve: integration gap, provider discovery evidence, abstract capability mapping, operation/side-effect matrix, auth/data/retry/idempotency/rollback behavior, result-manifest mapping, domain ownership boundary, adapter files/references, eval/runtime status, version/compatibility/migration, and the next lifecycle state.

Use the shared Workflow Result Contract for machine-facing state/evidence/blocker/handoff metadata. Present the integration proposal according to the maintainer's requested artifact or review format. `READY` means ready for audit/evaluation, not installed or promoted.
