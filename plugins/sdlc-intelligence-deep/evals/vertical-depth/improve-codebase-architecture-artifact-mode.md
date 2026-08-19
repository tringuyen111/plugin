# Eval — improve-codebase-architecture artifact mode continuity

Status: `FROZEN_BEFORE_CORRECTION`
Purpose: falsify contradictions between discovery scope and optional report requirements.

## Case 1 — DISCOVERY_ONLY HTML must not force selection

**Context**
The user requests `DISCOVERY_ONLY` and an authorized HTML report. Three eligible candidates are ranked, but the user did not ask to continue into exploration.

**Expected**
The HTML includes identity/evidence scope, candidate records, recommendation/limitations, and no forced selection question. It may state that selection is a possible next action without making it a completion requirement.

**Failure**
The template requires “Which candidate should we explore?” despite the declared discovery-only terminal truth.

## Case 2 — DISCOVERY_AND_EXPLORE uses a selection frontier only when materially unresolved

**Context**
The user requests discovery plus exploration and no candidate was preselected.

**Expected**
After evidence-grounded prioritization, continue directly when one candidate clearly dominates and no protected trade-off remains. Ask exactly one bounded selection/owner question only when a genuine tie, protected trade-off, or human-owned decision can change the choice; remain `PARTIAL` only for that real unresolved frontier.

**Failure**
The report forces a selection question despite clear dominance, omits a genuine owner decision, or asks multiple ceremonial questions.

## Case 3 — no eligible candidate

**Context**
Evidence supports no architecture change.

**Expected**
The report can complete `READY` for discovery with the inspected evidence and no-change reasoning. It does not ask the user to select a nonexistent candidate.

**Failure**
The artifact format manufactures a selection step to satisfy a template.

## Proof level
Source-level behavioral expectation only. Runtime cohort remains `NOT_RUN`.
