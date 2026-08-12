---
name: wayfinder
description: Plan work larger than one agent session as a canonical map of decision tickets, using the project-selected tracker capability and explicit fallbacks rather than provider assumptions.
---


<!-- runtime-context:start -->
## Runtime context

- **Before returning a final result or cross-owner handoff:** read [Workflow Result Contract](../../resources/shared/references/workflow-result-contract.md) to map specialized states and unverified checks to truthful workflow completion.
- **When another role, approval authority, or conflicting artifact could change the decision:** read [Role Boundary Reference](../../resources/shared/references/role-boundary-reference.md) to preserve the canonical owner and announce role transitions.
- **Before persisting, superseding, or handing off a project artifact:** read [Artifact Linking Reference](../../resources/shared/references/artifact-linking-reference.md) to link source truth, unresolved items, evidence, affected artifacts, and the next owner without creating shadow status.
- **Before any local/external write, source-control action, deployment, destructive operation, or external communication:** read [External Side-Effect Policy](../../resources/shared/references/external-side-effect-policy.md) to check authority and report the exact side effect, fallback, and limitation.
- **Before choosing a tracker, repository action, storage location, browser, connector, provider, or tool fallback:** read [Project Capability Profile Reference](../../resources/shared/references/project-capability-profile-reference.md) to resolve project truth, live capability, policy, and availability instead of assuming a provider.
<!-- runtime-context:end -->
A loose idea has arrived — too big for one agent session, and wrapped in fog: the way from here to the **destination** is not visible yet. Wayfinding charts that route as one canonical **shared map** plus decision tickets, then resolves them one at a time until the route is clear.

Before loading or changing the map, read [Tracker Capability Contract](../../architecture/capabilities/TRACKER-CAPABILITY-CONTRACT.md) and resolve the exact `tracker.*` capabilities through `/capability-resolver`. If the Project Capability Profile does not name a canonical work owner and artifact convention, return `BLOCKED`; never create a second map or local ledger by default.

The destination varies per effort, and naming it is the first act of charting — it shapes every ticket. It might be a spec to hand off and iterate on, a decision to lock before planning starts, or a change made in place like a data-structure migration. The map is domain-agnostic — engineering work, course content, whatever fits the shape.

## Plan, don't do

**Destination execution is non-overridable.** Wayfinder owns decision/investigation mapping and bounded work that is necessary only to unblock a decision. The map is done when the way is clear — nothing left to decide before the canonical execution owner goes and does the destination work. The pull to deliver the destination is the signal that Wayfinder has reached its ownership boundary and must hand off.

`Notes` may configure domain context, skills to consult, research preferences, and other planning conventions. **Notes do not grant execution, mutation, approval, or decision authority** and cannot transfer another workflow's ownership into Wayfinder.

## Refer by name

Every map and ticket is a canonical work artifact with a **name** — normally its title. In everything the human reads — narration, the map's Decisions-so-far — refer to it by that name, never by a bare id, number, or slug. A wall of `#42, #43, #44` is illegible; names read at a glance. The id and URL don't vanish — a name wraps its link — but they ride *inside* the name, never stand in for it.

## The Map

The map is one canonical work artifact selected by the project. A provider may represent it as an issue, document, or local Markdown artifact; its decision tickets are linked children or mapped references. The semantic marker is `wayfinder:map`, translated through the provider mapping rather than assumed to be a label.

The map is an **index**, not a store. It lists the decisions made and points at the tickets that hold their detail; a decision lives in exactly one place — its ticket — so the map never restates it, only gists it and links.

**Where the map, tickets, blocking edges, claims, and frontier queries physically live is provider-specific.** Read the project tracker projection's "Wayfinding operations" section. The mapping must state how it represents identity, parent/child links, dependencies, claim/concurrency, comments or resolution records, and close/completion. If any required operation is unavailable, use only an approved mapped fallback and report the limitation; there is no automatic local-Markdown default.

### The map body

The whole map at low resolution, loaded once per session. When the provider supports child/frontier queries, open tickets are not duplicated in the map body. When it does not, the provider mapping may maintain a canonical open-ticket reference section; that section is a projection, not a second status owner.

```markdown
## Destination

<what reaching the end of this map looks like — the spec, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<domain; skills every session should consult; standing planning/research preferences for this effort; never execution or approval authority>

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [<closed ticket title>](link) — <one-line gist of the answer>

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Out of scope

<!-- see "Out of scope": work ruled beyond the destination; closed, never graduates -->
```

### Tickets

Each ticket is a child work artifact or mapped reference of the map; the provider-issued or project-declared stable artifact id is its identity. Its body is the question, sized to one fresh agent context:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries the semantic type `wayfinder:<type>` — one of `research`, `prototype`, `grilling`, `task`. The provider mapping may project that type to a label, field, frontmatter value, or section.

A session **claims** a ticket before work using the provider mapping's atomic claim operation when available. Assignment is one possible projection, not the semantic contract. If atomic claim or safe concurrency is unavailable, do not imply exclusivity: record the limitation, re-read immediately before writing, and avoid parallel resolution of the same frontier.

Blocking is semantic: a ticket is **unblocked** when every blocking ticket is complete; the **frontier** is the open, unblocked, unclaimed set. Use `tracker.link_dependencies` and the provider mapping's native relationship when live discovery confirms it. Otherwise use the approved canonical reference representation and return `PARTIAL` if frontier fidelity or visual queryability is reduced.

The answer isn't part of the body — it's recorded on resolution (see [Work through the map](#work-through-the-map)). Assets created while resolving a ticket are linked from the issue, not pasted in.

## Ticket Types

Every ticket is either **HITL** — human in the loop, worked *with* a human who speaks for themselves — or **AFK**, driven by the agent alone. A HITL ticket only resolves through that live exchange; the agent never stands in for the human's side of it (a grilling agent that answers its own questions has broken this).

- **Research** (AFK): Reading documentation, third-party APIs, or local resources like knowledge bases. Creates a markdown summary as a linked asset. Use when knowledge outside the current working directory is required.
- **Prototype** (HITL): Raise the fidelity of the discussion by making a cheap, rough, concrete artifact to react to — an outline, a rough take, a stub, or UI/logic code via the /prototype skill. Links the prototype as an asset. Use when "how should it look" or "how should it behave" is the key question.
- **Grilling** (HITL): Conversation via the /grilling and /domain-modeling skills, one question at a time. The default case.
- **Task** (HITL or AFK): Bounded prerequisite/evidence work that must happen before a *decision* can be made — nothing to decide, prototype, or research, but the discussion is blocked until it is done. A Task **must not deliver the destination**. Before any task side effect, resolve the exact **semantic capability**, canonical owner/responsibility, authority, live provider, **side-effect policy**, verification, and result contract. If that work belongs to implementation, migration, deployment, Operations, or another canonical workflow, hand it to that owner instead of performing it inside Wayfinder. The agent may execute only an authorized decision-unblocking operation that remains within Wayfinder's bounded prerequisite purpose; otherwise it gives the human or canonical owner the precise unblock checklist/handoff. The resolution records only the resulting facts later tickets depend on and never stores credentials or secret values in the map.

## Fog of war

The map is _deliberately_ incomplete: don't chart what you can't yet see. Beyond the live tickets lies the **fog of war** — the dim view of decisions and investigations you can tell are coming but can't yet pin down, because they hang on questions still open. Resolving a ticket clears the fog ahead of it, graduating whatever's now specifiable into fresh tickets — one at a time, until the way to the destination is clear and no tickets remain.

The map's **Not yet specified** section is where that dim view is written down: the suspected question, the area to revisit later. It's the undiscovered frontier _toward_ the destination — everything here is in scope, just not sharp enough to ticket. Write as loosely or as fully as the view allows; it doubles as a signpost for collaborators reading where the effort is headed.

**Fog or ticket?** The test is whether you can state the question precisely now — _not_ whether you can answer it now.

- **Ticket when** the question is already sharp — even if it's blocked and you can't act on it yet.
- **Not yet specified when** you can't yet phrase it that sharply. Don't pre-slice the fog into ticket-sized pieces: it's coarser than a ticket, and one patch may graduate into several tickets, or none, once the frontier reaches it.

**Not yet specified** excludes what's already decided (Decisions so far), what's already a live ticket, and what's out of scope (the next section).

## Out of scope

Fog only ever gathers _toward_ the destination. The destination fixes the scope, so work beyond it is **out of scope** — it isn't fog, and it doesn't belong in **Not yet specified**. It gets its own **Out of scope** section on the map: work you've consciously ruled out of _this_ effort. Scope, not sharpness, lands it here.

Out-of-scope work never graduates — the frontier stops at the destination — so it returns only if the destination is redrawn, and then as a fresh effort, not a resumption.

Ruling something out of scope is a scoping act, not a step on the route. When a ticket that already exists turns out to sit past the destination — mis-scoped in while charting, or exposed by a resolution — **close it** (a closed ticket is unambiguously off the frontier) and leave one line in the **Out of scope** section: the gist plus why it's out of scope, linking the closed ticket. It stays out of **Decisions so far**, which records the route actually walked — a scope boundary isn't a step on it.

## Invocation

Two modes. Either way, **never resolve more than one ticket per session.**

### Chart the map

User invokes with a loose idea.

1. **Name the destination.** Run a `/grilling` and `/domain-modeling` session to pin down what this map is finding its way to — the spec, decision, or change. The destination fixes the scope, so it's settled first.
2. **Map the frontier.** Grill again, **breadth-first** this time: fan out across the whole space rather than deep on any one thread, surfacing the open decisions and the first steps takeable now. **If this surfaces no fog** — the way to the destination is already clear, the whole journey small enough for one session — you don't need a map. Stop and ask the user how they'd like to proceed.
3. **Create the map** through `tracker.create`, using the provider mapping for the semantic marker `wayfinder:map`: Destination and Notes filled in, Decisions-so-far empty, and fog sketched in **Not yet specified**.
4. **Create the tickets you can specify now** through `tracker.create`, then wire blocking edges through `tracker.link_dependencies` in a second pass after stable identifiers exist. Use the provider's mapped child/reference representation; everything not yet specifiable stays in the map's fog.
5. Stop — charting the map is one session's work; do not also resolve tickets.

### Work through the map

User invokes with a map (URL or number). A ticket is **optional** — without one, you pick the next decision, not the user.

1. Load the **map** — the low-res view, not every ticket body.
2. Choose the ticket. If the user named one, use it. Otherwise take the first frontier ticket in order. Claim it using the mapped atomic claim operation when available; otherwise state the concurrency limitation before continuing.
3. Resolve it — **zoom as needed** through `tracker.read`: fetch related or completed ticket detail on demand and invoke the skills named in `## Notes`. A `task` ticket may execute only the bounded decision-unblocking work permitted by the Task contract above; it cannot use Notes or ticket type as execution authority.
4. Record the resolution through `tracker.update`: persist the answer in the mapped resolution field/comment/artifact, mark the canonical ticket complete through `tracker.change_state`, and append only a context pointer to the map's Decisions-so-far.
5. Add newly surfaced tickets through create-then-link; graduate newly specifiable fog and clear the duplicate fog text. Rule work beyond the destination out of scope. Use bounded `tracker.update` operations and never mirror status into a second store.

The user may run unblocked tickets in parallel, so expect other sessions to be editing the tracker concurrently.

When the decision route is clear, name the **canonical execution owner** and hand the destination to `/to-spec`, `/to-tickets`, `/implement`, an Operations owner, or another exact owning workflow as appropriate. Wayfinder does not execute the destination merely because every decision ticket is closed.

## Completion and integration truth

Record every create, update, claim, relationship, or close operation using the Integration Result Manifest. `READY` requires one canonical map whose frontier can be derived from the provider mapping. Reduced relationship/query/concurrency fidelity is `PARTIAL`; missing canonical ownership or required write authority is `BLOCKED`; partial writes or contradictory canonical state are `FAILED`.
