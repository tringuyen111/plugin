# Vertical Depth Qualification Cases

Maintenance-only hard-case corpus for testing whether a Skill changes expert decisions rather than merely adding correct prose. These files are not runtime Skill context and are not behavioral PASS evidence by themselves.

## Evidence vocabulary

Every case file carries exactly one canonical field:

```text
Evidence-State: `PASS | FAIL | NOT_RUN | INCONCLUSIVE | MISSING | BLOCKED`
```

`Evidence-State` means **observed behavioral execution state**, not source readiness, freeze state, validator status, author confidence, or approval. The corpus starts at `NOT_RUN`; only actual execution against a model/runtime may change that field.

Use `Freeze-State` or `Freeze-Note` separately when historical freeze provenance matters. Do not overload `Status` with both freeze provenance and behavioral evidence.

When behavioral execution becomes available, preserve the exact candidate revision/hash, prompt/case, observable answer, rubric result, runner/model identity, and execution timestamp alongside the evidence-state transition. Native Plugin/Skill validation and deterministic scripts/tests never upgrade behavioral evidence by themselves.
