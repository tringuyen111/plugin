#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, re
from pathlib import Path
import yaml
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)
CONTEXT_REL = "architecture/runtime/runtime-context-map.json"
INDEX_REL = "architecture/runtime/skill-index.json"
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent); args=ap.parse_args(); root=args.root.resolve()
    ctx=json.loads((root/CONTEXT_REL).read_text(encoding="utf-8")); skills=ctx.get("skills", {})
    entries={}
    for name, meta in sorted(skills.items()):
        rel=meta.get("path"); p=root/rel
        if rel != f"skills/{name}/SKILL.md" or not p.is_file(): raise SystemExit(f"invalid native path for {name}: {rel}")
        m=FRONTMATTER_RE.match(p.read_text(encoding="utf-8")); data=yaml.safe_load(m.group(1)) if m else None
        if not isinstance(data, dict) or data.get("name") != name: raise SystemExit(f"frontmatter mismatch: {name}")
        entries[name]={"path": rel}
    out={"version":3,"generated_from":{"paths":f"{CONTEXT_REL}.skills[*].path"},"purpose":"exact native Skill path resolution after owner selection or explicit canonical Skill invocation","skills":entries}
    path=root/INDEX_REL; path.write_text(json.dumps(out, ensure_ascii=False, indent=2, sort_keys=True)+"\n", encoding="utf-8")
    print(json.dumps({"status":"PASS","skills":len(entries),"output":str(path)}, indent=2, sort_keys=True))
if __name__ == "__main__": main()
