---
name: security-engineering
description: Execute one approved security or identity enforcement implementation unit under the SDLC implementation owner, binding canonical policy to trust boundaries and unavoidable enforcement seams, covering authentication versus authorization, tenant/resource isolation, session/token lifecycle, signed-request replay, secrets, bypass paths, representative negative proof, and truthful domain closure. Use as an explicit-or-orchestrated supporting capability for materially security-facing work; do not invent security/Product policy, accept risk, issue independent security assurance, own QA, or complete the parent work item.
---

# Security Engineering

Read [Domain Execution Kernel](../../resources/shared/references/domain-execution-kernel.md) first. Read the
approved [Security / Auth System Design Reference](../codebase-design/SECURITY-SYSTEM-DESIGN.md)
for the material enforcement/lifecycle semantics.


## Entry gate

Require canonical policy/NFR truth, actors/services/trust boundaries, approved technical
security decision, current runtime entry/bypass paths, credential/session lifecycle as relevant,
work type/blockers, negative proof target and exact source/environment authority.

If who may do what, tenant/resource scope, sensitive-data handling or another material policy is
missing/conflicting, return the owner blocker. Never pick permissive or restrictive behavior to
finish the code.

## Security execution loop

1. **Reconstruct the attack/enforcement surface.** Trace all material actors, request/job/service
   entry paths, authentication context, authorization/resource/tenant scope, background/bulk
   paths, session/token/credential lifecycle, signed external requests, secrets, logs/errors and
   existing negative tests/evidence.
2. **Separate identity, permission and enforcement.** Bind what establishes identity, what policy
   authorizes the action on this exact resource/scope, and which trustworthy server/runtime seam
   makes the decision unavoidable. UI visibility and valid authentication are not authorization.
3. **Map bypasses before mutation.** Include direct/alternate routes, nested/bulk/export paths,
   background jobs, service-to-service calls and caller-supplied resource/tenant identifiers when
   they can cross the same boundary.
4. **Apply engineering economy inside the security contract.** Reuse proven platform/framework/
   identity mechanisms when they cover the approved semantics, but never remove trust-boundary
   validation, authorization, secret handling or failure controls to reduce code.
5. **Implement the smallest unavoidable control.** Cover all material entry paths at one
   canonical enforcement seam when possible. Implement session/token expiry, refresh/revocation,
   rotation, signed-request freshness/replay, abuse/failure or secret-handling behavior only as
   required by approved policy/design.
6. **Exercise representative negative proof.** As material, test unauthenticated,
   authenticated-but-unauthorized, cross-tenant/resource, stale/revoked, replay/duplicate,
   alternate bypass, bulk/background and public-endpoint near misses. A happy path cannot prove
   isolation.
7. **Inspect real enforcement and observability.** Verify actual status/denial behavior and that
   logs/errors/traces preserve useful non-secret context without raw tokens/credentials/secrets.
   A mock bypassing the enforcement seam cannot prove the security claim.
8. **Return closure evidence.** Return policy/design revision, enforcement seam and covered paths,
   negative commands/results, lifecycle/replay evidence, secret-log inspection, substituted
   boundaries, discoveries and truthful domain state to `/implement`.

## Hard boundaries

- Never invent authorization/privacy/compliance policy.
- Never treat authentication middleware, a token parser, hidden UI or route visibility as
  sufficient resource authorization evidence.
- Never weaken validation/error/security controls for economy.
- Never claim independent security assessment, penetration-test assurance, QA or risk acceptance.

## Completion

`READY` closes only this bounded implementation unit and requires its declared negative/bypass
proof through the real enforcement mechanism. Missing policy, authority, CRITICAL evidence path,
or required runtime mechanism keeps `PARTIAL`/`BLOCKED`/`FAILED`. Independent verification and
release remain separate owners.
