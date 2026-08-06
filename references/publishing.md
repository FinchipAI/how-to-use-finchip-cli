# Publishing a Skill

## Prepare the Skill

When the user asks to create and publish a Skill, first use the host's native
Skill Creator. When the user supplies a completed Skill, validate it without
rewriting it unnecessarily. See `authoring-tools.md`.

Before publish, confirm:

- The package is complete and its `SKILL.md` accurately describes its purpose,
  triggers, inputs, outputs, dependencies, permissions, and external effects.
- Referenced scripts, references, and assets are present and use safe relative
  paths.
- The package contains no secrets, personal data, accidental local files, or
  malicious or undisclosed behavior.
- The uploader has used an appropriate host security-review capability and
  understands that upload safety remains the uploader's responsibility.
- The CLI name, version, license, category, tags, and supported-Agent claims
  match the package and actual testing.
- The package license and the explicit `--license` value agree. Do not silently
  rely on the CLI's MIT default.

FinChip integrity and encryption mechanisms do not certify that published code
is safe. They preserve or verify the bytes selected by the uploader.

## Select the source directory

With CLI `0.4.3` or newer, a publish source directory does not need to be a Git
repository. Git directories honor the Git index and `.gitignore`; other
directories are scanned recursively. Both modes exclude recognized secrets,
generated/dependency directories, unsafe paths, and symbolic links before the
archive is created.

Inspect `sourceCollectionMode` and `excludedFiles` in the `--dry-run --json`
result. Confirm that the selected files are complete and that no sensitive or
irrelevant file remains. A prebuilt ZIP is opaque to this directory filter, so
review its contents separately before publishing it.

## Describe capability fit

Write metadata so another Agent can decide quickly whether the Skill matches a
request:

- `--summary` is a short discovery summary, no more than 280 characters. State
  the problem, expected outcome, and the most important boundary.
- `--description` is the full capability fit contract. Cover the problem,
  outcome, what the Skill can do, what it is not for, required inputs, tools,
  permissions or environment, outputs, limits, external side effects, good
  matches, and clear non-matches.

Keep the contract concrete and consistent with the package. It is the
publisher's claim, not FinChip verification of capability, quality, or safety.
Do not promise broader behavior than the uploaded Skill implements.

## Choose encryption

Recommend `oracle-v2` for a new encrypted publish, but treat it as guidance, not
a platform requirement:

- `oracle-v2`: recommended current mode.
- `finchip`: supported platform mode.
- `lit`: supported where available; disclose that the raw content key is sent
  to the Site and Lit/Chipotle before the user chooses it.

Do not describe the recommendation as mandatory. Inspect chain support before
using Lit.

## Publish

When the Human started publishing from an Agent-logged-in Site session, use the
wallet-bound Task flow instead of the standalone command. Obtain the intended
local source path from the Human, then run `finchip task claim <task-id>
--source <path> --json`. Review the exact source file list and ordered publish
steps, obtain explicit approval, and run `finchip task resume <task-id> --yes`.
The Site draft contains immutable publish metadata, not authority to choose or
read a local source path.

For a browser-wallet session, or when the Human explicitly asks for a
standalone CLI publish, use the direct workflow below.

Run a dry run first with explicit metadata:

```bash
finchip skill publish ./my-skill \
  --slug my-skill \
  --name "My Skill" \
  --summary "Explains EVM transactions and flags the main risks; it does not sign or broadcast transactions." \
  --description "Problem: Raw EVM transaction data is difficult to assess. Outcome: A structured explanation and risk notes. Can: Decode calls and explain likely effects. Not for: Signing, broadcasting, or guaranteeing safety. Requires: Transaction data and chain context. Produces: A human-readable report. Limits: Results depend on supplied data and supported ABIs. Side effects: None. Good matches: Users reviewing a transaction before signing. Not a match: Users asking the Skill to execute the transaction." \
  --category "Dev Environment" \
  --license "MIT" \
  --skill-version "1.0.0" \
  --encrypt oracle-v2 \
  --dry-run \
  --json
```

Before the confirmed publish, show the final path, slug, chain, price, category,
summary, capability fit description, license, Skill version, encryption mode,
supply, royalty, expected uploads, and estimated transaction effect.
Publishing can create durable IPFS and on-chain state.

Use `finchip --version` only to inspect the installed CLI version. Never use
`--version` inside `skill publish`; Skill metadata uses `--skill-version`.

Use `--resume example-skill-finchip` for a saved interrupted publish, replacing
the example with the slug stored in the publish error. Do not start a second
deployment when a broadcast-stage publish can be recovered.

## Verify the result

After completion:

1. Read the canonical slug, chain, contract, transaction hashes, encryption
   mode, and registered result from the JSON output.
2. Run `finchip skill show <canonical-slug> --json`.
3. Use `skill manage get` for creator-only state.
4. Treat Creator Attestation as an optional separate action, not part of the
   publish result.
