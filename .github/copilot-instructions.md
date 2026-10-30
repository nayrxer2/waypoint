# Workspace engineering skill discovery

Before engineering work, classify the task and consult
[the skill registry](../.agents/skills/SKILL_ROUTING.md) and
[the activation policy](../.agents/skills/SKILL_ACTIVATION_POLICY.md). Read only
the relevant native skills from `.agents/skills/<skill-name>/SKILL.md` before
implementation; do not activate the full library.

VS Code discovers the workspace skills from `.agents/skills/`. Match each skill
folder and its frontmatter `name`, and keep the registry synchronized when a
skill is added, removed, renamed, or moved. Apply Waypoint-specific skills only
in this repository. Follow existing `AGENTS.md` instructions and inspect the
actual project before editing.
