#!/usr/bin/env python3
"""Validate the immutable capability-resolution -> operation-envelope -> result fixed point.

This validator checks deterministic cross-record bindings. It does not grant operation
authority or replace the Capability Execution Policy decision.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys



def raw_and_json(path: Path):
    raw = path.read_bytes()
    return raw, json.loads(raw)


def sha256(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def fail(msg: str) -> None:
    raise ValueError(msg)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', default=str(Path(__file__).resolve().parents[1]))
    ap.add_argument('--resolution', required=True)
    ap.add_argument('--operation', required=True)
    ap.add_argument('--parameters', required=True, help='Canonical non-secret operation-parameter payload whose exact bytes are hashed')
    ap.add_argument('--profile')
    ap.add_argument('--result')
    args = ap.parse_args()

    root = Path(args.root).resolve()
    cap = root / 'architecture' / 'capabilities'
    resolution_path = Path(args.resolution).resolve()
    operation_path = Path(args.operation).resolve()
    parameters_path = Path(args.parameters).resolve()

    res_raw, resolution = raw_and_json(resolution_path)
    op_raw, operation = raw_and_json(operation_path)
    param_raw = parameters_path.read_bytes()

    if resolution.get('schema_version') != 4:
        fail('capability resolution must use schema_version 4')
    if operation.get('schema_version') != 2:
        fail('operation envelope must use schema_version 2')
    for field in ['project_id','profile_revision','capability','side_effect_class','side_effect_match','status']:
        if field not in resolution:
            fail(f'capability resolution missing {field}')
    for field in ['operation_id','capability','capability_resolution','profile_revision','operation','operation_parameters_sha256','requested_by','canonical_owner','target','responsibility','authority','capability_support','fallback_approved','side_effect_class']:
        if field not in operation:
            fail(f'operation envelope missing {field}')

    if operation['capability_resolution']['record_sha256'] != sha256(res_raw):
        fail('capability_resolution record_sha256 does not match exact resolution bytes')
    if operation['operation_parameters_sha256'] != sha256(param_raw):
        fail('operation_parameters_sha256 does not match exact parameter bytes')
    if operation['capability'] != resolution['capability']:
        fail('capability mismatch between resolution and operation envelope')
    if operation['target']['project_id'] != resolution['project_id']:
        fail('project_id mismatch between resolution and operation envelope')
    if operation['profile_revision'] != resolution['profile_revision']:
        fail('profile_revision mismatch between resolution and operation envelope')
    if operation['side_effect_class'] != resolution['side_effect_class']:
        fail('side_effect_class mismatch between resolution and operation envelope')
    if resolution['side_effect_match'] is not True:
        fail('resolution side_effect_match must be true before mutation')
    if resolution['status'] not in {'READY','PARTIAL'}:
        fail(f"resolution status {resolution['status']} is not mutation-admissible")
    if resolution['status'] == 'READY' and operation['capability_support'] != 'READY':
        fail('READY resolution must bind READY capability_support')
    if resolution['status'] == 'PARTIAL':
        if operation['capability_support'] != 'PARTIAL':
            fail('PARTIAL resolution must bind PARTIAL capability_support')
        if operation['fallback_approved'] is not True:
            fail('PARTIAL resolution requires explicit fallback_approved before mutation policy evaluation')
    if resolution.get('provider') != operation['target'].get('provider'):
        fail('provider mismatch between resolution and operation envelope')

    if args.profile:
        profile_path = Path(args.profile).resolve()
        _, profile = raw_and_json(profile_path)
        if profile.get('schema_version') != 4 or 'profile_revision' not in profile or 'project' not in profile:
            fail('supplied profile is missing canonical schema v4/revision/project identity')
        if profile['profile_revision'] != operation['profile_revision']:
            fail('operation profile_revision does not match supplied current profile')
        if profile['project']['id'] != operation['target']['project_id']:
            fail('operation project_id does not match supplied current profile')

        policy = profile.get('policy', {})
        cap_exec = policy.get('capability_execution', {})
        registry = cap_exec.get('decision_class_registry')
        if not isinstance(registry, list):
            fail('profile decision_class_registry is missing or invalid')
        ids = []
        protected = set()
        for entry in registry:
            if not isinstance(entry, dict) or not isinstance(entry.get('id'), str) or not entry.get('id') or not isinstance(entry.get('protected'), bool):
                fail('profile decision_class_registry contains invalid entry')
            cid = entry['id']
            if cid in ids:
                fail(f'duplicate decision class id in profile registry: {cid}')
            ids.append(cid)
            if entry['protected']:
                protected.add(cid)
        unresolved = policy.get('authority', {}).get('unresolved_fields', [])
        if 'policy.capability_execution.decision_class_registry' in unresolved:
            fail('profile decision_class_registry completeness is unresolved')
        decision_classes = operation.get('responsibility', {}).get('decision_classes')
        if not isinstance(decision_classes, list) or not decision_classes:
            fail('operation responsibility.decision_classes is missing or invalid')
        for cid in decision_classes:
            if cid not in ids:
                fail(f'operation decision class is not registered exactly in current profile: {cid}')
        if protected.intersection(decision_classes) and operation.get('authority') == 'NOT_REQUIRED':
            fail('protected decision class cannot use authority NOT_REQUIRED')

    if args.result:
        result_path = Path(args.result).resolve()
        _, result = raw_and_json(result_path)
        if result.get('schema_version') != 4:
            fail('integration result must use schema_version 4')
        for field in ['capability_resolution','operation_envelope','operation_id','requested_by','canonical_owner','capability','operation','side_effect_class','provider','status','operation_result','postcondition_status']:
            if field not in result:
                fail(f'integration result missing {field}')
        if result['capability_resolution']['record_sha256'] != sha256(res_raw):
            fail('result capability_resolution does not match exact resolution bytes')
        if result['operation_envelope']['record_sha256'] != sha256(op_raw):
            fail('result operation_envelope does not match exact operation envelope bytes')
        for field in ['operation_id','requested_by','canonical_owner','capability','operation','side_effect_class']:
            if result[field] != operation[field]:
                fail(f'result {field} does not match operation envelope')
        if result['provider'] != operation['target']['provider']:
            fail('result provider does not match operation envelope target provider')
        if result['status'] == 'READY' and result['operation_result'] == 'APPLIED' and result['postcondition_status'] != 'VERIFIED':
            fail('APPLIED/READY result requires VERIFIED postcondition')

    print('CAPABILITY_OPERATION_BINDING_OK')
    print(f"resolution_sha256={sha256(res_raw)}")
    print(f"operation_sha256={sha256(op_raw)}")
    print(f"parameters_sha256={sha256(param_raw)}")
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (ValueError, KeyError, TypeError, json.JSONDecodeError, OSError) as exc:
        print(f'CAPABILITY_OPERATION_BINDING_FAIL: {exc}', file=sys.stderr)
        raise SystemExit(1)
