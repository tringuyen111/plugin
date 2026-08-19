# Reader Task and Execution

Use this reference when the guide must help a reader **do** something or recover from a concrete failure. The core transformation is not prose generation; it is translating verified product state/action semantics into a human-operable path.

## 1. Reader-task contract

Model only variables that can change the path:

```text
READER SITUATION
  goal
  + entry state
  + material knowledge/permission/constraint
        -> PATH
        -> OBSERVABLE SUCCESS / SUPPORTED UNDERSTANDING
```

- **Goal** is the outcome the reader wants, not the screen they must visit.
- **Entry state** is the state from which the documented path is valid.
- **Constraints** include only knowledge, role/permission, product state, environment, or consequence that actually changes action.
- **Success** is observable when possible: a state, message, artifact, behavior, or verified understanding sufficient to stop.

If the same instructions would be correct for materially different entry states, the model may be over-specified. If a different state would change the action but the guide never distinguishes it, the model is under-specified.

## 2. Build the primary path as state transitions

Reason about a meaningful step as a compact packet:

```text
CONDITION / LOCATION
      -> ACTION
          -> OBSERVABLE RESULT
              -> NEXT STATE / DECISION
```

Do not expose all four fields mechanically. Use them to decide what the reader actually needs.

- Include **condition/location** when the action would otherwise be ambiguous or unsafe.
- Name the **action** using supported terminology and the real control/command/object.
- Include the **observable result** when it confirms success, reveals a branch, or is needed to diagnose failure.
- Continue only from the state the previous supported action actually establishes.

A procedure is therefore not `click A -> click B -> click C`; it is a sequence of verified state changes with enough observation for the reader to know whether to continue.

## 3. Select one primary method before adding alternatives

When UI, CLI, API, or multiple product paths are all valid, compare them against the named reader and situation:

| Variable | Question |
|---|---|
| audience fit | Which method matches the reader's expected tools/knowledge? |
| verified support | Which path is actually supported at the fixed point? |
| path cost | Which reaches success with fewer material decisions/failure points? |
| consequence | Does one path expose higher-risk or less reversible behavior? |
| repeatability/scale | Is this a one-off human task or repeated/bulk operation? |

Choose the shortest faithful primary path. Add an alternative only when a material reader segment or constraint needs it; state the selection rule before the alternative path.

**Near miss:** listing UI, CLI, and API as three equal full procedures because all exist. This increases choice cost without helping the named reader decide.

## 4. Branch on observable discriminators, not author knowledge

A branch is earned when a condition the reader can determine changes the valid action.

```text
observed condition?
   |-- A --> supported path A
   `-- B --> supported path B
```

Place the discriminator before the divergent action. Prefer one shared prefix/suffix around a bounded branch rather than duplicating the whole procedure.

Bad branch: "If needed, use the other method."  
Better branch: "If **Account type** is `Managed`, stop this local reset path and use the identity-provider recovery procedure. If it is `Local`, continue with **Reset password**."

The concrete labels above are examples only; real wording must come from project evidence.

## 5. Put prerequisites and warnings at the decision point

A prerequisite belongs before the first step that depends on it. A warning belongs before the consequential action it governs, not in a detached note after the outcome.

Use a warning only for a supported consequence that can materially change the reader's decision (irreversible deletion, data loss, security/permission effect, service impact, etc.). Do not add generic caution text without product truth.

## 6. Treat an unexpected result as a new reader state

Troubleshooting starts from what the reader observes, not from a generic list of possible causes.

```text
OBSERVED SYMPTOM
      -> DISCRIMINATING CHECK
          -> SUPPORTED CAUSE/PATH
              -> RECOVERY | ESCALATION | KNOWN DEFECT
```

Prefer the smallest check that changes the next action. A symptom may have several plausible causes; do not assert one without supporting evidence.

If no supported recovery exists, terminate the path truthfully at escalation/known defect rather than inventing "try again", cache-clearing, permission changes, or workarounds.

## 7. Compress the reasoning into reader-facing information

The internal model may contain states, branches, evidence, and decision logic. The output should expose only what helps the reader act or understand.

### Worked normal path

Evidence says a support agent can unlock a local account and success is visible as `Active`.

Internal reasoning:

```text
entry: correct account open + authorized role
-> Unlock
-> confirmation for this account
-> Confirm
-> status Active
```

Reader-facing output can be short: establish the required starting context, give the two supported actions, and tell the reader to stop when the supported success state appears. Do not narrate the internal state model.

### Contrastive failure path

Weak:

```text
If it does not work:
- Try again.
- Check your permissions.
- Contact support.
```

Stronger when evidence supports it:

```text
If the expected success state does not appear, first check the specific validation/role/account-state signal that distinguishes the next action. Apply only the recovery supported by that signal. If no supported path remains, escalate with the evidence the receiving owner needs.
```

The stronger form is not longer by default; it is causally connected.

## 8. Failure signatures and correction

| Failure | What went wrong | Correction |
|---|---|---|
| screen tour | organization follows UI inventory, not reader goal | rebuild from goal -> entry -> success |
| button dump | actions have no state/observation semantics | add only material results/decision points |
| branch soup | every edge case becomes a full alternate procedure | identify the first observable discriminator and share common path |
| alternative dump | several methods are listed equally | choose a primary method or state a selection rule |
| warning after action | consequence cannot affect the decision | move supported warning before governed action |
| generic troubleshooting | causes/recoveries are not tied to observed evidence | start from symptom -> discriminating check -> supported recovery |
| fake recovery | product has no supported path | state limitation/known defect/escalation truthfully |
| over-modelled prose | internal reasoning is copied into the guide | compress to only reader-useful context/action/result/choice |

Re-enter at the earliest broken relation. Wrong product truth invalidates the path; a bad branch does not require re-researching unrelated claims; a poor page structure does not authorize changing product behavior.
