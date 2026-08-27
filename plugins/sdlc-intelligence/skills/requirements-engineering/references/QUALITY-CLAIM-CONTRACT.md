# Quality Claim Contract

Use this reference only when a category-specific branch materially changes a quality requirement's meaning. It deepens **requirement semantics and verification intent**; it does not own architecture, implementation, executable test probes, test data/commands, QA verdicts, waivers, or release decisions.

## Contents

1. Common quality-claim model
2. Baseline evidence versus normative target
3. Quantitative measurement semantics
4. Availability and reliability
5. Recovery
6. Security and privacy
7. Accessibility and conformance
8. Compatibility and localization
9. Auditability and observability
10. Maintainability and structural evidence
11. Anti-invention and proof boundaries

## 1. Common quality-claim model

Reconstruct only the dimensions that can change satisfaction or falsification:

```text
protected risk/value
-> scoped subject/population
-> stimulus/condition
-> environment/operating mode
-> required response/invariant
-> measurable or conformance boundary
-> authority + assumptions
-> verification intent
```

A dynamic quality such as performance, availability, recovery, or interactive resilience often needs stimulus/environment/response semantics. A structural or conformance quality may instead need an inspectable invariant/property. Do not force every quality into one representation.

Each field is conditional. Do not add decorative precision. Add a field when changing it could change whether the requirement is satisfied, who/what it applies to, or what evidence could falsify it.

## 2. Baseline evidence versus normative target

Keep current reality separate from requirement authority:

- telemetry, incidents, current benchmarks, current conformance, and existing controls can establish a **baseline observation**;
- baseline evidence can reveal a gap, constrain feasibility discussion, or falsify current compliance;
- a baseline does **not** authorize the desired target merely because it is measured, current, or convenient;
- a Product metric becomes normative only when the responsible Product/domain/policy/SLO/contract authority explicitly makes it a quality constraint for the declared scope.

Record baseline provenance when useful. Never silently copy a current p95, uptime, error rate, retention period, control set, or conformance result into the target requirement.

## 3. Quantitative measurement semantics

For a quantitative requirement preserve, when material:

- **signal/metric definition** — what is measured and where the observation boundary begins/ends;
- **unit** — ms, seconds, bytes, percentage points, requests, errors, or another source-defined unit;
- **population/load** — requests/users/records/devices/regions and concurrency or throughput conditions that define the evaluated population;
- **statistic/aggregation** — mean, median, p95, p99, maximum, rate, ratio, count, or another authorized statistic;
- **observation window** — per request, five-minute window, monthly period, rolling interval, release window, or other authoritative time basis;
- **operating conditions** — data volume, network/device class, cache/warm state, dependency condition, feature mode, or other condition that changes the claim;
- **authorized exclusions** — only exclusions explicitly justified by the source authority/applicability rule;
- **threshold/boundary source** — where the target came from and whether it is a hard requirement, guardrail, budget, or another normative boundary.

A green **mean** does not satisfy an authorized **p95** claim. A one-minute sample does not satisfy a monthly availability claim merely because both produce a percentage. An easier signal is not a substitute for the authorized signal.

Do not invent sample size, confidence, percentile, warm-up, tolerance, threshold, window, unit, or exclusion. If uncertainty or statistical confidence is itself a requirement, source it explicitly. The executable sampling plan, benchmark harness, test data, commands, and statistical analysis of observed evidence remain downstream test/metrics/QA concerns.

## 4. Availability and reliability

When the requirement is availability/reliability/SLO-like, preserve the semantic components that define the ratio or event claim:

- what counts as a successful vs failed event;
- population/denominator and service/user scope;
- observation window and time basis;
- regions/tenants/critical paths included;
- maintenance, dependency, or other exclusions **only if authorized**;
- whether degraded-but-usable behavior counts as success, failure, or a separate state;
- any failure/degraded outcome **only when the source makes it part of the quality requirement**.

Do not silently change a user-visible availability claim into process uptime or a probe-health metric because it is easier to collect.

## 5. Recovery

For recovery requirements, define business/operational semantics before technical recovery design:

- triggering failure/event and affected scope;
- **recovery start** and **recovery end** observable points;
- maximum tolerated unavailability or restoration boundary when authorized;
- maximum tolerated data-loss boundary/checkpoint when authorized;
- degraded mode and residual inconsistency allowed, if authoritative;
- evidence class capable of establishing service/data/business state restoration.

Use terms such as RTO/RPO only when the source uses or authorizes the corresponding semantics. Do not invent an RTO/RPO merely because the category is recovery. Architecture/Engineering own backups, replicas, failover, restore workflows and other mechanisms.

If degraded/failure behavior is a separate business decision or flow rather than part of the quality claim, link the owning Acceptance Criterion, Business Rule, or Use Case instead of defining it here.

## 6. Security and privacy

State the protected quality outcome/invariant rather than prescribing controls:

- protected actor/asset/data/process scope;
- allowed/forbidden actor or information outcome;
- threat/regulatory/policy condition when source-backed;
- confidentiality/integrity/authorization/privacy invariant;
- retention/deletion/consent or disclosure boundary when applicable;
- conformance/evidence class capable of falsifying the requirement.

For example, “administrative access requires MFA” can be a normative requirement when authorized; the identity provider, token flow, cryptographic mechanism, session design and enforcement topology are Architecture/Engineering decisions. A privacy retention period needs exact data scope and time basis; it is not a storage implementation instruction.

## 7. Accessibility and conformance

When compliance is expressed through a standard/profile, bind the conformance fixed point:

- **standard/profile identity**;
- **version/level** or dated profile when material;
- applicable product/content/interaction scope;
- exceptions/applicability rule only when authoritative;
- required conformance outcome or permitted exception state;
- evidence class appropriate to that conformance claim.

Do not choose WCAG 2.2 AA, a security standard, regulatory edition, browser baseline, or other profile by default just because it is common. The source must authorize the standard/version/level. Test framework, scanner, certification procedure, test environment, and execution mechanics remain downstream verification concerns.

## 8. Compatibility and localization

For compatibility, state the supported population/matrix dimensions that are actually normative: platform, browser/runtime family, API/protocol version, device class, dependency version, data format, or another source-defined axis. Do not invent minimum versions to complete a matrix.

For localization, preserve supported locale/language/timezone/calendar/number or currency semantics where material. Define fallback only when authorized. A technical library/formatting implementation is not part of the requirement.

## 9. Auditability and observability

An auditability/observability quality requirement should state the observable guarantee, for example:

- which business/security/operational events require evidence;
- required completeness, ordering, latency, correlation, integrity, or retention semantics when authoritative;
- who/what must be able to consume the evidence and for what bounded purpose;
- forbidden loss, silent fallback, or unverifiable gap.

Logging stack, telemetry SDK, schema implementation, storage backend, dashboard, alerting technology and sampling implementation are technical decisions.

## 10. Maintainability and structural evidence

Maintainability may require structural or conformance evidence rather than a runtime number: supported dependency policy, architectural boundary, change-isolation property, required static property, ownership rule, or another inspectable contract. Do not invent a complexity score or coverage percentage if the authoritative concern is qualitative but still falsifiable through structural evidence.

A generic technology or process constraint is not automatically a maintainability requirement. Preserve it as a quality requirement only when the authoritative claim is the quality/conformance property itself rather than merely a chosen solution or team process.

## 11. Anti-invention and proof boundaries

Do not invent:

- numeric threshold, percentile, unit, tolerance, sample size or confidence;
- observation window, load/population, exclusion or maintenance rule;
- RTO/RPO or data-loss allowance;
- standard/profile, version/level, compatibility version or locale fallback;
- security/privacy control, implementation mechanism or provider;
- verification PASS/FAIL, waiver decision, or release readiness.

A source-complete requirement may still be `NOT_RUN` for verification. A local or substitute probe may later support only the claim it can falsify. `verify-quality` owns executable QA proof semantics, evidence admission/verdict, and durable reusable condition artifacts when needed. The requirement must make the intended claim clear enough that downstream proof cannot silently change its meaning.
