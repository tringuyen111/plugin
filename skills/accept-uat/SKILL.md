---
name: accept-uat
description: Orchestrate user acceptance testing for a fixed candidate and record the authorized Product or business owner's decision. Use when fixed-scope QA evidence exists under the project's declared separation policy and approved business scenarios must be accepted, conditionally accepted, rejected, waived, or left pending before release planning.
---

# Accept UAT
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->


Coordinate business acceptance for one fixed scope and candidate. The agent may
prepare scenarios, present evidence, record observed results, and write the
approver's decision. It must not infer acceptance, act as an unnamed business
owner, implement fixes, or authorize deployment.

Read [UAT-RECORD.md](UAT-RECORD.md). Use `/uat-scenario` to define business
scenarios and consume `/verify-quality` and `/verify-visual` reports as evidence.

## Preconditions

Resolve:

- canonical Product scope, Stories, Use Cases, AC, Rules, NFRs, and non-goals;
- fixed candidate version/build/environment;
- a UAT record artifact/versioning mechanism capable of exposing an exact record revision, digest, or equivalent immutable identity for downstream release handoff; if the current environment cannot provide one, do not fabricate persisted identity;
- fixed-scope QA evidence package with exact QA report revision/digest or equivalent immutable identity, QA report candidate/build, evidence cutoff, QA-reported fixed-point validity/invalidation triggers, **QA workflow state**, **QA verification verdict**, **acceptance readiness**, evidence provenance, declared separation mode, and open defects/gaps;
- authorized Product/business approver and their scope of authority;
- representative business data and operational context;
- known conditions, waivers, and release exclusions.

Developer tests or code review alone are not sufficient UAT evidence. **Do not infer QA quality from workflow state.** Treat the QA producer's control state (`READY | PARTIAL | BLOCKED | FAILED`), QA verification verdict (`PASS | FAIL | INCONCLUSIVE | NOT_RUN`), and acceptance readiness as separate axes. A QA workflow may be `READY` with QA verdict `FAIL`: that means verification completed truthfully and found a failure, not that the candidate is acceptable. Conversely, `PARTIAL`/`BLOCKED`/`FAILED` describe incomplete/blocked/failed QA execution and must not be translated into a quality verdict the QA report did not issue.

Present the actual QA verdict, unrun/inconclusive conditions, evidence gaps, and acceptance-readiness state to the authorized UAT owner. The owner may postpone, reject, or explicitly accept a documented business risk within their authority, but UAT does not rewrite QA evidence to `PASS`. Do not hide missing or failed evidence.

Treat QA separation/provenance as consumed QA evidence, not as a Product decision that UAT may strengthen. Do not infer independent QA from workflow `READY`, from a different declared executor, or from a UAT decision. If the QA separation requirement, actual mode, executor/provenance, or attestation status is missing or contradictory, preserve that as an explicit QA evidence gap. Only the authorized owner of the separation policy may change or waive that requirement; Product/business acceptance does not rewrite the provenance supplied by QA.

## QA evidence package admission

When consuming a persisted QA report, bind its exact report revision, digest, or equivalent immutable artifact identity; a logical report ID is insufficient. Bind the QA report candidate/build to the fixed UAT candidate, record the QA evidence cutoff, and consume the fixed-point validity plus invalidation triggers **as reported by `/verify-quality`**. Also preserve the QA report's supporting-contract admission summary and limitations. Do not independently recalculate Test Strategy, Test Condition, or Defect Report freshness in UAT; `/test-strategy`, `/test-condition`, and `/defect-report` remain supporting owners behind `/verify-quality`.

If the QA report identity is missing, treat the report as `UNVERIFIED` for UAT evidence admission. If the report candidate/build mismatches the UAT candidate, a reported invalidation trigger is known to have fired, fixed-point validity is not current, or report identity/validity is internally contradictory, the report is not current UAT evidence. Preserve conflicting facts rather than choosing one. Keep the consumed QA workflow state, QA verification verdict, acceptance readiness, and provenance as historical QA truth, but the old acceptance readiness is not current authority for the UAT decision. Route QA re-verification through `/verify-quality`; until current QA evidence is re-admitted, keep UAT `PENDING` and the workflow `PARTIAL` or `BLOCKED` as appropriate rather than recording current acceptance from stale evidence.

A material QA report revision after the UAT evidence package is assembled invalidates that package for current acceptance. Preserve any prior UAT decision as historical decision evidence; re-admit the changed QA report and have the authorized approver confirm whether the decision still applies before producing a current release handoff. Do not rewrite the older QA report or UAT record in place to manufacture continuity.

## UAT decision artifact fixed point

For any UAT decision handed to Release, bind the exact UAT record revision, digest, or equivalent immutable identity. A logical UAT record ID, approver name, decision label, or decision date alone is insufficient to establish which acceptance artifact the downstream gate consumed.

The UAT decision fixed point binds the exact record identity to the candidate/build/environment, accepted Product scope, exact admitted QA report revision/digest and evidence cutoff, authorized approver and decision, and the conditions/waivers whose applicability is part of that decision. Record UAT fixed-point validity as `CURRENT | STALE | UNVERIFIED | CONFLICTING` (or a semantically equivalent state) plus the invalidation triggers that would make the acceptance artifact non-current.

A candidate/build change, material target-environment change, material accepted-scope change, material admitted-QA-report revision or reported QA invalidation, or an acceptance condition/waiver that expires or materially changes makes the prior UAT record `STALE` for current release handoff. A contradictory record identity or fixed-point claim is `CONFLICTING`; a logical ID without exact revision/digest/immutable identity is `UNVERIFIED`. Unrelated metadata edits do not invalidate the UAT decision unless the fixed-point meaning changed.

Preserve an invalidated or superseded UAT decision as historical decision evidence. Do not rewrite the old UAT record to look current. When current acceptance is still intended after an invalidation, re-admit the changed QA evidence when relevant, have the authorized approver reconfirm whether the decision still applies, and finalize a new exact UAT record revision rather than silently carrying forward the old one.

A current Release handoff requires the exact UAT record identity, candidate/environment match, `CURRENT` fixed-point validity, and an authorized decision whose conditions/waivers are still applicable. If the host cannot establish an immutable UAT record identity, preserve the business decision and the limitation truthfully but treat the release handoff as unverified/partial rather than inventing persistence. Current UAT acceptance makes the candidate eligible for release **assessment** only; it does not grant release eligibility or deployment authority.

## Process

1. **Freeze acceptance scope.** Record candidate, environment, included and
   excluded Product scope, exact source artifacts, the consumed QA report exact revision/digest or equivalent immutable identity, and the UAT record artifact plus the revision/digest mechanism that will bind the finalized decision. Do not claim an exact UAT record revision before the decision artifact is actually finalized.
2. **Prepare business scenarios.** Use `/uat-scenario` to cover representative
   actor goals, main and critical alternate/error flows, business rules,
   permissions, data, and operational consequences. Do not turn UAT into a copy
   of every QA test.
3. **Assemble and admit the evidence package.** Link QA reports, defects, visual evidence,
   known limitations, and accepted waivers. For the QA report record candidate/build, evidence cutoff, QA-reported fixed-point validity and invalidation triggers, plus the supporting-contract admission summary. If report identity/validity is stale, unverified, or conflicting, route `/verify-quality` for re-verification instead of treating readiness as current. Record QA workflow state, QA verification verdict,
   acceptance readiness, executed/unrun evidence, the QA separation requirement/policy, actual
   separation mode, QA executor relation/provenance, and independence/attestation status separately;
   never derive one axis or provenance claim from another.
4. **Run or witness scenarios.** The authorized user/business representative
   performs or reviews observable business outcomes in the fixed candidate.
   Record actual results and evidence without rewriting expectations.
5. **Present the decision explicitly.** Only after the current QA report has been admitted for the fixed candidate, ask the named approver to choose:
   `PENDING`, `ACCEPTED`, `ACCEPTED_WITH_CONDITIONS`, `REJECTED`, or `WAIVED`.
   Never choose the state from silence, from a QA PASS, or from stale/unverified QA readiness. After decision/conditions are fixed, finalize the exact UAT record revision/digest or equivalent immutable identity and evaluate its UAT fixed-point validity.
6. **Record conditions and authority.** For conditions/waivers record owner,
   reason, risk, deadline/review point, affected artifacts, and whether
   reverification is required.
7. **Update traceability with approval.** Preview external tracker or document
   changes, then link `UAT_ACCEPTS_SCOPE` or the rejection/condition against the
   canonical artifacts. Do not create a second task-status truth.
8. **Hand off to Release.** Hand off the exact current UAT record revision/digest or equivalent immutable identity, its fixed candidate/environment, current UAT fixed-point validity/invalidation summary, decision authority, and applicable conditions/waivers. If the record is stale, unverified, conflicting, mismatched, or cannot be given an exact identity, keep the release handoff non-current and route the relevant re-admission/reconfirmation instead of passing a logical `ACCEPTED` label downstream. Acceptance makes the candidate eligible for release assessment only; it does not prove deployment, rollback, monitoring, environment readiness, release eligibility, or deployment authority.

## Completion

- `PENDING` — package/scenarios exist but no authorized decision is recorded.
- `ACCEPTED` — named approver accepts the fixed scope with no unresolved
  condition inside their authority.
- `ACCEPTED_WITH_CONDITIONS` — named approver accepts with explicit conditions,
  risks, owners, and review points.
- `REJECTED` — named approver rejects and records failed scenarios/reasons.
- `WAIVED` — an authorized owner explicitly waives a criterion or risk with
  scope and rationale.

The workflow result is `READY` for a current release handoff only when the chosen decision is recorded with approver, scope, candidate, environment, scenarios, evidence, conditions, limitations, the exact QA report revision/digest, QA-reported fixed-point validity is current for the meaning consumed, consumed QA separation/provenance truth when required, traceability, and the exact UAT record revision/digest or equivalent immutable identity whose UAT fixed-point validity is `CURRENT`. A prepared package without a decision, one whose QA report is stale/unverified/conflicting, or a UAT record that is stale/unverified/conflicting or lacks exact identity for the fixed candidate is truthfully `PARTIAL` or `BLOCKED` for current release handoff. A business decision already made may remain historical decision truth; non-current artifact identity must not be rewritten into current release authority.
