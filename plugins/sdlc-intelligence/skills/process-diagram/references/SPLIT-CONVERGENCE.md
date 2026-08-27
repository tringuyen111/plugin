# Split and Convergence Construction

Use this when a process contains a material choice, optional subset, concurrent fork, reconvergence, synchronization, or nested branch scope. Construct the process semantics first; only then choose gateway/decision notation and coordinates.

## Contents

1. [Model a branch scope, not two gateway symbols](#1-model-a-branch-scope-not-two-gateway-symbols)
2. [Construct the activation contract](#2-construct-the-activation-contract)
3. [Construct every branch lifecycle](#3-construct-every-branch-lifecycle)
4. [Construct the convergence contract](#4-construct-the-convergence-contract)
5. [Close nested scopes from the inside out](#5-close-nested-scopes-from-the-inside-out)
6. [Decide whether a convergence exists at all](#6-decide-whether-a-convergence-exists-at-all)
7. [Translate the scope into Flowchart or BPMN](#7-translate-the-scope-into-flowchart-or-bpmn)
8. [Compose the branch block spatially](#8-compose-the-branch-block-spatially)
9. [Worked transfer cases](#9-worked-transfer-cases)
10. [Diagnose and re-enter](#10-diagnose-and-re-enter)

## 1. Model a branch scope, not two gateway symbols

Treat every material split as opening a **branch scope** with four coupled truths:

```text
SCOPE
  activation contract
      -> branch lifecycles
          -> convergence contract
              -> common continuation or independent outcomes
```

The split answers **which branches become active**. The convergence answers **what completed branch set is sufficient for the next common continuation**. These decisions are related through one scope, but they are not chosen by visual symmetry.

Before drawing, name the scope in process language:

```text
scope: onboarding checks
activation: all three checks start
branches: IT / Facilities / HR
convergence: continue only after all three complete
continuation: Ready for first day
```

If those statements cannot be made truthfully, the split/join design is not ready for notation.

## 2. Construct the activation contract

Start from the business activation rule, not from a gateway icon.

| Activation truth | Active branch set | Semantic construction |
|---|---|---|
| exactly one condition can continue | one branch | exclusive choice |
| one or more conditions may independently apply | selected subset | inclusive choice |
| every branch starts | fixed full set | parallel fork |
| first of several events determines continuation | one event-selected path | event-based choice; unsupported by current executable BPMN subset |

Write the activation contract as a sentence that can be falsified:

- “Exactly one of Approve or Reject becomes active.”
- “Legal, Security, and EDD each become active only when their own condition applies; any non-empty subset is possible.”
- “IT, Facilities, and HR all start after the employee record exists.”

Do not move to convergence yet. First make the active set explicit.

## 3. Construct every branch lifecycle

For each branch, model its local lifecycle independently before reconnecting it to siblings.

Use this compact branch record when the branch is non-trivial:

```text
branch:
  activation condition / reason
  entry action or event
  local work spine
  nested choice/concurrency if any
  local outcome
  completion signal for the enclosing scope
  terminates / rejoins / loops / escalates
```

Ask what makes **this branch complete for its enclosing scope**. A branch may contain several internal steps; the outer join must wait for the branch completion, not an arbitrary first activity.

Example:

```text
IT branch
  provision account
      -> verify access
          -> branch complete
```

The outer onboarding synchronization must therefore sit after `verify access`, even if Facilities and HR each have only one activity.

A branch that terminates the process, escalates elsewhere, or loops back may not contribute a completion signal to a common convergence. Model that explicitly instead of forcing every branch to return.

## 4. Construct the convergence contract

Now decide what the common continuation requires from the active branch set.

A useful thought experiment is:

```text
A = branches activated by the split
D = activated branches that have completed
```

The common continuation becomes valid only when the convergence contract is satisfied.

| Branch scope | Valid continuation condition | Convergence meaning |
|---|---|---|
| exclusive alternatives | the one active branch completes | merge alternatives; no synchronization across inactive branches |
| fixed parallel set | every branch in the fixed set completes | synchronize all concurrent branches |
| inclusive selected subset | every branch that was actually activated completes | synchronize the activated subset only |
| independent terminal/continuing branches | no shared continuation exists | no convergence |

For exclusive alternatives, a common action can itself be the reconvergence target when the notation does not require a separate merge node. The important truth is that **whichever one branch was activated completes, then common work resumes**.

For parallel work, the continuation is not valid after “any branch completes”; it becomes valid only after all branches in that fork scope have completed.

For inclusive work, the convergence must remember the selected active subset conceptually: it waits for all selected branches and never waits for a branch that was not activated.

### Continuation-first check

A reliable construction move is to identify the first truly common continuation and work backward:

1. What action/event is common after the branch scope?
2. What branch completions must be true before it may start?
3. Which branches could actually have been active together?
4. Therefore what convergence contract closes the scope?

This prevents choosing a join merely because several arrows can be made to meet there.

## 5. Close nested scopes from the inside out

Nested branching is easiest to reason about as a scope tree, not a flat gateway list.

```text
OUTER parallel scope
  |- Legal branch -> Legal complete
  `- Operations branch
       `- INNER exclusive scope
            |- Automated setup
            `- Manual setup
          -> inner merge
       -> Operations complete
-> outer parallel join
-> Release
```

Construction rule:

1. Open the outer branch scope.
2. When a branch contains another split, open a child scope inside that branch.
3. Close the child scope at the first continuation shared by that child scope.
4. Treat the child scope's completed result as ordinary progress inside the parent branch.
5. Close the parent scope only after every completion required by the parent convergence contract is available.

The local exclusive merge is therefore **not** a substitute for the outer parallel join. It only proves the Operations branch has resolved its own alternatives.

For deeper nesting, repeat the same inside-out closure. Each convergence closes one semantic scope unless the source explicitly defines a gateway with a different combined role.

## 6. Decide whether a convergence exists at all

Do not assume every split rejoins.

A shared convergence exists only when the process has a **shared continuation whose preconditions are defined across the branch scope**.

Common cases with no convergence:

- each alternative ends in a different terminal business outcome;
- one branch escalates to another process/owner while another continues locally;
- a fire-and-forget branch continues independently and is not required for the main path;
- a branch intentionally loops to an earlier scope rather than completing into this one.

Example:

```text
Payment valid? --Yes--> Fulfil order --> Completed
              `--No--> Reject payment --> Rejected
```

If `Completed` and `Rejected` are distinct terminal outcomes, there is no reason to add a merge merely to make the diagram visually symmetric.

## 7. Translate the scope into Flowchart or BPMN

### Flowchart

The current Flowchart arm represents **exclusive conditional branching**, not BPMN-style concurrency synchronization.

Construct it as:

```text
Decision
  |- condition A -> branch A -\
  `- condition B -> branch B --+-> first common continuation
```

The `decision` owns the split. The first real common process step can own reconvergence. Keep both branch connectors independently attributable until that target. Do not invent a synchronization gateway that the Flowchart subset does not have.

If the process meaning requires all concurrent branches, selected-subset synchronization, participant messaging, or event semantics, use BPMN instead of stretching Flowchart notation.

### BPMN

Map the already-constructed scope semantics:

| Constructed meaning | BPMN representation |
|---|---|
| exactly one branch activates | exclusive gateway split |
| exclusive alternatives reconverge | exclusive merge or direct common continuation where unambiguous |
| all branches activate | parallel gateway split |
| wait for all forked branches | parallel gateway join |
| one or more branches activate | inclusive gateway split |
| wait for all branches actually selected | inclusive gateway join |
| first event wins | event-based gateway; current executable subset does not support it |

Choose split and join types from activation/convergence contracts, not by copying the same icon mechanically. Matching types are common because the semantic scopes often match, but the reason is the process contract, not visual pairing.

## 8. Compose the branch block spatially

After semantics are stable, make the scope readable as one spatial unit. Design the **branch block first**; exact connector coordinates are the last projection of that design.

### Step 1 - anchor the split and continuation

Place the split at the last shared prerequisite. Identify the first shared continuation or final outcomes before placing branch interiors. This establishes the two P-side boundaries of the scope.

### Step 2 - give each active sibling its own lateral territory

Use Q for branch separation. Branch peers should read as peers, not as a staircase of fake temporal milestones. Start their first material actions from the same local phase when semantics permit.

```text
                branch A ---- work ----\
split ---------- branch B -----------  > convergence -> continuation
                branch C -- work -----/
```

Unequal branch depth is allowed. Do not compress a longer branch merely to make shapes line up. Treat each branch territory as an owned strip/region that remains visually attributable from entry through its local completion.

### Step 3 - reserve entry and convergence fronts before routing

A multi-branch scope needs empty P-space in which routes can become distinct **before** they collide with branch bodies, and empty P-space in which completed branches can approach convergence without collapsing into a cable bundle. Reserve these two zones deliberately:

```text
split | branch-entry front | branch bodies ... branch completions | convergence front | join/common continuation
```

Do not start by drawing connector bends. First ask whether the current node placement leaves enough open front for the number and Q-spread of material branch routes. Use `measure` to inspect the split/first-branch and completion/convergence rectangles. If the open front is cramped, change lane order, `stage`/`track`, or the convergence placement before routing.

The decision is relational, not a branch-count formula: a scope whose branches occupy more Q territory, carry labels, or cross responsibility bands needs more front depth than a compact local choice. If the only way to distinguish routes is to place several long parallel legs almost on top of each other, the front is undersized. Increase the spatial budget instead of micro-offsetting lines.

### Step 4 - place convergence after the required completions

The convergence belongs after the last **causally required completion**, not after the visually longest connector. For a parallel/inclusive synchronization, all required branch completion points must feed it. For exclusive alternatives, the common continuation begins after whichever active branch completes.

Place the convergence far enough beyond those completion points to preserve the convergence front from Step 3. A join that is semantically correct but squeezed against the branch bodies is still a poor composition.

### Step 5 - construct a nested fan from branch territories

Now route only the edges whose identity is material. Build/measure the placed plan, inspect source/target rectangles and terminal faces, then derive each corridor from the **branch territory and available front**, not from gateway type, lane index, or branch count.

Think of one route as:

```text
source face
  -> breakout within the entry front
  -> branch-owned corridor
  -> branch completion
  -> approach within the convergence front
  -> target face
```

For several sibling branches, construct the set together rather than edge-by-edge. Order siblings by their Q territories, then use the available P front to create a **nested fan**: routes to farther Q territories should not all turn on adjacent P coordinates, and approaches from those territories should not all rise/fall on adjacent P coordinates before the join. Spread the turning fronts across the available gap so the reader can follow each branch as a separate path.

This is a relation, not a fixed recipe. A valid fan can use different sides, different P turning positions, or a larger spatial block. What must remain true is:

```text
semantic split
  -> visibly distinct branch entry
  -> owned branch territory
  -> branch completion
  -> visibly distinct convergence approach
  -> semantic convergence
```

Project the fan with the highest-level controls that preserve the branch relation: lane ordering, branch placement, `stage`/`track`, then explicit `fromSide` / `toSide` when the branch territory makes a face material. Do not solve a cramped split by encoding pixel bends. In BPMN, if a material route relation still collapses after those controls and rendered inspection, report a `translator-gap`; the current canonical plan intentionally does not persist interior waypoints.

A useful self-check is to hide the node labels and inspect only the branch geometry. If the routes read as one dense comb, two cable columns, or one apparent mainline with decorative side branches, recompose the lane order/fronts/territories rather than tuning connector micro-offsets.

### Step 6 - keep local and outer joins visually nested

Place a local child convergence near its child branch block. Give the parent branch a clear completion segment before it reaches the outer convergence. This creates a visible hierarchy of scopes rather than one dense knot of gateways.

### Step 7 - return to the dominant spine only after closure

The common continuation should re-enter the main P progression after the scope closes. Branch internals spend local P/Q territory; they do not each become independent global milestones unless the reader task needs that chronology.

## 9. Worked transfer cases

### Case A - exclusive alternatives with common work

Intent:

```text
Return request
-> eligible?
   |- yes -> Approve
   `- no  -> Reject notice
-> Record disposition
-> Notify requester
```

Construction:

- active set: exactly one of `Approve`, `Reject notice`;
- each branch completes after its one action;
- convergence: whichever active branch completes;
- `Record disposition` is the first common continuation;
- Flowchart can connect both branch actions directly to `Record disposition` without inventing synchronization.

### Case B - asymmetric parallel synchronization

Intent:

```text
Create employee
-> all start:
   IT: provision -> verify
   Facilities: badge
   HR: orientation
-> Ready for first day
```

Construction:

- active set: all three;
- IT completion is after `verify`, not after `provision`;
- convergence waits for IT complete + Facilities complete + HR complete;
- BPMN parallel split and parallel join express the scope;
- spatially, keep branch starts peer-aligned while allowing IT to extend farther in P;
- reserve an entry front between the fork and the three first branch actions, plus a convergence front between the three completion points and the join; if one normal stage gap makes the cross-lane fan read as adjacent cable columns, move the branch front/join before routing;
- choose lane order as communication composition rather than chronology. If the fork/join owner can sit between sibling branch lanes without changing responsibility meaning, that can give upper / straight / lower branch territories and reduce one-sided fan pressure; do not force the owner to the middle when another order communicates responsibility better;
- choose endpoint sides from those territories after spacing is stable. Keep a straight branch straight when that is the clearest relation and let upper/lower branches enter their own territories; do not derive sides from gateway type, lane index, or branch count inside mechanics;
- omit a gateway caption when the symbol plus adjacent actions already makes the split/join meaning clear and the caption would only compete with connector geometry;
- if rendered BPMN routing still collapses branch identity after this composition, record a translator gap rather than introducing pixel route coordinates.

### Case C - inclusive selected subset

Intent:

```text
Screen customer
-> activate any applicable reviews:
   Legal if cross-border
   EDD if high risk
   Security if integration
-> Final approval after every selected review completes
```

Construction:

- active set is a non-empty selected subset;
- each selected review has its own completion;
- convergence waits exactly for the selected set;
- BPMN inclusive split + inclusive join preserve this contract;
- do not route all three as mandatory parallel work or allow approval after only the first selected review.

### Case D - nested exclusive scope inside parallel work

Intent:

```text
Intake
-> parallel:
   Legal preparation
   Operations:
      automated?
        |- Automated setup
        `- Manual setup
      -> Operations complete
-> Release after Legal + Operations complete
```

Construction:

- outer active set: Legal + Operations;
- inner active set: exactly one Operations setup alternative;
- inner merge closes only the Operations choice;
- Operations branch then emits one completion to the outer scope;
- outer parallel join waits for Legal completion plus Operations completion.

### Case E - split with no merge

Intent:

```text
Fraud confirmed?
  |- yes -> Terminate account -> Closed for fraud
  `- no  -> Resume service   -> Active
```

Construction:

- exactly one branch activates;
- terminal outcomes differ;
- there is no shared continuation;
- keep the two outcomes separate rather than adding a decorative merge.

## 10. Diagnose and re-enter

When a split/convergence result looks wrong, diagnose the earliest broken layer:

| Symptom | Re-enter at | Correction |
|---|---|---|
| gateway type seems wrong | activation/convergence contract | recompute which branches can be active together and what continuation waits for |
| outer join ignores work inside one branch | branch lifecycle | move branch completion to the true local outcome |
| nested gateways form one ambiguous knot | scope tree + spatial block | close child scope locally, then expose one branch completion to the parent |
| branches look serial although concurrent | spatial projection | align peer starts and separate in Q; do not rewrite concurrency semantics |
| routes visually merge before the real join | connector projection | preserve independent route identity until semantic convergence |
| every branch is forced back together | existence of shared continuation | remove the convergence when outcomes/continuations are intentionally independent |

Do not repair a semantic scope defect by moving coordinates, and do not reopen process semantics for a connector-only defect once the scope contract remains valid.
