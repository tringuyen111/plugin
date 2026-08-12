---
name: visual-qa
description: Apply reusable Visual QA judgment to an already fixed screenshot and complementary-evidence set inside fixed-scope Visual QA. Use to classify per-state/per-viewport results, evidence integrity, contract mismatches, responsive/content/accessibility risks, and accepted differences; do not own capture orchestration, the overall QA verdict, redesign, or implementation edits.
---

# Visual QA
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->


Judge one fixed evidence set against the approved visual acceptance scope. This supporting judgment skill does not build the coverage matrix, capture images, issue the parent `/verify-visual` verdict, redesign the contract, edit source, grant business acceptance, or release production.

Read [VISUAL-QA-FINDING.md](VISUAL-QA-FINDING.md).

## Process

1. **Confirm the fixed point.** Require exact implementation, reference,
   environment, route, state, viewport, data/content, and capture manifest.
2. **Verify evidence integrity.** Check image exists, hash matches manifest,
   state is the intended one, viewport/device scale is recorded, warnings are
   understood, PII is protected, and screenshots are current.
3. **Compare required characteristics.** Evaluate hierarchy, reading order,
   layout, spacing, typography, density, component states, alignment,
   truncation, overflow, content stress, responsive transformation, and parity
   characteristics named by the Visual Contract.
4. **Evaluate runtime state.** Confirm loading, empty, success, validation,
   permission, error, disabled, submitting, and long-content states as required.
5. **Evaluate visible accessibility risk.** Check visible focus indicators,
   target size, text scaling effects, contrast evidence when measured, error
   visibility, and non-color communication. Do not claim full accessibility
   from screenshots.
6. **Classify evidence.** Per state/viewport use `PASS`, `FAIL`,
   `INCONCLUSIVE`, `NOT_RUN`, or `NOT_APPLICABLE`.
7. **Classify findings.** Use contract mismatch, runtime-state failure,
   responsive failure, content-stress failure, visible accessibility risk, or
   evidence gap. Design critique and optional polish are not automatically QA
   blockers unless the approved contract or user risk makes them acceptance
   requirements.
8. **Respect accepted differences.** Require a named authorized approver and
   decision artifact. QA cannot convert a defect into an accepted difference.
9. **Name complementary proof.** Route keyboard, semantics, focus order,
   interaction, animation, or calculated contrast to concrete probes rather
   than inferring from pixels.

## Completion

`READY` means this classification result has an evidence-integrity check, traceable per-state results for the evidence supplied, categorized findings, accepted-difference provenance, complementary-probe links, and explicit unreviewed scope. It does not mean the parent coverage matrix is complete and does not itself grant the overall QA or UAT verdict.
