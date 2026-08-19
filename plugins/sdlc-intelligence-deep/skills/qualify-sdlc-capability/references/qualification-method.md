# Qualification Method

Use this reference when evidence strength, comparison, independence, or canonical project integration is material.

## 1. Evidence-strength decision table

| Observed state | Strongest supported evidence | Claim boundary | Re-entry / blocker |
| --- | --- | --- | --- |
| No reproducible behavioral runner | advisory/source/deterministic checks only | No behavioral PASS; behavioral axes `NOT_RUN` | Re-enter when an actual runner is available |
| Candidate cases execute and outputs are frozen | observed candidate evidence | Candidate behavior/invariant claims only | Comparison/independence remain unsupported |
| Candidate + required baseline execute the same frozen cases | procedural comparative evidence | Bounded directional improvement if intended dimensions improve without material regression | Do not call this independent certification |
| Claim needs process assurance and inspectable trajectory/tool/action evidence exists | observed process evidence for declared path invariants | Only the process dimensions actually observed | Missing required trace/tool evidence keeps that process claim non-ready |
| Independent claim requested with authoritative independent provenance | independent evidence for the bounded claim | Independent conclusion only within the proven provenance/review boundary | Missing or unverifiable provenance blocks only the independent claim |
| Current project exposes canonical qualification infrastructure | project-native evidence using that exact current contract | Claims allowed by the project's active policy | Missing schema/verifier/destination/authority blocks the project-native claim, not generic source review |

Do not encode the table as a universal tier ladder. The claim and actual evidence determine the needed strength.

## 2. Evidence profile versus status

Keep separate:

```text
how evidence was produced
what the evidence says
whether comparison is required
whether independence is proven
whether a later lifecycle decision is authorized
```

Suggested status vocabulary for semantic assertions:

```text
PASS | FAIL | NOT_RUN | INCONCLUSIVE
```

A project may define additional machine fields or profile names. Use that vocabulary only when the current project contract is authoritative and actually present. Do not infer profile availability from remembered repository structure.

## 3. Native validity is a different claim

Examples:

- Skill Creator validation/package can prove OpenAI Skill structure/package validity on exact bytes.
- Plugin Creator validation can prove Plugin package/manifest validity on exact bytes.
- A deterministic script can prove only the checks it actually executes.
- None of these alone prove behavioral uplift, provider behavior, safety, or independent qualification.

Do not block a structural/package task merely because stronger behavioral evidence is unavailable unless the user/project explicitly requires that stronger claim.

## 4. Case design pressure

A representative suite should pressure the real failure surfaces, not just repeat the happy path. Prefer:

- positive trigger;
- near miss/non-trigger;
- missing/conflicting/stale context;
- authority boundary;
- provider/tool absence or partial result;
- failure/recovery path;
- completion/evidence truth;
- prior regression;
- expensive/rare edge condition;
- comparison case if uplift is claimed.

When behavior depends on tool sequence or intermediate actions, add inspectable trajectory/tool-call invariants. Keep them observable; do not request hidden reasoning.

## 5. Frozen-output rule

Semantic review starts only after execution output is frozen. If review causes a candidate/source/prompt/tool/context change, the old verdict does not transfer automatically; execute again under a new identity.

## 6. Independent evidence

Sequential author and reviewer roles in one uncontrolled execution context are procedural separation, not independence. Independent qualification requires provenance appropriate to the claim: who/what executed, what exact artifact/context was used, how output was preserved, and how review independence is established.

Never synthesize independence from labels, timestamps, copied receipts, or a candidate policy file.

## 7. Canonical project qualification

Portable qualification must not assume a specific repository layout.

When a project requires machine evidence artifacts:

1. inspect current project instructions and qualification docs;
2. locate the exact current suite/report schemas, verifier, probes, evidence destination, and authorization rules;
3. bind their revisions/paths in the qualification record;
4. run only the checks required for the current claim;
5. preserve any missing or failed project dependency as a blocker;
6. never substitute this Skill's generic method for a project-specific machine contract when that contract is required.

This keeps the Skill portable while allowing a repository to provide stronger deterministic infrastructure.

## 8. Failure and re-entry

Re-enter at the earliest invalidated truth:

```text
claim or artifact binding
-> execution availability
-> representative cases
-> frozen execution evidence
-> semantic invariant review
-> required comparison
-> independent/provenance claim
-> later authorized lifecycle decision
```

Do not carry a stronger downstream verdict across an invalidated upstream fact.
