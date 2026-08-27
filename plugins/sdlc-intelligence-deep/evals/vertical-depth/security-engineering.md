# Frozen Behavioral Qualification Cases — security-engineering

Evidence-State: `NOT_RUN`

These cases freeze the root Security Engineering behavior before the current composition candidate edit. They qualify defensive implementation cognition, not penetration-test or risk-acceptance assurance. Runtime execution remains `NOT_RUN` until a real model/Skill runner executes frozen baseline and candidate bytes.

## Rubric dimensions

- `POLICY_AUTHORITY`: consumes canonical Security Policy and stops on material policy gaps rather than inventing allow/deny behavior.
- `PROPERTY_SEPARATION`: distinguishes identity, authorization, authenticity, freshness/replay admission, containment and abuse controls.
- `ENFORCEMENT_REACHABILITY`: proves the authoritative Enforcement Site is unavoidable for every material path to the protected sink.
- `NEGATIVE_PROOF`: varies one security-relevant dimension through the real/representative enforcement mechanism instead of relying on happy paths.
- `LIFECYCLE`: handles session/token/credential expiry, revocation, rotation and freshness from actual policy/runtime truth.
- `BOUNDARY_DISCIPLINE`: does not invent business idempotency, Product/privacy/risk policy, QA assurance, or release truth.

## Case S1 — authenticated tenant member requests another tenant's object

Alice is authenticated and is a valid member of tenant A. The route accepts an invoice ID and the repository loads that invoice by ID alone. Invoice B belongs to tenant B.

Strong behavior must:
- preserve authentication as established without treating it as object authorization;
- trace the caller-controlled invoice ID through lookup to the protected read/action and identify the missing tenant/object policy guard;
- place enforcement at an unavoidable seam using canonical tenant/resource policy inputs;
- prove denial by keeping Alice/route/session fixed and varying only the invoice to tenant B.

## Case S2 — permitted object, forbidden property mutation

A user may edit their profile name but not `role`, `billing_status`, or another privileged property. A generic merge/model-binding helper accepts arbitrary fields that the UI does not display.

Strong behavior must:
- distinguish object access from property/action authorization;
- reject UI omission or broad deserialization as enforcement;
- bind writable fields/actions to canonical policy at the real mutation seam;
- exercise a sensitive-property negative case without inventing policy for fields whose authority is unresolved.

## Case S3 — valid credential after revocation event

A cryptographically valid session/token is presented after password reset, account disable, logout, or a role revocation that policy says must remove current authority.

Strong behavior must:
- separate token/signature validity from current authorization/session lifecycle;
- bind the approved revocation/freshness semantics and actual runtime mechanism;
- prove the stale/revoked credential is rejected at the real enforcement path;
- avoid choosing a revocation lifetime/cache rule if policy/runtime truth is missing.

## Case S4 — valid signature but stale replay

A signed webhook verifies cryptographically, but its otherwise valid timestamp/nonce violates the approved replay-admission window. Business operation identity is owned elsewhere.

Strong behavior must:
- preserve authenticity/integrity as established for the signed fields;
- evaluate Replay Freshness separately and deny the stale replay under approved Security Policy;
- avoid inferring business idempotency or one-effect semantics from signature, nonce, provider event ID or replay cache;
- return any business-effect identity gap to its owning API/Backend/Data contract.

## Case S5 — ambient browser credential crosses site boundary

A state-changing browser endpoint automatically receives session cookies. The route was moved from framework form handling to custom fetch/RPC and current CSRF/origin protection is unclear.

Strong behavior must:
- identify the browser ambient-authority Trust Boundary rather than assuming authentication is enough;
- inspect actual SameSite/origin/token/fetch-metadata/framework behavior for the deployed path;
- keep CSRF protection separate from object/action authorization and XSS;
- run the smallest same-site versus cross-site negative proof the real mechanism permits.

## Case S6 — user-controlled outbound URL redirects internally

A server fetches a user-controlled `https://` URL. Initial syntax/host checks pass, but redirect or resolution behavior could reach a prohibited internal/private destination.

Strong behavior must:
- treat destination/redirect/resolution as an outbound Trust Boundary, not mark syntactic `http(s)` validity as safe;
- inspect the actual client/runtime normalization, redirect, DNS/address and egress mechanism material to reachability;
- enforce the approved destination containment rule at an unavoidable seam;
- prove a prohibited destination class is blocked without turning the task into exploit development.

## Case S7 — mocked auth unit test bypasses the real route guard

A unit test mocks identity/policy below the router and passes. An alternate route or background path may reach the same protected sink without the middleware used by the tested route.

Strong behavior must:
- state exactly what the mock proves and what it bypasses;
- map material entry paths to the Enforcement Site and identify any unguarded reachability;
- add the smallest representative real-boundary negative probe when the wider claim depends on routing/middleware coverage;
- refuse to claim the Security Claim closed from the mocked test alone.

## Case S8 — observability helps but must not leak secrets

A security failure is hard to diagnose, so someone proposes logging raw access tokens, session cookies or webhook secrets with each deny decision.

Strong behavior must:
- preserve useful non-secret subject/scope/action/result evidence while refusing raw credentials/tokens/secrets;
- distinguish detection/observability from preventative enforcement;
- keep the proof target bounded to the Security Claim rather than adding broad secret-bearing instrumentation;
- surface any missing logging/privacy policy that materially constrains evidence.

## Case S9 — direct security implementation does not require an Implement route

The user asks for one bounded cross-tenant authorization enforcement correction against already-approved Security Policy. Security enforcement is the dominant proof boundary; the host may or may not expose a separately named generic implementation Skill.

Strong behavior must:
- allow Security Engineering to own the bounded implementation directly;
- preserve external Product/API/Data/Backend/QA decisions as exact gaps rather than fabricating sibling outputs;
- leave subsequent capability selection to host-native discovery rather than require a literal `/implement` route or Handoff for ordinary continuation;
- remain usable when a named sibling Skill is unavailable.

Behavioral/model runtime execution: `NOT_RUN`.
