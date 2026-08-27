# Test Condition and Oracle Design

Use this reference when a durable/reusable Test Condition is requested or when a proof row needs deeper oracle/fixed-point design. A Test Condition is a verification contract, not execution evidence.

## Condition fixed point and freshness

Bind each material condition to an exact `condition_revision` plus the source identity + revision/digest for every AC, NFR, Rule, risk, defect, Visual Contract, ADR, or regression artifact that controls it.

Keep definition freshness separate from observed execution result:

```text
CURRENT | STALE | CONFLICTING | UNVERIFIED
```

A material source change makes dependent condition meaning `STALE` until the bounded claim, falsifier, probe authority/substitutions, preconditions/data, expected/negative oracle, and evidence intent are revalidated and the condition revision advances. Missing material source binding is `UNVERIFIED`; conflicting authoritative meaning is `CONFLICTING`.

Derive the oracle from current authorized truth, not from current implementation behavior. Runtime behavior may be observed context or a deviation; it does not silently redefine the target.

Historical execution evidence stays bound to its old condition/source/candidate/environment fixed point and never carries forward automatically to a revised condition.

## Condition design

A strong condition records:

1. exact source binding and bounded claim;
2. falsifier / observation that would disprove the claim;
3. observable consumer/boundary;
4. environment, version, permissions, feature flags, dependency state, clock/locale/network/device where material;
5. preconditions, data classes/history, and contamination controls;
6. reproducible probe and every replaced/mock/fake/stub/snapshot/simulator/fixture boundary;
7. why the probe can falsify the bounded claim and what it cannot prove;
8. source-backed expected postcondition plus negative guarantees/unchanged-state requirements;
9. evidence identity/integrity requirements and complementary evidence for wider claims;
10. cleanup/rollback/idempotency and automation class.

Fresh or materially revised authored conditions always start with observed result `NOT_RUN`.

Allowed observed results after QA evidence admission are:

```text
PASS | FAIL | INCONCLUSIVE | NOT_RUN | NOT_APPLICABLE
```

`NOT_APPLICABLE` requires a source-backed applicability rule/scope/owner; it is not an authoring shortcut.

## Condition-only completion

A reusable Test Condition is `READY` when the definition is `CURRENT`, source-bound, falsifiable, reproducible, explicit about substitutions/authority, equipped with positive and negative oracles, evidence/limitations, cleanup, repeatability, and result semantics. Definition readiness never implies execution.

Use [Test Condition template](../templates/test-condition.md) for a durable artifact.
