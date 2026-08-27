# Artifact, Integration, and Composition

Select the intervention after diagnosis. Do not treat all artifact classes as peers in one routing taxonomy.

## Smallest intervention map

| Observed root cause | Prefer |
|---|---|
| discovery/trigger ambiguity | description or invocation metadata |
| universal execution method missing | `SKILL.md` revision |
| branch-specific expert knowledge missing | conditional reference |
| stale/duplicate meaning | consolidate one active truth |
| deterministic repetition or fragile exactness | script/tool/schema |
| reusable output skeleton | template/asset |
| reusable behavioral capability with independent job | Skill |
| provider semantic translation gap | adapter/integration |
| provider access surface only | MCP/App/API/connector configuration or use |
| reusable multi-capability domain composition | domain pack |
| install/version/permission/release boundary | Plugin/package change |
| project/customer-specific fact/state | project artifact/configuration |
| proof gap | evaluation/evidence change |

A request that says "make a Skill" does not override this classification.

## Integration abstraction

Keep three levels distinct:

```text
Domain job / abstract capability = provider-independent WHAT
Provider adapter                = translation/normalization/failure/governance semantics
Provider interface              = MCP | App | API | connector | direct tool
```

An adapter is earned only when real semantic work exists, such as input/output mapping, normalization, provenance, authorization interpretation, retry/idempotency, pagination/partial result handling, compensation, or postcondition verification. A pure wrapper or rename does not need an adapter.

When integration is material, inspect current provider/tool capability and authorization rather than trusting remembered contracts. Provider acknowledgement is not a verified postcondition when the resulting resource can be inspected.

## Domain pack

Use a domain pack when several reusable capabilities/artifacts need a shared vocabulary, context policy, composition contract, or lifecycle/install grouping. It is a logical composition artifact, not automatically a Plugin and not a parallel router.

Component readiness remains component-specific. Pack coherence does not turn a component `FAIL`, `NOT_RUN`, or missing review into success.

## Plugin boundary

A Plugin is a physical distribution/integration/governance boundary. Use it when Skills and/or integration resources have a real reason to install, version, permission, update, or release together.

Plugin package semantics should not decide the logical capability boundary. One Plugin may contain several independent Skills; one Skill should not become broad merely to mirror a package.

Keep **Plugin coherence** separate from **Skill independence**. Plugin-level composition should make triggers, vocabulary, boundaries, and shared contracts compatible, but package membership does not imply that sibling Skills are loaded together. Share common resources when useful, but not by making a first-class Skill depend on sibling context that the runtime does not guarantee.

For native Plugin manifest/scaffold/update mechanics, use `plugin-creator` when available instead of inventing a parallel provider convention.

## Skill materialization

For an OpenAI Skill candidate that has already earned its behavioral boundary, use `skill-creator` when available for provider-native structure, metadata, validation, and packaging. Do not delegate job/boundary/methodology decisions to the native packaging tool.
