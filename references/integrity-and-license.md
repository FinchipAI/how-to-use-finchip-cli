# Download integrity and license

## Interpret the integrity level

| `integrityLevel` | Meaning |
| --- | --- |
| `manifest-and-artifact-hashes` | The CLI checks the on-chain manifest commitment, encrypted artifact hash, and decrypted plaintext hash. |
| `aead-only` | A legacy encrypted source passed AES-GCM authentication, but no independent expected artifact or plaintext hash exists. |
| `transport-only` | The source relies on the authorized HTTPS transport and does not expose an independent on-chain content hash. |

Integrity is not a malware or quality verdict. Send downloaded content through
an appropriate host security-review capability before use or installation.

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
