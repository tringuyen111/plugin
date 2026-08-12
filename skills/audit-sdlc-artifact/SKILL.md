---
name: audit-sdlc-artifact
description: Audit a reusable skill, reference, adapter, route, script, or domain pack for invocation, context, depth, ownership, composition, portability, safety, evaluation, maintainability, and lifecycle fitness.
---

# Audit SDLC Artifact
<!-- runtime-context:start -->
## Runtime context

- **Before returning a workflow or lifecycle result:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) and preserve missing evidence, approval, or execution as PARTIAL/BLOCKED.
- **Before changing ownership or an active discovery surface:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) and keep proposal, evaluation, and promotion decisions distinct.
- **When the request originated in project delivery:** read [Capability-Gap Handoff](../../resources/shared/references/capability-gap-handoff.md) and preserve project truth rather than embedding customer policy in the reusable system.
- **Before repository, provider, publication, or destructive actions:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) and verify authority.

- **When a material capability or lifecycle claim is asserted or disputed:** read [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md) and seek counter-evidence before changing factual status.
- **When maintaining this checked-out repository:** read [Repository Execution Map](../../resources/system/references/REPOSITORY-EXECUTION-MAP.md) to select canonical probes, evidence locations, and the standard versus advanced-assurance path.
- **Before assigning or validating an assurance tier:** read [Sandbox-Native Evaluation Policy](../../resources/system/references/SANDBOX-EVALUATION-POLICY.md), derive the minimum tier from its canonical source-backed factors, and do not reconstruct the model from memory when the policy is unavailable.
- **When auditing replacement, deprecation, versioning, migration, or retained legacy surfaces:** read [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md) to identify sediment, duplicate active truth, unsupported coexistence, and incomplete removal.
<!-- runtime-context:end -->

## Claim challenge gate

Apply the Claim Challenge Contract to each load-bearing capability, readiness, safety, portability, and evidence claim. Freeze a preliminary verdict before asking the author questions, inspect both supporting evidence and counter-evidence, and state what new evidence would change the verdict. Do not soften a factual finding because the author or user repeats the claim.


Read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`, `../../resources/system/references/SKILL-CREATION-STANDARD.md`, `../../resources/system/references/SKILL-AUTHORING-HEURISTICS.md`, and the artifact-type standard relevant to the target. Read `../../resources/system/references/SKILL-AUTHORING-GLOSSARY.md` when invocation, context load, disclosure, pruning, or failure-mode terminology affects the verdict.

Audit the context and behavioral capability, not merely whether Markdown parses or helper code runs.

<one_artifact_gate>
Portfolio inventory may enumerate, prioritize, and identify overlap candidates only. Inventory-level evidence never grants a final per-artifact disposition. Exactly one artifact subject is open for deep disposition at a time. Close that artifact audit record before opening the next artifact for final disposition. Perform cross-artifact overlap/topology review only after the relevant individual records are closed; it may reopen a record with new evidence but may not replace deep audit.
</one_artifact_gate>

## 1. Establish claim and boundary

Read the proposal, source body, bundled references/scripts, manifest/routes, neighboring artifacts, evals, and package surfaces. For a repository-wide audit, use the inventory command in the Repository Execution Map as a discovery aid, then verify material findings from the skill source itself. State:

- bounded capability claim and observable improvement over the base agent;
- artifact type and capability type;
- claimed source-designed strength target and observed evidence status;
- canonical owner and non-owners;
- upstream/downstream contracts;
- runtime/provider assumptions;
- lifecycle state and version.

Do not silently repair or reinterpret the claim before evaluating it. Step 1 is complete only when the dependency cone needed for the bounded claim is identified and any missing source/neighbor/eval/package surface is explicitly `MISSING`, not silently skipped.

<capability_first_gate>
Before applying common audit dimensions, establish for this artifact:

1. the bounded capability claim;
2. the observable base-agent delta the artifact is supposed to create;
3. the type-specific reasoning/decision/execution mechanism that could earn that delta;
4. capability-specific failure modes and invariants, including what evidence would falsify the claim.

Do not classify a load-bearing claim until it has supporting/counter evidence or is explicitly marked `MISSING`/`NOT_RUN`. Dimensions are lenses, not a template to copy into the target artifact or a substitute for its capability-specific model.
</capability_first_gate>

## Maturation disposition gate

For an existing reusable-system artifact, use the current `SKILL-CREATION-STANDARD.md` self-hosted capability-maturation section to judge whether the artifact's **class and identity still fit the capability actually observed**. This is part of the current artifact audit, not a portfolio shortcut.

After establishing the bounded capability/falsifier and inspecting the current artifact plus only the neighboring context needed for ownership/composition, choose one evidence-backed disposition for the audited artifact:

```text
KEEP | REVISE | MERGE | RECLASSIFY | DEPRECATE | REMOVE
```

- Prefer `REVISE` when ownership/class are correct and the gap is depth, context, steering, completion, or another bounded weakness.
- Use `RECLASSIFY` only when the current artifact class no longer matches the real mechanism. A reference/branch-to-Skill recommendation must satisfy the Skill-worthiness and granularity/materiality gates; length, domain importance, or repeated failure alone is insufficient.
- Treat split/extraction as a topology proposal whose resulting candidates require independent audit/creation/lifecycle gates; do not grant several new Skills from one source audit.
- Use `MERGE`, `DEPRECATE`, or `REMOVE` only with inspectable ownership/consumer/replacement evidence appropriate to the claim. Audit recommends the disposition; it does not perform active cutover, removal, promotion, or discovery mutation.
- Evidence about a weak neighbor may open a shallow candidate gap, but it MUST NOT manufacture that neighbor's final disposition while another artifact is ACTIVE.

Record the root-cause class and evidence that made this disposition smaller/better than the alternatives. If evidence is insufficient to distinguish material alternatives, keep the disposition unresolved/`PARTIAL`; do not choose by preference.

## 2. Audit dimensions

Judge qualitatively with evidence:

```text
INVOCATION      predictable | ambiguous
CONTEXT         sufficient | bloated | unreachable | missing
DEPTH           expert | procedural | checklist wrapper
OWNERSHIP       clear | overlapping | self-approving
COMPOSITION     compatible | duplicative | dead-end
PORTABILITY     portable | provider/runtime-bound
SAFETY          explicit | hidden side effects
DESIGN_STRENGTH S0 | S1 | S2 | S3 | S4
EVALUATION      structural-only | capability-specific | demonstrated | NOT_RUN | weak coverage
OUTPUT_CONTRACT control/domain/presentation separated | mixed | missing
MAINTAINABILITY single truth | duplicate meaning | sediment
STEERING        instruction salience/gates/context pointers/completion/sequence leakage/control-boundary enforcement | simple/not material
```

Line count, code presence, test count, or polished prose are not quality proxies.

## 3. Inspect common failure modes

Search for:

- description/body claim mismatch;
- trigger overlap and unavailable router reach;
- context only present in maintainer docs;
- duplicate meaning across body/reference/route/catalog;
- provider names embedded in domain logic;
- project policy masquerading as reusable guidance;
- one-tool-call wrappers;
- checklist depth without decision variables or correction loops;
- unconditional context bloat;
- hidden writes, commit, deploy, delete, communication, or retention;
- no-op workflows that restate the prompt;
- weak instruction salience where a load-bearing rule exists but is easy to bypass;
- missing hard gate/positive steering at high-consequence execution boundaries;
- sequence leakage or post-completion pull that lets the agent continue into another owner before the current step truly closes;
- control metadata forced into user-facing JSON/Markdown when the domain or user did not require that presentation;
- domain output semantics omitted because a generic control envelope was mistaken for the artifact contract;
- premature READY from draft, acknowledgement, developer self-test, or unavailable evidence;
- deprecated or superseded sediment still active.
- old/new/v2 siblings without named current consumers or supported coexistence;
- obsolete tests, fixtures, docs, routes, context pointers, or package entries that preserve a removed contract;
- migration history retained only because the environment was never classified, or squashed despite a released upgrade obligation.

## 4. Compare claim with context

For each material claim, cite the exact source section and determine whether an agent receives enough context to act. Mark architecture knowledge that exists only outside reachable runtime context. For control-heavy skills, separately test whether the important instruction is salient and checkable enough to steer behavior; conceptual correctness does not substitute for steering evidence.

When source guidance is strong but behavioral output is absent, record `NOT_RUN` rather than converting source quality into observed strength. Generated structural guards cover trigger, ownership, completion, and unavailable-tool contracts only; inspect capability-specific cases before claiming the skill changes decisions or artifacts.

## 5. Review composition and package impact

Check canonical ownership, neighbor-skill conflict, router/manifest impact, context-load cost, provider abstraction, backward compatibility, migration, and deprecation obligations.

## 6. Assign or validate assurance tier

Before an audit verdict assigns or validates an assurance tier, load the canonical Sandbox-Native Evaluation Policy. Derive applicable assurance factors only from inspected source, ownership, side-effect, routing, decision-authority, and blast-radius facts for the current artifact. Use the policy to compute the minimum required tier; when several factors apply, the highest required minimum controls.

An audit may raise the final tier above the canonical minimum only when a source-specific blast-radius reason is inspectable. It must never assign below the canonical minimum because the candidate prefers a lower tier, behavioral evidence is missing, or a cheaper evidence path is desired. If the policy is missing or unreachable, keep tier assignment non-ready and report the dependency instead of guessing.

Record the assigning workflow, source-backed factors, derived minimum tier, final tier, and any upward-escalation reason. Keep assurance tier separate from evidence profile and evaluation status: `NOT_RUN`, `FAIL`, or `INCONCLUSIVE` remain evidence truth and never lower the tier. Audit may assign or recommend assurance and disposition; lifecycle promotion, publication, and active mutation remain outside this workflow.

## 7. Findings register

Each finding contains:

```markdown
## Finding
Severity:
Evidence:
Actual consequence:
Root cause:
Canonical owner:
Affected surfaces:
Recommendation:
Acceptance evidence:
```

Separate missing skill capability from missing shared knowledge, integration, deterministic support, project configuration, or evaluation.

## Domain output semantics

An audit verdict is for one artifact subject and must preserve: lifecycle recommendation; **maturation disposition (`KEEP | REVISE | MERGE | RECLASSIFY | DEPRECATE | REMOVE`) with root-cause/evidence basis**; bounded capability claim and boundary; source-designed strength versus observed evidence; structural versus capability-specific coverage; dimension verdicts including STEERING when material; findings; capability/overlap gaps; assurance assignment (assigning workflow, source-backed factors, derived minimum tier, final tier, and escalation reason when used); evaluation status; package/migration impact; required revisions; and the next lifecycle owner. Portfolio summaries may aggregate closed records but must not manufacture dispositions or assurance decisions for unaudited artifacts.

Use the shared Workflow Result Contract for machine-facing state/evidence/blocker/handoff metadata. Render findings in the form most useful for the audit request rather than a mandatory global report layout. An audit may be `READY` for review while behavioral execution is `NOT_RUN`. `ASSURED` promotion remains blocked until `/qualify-sdlc-capability` satisfies the required evidence. A maintainer-selected `SKILL_CREATOR_VALIDATED` profile may instead promote an eligible prompt-only OpenAI Skill after exact-byte Skill Creator/package and structural gates; behavioral `NOT_RUN` must remain visible and must not be presented as demonstrated competence.
