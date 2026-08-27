---
name: design-intelligence
description: Retrieve deterministic local UI/UX evidence from bundled design, accessibility, pattern, typography, color, motion, chart, icon, and stack corpora. Use as a supporting capability when a Design, Frontend, Review, or Creative owner needs source-backed design recommendations; never use it to approve a Visual Contract, change product behavior, complete implementation, or issue QA acceptance.
---

# Design Intelligence


Own **local design evidence retrieval and recommendation only**. The caller or accountable decision owner remains responsible for the decision and resulting canonical artifact.

## Entry gate

Require a concrete question plus enough product context to distinguish application UI from marketing/creative work. When stack-specific guidance is requested, inspect or consume source-backed stack truth; never infer a framework merely from generic wording.

If the local corpus or Python scripts are unreadable, return `BLOCKED`. If the corpus has no useful hit or conflicts with approved project truth, return `PARTIAL` evidence and name the conflict. Never replace a failed local lookup with an uncited claim that the corpus said something.

## Evidence loop

1. **Freeze the question and owner.** Record the parent owner, target artifact/decision, current canonical constraints, and whether the evidence is application, marketing, or creative context.
2. **Choose the narrowest corpus.** Search one relevant domain first. Use stack search only when the repository/project establishes that stack. Broaden once after a real `NO_MATCH`; report no-match truth if evidence remains absent.
3. **Run deterministic retrieval.** Resolve `<skill-dir>` to the directory containing this `design-intelligence/SKILL.md`, then run `<skill-dir>/scripts/search.py`; never assume the host current working directory. Keep query, domain/stack, source file, and ranked records available in the result.
4. **Synthesize recommendations in Skill reasoning, not deterministic code.** When advice is requested, retrieve only the material candidate domains (for example `product`, `reasoning`, `style`, `color`, `typography`, or a stack) and compare the returned records against the supplied/current constraints. A top-ranked row is evidence, not the answer; preserve competing records when the evidence does not force one choice.
5. **Reconcile with project truth.** Approved behavior, Visual Contract, technical decisions, brand constraints, and current authoritative platform guidance outrank this bundled snapshot. React/stack implementation guidance is candidate evidence only: `frontend-engineering` owns implementation reasoning and must verify current repository, dependency/version, runtime configuration, and authoritative vendor guidance when material.
6. **Return bounded evidence and judgment.** State what the corpus supports, source/domain/stack, bundled snapshot/freshness state, material caveats, the reasoning that makes one candidate more relevant when a recommendation was requested, and the decision/authority boundary that must consume it. If the active user outcome continues into Design or Frontend work, the same session may consume this evidence directly; no handoff artifact is implied. Version-sensitive technical evidence remains `REQUIRES_CURRENT_VERIFICATION` until current truth is actually checked.

## Commands

```bash
python3 "<skill-dir>/scripts/search.py" "admin analytics dashboard" --domain style -n 5
python3 "<skill-dir>/scripts/search.py" "focus keyboard error feedback" --domain ux
python3 "<skill-dir>/scripts/search.py" "server components image optimization" --stack nextjs
python3 "<skill-dir>/scripts/search.py" "B2B operations dashboard" --domain product -n 5
python3 "<skill-dir>/scripts/search.py" "B2B Service" --domain reasoning -n 3
python3 "<skill-dir>/scripts/validate_data.py"
```

Read [Pro Rules](references/pro-rules.md) only for native/mobile anti-pattern evidence when material. `data/source-manifest.json` is the machine-readable provenance/freshness source for bundled corpus output.

## Hard boundaries

- Corpus ranking is evidence, not approval.
- Do not persist a generated `MASTER.md`, token source, or alternate design-system truth.
- Deterministic helpers may retrieve, rank, validate, or format corpus evidence; they must not choose the semantic Product/UI pattern, style, palette, typography, motion, or Design recommendation on the Agent's behalf.
- Do not invent Product behavior, Design decisions, technical architecture, implementation completion, or QA verdicts.
- Do not force landing-page hero/CTA patterns into authenticated/product application contexts.
- Treat bundled data as a snapshot, not live current truth. Current authoritative project/provider standards win when verified.
- Do not use React/stack corpus output as final implementation authority. When implementation is part of the active outcome, continue through `frontend-engineering` with current-verification requirements rather than treating evidence transfer as a handoff.

## Completion

`READY` means the requested local evidence was actually retrieved, provenance is explicit, its interpretation is bounded, and conflicts/limitations are visible. Preserve `PARTIAL`, `BLOCKED`, or `FAILED` when the local corpus, runtime, stack truth, or decision boundary cannot be verified.
