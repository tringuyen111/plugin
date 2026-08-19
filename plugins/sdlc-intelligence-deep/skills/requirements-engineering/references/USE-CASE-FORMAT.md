# Governed Use Case Artifact

Use this projection only when the project requests or already maintains a durable canonical Use Case. Keep the project's native identifiers and lifecycle vocabulary; do not require `UC-*`, `EPC-*`, or `ACT-*` naming conventions.

```markdown
# <project-native Use Case identity, if one exists> — <meaningful actor goal>

**Lifecycle/status:** <project-native value, only when governed>
**Source identity/location:** <exact authoritative source fixed point / selected current requirement views / Product-domain authority; legacy Behavior Package only when it is the actual historical provenance source>
**Source revision:** <exact revision when one exists>
**Truth context:** CURRENT_VERIFIED | TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Supersedes / superseded by:** <when applicable>
**Change impact:** <affected canonical artifacts/consumers when material>

## Subject / solution boundary

<Declare what solution or subject behavior this Use Case specifies. Actors remain outside this boundary.>

## External actors

- **Primary initiator:** <person, external system, device, timer, or event source>
- **Beneficiary:** <when different from initiator>
- **Supporting external actors:** <only when material>

## Goal

<One independently meaningful outcome at the declared boundary.>

## Trigger

## Preconditions

<Only conditions that must already hold for this interaction. Link Business Rules instead of restating policy when possible.>

## Current / target / proposal delta

<Use only when more than one truth context matters. Keep current evidence, authorized target, and unresolved proposal separate.>

## Main success scenario

1. <external actor action or observable solution response>
2. ...

## Material extensions

### <extension ID/name>

- **Anchor/condition:** <step or grounded condition that causes the branch>
- **Scenario:** <business-observable interaction>
- **Outcome/postcondition:** <how the goal, obligation, permission, state, or next action differs>
- **Authority:** <Business Rule/state source or unresolved owner question>

<Add only extensions whose absence would materially change interpretation.>

## Stateful / interruption semantics

<Optional. Use only when UNKNOWN outcome, partial commitment, retry/duplicate intent, cancellation/compensation, multi-actor conflict, or effective-time behavior is material. Link the local Scenario Continuity reference and controlling Business Rules rather than prescribing implementation mechanics.>

## Postconditions

### Success

### Failure / no-change

<Only when material.>

### Pending / partial / reconciliation-required

<Only when material.>

## Business rules and state links

- <project-native rule/state references>

## Non-goals

## Open behavior questions

| Question | Owner/authority needed | Blocking | Source/conflict |
|---|---|---|---|
```
