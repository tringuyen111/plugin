# Capability Execution Policy

Read this contract after `/capability-resolver` selects a live provider and immediately before any mutation. It is the common control protocol for MCP, connector, CLI, filesystem, or other provider actions. Domain skills still own the domain decision; providers only execute approved semantic capabilities.

## Control sequence

```text
domain intent
→ semantic capability resolution
→ exact capability-resolution record + SHA-256
→ exact Capability Operation Envelope
→ responsibility and authority check
→ blast-radius policy decision
→ bounded execution
→ postcondition verification
→ compensation when required
→ exact envelope-bound Integration Result
```

The control gate evaluates fixed-point identity, responsibility, authority, blast radius, and postcondition evidence in that order.

## Immutable operation fixed point

Use `architecture/capabilities/capability-operation.schema.json` **schema version 2**. One policy verdict applies to one exact operation envelope, not merely to a capability name or resource list.

Before `ALLOW`, `ALLOW_WITH_LIMITS`, or `REQUIRE_APPROVAL` can authorize later execution:

1. consume the exact `capability-resolution` record and bind its `record_ref` plus lowercase `record_sha256` into the envelope;
2. recompute the capability-resolution SHA-256 from the exact consumed bytes when those bytes are available; a path/name match is not digest proof;
3. bind the exact active `profile_revision` and require resolution `capability`, `project_id`, `profile_revision`, selected provider, and envelope values to **must match** the current operation fixed point;
4. bind canonical `side_effect_class` from catalog/resolution truth and require resolver `side_effect_match: true`; any mismatch is `BLOCK`, never normalization to a weaker class;
5. bind one exact bounded `operation` and `operation_parameters_sha256`. The parameter digest is over the canonical non-secret operation-parameter payload; secret values remain outside control metadata and are referenced only through project/provider-safe identities;
6. treat a changed operation name, parameter digest, capability-resolution digest, provider/source revision, profile revision, target identity, or other load-bearing fixed-point input as a **new envelope** requiring re-resolution/re-policy as applicable.

When exact record files are available, run `scripts/validate_capability_operation.py` before mutation. A validator PASS proves deterministic binding only; it does not grant authority or replace policy evaluation.

### Resolution admission

- `READY` resolution may proceed to policy evaluation only with matching `capability_support: READY`.
- `PARTIAL` resolution may proceed only with `capability_support: PARTIAL`, explicit `fallback_approved: true`, and preserved limitations; the strongest possible successful verdict is `ALLOW_WITH_LIMITS`.
- `BLOCKED` or `FAILED` resolution cannot authorize mutation.
- Provider/auth availability is evidence about execution mechanics, never operation authority.

### Side-effect anti-laundering

Capability identity controls side-effect identity. `service.execute` is only bounded normal-service `EXTERNAL_WRITE`. It must never absorb **deployment**, **destructive**, **security/identity**, **external communication**, or **source-control** semantics. Resolve the stronger canonical capability/class and owner, or return `BLOCK`/`UNSUPPORTED`.

Generic impact booleans such as `destructive: false` or `reversible: true` never override the catalog/resolution class. Reversibility is not automatic permission.

## Responsibility, authority and project policy

The operation envelope names the requesting skill, canonical owner, canonical target project/resources, decision classes, authority, precondition state, impact, reversibility, verification, and compensation. `target.project_id` must equal the active Project Capability Profile's canonical logical `project.id`; provider-specific IDs do not authorize another project.

Before deriving any `ALLOW` verdict, bind every `responsibility.decision_classes[]` value to an **exact** `policy.capability_execution.decision_class_registry[].id` in that same profile revision. Decision-class IDs are opaque project policy identifiers: do not case-fold, normalize punctuation, or infer aliases. An unregistered or ambiguous class is unresolved policy and yields `REQUIRE_APPROVAL` when the project authority can resolve it or `BLOCK` otherwise. Any registry entry with `protected: true` remains a protected decision; an envelope declaring `authority: NOT_REQUIRED` for that class is inconsistent and cannot proceed.

Before deriving any `ALLOW` verdict, bind the operation to the exact `profile_revision` and inspect `policy.authority`. A `null` policy value or an entry in `policy.authority.unresolved_fields` is explicit UNKNOWN, never an implicit restrictive/allowing default. If that unknown field is material to the operation, return `REQUIRE_APPROVAL` when a named authority can resolve it for the exact envelope or `BLOCK` when required authority/policy evidence is unavailable.

## Policy verdicts

- `ALLOW` — the exact envelope is domain-owned, authorized, reversible when required by policy, same-project, inside configured resource budgets, unambiguous, current, and verifiable.
- `ALLOW_WITH_LIMITS` — the exact envelope uses an explicitly approved lower-fidelity `PARTIAL` resolution with named limitations and no false equivalence.
- `REQUIRE_APPROVAL` — the exact envelope would exceed the resource budget, cross provider/system boundaries inside the same logical project, change protected decision classes, create public visibility, invalidate downstream work, use ambiguous identity, or perform another policy-defined escalation.
- `BLOCK` — resolution binding, responsibility, authority, current precondition, canonical target, profile-project identity, canonical side-effect match, required verification, or mandatory recovery evidence is missing or conflicting.
- `UNSUPPORTED` — no live provider or approved mapping satisfies the semantic capability.

A verdict applies to one exact operation envelope. A changeset evaluates aggregate unique-resource and provider scope against `max_resources_per_changeset` and project policy; one allowed item never grants authority to another. Cross-project work requires the other project's profile or owner resolution, not broader approval under the current profile.

## Operation results

Use exactly one result per attempted or evaluated operation:

- `APPLIED`
- `SKIPPED_ALREADY_CURRENT`
- `REQUIRES_APPROVAL`
- `BLOCKED_AUTHORITY`
- `BLOCKED_PRECONDITION`
- `UNSUPPORTED_PROVIDER`
- `FAILED`
- `COMPENSATED`

`APPLIED` requires verified postconditions. A provider response without read-after-write or equivalent consumed-output proof is not success. `COMPENSATED` records restored state after a failed attempt; the attempted workflow still reports `FAILED`.

Use `architecture/capabilities/integration-result.schema.json` **schema version 4**. Every Integration Result must bind both the exact capability-resolution `record_ref + record_sha256` and the exact policy-evaluated operation-envelope `record_ref + record_sha256`. A result bound to a **different envelope** cannot establish `APPLIED` or workflow `READY`, even if the provider returned success. When exact record files are available, use the deterministic validator to verify these bindings.

## Aggregate truth

- All operations `APPLIED` or `SKIPPED_ALREADY_CURRENT`: `READY` only when every result is bound to its exact admitted envelope and required postconditions are verified.
- No mutation occurred and unresolved operations require approval/authority/preconditions/provider support: `BLOCKED`.
- Applied operations plus unresolved operations: `FAILED` by default. `PARTIAL` is permitted only when the changeset contract declared safe independent partial progress before execution and canonical state remains coherent.
- Any unverified write, failed compensation, mismatched result/envelope binding, or contradictory canonical state: `FAILED`.

Never create a shadow ledger, silently downgrade fidelity, infer permission from a tool schema, or let an adapter become the owner of Product, BA, Design, Engineering, QA, UAT, Release, or Operations truth.
