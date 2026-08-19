# Test Quality Review Lens

Load when tests changed, when material changed behavior lacks an apparent regression test, or when the review conclusion relies on test evidence.

## Ask whether the test can falsify the bug

A useful test must fail for the relevant broken behavior. Review:

- whether the oracle/assertion checks the material outcome rather than an incidental detail;
- whether negative/boundary/adversarial states that caused the risk are exercised;
- whether the test would stay green if the implementation regressed in the exact way under review;
- whether test setup accidentally pre-satisfies or bypasses the behavior being tested.

Line/branch coverage is not a substitute for a meaningful oracle.

## Mocks and substituted seams

A mock/fake proves only the seam it actually exercises. Flag false confidence when a substitute bypasses the material mechanism, such as:

- router/serialization/auth middleware;
- transaction/isolation/constraint behavior;
- queue redelivery/lease/acknowledgement;
- browser focus/hydration/network behavior;
- external compatibility/protocol handling.

Do not require integration/E2E tests universally. Match test depth to the failure mechanism and existing project testing strategy.

## Runtime-evidence boundary

Tests may be strong regression protection yet still not prove production/runtime behavior outside their environment. Preserve the distinction between:

```text
source/test evidence
runtime reproduction
QA acceptance
```

Review can identify a missing/weak test and its failure mode; `/implement` owns remediation and `/verify-quality` owns runtime/risk acceptance evidence.
