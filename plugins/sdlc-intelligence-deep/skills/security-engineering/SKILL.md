---
name: security-engineering
description: Implement security or identity enforcement changes when trust boundaries and enforcement are the dominant implementation boundary, including authentication/authorization, freshness, containment, bypass paths, token/session/replay/secrets mechanics, and representative negative proof. Use as bounded security depth in broader implementation; do not invent policy, accept risk, own QA, or claim release readiness.
---

# Security Engineering

Treat canonical security policy and any already-approved security design as fixed project input when material; do not import a sibling Skill's design file as authority. If policy or a trust-boundary decision is unresolved, surface the gap instead of manufacturing a control.

Load [Threat and Failure Taxonomy](references/threat-failure-taxonomy.md) when the exact security failure class changes the enforcement seam or negative proof; use its property-separation matrix to avoid treating one control as proof of another property. Load [Security Probe Discipline](references/security-probe-discipline.md) when untrusted-data flow, bypass coverage or real-mechanism negative evidence is material; use its typed graph only where source/policy/guard/reachability relations change coverage. Select only the relevant classes/probes; these references are expert priors, not a mandatory security checklist or a source of project policy.

## Entry gate

Establish the canonical security policy and trust-boundary truth that constrains the change, inspected enforcement/bypass/runtime seams, applicable credential/session lifecycle, source/environment authority, and a falsifiable negative proof target. A tracker, frontier, semantic-unit ledger, work type, or parent `/implement` invocation is not required.

If who may do what, tenant/resource scope, sensitive-data handling, abuse threshold, privacy/compliance rule, or another material policy is missing/conflicting, stop that affected part and name the policy gap. Never choose permissive or restrictive behavior merely to finish the code.

## Security execution loop

1. **Reconstruct and classify the attack/enforcement surface.** Trace material actors, request/job/service entry paths, authentication context, authorization/resource/tenant scope, background/bulk paths, session/token/credential lifecycle, signed external requests, outbound fetches, browser ambient credentials, scarce/paid business flows, secrets, logs/errors and existing negative evidence. Select the smallest threat/failure classes that can change correctness; do not enumerate unrelated vulnerability categories.
2. **Map source -> enforcement -> protected sink/action.** Follow caller/attacker-controlled IDs, properties, URLs, events, claims or upstream data through normalization/lookup/transformation to the identity/policy inputs, unavoidable enforcement seam and protected resource/side effect. Include alternate/nested/bulk/background/service paths that can reach the same sink. A clean caller or named middleware is not proof that the sink is covered.
3. **Separate identity, permission, freshness and containment.** Bind what establishes identity, what policy authorizes this exact object/property/action/scope, how session/permission freshness is enforced, and what constrains outbound/browser/external trust boundaries when material. UI visibility, identifier unpredictability, cryptographic validity and authentication alone are not authorization.
4. **Challenge false assurance before mutation.** Reject explanations such as hidden routes, unguessable IDs, framework defaults, valid signatures, syntactically valid/internal URLs, rate limiting, happy-path success or mocks when they do not prove the exact claim. Replace each rationalization with the smallest authoritative evidence that would close it.
5. **Apply engineering economy inside the security contract.** Reuse proven platform/framework/identity mechanisms when they cover the approved semantics, but never remove trust-boundary validation, authorization, secret handling or failure controls to reduce code.
6. **Implement the smallest unavoidable control.** Cover all material entry paths at one canonical enforcement seam when possible. Implement session/token expiry, refresh/revocation, rotation, signed-request freshness/replay/idempotency, CSRF/outbound-request containment, abuse/failure or secret-handling behavior only as required by approved policy/design.
7. **Exercise discriminating negative proof.** Freeze the claim, keep the valid path constant and vary one security-relevant dimension: unauthenticated/authenticated-but-unauthorized, cross-tenant/resource, sensitive property/action, stale/revoked, replay/duplicate, alternate bypass, prohibited outbound destination, cross-site state change, bulk/background or abusive-but-policy-valid near miss as material. A happy path cannot prove isolation.
8. **Inspect real enforcement and observability.** Verify actual allow/deny/failure behavior through the real mechanism at the smallest representative boundary. State what any mock/stub bypasses. Inspect logs/errors/traces for useful non-secret subject/scope/action/result context without raw credentials/tokens/secrets.
9. **Report security evidence.** Report the policy/design revision, selected failure classes, source-to-enforcement-to-sink graph, alternate paths covered, negative commands/results, lifecycle/replay/containment evidence, secret-log inspection, substituted boundaries, and unresolved policy/runtime facts.

## Hard boundaries

- Never invent authorization/privacy/compliance policy or abuse thresholds merely to close an implementation.
- Never treat authentication middleware, token parsing, UUID opacity, hidden UI/route visibility, signatures, rate limiting or framework defaults as proof beyond the property they actually establish.
- Never weaken validation/error/security controls for economy.
- Keep defensive implementation separate from exploit development: do not introduce offensive payload corpora or attack automation merely to make the Skill look deeper.
- Never claim independent security assessment, penetration-test assurance, QA or risk acceptance.

## Completion

`READY` closes only this bounded implementation unit and requires its declared negative/bypass
proof through the real enforcement mechanism, with substituted boundaries explicit. Missing policy, authority, CRITICAL evidence path,
or required runtime mechanism keeps `PARTIAL`/`BLOCKED`/`FAILED`. This does not establish independent security assessment, QA, risk acceptance, or release readiness.
