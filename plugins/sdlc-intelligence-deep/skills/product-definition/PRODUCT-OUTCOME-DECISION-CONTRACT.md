# Product Outcome and Decision Contract

Use this reference when Product Definition must preserve discovery evidence constraints, choose
success metrics/targets, compare priority under uncertainty, or distinguish Product scope from
solution/technical commitment.

## Contents

1. Evidence carry-forward
2. Outcome-to-measurement chain
3. Metric roles, proxies, and guardrails
4. Baselines and target basis
5. Measurement ownership
6. Product scope and phasing
7. Priority under uncertainty
8. Decision and failure semantics

## 1. Evidence carry-forward

Bind the **exact opportunity revision** before defining Product truth. Carry forward the source
identity/location/revision and the decision-relevant constraints that could change target segment,
outcome, metric, scope, or priority:

- evidence dependency or duplicated evidence clusters;
- collection/selection limits;
- transferability/segment boundaries;
- counter-evidence and conflicts;
- riskiest unresolved assumption and current learning state.

Do not copy the full discovery corpus into the Product Definition. Link the canonical Opportunity
and summarize only constraints material to the definition decision.

If the Opportunity revision changed materially after Product Definition began, revalidate the
current revision. An approval, priority, scope, or metric decision against an older revision does
not silently authorize the changed definition.

## 2. Outcome-to-measurement chain

For each material success claim, make the reasoning inspectable:

```text
Opportunity/problem
-> User outcome
-> Expected behavior/state/signal if the outcome improves
-> Business outcome when applicable
-> Metric or evidence source
-> Evaluation window/population
```

A metric is evidence about an outcome, not the outcome itself. Prefer a metric whose business
meaning and population directly represent the intended changed condition. If the metric is a
proxy, state the expected relationship and what could make the proxy move without the outcome.

Example:

```text
User outcome: complete the claim accurately without assisted support
Signal: successful unassisted completion with no correction/reopen
Primary metric: valid unassisted completion rate
Weak proxy: number of claim-page views
```

Do not select a convenient engagement metric merely because instrumentation already exists.

## 3. Metric roles, proxies, and guardrails

Use only roles that help the decision; do not force every definition to contain every role.

- **PRIMARY_OUTCOME** — best available measure of the Product outcome/overall decision criterion.
- **SUPPORTING / DIAGNOSTIC** — helps explain mechanism or where change occurred; not automatically
  a success criterion.
- **GUARDRAIL / COUNTER-METRIC** — protects a material user/business/system condition that could
  worsen while the primary outcome metric improves.

A guardrail is warranted when a plausible optimization path can improve the primary metric while
creating material harm, degradation, exclusion, risk, or cost. Examples include conversion rising
while error/reversal rate rises, engagement rising while task success or user control degrades, or
speed rising while correctness falls.

Do not call the definition successful from a primary metric alone when a declared guardrail has
materially regressed. Product Definition defines the intended measurement semantics; observed metric
validity, experiment integrity, uncertainty, statistical interpretation and evidence verdict remain
owned by `metrics-review`.

## 4. Baselines and target basis

For each metric preserve:

- metric meaning/formula or event interpretation;
- metric role;
- outcome link / expected signal;
- population/segment;
- **baseline source** or `UNKNOWN`;
- **target / threshold basis** or `TBD/ASSUMPTION`;
- evaluation window;
- data source/owner;
- guardrails/caveats/proxy limitations.

Do not invent targets, baselines, stretch values, market sizes, or effect sizes to complete a
format. A target may be based on an explicit Product commitment, historical baseline plus justified
change, customer/contract threshold, policy/SLO, validated benchmark, experiment decision rule, or
another inspectable source. Preserve which basis applies.

A stakeholder-proposed number without evidence may be recorded as a **proposed target assumption**;
it is not a justified success threshold merely because an authority requested it.

`Stretch` is optional. “2x target” or another arithmetic convention is not a justification.

## 5. Measurement ownership

Product Definition owns **what outcome should be measured and why**, plus the intended metric
contract at Product altitude.

If the metric cannot currently be observed, state the instrumentation, data-quality, research, or
measurement prerequisite. Do not replace an unmeasurable outcome with a convenient proxy without
making the proxy assumption explicit.

`metrics-review` owns measured-evidence validity and interpretation, including denominator/event
semantics, instrumentation drift, experiment assignment/exposure, SRM/interference, uncertainty,
practical significance, and whether observed evidence supports the Product claim. Product
Definition does not own statistical significance or experiment-validity truth.

## 6. Product scope and phasing

Scope describes the **user capability / Product behavior at feature or epic altitude**, target
segment, constraints, dependencies and non-goals. It may state a phasing hypothesis when Product
needs to bound learning or release sequencing.

Keep scope solution-light:

- Product may say “allow account admins to recover access without support intervention.”
- Product must not prescribe database schema, module boundaries, framework, queue topology, API
  implementation, detailed screen layout, test cases, or deployment design.

Treat unvalidated implementation-shaped scope as a hypothesis, not hidden Architecture/Design/BA
truth. Downstream owners elaborate only after Product intent is authorized for the exact revision.

## 7. Priority under uncertainty

Priority rationale may consider:

- expected user/business value;
- evidence confidence and transferability;
- urgency/time sensitivity when real;
- strategic alignment;
- learning/delivery cost when available;
- risk/reversibility;
- opportunity cost.

Do **not invent weights**, reach, impact, confidence, effort, market size, or other inputs to make a
RICE/ICE/value-effort score complete. A framework can support the decision only when its inputs and
weighting are supplied or defensibly derived.

Preserve ranges/unknowns and perform a **sensitivity** check when uncertain inputs could change the
ordering:

```text
Current priority rationale
-> uncertain input / weight
-> plausible range or qualitative alternative
-> whether the decision changes
-> evidence/owner needed if the uncertainty is decision-critical
```

If two opportunities swap order under plausible assumptions, state conditional/tied priority
rather than presenting a fixed score as Product truth. Opportunity cost remains explicit: what is
not being advanced or what remains uncommitted.

## 8. Decision and failure semantics

A Product Definition can be complete as a recommendation while authorization remains pending.

Block or downgrade the result when:

- the source Opportunity revision is stale or materially changed and not revalidated;
- a key metric has no defensible outcome link;
- required baseline/target basis is invented or unsupported;
- a material guardrail is omitted to make success easier;
- priority depends on guessed weights/inputs presented as fact;
- scope silently contains downstream Design/Architecture/Engineering/BA/QA decisions;
- experiment execution is required but no canonical owner exists.

READY means the Product definition is internally coherent and evidence-bounded. It does not imply
statistical validation, downstream implementation readiness, release readiness, or authorization
unless the named Product owner explicitly approves the exact artifact revision.
