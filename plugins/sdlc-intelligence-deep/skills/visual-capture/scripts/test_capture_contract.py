from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path
import tempfile
import unittest

from capture_contract import validate_job, validate_resolution_record_binding


EXECUTOR = {
    "provider": "chromium",
    "source_kind": "local_adapter",
    "source_id": "visual-capture-playwright",
    "namespace": None,
    "revision": "adapter-r1",
}


def base_record() -> dict:
    return {
        "schema_version": 4,
        "project_id": "project-x",
        "profile_revision": "profile-r1",
        "capability": "browser.capture",
        "provider": "chromium",
        "provider_source": {
            "kind": "local_adapter",
            "id": "visual-capture-playwright",
            "namespace": None,
            "revision": "adapter-r1",
            "discovered_actions": ["capture"],
        },
        "provider_version": None,
        "availability": "AVAILABLE",
        "side_effect_class": "LOCAL_WRITE",
        "requested_side_effect_class": "LOCAL_WRITE",
        "side_effect_match": True,
        "auth_scope_evidence": [],
        "fallback_used": False,
        "fallback": None,
        "fallback_authority": "NOT_APPLICABLE",
        "status": "READY",
        "limitations": [],
        "profile_conflict": False,
        "resolution_provenance": {
            "resolved_by": "test",
            "resolved_at": "2026-08-15T00:00:00Z",
            "discovery_evidence": ["test"],
            "policy_evidence": ["test"],
        },
    }


def minimal_job() -> dict:
    return {
        "schema_version": 4,
        "executor": dict(EXECUTOR),
        "intent": "evidence",
        "environment": "local-test",
        "shots": [{
            "slug": "home-ready",
            "state": "ready",
            "html": "fixture.html",
            "device": "desktop",
            "steps": [],
            "callouts": [],
            "masks": [],
        }],
    }


class ResolutionBindingTests(unittest.TestCase):
    def write_record(self, root: Path, record: dict, name: str = "resolution.json") -> tuple[dict, Path]:
        path = root / name
        raw = (json.dumps(record, sort_keys=True, indent=2) + "\n").encode("utf-8")
        path.write_bytes(raw)
        return {"record_ref": name, "record_sha256": hashlib.sha256(raw).hexdigest()}, path

    def assert_rejected(self, mutate_record=None, mutate_binding=None, expected: str = "") -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            record = base_record()
            if mutate_record:
                mutate_record(record)
            binding, _ = self.write_record(root, record)
            if mutate_binding:
                mutate_binding(binding)
            with self.assertRaisesRegex(ValueError, expected):
                validate_resolution_record_binding(binding, EXECUTOR, root=root)

    def test_valid_exact_binding(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            binding, _ = self.write_record(root, base_record())
            record = validate_resolution_record_binding(binding, EXECUTOR, root=root)
            self.assertEqual(record["capability"], "browser.capture")
            self.assertEqual(record["provider_source"]["id"], "visual-capture-playwright")

    def test_missing_record_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            binding = {"record_ref": "missing.json", "record_sha256": "a" * 64}
            with self.assertRaisesRegex(ValueError, "not a readable file"):
                validate_resolution_record_binding(binding, EXECUTOR, root=root)

    def test_tampered_digest_is_rejected(self) -> None:
        self.assert_rejected(mutate_binding=lambda b: b.update(record_sha256="a" * 64), expected="does not match exact record bytes")

    def test_wrong_schema_version_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(schema_version=3), expected="must use schema_version 4")

    def test_wrong_capability_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(capability="design.inspect"), expected="capability must be browser.capture")

    def test_provider_mismatch_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(provider="other-browser"), expected="provider does not match selected executor")

    def test_provider_source_mismatch_is_rejected(self) -> None:
        def mutate(record: dict) -> None:
            record["provider_source"]["id"] = "other-source"
        self.assert_rejected(mutate_record=mutate, expected="provider_source does not match selected executor")

    def test_blocked_status_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(status="BLOCKED"), expected="not capture-admissible")

    def test_partial_status_is_rejected_without_operation_authority(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(status="PARTIAL"), expected="not capture-admissible")

    def test_denied_availability_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(availability="DENIED"), expected="not capture-admissible")

    def test_partial_availability_is_rejected_without_operation_authority(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(availability="PARTIAL"), expected="not capture-admissible")

    def test_wrong_side_effect_class_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(side_effect_class="READ"), expected="side_effect_class must be LOCAL_WRITE")

    def test_side_effect_mismatch_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(side_effect_match=False), expected="side_effect_match must be true")

    def test_profile_conflict_is_rejected(self) -> None:
        self.assert_rejected(mutate_record=lambda r: r.update(profile_conflict=True), expected="profile_conflict must be false")


class OptionalResolutionJobTests(unittest.TestCase):
    def test_direct_local_executor_job_does_not_require_resolution_record(self) -> None:
        self.assertEqual(validate_job(minimal_job()), [])

    def test_present_resolution_binding_is_still_strict(self) -> None:
        job = minimal_job()
        job["capability_resolution"] = {"record_ref": "resolution.json", "record_sha256": "not-a-digest"}
        findings = validate_job(job)
        self.assertTrue(any("record_sha256" in item for item in findings), findings)

    def test_executor_identity_remains_required_in_direct_mode(self) -> None:
        job = minimal_job()
        job["executor"]["source_id"] = "other-adapter"
        self.assertEqual(validate_job(job), [])
        with self.assertRaisesRegex(ValueError, "does not bind to this local adapter"):
            from capture_contract import validate_local_executor_binding
            validate_local_executor_binding(job["executor"])

    def test_visual_conformance_intent_is_accepted(self) -> None:
        job = minimal_job()
        job["intent"] = "visual-conformance"
        self.assertEqual(validate_job(job), [])

    def test_removed_visual_qa_intent_is_rejected(self) -> None:
        job = minimal_job()
        job["intent"] = "visual-qa"
        findings = validate_job(job)
        self.assertTrue(any("intent" in item for item in findings), findings)


class ContractIdentityTests(unittest.TestCase):
    def test_schema_identity_and_operational_docs_are_v4(self) -> None:
        scripts = Path(__file__).resolve().parent
        skill_root = scripts.parent
        job_schema = json.loads((scripts / "job.schema.json").read_text())
        manifest_schema = json.loads((scripts / "manifest.schema.json").read_text())
        self.assertTrue(job_schema["$id"].endswith("visual-capture-job-v4.json"))
        self.assertTrue(manifest_schema["$id"].endswith("visual-capture-manifest-v4.json"))
        self.assertEqual(job_schema["properties"]["schema_version"]["const"], 4)
        self.assertEqual(manifest_schema["properties"]["schema_version"]["const"], 4)
        for doc in (skill_root / "SKILL.md", scripts / "README.md"):
            text = doc.read_text()
            self.assertNotIn("v3 job", text)
            self.assertNotIn("v3 manifest", text)
            self.assertNotIn("visual-qa", text)



if __name__ == "__main__":
    unittest.main()
