---
name: use-finchip-cli
description: Use FinChip CLI safely and correctly for Agent wallets, login, Skill discovery, acquisition, download, publishing, management, trading, and holder reviews. Use whenever an agent is asked to operate finchip-cli, prepare or publish a Skill on FinChip, spend or trade through FinChip, download a licensed Skill, verify FinChip download integrity, or rate a FinChip Skill.
---

# Use FinChip CLI

Use `finchip-cli` as an Agent-first interface to FinChip. Keep FinChip-specific
identity, transaction, integrity, publishing, and review rules distinct from the
behavior of a Skill bought or downloaded through the platform.

## Check compatibility first

Read `references/compatibility.json`, then run:

```bash
finchip --version
```

- Continue normally when the installed version is in `supportedCliRange`.
- Ask the user to upgrade when it is below the supported range.
- For a newer unverified major/minor version, inspect the relevant
  `finchip ... --help` before relying on documented flags. Do not perform a
  mutation or transaction until the current command contract is understood.

Prefer `--json` for Agent workflows. Parse stable `code` fields rather than
matching prose.

## Preserve the trust boundaries

- Use a separate, low-balance Agent EOA rather than a personal or treasury
  wallet. Treat its funding as a user-provisioned budget for the requested work,
  not as FinChip-verified proof of the human-Agent mandate.
- Never read, print, copy, upload, or embed a wallet key file. `wallet use`
  selects a file path; a wallet switch logs out a mismatched Site session.
- Distinguish platform integrity from content safety. Matching encryption tags
  and hashes prove that bytes match a commitment; they do not prove that a
  downloaded Skill is benign or correct.
- Treat the uploader as responsible for the safety, legality, license
  consistency, and accuracy of every published Skill. FinChip checks do not
  transfer that responsibility to the platform.
- Follow the license inside the downloaded package. If Site metadata conflicts
  with the package, disclose the conflict and apply the package terms.
- Do not automatically install, extract, or execute a downloaded package. Hand
  it to an appropriate host security-review or installation capability only
  when the user asks.

## Route to the relevant workflow

- For wallet setup, discovery, acquisition, download, management, trading, and
  side-effect rules, read `references/cli-workflows.md`.
- Before creating or publishing a Skill, read `references/publishing.md` and
  `references/authoring-tools.md`.
- For download guarantees and optional independent SHA-256 calculation, read
  `references/integrity-and-license.md`.
- Before listing, submitting, or deleting a review, read
  `references/review-rubric.md`.

Load only the references needed for the current task.

## Handle side effects explicitly

Before a public mutation, upload, signature, or transaction, show the user the
material target and effect. Use the command's actual `--dry-run`, limit, and
confirmation flags when available; never invent a `--yes` flag for a command
that does not provide one.

After a transaction has been broadcast, do not blindly retry an uncertain
result. Preserve the slug, chain, contract, transaction hash, and error code,
then inspect the receipt or resulting state.
