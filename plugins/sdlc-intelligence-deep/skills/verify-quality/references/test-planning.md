# QA Test Planning

Use this reference when the requested terminal output is a reusable Test Strategy or when QA needs deeper risk-to-probe planning than the universal proof ledger provides. Planning is part of the same QA cognition; a plan is not execution evidence and does not create a QA verdict.

## Planning fixed point and freshness

Bind the plan to an exact `strategy_revision`, evidence cutoff, and material source identity + revision/digest for approved scope, AC/Rules/NFRs, Design/Visual truth, ADR/interface/data semantics, change scope, known defects/incidents, and any other source that controls coverage. Logical names or filenames do not prove unchanged meaning.

Use planning freshness:

```text
CURRENT | STALE | CONFLICTING | UNVERIFIED
```

- `CURRENT`: material source bindings resolve to the meaning used by the risk model, probe choices, priorities, environment/data needs, deferred coverage, and exit criteria.
- `STALE`: a material source changed and affected planning decisions have not been revalidated.
- `CONFLICTING`: authoritative sources disagree; preserve the conflict instead of choosing a convenient oracle.
- `UNVERIFIED`: a material source revision/digest or planning dependency cannot be bound.

A source change invalidates only dependent planning decisions. Revalidate the affected claim/risk, failure model, probe authority/limitations, complementary evidence, priority, environment/data needs, regression scope, deferred coverage, and stop criteria before advancing the strategy revision.

## Risk-to-proof design

For each material claim:

1. Bind the source-backed obligation.
2. Name plausible failure consequences: user/business harm, data integrity, security/privacy, permission, compliance, availability, recoverability, reputation, or support load when relevant.
3. Estimate exposure from change size, coupling, novelty, dependencies, historical failures, and detectability without fake precision.
4. State the failure mechanism before selecting a test type.
5. Choose the smallest boundary that contains every mechanism the claim depends on.
6. Record any mock/fake/simulator/fixture/substituted boundary and what the probe cannot prove.
7. Add the smallest complementary real-boundary probe when a wider claim depends on a bypassed mechanism.
8. Prioritize must-run, important regression, and optional exploration from source-backed risk; state why material coverage is deferred.

Unit/property, contract, integration, browser/E2E, visual, accessibility, performance, security, migration, recovery, and exploratory checks are probe families, not quotas or lifecycle phases.

When a known risk still maps only to a generic test level, read [Probe Design Tactics](probe-design-tactics.md). When retry/flakiness, stochastic behavior, sequence/history, eventual consistency, non-hermetic configuration, or conflicting success signals can change evidence meaning, read [Evidence Reliability and Oracle Composition](evidence-reliability.md). When browser-visible interaction is a material proof boundary, read [Browser Test Planning](browser-test-planning.md).

## Environment, data, and process-assurance planning

Treat environment/data descriptions as planning requirements, not proof that a live environment exists or that data is representative. State required capabilities/states, semantic data classes/invariants, isolation/cleanup/idempotency, observability, synchronization, and fault/perturbation needs when they improve the falsifier.

When a source-backed control requires proof that a mandated process/tool actually ran, plan a separate observable process-evidence target. Hidden chain-of-thought is never evidence. Use commands/tool records/manifests/CI output/provenance only. Missing process evidence leaves that process claim unresolved without erasing narrower output evidence.

Historical evidence may influence risk and regression scope but does not become current execution evidence. Stop/exit criteria require source or authorized risk-owner backing; do not invent pass thresholds, waivers, or acceptance exceptions to make the strategy complete.

## Planning-only completion

A reusable Test Strategy is `READY` when the current planning fixed point, risk/claim map, failure/probe authority, complementary evidence, priorities, environment/data/tool requirements, regression scope, explicit omissions, and source-backed stop criteria are complete. `READY` does **not** mean probes ran, a live environment is suitable, or QA passed.

Use [Test Strategy template](../templates/test-strategy.md) for a durable artifact.
