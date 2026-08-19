# Security Review Lens

Load when the change crosses a trust boundary or touches authentication, authorization, tenant/resource scope, untrusted input, sensitive data/secrets, replay/duplicates, privileged operations, or security-control configuration.

## Identity is not authorization

For each protected operation, separate:

- who/what is authenticated;
- which action is allowed;
- which resource/object/property/tenant is allowed;
- whether the same decision is enforced on alternate entry paths.

A valid identity/token/signature does not prove permission for every resource/action. Look for bypass paths that reach the same sensitive sink without the same policy decision.

## Trace source to sink

For material untrusted or security-relevant data:

```text
source -> parsing/normalization -> validation/authorization -> transformation -> sink
```

Check the boundary where trust changes. Do not assume another service, authenticated caller, metadata field, generated identifier, or client-side validation is inherently trustworthy.

## Replay, sequence, and business-flow abuse

When duplicate execution or ordering matters, inspect stable operation/event identity, freshness/window, duplicate behavior, and state-transition authorization. A valid signature proves only authenticity under its signing contract; it does not automatically prove freshness, replay safety, authorization, or business idempotency.

For sensitive business flows, reason about bypass/sequence and resource-consumption abuse only when the change makes them material. Do not invent CAPTCHA, rate limits, lockout, or security policy.

## Sensitive output and logs

Inspect new error/log/telemetry/serialization paths for secrets, credentials, tokens, personal/sensitive data, internal authorization details, or cross-tenant information disclosure.

## Evidence boundary

Report source-level security defects with concrete attack preconditions and affected path, without supplying exploit playbooks. Runtime enforcement, cryptographic/provider behavior, penetration evidence, policy approval, and security acceptance remain with Security/verification owners.
