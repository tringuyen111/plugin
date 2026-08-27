# Learning Test

Use this module only when one unresolved assumption can kill or materially change the Product Discovery recommendation and more learning is justified. Return a pre-bound decision-useful learning contract; do not invent an execution provider, owner, or capability.

## Bind the learning contract before execution

```text
Material assumption
-> Learning question
-> Method / evidence source
-> Relevant participant / population / system state
-> Discriminating evidence
-> Decision rule defined before observing the result
-> Known limitations / transferability
-> Canonical execution owner/capability, only when project truth supplies one
```

The goal is the **smallest decision-useful test**, not the cheapest activity. A cheaper method that cannot discriminate the critical assumption is exploratory/weak evidence, not validation.

## Choose discriminating evidence

Ask what result would actually separate competing explanations or change the recommendation. Preference statements may be weak when the uncertainty concerns real behavior, frequency, switching cost, adoption, task failure, or operational evidence.

A valid test makes at least one outcome consequential:

```text
result A -> advance/preserve frame
result B -> weaken/park/reframe
result C -> unresolved; name next evidence need
```

## Bind the rule before seeing results

When material, define before execution what evidence would strengthen, weaken, or leave the opportunity unresolved. If the rule changes after favorable evidence appears, preserve that post-hoc change as a limitation and downgrade confidence rather than pretending the original rule was met.

## Ownership and execution

Product Discovery owns the learning need and evidence semantics. It may name cross-owner assumptions but must not invent a provider, team, Skill, technical truth, or execution path. If execution is required by the current scope and no canonical owner/capability exists, return the execution-capability gap explicitly.

## Failure / correction

| Failure | Correction |
|---|---|
| cheap survey chosen for behavioral uncertainty | choose evidence capable of discriminating the actual behavior question |
| test collects more stories but cannot change the recommendation | restate competing explanations and bind discriminating evidence |
| threshold invented after seeing favorable result | mark post-hoc rule, downgrade confidence, rerun/predeclare when material |
| execution owner/provider invented to keep work moving | return the capability/authority gap without fabricating routing |

## Return contract

Return:

```text
material assumption
learning question
evidence source / method
discriminating evidence
pre-bound decision rule
limitations / transferability
execution need or capability gap, if execution is in scope
```

Do not return Product scope, behavior semantics, or another owner's truth.
