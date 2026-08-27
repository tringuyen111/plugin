---
name: skill-plugin-engineering
description: Engineer the capability design and lifecycle of reusable Agent Skills and Plugins, including governing cross-capability System Plane semantics when that plane itself is the target. Use when the hard problem is what capability should exist, why behavior is weak, or how boundaries, Prompt/Context, methodology, composition, evidence, migration, or cross-capability semantic laws should change. Once capability intent is settled, leave straightforward native scaffolding, manifest, marketplace, cachebuster, and packaging mechanics to the native creator tools.
---

# Skill / Plugin Engineering

Treat Skill and Plugin work as capability engineering, not prompt editing or folder rearrangement. Determine what outcome the user needs, what artifact truth actually exists, why the current capability succeeds or fails, and what smallest **complete** response or intervention can advance the result without creating duplicate active truth.

Do not create a central router or route table for modes such as create, review, audit, upgrade, or package. Native Agent discovery selects Skills; this capability improves the Skills/Plugin themselves.

## Operating laws

- **CRITICAL INVARIANT — narrow accountability, deep coverage.** Keep one accountable outcome, but cover the material hard cases, failure modes, recovery, and adjacent interactions required to complete that outcome correctly. Do not shrink scope merely to avoid difficult cases. Stop or compose only when a different outcome, authority, or protected side effect is genuinely required.
- **CRITICAL INVARIANT — positive expertise must survive the guardrails.** A Skill is not expert merely because it says what not to do. If the prohibitions disappeared, enough positive mechanism must remain to explain how to make the important decisions, recognize failure, correct course, and prove completion.
- **DECISION RULE — smallest means smallest complete intervention.** Prefer the least change that satisfies the accountable outcome and its material edge cases; minimality never justifies omitting required domain depth, recovery, migration, or proof.
- **HEURISTIC — optimize context after correctness.** Compress, move, or demand-load knowledge only after the required decision mechanism remains reachable and salient at the point of use.

## Core distinctions

- **Capability** — a reusable accountable job with a recognizable trigger, distinct decision/execution mechanism, bounded authority, and falsifiable completion.
- **Skill** — an independently invokable package of executable knowledge and Prompt/Context that changes how the Agent reasons or acts for one capability. A Skill is not a worker process, code module, persona, route label, or folder category.
- **Plugin** — an install/version/composition boundary for Skills and optional integration resources. Plugin membership does not imply sibling Skills are loaded or active together.
- **Prompt/Context architecture** — the information environment that makes the Agent retrieve the right term, relationship, decision rule, failure signal, and correction at the point of use. It is execution architecture, not wording polish.
- **Methodology** — the reusable semantic mechanism for making a non-obvious decision: variables, relationships, evidence, trade-offs, failure patterns, correction, and consequence.
- **Deterministic mechanic** — exact repeatable work such as validation, transport, schema checking, lookup, or transformation that is safer in a script/tool. It may support a Skill but must not replace semantic judgment merely because code is easier to test.

Use a canonical term after it is defined instead of rotating through loose synonyms. A term earns universal residency only when confusing it with a nearby concept can change ordinary execution before a conditional branch is known. Specialized vocabulary belongs with the branch that needs it. Glossary density is not quality.

## Capability engineering method

Use this control loop as the universal execution shape; the detailed branch method is loaded only after diagnosis makes it material:

```text
PROBLEM / REQUEST
      ↓
BIND JOB + EXACT TRUTH
      ↓
RECONSTRUCT JOB + DECISION FRONTIER
      ↓
   GATEWAY ── no material change/design needed ──> VERDICT / NO CHANGE
      │
      └─ material frontier -> LOAD ONLY THE NEEDED EXPERT METHOD
                               ↓
                        DERIVE COMPLETE RESULT
                               ↓
                   GATEWAY: requested + authorized output?
                     │ verdict/design │ allowed mutation/package
                     ↓                ↓
                  RETURN          MATERIALIZE
                     │                │
                     └──────┬─────────┘
                            ↓
                     COLD-REREAD + VERIFY
                            ↓
                     GATEWAY: claim true?
                      │ yes        │ no/new evidence
                      ↓            └─> RE-ENTER EARLIEST INVALIDATED TRUTH
                     END
```

1. **Bind the job and exact target.** Name the terminal truth, then read the actual Skill/Plugin bytes, revision, package/runtime surface, project rules, and only the evidence needed to establish current truth. Distinguish `FACT`, `INFERENCE`, `PROPOSAL`, and `NOT_RUN`; never substitute a filename, prior summary, validator result, or memory for source truth.
2. **Reconstruct the job and diagnose the decision frontier.** Establish trigger, inputs/evidence, accountable outcome, constraints/non-goals, authority, and completion proof. For review/upgrade, diagnose the actual weakness before choosing an intervention; for create, identify the first unresolved capability/artifact decision rather than inventing a defect. Pressure-test ordinary, hard/edge, and failure/recovery cases that are material to the outcome; do not classify a required hard case as “out of scope” merely because another domain touches it. Useful diagnosis classes include boundary, discovery, Prompt/Context, methodology depth, representation, knowledge, deterministic support, composition/integration, evidence, and migration.
3. **Read as the consuming Agent before designing the fix.** Follow the real loading path: description -> `SKILL.md` -> only references whose condition is material. Ask what becomes **better**, **safer**, or **easier**, what unnecessary context the Agent must carry, and what relation it still has to infer. When Skill content or placement is material, classify it as `KEEP | MOVE | COMPRESS | DELETE | MISSING | DISCOVERY` and load [Prompt and Context Architecture](references/prompt-context.md) for the detailed method. If an addition has no concrete cognitive/behavioral consequence, do not add it merely to complete a structure, satisfy an eval predicate, or increase documentation coverage.
4. **Derive the smallest complete intervention and work order.** Use terminal truth, decision-changing unknowns, reversibility, authority, dependencies, proof burden, and the material hard cases identified during diagnosis. A review/audit may correctly end in a verdict or no change. A reference, representation change, template, script/tool, adapter, Skill boundary change, Plugin change, migration, or no new artifact may be the right result.
5. **Produce only the requested/authorized result, then reread before evaluating.** A review may return a verdict, an audit may return findings/design, and mutation/package work may materialize only when the request and authority allow it. For OpenAI-native Skill files or packaging, use `skill-creator` when available; for Plugin manifest/package mechanics, use `plugin-creator` when available. After editing, cold-read the changed loading path again against a simple case, a hard/material case, and a near-miss when those distinctions matter. When the quality bar depends on judgment or a common near-miss can look correct, require a minimal HOW+SHOW demonstration of `evidence -> reasoning -> disposition -> correction/re-entry`; repair content, placement, or representation before treating tests/evals as evidence.
6. **Verify only the exact claim and close only the affected truth.** Native/deterministic checks come after semantic reread and prove only the predicates they execute. Claims that Prompt/Context improves behavior require representative model/runtime evidence; preserve `FAIL`, `NOT_RUN`, `INCONCLUSIVE`, `MISSING`, and `BLOCKED` truthfully. When replacing active behavior, migrate consumers and remove superseded truth only after parity for the material obligation is established.

When new evidence invalidates an earlier premise, re-enter at the earliest affected truth rather than restarting a ceremonial pipeline.

## Conditional expert context

Load detailed methodology only when it can change the current decision.

- **WHEN** the job, Skill worthiness, overlap, split/merge, or first-class boundary is uncertain, **READ** [Capability Boundary](references/capability-boundary.md) **BECAUSE** artifact identity must follow the accountable capability rather than role, folder, provider, or line count; **RETURN** one boundary disposition (`KEEP | REVISE | MERGE | SPLIT | RECLASSIFY | REMOVE`) plus the accountable outcome, nearest collision, and falsifier that justifies it.
- **WHEN** the work order, research need, approval position, or failure re-entry is unclear, **READ** [Workflow Synthesis](references/workflow-synthesis.md) **BECAUSE** workflow should be derived from terminal truth and uncertainty rather than a fixed mode pipeline; **RETURN** the next decision/execution frontier, only its material prerequisites, and the earliest re-entry point if evidence invalidates it.
- **WHEN** discovery, salience, progressive loading, context bloat, premature execution, terminology, instruction form, or content placement can explain the failure, **READ** [Prompt and Context Architecture](references/prompt-context.md) **BECAUSE** predictable cognition depends on what the Agent sees, what exact terms mean, when knowledge appears, and how relations are represented; **RETURN** the specific cognition defect plus the smallest `KEEP | MOVE | COMPRESS | DELETE | MISSING | DISCOVERY` change that should alter behavior.
- **WHEN** a Skill looks polished but shallow, generic, checklist-like, or unable to outperform the base agent on decisions, **READ** [Methodology Depth](references/methodology-depth.md) **BECAUSE** expert value must come from a decision mechanism, trade-offs, failure model, and correction logic; **RETURN** the missing semantic mechanism or counterexample and the minimum HOW/SHOW depth needed to make the capability falsifiable.
- **WHEN** the solution may be a reference, template, script/tool, Skill, adapter, MCP/App/API/connector, domain pack, or Plugin change, **READ** [Artifact, Integration, and Composition](references/artifact-integration-composition.md) **BECAUSE** these artifacts live at different abstraction levels and should not be selected from one flat taxonomy; **RETURN** the smallest artifact class that owns the diagnosed mechanism and the alternatives rejected for concrete boundary reasons.
- **WHEN** readiness, superiority, safety, packaging, provider behavior, migration, or completion depends on evidence, **READ** [Evidence and Verification](references/evidence-verification.md) **BECAUSE** each claim requires a matching proof level and exact revision binding; **RETURN** the exact claim-to-proof requirement, current evidence state, unresolved falsifier, and whether the claim may truthfully advance.
- **WHEN** the governing cross-capability System Plane itself must be created, audited, revised, reconciled, projected, or qualified, **READ** [System Plane Engineering](references/system-plane-method.md) **BECAUSE** this is conditional methodology inside Skill / Plugin Engineering, not a separate runtime owner or route; **RETURN** the changed or disputed semantic law, affected projections/consumers, and proof obligation. **WHEN** law semantics, projection equivalence, or qualification strength is the specific frontier, also read [System Plane Model](references/system-plane-model.md), [System Plane Projection Contract](references/system-plane-projection-contract.md), or [System Plane Qualification](references/system-plane-qualification.md) respectively.

Do not preload all references merely because they exist.

## Skill independence and Plugin composition

- A first-class Skill should remain useful when invoked alone unless the runtime contract explicitly guarantees composition. Keep its decision-critical methodology, constraints, and proof semantics locally reachable.
- Boundary ownership limits what terminal outcome or authority the Skill may claim; it does **not** make adjacent knowledge irrelevant. Handle the effect of adjacent concerns on the Skill's own outcome, and compose/handoff only at the real ownership or authority boundary while preserving all unblocked work.
- A Plugin should keep installed capabilities coherent without making sibling Skills implicitly active or dependent on hidden shared context.
- Do not apply abstract DRY across independently invokable Skills. Prune overlap only for a concrete correctness, boundary, context, composition, or maintenance defect.
- Share deterministic machinery, large stable references, or explicit composition contracts only when that does not remove reasoning the standalone Skill needs.

## Resident Prompt / Context rules

- The description owns discovery identity and nearby non-trigger discrimination; `SKILL.md` owns universal control plus the first decision frontier; conditional methodology belongs in directly reachable references.
- Keep semantic interpretation, evidence weighing, trade-offs, failure recognition, and correction in Prompt/Context. Put only exact repeatable mechanics in scripts/tools.
- Mark only true safety/authority/evidence/completion invariants as **CRITICAL INVARIANT**; use **DECISION RULE** for choice logic and **HEURISTIC** for defaults that may yield to evidence. Typographic emphasis without instruction priority is not salience.
- Teach non-obvious expertise as **HOW**; add selective **SHOW** when a worked contrast/counterexample materially improves pattern transfer. For ambiguous expert judgment, SHOW should expose the evidence and reasoning that separates a plausible near-miss from the correct disposition, not just display a finished artifact. Choose the smallest faithful representation rather than defaulting to prose.
- Place a rule where the Agent must apply it. Demand-load specialized depth with explicit `WHEN / WHY / TARGET / RETURN`; a reference that returns no material decision/state/evidence change is usually context waste.
- Remove or move text that creates no observable behavioral difference at the current surface. Do not keep duplicated doctrine merely because a validator or existing file shape expects it.

## Authority and evidence boundaries

- User/project authority owns product intent, irreversible trade-offs, protected writes, publication, release, and risk acceptance. Writable tools/filesystems are not authority.
- Approval authorizes a bounded decision or side effect; it never turns failed or missing evidence into success.
- Creator/native validators prove only the invariants they check. Self-review may support a candidate but is not independent qualification, and deterministic presence checks do not prove semantic judgment improved.
- Never preserve legacy behavior as a hidden fallback merely to keep validation green.

## Output semantics

Return the form useful to the request. When material, keep exact target/revision, requested terminal truth, root cause, chosen intervention/verdict, authority state, changed artifacts, evidence level, unresolved falsifiers, and migration impact explicit.

A package may be natively valid while behavioral quality remains `NOT_RUN`. A review can be complete without mutation. A blocked materialization can still produce a useful design when the missing authority or primitive is explicit.
