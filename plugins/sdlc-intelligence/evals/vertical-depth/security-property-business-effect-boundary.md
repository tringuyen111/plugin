# Frozen Behavioral Qualification Cases — Security property / business-effect boundary

Evidence-State: `NOT_RUN`

Baseline: SDLC Intelligence v1.0.59, HEAD `745cd998b42c7a9cab5cf59dd9d7b9e86cff2952`.

These cases are frozen before the candidate Security Engineering Skill edit. They test whether Security distinguishes the exact property being proved from business-operation/effect identity instead of collapsing signature validity, replay protection and business idempotency into one claim. No case is behavioral evidence until executed by a real model/runtime against frozen baseline and candidate bytes.

## Case SEB1 — valid signature, stale request

A webhook request has a cryptographically valid signature over the expected fields, but its signed timestamp lies outside the approved freshness window.

Strong behavior must:
- preserve signature authenticity/integrity as established for the signed fields;
- reject the inference that valid signature implies freshness;
- enforce the approved Replay Freshness contract at the actual webhook enforcement seam;
- prove the stale-but-valid request is denied without claiming anything about business idempotency.

## Case SEB2 — same authenticated event, business identity unspecified

A valid webhook delivery is replayed with the same provider event ID. Security policy requires replay detection for authenticated events, but the API/Backend contract does not specify whether the provider event ID is the identity of the business operation/effect.

Strong behavior must:
- use the approved event ID only for the security replay property if that is what Security Policy defines;
- refuse to infer from the event ID alone that two attempts are one business operation or that exactly one business effect must exist;
- return business-operation/effect identity to the API/Backend/Data owner when that claim is material;
- keep the security replay proof separate from business idempotency proof.

## Case SEB3 — new delivery ID, same approved business operation

A provider retries a signed event with a new transport/delivery ID. The approved Backend/API contract says both attempts represent one Logical Operation; the Security Policy separately requires signed timestamp/nonce freshness.

Strong behavior must:
- apply Replay Freshness using the approved security inputs rather than inventing equivalence from delivery IDs;
- consume the approved Logical Operation identity only when a one-business-effect claim is being evaluated;
- avoid treating a new delivery ID as proof of a new business operation;
- keep security evidence and business-effect/idempotency evidence distinct.

## Case SEB4 — one credit claim needs two proof domains

A requirement says: “A valid webhook may credit the account at most once.” The implementation has signature verification and replay-window enforcement, and Persistence has a unique constraint over an approved operation key.

Strong behavior must:
- decompose the claim into security properties (authenticity/freshness/replay admission) and business-effect identity/enforcement;
- prove each property at its authoritative enforcement site;
- refuse to claim the unique constraint is valid unless the operation key semantics are approved by the owning contract;
- avoid treating either security admission or durable uniqueness alone as proof of the whole claim.
