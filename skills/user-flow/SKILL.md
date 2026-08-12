---
name: user-flow
description: Define an end-to-end user flow from approved use cases, business rules, states, and acceptance criteria. Use when a workflow needs screens or steps, actor decisions, navigation, alternate/error paths, recovery, or state transitions without choosing visual style or technical implementation.
---

# User Flow
<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
<!-- runtime-context:end -->


Translate approved behavior into an experience sequence a user can understand and
complete.

This skill owns user-visible steps, decisions, navigation, state transitions,
and recovery. It does not own visual styling, Figma components, code routing,
backend orchestration, or acceptance verdicts.

Read `USER-FLOW-FORMAT.md` before writing the artifact.

## Process

1. **Read behavior sources.** Use approved Use Cases, Business Rules, Stories,
   AC, NFRs, state/error definitions, and current verified UI when changing an
   existing product.
2. **Resolve journey boundaries.** Name entry point, user goal, success exit,
   failure/recovery exits, and handoffs to another actor or channel.
3. **Map steps and decisions.** Each node is a user action, visible system
   response, decision, or wait state. Do not use hidden method/service calls as
   flow steps.
4. **Map states.** Loading, empty, input, validation, submitting, success,
   permission, external failure, timeout, and retry are included when relevant.
5. **Separate mutually exclusive states.** A success and expired result are
   separate states, not two simultaneous panels in one screen.
6. **Resolve user-visible navigation/continuation semantics when material.**
   Choose the interaction model from the user's task, information semantics,
   position/orientation needs, recovery expectations, and observable state — not
   from a familiar component pattern. A managed operational collection, an
   exploratory feed, and a finite wizard may legitimately use different
   continuation models. Preserve the user-visible contract while leaving cursor,
   offset, page-number query mechanics, cache strategy, and other data-layer
   implementation choices to Technical unless canonical upstream truth fixes
   them. If more than one interaction model remains valid and the choice changes
   user value, record an unresolved experience decision instead of inventing one.
7. **Preserve rule links.** Decisions and transitions reference `BR-*`, `AC-*`,
   and `NFR-*` instead of repeating or weakening them.
8. **Check continuity.** Every branch has an entry, observable result, and valid
   next action or terminal state. For collection-changing actions, include the
   valid observable next state when position, selection, or recovery can become
   invalid. Avoid dead ends unless the requirement explicitly defines one.
9. **Record unresolved experience decisions.** Device, channel, navigation,
   progressive disclosure, and recovery questions have an owner and blocking
   state.

## Completion

`READY` requires journey boundaries, main/alternate/error paths, states,
transitions, recovery, source links, and explicit unresolved decisions. Any
material user-visible navigation/continuation model is justified by task/state
semantics or remains explicitly unresolved; pattern familiarity is not a
justification, and backend pagination/cursor mechanics are not silently promoted
into UX truth. Visual hierarchy and technical architecture remain unchosen.
