---
name: design-intelligence
description: Retrieve deterministic local UI/UX evidence from bundled design, accessibility, pattern, typography, color, motion, chart, icon, and stack corpora. Use as a supporting capability when a Design, Frontend, Review, or Creative owner needs source-backed design recommendations; never use it to approve a Visual Contract, change product behavior, complete implementation, or issue QA acceptance.
---

# Design Intelligence
<!-- runtime-context:start -->
## Runtime context

- **Before returning evidence or a supporting handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to preserve truthful completion when corpus/runtime evidence is missing or conflicting.
- **When a recommendation could be mistaken for a Design, Engineering, Product, or QA decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve canonical ownership.
<!-- runtime-context:end -->

Own **local design evidence retrieval and recommendation only**. The parent route owner remains accountable for the decision and resulting canonical artifact.

## Entry gate

Require a concrete question plus enough product context to distinguish application UI from marketing/creative work. When stack-specific guidance is requested, inspect or consume source-backed stack truth; never infer a framework merely from generic wording.

If the local corpus or Python scripts are unreadable, return `BLOCKED`. If the corpus has no useful hit or conflicts with approved project truth, return `PARTIAL` evidence and name the conflict. Never replace a failed local lookup with an uncited claim that the corpus said something.

## Evidence loop

1. **Freeze the question and owner.** Record the parent owner, target artifact/decision, current canonical constraints, and whether the evidence is application, marketing, or creative context.
2. **Choose the narrowest corpus.** Search one relevant domain first. Use stack search only when the repository/project establishes that stack. Broaden once after a real `NO_MATCH`; report no-match truth if evidence remains absent.
3. **Run deterministic retrieval.** Use `scripts/search.py`. Keep query, domain/stack, source file, and ranked records available in the result.
4. **Use recommendation synthesis only when useful.** `--design-system` may synthesize the local corpus into a recommendation, but this command has no persistence surface and creates no canonical project state.
5. **Reconcile with project truth.** Approved behavior, Visual Contract, technical decisions, brand constraints, and current authoritative platform guidance outrank this bundled corpus. Surface disagreement instead of silently overriding them.
6. **Return bounded evidence.** State what the corpus supports, source/domain/stack, material caveats, and the decision owner that must consume it.

## Commands

```bash
python3 scripts/search.py "admin analytics dashboard" --domain style -n 5
python3 scripts/search.py "focus keyboard error feedback" --domain ux
python3 scripts/search.py "server components image optimization" --stack nextjs
python3 scripts/search.py "B2B operations dashboard" --design-system --format markdown
python3 scripts/validate_data.py
```

Read [Quick Reference](references/quick-reference.md) for compact UX guidance and [Pro Rules](references/pro-rules.md) for anti-pattern checks only when material to the question.

## Hard boundaries

- Corpus ranking is evidence, not approval.
- Do not persist a generated `MASTER.md`, token source, or alternate design-system truth.
- Do not invent Product behavior, Design decisions, technical architecture, implementation completion, or QA verdicts.
- Do not force landing-page hero/CTA patterns into authenticated/product application contexts.
- Treat bundled data as potentially stale; current authoritative project/provider standards win when verified.

## Completion

`READY` means the requested local evidence was actually retrieved, provenance is explicit, its interpretation is bounded, and conflicts/limitations are visible. Preserve `PARTIAL`, `BLOCKED`, or `FAILED` when the local corpus, runtime, stack truth, or decision boundary cannot be verified.
