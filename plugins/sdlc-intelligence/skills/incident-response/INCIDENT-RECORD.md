# Incident Record

```markdown
# INC-<id> — <factual title>

- State: DETECTED | INVESTIGATING | MITIGATING | MONITORING | RESOLVED
- Stabilization outcome: UNCONTAINED | CONTAINED | MITIGATED | RECOVERED | RESOLVED
- Detected / timezone:
- Environment / services / provider state:
- Evidence revision / last updated:
- Incident commander:
- Mutation/operations owner:
- Technical / communications / specialist / scribe roles:
- Authority gaps:
- Severity policy and classification, or policy unresolved:

## Current impact and uncertainty

- Affected users/cohorts/regions:
- Critical journeys/operations:
- Business/operational effect:
- Data integrity / security implications:
- Dependency propagation:
- Capacity / backlog:
- Unknowns / observability gaps:

## Current incident objective

## Command state and mutation lane

- Current mutation owner:
- Active production changes / dependencies:
- Parallel mutation justification, interaction risk, and attribution evidence:
- Change-freeze/emergency-change policy if applicable:

## Mitigation action ledger

| Action ID | Objective / target | Preconditions | Expected signal | Falsifier / stop condition | Side-effect class | Owner / authority | Mutation-lane relation | Recovery option | Observed outcome | Decision |
|---|---|---|---|---|---|---|---|---|---|---|

For provider acknowledgement, timeout, or ambiguous results, record observed/reconciled state **before retry** and preserve UNKNOWN/PARTIAL truth when state cannot be proven.

## Current mitigation / recovery

- Containment status/evidence:
- Mitigation status/evidence:
- Recovery status/evidence:

## Communications

- Known:
- Unknown:
- Changed since last update:
- Current action:
- Next update commitment / policy source:
- Sensitive/disclosure constraints:

## Timeline

| Time | Observation / decision / action | Evidence | Owner / authority | Outcome |
|---|---|---|---|---|

## Technical diagnosis evidence / ownership

- Engineering / diagnosis owner:
- Evidence mode: REPRODUCTION | OBSERVATION | FORENSIC | INSUFFICIENT
- Symptom identity / provenance / time-state alignment:
- Replay safety / representativeness note:
- Discriminating prediction / probe / falsifier:
- Causal status: UNKNOWN | HYPOTHESIS | SUPPORTED | VERIFIED
- Evidence consumed from technical diagnosis:
- Confidence limit / unresolved discriminator:

## Security / data-integrity branch (when applicable)

- Concern / scope:
- Evidence preserved:
- Containment state:
- Specialist owner / authority:
- Investigation status (owned by specialist, not incident command):
- Availability-vs-integrity/security recovery gap:

## Recovery confidence

| Axis | Applicable? | Evidence | Result: PASS / FAIL / INCONCLUSIVE / N/A |
|---|---|---|---|
| Technical health | | | |
| User journey | | | |
| Business / operations | | | |
| Data / security | | | |
| Capacity / backlog | | | |
| Recurrence / stability | | | |

- Observation window / source (project policy, system dynamics, or explicit evidence):
- Recovery conclusion / gaps:

## Command handoff

- From / to:
- Handoff timestamp:
- Fixed state transferred:
- Active/pending actions and next decisions:
- Receiving-command acknowledgement:

## Residual divergence and remaining risk

- Temporary config / feature flags / traffic shifts / added capacity / degraded mode / manual repair:
- Cleanup or restoration owner:
- Remaining unknowns / risks:
- Customer/support obligations:
- Incident-learning / postmortem continuation:
```
