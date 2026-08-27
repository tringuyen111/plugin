---
name: security-engineering
description: Implement security or identity enforcement changes when trust boundaries and enforcement are the dominant implementation boundary, including authentication/authorization, freshness, containment, bypass paths, token/session/replay/secrets mechanics, and representative negative proof. Use as bounded security depth in broader implementation; do not invent policy, accept risk, own QA, or claim release readiness.
---

# Security Engineering

Treat canonical security policy and any already-approved security design as fixed project input when material; do not import a sibling Skill's design file as authority. If policy or a Trust Boundary decision is unresolved, surface the gap instead of manufacturing a control.

## Glossary — use these terms literally

- **Security Policy** — the approved project rule that defines who/what must be allowed, denied, constrained or protected. It is semantic authority, not the implementation mechanism chosen to enforce it.
- **Security Property** — one bounded property being established, such as identity validity, authorization, authenticity, freshness, containment, secrecy or an approved abuse/usage envelope. Proof of one Security Property is not proof of adjacent properties.
- **Security Claim** — a falsifiable statement binding the Security Property to the relevant subject/input, object/action/scope, Enforcement Site and expected allow/deny/failure behavior.
- **Trust Boundary** — a boundary where data, credentials, authority or execution context crosses between materially different trust assumptions and therefore requires the approved validation/enforcement semantics. It is not synonymous with a network hop or process boundary.
- **Enforcement Site** — the authoritative, unavoidable seam where the inputs required by Security Policy are evaluated before the protected sink/action. A named middleware/helper or clean caller is not an Enforcement Site unless material paths cannot bypass it.

Use the canonical core terms after definition. Keep replay/freshness terminology inside the authenticity/replay branch that needs it. Do not collapse Security Properties merely because one control participates in several of them.

- **WHEN** the exact security failure class changes the Enforcement Site or negative proof, **READ** [Threat and Failure Taxonomy](references/threat-failure-taxonomy.md) **BECAUSE** its property-separation model prevents one mechanism from being treated as proof of another Security Property; **RETURN** the selected Security Property/failure class, authoritative Enforcement Site, discriminating negative-proof dimension and unresolved Security Policy facts.
- **WHEN** untrusted-data flow, bypass coverage or real-mechanism negative evidence is material, **READ** [Security Probe Discipline](references/security-probe-discipline.md) **BECAUSE** its typed graph exposes source/policy/guard/reachability relations without turning implementation into exploit development; **RETURN** the bounded Security Claim, source-to-Enforcement-Site-to-sink graph, bypass candidates, smallest real probe and any substituted/unverified boundary.

Select only the relevant classes/probes; these references are expert priors, not a mandatory security checklist or a source of project policy.

## Entry gate

Establish the canonical Security Policy and Trust Boundary truth that constrains the change, inspected Enforcement Sites/bypass/runtime seams, applicable credential/session lifecycle, source/environment authority, and a falsifiable negative proof target. A tracker, frontier, semantic-unit ledger, work type, or parent Implement wrapper/invocation is not required.

If who may do what, tenant/resource scope, sensitive-data handling, abuse threshold, privacy/compliance rule, or another material policy is missing/conflicting, stop that affected part and name the policy gap. Never choose permissive or restrictive behavior merely to finish the code.

## Security execution loop

1. **Reconstruct and classify the attack/enforcement surface.** Trace material actors, request/job/service entry paths, authentication context, authorization/resource/tenant scope, background/bulk paths, session/token/credential lifecycle, signed external requests, outbound fetches, browser ambient credentials, scarce/paid business flows, secrets, logs/errors and existing negative evidence. Select the smallest threat/failure classes that can change correctness; do not enumerate unrelated vulnerability categories.
2. **Map source -> Enforcement Site -> protected sink/action.** Follow caller/attacker-controlled IDs, properties, URLs, events, claims or upstream data through normalization/lookup/transformation to the identity/Security Policy inputs, unavoidable Enforcement Site and protected resource/side effect. Include alternate/nested/bulk/background/service paths that can reach the same sink. A clean caller or named middleware is not proof that the sink is covered.
3. **Separate the Security Properties.** Bind what establishes identity, what Security Policy authorizes this exact object/property/action/scope, how session/permission freshness or replay admission is enforced, and what constrains outbound/browser/external Trust Boundaries when material. UI visibility, identifier unpredictability, cryptographic validity and authentication alone are not authorization; authenticity alone is not replay/freshness admission or one-business-effect/idempotency semantics.
4. **Challenge false assurance before mutation.** Reject explanations such as hidden routes, unguessable IDs, framework defaults, valid signatures, syntactically valid/internal URLs, rate limiting, happy-path success or mocks when they do not prove the exact Security Claim. Replace each rationalization with the smallest authoritative evidence that would close it.
5. **Apply engineering economy inside the security contract.** Reuse proven platform/framework/identity mechanisms when they cover the approved semantics, but never remove Trust Boundary validation, authorization, secret handling or failure controls to reduce code.
6. **Implement the smallest unavoidable control.** Cover all material entry paths at one canonical Enforcement Site when possible. Implement session/token expiry, refresh/revocation, rotation, signed-request authenticity and replay/freshness admission, CSRF/outbound-request containment, abuse/failure or secret-handling behavior only as required by approved Security Policy/design. If the requirement also constrains repeated business effects, consume the approved logical-operation/effect identity and business-idempotency contract from its API/Backend/Data owner; do not invent it from signatures, equal payloads, provider event IDs, delivery/request IDs, nonces or storage convenience.
7. **Exercise discriminating negative proof.** Freeze one Security Claim, keep the valid path constant and vary one security-relevant dimension: unauthenticated/authenticated-but-unauthorized, cross-tenant/resource, sensitive property/action, stale/revoked, an otherwise authentic stale/replayed request when material, alternate bypass, prohibited outbound destination, cross-site state change, bulk/background or abusive-but-policy-valid near miss as material. When a broader claim includes repeated business effects, prove the Security Property separately from the owner-provided business-idempotency/effect invariant. A happy path cannot prove isolation.
8. **Inspect real enforcement and observability.** Verify actual allow/deny/failure behavior through the real mechanism at the smallest representative boundary. State what any mock/stub bypasses. Inspect logs/errors/traces for useful non-secret subject/scope/action/result context without raw credentials/tokens/secrets.
9. **Report security evidence.** Report the Security Policy/design revision, selected failure classes, source-to-Enforcement-Site-to-sink graph, alternate paths covered, negative commands/results, lifecycle/replay-freshness/containment evidence, secret-log inspection, substituted boundaries, and unresolved policy/runtime facts.

## Re-entry

If new Security Policy, Trust Boundary, identity/scope, bypass-reachability, credential-lifecycle, or runtime evidence invalidates an earlier security premise, reopen the earliest affected enforcement/proof decision and its material dependents. Preserve independent established Security Property truth and negative proof; widen re-entry only when the changed premise is shared/root Security Policy or Trust Boundary truth for the bounded unit.

## Hard boundaries

- Never invent authorization/privacy/compliance policy or abuse thresholds merely to close an implementation.
- Never treat authentication middleware, token parsing, UUID opacity, hidden UI/route visibility, signatures, rate limiting or framework defaults as proof beyond the Security Property they actually establish.
- Never treat a valid signature, nonce/timestamp check, replay cache or provider event/delivery ID as proof of business idempotency or one-business-effect semantics without an approved operation/effect identity contract from its owner.
- Never weaken validation/error/security controls for economy.
- Keep defensive implementation separate from exploit development: do not introduce offensive payload corpora or attack automation merely to make the Skill look deeper.
- Never claim independent security assessment, penetration-test assurance, QA or risk acceptance.

## Completion

`READY` closes only this bounded implementation unit and requires its declared negative/bypass
proof through the real enforcement mechanism, with substituted boundaries explicit. Missing policy, authority, CRITICAL evidence path,
or required runtime mechanism keeps `PARTIAL`/`BLOCKED`/`FAILED`. This does not establish independent security assessment, QA, risk acceptance, or release readiness.
