# Quality Assurance

Quality Assurance owns independent verification of approved acceptance and risk.
It does not own Product priority, Business Analysis requirements, Design
approval, Engineering implementation, business acceptance, or production
release authority.

## User-invoked

- **[verify-quality](../../skills/verify-quality/SKILL.md)** — Independently plan and execute risk-based verification against a fixed implementation and approved acceptance scope.
- **[verify-visual](../../skills/verify-visual/SKILL.md)** — Orchestrate independent Visual QA across a fixed candidate, coverage matrix, evidence, defects, and overall verdict.

## Model-invoked

- **[test-strategy](../../skills/test-strategy/SKILL.md)** — Design the supporting risk/claim coverage plan; it does not execute probes or issue the QA verdict.
- **[test-condition](../../skills/test-condition/SKILL.md)** — Define one supporting observable probe contract; `READY` does not mean it ran or passed.
- **[defect-report](../../skills/defect-report/SKILL.md)** — Record a deviation as an authorized or inline artifact without diagnosing root cause or issuing the parent QA verdict.
- **[visual-qa](../../skills/visual-qa/SKILL.md)** — Apply reusable per-state/per-viewport Visual QA classification inside `verify-visual`.
