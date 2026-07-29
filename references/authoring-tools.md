# Host authoring and review tools

When the user asks to create a Skill, use the host's own Skill Creator instead
of authoring one from scratch. This reference covers only FinChip-specific
publishing requirements; general Skill-authoring guidance lives in the host
tooling below.

## OpenAI

- Codex: invoke `$skill-creator`.
- ChatGPT Work: invoke `@skill-creator`.
- Official guide: https://developers.openai.com/plugins/build/skills

## Anthropic

- Official Skill Creator:
  https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md
- Official custom Skill guide:
  https://support.claude.com/en/articles/12512198-how-to-create-custom-skills

## Fallback

If the host has no dedicated creator, follow the open Agent Skills format and
the host's current documentation.

Before publishing or using downloaded content, delegate security review and
installation to an appropriate trusted host capability when available. FinChip
does not install packages and its integrity checks are not a security scan.
