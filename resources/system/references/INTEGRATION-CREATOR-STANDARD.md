# Integration Creator Standard

An integration maps a provider to abstract capabilities. It does not own the domain workflow.

## Required proposal

- provider identity and version/discovery strategy;
- capability mappings from the core catalog;
- exact live discovery procedure for tools/resources/prompts/actions;
- read, local write, external write, source-control, deployment, destructive, and communication operations;
- authentication and scopes without storing secrets;
- idempotency, retries, partial success, rollback, rate limits, and concurrency;
- sensitive-data and retention rules;
- provider-specific identifiers and provenance;
- approved fallback or blocker;
- generic Integration Result Manifest mapping;
- present, absent, denied, partial-result, stale-schema, and partial-write evals.

## Reject or split when

- the adapter decides Product, BA, Design, Architecture, QA, UAT, or Operations truth;
- provider names leak into the abstract capability vocabulary;
- domain workflow is copied into every provider;
- configuration is mistaken for live availability or authorization;
- an API acknowledgement is treated as verified success;
- a tool-call wrapper adds no reasoning, translation, verification, or failure model.

When a proposal introduces a genuinely new domain decision, create or extend the domain owner first; keep provider translation in the adapter.
