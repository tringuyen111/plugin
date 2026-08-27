# SDLC Intelligence

A Codex Plugin for proportional SDLC judgment and focused independent engineering, product, design, QA, operations, documentation, and delivery Skills, with optional stateless Codex-native resident guidance.

Created by **Trí Nguyễn**. The technical package ID is `sdlc-intelligence`, and the user-facing product name is **SDLC Intelligence**.

`assets/icon.svg` is the canonical G3 personal-brand mark from Trí Nguyễn Brand System v0.6.1 and is reused directly for Plugin presentation metadata; it is not a separate SDLC Intelligence product logo.

## Package model

`Host executes -> Plugin packages -> Skill owns capability`

- `skills/` contains 44 native Skills. Skill-specific methods, references, scripts, assets, and metadata stay with the owning Skill.
- `hooks/` contains one stateless Codex-native `SessionStart` projection that injects small resident SDLC guidance. It does not persist, restore, summarize, or infer session state, and no standalone Skill depends on it.
  Codex runs plugin hooks only after the user reviews/trusts the current hook definition; without hook trust, the Skills still work independently and only resident guidance is absent.
- Native Skill discovery/invocation policy lives only in each Skill's `name`/`description` and `agents/openai.yaml`; the Plugin does not maintain a second Skill registry, candidate ranker, route table, or active-Skill state.
- `skill-plugin-engineering` owns capability engineering; System Plane creation/audit/revision/projection/qualification is conditional methodology under that Skill rather than a separate runtime Skill. Ordinary runtime Skills consume only the local/resident semantics they need.
- `evals/vertical-depth/` contains maintenance-only qualification cases. They are not runtime Skill context and do not count as behavioral PASS evidence until executed on an actual model/runtime.
- `assets/` contains Plugin presentation assets.
- `LICENSE`, `THIRD_PARTY_NOTICES.md`, `UPSTREAM.md`, and `licenses/` preserve distribution and third-party provenance.

The Plugin does not ship a custom agent runtime, central Delivery router, App, MCP server, transcript summarizer, continuity store, or memory database. Codex performs native Skill discovery, execution, and session continuity. Skill activation is treated as bounded expertise inside the active user outcome, not as an organizational handoff; real cross-agent/session/runtime/authority transfer uses the dedicated Handoff capability only when needed. The stateless SessionStart hook is Codex-specific; each bundled Skill remains complete without it and can be separated from the Plugin.

## Vocabulary

- **Skill** — an independently invokable bundle of executable knowledge and Prompt/Context that teaches the Agent how to perform one reusable accountable capability. A Skill is not a code module, worker, persona, or route label.
- **Plugin** — the install/version/composition boundary that packages Skills and optional integration resources. Package membership does not make sibling Skills implicitly active.
- **Capability** — a repeatable job with a recognizable trigger, distinct mechanism, accountable outcome, authority boundary, and falsifiable completion condition.
- **Prompt/Context architecture** — the exact information environment that makes the Agent retrieve and apply the right term, relationship, decision rule, failure signal, and correction at the point of use.
- **Deterministic mechanic** — exact repeatable work such as validation, schema checking, transport, or transformation that is safer in a script/tool than in prose. It does not own expert judgment.
- **Native validation** — provider/package structural validity for exact bytes. It is not evidence that a Skill improves Agent behavior.
- **Behavioral qualification** — representative execution against an actual model/runtime with observable outputs and a frozen rubric. This is the evidence boundary for behavioral claims.

## Source verification

From a clean engineering checkout, run:

```bash
python scripts/verify_source.py
```

The command orchestrates the installed native `plugin-creator` and `skill-creator` validators, validates eval evidence-state syntax, rejects tracked generated test artifacts, runs the deterministic pytest suite, checks diff whitespace, and requires the Git worktree to remain clean. If native validator scripts live elsewhere, pass `--plugin-validator` / `--skill-validator` or set `PLUGIN_CREATOR_VALIDATOR` / `SKILL_CREATOR_VALIDATOR`.

While editing, `python scripts/verify_source.py --allow-dirty` runs the same checks except the final clean-worktree gate. A PASS from this command proves only the deterministic/native claims it exercises; it never upgrades frozen behavioral cases from `NOT_RUN`.
