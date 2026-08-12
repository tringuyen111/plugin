# Visual Capture Adapter

Deterministic Playwright implementation for the provider-neutral
`browser.capture` capability. The adapter creates visual evidence; it does not
own Design judgment, QA verdicts, documentation structure, or release approval.

## Current contract

The v3 job contract is strict, provenance-bound, and fail-closed:

- exact capability-resolution record reference + SHA-256 and selected executor source binding;
- local HTML or live URL source;
- mobile, tablet, desktop, or explicit viewport;
- scripted fill, click, wait, and scroll actions;
- optional login through environment-variable values or storage state;
- iframe targeting;
- required or optional PII masks with exact visible-match expectations;
- box, number, and label callouts with exact visible-match expectations;
- leader lines for labels;
- viewport, full-page, element, or explicit clip capture;
- source-bound SHA-256 selective regeneration;
- machine-readable manifest with resolved selector counts, boxes, placements,
  image hashes, warnings, limitations, failures, capability-resolution binding, and actual executor identity/version.

A required mask or callout mismatch fails the shot and removes any stale output
image. A process exit code or PNG file alone is not visual proof: the consuming
workflow must open representative images and inspect the manifest.

Schemas:

- `job.schema.json`
- `manifest.schema.json`

## Provider boundary

The local implementation is one source for `browser.capture`. A v3 job that selects this adapter must bind exactly to:

```text
capability: browser.capture
provider: chromium
source_kind: local_adapter
source_id: visual-capture-playwright
```

A Browser MCP, native browser tool, connector, or remote API may implement the
same capability. The Project Capability Profile and live capability resolver
select the source. The job carries the exact resolution record reference/hash
and selected executor identity; the emitted manifest records the actual local
executor, browser version, and adapter SHA-256. An executor mismatch fails before
browser work. Domain workflows must not call raw browser tools directly.

## Run

```bash
python -B adapters/visual-capture/capture.py job.json \
  --chromium /usr/bin/chromium \
  --out artifacts/visual-capture
```

The adapter does not install Playwright or Chromium silently. Use
`--validate-only` to validate a job without browser dependencies.

## Known qualification boundary

This runtime distribution provides the deterministic local adapter, strict job/manifest
schemas, and `--validate-only`; those surfaces define supported contract mechanics but do
not by themselves prove that a browser/provider path has been behaviorally qualified.
Qualification claims must be backed by execution evidence bound to the exact relevant
adapter/source revision, selected executor, browser/runtime version, and exercised path.

Do not infer qualification from schema examples or implementation support. Login, iframe,
live HTTP, Browser MCP, native browser-tool, connector/remote API, and other provider/flow
variants remain `NOT_RUN` unless the current release evidence explicitly records their
execution. A release may claim a provider path only to the extent supported by that
revision-bound evidence.
