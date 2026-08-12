#!/usr/bin/env python3
"""Render a portable User Guide Markdown bundle into deterministic HTML."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
from pathlib import Path
from typing import Any, Iterable

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---\n?", re.DOTALL)
SAFE_REL_RE = re.compile(r"^[A-Za-z0-9_./-]+$")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def portable_path(path: Path, *, base: Path) -> str:
    try:
        return str(path.resolve().relative_to(base.resolve())) or "."
    except ValueError:
        try:
            return str(path.resolve().relative_to(Path.cwd().resolve()))
        except ValueError:
            return path.name


def parse_frontmatter(markdown: str) -> tuple[dict[str, str], str]:
    match = FRONTMATTER_RE.match(markdown)
    if not match:
        return {}, markdown
    values: dict[str, str] = {}
    for raw in match.group(1).splitlines():
        if not raw.strip() or raw.lstrip().startswith("#") or ":" not in raw:
            continue
        key, value = raw.split(":", 1)
        values[key.strip()] = value.strip().strip('"\'')
    return values, markdown[match.end() :]


def _safe_relative(target: str, *, context: str) -> str:
    target = target.split("#", 1)[0]
    if not target or target.startswith(("/", "http://", "https://", "mailto:", "javascript:")):
        return target
    if not SAFE_REL_RE.match(target):
        raise ValueError(f"unsafe local path in {context}: {target}")
    parts = Path(target).parts
    if ".." in parts and not target.startswith("../images/"):
        raise ValueError(f"path traversal in {context}: {target}")
    return target


def page_links(index_body: str, bundle: Path) -> list[tuple[str, Path]]:
    links: list[tuple[str, Path]] = []
    seen: set[Path] = set()
    for label, target in LINK_RE.findall(index_body):
        target_no_anchor = target.split("#", 1)[0]
        if not target_no_anchor.startswith("pages/") or not target_no_anchor.endswith(".md"):
            continue
        _safe_relative(target_no_anchor, context="index")
        page = (bundle / target_no_anchor).resolve()
        try:
            page.relative_to(bundle.resolve())
        except ValueError as exc:
            raise ValueError(f"linked page escapes bundle: {target_no_anchor}") from exc
        if not page.is_file():
            raise ValueError(f"missing linked page: {target_no_anchor}")
        if page not in seen:
            links.append((label, page))
            seen.add(page)
    if not links:
        raise ValueError("index.md must link at least one pages/*.md file")
    return links


def _inline(text: str, *, page_dir: str = "pages") -> str:
    escaped = html.escape(text, quote=True)

    image_tokens: list[str] = []
    def image_sub(match: re.Match[str]) -> str:
        alt = html.escape(match.group(1), quote=True)
        raw_target = html.unescape(match.group(2))
        _safe_relative(raw_target, context="image")
        target = raw_target
        if target.startswith("../images/"):
            target = target[3:]
        token = f"\x00IMG{len(image_tokens)}\x00"
        image_tokens.append(f'<figure><img src="{html.escape(target, quote=True)}" alt="{alt}"></figure>')
        return token

    # IMAGE_RE must run before links because image syntax contains link syntax.
    escaped = IMAGE_RE.sub(image_sub, escaped)

    link_tokens: list[str] = []
    def link_sub(match: re.Match[str]) -> str:
        label = match.group(1)
        raw_target = html.unescape(match.group(2))
        _safe_relative(raw_target, context="link")
        target = raw_target
        if target.startswith("pages/"):
            target = "#" + Path(target).stem
        elif target.startswith("./") and target.endswith(".md"):
            target = "#" + Path(target).stem
        token = f"\x00LNK{len(link_tokens)}\x00"
        link_tokens.append(f'<a href="{html.escape(target, quote=True)}">{label}</a>')
        return token

    escaped = LINK_RE.sub(link_sub, escaped)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", escaped)

    for i, replacement in enumerate(link_tokens):
        escaped = escaped.replace(f"\x00LNK{i}\x00", replacement)
    for i, replacement in enumerate(image_tokens):
        escaped = escaped.replace(f"\x00IMG{i}\x00", replacement)
    return escaped


def markdown_to_html(markdown: str) -> str:
    _, body = parse_frontmatter(markdown)
    lines = body.splitlines()
    out: list[str] = []
    paragraph: list[str] = []
    list_type: str | None = None
    in_code = False
    code_lines: list[str] = []
    table_rows: list[list[str]] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            out.append(f"<p>{_inline(' '.join(x.strip() for x in paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal list_type
        if list_type:
            out.append(f"</{list_type}>")
            list_type = None

    def flush_table() -> None:
        nonlocal table_rows
        if not table_rows:
            return
        rows = table_rows
        table_rows = []
        # Ignore a Markdown separator row.
        separator = 1 if len(rows) > 1 and all(re.fullmatch(r":?-{3,}:?", c.strip()) for c in rows[1]) else None
        out.append("<div class=\"table-wrap\"><table>")
        header = rows[0]
        out.append("<thead><tr>" + "".join(f"<th>{_inline(c.strip())}</th>" for c in header) + "</tr></thead>")
        body_rows = rows[2:] if separator == 1 else rows[1:]
        if body_rows:
            out.append("<tbody>")
            for row in body_rows:
                out.append("<tr>" + "".join(f"<td>{_inline(c.strip())}</td>" for c in row) + "</tr>")
            out.append("</tbody>")
        out.append("</table></div>")

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```"):
            flush_paragraph(); close_list(); flush_table()
            if in_code:
                out.append("<pre><code>" + html.escape("\n".join(code_lines)) + "</code></pre>")
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(line)
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            flush_paragraph(); close_list()
            table_rows.append([cell for cell in stripped.strip("|").split("|")])
            continue
        flush_table()

        if not stripped:
            flush_paragraph(); close_list()
            continue
        heading = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if heading:
            flush_paragraph(); close_list()
            level = len(heading.group(1))
            out.append(f"<h{level}>{_inline(heading.group(2))}</h{level}>")
            continue
        if stripped.startswith("> "):
            flush_paragraph(); close_list()
            out.append(f"<blockquote>{_inline(stripped[2:])}</blockquote>")
            continue
        ordered = re.match(r"^\d+\.\s+(.+)$", stripped)
        unordered = re.match(r"^[-*]\s+(.+)$", stripped)
        if ordered or unordered:
            flush_paragraph()
            desired = "ol" if ordered else "ul"
            if list_type != desired:
                close_list(); out.append(f"<{desired}>"); list_type = desired
            item = (ordered or unordered).group(1)
            out.append(f"<li>{_inline(item)}</li>")
            continue
        paragraph.append(line)

    flush_paragraph(); close_list(); flush_table()
    if in_code:
        raise ValueError("unclosed fenced code block")
    return "\n".join(out)


def _page_title(markdown: str, fallback: str) -> str:
    _, body = parse_frontmatter(markdown)
    for line in body.splitlines():
        match = re.match(r"^#\s+(.+)$", line.strip())
        if match:
            return match.group(1).strip()
    return fallback


def render_bundle(bundle: Path | str, output: Path | str) -> dict[str, Any]:
    bundle = Path(bundle).resolve()
    output = Path(output).resolve()
    index_path = bundle / "index.md"
    if not index_path.is_file():
        raise ValueError("missing index.md")

    index_text = index_path.read_text(encoding="utf-8")
    metadata, index_body = parse_frontmatter(index_text)
    links = page_links(index_body, bundle)
    title = _page_title(index_body, bundle.name.replace("-", " ").title())

    source_entries: list[dict[str, Any]] = []
    sections: list[str] = []
    nav: list[str] = []
    for label, page in links:
        data = page.read_bytes()
        markdown = data.decode("utf-8")
        page_id = page.stem
        page_title = _page_title(markdown, label)
        source_entries.append({
            "path": str(page.relative_to(bundle)),
            "bytes": len(data),
            "sha256": sha256_bytes(data),
        })
        nav.append(f'<a href="#{html.escape(page_id, quote=True)}">{html.escape(page_title)}</a>')
        sections.append(
            f'<article id="{html.escape(page_id, quote=True)}" class="guide-page">'
            + markdown_to_html(markdown)
            + "</article>"
        )

    index_bytes = index_path.read_bytes()
    source_entries.insert(0, {
        "path": "index.md",
        "bytes": len(index_bytes),
        "sha256": sha256_bytes(index_bytes),
    })

    lang = metadata.get("language", "en") or "en"
    audience = metadata.get("audience", "unspecified")
    fixed_point = metadata.get("product_fixed_point", "unrecorded")
    status = metadata.get("status", "draft")

    css = """
:root{color-scheme:light;--bg:#f4f6f8;--panel:#fff;--text:#17202a;--muted:#5f6b76;--line:#d9e0e6;--accent:#2256a3;--code:#eef2f6}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.layout{display:grid;grid-template-columns:minmax(220px,300px) minmax(0,900px);gap:28px;max-width:1250px;margin:0 auto;padding:28px}
.sidebar{position:sticky;top:20px;align-self:start;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px;max-height:calc(100vh - 40px);overflow:auto}
.sidebar h1{font-size:1.2rem;margin:0 0 10px}.meta{font-size:.82rem;color:var(--muted);margin-bottom:16px}.nav{display:grid;gap:6px}.nav a{color:var(--accent);text-decoration:none;padding:7px 9px;border-radius:8px}.nav a:hover,.nav a:focus{background:#edf3fb;outline:2px solid transparent}
.content{min-width:0}.guide-page{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:clamp(20px,4vw,44px);margin-bottom:24px;box-shadow:0 8px 24px rgba(23,32,42,.04)}
h1,h2,h3{line-height:1.25;scroll-margin-top:20px}h1{font-size:clamp(1.7rem,4vw,2.4rem)}h2{margin-top:1.8em;border-bottom:1px solid var(--line);padding-bottom:.35em}a{color:var(--accent)}code{background:var(--code);padding:.12em .35em;border-radius:5px}pre{background:#17202a;color:#f7f9fb;padding:16px;border-radius:10px;overflow:auto}blockquote{margin:1em 0;padding:.7em 1em;border-left:4px solid var(--accent);background:#f2f6fb;color:#33404c}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;min-width:520px}th,td{border:1px solid var(--line);padding:9px;text-align:left;vertical-align:top}th{background:#f1f4f7}figure{margin:1.4em 0}img{display:block;max-width:100%;height:auto;border:1px solid var(--line);border-radius:10px}
@media(max-width:760px){.layout{display:block;padding:12px}.sidebar{position:static;max-height:none;margin-bottom:14px}.guide-page{padding:20px;border-radius:10px}.nav{display:flex;overflow-x:auto;gap:8px;padding:2px 0 8px;scrollbar-width:thin}.nav a{flex:0 0 auto;white-space:nowrap;border:1px solid var(--line);background:#f8fafc}table{min-width:480px}}
@media(max-width:440px){.layout{padding:8px}.guide-page{padding:17px}}
""".strip()

    document = f"""<!doctype html>
<html lang="{html.escape(lang, quote=True)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<style>{css}</style>
</head>
<body>
<div class="layout">
<aside class="sidebar">
<h1>{html.escape(title)}</h1>
<div class="meta">Audience: {html.escape(audience)}<br>Fixed point: {html.escape(fixed_point)}<br>Status: {html.escape(status)}</div>
<nav class="nav" aria-label="Guide pages">{''.join(nav)}</nav>
</aside>
<main class="content">{''.join(sections)}</main>
</div>
</body>
</html>
"""

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8", newline="\n")
    output_bytes = output.read_bytes()
    result: dict[str, Any] = {
        "schema_version": 1,
        "bundle": portable_path(bundle, base=bundle),
        "output": portable_path(output, base=bundle),
        "sha256": sha256_bytes(output_bytes),
        "bytes": len(output_bytes),
        "pages": [str(page.relative_to(bundle)) for _, page in links],
        "sources": source_entries,
        "metadata": metadata,
    }
    manifest = output.with_suffix(".manifest.json")
    manifest.write_text(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("bundle", type=Path)
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    output = args.out or (args.bundle / "user-guide.html")
    try:
        result = render_bundle(args.bundle, output)
    except (OSError, UnicodeError, ValueError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False, indent=2))
        return 2
    print(json.dumps({"ok": True, **result}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
