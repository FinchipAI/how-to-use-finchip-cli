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

### Disclose the wallet boundary before funding

After creating an Agent wallet, show its public address and explain the
following before asking the user to fund it:

- This is a separate, low-balance wallet created for the Agent. It is not the
  user's personal or treasury wallet.
- FinChip CLI does not connect to, read, or ask the user's personal wallet to
  sign. The user funds the Agent address outside the CLI.
- The amount funded is the Agent's available spending budget, and the Agent
  cannot spend more than the wallet balance. Funding is not proof that the user
  approved any particular action. FinChip verifies wallet ownership, balances,
  and chain state, but not the scope of human-Agent authorization.
- The private key is stored as an unencrypted local file at the exact path
  returned by `wallet create`. FinChip does not custody or back it up; losing
  the file loses control of that wallet.
- To withdraw authorization, stop funding the wallet. Moving remaining funds
  requires a separate, explicitly reviewed transfer; FinChip CLI has no
  delegation or revocation control.

## Consumer flow

Browse without a keyword, optionally by category:

```bash
finchip skill list --category "Dev Environment" --json
```

Use `skill search` when the user supplies a keyword. After selecting a Skill,
continue through public detail, preflight, acquisition, and download:

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
- Before the first acquisition that may spend native token, including a Free
  Skill that still needs gas, run `acquire --dry-run` to obtain the exact price
  and estimated maximum gas fee. Give the user the estimate and a reasonable
  suggested per-transaction ceiling with modest gas headroom, then ask the user
  to approve or adjust both limits.
- Apply the approved limits with `--max-price` and `--max-gas-fee`. If either
  limit is exceeded, `ACQUIRE_BUDGET_EXCEEDED` stops before broadcast.
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

Before the first value-spending transaction, obtain the available price, value,
and gas estimate, give the user a concrete estimate and reasonable cap
recommendation, then ask them to approve or adjust it. Use native budget flags
where the command provides them; do not invent flags for commands that do not.

Never automatically repeat a broadcast after a timeout or
`*_RESULT_UNKNOWN`. Use the returned transaction hash to inspect state first.

## Side-effect classes

| Class | Examples | Agent behavior |
| --- | --- | --- |
| Read-only | list, search, show, library, review list, wallet status | Run when it directly serves the request. |
| Session | login, logout | Explain which wallet and Site origin are involved. |
| Public/Site mutation | review submit/delete, manage updates, uploads | Show the material public change before sending it. |
| Chain/IPFS | publish, acquire, trade, attest, on-chain price changes | Preflight when available; show chain, contract, value, gas, and irreversible effects. |
