#!/usr/bin/env python3
"""Optional deterministic UI component registry helper under frontend-engineering.

No hidden/default project-state namespace is used. Any write requires an explicit
project-relative --registry-dir selected by the caller/project contract.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path, PurePosixPath

SKIP = {'.git', 'node_modules', 'dist', 'build', '.next', 'vendor', '__pycache__'}
EXT = {'.tsx', '.jsx', '.vue', '.svelte', '.astro'}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def slug(value: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-') or 'component'


def project_root(value: str) -> Path:
    root = Path(value).resolve()
    if not root.is_dir():
        raise ValueError(f'project directory not found: {root}')
    return root


def resolve_registry(root: Path, rel: str) -> Path:
    if not rel or '\\' in rel:
        raise ValueError('registry-dir must be a non-empty POSIX-style relative path')
    pure = PurePosixPath(rel)
    if pure.is_absolute() or '..' in pure.parts:
        raise ValueError('registry-dir must stay inside the project and cannot contain ..')
    path = (root / Path(*pure.parts)).resolve()
    try:
        path.relative_to(root)
    except ValueError as exc:
        raise ValueError('registry-dir escapes project root') from exc
    return path


def candidates(root: Path) -> list[Path]:
    out: list[Path] = []
    for p in root.rglob('*'):
        if not p.is_file() or p.suffix.lower() not in EXT:
            continue
        rel_parts = p.relative_to(root).parts
        if any(part in SKIP for part in rel_parts):
            continue
        low = '/' + '/'.join(rel_parts).lower()
        if any(segment in low for segment in ('/components/', '/ui/', '/widgets/', '/patterns/')) or p.stem[:1].isupper():
            out.append(p)
    return sorted(out)


def dump(path: Path, obj: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')


def load(path: Path, default: object) -> object:
    if not path.is_file():
        return default
    return json.loads(path.read_text(encoding='utf-8'))


def scan(root: Path) -> dict:
    return {
        'project': str(root),
        'candidates': [
            {'source_location': p.relative_to(root).as_posix(), 'source_hash': sha256(p), 'name': p.stem}
            for p in candidates(root)
        ],
    }


def ensure_registry(registry: Path) -> dict:
    (registry / 'components').mkdir(parents=True, exist_ok=True)
    index_path = registry / 'index.json'
    if not index_path.exists():
        dump(index_path, {'schema_version': 1, 'records': []})
    data = load(index_path, {'schema_version': 1, 'records': []})
    if not isinstance(data, dict) or not isinstance(data.get('records'), list):
        raise ValueError(f'invalid registry index: {index_path}')
    return data


def bootstrap(root: Path, registry: Path) -> dict:
    index = ensure_registry(registry)
    records = index['records']
    known = {r.get('source_location') for r in records if isinstance(r, dict)}
    added = []
    for p in candidates(root):
        rel = p.relative_to(root).as_posix()
        if rel in known:
            continue
        rid0 = slug(p.stem)
        rid = rid0
        n = 2
        while (registry / 'components' / f'{rid}.json').exists():
            rid = f'{rid0}-{n}'
            n += 1
        record = {
            'schema_version': 1,
            'id': rid,
            'name': p.stem,
            'level': 'unclassified',
            'owner': 'TBD',
            'lifecycle': 'discovered',
            'source_location': rel,
            'source_hash': sha256(p),
            'tokens': [],
            'variants': [],
            'states': [],
            'responsive_contract': 'TBD',
            'accessibility_contract': 'TBD',
            'uses': [],
            'used_by': [],
            'usage': [],
            'verification': {'source_sync': 'DISCOVERED', 'evidence_refs': []},
        }
        rec_file = f'components/{rid}.json'
        dump(registry / rec_file, record)
        records.append({'id': rid, 'file': rec_file, 'source_location': rel})
        added.append(rel)
    dump(registry / 'index.json', index)
    return {'registry': str(registry), 'added': added, 'added_count': len(added)}


def reconcile(root: Path, registry: Path) -> dict:
    index = ensure_registry(registry)
    records = index['records']
    registered = {r.get('source_location') for r in records if isinstance(r, dict)}
    unregistered = [p.relative_to(root).as_posix() for p in candidates(root) if p.relative_to(root).as_posix() not in registered]
    stale = []
    for item in records:
        if not isinstance(item, dict) or not item.get('file'):
            stale.append({'id': None, 'reason': 'invalid_index_record'})
            continue
        record = load(registry / item['file'], {})
        if not isinstance(record, dict):
            stale.append({'id': item.get('id'), 'reason': 'invalid_record'})
            continue
        rel = record.get('source_location')
        source = root / rel if isinstance(rel, str) else None
        if source is None or not source.exists():
            stale.append({'id': record.get('id'), 'source_location': rel, 'reason': 'source_missing'})
        elif record.get('source_hash') and sha256(source) != record.get('source_hash'):
            stale.append({'id': record.get('id'), 'source_location': rel, 'reason': 'hash_drift'})
    return {'registry': str(registry), 'unregistered_sources': unregistered, 'stale_records': stale}


def validate(registry: Path, strict: bool) -> dict:
    index = load(registry / 'index.json', {'records': []})
    errors = []
    if not isinstance(index, dict) or not isinstance(index.get('records'), list):
        return {'valid': False, 'errors': ['invalid_index']}
    for item in index['records']:
        if not isinstance(item, dict) or not item.get('file'):
            errors.append('invalid_index_record')
            continue
        path = registry / item['file']
        if not path.is_file():
            errors.append('missing_record:' + str(item['file']))
            continue
        record = load(path, {})
        if not isinstance(record, dict):
            errors.append('invalid_record:' + str(item['file']))
            continue
        if strict:
            for key in ('id', 'name', 'owner', 'source_location', 'responsive_contract', 'accessibility_contract'):
                if not record.get(key) or record.get(key) == 'TBD':
                    errors.append(f"{record.get('id')}:{key}")
            if record.get('level') not in ('primitive', 'composite', 'pattern', 'feature'):
                errors.append(f"{record.get('id')}:level")
            if record.get('lifecycle') not in ('active', 'deprecated'):
                errors.append(f"{record.get('id')}:lifecycle")
    return {'valid': not errors, 'errors': errors}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    sp = ap.add_subparsers(dest='cmd', required=True)
    scan_p = sp.add_parser('scan', help='read-only component discovery')
    scan_p.add_argument('--project', required=True)
    for cmd in ('bootstrap', 'reconcile', 'validate'):
        p = sp.add_parser(cmd)
        p.add_argument('--project', required=True)
        p.add_argument('--registry-dir', required=True, help='project-relative explicit registry truth path')
        if cmd == 'validate':
            p.add_argument('--strict', action='store_true')
    args = ap.parse_args()
    try:
        root = project_root(args.project)
        if args.cmd == 'scan':
            result = scan(root)
        else:
            registry = resolve_registry(root, args.registry_dir)
            if args.cmd == 'bootstrap':
                result = bootstrap(root, registry)
            elif args.cmd == 'reconcile':
                result = reconcile(root, registry)
            else:
                result = validate(registry, args.strict)
        print(json.dumps(result, indent=2, ensure_ascii=False))
        if args.cmd == 'validate' and not result.get('valid'):
            return 2
        return 0
    except Exception as exc:
        print(json.dumps({'status': 'FAILED', 'error': str(exc)}, indent=2), file=sys.stderr)
        return 2

if __name__ == '__main__':
    raise SystemExit(main())
