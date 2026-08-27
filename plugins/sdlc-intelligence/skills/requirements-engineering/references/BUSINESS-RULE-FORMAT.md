# Business Rule Artifact

Use this projection only when the rule is being persisted as a durable governed artifact or when exact revision/lifecycle truth is material. Do not require these fields for a lightweight candidate rule.

```markdown
# BR-<id> — <short rule name>

**Status:** DRAFT | REVIEWED | APPROVED | CONFLICTED | SUPERSEDED
**Rule nature:** DEFINITIONAL / STRUCTURAL | BEHAVIOURAL / OPERATIVE
**Application labels:** validation | eligibility | permission | prohibition | calculation | derivation | transition | obligation | <other grounded label>
**Business owner:**
**Owning authority:**
**Source / motivation:**
**Source identity:**
**Source revision:**
**Rule truth basis:** CURRENT_VERIFIED | TARGET_AUTHORIZED | PROPOSED_OR_ASSUMED
**Effective period / scope / jurisdiction / segment:**
**Precedence / supersession:**

## Decision-material terms and facts

- Terms/facts that control interpretation:
- Canonical vocabulary reference (if any):
- Unresolved terminology/fact questions:

## Rule statement

## Applies when

## Business result

## Scope exclusions and linked exception rules

- Simple inline exclusions:
- Linked exception/override rules:
- Exception/override authority:

## Calculation / derivation semantics

_Use only when material to the rule._

- Inputs:
- Formula / derivation:
- Unit / currency:
- Rounding / precision:
- Period / time basis:
- Boundary / bucket behavior:
- Aggregation / combination semantics:
- Unresolved authoritative values:

## Examples

### Valid

### Invalid / counterexample

### Boundary

## Decision model

_Use only when multiple interacting conditions/results make a decision table or equivalent model useful. Apply `DECISION-TABLE-CONTRACT.md`._

- Decision question:
- Expected match/result semantics:
- Business-authorized priority/order basis (if any):
- Collect/aggregation semantics (if any):
- Uncovered combinations / authoritative default:
- UNKNOWN / NOT_APPLICABLE semantics (if material):
- Decision-table/model reference:

## Affected artifacts / traceability

_Required when this governed material revision changes canonical downstream meaning._

## Conflicts and open decisions
```
