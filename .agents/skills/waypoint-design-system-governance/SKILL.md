---
name: waypoint-design-system-governance
description: >-
  Preserve and govern Waypoint's Tailwind CSS 4 setup, design tokens, dashboard
  styling, route-specific themes, and visual isolation. Use only in the Waypoint
  repository.
---

# Waypoint Design System Governance

## Scope and ownership

This is repository-specific guidance for styling, tokens, responsive behavior,
themes, and visual isolation. General CSS and UI implementation belongs to
Frontend Design Engineering.

## When to use

- When changing Waypoint styles, design tokens, Tailwind configuration, themes,
  or responsive layouts.
- When a visual change could affect unrelated routes or components.

## When not to use

- In other repositories.
- As a substitute for inspecting the actual styles and their consumers.
- For application module boundaries owned by
  [Waypoint Repository Architecture Conventions](../waypoint-repository-architecture-conventions/SKILL.md).

## Procedure

1. Inspect the current Tailwind and CSS versions, tokens, route themes, styles,
   and affected consumers.
2. Read the focused style rules in
   [repositories/waypoint](../repositories/waypoint/repository-design-system-governance.md).
3. Prefer feature-local styling; change shared tokens only for a genuine shared
   requirement.
4. Verify responsive behavior, focus states, and affected routes and themes.

## Conflict and stop conditions

If existing implementation and the repository guide disagree, investigate and
preserve the current behavior unless a design change is explicitly requested.
Stop before broad changes if affected consumers or regression risks are unclear.

## Verification

Run relevant lint, type, and test checks. Inspect the rendered interface at
affected viewports when browser tools are available. Report unverified visual
behavior honestly.
