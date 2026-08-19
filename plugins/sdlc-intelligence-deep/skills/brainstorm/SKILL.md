---
name: brainstorm
description: >-
  Shape a raw or still-fluid product/feature idea into coherent pre-canonical idea truth by framing the real question, deliberately exploring materially different possibilities when the space is open, deepening the behaviors and uncertainties that matter, discriminating options with evidence/constraints/judgment, and converging without fabricating precision or downstream authority. Use when the user explicitly asks to brainstorm, think through, explore, or pressure-test an early idea, or when an ordinary request is itself a raw/fuzzy idea that clearly needs ideation before canonical Product/BA/technical work. Do not use as a mandatory pre-step for fixed implementation, review, requirements, design, QA, release, or other downstream work whose decision surface is already sufficiently defined. Brainstorm works standalone; conversation is a valid working surface, and Markdown/files are optional persistence representations selected only when requested or project-native.
---

# Brainstorm

Turn a raw or still-fluid idea into **coherent pre-canonical idea truth**. The job is not to interrogate one initial solution until it looks complete; it is to widen the possibility space when useful, deepen the material semantics, and converge only as far as current evidence and authority allow.

## Standalone job contract

```text
RAW / FLUID IDEA
      |
      v
FRAME -> DIVERGE -> DEEPEN -> DISCRIMINATE -> CONVERGE
      |
      v
COHERENT PRE-CANONICAL IDEA STATE
```

Brainstorm must be able to complete this job when installed alone. A neighboring Skill may receive an out-of-boundary handoff or add optional leverage when available, but Brainstorm must not require a sibling Skill to supply its own exploration, reasoning, correction, or completion method.

Brainstorm owns idea exploration and clarification. It does **not** own canonical Product scope/priority, evidence-grounded opportunity judgment, formal business requirements, Product/UI Design approval, technical architecture, implementation, QA/UAT, release, or production operations.

## Truth and authority

Track these states when confusion would change a decision:

- **OBSERVED** — supplied directly by the user or a bound source.
- **PROPOSED** — a Brainstorm-generated possibility, rule, flow, value, wording, or interpretation.
- **DECIDED** — accepted by the user/authorized owner **within this brainstorm**; not automatically canonical downstream.
- **UNRESOLVED** — missing, conflicting, deferred, or awaiting a different authority/evidence source.

Do not label every sentence. Preserve the distinction where a proposal could be mistaken for fact or a brainstorm decision could be mistaken for downstream authority.

## Universal cognitive loop

### 1. FRAME — identify what is actually open

Bind the idea seed and available source truth before generating options. Separate:

```text
fixed evidence / governed constraints
from
assumptions / proposals / genuinely open choices
```

Name the smallest useful exploration frontier: problem framing, user/value hypothesis, behavior, flow, policy-like rule, state/recovery, representation, or another idea-level uncertainty.

Do not manufacture an open decision when authority/evidence already fixes the answer. Do not ask the user for facts that can be inspected from available sources.

### 2. DIVERGE — resist premature fixation

Diverge only when materially different possibilities could change the idea outcome.

Generate enough **materially different** possibilities to expose the real choice. Difference must come from behavior, boundary, actor model, flow, state model, value proposition, interaction model, operating assumption, or another consequential dimension — not cosmetic renaming.

Use these anti-fixation checks:

- What assumption makes the current idea look inevitable?
- What credible alternative removes or reverses that assumption?
- Is the apparent choice a false binary?
- Could the user reach the same goal through a materially different behavior or boundary?
- Would a different starting state, actor, failure mode, or timing model change the idea?

Do not force a count. Two strong alternatives are better than three where the third is fake; one path is valid when constraints genuinely collapse the space.

Do **not** converge while alternatives are still being generated unless a hard constraint immediately eliminates one.

### 3. DEEPEN — make each live possibility behaviorally meaningful

Deepen only the semantics that can change understanding, risk, comparison, or downstream handoff.

Use this compact seven-lens map:

1. problem / value / context;
2. users / access;
3. core flows;
4. behavior / decisions / states / interruptions;
5. validation / limits / wording;
6. system context at business-visible level;
7. edge cases / risks / open questions.

Classify a lens as `ACTIVE`, `SATISFIED`, `DORMANT`, or `NOT_MATERIAL`. Ask only from `ACTIVE` lenses and re-evaluate after every material answer or new fact.

**WHEN** complex flow/state/async/multi-actor/limits/wording semantics are material, **READ** [Semantic Lenses](references/semantic-lenses.md) **BECAUSE** it contains the deep HOW for the seven lenses, complexity triggers, failure cases, and fitting representations.

### 4. DISCRIMINATE — find what actually separates the possibilities

Do not compare options with generic pros/cons. Identify the discriminating variable and classify it:

| Discriminator | Action |
|---|---|
| source-answerable fact | inspect the strongest available source/tool; do not ask the owner to guess |
| hard constraint / governed rule | eliminate infeasible possibilities |
| user/business value or trade-off | ask the authorized human only when their judgment can change the choice |
| assumption | expose it and seek disconfirming evidence or keep it explicit |
| downstream-authority decision | keep unresolved and hand off; Brainstorm does not seize authority |

A proposal that survives only because no one challenged its load-bearing assumption is not decision-ready.

### 5. CONVERGE — narrow without inventing certainty

Converge only as far as the current truth supports:

```text
eliminate by evidence/constraint
-> compare surviving trade-offs
-> record accepted brainstorm decisions
-> preserve material unresolved items
-> identify downstream authority/evidence needs
```

A brainstorm may legitimately end with several surviving possibilities or explicit OQs. Do not force one winner to create a tidy artifact.

When an accepted brainstorm decision needs stable later reference, use `DEC-n`; use `OQ-n` for material unresolved questions. Never treat these IDs as downstream approval.

## Conversation and questioning discipline

Conversation is a first-class execution surface.

- Start from known context; do not require a file or template.
- Ask the **smallest decision-changing question**. Prefer one frontier at a time; combine only tightly coupled factual clarifications whose answers must be considered together.
- Do not re-ask known information.
- Pressure vague material values once. If precision still does not exist, keep `TBD/OQ` rather than fabricating it.
- A user may ask for a shallow pass; reduce depth, not truthfulness. Externalize material unknowns rather than pretending they do not matter.
- Keep user-facing output in the user's/project's appropriate language; preserve exact UI/legal strings, identifiers, names, and technical terms where translation reduces precision.

## Representation selection

Choose representation from the information shape, not from Skill habit:

- concise prose for a simple framing or hypothesis;
- numbered steps for ordered behavior;
- decision table/tree for branch conditions;
- scenario matrix for actor/state combinations;
- state transition representation for governed lifecycle;
- diagram/ASCII only when topology or async/branching relations are otherwise hard to see;
- risk table only when comparing cause, consequence, and mitigation is material.

Do not create decorative tables, diagrams, or a full document package when conversation is sufficient.

## Persistence is conditional, not identity

Durable persistence is optional. Use it when the user asks for a file/artifact, a project-native ideation artifact already exists, continuation across sessions requires durable state, or downstream consumers need a stable handoff.

**WHEN** files/workspace/artifact identity, safe writes, collision handling, or durable lifecycle become material, **READ** [Runtime Portability](references/runtime-portability.md) **BECAUSE** it defines workspace/chat behavior and one-current-truth write safety.

For a durable brainstorm:

- prefer the user's/project's existing structure and format;
- maintain one current artifact identity per idea;
- use `references/brainstorm-template.md` only as a semantic fallback when Markdown is actually the selected representation;
- read `references/naming-conventions.md` only if a path/slug must be created;
- read `references/changelog.md` and `references/resolve-oqs.md` only when durable revision/OQ history becomes material;
- read `references/approval-gate.md` only when finalization/review of a durable state or representation is requested/material.

Do not create a Markdown intermediate merely because Brainstorm bundles Markdown references.

## Source intake and continuation

- Inline idea text -> use it directly as the seed.
- Attached/readable source -> inspect it and distinguish target-idea claims from examples, templates, history, and metadata before inferring complexity.
- Image -> use vision only when the image is actually available; preserve source limitations.
- Existing durable brainstorm -> read the whole current artifact before revising it.
- Missing referenced source/artifact -> state `MISSING`/ask for it; never reconstruct and claim it is the same source.

Read `references/keyword-detection.md` only when source-role, language, complexity, decision, or OQ inference is materially ambiguous.

## Boundary handoff without dependency

When Brainstorm reaches a question outside its authority, return the unresolved truth in a form the next owner can consume. Name the **kind of ownership/evidence needed**; naming an installed sibling capability is optional convenience, never required execution machinery.

Examples:

- missing real user evidence -> evidence/opportunity research is needed;
- canonical scope/priority choice -> Product authority is needed;
- business rule/requirement canonicalization -> BA/domain authority is needed;
- UI/UX realization -> Product Design authority is needed;
- architecture/implementation choice -> technical owner is needed.

Brainstorm remains complete when its own pre-canonical job is complete even if a downstream owner is unavailable.

## Completion

Return the smallest truthful terminal state:

- **READY** — the current brainstorm is coherent enough for its intended checkpoint/handoff: the open space was explored proportionally, material semantics are understood or explicitly unresolved, and authority boundaries are clear.
- **PARTIAL** — useful exploration exists but a material idea-level frontier still needs user input, source evidence, or further brainstorming.
- **BLOCKED** — the idea/source needed to make truthful progress is unavailable.
- **FAILED** — a required attempted read/write/tool action failed; preserve the latest known semantic state and the exact failure.

Keep persistence state separate from semantic readiness. A durable artifact may be `working` or `finalized` while semantic quality is `READY` or `PARTIAL`.

Never upgrade structural completeness, a user finalization action, a generated diagram, or a file write into proof that the idea is correct, validated, canonical, or implementation-ready.

## Local references

- [Semantic Lenses](references/semantic-lenses.md) — seven-lens deepening, complexity and representation mechanics
- [Runtime Portability](references/runtime-portability.md) — conditional workspace/artifact persistence and safe writes
- [BA Conventions](references/ba-conventions.md) — audience language and epistemic presentation when needed
- [Approval Gates](references/approval-gate.md) — durable finalization/review and representation refinement
- [Naming Conventions](references/naming-conventions.md) — fallback slugs/paths only when persistence needs them
- [Keyword Detection](references/keyword-detection.md) — source-role/language/complexity inference
- [Resolve OQs](references/resolve-oqs.md) — durable OQ propagation and downstream impact
- [Changelog](references/changelog.md) — durable material-change history
- [Brainstorm Template](references/brainstorm-template.md) — Markdown semantic fallback only when Markdown is selected
- [Example Brainstorm](references/example-brainstorm.md) — worked durable example; adapt semantics rather than copying its format
