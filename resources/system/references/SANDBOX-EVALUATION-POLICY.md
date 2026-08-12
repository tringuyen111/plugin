# Sandbox-Native Evaluation Policy

This policy classifies evaluation evidence without confusing independence with
execution. The sandbox agent is a real runtime when it executes fixed cases,
freezes raw outputs, records tool effects, and reviews declared invariants.
That evidence is not independent merely because roles were performed in
sequence.

## 1. Ownership

- `/qualify-sdlc-capability` owns evidence collection, preservation, semantic review,
  and evidence-profile classification.
- `/audit-sdlc-artifact` or `/manage-skill-lifecycle` assigns the assurance tier from
  source facts and blast radius. The artifact under test must not lower its own
  tier.
- `/manage-skill-lifecycle` owns promotion sufficiency and active writes.
- ER-01, ER-02, and ER-03 are candidate references in this revision. They are
  non-operative until lifecycle promotion and must not admit external output,
  establish trusted provenance, or define external job exchange for active qualification.

One agent may perform several roles only by announcing the role transition and
preserving separate artifacts. That is procedural separation, not independent
verification.

## 2. Evidence profiles

```text
SANDBOX_OBSERVED
  fixed cases executed in the current sandbox runtime;
  raw output frozen before review;
  supports functional and invariant claims.

SANDBOX_PROCEDURAL_COMPARISON
  candidate and baseline outputs are produced/reviewed sequentially under
  declared context restrictions;
  supports DIRECTIONAL_PASS only;
  never supports an independent-superiority claim.

RISK_SPECIFIC_ASSURANCE
  fixed evidence is paired with controls for the actual CRITICAL risk, such as
  destructive-operation recovery, lifecycle cutover/rollback, or fixed-point
  verification trials;
  may support bounded promotion without an independent claim.

ATTESTED_INDEPENDENT
  reserved profile for execution/review provenance under active promoted receipt
  and attestation contracts; unavailable in this revision while ER-01/ER-02 remain
  candidate; may support an independent PASS claim only after those active
  provenance contracts exist and semantic review also passes.
```

Source inspection without executing representative behavior is not
`SANDBOX_OBSERVED`. Sandbox profiles must use `trusted_provenance:
NOT_APPLICABLE`; a trusted provenance verdict belongs only to the attested
profile. A reserved profile may remain in the policy vocabulary while unavailable;
selecting `ATTESTED_INDEPENDENT` before active promoted provenance contracts exist
is blocking, not an invitation to read candidate ER references as runtime authority.

## 3. Assurance tiers

The tier is assigned from source, ownership, and side-effect facts—not from the
candidate's preferred label. The decision record must preserve the assigning
workflow, an inspectable reason, and source-backed factors. The deterministic
model derives the minimum tier from those factors and rejects underrating.

The canonical factor vocabulary maps to minimum tiers as follows:

```text
STANDARD minimum
  DETERMINISTIC_POLICY_MODEL
  COMPATIBLE_BOUNDED_REVISION
  READ_ONLY_ANALYSIS

ELEVATED minimum
  TRIGGER_OR_CONTEXT_CHANGE
  GUARDED_SIDE_EFFECT_PATH
  NEW_ROUTE_OR_OWNER
  CANONICAL_DECISION_OUTPUT
  CANONICAL_PROJECT_WRITE
  PROTECTED_DECISION
  CROSS_LIFECYCLE_ROUTING
  PROVIDER_OR_EXTERNAL_INTERACTION

CRITICAL minimum
  INDEPENDENT_VERIFICATION_CLAIM
  SECURITY_OR_IDENTITY
  DESTRUCTIVE_OR_DEPLOYMENT
  UNGUARDED_EXTERNAL_WRITE
  LIFECYCLE_AUTHORITY_CHANGE
```

A higher tier may be assigned when source-specific blast radius requires it. A
lower tier than the derived minimum is invalid.

### STANDARD

Compatible, bounded revisions that do not add a route, change canonical owner,
claim independent verification, or introduce unguarded external/destructive
behavior.

Promotion may use sandbox-observed functional evidence. When comparison is
required, `DIRECTIONAL_PASS` from a sandbox procedural comparison is sufficient
for the promotion decision, but the release must not claim independent
superiority.

### ELEVATED

Changes to triggers, ownership boundaries, provider interaction, guarded write
behavior, or broad cross-lifecycle decisions. Require sandbox procedural
comparison, negative/near-miss coverage, explicit owner authorization,
rollback, and monitoring. Lifecycle may still require independent evidence for
a specific risk.

### CRITICAL

Security/identity decisions, destructive or deployment execution, lifecycle
authority changes, verification-verdict authority, independent claims,
unguarded external writes, or policy that explicitly demands independence.

Use `RISK_SPECIFIC_ASSURANCE` when the claim is bounded and the actual risk has
source-bound controls: owner authorization, representative fixed-point trials,
side-effect review, recovery/rollback, package proof, and monitoring as
applicable. `ATTESTED_INDEPENDENT` is unavailable in this revision. If the
artifact or release claims independent provenance or policy explicitly requires
it, keep that requirement blocking until an active promoted provenance contract
exists. Sandbox directional evidence may supplement the decision but never
becomes an independent claim.

## 4. Mandatory gates

These gates apply to `ASSURED` promotion decisions. The lifecycle-level `SKILL_CREATOR_VALIDATED` profile is a structural/package acceptance path for eligible prompt-only OpenAI Skills; it is not an evidence profile and cannot support behavioral, independent, safety, or security-assurance claims.

Every `ASSURED` promotion decision requires:

```text
functional verdict             PASS
critical invariants            PASS
representative trial           PASS or NOT_APPLICABLE with reason
side-effect review             PASS or NOT_APPLICABLE
owner authorization            GRANTED for ELEVATED, CRITICAL, or publication;
                               GRANTED or NOT_REQUIRED otherwise
package and rollback evidence  READY when publication changes occur
risk disposition               NONE or MONITOR with monitoring READY
```

If comparison is required:

```text
STANDARD             DIRECTIONAL_PASS for procedural sandbox comparison;
                     independent PASS remains unavailable while the attested
                     profile is unavailable
ELEVATED             DIRECTIONAL_PASS plus monitoring/rollback/authorization;
                     independent PASS remains unavailable while the attested
                     profile is unavailable
CRITICAL             DIRECTIONAL_PASS with RISK_SPECIFIC_ASSURANCE when
                     comparison is required and independent provenance is not
                     claimed; any policy-required independent PASS remains
                     blocking while the attested profile is unavailable
```

`FAIL`, `NOT_RUN`, or `INCONCLUSIVE` on a required axis remains blocking.
`DIRECTIONAL_PASS` is not a renamed `INCONCLUSIVE`; it requires both frozen
outputs, the `SANDBOX_PROCEDURAL_COMPARISON` profile, reviewed scoring
dimensions, meaningful intended improvement, and an explicit absence of material
safety, ownership, or truthfulness regression. An observed comparison `FAIL`
blocks promotion even when comparison was optional. Comparison `PASS` is reserved for attested
independent evidence.

## 5. False-proof controls

Block the decision when:

- the candidate assigns its own assurance tier;
- sandbox evidence claims independent provenance;
- `ATTESTED_INDEPENDENT` is selected while no active promoted provenance contract exists;
- `DIRECTIONAL_PASS` is used for a CRITICAL change without a risk-specific profile and required controls;
- comparison is required but either raw output is absent;
- critical invariants fail or were not run;
- side effects are unreviewed;
- known risks are hidden instead of accepted for monitoring;
- lifecycle/package/rollback authority is missing.

## 6. Completion truth

A policy decision returns separate fields for:

```text
evidence_state
promotion_gate
assurance_tier
evidence_profile
independent_claim_supported
confidence
findings
next_actions
```

`promotion_gate: ELIGIBLE` means evidence is sufficient for lifecycle review at
the assigned tier. It is not an active promotion and never grants write
authority.
