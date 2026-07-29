# FinChip CLI workflows

## Identity and wallet

Use an Agent-specific, low-balance EOA:

```bash
finchip wallet create --json
finchip wallet status --json
finchip login --json
```

Do not use a user's primary wallet. Do not inspect a key file. If `wallet use`
selects an existing key file, use its actual path outside project repositories.
When that wallet differs from the logged-in wallet, the CLI logs out the old
session; log in again with the selected wallet.

FinChip verifies wallet ownership, balances, command inputs, and applicable
on-chain state. It does not verify the purpose or scope of a human-Agent
delegation.

## Consumer flow

Use the public lifecycle in this order:

```bash
finchip skill search "agent tools" --json
finchip skill show example-skill-finchip --json
finchip acquire --slug example-skill-finchip --dry-run --json
finchip download example-skill-finchip --json
```

Before acquisition:

- Read `skill.license` from `skill show --json`.
- Use the canonical chain and contract returned by `skill show`.
- Treat the Site price as display data; acquire reads exact wei on-chain.
- Run acquire preflight and apply `--max-price` and `--max-gas-fee` when the
  user gives budgets.
- Broadcast only with the command's explicit confirmation flow.

After download, read `integrityLevel`, `verifiedPlaintextSha256`, and
`outputSha256`. Do not install or execute the result as part of this workflow.

## Creator management

Use `finchip skill manage get example-skill-finchip --json` before applying declarative
changes. Keep `skill show` for public detail and `skill manage get` for
creator-only state.

Creator attestation is a separate, one-time on-chain action. It is not implied
by publish or manage.

## Reviews

`skill review list` is public and read-only. `submit` publishes public content
and requires a current license at submission time. `delete` removes the logged
in account's own review and remains available after the license is transferred.
Read `review-rubric.md` before scoring.

## Trades and other transactions

Resolve an exact chain and contract before purchase, listing, buying,
cancelling, attestation, or on-chain price changes. Read the current subcommand
help before execution:

```bash
finchip trade --help
finchip skill price --help
finchip skill manage attest --help
```

Never automatically repeat a broadcast after a timeout or
`*_RESULT_UNKNOWN`. Use the returned transaction hash to inspect state first.

## Side-effect classes

| Class | Examples | Agent behavior |
| --- | --- | --- |
| Read-only | search, show, library, review list, wallet status | Run when it directly serves the request. |
| Session | login, logout | Explain which wallet and Site origin are involved. |
| Public/Site mutation | review submit/delete, manage updates, uploads | Show the material public change before sending it. |
| Chain/IPFS | publish, acquire, trade, attest, on-chain price changes | Preflight when available; show chain, contract, value, gas, and irreversible effects. |
