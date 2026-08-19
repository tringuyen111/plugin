# Defect Recording

Use this reference when an observed or explicitly suspected deviation must become a durable defect artifact. Recording preserves the observation; it does not diagnose root cause, repair source, close/reject the defect, or replace the QA verdict.

## Expected and observation fixed points

Bind the expected behavior to the exact authoritative source identity plus revision/digest that governed the observation. Bind the observation to the exact candidate/build and, when material, environment/configuration/data, permissions/flags, probe/producer/command, observation time, and evidence identity/hash.

Finding classification:

```text
CONFIRMED | SUSPECTED | BLOCKED_BY_REQUIREMENT
```

- `CONFIRMED`: authoritative expectation + evidence-bound mismatch at the recorded fixed point. It is not root-cause proof.
- `SUSPECTED`: observation is plausible but a material binding/evidence element is missing.
- `BLOCKED_BY_REQUIREMENT`: controlling expectation is unresolved/conflicting/insufficient to decide whether a deviation exists.

An intermittent issue may be `CONFIRMED` when exact evidence establishes the mismatch at the recorded fixed point; preserve frequency/intermittency truthfully instead of inventing deterministic frequency.

Preserve the original expected/actual history. Later requirement changes, fixes, re-verification, or tracker lifecycle link downstream; they do not rewrite the original observation.

## Canonical relationship and persistence

When the canonical defect destination is inspectable, classify:

```text
NEW | DUPLICATE_OF | RELATED_TO | UNKNOWN
```

Use `DUPLICATE_OF` only when evidence shows the same observed deviation scope; title similarity or a shared root-cause hypothesis is insufficient. Use `RELATED_TO` for evidence-backed overlap that remains a separate observation. If the destination cannot be inspected, keep `UNKNOWN`.

Persist only when destination and write authority are exact. Otherwise return an inline defect draft with persistence `NOT_RUN`. After an authorized provider write, reopen/re-read when possible and verify canonical identity/content; provider acknowledgement alone is not lifecycle truth.

## Defect record content

Record actual behavior without interpretation; reproduction preconditions/steps/frequency; evidence; user/business/data/security/availability impact and severity; affected AC/NFR/risk; regression condition; root-cause state (`UNKNOWN | HYPOTHESIS_ONLY | PROVEN_BY_DIAGNOSIS`); canonical relationship; persistence truth; and downstream fix/re-verification/requirement-decision links when real.

Severity describes observed consequence. Remediation priority/scheduling stays with the appropriate Product/Planning/Incident owner. Route hard diagnosis to `diagnosing-bugs` rather than converting a symptom into a cause claim.

## Defect-only completion

A defect artifact is ready when its expectation and observation fixed points, finding classification, actual behavior, reproducible context, evidence, impact/severity, traceability/regression condition, root-cause state, canonical relationship, and persistence status are truthful and complete. Artifact readiness never closes the defect or creates a QA PASS/FAIL by itself.

Use [Defect Report template](../templates/defect-report.md) for a durable artifact.
