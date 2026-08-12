# Skill Design Dossier

Use this reference when opening, resuming, consolidating, or approving a Skill design.
The dossier is the current design truth before provider-specific runtime files exist.

## One living dossier

Maintain one current Markdown dossier for one candidate Skill/revision. Consolidate meaning
instead of appending a raw interview transcript. Reopening updates the same dossier; do not
create `draft`, `final`, `v2`, `new`, or parallel active copies just to represent workflow
state.

Use these epistemic states where authority could be confused:

- **OBSERVED** — directly supplied by the user or inspectable source/evidence.
- **PROPOSED** — a design choice awaiting an authorized decision.
- **DECIDED** — explicitly accepted within this dossier.
- **UNRESOLVED** — missing, conflicting, deferred, or awaiting evidence/authority.

Use stable `DEC-n` and `OQ-n` references for material decisions/open questions. Never
renumber or reuse an ID. If a later decision supersedes an earlier one, record the new
reference and keep only the replacement as current truth.

## Design states

```text
EXPLORING
  -> understand job, user, scenario, failure and desired delta
SHAPING
  -> bounded capability, semantic inputs/outputs, non-goals and success meaning
CLASSIFYING
  -> Skill vs reference/template/tool/adapter/route/project artifact
POSITIONING
  -> ecosystem position, canonical owner and neighbor boundaries
PORTABILITY_DESIGN
  -> provider-neutral invariants vs provider/runtime mechanics
DESIGNING
  -> reasoning/workflow/context/correction/failure/completion behavior
CHALLENGING
  -> no-op risk, overlap, trigger collision, stale/missing context and failure paths
READY_FOR_DRAFT
  -> hard gates pass, blocking OQs = 0, explicit owner approval
DRAFTING
  -> freeze cases first, then materialize selected provider projection(s)
QUALIFICATION_PENDING
  -> fixed draft exists; behavioral evidence remains a separate axis
REOPENED
  -> new evidence/decision returns the same dossier to an earlier state
```

No design state implies promotion, publication, or behavioral PASS.

## Semantic sections

Keep at least these meanings in the dossier; headings may be adapted to the audience:

1. **Identity and state** — candidate name/slug, mode, source/revision, current design state.
2. **Origin and problem** — target job, user, scenario, current failure, source/evidence.
3. **Skill-worthiness** — reusable job, behavioral delta, mechanism, owned boundary, simpler
   artifact comparison, falsifiable failure, classification result.
4. **Capability boundary** — bounded claim, semantic inputs/outputs/decisions/actions,
   success meaning and explicit non-goals.
5. **Ecosystem and ownership** — SDLC/standalone position, canonical owner/non-owners,
   neighbors, handoffs, approvals.
6. **Capability mechanism** — decision model/workflow/consistency contract/tool
   orchestration/correction loop that earns the intended delta.
7. **Context and invocation** — source authority, required/optional context,
   missing/conflicting/stale handling, invocation/discovery, neighbor non-trigger cases,
   progressive disclosure.
8. **Provider/runtime projection** — portable-core status, provider target(s), separate
   runtime/host projections, required primitives, provider-specific mechanics and evidence.
9. **Failure/correction/completion** — critical failure modes, safe recovery/revision,
   stop/block/completion conditions and side-effect truth.
10. **Evaluation** — critical invariants, positive/near-miss/context/owner/provider cases,
    comparison intent and revision binding.
11. **Decisions/open questions** — stable `DEC-n`, `OQ-n`, blockers and supersession.
12. **Approval/change history** — approval identity/date, material changes, reopen events.

## Owner-decision economy

Ask only for decisions that materially change capability intent, canonical ownership,
ecosystem position, provider target, protected side effects, or another irreversible/high-cost
trade-off. Infer reversible implementation details when evidence supports one safe choice and
record them as current design. Re-open owner discussion when evidence creates a materially
new product decision; do not ask for repeated approval of routine file layout, reference
splits, helper scripts, or validator commands after the design direction is accepted.

## Approval gate

The dossier may enter `READY_FOR_DRAFT` only when all are true:

- the Skill-worthiness gate passes and classification is `Skill`;
- bounded capability/non-goals/base-agent delta are clear;
- canonical ownership/ecosystem position and material neighbor boundaries are resolved;
- the capability mechanism is more than a generic checklist/no-op;
- semantic inputs/outputs/context/failure/completion are defined;
- at least one provider/runtime projection target is explicit;
- capability-specific evaluation intent exists;
- blocking open questions = 0;
- an authorized owner explicitly approves the dossier.

Approval authorizes the accepted drafting scope only. It does not authorize promotion,
publication, deployment, external provider writes, or another side effect not already
permitted by the active project policy.
