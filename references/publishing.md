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

Run a dry run first with explicit metadata:

```bash
finchip skill publish ./my-skill \
  --slug my-skill \
  --name "My Skill" \
  --description "What this Skill does" \
  --category "Dev Environment" \
  --license "MIT" \
  --version "1.0.0" \
  --encrypt oracle-v2 \
  --dry-run \
  --json
```

Before the confirmed publish, show the final path, slug, chain, price, category,
license, version, encryption mode, supply, royalty, expected uploads, and
estimated transaction effect. Publishing can create durable IPFS and on-chain
state.

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
