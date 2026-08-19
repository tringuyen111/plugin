# Visual Capture Deterministic Adapter

Deterministic Playwright implementation for the provider-neutral
`browser.capture` capability. The adapter creates visual evidence; it does not
own Design judgment, QA verdicts, documentation structure, or release approval.

## Current contract

The v4 job contract is strict and fail-closed. Executor provenance is always required. A capability-resolution binding is conditional: it is required only when provider/source selection was materially ambiguous and a Resolution Record was actually produced. When present, that record is reopened and digest-verified before browser work.

The job supports:

- exact executor provider/source identity, plus optional exact readable capability-resolution record reference + recomputed raw-byte SHA-256 when selection evidence exists;
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

The local implementation is one source for `browser.capture`. A v4 job that executes this adapter always binds exactly to:

```text
capability: browser.capture
provider: chromium
source_kind: local_adapter
source_id: visual-capture-playwright
```

If this local adapter is the only materially suitable live source, the job may bind that executor directly; creating a Project Capability Profile or Resolution Record merely to satisfy the adapter is not required. If source choice is materially ambiguous, resolve it from authoritative current evidence before capture. When that resolution produced a Resolution Record, include its exact reference/hash; when it did not, bind the selected executor directly and preserve the direct selection evidence outside the adapter contract rather than inventing a record. If a resolution binding is present, the adapter reopens the record, recomputes the digest, requires `browser.capture` READY/AVAILABLE truth, and matches provider/source identity before browser work. A missing, tampered, partial, unavailable, or mismatched supplied record fails closed.

A Browser MCP, native browser tool, connector, or remote API may implement the same abstract capability, but those providers need their own execution adapter/tool contract. This local script never silently substitutes itself for another selected source.

## Run

Run from the intended project execution root when the job uses relative
`record_ref`, local HTML, or output paths. Use absolute paths when that root is
not stable. The adapter deliberately does not guess another root from the job
filename.

```bash
python -B skills/visual-capture/scripts/capture.py job.json \
  --chromium /usr/bin/chromium \
  --out artifacts/visual-capture
```

The adapter does not install Playwright or Chromium silently. Use
`--validate-only` to validate both the job and exact resolution-record binding
without browser dependencies. An `ok: true` validation result means the exact
READY/AVAILABLE record and executor pair is capture-admissible; it is not by itself a
workflow `READY` verdict because image inspection and manifest/post-capture checks still apply.

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
