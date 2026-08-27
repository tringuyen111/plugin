# Prompt / Context Expression Contract

Design the information environment so the agent can retrieve the right rule, understand how concepts relate, and make the intended decision at the point of use. Token minimization is secondary to correct cognition; extra prose is justified only when it changes behavior.

## Contents

- [Authoring pipeline](#authoring-pipeline)
- [Information hierarchy](#information-hierarchy)
- [Executable prompt architecture](#executable-prompt-architecture)
- [Read as the consuming Agent](#read-as-the-consuming-agent)
- [Terminology as a control surface](#terminology-as-a-control-surface)
- [Decision packets: teach HOW, not only WHAT](#decision-packets-teach-how-not-only-what)
- [HOW + SHOW](#how--show)
- [Representation selection](#representation-selection)
- [Activation semantics](#activation-semantics)
- [Context horizon](#context-horizon)
- [Co-location, hierarchy, and salience](#co-location-hierarchy-and-salience)
- [Pruning and duplication](#pruning-and-duplication)
- [Authoring diagnostic cases](#authoring-diagnostic-cases)

## Authoring pipeline

Treat authoring as four linked truths. Do not jump from correct domain knowledge straight to prose.

```text
SEMANTIC TRUTH
  what mechanism, decision, boundary, failure, and correction are actually true
        |
        v
EXPRESSION TRUTH
  which representation makes those relations easiest to retrieve and apply
        |
        v
CONTEXT TRUTH
  what must be visible now, what can load later, and what must stay out
        |
        v
EVIDENCE TRUTH
  which representative cases can falsify the claimed behavioral delta
```

A failure at an earlier layer invalidates dependent work. Better formatting cannot repair wrong semantics; more context cannot repair a bad representation; a validator cannot prove behavioral improvement that was not exercised.

## Information hierarchy

Use this default responsibility split:

```text
description   -> discovery identity + trigger/non-trigger discrimination
SKILL.md      -> universal execution/control surface + first decision frontier
references    -> conditional methodology, domain depth, examples, branch detail
scripts/tools -> deterministic mechanics or fragile repeatable transforms
assets        -> reusable output material, not reasoning context
```

The description must make the capability recognizable before `SKILL.md` is loaded. Put detailed procedures, formats, safety rules, examples, and supporting-file pointers in the body or references. Do not copy a design dossier or all expert knowledge into `SKILL.md`.

## Executable prompt architecture

Markdown is a Skill packaging/container format, not the default reasoning representation. Design the Skill as an executable reasoning package first, then serialize that design into the smallest faithful Markdown structures. Prose is correct for a simple local invariant; it becomes a defect when branches, legal states, interacting variables, dependency edges, or exact mechanics are buried inside paragraphs that the model must reconstruct before acting.

Use this as a design lens, not a mandatory file schema:

```text
JOB CONTRACT       trigger / inputs / terminal result / authority / proof
      |
      v
CONTROL MODEL      decisions / gates / branches / state / re-entry / completion
      |
      +---- demand-load ----> KNOWLEDGE MODULES
      |                       HOW / SHOW / domain depth / lookup evidence
      |                              |
      |                              v
      +<--- RETURN -------- decision / state / evidence update
      |
      v
MECHANICS          scripts / schema / tools for exact repeatable work
```

Do not force every Skill into YAML, JSON, or the diagram above. The representation earns its cost only when it exposes a relation the model would otherwise need to infer from prose. A short invariant should stay short; a real branch should look like a branch; a governed lifecycle should expose legal state/re-entry; a deterministic transform should prefer schema/script/tool over pseudo-code prose.

A structurally complete Skill can still be cognitively weak. `SKILL.md` containing every required sentence proves presence, not that the model can retrieve the right branch/state/decision at the right time. Review prompt architecture separately from workflow closure.

## Read as the consuming Agent

Before authoring the fix or its evals, follow the candidate through the same progressive-loading path the next Agent will experience:

```text
description
  -> SKILL.md
      -> only the reference whose WHEN condition is material
          -> decision / action / stop
```

Do not preload every reference to make the audit comprehensive. The audit is about whether the *available context at the decision frontier* changes cognition usefully. For a representative simple case, hard/material case, and near-miss when applicable, ask:

- **Better:** what non-obvious decision or execution step becomes more correct?
- **Safer:** what concrete failure, authority error, false completion, or wrong correction becomes harder?
- **Easier:** what inference, lookup, context load, repetition, or fragile manual work disappears?
- **Placement:** is the content needed now, or only after a conditional branch becomes material?
- **Representation:** can a smaller faithful shape expose the relation with less reconstruction?

Classify the actual content, not the headings it occupies:

| Disposition | Meaning | Typical correction |
|---|---|---|
| `KEEP` | materially useful at this surface and already economical | retain |
| `MOVE` | useful, but loaded earlier than the decision that needs it | move behind a precise conditional edge |
| `COMPRESS` | useful meaning survives with less cognitive load | shorten or choose a better representation |
| `DELETE` | removal changes no material decision, failure boundary, proof state, or standalone capability | remove; do not replace with another synonym |
| `MISSING` | the Agent still lacks a needed decision mechanism, failure/correction rule, example, or knowledge | add only that missing semantic depth |
| `DISCOVERY` | failure occurs before body loading | refine name/description/trigger discrimination |

Do not convert these dispositions into a deterministic score or required-section checklist. A script can verify that text/files exist; it cannot decide whether the consuming Agent now understands the job better.

After editing, cold-read the changed loading path again **before** treating native validation or eval machinery as quality evidence. If the new prose is correct but the Agent still must reconstruct the key relation, fix expression/placement first. If the Skill is already sufficient, `KEEP` or no change is a valid result.

## Terminology as a control surface

A precise term is a compact behavioral instruction only after its meaning is fixed. Terminology should reduce inference, not decorate the Skill.

Promote a term into a local Glossary when confusing it with a nearby concept could change trigger selection, authority, decision logic, evidence state, re-entry, or completion. A useful entry answers three things:

```text
TERM — canonical meaning; what nearby concept it is NOT; what behavior changes because of the distinction.
```

Use the canonical term consistently after definition. Do not rotate among near-synonyms for style when those words carry different operational meanings. Prefer the smallest vocabulary that preserves the real distinctions; common words that do not change behavior do not need glossary status.

Put terms needed in nearly every execution on the universal `SKILL.md` surface. Put specialized branch vocabulary in a directly reachable reference and activate it with the same `WHEN / WHY / TARGET / RETURN` discipline as other conditional knowledge. If a term can be defined only by referring to another Skill's private context, standalone sufficiency is broken.

A Glossary does not replace methodology. Definitions establish semantic anchors; HOW still explains relationships, evidence, trade-offs, failure, correction, and consequence.

### Prompt/knowledge vs deterministic code

Use code only where exact repeatability is the mechanism. Keep a decision in Prompt/Context when correctness depends on semantic interpretation or judgment.

| Mechanism | Canonical home | Reason |
|---|---|---|
| interpret intent, evidence, trade-offs, authority, or failure meaning | `SKILL.md` / reference | meaning is the mechanism |
| teach a decision model or counterexample pattern | `SKILL.md` / reference | transfer depends on language/context |
| exact schema validation, lookup, transport, transformation, arithmetic | script/tool/schema | repeatability is the mechanism |
| verify that required fields/terms/files exist | script/test | structural predicate is deterministic |
| decide whether the Skill's judgment is good | behavioral evaluation | code/validators cannot substitute for model execution |

If a proposed script must embed subjective weights, hidden policy, or semantic branch choices merely so a test can assert them, treat that as a design smell: first express the governing semantics in Prompt/Context, then automate only the exact sub-mechanic that remains.

## Decision packets: teach HOW, not only WHAT

For each material non-obvious decision, encode the smallest packet that lets the agent act rather than merely inspect:

```text
CUE / INPUT      what evidence or situation makes this decision material
MECHANISM        variables/relationships that control the decision
SELECTION        how evidence changes the chosen option or action
FAILURE          counter-signal showing the method was misapplied or is insufficient
CORRECTION       where to re-enter or what to change
CONSEQUENCE      what completion/proof state follows
```

Not every rule needs all six labels. They are a completeness test: if the Skill says "check X" but does not explain how X changes a decision, the teaching is probably shallow.

## HOW + SHOW

**HOW** is the reusable mechanism. **SHOW** is a concrete pattern transfer that demonstrates applying it. SHOW is not decorative example content: when judgment is ambiguous, it should expose enough `evidence -> reasoning -> disposition -> correction/re-entry` to distinguish a plausible near-miss from the intended expert decision.

Use HOW whenever domain expertise is part of the claimed capability. Add SHOW when any of these are true:

- several plausible interpretations would satisfy the prose but lead to different actions;
- the quality bar depends on pattern recognition rather than exact mechanics;
- a common near-miss looks superficially correct;
- a judgment requires seeing evidence -> reasoning -> disposition, not just the final format.

Prefer the smallest useful demonstration:

- worked case for a normal application;
- contrastive good/bad pair when distinguishing a near-miss matters;
- counterexample when an obvious heuristic should be rejected;
- failure/re-entry example when recovery is part of the capability.

Do not force examples into deterministic mechanics, pure ownership/control rules, or cases already made exact by a schema/script. A demonstration must teach a transferable relation, not merely restate the rule with nouns changed.

## Representation selection

Choose the smallest faithful representation for the reasoning shape.

| Reasoning shape | Prefer | It earns its cost when... | Avoid |
|---|---|---|---|
| One invariant / local rule | concise statement, optional rationale | the rule and important exception fit locally | a table with one row |
| Ordered procedure | numbered steps + local completion/re-entry | order or checkpoints change correctness | a graph that only restates sequence |
| Branching choice | decision table/tree | mutually exclusive conditions choose different actions | prose with buried if/else clauses |
| Governed lifecycle/state | state/transition table or compact state graph | legal transitions, guards, or re-entry matter | a state machine used only as a router |
| Interacting dimensions/trade-offs | matrix | multiple variables must be compared together | separate bullets that hide interactions |
| Ownership/dependency/causal relations | typed graph | relation type and traversal materially change reasoning | unlabeled arrows or decorative topology |
| Pattern transfer / judgment | worked or contrastive example | seeing application changes judgment quality | examples that only paraphrase the rule |
| Dynamic/supporting context | tagged/sectioned block + precise pointer | provenance/boundary or conditional loading matters | dumping all context into `SKILL.md` |
| Exact repeatable mechanics | schema/script/tool | exactness/repetition is safer outside prose | fragile pseudo-code when a deterministic helper is justified |

### Typed graph discipline

Use a graph only when the edge meaning matters. Name the relation and direction; include a compact legend when more than one relation exists.

```text
[User goal] --TRIGGERS--> [Capability]
[Observed symptom] --REQUIRES_DIAGNOSIS_OF--> [Prompt / Context]
[Boundary uncertainty] --LOAD_WHEN_MATERIAL--> [Capability Boundary reference]
[Changed instruction] --FALSIFIED_BY--> [Representative eval case]
```

The graph above encodes different semantics. A sequence such as `inspect -> edit -> test` should stay a numbered procedure unless the edges carry more meaning than order. Do not turn graphs into a central owner/router topology merely because many Skills exist.

## Activation semantics

A useful conditional pointer contains:

```text
WHEN    this knowledge becomes decision-material
WHY     the decision/check it supports
TARGET  the exact resource to load
RETURN  the smallest decision/state/evidence update the parent workflow consumes
```

`RETURN` is an integration contract, not a request to summarize the resource. It names what the caller must bring back into the active reasoning state and which decision/gate can change because of it. If a reference can be read without producing any material return, the load is probably optional context rather than decision-required depth.

A loaded knowledge module inherits the parent capability boundary and authority. Its `RETURN` may refine the parent job's decision, state, evidence, or bounded artifact semantics; it must not silently widen the accountable job, grant another owner's authority, or introduce implementation/provider mechanics the parent explicitly does not own. Apply adjacent knowledge to the parent outcome when it changes correctness. If the remaining decision itself belongs to another outcome/authority, return that exact need/evidence to the parent workflow and compose or hand off the foreign decision rather than absorbing it; continue any parent work that is not blocked by that dependency.

If knowledge is required in almost every execution, keep it in the universal control surface instead of hiding it behind a pointer. Keep detailed references directly reachable from `SKILL.md`; avoid multi-hop reference chains that make the material easy to miss. Where deterministic data/search is the chosen representation for a taxonomy or lookup corpus, do not silently maintain a competing prose catalog as another active truth; keep prose for the distinct HOW/SHOW/caveat value it actually owns.

## Context horizon

Future-phase detail can create premature execution or completion pressure. Reveal deep context only when the current decision frontier makes it useful.

```text
current deep context
    -> preserve the smallest still-material checkpoint
    -> shed irrelevant detail
    -> activate the next required depth
```

This is relevance management, not owner routing. A future reference may be discoverable without being loaded early; the universal surface should contain only the shallow checkpoint needed to know *when* to load it.

## Co-location, hierarchy, and salience

Keep together information that must be applied together:

```text
definition + governing rule + important failure/exception + completion consequence
```

Use Markdown headings/lists to expose hierarchy. Use explicit tagged/sectioned blocks when a context boundary, provenance, or metadata must remain distinguishable from instructions. Put a rule at the decision point where omission would cause the failure; a correct rule spread across distant files is still an execution defect if the agent is unlikely to connect it in time.

Instruction priority is semantic, not typographic. Use explicit levels only when priority changes execution:

| Level | Use for | Behavior |
|---|---|---|
| **CRITICAL INVARIANT** | safety, authority, evidence truth, completion integrity, or another rule whose violation makes the claimed outcome invalid | must hold; if impossible, stop/return the affected truth as blocked or unresolved |
| **DECISION RULE** | evidence-sensitive selection logic that determines one action/disposition over another | apply at the named decision frontier; revise when its premises change |
| **HEURISTIC** | useful default, economy rule, or preference with legitimate exceptions | follow unless stronger local evidence/reasoning justifies a different choice |

Do not promote every recommendation into an invariant. Excessive hard language flattens salience and can make the Agent optimize for avoiding violations instead of completing the job well.

For focus:

- lead with the decision-relevant term, not historical explanation;
- state one semantic rule once, then point to it rather than cloning it;
- keep examples next to the mechanism they demonstrate or directly referenced from it;
- use positive steering and an observable completion consequence;
- use negative scope only for a real adjacent confusion;
- reserve hard gates for material authority, safety, evidence, or irreversible consequences.
- when “smallest”, “minimal”, “only”, or “do not widen” appears, verify that the phrase limits unnecessary work rather than deleting a hard case, recovery path, or adjacent interaction required by the accountable outcome.

## Pruning and duplication

Pruning test:

> If this instruction disappears, what material behavior, decision, safety boundary, or proof state changes?

If no answer exists, remove or consolidate it. Within one Skill/context surface, do not duplicate the same semantic relationship in prose + graph + table unless each representation answers a different decision. One local canonical rule plus precise local pointers is stronger than repeated near-duplicates that can drift.

Do not extend this pruning rule into abstract DRY across independently invokable Skills. If a sibling Skill is not guaranteed to be active, it cannot be the sole home of reasoning that the current Skill needs to make its own decision correctly. A compact local restatement is justified when removing it would weaken standalone behavior. Prune cross-Skill overlap only for a concrete correctness, boundary, context, or maintenance defect; otherwise preserve local methodological sufficiency.

## Authoring diagnostic cases

Use only the cases material to the changed claim, but include enough variation to falsify it:

- positive direct trigger and indirect trigger;
- near-miss/non-trigger;
- incomplete input that should ask, stop, or remain unresolved;
- important rule is reachable and salient at the decision point;
- branch-specific reference is not needed before its WHEN condition becomes material;
- future-phase context does not cause premature mutation/completion;
- duplicate instruction copies inside one active context do not create competing truth, while independently invoked Skills retain any compact local rule required for standalone correctness;
- a Skill still performs its accountable job when a sibling with similar knowledge is not loaded, unless guaranteed composition is part of the runtime contract;
- a representation choice exposes a branch/state/interaction/relationship that prose hid;
- graph edges are typed and materially useful rather than decorative;
- HOW explains the decision mechanism and SHOW distinguishes at least one realistic near-miss when pattern transfer is material;
- after removing prohibitions, the remaining positive mechanism still supports a good ordinary decision plus at least one material failure/edge case and correction;
- scope remains narrow by accountable outcome while retaining deep handling of outcome-material adjacent effects, hard cases, and recovery;
- critical invariants, decision rules, and heuristics are distinguishable when their priority changes execution rather than being emphasized uniformly;
- removing a no-op sentence does not change expected behavior;
- a Skill with material branching/state/dependency logic does not require the model to reconstruct that structure from long prose;
- a conditional reference has a material `RETURN` into the parent decision/workflow rather than ending at "read this file";
- a simple invariant is not inflated into a decorative universal schema/state machine;
- deterministic lookup data and prose depth do not silently maintain competing copies of the same active taxonomy;
- edge cases avoid inventing facts, unsupported actions, or false proof.

Refine discovery metadata when activation is wrong. Refine universal/conditional instructions when the correct Skill activates but reasoning or output is wrong. Refine representation when the knowledge is correct yet relation/focus remains hard to recover. Refine evidence only when the evaluation cannot falsify the actual claim.
