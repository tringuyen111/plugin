# Brainstorm Input Interpretation Heuristics

Use this reference for tagged files, transcripts, long notes, or mixed sources. The goal is **source-aware interpretation**, not keyword-driven decisions.

## Contents

1. Source-role classification
2. Language inference
3. Decision signals
4. Proposal signals
5. Open-question signals
6. Risk/blocker cues
7. Complexity cues
8. Confidence

## 1. Classify source role first

Classify source fragments as:

| Source role | Meaning |
|---|---|
| `target-idea` | actually describes the idea being brainstormed |
| `quoted-example` | example/sample/quotation; does not automatically belong to the target idea |
| `instruction-template` | process, template, or policy guidance |
| `history-background` | prior context that may be relevant but is not automatically current behavior |
| `metadata` | title, tags, changelog, headers, control fields |

Only `target-idea` content or user-confirmed interpretation may determine complexity requirements.

Example: an instruction saying `OAuth callback timeout must be handled` does not prove the target idea uses OAuth when that sentence is only template guidance.

## 2. Infer language from semantic content

Infer language from `target-idea` content and current conversation, not incidental quoted examples.

- A few English technical terms inside otherwise Vietnamese prose do not make the artifact English.
- A few Vietnamese labels inside an English source do not make it Vietnamese.
- Use `mixed` only when both languages intentionally carry important artifact content.

Language inference is subordinate to an explicit user language request and an existing artifact's stable language.

## 3. Decision signals

Signals can help recognize `DECIDED`, but never create authority.

Examples:

- `decided`, `agreed`, `final decision`, `we will use`, `choose X over Y`;
- Vietnamese equivalents such as `chốt`, `quyết định`, `thống nhất`, `đồng ý`;
- another language's equivalent when clearly used as a decision statement.

Rules:

- Direct user/authorized decision in the current brainstorm → may be `DECIDED` within Brainstorm scope.
- `DEC-n` is a stable reference for a material accepted Brainstorm decision, not evidence that downstream owners accepted it.
- Decision-point row IDs such as `D1`/`D2` are structurally different from `DEC-n` decision references.
- A source says something was decided but authority is unclear → preserve as an observed source claim or downstream review/continuation note; do not silently canonicalize it.

## 4. Proposal signals

Examples:

- `proposal`, `suggest`, `could`, `might`, `consider`;
- equivalent terms such as `đề xuất`, `có thể`, `nên cân nhắc`.

Keep the content `PROPOSED` until authorized acceptance.

## 5. Open-question signals

Examples:

- `?`, `TBD`, `unclear`, `not sure`, `waiting for confirmation`, `missing`;
- equivalents such as `chưa rõ`, `cần kiểm tra`, `không chắc`, `chờ xác nhận`.

Material unresolved items receive stable `OQ-n` IDs during synthesis.

## 6. Risk/blocker cues

Words such as `legal`, `compliance`, `security`, `payment`, `vendor`, `deadline`, or `production` are cues to inspect business impact, not automatic risk severity.

Connect cause to business consequence before recording a risk:

```text
external payment provider times out
→ user cannot complete checkout
→ conversion/revenue may drop
```

## 7. Complexity cues

Keywords open a verification question or support semantic inference; they do not set a flag by themselves.

- `OAuth`, `redirect`, `payment`, `webhook`, `callback` → is there an external round trip affecting flow?
- `pending`, `active`, `draft`, `approved` → is there a governed lifecycle/state machine?
- `admin`, `guest`, `free`, `paid`, `approver` → do roles materially change behavior?
- `rate limit`, `quota`, `captcha`, `lockout` → are there important throttle/usage rules?
- `background`, `scheduled`, `async`, `queue` → is there business-visible asynchronous behavior?

Never infer complexity from metadata, templates, or quoted examples alone.

## 8. Confidence

When confidence matters:

- **High** — explicit target-idea statement with clear meaning.
- **Medium** — evidence-backed inference that should still be phrased as proposal/assumption where authority matters.
- **Low** — unclear relation to the target idea; ask or keep `UNRESOLVED`.

Confidence is not authority. A high-confidence inference still does not become a user decision.
