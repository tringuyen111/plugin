# Provider and Runtime Projection

Use this reference whenever provider portability, host/runtime support, provider-specific
packaging, or provider-specific authoring guidance affects a Skill design.

## Separate provider from runtime/host

A **provider** is the ecosystem/platform vendor boundary whose authoring contract and
capabilities are being targeted. A **runtime/host** is a concrete execution surface within or
under that provider. Do not collapse the two into one boolean support claim.

Example model:

```text
provider: OpenAI
runtime/host projections:
  ChatGPT
  Codex
  API
  Atlas
```

The example names a provider and possible projections; it does not prove that every listed
surface is supported by the current Skill revision.

## Portable core vs provider mechanics

Keep these meanings provider-neutral whenever the capability allows it:

- bounded purpose and observable base-agent delta;
- canonical ownership/non-ownership;
- reasoning/decision/execution mechanism;
- semantic inputs and outputs;
- context/source authority;
- failure, unresolved-question and completion truth;
- critical invariants and evaluation intent.

Keep these meanings in provider/runtime projections:

- invocation/discovery metadata;
- file/package layout and UI metadata/assets;
- provider/runtime capability declarations;
- concrete tool/connector names and availability mechanics;
- installation/update mechanics;
- provider-specific validators/package builders;
- runtime-specific limitations/degraded behavior.

A `PORTABLE_CORE` may have only one implemented provider projection. Portability is an
architectural property, not evidence of multi-provider support.

## Projection record

Capture at least:

```text
provider
runtime_or_host
projection_status
provider_authoring_contract_or_source
required_runtime_primitives
invocation_discovery_mechanics
package_metadata_mechanics
tool_connector_dependencies
provider_specific_validation
limitations_or_degraded_behavior
evidence_status
revision_binding
```

Use these projection states consistently:

- `NOT_TARGETED` — outside current scope.
- `TARGET` — selected for design/materialization; no support claim yet.
- `DESIGNED` — projection mechanics are specified but runtime files are not complete.
- `MATERIALIZED` — provider/runtime files exist and required structural validation has run;
  behavioral qualification is still a separate axis.
- `QUALIFIED` — required representative behavioral evidence for the exact projection/revision
  passed under the owning evaluation policy.
- `UNSUPPORTED` — the required primitives/contracts are absent or incompatible for the
  declared capability; do not fabricate a fallback that changes semantics.

Never promote `TARGET`, `DESIGNED`, or `MATERIALIZED` to `QUALIFIED` from source quality,
validator success, or provider acknowledgement alone.

## Provider authoring authority

When materializing a projection, use the current provider-specific authoring contract/tooling
that is actually available. For OpenAI, an active host may expose native Skill-authoring
guidance/tooling such as `skill-creator`; treat it as authority for OpenAI-specific mechanics
only. It may inform file shape, metadata, validation, and packaging, but it must not redefine
the provider-neutral capability boundary or be copied as a universal cross-provider contract.

If the selected provider/runtime authoring contract cannot be inspected or the required
runtime primitives are unavailable, preserve the provider-neutral dossier and mark the
projection `DESIGNED`, `UNRESOLVED`, or `UNSUPPORTED` as appropriate. Do not claim
materialization or support that was not verified.
