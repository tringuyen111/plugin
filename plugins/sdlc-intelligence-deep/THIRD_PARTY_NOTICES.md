# Third-party notices

SDLC Intelligence Skills is a verified adaptation assembled from user-provided
source archives. Historical upstream provenance is recorded in `UPSTREAM.md`; this
distribution does not claim that the corresponding Git tag/history is present.

## Matt Pocock skills

Substantial engineering, productivity, routing, TDD, debugging, review,
wayfinding, and domain-modeling source originated from `mattpocock/skills`.

- License: MIT
- Copyright: Matt Pocock, 2026
- Imported archive and SHA-256: recorded in `UPSTREAM.md`

## Anthropic knowledge-work plugins

Product-management and plugin-management source was studied and adapted for
Product, workflow, component, and packaging concepts. Adapted portions remain
subject to Apache License 2.0 where applicable.

- License: Apache License 2.0
- License copy: `licenses/Apache-2.0.txt`
- Source archive hashes: recorded in `UPSTREAM.md`
- Modified from upstream: yes

## User Guide BA Kit

User Guide workflow, manual-review, Diátaxis, approval, and visual-capture ideas
were studied and adapted. The runtime capture adapter was independently
reimplemented and tested in this repository.

- License: MIT
- Copyright: Hoang Phan, 2026
- Source archive hash: recorded in `UPSTREAM.md`

No upstream project or contributor endorses this fork. Product names and
trademarks remain the property of their respective owners.

## UI/UX Pro Max / Next Level Builder material

Selected local design-intelligence data/search code, creative-production data/references/helpers, and design-token material were adapted from the supplied UI/UX Pro Max Codex-native archive.

- Root license: MIT
- Copyright: Next Level Builder, 2024
- Retained ui-styling notice/license: Apache License 2.0
- License copy: `licenses/Apache-2.0.txt`
- Supplied archive SHA-256: recorded in `UPSTREAM.md`
- Modified from supplied source: yes
- Font binaries and external Gemini/provider generation code: not included

## Depth Program knowledge provenance

- Frontend runtime/performance reasoning in `skills/frontend-engineering/references/runtime-performance.md` is paraphrased/derived from engineering principles inspected in Vercel's `vercel-labs/agent-skills` React Best Practices Skill (MIT), fixed at repository revision `b8caa260a420a73042e35521de4b5c8baf6446cc`.
- Browser-proof reasoning in `skills/frontend-engineering/references/browser-proof.md` is paraphrased/derived from Microsoft Playwright documentation `nodejs/docs/best-practices.mdx`, content blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5`, licensed CC BY 4.0.

The SDLC package does not mirror those upstream repositories or documentation pages wholesale.
- Security threat/failure taxonomy and probe reasoning in `skills/security-engineering/references/` are paraphrased/derived from OWASP Cheat Sheet Series authorization/session/SSRF/CSRF guidance at revision `be926b099d8e8b05b81b12217d5ebda9c1fd4973`, OWASP API Security Top 10 2023 blob `230cc8c72fe8035474c7edbbb27374183e91f8ab`, and Trail of Bits `agentic-actions-auditor` at revision `304c81a8cefb6e3c029ebd0d12940ccf0713eccb`. Those sources are CC BY-SA 4.0; exact provenance is preserved in the frozen Depth Program source pack. No exploit payload corpus is copied into the plugin.
- Data/persistence relational and PostgreSQL runtime reasoning in `skills/data-persistence-engineering/references/` is paraphrased/derived from Supabase Postgres Best Practices at revision `8331f910845103c08d51f6ca1d86ebb7d1f745e3` (MIT) and PostgreSQL core documentation at revision `bdaad789c843f57b1fc66c5ede7abaff8a915c3b` (PostgreSQL License). Exact source inventory is preserved in the frozen Depth Program source pack; provider/version-specific semantics remain conditional on inspected project truth.
- API contract/evolution reasoning in `skills/api-engineering/references/` is paraphrased/derived from Microsoft API Guidelines at revision `a7022a299442a8352431874e63ec4dff548a1b81` (CC BY 4.0) and uses OWASP API Security Top 10 2023 blob `230cc8c72fe8035474c7edbbb27374183e91f8ab` (CC BY-SA 4.0) only for security-boundary recognition. Security policy/enforcement remains separately owned; exact provenance is preserved in the frozen Depth Program source pack.
- QA browser-planning and probe-design depth in `skills/verify-quality/references/` is paraphrased/derived from Microsoft Playwright Best Practices blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5` (CC BY 4.0) plus existing SDLC evidence semantics. The heavyweight community Quality Playbook observed during research was explicitly excluded from import; exact provenance/exclusion is preserved in the frozen Depth Program source pack.
- QA probe-execution depth in `skills/verify-quality/references/probe-execution-discipline.md` paraphrases/derives browser synchronization, isolation and user-visible assertion principles from Microsoft Playwright Best Practices blob `253dad0ea13200c1053fc9ecb220c3bd900cf0d5` (CC BY 4.0), while retaining SDLC-native evidence admission/verdict semantics. Exact provenance is preserved in the frozen Depth Program source pack.

## MIT notice for retained upstream material

The following copyright notices apply to retained/adapted MIT-licensed material described above:

- Copyright (c) 2026 Matt Pocock
- Copyright (c) 2026 Hoang Phan
- Copyright (c) 2024 Next Level Builder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
