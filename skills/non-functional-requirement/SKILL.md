---
name: non-functional-requirement
description: Define measurable non-functional requirements and verification intent. Use when behavior depends on performance, security, privacy, accessibility, reliability, compatibility, localization, auditability, observability, or recovery constraints that cannot be expressed as a vague quality adjective.
---

# Non-Functional Requirement
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->

Define a quality or operational constraint in observable, scoped, and verifiable
terms.

This skill owns requirement semantics and verification intent. It does not choose
architecture, controls, tools, implementation, benchmark/test code, or release
verdict. It **does not own the verification verdict** and **does not own waiver
authority** merely because it authored the requirement.

Read `NFR-FORMAT.md` before writing the artifact. When the quality claim depends
on quantitative measurement, conformance, availability/reliability, recovery,
security/privacy, accessibility, compatibility/localization, auditability,
observability, or another category-specific evidence boundary, read
`QUALITY-EVIDENCE-CONTRACT.md` and load only the relevant branch.

## Requirement fixed point and truth basis

Bind the artifact to an exact **requirement revision**, **authority/source
identity**, and **source revision** (policy, regulation, Product/domain decision,
standard/profile, SLO, contractual decision, or other canonical source).

Classify the **requirement truth basis** explicitly:

- **CURRENT_VERIFIED** — current quality behavior supported by current-state
  evidence. It describes reality but is not automatically the desired target.
- **TARGET_AUTHORIZED** — target quality semantics authorized by the exact source
  revision.
- **PROPOSED_OR_ASSUMED** — stakeholder target, inference, guessed threshold,
  convention, or unresolved assumption without sufficient authority.

A material source change makes the affected requirement stale. Revalidate its
scope/target/evidence semantics against the new source revision and advance the
requirement revision. Evidence remains bound to the requirement revision it
actually verified; it does not carry forward by wording similarity.

## Process

1. **Resolve the quality risk.** Name the user, business, regulatory, or
   operational consequence the requirement protects against.
2. **Bind authority and truth.** Record requirement revision, authority/source
   identity and source revision, requirement owner, truth basis, effective scope,
   and unresolved assumptions. A regulation/source and project owner are not the
   same thing.
3. **Choose the category.** Performance, security, privacy, accessibility,
   reliability, availability, compatibility, localization, auditability,
   observability, maintainability, recovery, or another justified quality class.
4. **Define scope and operating conditions.** Identify actor/population,
   environment, data volume, load/concurrency, device, network, locale/time basis,
   operating mode, and other conditions only where they can materially change the
   claim.
5. **Define the observable quality claim / evidence contract.** Replace vague
   words such as fast, secure, intuitive, scalable, reliable, and responsive with
   a precise claim and evidence boundary. Use `QUALITY-EVIDENCE-CONTRACT.md` for
   the relevant category. Numeric threshold is one form; conformance/invariant/
   scenario/structural evidence may be the correct form instead.
6. **Preserve measurement semantics when quantitative.** Record the quality
   **signal**, **unit**, population/load, required **statistic** or aggregation,
   **observation window**, operating conditions, and source-authorized
   **exclusions**. Do not substitute a mean for p95, a snapshot for a window, or
   another easier measure merely because data exists.
7. **Preserve conformance semantics when normative.** Record the applicable
   standard/profile identity, **version**/level, scope and authorized exception
   basis. Never select a standard/version/level just to make the requirement look
   complete.
8. **Define failure/degraded behavior.** State the externally meaningful behavior
   or delivery consequence when the requirement cannot be met, including
   degraded mode, hard failure, block, rollback/recovery expectation, or visible
   residual risk where authorized. Do not hide non-compliance behind silent
   fallback.
9. **Define verification intent.** State the evidence class and environment
   needed to falsify/prove the requirement without prescribing a framework.
   Use `/test-condition` for the executable probe contract and `/verify-quality`
   for evidence admission and QA verdict.
10. **Keep Product and domain authority explicit.** A Product metric target is
    not automatically an NFR. It becomes requirement truth only when the owning
    Product/domain/policy/SLO authority makes it a quality constraint for the
    declared scope.
11. **Keep verification and waiver axes external to authoring.** A new or
    materially revised requirement starts verification status `NOT_RUN`.
    QA/verification owners later bind evidence to the exact requirement/candidate
    revision. A waiver has separate authority/scope/rationale/residual-risk/
    expiry semantics and never rewrites FAIL/INCONCLUSIVE/NOT_RUN evidence.
12. **Record assumptions and caveats.** Missing source-backed threshold,
    statistic, window, population, standard/version, exception, or evidence path
    remains unresolved. Do not invent precision to manufacture `READY`.

## Ownership boundaries

- Requirement semantics may state the protected outcome/invariant, but
  Architecture/Engineering own technical controls, topology, storage, queues,
  caching, cryptography, authentication design, instrumentation implementation,
  recovery mechanisms, and other implementation choices.
- `/test-condition` owns the executable probe/environment/data/falsifier contract;
  `/verify-quality` owns evidence admission and the observed QA verdict.
- Product owns Product outcome/metric decisions; a metric does not become a
  normative quality requirement without requirement authority.
- A conformance standard or regulation is authority evidence, not the project
  requirement owner.

## Completion

`READY` requires an exact requirement/source fixed point and truth basis, risk,
category, scope/operating conditions, observable quality claim/evidence contract,
category-appropriate measurement or conformance semantics, failure/degraded
behavior, verification intent, authority/source basis, and requirement owner.

Numeric thresholds, percentiles, confidence, windows, standards, exclusions, RTO,
RPO, compatibility versions, locales, retention, or other precision are used only
when authority supplies or justifies them. A qualitative adjective or materially
underspecified measurement/conformance contract remains `PARTIAL`. Authoring
`READY` leaves verification `NOT_RUN` unless canonical verification evidence
already exists for that exact requirement revision; it never implies VERIFIED or
WAIVED.
