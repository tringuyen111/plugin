---
name: create-skill
description: Discover, shape, design, and materialize one reusable Skill from a raw idea, capability gap, audit finding, existing Skill revision, or prompt/procedure candidate. Use when deciding whether something should become a Skill, whether it belongs inside or outside SDLC Intelligence, how its capability should differ from the base agent, and how a provider-neutral design should project to supported runtimes. Maintain one living Skill Design Dossier, reject weaker artifact types, require approval before drafting, and materialize only verified provider projections.
---

# Create Skill — Discover, Design, Materialize

Turn one candidate capability into either a defensible Skill design or the correct smaller
artifact. Do not behave like an immediate `SKILL.md` generator. First understand the job,
prove that a Skill is warranted, design its behavioral mechanism and ownership, position it
inside or outside SDLC Intelligence, separate provider-neutral semantics from provider/runtime
mechanics, obtain explicit dossier approval, freeze cases, and only then materialize the
selected provider projection.

## Runtime context

- Before returning workflow/lifecycle state, read
  [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md).
- Before changing ownership or an active discovery surface, read
  [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md).
- Before repository/provider/publication/destructive actions, read
  [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md).
- When a load-bearing capability/readiness claim is asserted or disputed, read
  [Claim Challenge Contract](../../resources/shared/references/claim-challenge-contract.md).
- When revising/replacing an existing active artifact, read
  [Single Active Truth and Replacement Discipline](../../resources/shared/references/single-active-truth-contract.md).
- When maintaining the checked-out SDLC Intelligence repository, read
  [Repository Execution Map](../../resources/system/references/REPOSITORY-EXECUTION-MAP.md).
- In SDLC mode, read `../../resources/system/references/CORE-CONTRACT-DEPENDENCY.md`,
  `../../resources/system/references/SKILL-CREATION-STANDARD.md`, `../../resources/system/references/SKILL-LIFECYCLE.md`, and
  `../../resources/system/references/SKILL-AUTHORING-HEURISTICS.md`. Read the glossary only when its terminology
  affects a decision.
- Read `references/skill-design-dossier.md` when opening/resuming/consolidating the living
  dossier or applying the approval gate.
- Read `references/provider-projection.md` when provider/runtime portability or materialization
  is material.

## 1. One living Skill Design Dossier

Maintain exactly one current Markdown dossier for one candidate Skill/revision from discovery
through approval and later reopen. Consolidate meaning rather than storing a chat transcript.
Use `OBSERVED`, `PROPOSED`, `DECIDED`, and `UNRESOLVED` where authority might be confused.
Use stable `DEC-n`/`OQ-n` references for material choices and unresolved questions.

Do not create runtime Skill files before the dossier reaches `READY_FOR_DRAFT`. Reopening a
previously approved design updates the same dossier and returns it to the earliest affected
design state; do not create `v2`, `new`, `next`, or parallel active design truth merely to
avoid revising the canonical artifact.

### Design states

```text
EXPLORING -> SHAPING -> CLASSIFYING -> POSITIONING -> PORTABILITY_DESIGN
-> DESIGNING -> CHALLENGING -> READY_FOR_DRAFT -> DRAFTING
-> QUALIFICATION_PENDING
```

`REOPENED` may return the dossier to any earlier state when new evidence or an authorized
decision invalidates current design truth. Design state is not lifecycle promotion state.

## 2. Resolve the entry branch and mode

MVP entry branches:

- raw Skill idea;
- demonstrated capability gap/handoff;
- audit finding;
- existing Skill revision;
- existing prompt/procedure/reference that may deserve promotion into a Skill.

Treat provider-to-provider porting of an already provider-specific package as outside this MVP
unless a later accepted revision adds that branch.

Resolve execution mode without unnecessary questioning:

```text
explicit user choice
-> existing dossier/Skill identity
-> inspectable SDLC Intelligence workspace/context
-> declared target ecosystem
-> GENERAL by default
```

Use **SDLC mode** for SDLC-internal/supporting artifacts and in-repo revisions. Add exact
revision binding, canonical owners/neighbors, route/context-map impact, single-active-truth,
assurance/evidence implications and System-owner handoffs.

Use **GENERAL mode** for standalone/non-SDLC Skill design. Apply the same capability,
portability, failure and evaluation discipline without forcing SDLC routes/lifecycle concepts
into the artifact.

Ask the user only when the mode remains materially ambiguous after inspecting available
context.

## 3. Explore and shape before classifying

Before deciding the artifact type, establish only the missing material facts:

- target user/job and triggering situation;
- current failure/weakness and why it matters;
- semantic input(s), output/decision/action and success meaning;
- observable behavioral difference from the base agent;
- important non-goals and forbidden ownership;
- available source/evidence and material uncertainty.

Ask in small batches. Do not re-ask facts already present in the source/dossier. Pressure a
vague answer once when exactness changes the design; if it remains vague, keep it `UNRESOLVED`
instead of fabricating precision.

### Owner-decision economy

Ask an authorized owner only for choices that materially change capability intent, canonical
ownership, ecosystem position, provider target, protected side effects, or another
irreversible/high-cost trade-off. Once that direction is approved, complete reversible design,
case freeze, implementation, validation and evidence autonomously. Re-open owner discussion
only when new evidence creates a materially different product decision or additional authority
is required.

## 4. Apply the Skill-worthiness hard gate

Do not create a Skill unless the candidate satisfies all six dimensions at the level
appropriate to its capability type:

1. **Reusable job** — a recurring capability/work pattern exists.
2. **Observable behavioral delta** — the Skill should change decisions/execution/artifacts in
   a way that can be distinguished from the base agent.
3. **Distinct mechanism** — a reasoning model, workflow, consistency contract, deterministic
   support, tool orchestration, correction loop, or other non-no-op mechanism can plausibly
   earn that delta.
4. **Owned boundary** — semantic inputs/outputs/decisions/actions and non-ownership are bounded.
5. **Simpler artifact insufficiency** — a smaller reference/template/tool/adapter/project
   artifact is not a better solution at lower invocation/context/maintenance cost.
6. **Falsifiable failure** — material incorrect behavior can be described and tested.

If the gate fails, do not "improve" the proposal until it looks like a Skill. Reclassify to
the smallest correct artifact:

- knowledge/context only -> reference;
- reusable presentation/content skeleton -> template;
- exact deterministic transform/validation -> script/tool;
- provider/tool translation -> adapter/integration;
- owner-selection branch -> router route;
- project/customer-specific fact/policy/credential -> target-project artifact/profile;
- coordinated multi-Skill reusable domain -> domain pack;
- no meaningful behavioral delta -> no new artifact.

In SDLC mode, provider translation is owned by `/create-integration` and coordinated domain
packs by `/create-domain-pack`. Hand off instead of authoring those under `create-skill`.

For a reclassified generic reference, template, deterministic script/tool, or route proposal
with no more specific construction owner, `create-skill` may materialize that smaller artifact
after the user-requested/approved construction boundary is satisfied. Keep it explicitly
non-Skill: never generate `SKILL.md`, Skill metadata, or a Skill package merely because the
original request used the word "skill". Route activation still requires the canonical router/
lifecycle authority; drafting a route proposal does not activate it.

## 5. Position the Skill and resolve ownership

For a candidate that passes the hard gate, decide ecosystem position independently from
provider portability:

```text
Ecosystem: SDLC_INTERNAL | SDLC_SUPPORTING | STANDALONE
Core:      PORTABLE_CORE | PROVIDER_SPECIFIC
```

Declare canonical owner, non-owners, upstream/downstream artifacts, neighbor Skills and
material overlap resolution. In SDLC mode, inspect actual routes/context maps and current
neighbors before declaring ownership or a new route need. Do not let a supporting Skill change
another owner's Product/BA/Design/Engineering/QA/UAT/Operations truth.

For an existing Skill revision, bind the dossier to the exact current bytes plus the accepted
audit finding/failure. Update the canonical Skill in place after approval. A parallel version
requires an explicit compatibility/consumer/migration/removal contract; otherwise it is
sediment, not safety.

## 6. Design the capability, not a checklist

Establish a mechanism that can plausibly create the intended delta:

- decision variables and trade-offs for judgment capabilities;
- ordered steps and checkable completion for procedures;
- state/branch/correction loops where decisions can change;
- exact I/O and deterministic support where repetition/fragility warrants scripts;
- tool/capability resolution, side effects and verification for operational Skills;
- context/source authority plus missing/conflicting/stale behavior;
- invocation/discovery semantics and neighbor non-trigger cases;
- domain output semantics distinct from shared control metadata;
- failure, recovery/revision, stop and completion conditions.

Use progressive disclosure: keep universal execution behavior in `SKILL.md`; move branch-
specific depth behind explicit context pointers. Do not optimize by line count, but do remove
no-ops, duplicated meaning and governance text that does not change runtime behavior.

The **dossier is not a runtime prompt template**. Derive runtime structure from the capability
mechanism; do not copy dossier headings into every Skill for symmetry.

## 7. Design provider and runtime/host projections separately

Treat provider and runtime/host as separate axes. A provider-level target never proves every
host surface is supported.

Keep provider-neutral invariants in the core when possible:

- capability purpose/base-agent delta;
- ownership/non-ownership;
- reasoning/decision/execution mechanism;
- semantic inputs/outputs;
- context/source authority;
- failure/unresolved/completion truth;
- critical evaluation invariants.

Keep invocation metadata, package shape, UI metadata, concrete tool names, installation
mechanics and provider-specific validators in projections.

For every targeted projection record provider, runtime/host, projection status, current
authoring contract/source, required runtime primitives, package/invocation mechanics,
dependencies, validation, limitations, evidence status and revision binding. Use the states in
`references/provider-projection.md`; never treat `TARGET`, `DESIGNED`, or `MATERIALIZED` as
`QUALIFIED`.

### Current provider target

OpenAI is the first/current provider target for this revision. This is not a claim that every
OpenAI runtime/host projection has behavioral evidence, and it is not a support claim for any
non-OpenAI provider.

## 8. Challenge the design before approval

Test the candidate against counter-evidence and near misses:

- Is the claimed base-agent delta real or only more prose?
- Could a reference/template/script/adapter solve it better?
- Does another Skill already own the same decision/artifact?
- Can invocation collide with a neighbor or disappear behind ambiguous language?
- Is important context unreachable, duplicated or provider-bound?
- Does the mechanism degrade into a generic checklist?
- Are side effects/approvals/verification hidden?
- Are failure paths, missing context and completion truth explicit?
- Did provider packaging mechanics leak into the portable core?
- Could an observed failure falsify the capability claim?

Keep unresolved material conflicts `UNRESOLVED`; do not force approval by rewriting the claim.

## 9. Approval gate

Read `references/skill-design-dossier.md` and require every approval predicate there. In
particular, blocking OQs must be zero and an authorized owner must explicitly approve the
current dossier.

Before approval: do not mutate/create runtime Skill files, route/package surfaces, or
provider-specific artifacts.

After approval: do not ask for repeated approval of reversible implementation details already
inside the accepted boundary. A materially new capability/ownership/provider/irreversible
trade-off reopens the dossier and owner gate.

## 10. Freeze cases before revision-sensitive drafting

Evaluation intent is part of the dossier; evidence ownership remains separate.

Before changing runtime bytes:

1. freeze positive, near-miss, missing/conflicting/stale-context, owner-boundary, provider and
   completion cases that exercise the bounded capability;
2. for an existing Skill, bind cases to exact pre-change revision and the accepted failure;
3. include regression cases for every load-bearing audit/production finding;
4. separate structural guards from capability-specific assertions;
5. preserve behavioral execution as `NOT_RUN` until representative output actually executes.

In SDLC mode, `/qualify-sdlc-capability` owns qualification evidence and evidence-profile
classification. `create-skill` may define/freeze the cases required by the approved design but
must not score its own draft as promoted capability.

## 11. Materialize the approved provider projection

Materialize only after the dossier and case-freeze gates pass.

1. Derive the runtime Skill prompt/resources from the approved capability mechanism.
2. Use current provider-specific authoring guidance/tooling that is actually available for the
   selected projection.
3. For OpenAI, provider-specific authoring guidance/tooling such as native `skill-creator` may
   be used for OpenAI file structure, metadata, validation and packaging mechanics. Treat it as
   projection authority only; it does not own capability intent/topology/lifecycle and is not
   the universal cross-provider contract.
4. Keep supporting files only when they materially improve execution reliability/clarity.
5. For existing Skills, update the canonical artifact in place; remove superseded active
   meaning after replacement parity rather than keeping silent fallbacks.
6. If materialization discovers that the provider/runtime lacks a required primitive, preserve
   the portable dossier and mark that projection truthfully `DESIGNED`, `UNRESOLVED` or
   `UNSUPPORTED`; do not change capability semantics merely to manufacture support.
7. Provider/tool adapters required by the Skill remain separate integration artifacts owned by
   the appropriate integration workflow.

Provider materialization is a design/build action, not lifecycle promotion.

## 12. Validate, qualify and hand off

After materialization:

- run available provider-specific structural validators against exact changed bytes;
- validate referenced files/scripts and execute added deterministic scripts on representative
  inputs;
- inspect package/runtime projection impact when that surface changed;
- preserve unavailable host execution as `NOT_RUN` rather than source-inferred PASS;
- record limitations and exact revision binding;
- hand the fixed draft to audit/qualification/lifecycle owners required by the active system.

In SDLC mode, a structurally valid draft may become ready for `/audit-sdlc-artifact` or
`/qualify-sdlc-capability` according to lifecycle state, but only `/manage-skill-lifecycle`
may decide promotion sufficiency. General mode must likewise distinguish draft readiness from
installation/publication authority.

## Domain output semantics

A useful result preserves the current dossier identity/state, classification, bounded
capability/base-agent delta, ownership/ecosystem position, provider/runtime projection status,
materialized files when approved, frozen eval intent, validation/evidence status, unresolved
issues, and the truthful next owner/action. Render these meanings in the form useful to the
user; do not force one global JSON or Markdown presentation.

Completion examples:

- non-Skill candidate correctly reclassified -> design result may be `READY`; no Skill files;
- approved design but required provider authoring primitive unavailable -> `PARTIAL` or
  `BLOCKED` for materialization, with the portable dossier preserved;
- provider projection materialized + structural validation passes but behavior unexecuted ->
  draft may be ready for qualification while behavioral status remains `NOT_RUN`;
- failed critical invariant or unresolved ownership -> never promote the result for tone.
