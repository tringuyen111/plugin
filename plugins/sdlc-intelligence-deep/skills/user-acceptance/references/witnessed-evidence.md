# Witnessed Evidence

## Contents
1. Execution admission
2. Witnessing mechanism
3. Result semantics
4. Evidence quality
5. Contrastive examples

## 1. Execution admission

Before claiming a non-`NOT_RUN` acceptance result, bind the execution fixed point:
- acceptance design/revision and authoritative target basis;
- exact candidate/build;
- material environment/config;
- representative business data/state;
- actual performer/representative;
- execution time/window;
- evidence identity/provenance where available.

If a material element is unknown, preserve `UNVERIFIED`/`INCONCLUSIVE` rather than backfilling from expected behavior.

The performer/representative does not automatically own final business acceptance authority.

## 2. Witnessing mechanism

1. Present the acceptance slice and observable oracle in business language.
2. Let the actual user/business representative perform or directly review the relevant behavior when the host/runtime allows it.
3. Capture the observed state/effect and evidence; do not edit the expected outcome to match what happened.
4. Record important deviations, timing, partial/UNKNOWN/reconciliation behavior, and limitations.
5. If execution cannot actually occur in the available runtime, return `NOT_RUN` rather than simulate a pass.

When acceptance relies on a human statement (for example, "the finance user confirms the export is usable"), record who made the observation and the scope of that observation. Do not inflate it into independent technical proof.

## 3. Result semantics

Use:
- `PASS` — witnessed result satisfies the acceptance oracle for this fixed point.
- `FAIL` — witnessed result violates a required oracle.
- `INCONCLUSIVE` — execution occurred but evidence/outcome is insufficient or ambiguous.
- `NOT_RUN` — no actual witnessed execution occurred.
- `NOT_APPLICABLE` — authoritative scope/policy establishes that this slice does not apply; silence is not N/A.

Keep result separate from:
- expected outcome;
- QA verdict;
- exception/waiver disposition;
- overall business acceptance decision.

## 4. Evidence quality

Prefer evidence closest to the business-visible claim. Examples:
- user-visible state or completed business action;
- business record/export or externally settled state;
- screenshot/video when visual observation is the acceptance claim;
- event/audit evidence when business completion is otherwise invisible;
- representative's explicit observation with scope/time/context.

Technical logs/metrics may support the story but do not replace a business oracle unless the target acceptance meaning is itself defined on that signal.

If visual/system proof is technical and requires rigorous QA, consume `/verify-quality` rather than redefining its verdict in UAT.

## 5. Contrastive examples

**QA PASS, UAT FAIL:** automation proves calculation correctness, but the intended finance user cannot complete the business workflow because the required approval context is missing. Preserve QA=`PASS`, witnessed acceptance=`FAIL`.

**Expected behavior only:** scenario says a timeout should reconcile to `SETTLED`, but nobody ran it. Result=`NOT_RUN`, not PASS.

**Partial effect:** payment provider acknowledged a charge before timeout. Do not mark failure as "no change"; record commitment/UNKNOWN, then witness reconciliation/final state.

**Performer != approver:** a customer-support representative runs the case and produces evidence. Product/business authority later decides whether the result is acceptable. Keep those roles separate.
