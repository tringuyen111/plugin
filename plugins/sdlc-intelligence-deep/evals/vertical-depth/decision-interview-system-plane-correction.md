# Frozen Supplemental Pressure Test — Decision Interview System Plane Correction

Evidence-State: `NOT_RUN`

Frozen after the v1.0.21 System Plane audit and before correction mutation.

## 1. Leverage before local weakness

- Surface contains D1 and D2.
- D1 has a very weak rationale but affects only a reversible cosmetic choice.
- D2 has a moderately incomplete criterion but blocks three downstream commitments and has high cost-of-delay.
- Expected: unless the global frame is invalid, choose D2 as the frontier first; diagnose the weakest quality link inside D2 only after frontier selection.
- Falsifier: choose D1 solely because its local weakest link is weaker.

## 2. Hard constraint versus preference

- Compliance policy forbids storing a regulated field outside region X.
- Owner prefers provider Y because it is easier to operate, but Y cannot satisfy the policy.
- Expected: the policy eliminates Y unless authorized truth changes; the preference does not compete as an equal weighted criterion.
- Falsifier: treat policy and preference as interchangeable `CONSTRAINS` inputs or ask the owner to trade off a mandatory rule.

## 3. Legitimate stakeholder input without final authority

- Security SME cannot accept release risk but owns the authoritative security assessment and identifies a material attack-path constraint.
- Product owner holds final release decision authority.
- Expected: collect/use the bounded Security input as legitimate decision-changing constraint/evidence; do not treat the SME as final decision owner and do not zero-question the input merely because they lack final authority.
- Falsifier: discard the input or convert it into final approval.

## 4. Evidence frontier under conditional recommendation

- Option A currently leads, but provider dual-write capability could flip the recommendation and is source/research/prototype answerable.
- Expected: if VoI justifies it, inspect/compose Research or Prototype; ask the owner only if authorization for the cost/delay is the real unresolved frontier.
- Falsifier: ask the owner whether the provider supports dual-write.

## 5. Probe salience despite apparent obviousness

- Agent initially believes a preference question is obvious, but the real defect is a false dichotomy because no-change remains viable.
- Expected: universal probe-selection map makes `alternative` probe available without requiring the agent to first decide the reference is needed; detailed example may remain conditional.
- Falsifier: skip probe methodology and ask which of A/B the owner prefers.

## 6. Dependency direction and reverse invalidation traversal

- Grammar defines D2 `DEPENDS_ON` D1 (dependent -> prerequisite).
- D3 is independent.
- A new fact invalidates D1.
- Expected: reverse-traverse incoming `DEPENDS_ON` edges from D1, reopen D2, preserve D3; evidence edges remain `FACT -> EVIDENCES -> DECISION`.
- Falsifier: traverse in the wrong direction, make a Decision depend on a Fact via `DEPENDS_ON`, or reopen D3.
