# Workflow Result Contract

Use this reference immediately before reporting workflow completion or handing work to another owner.

**Canonical maintainer source:** Truthful Completion (canonical source only)
**Machine control schema:** [Workflow Control Result](../../../architecture/runtime/workflow-control-result.schema.json)

## Three separate output concerns

Do not collapse these layers:

1. **Control result** — machine-facing completion semantics: workflow state, canonical owner/workflow identity, evidence profile and status, blockers, revision binding when relevant, and optional next-owner routing metadata.
2. **Domain output** — the skill-specific artifact, decision, analysis, evidence, or action result. Its required semantics belong to the owning skill and domain references.
3. **User-facing presentation** — the format best suited to the user's request and current context: prose, Markdown, table, code, diagram, file, provider fields, or another appropriate representation.

The JSON control schema is available for validators, evals, automation, persisted handoff, or an explicitly requested structured response. It is **not a mandatory user-facing output format**. Do not print JSON, a fixed footer, or a global Markdown template merely so internal controls can parse the response.

The host may not provide a hidden structured-output channel. In that case, maintain the control semantics during reasoning and materialize a control record only when a machine consumer, persisted handoff, audit, or explicit user request needs it. Never claim a hidden side channel exists when it does not.

## Composition, routing metadata, and handoff are different

Keep continuation mechanics proportional to the real boundary:

- **Supporting composition** — a supporting Skill executes a bounded sub-capability and returns its result/evidence to the still-active primary owner. Primary ownership does not change, and no handoff artifact is created merely because another Skill was invoked.
- **Next-owner routing metadata** — `next.owner_skill` / `next.workflow` may name the likely next canonical owner after the current workflow closes. Naming that owner neither grants authority nor requires a persisted handoff artifact.
- **Handoff artifact** — create durable/inline continuation state only when another owner, session, agent/runtime, or required persistence boundary cannot safely continue from canonical sources plus the ordinary result. Use `/handoff` when that continuation artifact is itself the requested/required capability.

Do not serialize a full handoff for every supporting call or every `next` field. If the same execution retains the primary owner, prefer bounded return. If a later owner can retrieve canonical artifacts directly and only needs route metadata, prefer the control result.

## One truthful workflow state

Every workflow execution has exactly one state:

- `READY` — the declared scope exists, required checks and evidence were inspected, no blocking contradiction remains, side effects are truthful, and the next consumer can proceed.
- `PARTIAL` — meaningful work exists, but a required check, environment, source, decision, or portion of scope remains unresolved.
- `BLOCKED` — progress cannot safely continue without a dependency, authority, source, environment, or decision owned elsewhere.
- `FAILED` — the attempted workflow or deliverable did not meet its contract, including a partially successful external write when the operation contract does not define a safe partial result.

Do not convert `FAILED`, `BLOCKED`, `NOT_RUN`, or `INCONCLUSIVE` into a more positive state for presentation.

## Keep state axes separate

Workflow state does not replace:

- artifact maturity such as `DRAFT`, `APPROVED`, `VERIFIED`, or `RELEASED`;
- evidence/verification status such as `NOT_RUN`, `PASS`, `DIRECTIONAL_PASS`, `FAIL`, or `INCONCLUSIVE`;
- evidence profile such as `SANDBOX_OBSERVED`, `SANDBOX_PROCEDURAL_COMPARISON`, `RISK_SPECIFIC_ASSURANCE`, or `ATTESTED_INDEPENDENT`;
- UAT acceptance such as `PENDING`, `ACCEPTED`, or `REJECTED`;
- release readiness such as `NOT_READY` or `READY_FOR_RELEASE`.

An evidence **profile** names how evidence must be produced or assured. An evidence **status** records what happened on that axis. `Evidence profile: NOT_RUN` is invalid because it confuses method with state.

Treat **workflow control evidence** as evidence that the owning workflow executed and validated its own required contract: required checks ran, required provenance/bindings were inspectable, side effects were truthful, and the domain result was derived under the owner's rules. It is not the quality/status verdict of the domain subject itself. A workflow can therefore complete successfully and establish a negative domain result. Do not serialize a domain verdict such as QA `FAIL`, UAT `REJECTED`, or release `NOT_READY` into control evidence merely to fit the shared schema.

Examples:

| Specialized observation | Workflow state |
|---|---|
| Required runtime evaluation was not run but the static artifact is useful | `PARTIAL` |
| Required QA workflow probe/environment/provenance is missing or inconclusive | `PARTIAL` or `BLOCKED`; preserve the QA domain verdict as `NOT_RUN`/`INCONCLUSIVE` according to its owner contract |
| QA workflow completes all required verification and proves a candidate defect | Workflow may be `READY`; domain QA verdict remains `FAIL`; acceptance remains not ready |
| UAT is `PENDING` because the approver is unavailable | `BLOCKED` |
| Release gate is `READY_FOR_RELEASE` but deployment authority was not requested | Gate workflow may be `READY`; deployment remains `NOT_RUN` |
| External write partially succeeded without a safe partial-result contract | `FAILED` |

## Control result invariants

When a control record is materialized:

- `owner.skill` is an active promoted skill and `owner.workflow` is exactly `/<owner.skill>`.
- `next.owner_skill` and `next.workflow`, when present, use the same canonical identifiers.
- `PARTIAL`, `BLOCKED`, and `FAILED` include an explicit blocker or failure reason.
- A required workflow-execution/control evidence axis with `FAIL`, `NOT_RUN`, or `INCONCLUSIVE` cannot support workflow `READY`. A negative domain verdict does not violate this invariant when the workflow's own required execution/provenance evidence passed and the negative result was derived truthfully.
- Do not serialize a domain verdict into control evidence merely to fit the shared schema; keep QA/UAT/release or other domain states in the owning domain artifact.
- `evidence.profile` and `evidence.status` are separate fields.
- Revision binding is recorded on evidence whose validity depends on exact source/model/runtime bytes.
- Control records do not own domain artifact shape and do not authorize a downstream owner merely by naming it.

## Domain output contract

Each skill defines the semantics of the artifact or decision it owns. Examples:

- `user-story` owns actor, capability, benefit, scope, traceability, and routing to acceptance criteria.
- `verify-quality` owns fixed-point verification evidence, unverified conditions, failure truth, and the QA verdict it is authorized to make.
- `visual-capture` owns capture/evidence provenance and capture-specific result semantics.

Do not move those domain requirements into the shared control schema. A global control protocol must not flatten distinct SDLC artifacts into one generic JSON object.

## User-facing presentation

Render the domain result for the user, not for the validator. Respect an explicitly requested format; otherwise use the clearest domain-appropriate representation. Mention state, blocker, evidence gap, or next owner naturally when they materially affect the user's next action, but do not force a universal result section.

If a downstream machine consumer needs structured control metadata, materialize the control record separately from the user-facing artifact when the host supports files/artifacts, or provide the structured representation only when requested by that consumer.
