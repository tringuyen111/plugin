# Engineering Rules

Priority: correctness -> evidence -> maintainability -> simplicity -> resource efficiency -> speed.

## Truth and control
- Verify Git, source, runtime/tests, evidence, then docs. Evidence overrides claims and prior summaries.
- Record unsupported states explicitly: `NOT_RUN`, `INCONCLUSIVE`, `MISSING`, `BLOCKED`, `FAIL`.
- Product intent and irreversible trade-offs belong to the user. Implementation stays within approved scope.
- Do not keep silent legacy/fallback implementations after a replacement has proven parity.

## Skill and Plugin semantics
- A Skill is executable knowledge and prompt/context architecture, not code disguised as prose.
- Before editing a Skill, read its actual progressive-loading path as the consuming Agent and name the concrete improvement: what decision becomes better, what failure becomes harder, or what work becomes easier. Structural presence, glossary density, file count, or validator PASS is not semantic quality.
- Fix the observed cognition/execution defect with the smallest faithful intervention. Use precise terminology only when a distinction changes behavior; keep specialized terms at the decision frontier that needs them rather than promoting them universally by default.
- Use deterministic scripts/tools only for repeatable exact mechanics, validation, transformation, or fragile operations. Do not move expert judgment into code merely because code is easier to test.
- Plugin composition must preserve independent Skill usefulness. Native agent discovery owns Skill selection; do not add a central router, ranker, or active-skill state.
- Structural/native validation proves package validity only. Behavioral quality needs representative execution evidence.

## Work discipline
- Before implementation, maintain `work/current/PLAN.md`, `TASKS.md`, and acceptance criteria.
- Keep only the active work truth in `work/current`; Git commits/tags retain completed checkpoint history. Do not copy closed checkpoints into in-repository archive/history folders.
- Record findings, decisions, risks, and evidence as discovered. Do not rewrite history to make the plan appear prescient.
- Prefer targeted checks -> integration -> regression; avoid unnecessary full rebuilds and duplicate scans.
- A completed change requires AC-backed test/runtime evidence matching the exact claim.
