# Repository Execution Map — Native Codex Plugin Projection

This packaged artifact is the native multi-Skill Codex projection of the local SDLC Intelligence 1.0.0 candidate. It is not a Git source checkout and does not claim upstream publication or promotion authority.

## Runtime shape

```text
71 first-class skills/<name>/SKILL.md entrypoints
+ canonical Delivery/System route registries for primary-owner orchestration
+ architecture/runtime/skill-index.json for exact routed-owner path resolution
+ complete runtime context/capability contracts
+ shared references under resources/
+ bundled deterministic adapters/scripts
```

Codex may discover the packaged Skills directly. the `sdlc` and `upgrade-sdlc-intelligence` Skills are implicit-visible plane routers for ambiguous or cross-owner work; they select one canonical owner from the route registries and resolve only that Skill through `architecture/runtime/skill-index.json`.

## Available deterministic probes

- Run `python -B scripts/generate_native_skill_index.py` after changing a Skill identity/path or runtime-context mapping; the generated index is deterministic and must not be hand-edited.
- Run `python -B scripts/validate_native_projection.py` for packaged Skill/index/route/Markdown structural integrity. Structural PASS does not prove behavioral routing quality or lifecycle readiness.
- Use the [Behavioral Evaluation Contract](BEHAVIORAL-EVALUATION-CONTRACT.md) plus the evaluation schemas under `architecture/runtime/evaluation/`; `scripts/verify_behavioral_eval_evidence.py` verifies persisted evidence-package integrity only.
- Validate visual-capture jobs with `python -B adapters/visual-capture/capture.py <job.json> --validate-only`; run capture only when a usable browser exists.
- Run `skills/user-guide/scripts/render_user_guide.py` only when User Guide rendering is the active branch.
- Run capability-specific deterministic tests from the owning Skill when those helpers are material to the change.

## Evidence and maintenance boundary

This plugin ships no provider/model behavioral evaluation adapter, so behavioral/model comparison remains `NOT_RUN` until a reproducible model/runtime execution actually runs. Plugin/Skill/schema/tool validation establishes structural or deterministic-tool evidence only.

System-plane design/audit reasoning may run from the bundled contracts. Git-history claims, lifecycle promotion, publication, or changes to an upstream canonical repository require the actual authorized source workspace and evidence; this packaged plugin must keep those states `PARTIAL`, `BLOCKED`, or `NOT_RUN` when dependencies are absent.
