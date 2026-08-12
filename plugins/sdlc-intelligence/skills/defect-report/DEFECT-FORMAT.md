# Defect Format

```markdown
# DEF-<id> — <user-visible deviation>

## Record identity
- Defect revision:
- Finding classification: SUSPECTED | CONFIRMED | BLOCKED_BY_REQUIREMENT
- Relationship: NEW | DUPLICATE_OF | RELATED_TO | UNKNOWN
- Relationship evidence / canonical reference:
- Severity:
- Frequency / intermittency:

## Expected fixed point
- Source artifact:
- Expected source revision / digest:
- Expected behavior:

## Actual
- Observed behavior / output:

## Observation fixed point
- Candidate / build:
- Environment / configuration:
- Data identity / fixture:
- Permissions / feature flags:
- Probe / producer / command:
- Observed at:

## Reproduction
- Preconditions:
- Steps / command:
- Reproduction frequency / pattern:

## Evidence
- Evidence path / URL / hash:
- Observed output:
- PII or secret handling:

## Impact

## Affected AC / NFR / risk / release

## Root-cause state
UNKNOWN | HYPOTHESIS_ONLY | PROVEN_BY_DIAGNOSIS

`CONFIRMED` means an authoritative expectation and evidence-bound mismatch at the
recorded observation fixed point; it is not root cause proof.

## Regression condition

## Persistence
- Persistence status: NOT_RUN
- Canonical defect / work item:
- Integration Result Manifest / canonical provider result:

## Downstream lifecycle references
- Engineering fix claim / artifact:
- QA re-verification evidence:
- Requirement/Product decision if expectation changed:
- Owner / next route:
```

Use `DUPLICATE_OF` only when inspectable canonical evidence shows the same
observed deviation scope. Title similarity or a root-cause hypothesis is not
duplicate proof. If the canonical destination cannot be inspected, keep the
relationship `UNKNOWN`.

Preserve the historical expectation and observation fixed point. Later
requirement changes, Engineering fix claims, QA re-verification, tracker status,
or closure decisions link to this record; do not rewrite the original
expected/actual history.

This artifact does not own defect closure or rejection. Keep downstream Engineering, QA re-verification, and requirement-disposition truth in their canonical owner records and link them here.
