# Project Capability Profile Reference

Use profile schema version `4`. `profile_revision` identifies the exact profile revision consumed downstream. Operation authority and approval live in project policy plus its explicit authority provenance; provider resolution must not duplicate or upgrade them.

Read this reference before choosing a tracker, design tool, storage location, browser, repository action, deployment target, connector, MCP server, or fallback.

This reference defines the runtime use of the P0 Project Capability Model. It does not contain active project state and does not make a provider available.

`project.id` is the canonical logical project identity. Every mutating Capability Operation Envelope must target that same logical identity; provider-specific repository, tracker, design, or deployment identifiers belong in provider/resource mappings. A profile for one project must never authorize another project.


## Explicit unknown policy and authority

A required policy field may be `null` only to mean **UNKNOWN / unresolved owner decision**. `null` is not a conservative value and never means permission. The profile keeps the uncertainty visible through:

```yaml
policy:
  authority:
    status: OWNER_APPROVED | PARTIAL | UNRESOLVED
    owner:
    evidence: []
    unresolved_fields: []
```

When `policy.authority.status` is `PARTIAL` or `UNRESOLVED`, every unresolved core policy field is named in `unresolved_fields`. Downstream mutation policy treats an unresolved field required for the operation as missing authority/policy evidence: it must return `REQUIRE_APPROVAL` or `BLOCK` according to the operation contract, never `ALLOW`. Do not persist a guessed restrictive boolean/budget merely to satisfy schema validation.

`project.type` and `project.lifecycle_stage` may also be `null` when source evidence does not establish them. A null classification is explicit missing context, not permission to invent a taxonomy.

## Resolve truth before tools

A target project selects where each kind of truth lives:

```yaml
truth:
  source:
  requirements:
  design:
  work_tracker:
  decisions:
  evidence:
```

Do not create a second status source when a canonical tracker already exists. Do not assume `work/current/`, GitHub, Jira, Figma, a repository, or a filesystem.

## Resolve capabilities, not remembered tool names

A domain skill requests an abstract capability such as:

```text
tracker.create
design.inspect
diagram.create_editable
repo.read
source_control.commit
browser.capture
deploy.plan
observability.read_logs
```

Then reconcile:

```text
project profile intent
→ live tool/capability discovery
→ authentication and scope observation
→ provider selection
→ truthful fallback or blocker
→ operation authority and policy evaluation
```

Live discovery overrides a stale profile or remembered schema. Missing configuration does not imply availability; configured provider does not prove current access.

## Decision-class registry

`policy.capability_execution.decision_class_registry` is project-owned canonical policy truth. Each entry has one exact opaque `id` and a `protected` boolean. IDs are case-sensitive and are never silently normalized or aliased.

Every `Capability Operation Envelope.responsibility.decision_classes[]` value must match an exact registry ID before mutation policy can `ALLOW`. An unregistered or ambiguous class is UNKNOWN policy: resolve it with the project authority or return `REQUIRE_APPROVAL`/`BLOCK`. A registry class with `protected: true` cannot be treated as `authority: NOT_REQUIRED`; the protected domain/owner boundary remains in force.

The registry is extensible project truth, not a global Product/QA/UAT/Security enum. During v3 -> v4 migration, preserve each old `protected_decision_classes` string byte-for-byte as a protected registry ID and leave registry completeness unresolved until the project owner establishes any additional classes required by intended automatic execution. Do not fabricate unprotected classes or normalize old identifiers.

## Resolve operation policy after provider selection

Provider availability is only one gate. Before a mutation, create the Capability Operation Envelope and evaluate `policy.capability_execution` for responsibility, authority, preconditions, resource budgets, project/system scope, public visibility, downstream invalidation, ambiguous identity, reversibility, postcondition verification, and protected decision classes.

A project may allow bounded reversible operations automatically. That permission is limited to the declared canonical owner, project, capability, resource budget, and verified postconditions; it never transfers Product, Architecture, QA, UAT, or Release authority to the tool-using skill.

## Availability states

Use exactly one:

```text
AVAILABLE
PARTIAL
UNAVAILABLE
DENIED
UNKNOWN
```

If the requested artifact requires an editable external resource but only a text specification can be produced, mark `fallback_used: true`, explain the limitation, and return `PARTIAL` rather than `READY`.

## Project profile ownership

The active profile belongs to the target project or its selected truth system. The reusable skill pack may provide schemas, fixtures, bootstrap workflow, and resolution guidance; it must not ship a user's active project profile in its release package.

Project-specific schema extensions belong under the top-level `extensions` object using project-owned namespaces. Bootstrap migration preserves them without allowing extension data to redefine core truth, authority, or policy fields.
