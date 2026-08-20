---
name: user-guide
description: Create or update source-grounded user, admin, support, or product-operator guidance for a real task against a fixed released, verified-candidate, or explicitly preview state. Use for task guides, help pages, onboarding, product-use reference, troubleshooting, documentation IA, and instructional visuals. Do not own production runbooks, Product/UI design, QA/UAT, product repair, requirements, or unsupported behavior.
---

# User Guide

Translate supported product truth into reader capability:

```text
PRODUCT TRUTH -> READER -> TASK -> EXECUTION / UNDERSTANDING
              -> INFORMATION DESIGN -> SELECTED TARGET -> CONSUMER PROOF
```

Keep Product/Requirements/Design/QA truth with their owners. User Guide owns reader/content semantics. Production/service runbooks remain with the DevOps owner; unresolved visible help/docs Product/UI layout, navigation, interaction, or visual composition belongs to Product Design.

## Fast path — enough for a simple guide

1. **Bind the reader outcome and fixed point.** Resolve only what changes the result: named reader/situation, goal, language/scope, released/verified/preview product state, requested terminal truth, and actual destination/target when known.
2. **Admit only supportable claims.** Every material label, action, permission, limit, result, failure, recovery, or visual must be supported at that fixed point. Narrow, mark `TBD`/Open Question, or omit unsupported propositions; never invent them.
3. **Choose the reader-shaped information form.** Use a tutorial for learning one successful path, how-to for a bounded task, reference for exact lookup, explanation for concepts/trade-offs, troubleshooting for an observed failure, and multi-page information architecture only when many reader jobs need shared navigation.
4. **For a bounded task, model only the path-changing state.** A simple task can usually be reasoned as:

   ```text
   reader goal + valid entry state -> action -> material observation -> success
   ```

   Give the shortest supported primary path. Mention an observation only when it confirms success or changes the next decision. Keep internal state/evidence reasoning out of the reader-facing output unless it helps the reader act.
5. **Use the real target.** Follow the project's selected/native Markdown, MDX, AsciiDoc, HTML, docs generator, CMS, or other established source/consumer path. Do not introduce a Markdown intermediary or custom renderer merely because one format is convenient.
6. **Stop at the requested truth.** A one-page draft does not require a publication workflow, bundle manifest, independent review, screenshot capture, or Product Design unless the task itself makes one of those decisions material.

If those six steps are sufficient, do the work without loading optional depth.

## Load depth only at the decision that needs it

| Decision becomes material when... | Load / compose | Why |
|---|---|---|
| source authority conflicts, preview/release truth differs, or a source change may stale only part of the guide | [Claim Support and Staleness](CLAIM-SUPPORT.md) | decide admissible wording and bounded re-entry without invalidating unrelated content |
| the reader path has material branches, multiple methods, consequential actions, recovery, or causal troubleshooting | [Reader Task and Execution](READER-TASK-EXECUTION.md) | construct state/action/observation decisions instead of a button dump or generic checklist |
| an image/diagram could materially improve orientation, state recognition, sequencing, comparison, or understanding | [Visual Instruction](VISUAL-INSTRUCTION.md) | choose and frame the smallest useful visual before acquiring or annotating it |
| several pages/topics need shared navigation, source linkage, target mapping, or delivery/provenance proof | [User Guide Bundle](USER-GUIDE-BUNDLE.md) | manage semantic bundle obligations without forcing a file format |

Do not preload these references because they exist.

## Composition boundaries

### Visuals

User Guide decides **whether the visual helps the reader and what it must communicate**. If an already inspected current image satisfies that need, reuse it. If a missing/stale image must be captured, masked, or annotated, compose `/visual-capture` when available with the exact state/build/viewport/redaction/annotation intent. Capture owns acquisition and provenance, not instructional judgment.

A screenshot does not make Product Design necessary. Compose `product-design` only when the unresolved job is the visible help/docs Product/UI surface itself—such as navigation hierarchy, reading layout, responsive behavior, or component interaction.

### Review, lineage, and publication

Compose `/manual-review` only when review earns its cost: explicit request/policy, publication-ready material, material reader/evidence risk, or broad information architecture where a causal reader-task review can prevent expensive rework. Preserve review process state and verdict losslessly; same-agent review is not independent attestation.

Use `/traceability` only when durable cross-lifecycle lineage or broad stale-impact analysis is itself required. Otherwise keep lightweight local source linkage.

Publication requires publication authority. Build/render/export through the selected target only when requested or required by that target. Filesystem/tool availability is not authority.

## Proof discipline and re-entry

Keep proof claims narrow:

- product/runtime evidence supports product-use claims;
- an instructional image supports only what its captured state actually shows;
- a target build/render proves that transform, not product behavior or reader success;
- review proves only the review process/verdict at its fixed target;
- persistence/publication succeeds only when the authorized postcondition is actually verified.

When evidence changes, re-enter only the dependent claim/page/visual/review/build relation. A stale image does not invalidate independently supported text; a changed delivery target does not rewrite reader semantics unless the new format/interaction changes meaning.

## Completion

- `READY` — the requested documentation truth helps the named reader complete/understand the bounded job from supported product truth, expressed/proven in the selected target only to the degree the request requires.
- `PARTIAL` — useful guidance exists but a required claim, path, visual, review, target proof, persistence, or publication action remains incomplete.
- `BLOCKED` — missing/contradictory source, owner decision, capability, or authority prevents safe continuation.
- `FAILED` — an attempted authoring/capture/write/build/publish/validation operation failed such that the requested result cannot be trusted.

Surface unsupported claims, preview-only behavior, stale visuals/pages, unexecuted required review, and publication limitations. Never upgrade missing or unexecuted proof through wording.
