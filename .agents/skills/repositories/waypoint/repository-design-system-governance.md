---
name: waypoint-design-system-governance
description: >-
  Preserve and govern Waypoint's Tailwind CSS 4 setup, design tokens, dashboard styling, route-specific themes, and visual isolation.
---
## Scope

- Apply only to the Waypoint repository.
- This file documents repository-specific styling decisions. Verify them
  against the actual code before relying on them.

## 1. Tailwind configuration

Documented setup:

- Tailwind CSS 4.3.3.
- `@tailwindcss/postcss`.
- CSS-first configuration.
- `@import "tailwindcss"`.
- Explicit compatibility configuration using
  `@config "../../tailwind.config.js"`.
- Manually defined `.dark` custom variant.

Verify the installed versions and actual configuration before editing.

## 2. Existing palette

Documented Waypoint tokens:

- `ink`
- `muted`
- `paper`
- `line`
- `green`
- `green-dark`
- `sage`
- `peach`
- `lilac`

Preserve existing values unless the user explicitly requests a design change.
Do not create duplicate palette tokens.

## 3. Typography

- Geist is loaded through `src/app/layout.tsx`.
- Global body typography uses Arial/Helvetica.
- Dashboard opts into Geist within its own root.

Do not change global typography to solve a dashboard-only issue.

## 4. Theme ownership

- `/welcome` owns its local light/dark theme behavior.
- `/` owns its dashboard theme toggle.
- Dashboard dark styling is scoped under `.waypoint-dashboard`.
- Do not apply dashboard theme behavior to the entire document.
- Preserve the `.dark` custom variant.

## 5. Dashboard styling

Dashboard component styles are documented in `@layer components` in
`src/app/globals.css`.

Every dashboard selector must remain under `.waypoint-dashboard`. Keep
dashboard styles isolated from authentication styles.

Documented dashboard breakpoints:

- `1500px`
- `1150px`
- `820px`
- `560px`

Reuse existing breakpoints when appropriate.

## 6. CSS Modules

For feature-specific CSS Modules:

- Prefer locally scoped styles.
- Use a relative `@reference` directive when Tailwind theme values or `@apply`
  are needed.
- Do not import the global stylesheet into a CSS Module unnecessarily.

## 7. Visual isolation

Treat unrelated components' existing appearance and behavior as immutable by
default.

Do not:

- Change unrelated CSS classes.
- Rewrite unrelated Tailwind class strings.
- Change global tokens for local styling problems.
- Add broad selectors.
- Introduce unnecessary `!important`.
- Change unrelated typography or spacing.
- Modify authentication styles during dashboard work.

## 8. Shared-style exception

A shared change is allowed when:

- Explicitly requested.
- A genuine shared requirement exists.
- A feature-local solution cannot correctly satisfy the task.

Before proceeding, identify affected consumers and regression risks.

## 9. Regression checks

When shared styles change, inspect affected routes and themes.

At minimum, consider:

- `/`
- `/welcome`
- Dashboard light mode.
- Dashboard dark mode.
- Welcome light mode.
- Welcome dark mode.

Check responsive behavior and focus states when relevant.

## 10. Final enforcement

- Change only what the task requires.
- Preserve existing design tokens, visual behavior, responsive layouts, and
  unrelated component styles.
- Never claim visual verification without actually inspecting the rendered
  result.
