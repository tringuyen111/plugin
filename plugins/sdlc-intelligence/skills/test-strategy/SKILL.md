---
name: test-strategy
description: Design the supporting risk/claim coverage plan for fixed-scope QA from approved acceptance, NFRs, architecture, data, environment, design, change scope, and prior evidence. Use to choose verification levels, priorities, environments, and evidence; do not execute probes or issue the overall QA verdict.
---

# Test Strategy
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->

Map claims and risks to proportionate verification. This is a supporting planning skill inside `/verify-quality`; it does not execute conditions, write production code, redefine AC, or declare the parent QA verdict.

Read [TEST-STRATEGY-FORMAT.md](TEST-STRATEGY-FORMAT.md).

## Inputs

- Product/Business scope, Stories, AC, Rules, and NFRs;
- UX states and Visual Contract;
- ADRs, interfaces, data boundaries, integrations, migrations, and rollback;
- implementation diff and affected runtime paths;
- developer tests, previous defects, incidents, support patterns, and metrics;
- target environments and release mode.

## Strategy fixed point and plan freshness

Bind each persisted strategy to an exact `strategy_revision` plus the material
source identity and source revision for every approved scope, Story, AC, Rule,
NFR, Visual Contract, ADR, architecture/interface, change-scope, risk, defect,
or other source that controls the plan. When a source system has no revision
field, use an immutable digest or record version. Record an **evidence cutoff**
when prior tests, defects, incidents, support patterns, or metrics affect the
risk/exposure model. Logical ID or filename continuity does not prove source
meaning is unchanged.

Keep planning freshness separate from QA execution/result truth:

```text
CURRENT | STALE | CONFLICTING | UNVERIFIED
```

`CURRENT` requires the material source bindings to resolve to the exact meaning
used by the risk model, probe/authority decisions, priorities, environment/data
requirements, regression scope, deferred coverage, and stop/exit criteria. A
missing material source revision/digest is `UNVERIFIED`, not current. Conflicting
authoritative source meaning is `CONFLICTING`; preserve the conflict and route it
to the canonical source owner instead of selecting a convenient interpretation.

A material source change makes the affected risk/coverage decisions `STALE`.
Revalidate the affected claim/risk, consequence/exposure, selected boundary,
probe authority and limitations, complementary evidence, priority,
environment/data requirements, regression scope, deferred coverage, and
stop/exit criteria against the new source fixed point, then advance the strategy
revision before treating those decisions as current again. Source-owner-confirmed
semantic equivalence may support bounded revalidation only when inspectable
evidence proves the planning meaning did not materially change.

When the strategy consumes an existing Test Condition, bind its exact
`condition_revision` and bounded proof authority. A logical condition ID/title
does not make a newer condition revision equivalent. Do not require Test
Conditions to pre-exist before a strategy can plan a proof target; a planned
condition/probe may remain an explicit target until `/test-condition`
materializes its own current definition.

Treat environment and data descriptions as **planning requirements and selection
constraints**, not evidence that a runtime environment is available or that a
data set is representative. State required capabilities, states, equivalence
classes/invariants, isolation/cleanup and known limitations without inventing
availability or representativeness. `/verify-quality` owns the exact candidate,
environment, data, configuration, executor and admitted-evidence binding at
execution time.

Historical evidence may change risk, exposure, regression scope, or priority,
but it does not become current execution evidence or a current condition result.
Keep stop/exit criteria source- or authority-backed: do not invent hard pass
thresholds, waivers, acceptance exceptions, or residual-risk authority merely to
make the strategy complete.

## Process

1. **Bind the planning fixed point and identify claims.** Record the exact
   `strategy_revision`, material source revisions/digests, evidence cutoff, and
   current freshness before mapping user, business, machine-consumer, visual,
   operational, or quality claims. Preserve missing/conflicting/stale planning
   truth rather than filling it from implementation behavior.
2. **Identify failure consequences.** Consider user harm, revenue, data
   integrity, security/privacy, permission, compliance, availability,
   recoverability, reputation, and support load.
3. **Estimate exposure.** Consider likelihood, change size, coupling,
   complexity, novelty, external dependencies, historical defects, and
   detectability. Avoid fake precision.
4. **Map boundaries.** Identify component, contract, integration, end-to-end,
   data, environment, visual, accessibility, performance, security, migration,
   recovery, exploratory, and UAT surfaces as relevant.
5. **Choose the smallest authoritative probe for each claim.** Prefer fast
   lower-level checks when they can falsify the whole bounded claim; use
   higher-level or real-output checks when the claim depends on integrated
   behavior. For each selected probe, record substituted boundaries/test doubles
   and what the probe cannot prove.
6. **Close proof gaps compositionally.** If one probe substitutes or bypasses a
   material failure mechanism, either narrow the supported claim or add the
   smallest complementary probe that exercises the missing boundary. Do not
   count multiple weak probes as strong evidence merely because the suite is
   large.
7. **Reuse developer evidence carefully.** Developer tests may contribute
   evidence, but QA identifies separately owned or independently sourced probes
   and gaps rather than assuming red-green coverage proves acceptance.
8. **Prioritize.** Mark must-run release conditions, important regression, and
   optional exploration. State why anything material is deferred.
9. **Define environments, data, tooling, and evidence.** Record planning
   requirements and selection constraints separately from any later live
   execution binding. Include cleanup, idempotency, observability, and
   failure-injection needs.
10. **Name stop and exit criteria.** Define source/authority-backed conditions
    that block acceptance and what may be accepted only by the authorized risk
    owner; do not self-authorize a waiver or acceptance exception.

## Principles

- Test by risk and claim, not by fashionable test ratios.
- Unit, integration, contract, E2E, visual, accessibility, performance,
  security, migration, recovery, and exploratory checks are tools, not quotas.
- A passing lower-level test cannot prove an unobserved higher-level claim.
- A mock, fake, simulator, snapshot, or fixture proves only the boundary it
  actually exercises; it does not inherit authority for the replaced mechanism.
- A screenshot cannot prove interaction or accessibility.
- Coverage percentage is diagnostic metadata, not a QA verdict.
- Include failure, negative, boundary, permission, concurrency, duplicate,
  timeout, retry, recovery, and stale-state behavior when the sources support
  those risks.

## Completion

`READY` means the strategy artifact has an exact strategy revision and source
fixed point with `CURRENT` planning freshness for every required material
coverage decision, plus a traceable risk/claim map, chosen verification levels,
probe-authority/limitation mapping, complementary-evidence decisions for material
substituted boundaries, priorities, environment/data/tool planning requirements,
evidence contracts, regression scope, exit criteria, and explicit omissions.
When an existing Test Condition is consumed, the strategy also binds its exact
condition revision; a condition need not already exist merely to plan its proof
target.

Use `PARTIAL` when required planning truth is `STALE`, `CONFLICTING`, or
`UNVERIFIED`, or when key sources, environment/data requirements, or capability
information are missing. Strategy `READY` does not mean probes ran, a live
environment/data set was proven suitable, or the parent QA workflow is ready for
acceptance. `/verify-quality` owns exact execution binding, evidence admission,
condition results, residual-risk assessment, and the overall QA verdict; UAT and
release owners remain downstream.
