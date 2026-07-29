# Download integrity and license

## Interpret the integrity level

| `integrityLevel` | Meaning |
| --- | --- |
| `manifest-and-artifact-hashes` | The CLI checks the on-chain manifest commitment, encrypted artifact hash, and decrypted plaintext hash. |
| `aead-only` | A legacy encrypted source passed AES-GCM authentication, but no independent expected artifact or plaintext hash exists. |
| `transport-only` | The source relies on the authorized HTTPS transport and does not expose an independent on-chain content hash. |

Integrity is not a malware or quality verdict. Send downloaded content through
an appropriate host security-review capability before use or installation.

## Verify and explain Creator Attestation

For stronger provenance, use read-only EVM/RPC tooling against the exact
`chainId` and `contractAddr` returned for the downloaded deployment. Read:

- `creatorSignatureSet()` to determine whether an attestation exists.
- `isCreatorVerified()` to verify that the stored signature belongs to the
  immutable `genesisCreator` and matches this Chip, slug, and `contentHash`.

Only describe the Creator Attestation as verified when
`isCreatorVerified() === true`. If these functions are absent, report that the
legacy contract does not support Creator Attestation; do not call it unsigned
or failed.

When Creator Attestation is verified and
`integrityLevel` is `manifest-and-artifact-hashes`, explain the result to the
user in plain language:

> The creator's wallet signed the on-chain commitment for this Skill, and the
> CLI locally matched the manifest, downloaded package, and decrypted content
> to that commitment. This is the content the creator confirmed at publication.
> FinChip or an IPFS gateway could withhold the file or return incorrect bytes,
> but could not silently replace it with different content that still passes
> these checks.

When the independent hash chain passes but Creator Attestation is not verified,
say:

> The downloaded content matches the commitment recorded when this Skill was
> published, so it was not silently replaced during download. This result alone
> does not prove that the creator personally signed that commitment.

These are decentralized integrity checks because the commitment is read from
the deployed contract and the hashes are recomputed locally instead of trusting
the Site's copy. Do not use either statement for `aead-only` or
`transport-only` downloads.

Always add that provenance and integrity do not prove that the Skill is safe,
correct, high quality, or free of malicious behavior.

## Independently calculate the saved file hash

For a byte-for-byte plaintext comparison, download with `--no-provenance` and
`--json`. Only compare when `verifiedPlaintextSha256` is non-null:

Resolve `scripts/verify-sha256.mjs` relative to this Skill directory. Supply the
actual `outputPath` and `verifiedPlaintextSha256` returned by the CLI as its two
positional arguments, in that order.

The script independently calculates the saved file hash; it does not
reimplement the on-chain manifest or decryption protocol. A null
`verifiedPlaintextSha256` means this comparison is unavailable.

Without `--no-provenance`, Oracle V2 may inject
`.finchip-provenance.json` after plaintext verification. In that case
`outputSha256` can intentionally differ from `verifiedPlaintextSha256`.

## Apply the package license

Read the Site license before acquisition and the package license after
download. Treat the package terms as authoritative for using its contents. If
the Site metadata differs, disclose the mismatch and do not infer broader
rights from the Site field.

Do not redistribute decrypted content, bypass holder checks, or use the Skill
outside its package license.
