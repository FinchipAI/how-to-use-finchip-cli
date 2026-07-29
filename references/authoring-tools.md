# Host authoring and review tools

Do not recreate general Skill-authoring guidance inside the FinChip workflow.
Use the host's maintained capability first, then apply FinChip publishing rules.

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
the host's current documentation. Do not vendor another host's Skill Creator
into this Skill.

Before publishing or using downloaded content, delegate security review and
installation to an appropriate trusted host capability when available. FinChip
does not install packages and its integrity checks are not a security scan.
