#!/usr/bin/env python3
"""Executable tests for the Project Capability Profile validator."""

from __future__ import annotations

import copy
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import yaml


SCRIPT = Path(__file__).with_name("validate_profile.py").resolve()
SPEC = importlib.util.spec_from_file_location("project_profile_validator", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
validator_module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator_module)


def valid_profile() -> dict:
    unknown_truth = {"kind": "unknown", "location": None, "canonical": False, "notes": []}
    return {
        "schema_version": 4,
        "profile_revision": "profile-test-r1",
        "project": {"id": "project-test", "type": None, "lifecycle_stage": None},
        "truth": {
            "source": copy.deepcopy(unknown_truth),
            "requirements": copy.deepcopy(unknown_truth),
            "design": copy.deepcopy(unknown_truth),
            "work_tracker": copy.deepcopy(unknown_truth),
            "decisions": copy.deepcopy(unknown_truth),
            "evidence": copy.deepcopy(unknown_truth),
        },
        "environments": {
            "local": {"availability": "AVAILABLE", "location": ".", "notes": []}
        },
        "capabilities": {
            "repo.read": {
                "configured_providers": [],
                "preferred_provider": None,
                "fallback": None,
                "notes": [],
                "fallback_side_effect_class": None,
                "configured_sources": [],
                "preferred_source_id": None,
            }
        },
        "policy": {
            "authority": {
                "status": "UNRESOLVED",
                "owner": None,
                "evidence": [],
                "unresolved_fields": ["policy.commit_policy"],
            },
            "commit_policy": None,
            "deployment_requires_confirmation": None,
            "destructive_actions": None,
            "capability_execution": {
                "auto_apply_reversible": None,
                "max_resources_per_operation": None,
                "max_resources_per_changeset": None,
                "same_project_only": None,
                "require_postcondition_verification": None,
                "cross_system_requires_approval": None,
                "public_visibility_requires_approval": None,
                "downstream_invalidation_requires_approval": None,
                "ambiguous_identity_requires_approval": None,
                "decision_class_registry": [],
            },
        },
        "retention": {"handoff": "session-only", "evidence": "session-only"},
    }


class ProfileValidatorTests(unittest.TestCase):
    def assert_invalid(self, profile: dict, needle: str) -> None:
        errors = validator_module.validate(profile)
        self.assertTrue(errors, "profile unexpectedly validated")
        self.assertTrue(any(needle in error for error in errors), errors)

    def test_valid_profile(self) -> None:
        self.assertEqual([], validator_module.validate(valid_profile()))

    def test_schema_version_mismatch(self) -> None:
        profile = valid_profile()
        profile["schema_version"] = 3
        self.assert_invalid(profile, "/schema_version")

    def test_missing_required_field(self) -> None:
        profile = valid_profile()
        del profile["retention"]
        self.assert_invalid(profile, "/")

    def test_owner_approved_cannot_keep_unresolved_fields(self) -> None:
        profile = valid_profile()
        profile["policy"]["authority"]["status"] = "OWNER_APPROVED"
        profile["policy"]["authority"]["owner"] = "project-owner"
        self.assert_invalid(profile, "/policy/authority/unresolved_fields")

    def test_unknown_root_field_rejected(self) -> None:
        profile = valid_profile()
        profile["shadow_status"] = "ready"
        self.assert_invalid(profile, "/")

    def test_legacy_triage_roles_rejected(self) -> None:
        profile = valid_profile()
        profile.setdefault("extensions", {})["sdlc"] = {
            "triage_roles": {
                "needs-triage": "needs-triage",
                "needs-info": "needs-info",
                "ready-for-agent": "ready-for-agent",
                "ready-for-human": "ready-for-human",
                "wontfix": "wontfix",
            }
        }
        self.assert_invalid(profile, "/extensions/sdlc")

    def test_yaml_cli_from_non_skill_cwd(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            profile_path = tmp_path / "profile.yaml"
            profile_path.write_text(yaml.safe_dump(valid_profile(), sort_keys=False), encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(SCRIPT), str(profile_path)],
                cwd=tmp,
                text=True,
                capture_output=True,
                check=False,
            )
            self.assertEqual(0, result.returncode, result.stderr)
            self.assertIn("Profile validation passed", result.stdout)

    def test_parse_error_fails_closed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            profile_path = Path(tmp) / "broken.json"
            profile_path.write_text("{not-json", encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(SCRIPT), str(profile_path)],
                cwd=tmp,
                text=True,
                capture_output=True,
                check=False,
            )
            self.assertEqual(2, result.returncode)
            self.assertIn("PARSE", result.stderr)


if __name__ == "__main__":
    unittest.main()
