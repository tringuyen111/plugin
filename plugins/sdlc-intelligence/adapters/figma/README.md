# Figma Provider Adapter

This adapter translates provider-neutral Design capabilities into a live Figma
connection. It is not a routed workflow and does not own Design decisions.

Canonical workflow owner: `design-visual`.
Canonical portable artifact: the approved Visual Contract.
Capability selection owner: `capability-resolver`.
Execution authority: the shared capability execution policy.

Read [ADAPTER-CONTRACT.md](ADAPTER-CONTRACT.md) before invoking a Figma MCP,
connector, API, or other live provider source.

## Supported capability vocabulary

```text
design.inspect
design.create_editable
design.update
design.export
```

Provider-specific actions such as web capture, asset upload, FigJam operations,
node mutation, component search, or variable writes are discovered from the
selected live connection source. They never become core capability names.

## Required provider-source binding

A selected Figma provider must include an explicit live source in the capability
resolution record:

```yaml
provider: figma
provider_source:
  kind: mcp | connector | native_tool | api | cli
  id: <stable live connection identifier>
  namespace: <tool namespace or null>
  revision: <observed contract revision or null>
  discovered_actions: []
```

Configured preference alone is not availability. A selected provider without a
live source binding is `BLOCKED`.

## Execution sequence

```text
approved Visual Contract
-> resolve design.* capability
-> select Figma provider and live source
-> inspect live action contract
-> evaluate operation authority and blast radius
-> translate input and execute bounded provider action
-> verify postconditions
-> emit generic Integration Result Manifest
-> emit linked Figma detail manifest
```

Never let this adapter choose Product scope, business behavior, technical
architecture, Design approval, QA acceptance, UAT, or release readiness.
