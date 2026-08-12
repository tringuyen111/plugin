# Security / Auth System Design Reference

Read this reference when the fixed technical decision materially affects
authentication, authorization, tenant/resource isolation, session/token
lifecycle, secrets, signed external requests, abuse/replay resistance, security
auditability, or another enforcement boundary.

`codebase-design` owns the technical mechanism. Product/BA/NFR or the
project-selected security authority owns policy truth such as who may perform an
action, what data is sensitive, and what retention/compliance rule applies. Do
not invent policy to make the technical design complete.

## Establish trust and policy boundaries

Inspect the real request/runtime path and state:

- actors, callers, services, external senders, and trust boundaries;
- existing authentication context and where it is established;
- approved authorization/resource/tenant policy and its canonical source;
- session/token/credential lifecycle and current revocation/rotation behavior;
- sensitive data and secret-bearing paths relevant to the decision;
- current enforcement points, bypass paths, logs/audit trails, and representative
  negative-path tests/runtime evidence;
- external signed/webhook/request authenticity and replay assumptions when used.

If a material authorization/privacy/security policy is missing or conflicting,
keep the technical design `PARTIAL` and route that truth to its owner. Do not
default permissive or restrictive merely to finish Engineering work.

## Authentication is not authorization

Separate these questions whenever they are material:

1. **Authentication** — what establishes the caller/service identity and how
   fresh/valid that identity is.
2. **Authorization** — whether that identity may perform this action on this
   specific resource/tenant/scope at this time.
3. **Enforcement** — which trustworthy server/runtime seam makes the decision
   unavoidable for all relevant entry paths.

UI visibility, route hiding, client-side state, or possession of a valid session
is not proof of resource authorization. If alternate entry paths can bypass the
enforcement seam, the design is incomplete.

## Resource and tenant isolation

When data/actions are scoped by tenant, organization, account, project, owner, or
resource, define how the scope is derived and enforced. Challenge caller-supplied
identifiers, indirect references, list/filter paths, nested resources, bulk
operations, exports, background jobs, and service-to-service paths when they can
cross the same boundary.

Do not prescribe row-level security, middleware, policy engines, repository
filters, or another mechanism by habit. Choose a seam that actually covers the
material entry paths and can be falsified by cross-scope negative tests.

## Session, token, and credential lifecycle

When identity/permission freshness matters, define the relevant lifecycle:

- issuance/establishment and bound identity/scope;
- expiry and renewal/refresh behavior;
- revocation, logout, credential rotation, or permission-change propagation;
- replay/duplicate behavior when credentials or signed requests may be reused;
- failure semantics for stale, invalid, missing, or insufficient credentials;
- secret storage/transport/logging boundaries.

Do not mandate JWT, opaque sessions, OAuth, a specific signing algorithm, or a
centralized session store. The lifecycle semantics come first; mechanism follows
source constraints and threat/failure evidence.

## Signed external requests and replay

For webhooks, callbacks, or signed service requests, distinguish authenticity
from freshness/replay resistance. A cryptographically valid request may still be
an old duplicate. Define the material timestamp/nonce/idempotency/duplicate
window semantics only when the threat or external contract requires them.

## Secrets and observability

Name where secrets/credentials/tokens can appear and how logs, traces, errors,
analytics, screenshots, support artifacts, and handoffs avoid exposing raw
sensitive material. Security observability should preserve enough non-secret
identity/scope/result context to investigate deny/bypass/replay events without
logging the credential itself.

## Abuse and failure semantics

When brute force, enumeration, resource exhaustion, privilege probing, or another
abuse path is material, define the observable protection and failure contract.
Do not add rate limits/CAPTCHAs/lockouts mechanically; ensure the selected
control does not create a new availability or account-recovery failure that the
approved behavior cannot support.

## Required technical-design extension

Add the material subset of these sections to the normal `codebase-design`
artifact:

```markdown
## Trust boundaries and canonical security policy
## Authentication context and lifecycle
## Authorization / tenant / resource scope
## Enforcement seam and bypass analysis
## Session/token/credential expiry, revocation, and rotation
## Signed-request authenticity / replay semantics
## Secret handling and security observability
## Abuse/failure behavior and recovery
## Negative-path security proof
```

## Proof

Security proof MUST target the enforcement/failure claim, not merely code
presence. Use representative negative evidence when material: unauthenticated,
authenticated-but-unauthorized, cross-tenant/resource, stale/revoked credential,
replayed request, alternate entry path, bulk/background path, or log/error
inspection for secret leakage.

A hidden button, authentication middleware, a token parser, a passing happy-path
test, or a mock that bypasses the enforcement seam cannot prove authorization or
isolation by itself. Conversely, do not require authentication for an endpoint
that canonical policy explicitly defines as public.
