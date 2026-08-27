# Quality Requirement Branch
<!-- runtime-context:start -->
## Runtime context

- **When durable governed Quality Requirement persistence is requested:** read [Quality Requirement Format](QUALITY-REQUIREMENT-FORMAT.md) and bind only real project-native identity/source/revision/lifecycle truth.
- **When category-specific measurement, conformance, recovery, security/privacy, accessibility, compatibility/localization, auditability/observability, or maintainability semantics can change the claim:** read [Quality Claim Contract](QUALITY-CLAIM-CONTRACT.md) and load only the relevant branch.
<!-- runtime-context:end -->

Define an observable, scoped quality requirement and the evidence boundary capable of falsifying it.

This branch owns **Quality Requirement semantics** and requirement-owned verification intent. It does not own arbitrary solution/process constraints, architecture or controls, implementation, executable test probes, QA verdicts, waivers, or release decisions. A request being called "non-functional" does not by itself make it a quality requirement.

For a lightweight workshop/draft request, work directly from grounded meaning and return the smallest useful quality claim plus unresolved authority/measurement questions. Do **not** fabricate a requirement identifier (`NFR-*`, `QR-*`, or otherwise), revision, approval state, verification state, waiver state, or source revision.

Preserve a real project-native identity such as `NFR-31` when one already exists; do not rename project records merely because this Skill identity is the **Quality Requirement branch**.

## Truth model

Separate **normative target truth** from **observed current reality**.

- **TARGET_AUTHORIZED** — the target quality semantics are authorized by the applicable Product/domain/policy/SLO/contract/regulation/standard authority for the declared scope.
- **PROPOSED_OR_ASSUMED** — a stakeholder proposal, inference, convention, or unresolved assumption that is not yet sufficiently authorized.
- **Current baseline evidence** — observed telemetry, current conformance, incidents, benchmarks, or other evidence about reality. It may reveal a gap or inform negotiation, but it does **not** become the normative target merely because it is measured or currently true.

For a governed artifact, bind the exact requirement revision and applicable authority/source identity/revision. A material source change makes affected requirement semantics stale; revalidate scope/target/measurement or conformance semantics before advancing the requirement revision. Evidence remains bound to what it actually observed and never authorizes a new target by wording similarity.

## Quality-claim method

1. **Confirm this is a quality requirement.** Identify the quality property or conformance outcome that constrains acceptable product/service behavior. If the request is only a technology, architecture, process, procurement, or implementation choice, keep it outside this Skill unless an authoritative quality obligation makes that constraint part of the quality claim.
2. **Ground protected risk/value and authority.** State what user, business, regulatory, or operational consequence the requirement protects against and who/what can authorize the normative target. Keep unsupported precision unresolved.
3. **Build the minimum faithful quality claim.** Use this reasoning shape, adding only dimensions that can change satisfaction or falsification:

   ```text
   protected risk/value
   -> subject/population
   -> stimulus/condition
   -> environment/operating mode
   -> required response/invariant
   -> measurable or conformance boundary
   -> authority + assumptions
   ```

   Dynamic qualities often benefit from stimulus/environment/response semantics. Structural or conformance qualities may be clearer as an invariant/property instead of forcing a runtime scenario.
4. **Use quality categories as a lens, not authority.** Classify the claim as performance, security, privacy, accessibility, reliability, availability, compatibility, localization, auditability, observability, maintainability, recovery, or another justified quality class only to choose the right questions/evidence semantics. A taxonomy or quality model never authorizes a project-specific threshold, control, standard version/level, or implementation choice.
5. **Make the boundary falsifiable.** For quantitative claims preserve signal, unit, population/load, statistic/aggregation, observation window, operating conditions, authorized exclusions, and target source only when material. For normative/conformance claims preserve standard/profile identity, version/level, applicable scope, exceptions/applicability, and required outcome only when authoritative.
6. **Keep baseline evidence separate.** Record current observations only as non-normative baseline/counter-evidence with provenance when useful. Never copy a current p95, uptime, metric, control, or conformance result into the target without target authority.
7. **Preserve category-specific semantics conditionally.** Use `QUALITY-CLAIM-CONTRACT.md` only for branches that can change the claim. Do not preload every category merely because it exists.
8. **Handle failure/degraded behavior only when it is normative.** If the quality requirement itself specifies degraded operation, hard block, restoration, data-integrity, or residual behavior, preserve it. If the missing behavior is a separate business flow, decision, or acceptance rule, load the **Acceptance Criteria**, **Business Rule**, or **Use Case** branch for that question and continue in the same Requirements evidence chain rather than inventing it inside the quality requirement.
9. **Define verification intent, not executable tests.** State the evidence class and the broad environment/conditions needed to falsify the requirement. `verify-quality` owns executable QA proof semantics, evidence admission, the observed QA verdict, and can materialize a durable reusable Test Condition artifact when one is required.
10. **Persist governance only when required.** For a governed quality requirement, bind the real project-native ID/revision/source truth when one exists, plus applicability, maturity/supersession, and change impact. Link canonical downstream test/QA/waiver/release records when useful; do not copy their mutable status into requirement-owned truth.
11. **Expose unresolved precision.** Missing target authority, threshold, statistic, window, population, standard/version, exception, RTO/RPO, compatibility version, locale/time basis, retention, or evidence path remains explicit. Do not invent precision to manufacture `READY`.

### Contrastive SHOW

```text
Observed now: dashboard p95 = 1.8 s under the measured workload.
Weak target:  "The dashboard must stay below 1.8 s p95" (copies baseline into authority).
Correct disposition: keep 1.8 s as CURRENT baseline evidence; identify the missing normative target, population/load, window, and authority before claiming TARGET_AUTHORIZED.
```

A measured baseline can falsify feasibility or motivate negotiation; it does not authorize the target.

## Ownership boundaries

- Requirement semantics may state the protected quality outcome/invariant; Architecture/Engineering own technical controls, topology, storage, queues, caching, cryptography, identity design, instrumentation implementation, recovery mechanisms, and other solution choices.
- `verify-quality` owns executable QA proof semantics, evidence admission, the observed QA verdict, and durable reusable Test Condition artifacts when required.
- Product/domain/policy/SLO/contract authority owns normative target decisions. A measured Product metric or current telemetry is not automatically a quality requirement.
- A quality model, regulation, or standard can classify or constrain a requirement but does not automatically choose every project-specific threshold, control, profile, version, or level.
- Generic solution/process constraints remain outside this Quality Requirement branch unless they are themselves the authoritative expression of a quality obligation.

## Completion

A lightweight quality requirement can be useful without canonical IDs/revisions when it makes the grounded risk/value, subject, condition/environment, required response/invariant, known measurable/conformance boundary, authority basis/assumptions, and unresolved decision-material gaps clear enough for the requested task.

A governed canonical quality requirement is `READY` only when its exact requirement/source fixed point, applicability, normative target basis, quality claim, material measurement/conformance semantics, requirement owner/authority, verification intent, and unresolved assumptions are truthful for that revision.

Numeric thresholds, percentiles, confidence, windows, standards, exclusions, RTO/RPO, compatibility versions, locales, retention, or other precision are used only when authority supplies or justifies them. A vague adjective or materially underspecified claim remains `PARTIAL`. Authoring `READY` never implies verification `PASS`, waiver acceptance, or release readiness.
