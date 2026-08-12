---
name: defect-report
description: Record a verified or explicitly suspected deviation found during QA with expected versus actual behavior, reproducible context, environment, evidence, impact/severity, and affected acceptance. Use as a supporting artifact after an observation exists; do not diagnose root cause, repair source, file externally without authority, or issue the overall QA verdict.
---

# Defect Report
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

Capture a behavior deviation that another owner can reproduce, diagnose, and resolve through its own lifecycle. This skill owns the deviation record and finding classification only; it does not close the defect, approve a requirement change, or own remediation status. A defect is evidence of a mismatch; it is not a proven root cause.

Read [DEFECT-FORMAT.md](DEFECT-FORMAT.md).

## Observation fixed point and confirmation

Bind each persisted record to an exact `defect_revision`. Bind the **expectation**
to the authoritative source identity plus source revision, or an immutable digest /
record version when the source system has no revision field. A logical source ID,
title, or link does not prove which expected meaning governed the observation.

Bind the **observation fixed point** to the exact candidate/build identity and, when
material, environment, configuration, data/fixture identity, permissions/flags,
probe/producer/command, observed time, and evidence identity/hash. Preserve the
actual output bytes or an integrity-bound reference where feasible. Do not upgrade
a plausible symptom into a verified deviation merely because it resembles a known
bug.

Use the finding classification narrowly:

- `CONFIRMED` requires an authoritative expectation plus an evidence-bound mismatch
  at the recorded observation fixed point. `CONFIRMED` does not mean root cause is
  proven or remediation is known.
- `SUSPECTED` is appropriate when an observation is plausible but a material
  observation binding or evidence needed to establish the mismatch is missing.
- `BLOCKED_BY_REQUIREMENT` applies when the controlling expectation is unresolved,
  conflicting, or lacks sufficient authoritative source truth to decide whether the
  observation is a deviation.

A confirmed observation need not reproduce on every attempt. An intermittent issue
may still be `CONFIRMED` when the exact evidence establishes the mismatch at the
recorded fixed point and frequency/intermittency is recorded truthfully. Do not
convert intermittent behavior into a deterministic-frequency claim.

Preserve the original expected and actual history after filing. Later requirement,
Product, Engineering fix, or QA re-verification decisions are downstream links; they
do not rewrite the original expectation/observation fixed point. If a requirement
changes, link the authorized decision and its new revision while keeping the earlier
expected source revision and observed candidate/evidence intact.

Before persistence, classify the relationship to canonical defect truth only when
that destination can be inspected:

```text
NEW | DUPLICATE_OF | RELATED_TO | UNKNOWN
```

Use `DUPLICATE_OF` only with inspectable canonical evidence that the report describes
the same observed deviation scope; title/text similarity is not enough to declare a
duplicate. A shared or suspected root-cause hypothesis is not enough to declare a
duplicate either. Use `RELATED_TO` for evidence-backed overlap that should remain a
separate observation. If the canonical destination cannot be inspected, use
`UNKNOWN`; do not invent a duplicate decision or a local shadow lifecycle.

## Process

1. **Resolve expected behavior.** Link the exact approved AC, Rule, NFR, Visual
   Contract, released baseline, or other authoritative source identity plus
   revision/immutable digest that governed the observation. If expectation is
   disputed, classify the finding as `BLOCKED_BY_REQUIREMENT` rather than
   inventing a defect.
2. **Record actual behavior verbatim.** Include visible output, response,
   state, data, log, or artifact without interpretation.
3. **Bind the observation fixed point.** Record defect revision, exact
   candidate/build, material environment/configuration/data identity,
   permissions/flags, probe/producer/command, observed time, and evidence
   references/hashes. Missing material bindings keep the finding `SUSPECTED`
   rather than laundering uncertainty into `CONFIRMED`.
4. **Make reproduction durable.** Record preconditions, steps, frequency, and
   whether the issue is consistent or intermittent. Reproduction guidance helps
   diagnosis but does not erase a valid evidence-bound intermittent observation.
5. **Attach evidence.** Link exact command output, screenshot/hash, API payload,
   query, log, video, or manifest. Protect secrets and PII.
6. **Assess impact and severity.** Use user/business/data/security/availability
   consequence. Severity describes observed consequence; remediation priority,
   scheduling, and urgency remain with the applicable Product/Planning/Incident
   owner. Do not use severity to claim technical complexity.
7. **Separate observations from hypotheses.** Root-cause hypotheses may be
   included as unverified context only. Route hard diagnosis to
   `/diagnosing-bugs`.
8. **Link traceability and regression need.** Name affected AC/risk and the
   future regression condition.
9. **Resolve canonical relationship before write.** When the canonical defect
   destination is inspectable, compare evidence/fixed-point scope and record
   `NEW`, evidence-backed `DUPLICATE_OF`, or `RELATED_TO`; title similarity or a
   root-cause guess is insufficient. Otherwise record `UNKNOWN`.
10. **Preview persistence or filing.** Resolve the canonical defect destination
    and request authority before local or external writes. If no write location,
    inspectable destination, or approval exists, return an inline defect draft,
    keep persistence `NOT_RUN`, and do not create a local shadow defect or change
    tracker truth by assumption. After an authorized provider write, link the
    canonical provider resource and Integration Result Manifest/result truth;
    provider acknowledgement alone does not become defect lifecycle truth.

## Lifecycle boundary

This artifact may classify the observed finding only as `SUSPECTED`, `CONFIRMED`, or `BLOCKED_BY_REQUIREMENT`. It does not own `RESOLVED` or `REJECTED` states.

- An Engineering fix claim is a downstream reference, not proof that the deviation is closed.
- QA re-verification evidence may show that the mismatch no longer reproduces for a fixed candidate, but the re-verifying QA owner records that evidence; this reporting skill does not self-close the finding.
- If Product/BA or another requirement owner changes or rejects the expected-behavior claim, link that authorized requirement decision and preserve the original observation rather than rewriting history.
- Persist or link canonical external work/fix/verification records through the project-selected provider; do not mirror their lifecycle status into this defect artifact.

## Completion

`READY` means the defect artifact has an exact defect revision, authoritative
expectation source/revision or an explicit requirement blocker, an evidence-bound
observation fixed point, actual behavior, reproducible context, impact/severity,
traceability/regression need, truthful root-cause state, canonical relationship
truth (`NEW | DUPLICATE_OF | RELATED_TO | UNKNOWN`), and truthful persistence
status/reference. It does not complete the parent QA verdict, own remediation
priority, or close/reject the defect.
