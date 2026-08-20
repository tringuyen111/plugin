---
name: skill-plugin-engineering
description: Engineer the capability design and lifecycle of reusable Agent Skills and Plugins. Use when the hard problem is what capability should exist, why behavior is weak, or how boundaries, Prompt/Context, methodology, composition, evidence, or migration should change. Once capability intent is settled, leave straightforward native scaffolding, manifest, marketplace, cachebuster, and packaging mechanics to the native creator tools.
---

# Skill / Plugin Engineering

Treat Skill and Plugin work as capability engineering, not prompt editing or folder rearrangement. Determine what outcome the user needs, what artifact truth actually exists, why the current capability succeeds or fails, and what smallest intervention can change the result without creating duplicate active truth.

Do not create a central router or route table for modes such as create, review, audit, upgrade, or package. Let request semantics and evidence determine the work needed.

## Universal execution loop

1. **Name the terminal truth.** Determine whether the request ends in a verdict, design, changed candidate, native package, migration, comparison, or another checkable result. A review normally ends in findings; an upgrade normally ends in verified changed bytes.
2. **Bind exact target truth.** Read the actual Skill/Plugin bytes, revision, runtime/package surface, project rules, and relevant evidence. Distinguish `FACT`, `INFERENCE`, `PROPOSAL`, and `NOT_RUN`. Never use a filename, prior summary, validator result, or memory as a substitute for source truth.
3. **Reconstruct the job contract.** Establish the triggering situation, inputs/evidence, mechanism, accountable outcome, constraints/non-goals, authority, and completion proof. If these remain materially unclear, do not redesign the artifact yet.
4. **Diagnose before selecting an intervention.** Activate only the expert context that could change the current decision: boundary, Prompt/Context, methodology depth, workflow representation, knowledge, deterministic support, integration, composition/package, evidence, or migration.
5. **Derive the workflow.** Order work from the terminal truth, current state, decision-changing unknowns, reversibility, authority, dependencies, and proof burden. Research or approval is required only when it can change the decision or authorize a material consequence.
6. **Choose the smallest correct intervention.** Do not default to a new Skill. A reference, template, script/tool, adapter, interface configuration, domain pack, Plugin change, migration, or no new artifact may be better.
7. **Materialize within authority.** For OpenAI-native Skill files or packaging, use `skill-creator` when available. For Plugin manifest/package mechanics, use `plugin-creator` when available. Those creator capabilities own native mechanics, not capability intent or proof claims.
8. **Verify the exact claim.** Validate exact changed bytes and run the smallest sufficient evidence for the claimed outcome. Structural/package validity is not behavioral capability proof. Preserve `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, `MISSING`, and `BLOCKED` truthfully.
9. **Close migration truth.** When replacing active behavior, update consumers and remove superseded discovery, context, evaluation, package, docs, fixtures, and fallbacks only after replacement parity and required proof. Do not leave silent old/new coexistence.

When a failure invalidates earlier reasoning, re-enter at the earliest invalidated truth rather than restarting a ceremonial pipeline.

## Conditional expert context

Load detailed methodology only when it can change the current decision.

- **WHEN** the job, Skill worthiness, overlap, split/merge, or first-class boundary is uncertain, **READ** [Capability Boundary](references/capability-boundary.md) **BECAUSE** artifact identity must follow the accountable capability rather than role, folder, provider, or line count.
- **WHEN** the work order, research need, approval position, or failure re-entry is unclear, **READ** [Workflow Synthesis](references/workflow-synthesis.md) **BECAUSE** workflow should be derived from terminal truth and uncertainty rather than a fixed mode pipeline.
- **WHEN** discovery, salience, progressive loading, context bloat, premature execution, or instruction form can explain the failure, **READ** [Prompt and Context Architecture](references/prompt-context.md) **BECAUSE** predictable cognition depends on what the agent sees, when it sees it, and how the logic is represented.
- **WHEN** a Skill looks polished but shallow, generic, checklist-like, or unable to outperform the base agent on decisions, **READ** [Methodology Depth](references/methodology-depth.md) **BECAUSE** expert value must come from a decision mechanism, trade-offs, failure model, and correction logic.
- **WHEN** the solution may be a reference, template, script/tool, Skill, adapter, MCP/App/API/connector, domain pack, or Plugin change, **READ** [Artifact, Integration, and Composition](references/artifact-integration-composition.md) **BECAUSE** these artifacts live at different abstraction levels and should not be selected from one flat taxonomy.
- **WHEN** readiness, superiority, safety, packaging, provider behavior, migration, or completion depends on evidence, **READ** [Evidence and Verification](references/evidence-verification.md) **BECAUSE** each claim requires a matching proof level and exact revision binding.

Do not preload all references merely because they exist.

## Skill independence and Plugin composition

Treat these as separate quality planes:

- A **first-class Skill** should remain independently useful when invoked alone unless the runtime contract explicitly guarantees composition with another Skill. Keep the decision-critical methodology, constraints, and proof semantics needed for its accountable job locally reachable from that Skill. Similar guidance in a sibling Skill is not a substitute for local sufficiency.
- A **Plugin** should keep its installed capabilities coherent: triggers and accountable outcomes should not collide, shared concepts should not contradict, and composition should not manufacture hidden dependencies or competing active truth. Package membership does not make sibling Skills implicitly active.
- Do not apply abstract DRY across Skills. Conceptual overlap is acceptable when each Skill needs the rule for a different accountable job; prune it only for a concrete behavioral or composition defect.
- Share deterministic machinery, large stable references, or explicit composition contracts when that improves correctness without making a Skill unable to perform its own job. Do not replace required local reasoning with a cross-Skill pointer unless composition is guaranteed.

## Prompt / Context invariants

Treat Prompt/Context as execution architecture, not copywriting.

- Make the Skill description discriminate the capability, likely target/input, accountable outcome, and important nearby non-scope.
- Keep `SKILL.md` as the universal control surface. Put branch-specific methodology in conditional references and deterministic mechanics in scripts/tools only when needed.
- Co-locate a governing rule with its important caveat/failure and completion consequence when the agent must apply them together.
- Do not expose deep future-phase context early when it can pull the agent past the current truth. Preserve only the shallow checkpoint needed to continue, then activate new depth when material.
- Prefer positive steering and checkable completion. Use hard gates for high-consequence actions, not as decoration.
- Remove instructions that do not create an observable behavioral difference. Ask: *If this sentence disappears, what material behavior changes?*
- Teach non-obvious expertise as **HOW**: expose the decision mechanism, evidence, failure, correction, and consequence needed to act. Add selective **SHOW** with a worked/contrastive/counterexample case when pattern transfer or near-miss discrimination is material; do not force examples onto pure control or deterministic mechanics.
- Match representation to reasoning shape: ordered work -> steps; branching -> decision table/tree; stateful semantics -> transition view; interacting variables -> matrix; ownership/dependency/causal relationships -> typed graph with explicit edge meaning; exact repetition -> schema/script/tool.

## Authority and truth rules

- User/project authority owns product intent, irreversible trade-offs, protected writes, publication, release, and risk acceptance.
- Approval authorizes the bounded decision or side effect; it never converts failed or missing evidence into success.
- A writable filesystem or available tool is not authority.
- A creator validator proves only the invariants it checks.
- Self-checking may support a candidate claim but is not independent qualification. If an independent/attested claim is required, preserve that boundary and use the appropriate external evaluator or qualification capability.
- Never preserve legacy behavior as a hidden fallback merely to keep a validator green.

## Output semantics

Return the form useful to the request, but preserve these meanings when material:

- target identity and exact revision/evidence boundary;
- requested terminal truth and reconstructed job;
- observed root cause and activated expert methods;
- chosen intervention and rejected alternatives when decision-significant;
- approval/authority state for material mutation;
- exact changed artifacts or verdict;
- validation/evidence level and unresolved falsifiers;
- migration/consumer impact when replacing active truth;
- truthful completion state and next authority/action.

A package may be valid while behavior remains `NOT_RUN`. A review can be complete without mutation. A blocked materialization can still produce a useful design if the missing authority or primitive is explicit.
