# Prompt / Context Expression Contract

Design the information environment so the agent can retrieve the right rule, understand how concepts relate, and make the intended decision at the point of use. Token minimization is secondary to correct cognition; extra prose is justified only when it changes behavior.

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

**HOW** is the reusable mechanism. **SHOW** is a concrete pattern transfer that demonstrates applying it.

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
TARGET  the resource to load
```

If knowledge is required in almost every execution, keep it in the universal control surface instead of hiding it behind a pointer. Keep detailed references directly reachable from `SKILL.md`; avoid multi-hop reference chains that make the material easy to miss.

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

For focus:

- lead with the decision-relevant term, not historical explanation;
- state one semantic rule once, then point to it rather than cloning it;
- keep examples next to the mechanism they demonstrate or directly referenced from it;
- use positive steering and an observable completion consequence;
- use negative scope only for a real adjacent confusion;
- reserve hard gates for material authority, safety, evidence, or irreversible consequences.

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
- removing a no-op sentence does not change expected behavior;
- edge cases avoid inventing facts, unsupported actions, or false proof.

Refine discovery metadata when activation is wrong. Refine universal/conditional instructions when the correct Skill activates but reasoning or output is wrong. Refine representation when the knowledge is correct yet relation/focus remains hard to recover. Refine evidence only when the evaluation cannot falsify the actual claim.
