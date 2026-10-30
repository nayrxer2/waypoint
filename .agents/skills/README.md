# Engineering skills

This workspace uses native VS Code Agent Skills under `.agents/skills/`. Each
active skill lives in its own directly nested folder and uses the required
`SKILL.md` filename and frontmatter:

```text
.agents/skills/
  <skill-name>/
    SKILL.md
  SKILL_ROUTING.md
  SKILL_ACTIVATION_POLICY.md
  SKILL_STANDARDS.md
```

VS Code discovers a skill from the folder and its `name` and `description`
frontmatter. The folder name and `name` must match. See
[`SKILL_ROUTING.md`](./SKILL_ROUTING.md) for all 17 active skills and
representative routing examples.

The root [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
connects always-on workspace guidance to this on-demand library. Keep that
instruction concise; detailed technical guidance belongs in focused skills.

## Adding or moving a skill

1. Follow [`SKILL_STANDARDS.md`](./SKILL_STANDARDS.md).
2. Create `.agents/skills/<skill-name>/SKILL.md` with valid YAML frontmatter.
3. Add or update its entry and activation routes in `SKILL_ROUTING.md`.
4. Add or update representative discovery checks in `tests/skills/`.
5. Run `npm test` and validate that every registered path resolves.

Retired source material is preserved in `.agents/_dont-touch/`; those files are
an archive, not part of active skill discovery.
