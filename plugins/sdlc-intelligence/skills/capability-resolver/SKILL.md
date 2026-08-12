---
name: capability-resolver
description: Reconcile an abstract capability request with a target project's profile, live provider discovery, authentication/scope observations, and truthful provider or fallback selection without taking over domain ownership.
---

# Capability Resolver

<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

Use this shared skill beneath a domain workflow when that workflow needs an abstract capability such as `tracker.create`, `design.inspect`, `browser.capture`, or `source_control.commit`.

## Ownership boundary

The resolver owns provider-selection truth for one abstract capability. It does **not grant operation authority**, user approval, or domain ownership and never executes the requested operation. Authentication and scope are live provider observations, not permission. After resolution, the calling workflow evaluates a concrete Capability Operation Envelope through [Capability Execution Policy](../../resources/shared/references/capability-execution-policy.md).

A Design skill decides what design artifact is needed. The resolver determines whether a live provider can supply `design.create_editable`; it must not replace the Design decision with whatever a convenient provider supports.

## Inputs

Resolve:

- required capability and required fidelity;
- active Project Capability Profile, including canonical `project.id` and exact `profile_revision`, or explicit absence;
- the caller's `requested_side_effect_class` when supplied — this is an assertion to verify, not the canonical class;
- live runtime/tool discovery results, including provider-source kind, identity, namespace, revision, and discovered actions;
- safe authentication/scope observations plus evidence identifiers; never copy credentials, tokens, or secrets into the resolution record;
- acceptable fallback plus the exact source of fallback authority.

Read `../../architecture/capabilities/capability-catalog.json` before provider selection. The **canonical capability catalog** owns each abstract capability's side-effect class.

## Resolution loop

```text
validate capability against capability-catalog.json and derive canonical side-effect class
→ compare requested_side_effect_class when supplied
→ bind canonical project_id and exact profile_revision
→ read configured provider/source preference
→ inspect live providers, bound connection sources, and exact actions
→ reconcile stale or conflicting profile claims
→ check live authentication, scope, fidelity, and evidence freshness
→ resolve fallback authority when the preferred source cannot be used
→ select one provider plus one explicit provider source, or an explicitly authorized fallback
→ preserve discovery/auth/scope/policy provenance
→ return a schema-v4 capability-resolution record
```

Rules:

1. **Capability identity controls side-effect identity.** Derive `side_effect_class` from the canonical capability catalog. If a non-null `requested_side_effect_class` differs, that side-effect mismatch sets `side_effect_match: false` and returns `BLOCKED`; never normalize a weaker/different caller assertion into the canonical class while pretending the request matched.
2. Live discovery wins over remembered tool schemas and stale profile claims. A configured provider is not proof of availability. A provider name without an explicit live MCP, connector, native tool, API, CLI, or local-adapter source binding is unresolved.
3. Preserve `auth_scope_evidence` as safe evidence references/status records bound to the selected provider source. Never store passwords, tokens, private keys, session secrets, or other credentials in this record.
4. The resolver does not grant operation authority. Provider `DENIED` reports authentication/scope availability only; operation responsibility, approval, blast radius, and write authority are evaluated later on the concrete operation envelope.
5. When several live sources satisfy the capability, follow current project provider/source preference. If the preferred source is stale or unavailable, an alternate may be selected only when fallback authority is explicit:
   - `PROJECT_PROFILE` — current profile explicitly permits the fallback;
   - `CALLER_DECLARED` — the owning workflow/user request explicitly bounded the fallback;
   - `OWNER_APPROVED` — the relevant project authority approved this selection;
   - `UNRESOLVED` — do not substitute the provider; return `PARTIAL` or `BLOCKED`;
   - `NOT_APPLICABLE` — no fallback is being used.
   This fallback authority permits provider **selection only**; it does not grant operation authority.
6. If the fallback reduces fidelity, set `fallback_used: true`, name the limitation, and return `PARTIAL` even when the alternate source is authorized.
7. Do not block provider selection merely because a later operation may require approval. Conversely, a `READY` resolution is never approval to mutate.
8. Bind the resolution to safe provenance: `resolution_provenance.resolved_by`, `resolved_at`, `discovery_evidence`, and `policy_evidence`. If provider/source revision, discovered actions, authentication/scope, profile revision, or other load-bearing observations change before mutation, the caller must re-resolve rather than reuse stale provider truth.
9. The resolver does not execute operations. Partial writes, postconditions, and compensation belong to the caller and Integration Result Manifest.

## Output

Follow `../../architecture/capabilities/capability-resolution.schema.json` exactly:

```yaml
schema_version: 4
project_id:
profile_revision:
capability:
provider:
provider_source:
  kind: mcp | connector | native_tool | api | cli | local_adapter
  id:
  namespace:
  revision:
  discovered_actions: []
provider_version:
availability: AVAILABLE | PARTIAL | UNAVAILABLE | DENIED | UNKNOWN
side_effect_class:                    # derived from canonical capability catalog
requested_side_effect_class:          # caller assertion or null
side_effect_match:
auth_scope_evidence: []               # safe refs/status only; never credentials/secrets
fallback_used:
fallback:
fallback_authority: NOT_APPLICABLE | PROJECT_PROFILE | CALLER_DECLARED | OWNER_APPROVED | UNRESOLVED
status: READY | PARTIAL | BLOCKED | FAILED
limitations: []
profile_conflict:
resolution_provenance:
  resolved_by:
  resolved_at:
  discovery_evidence: []
  policy_evidence: []
```

Use `provider_source: null` only when no provider is selected, such as an explicit provider-absent fallback. Never infer a source from the provider name alone. A `READY` record requires a true side-effect match and sufficient live provider/auth/scope provenance for the declared fidelity; it still does not grant operation authority.

This resolution record becomes an exact, digest-bound input to operation policy and any later Integration Result Manifest. It is not a project task-status record and must not become stale provider truth silently.
