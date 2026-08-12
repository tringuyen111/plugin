# Figma Adapter Contract

## Inputs

- approved Visual Contract and revision;
- requested provider-neutral capability;
- live capability-resolution record with `provider=figma` and non-null
  `provider_source`;
- requested artifact type and approved states/viewports;
- existing file/project/node identifiers when supplied;
- design-system, asset, and font constraints;
- capability operation envelope and authority verdict.

## Mapping

| Intent | Capability | Required live-source evidence |
|---|---|---|
| Inspect design context | `design.inspect` | authorized file/node/component/variable/style reads |
| Create editable artifact | `design.create_editable` | valid destination and editable create actions |
| Update approved UI | `design.update` | bounded node/component/variable writes |
| Export artifact | `design.export` | requested format and scope |

Do not infer provider actions from capability names. The live source contract
wins and any mismatch is recorded as a limitation or unsupported operation.

## Required outputs

1. A generic Integration Result Manifest conforming to
   `../../architecture/capabilities/integration-result.schema.json`.
2. A linked Figma detail manifest containing Visual Contract revision, file and
   node identifiers, state/viewport mapping, source ID and revision, actions
   used, design-system reuse/divergence, assets/fonts, verified checks, and
   limitations.

Neither output may contain tokens, credentials, cookies, private keys, or raw
authorization material.

## Safety and truth

- Never guess plan, team, project, file, page, or node identifiers.
- Never overwrite an approved artifact without bounded scope and recovery path.
- A successful provider acknowledgement is not completion; postconditions must
  be verified.
- A web capture is reference evidence until editable Design ownership is
  established explicitly.
- Missing, partial, denied, or source-unbound capability remains `PARTIAL`,
  `BLOCKED`, or `UNSUPPORTED`; do not silently claim equivalent fidelity.
- The Visual Contract remains the authoritative Design truth. This adapter owns only provider
  translation and integration evidence.
