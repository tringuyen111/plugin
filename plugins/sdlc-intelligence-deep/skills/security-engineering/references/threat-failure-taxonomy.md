# Security Threat and Failure Taxonomy

Load this reference only when a material security/identity boundary is active and the exact failure class changes the implementation or proof. Select the smallest set of classes supported by the inspected attack surface; this is a reasoning taxonomy, not a universal checklist.

## 1. Classify the protected thing and the attacker-controlled degree of freedom

Before choosing a control, state:

- **subject** — caller/user/service identity and the attributes/relationships that policy may use;
- **operation** — the action being attempted;
- **object/scope** — exact resource, tenant, organization, project, account or collection;
- **properties** — fields whose visibility or mutability may differ by policy;
- **entry path** — HTTP route, RPC, queue/job, background task, import/export, webhook or internal service call;
- **ambient authority** — cookies, session state, service credentials or inherited execution context;
- **attacker-controlled input** — IDs, properties, URLs, headers, body values, event contents, uploaded data or upstream responses;
- **protected sink/action** — read, write, delete, transfer, send, execute, fetch, impersonate, disclose or consume a scarce/paid resource.

Classification is useful only if it changes where the enforcement must live or what negative evidence can falsify the claim.

### Separate the property being proved

One mechanism can establish one security property while leaving another completely open. Use this matrix only for properties that are material to the inspected flow:

| Mechanism / evidence | Can establish | Does **not** establish by itself | Discriminating negative proof |
| --- | --- | --- | --- |
| authentication/session validation | who the current subject/session is, within the validated lifecycle | permission for this object/property/action or current relationship | keep the valid identity; change only object/action/scope |
| object/action authorization decision | whether this subject may perform this operation on this scope under the bound policy inputs | credential freshness outside the inputs, request authenticity, replay uniqueness, network containment | keep identity/object; vary the policy-relevant relationship/property/action |
| signature/MAC verification | authenticity/integrity for exactly the signed fields under that key contract | freshness, uniqueness, business idempotency, resource authorization | keep the signature valid; replay or change a separately authorized resource dimension |
| CSRF/origin/token control | whether an ambient-credential browser state change satisfies the approved cross-site request protection | object/action authorization or XSS resistance | keep the authenticated session/action; vary same-site vs cross-site request provenance |
| outbound destination containment | whether the server may reach the resolved destination under the approved network rule | caller permission for the business action or trustworthiness of returned content | keep request semantics; vary only destination/redirect/resolution class |
| rate/usage control | whether consumption remains within the approved abuse/resource envelope | authorization to the object/action or semantic validity of each request | keep requests policy-valid; vary only approved usage-rate/resource dimension |

The near-miss is to observe one green control and collapse the row into a general “secure” claim. Name the property first, then require the evidence that can falsify that property.

## 2. Authorization failure classes

### Object/resource-level authorization

A caller is authenticated and may even be valid inside a tenant, but an attacker-controlled object identifier reaches a load or mutation that is not scoped to the authorized object/tenant relationship.

Probe the real handler with an object belonging to another subject/scope. Identifier unpredictability, UUIDs or hidden links do not close this claim.

### Property-level authorization

The caller may access the object but may not read or mutate every field. Broad deserialization, serialization, merge/update helpers and generic model binding can expose or accept fields the UI never shows.

Bind readable/writable properties to canonical policy and exercise a sensitive-field near miss. UI omission is not enforcement.

### Function/action-level authorization

The caller reaches an administrative, privileged or otherwise restricted operation through a direct/alternate path. Route visibility, menu hiding or generic session checks do not prove action authorization.

Probe authenticated-but-unauthorized access to the exact server-side action.

### Relationship/attribute/time-sensitive authorization

When policy depends on ownership, membership, delegation, environment, time, approval or another dynamic attribute, stale identity or cached policy state can produce incorrect access even when a role check exists. Verify the current policy inputs and their freshness at the enforcement seam.

## 3. Authentication and session lifecycle failures

Separate credential validity from session authorization freshness. Material classes include:

- session fixation or failure to rotate identity-bound state when privilege changes;
- stale sessions after password reset, account disable, role/permission change, logout or revocation;
- refresh/renewal extending authority beyond approved lifetime;
- tokens accepted in the wrong audience/context or with stale scope;
- credentials/session identifiers leaking into URLs, logs, analytics, traces, support artifacts or client-readable storage beyond the approved model.

A cryptographically valid token can still be stale, mis-scoped or no longer authorized.

## 4. Authenticity, replay and duplicate side effects

A valid signature/MAC proves only the property covered by the signing contract. It does not automatically prove freshness, uniqueness, authorization of the resulting business action or idempotent processing.

When duplicate execution matters, inspect timestamp/nonce/event-id/idempotency semantics, accepted replay window, storage lifetime and duplicate behavior. Probe a valid duplicate through the real handler.

## 5. Browser ambient-authority / CSRF boundary

When browser requests automatically carry session cookies or another ambient credential, a state-changing endpoint may need explicit cross-site request protection. Re-evaluate this boundary when a flow moves from framework form/action handling to custom fetch/RPC endpoints.

Prefer the platform/framework protection that actually covers the inspected flow when it satisfies approved architecture. Inspect actual SameSite/origin/token/fetch-metadata configuration rather than assuming defaults. XSS and authorization remain separate concerns; CSRF mitigation is not authorization.

## 6. Outbound request / SSRF boundary

Any server-side fetch whose destination or redirect chain is influenced by untrusted data creates a network trust boundary. Distinguish:

- **known destinations** — approved allowlist/protocol/port/destination constraints can be explicit;
- **arbitrary external destinations** — the design needs a different containment model and cannot pretend a string allowlist covers the Internet.

Inspect URL parsing/normalization, redirect behavior, DNS/address resolution, protocol handling and network reachability relevant to the actual client/runtime. A valid `http(s)` URL is not evidence of a safe destination.

## 7. Sensitive business-flow and resource-consumption abuse

A caller can be fully authorized yet abuse a legitimate flow at harmful scale or automation rate: paid SMS/email, reservation/inventory capture, expensive computation, account creation, comment posting, export generation, etc.

Keep this distinct from authorization. Derive quotas, throttling, proof-of-work, user interaction or recovery behavior only from product/security/operational truth; do not invent CAPTCHA, lockout or rate limits simply because abuse exists.

## 8. Unsafe upstream trust

Data from an authenticated or trusted third-party API is still external input. Validate schema, bounds, resource identity, authorization-relevant fields, redirects/URLs and failure behavior at the receiving boundary. Do not lower validation merely because the source is another service.

## 9. Security configuration and inventory drift

Security can fail when the intended control exists in source but is not active on every deployed path/version/environment. Material evidence may require checking route registration, middleware/filter ordering, feature flags, API/version inventory, debug endpoints, environment configuration and generated deployment artifacts.

## Rationalizations to reject

Reject these unless the named authoritative proof exists:

- **“The ID is unguessable.”** Object scope still needs authorization.
- **“The user is authenticated.”** Identity is not permission for every object/action/property.
- **“The route/button is hidden.”** Client/navigation visibility is not server enforcement.
- **“The signature is valid.”** Authenticity does not prove freshness, replay safety or business idempotency.
- **“The URL is syntactically valid / internal.”** Parsing and naming do not establish safe network destination/reachability.
- **“The framework handles it.”** Verify the actual configuration and that the inspected path passes through the control.
- **“There is rate limiting.”** Throttling is not authorization and may not cover a sensitive business-flow invariant.
- **“The happy path passes.”** Security claims require the material negative/bypass path.
- **“A mock test covers it.”** A mock that bypasses the enforcement/failure mechanism cannot prove the real boundary.

## Provenance

This reference is a paraphrased/derived defensive reasoning aid informed by OWASP Cheat Sheet Series authorization/session/SSRF/CSRF guidance at repository revision `be926b099d8e8b05b81b12217d5ebda9c1fd4973` and OWASP API Security Top 10 2023 content blob `230cc8c72fe8035474c7edbbb27374183e91f8ab` (CC BY-SA 4.0). Exact inspected paths, license evidence and exclusions are preserved in the frozen Depth Program source pack. It does not import exploit payloads or replace current project policy. The property-separation guidance was re-checked on 2026-08-15 against current OWASP Authorization/Session/CSRF/SSRF guidance and NIST SP 800-63B-4 session guidance; external guidance remains a defensive prior, not project policy.
