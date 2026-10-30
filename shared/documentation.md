# Waypoint Development Log

This is the human-readable project change log for reviewing implementation decisions and notable updates. Entries are newest first. Add an entry when a meaningful feature, refactor, behavior change, or verification milestone is completed; routine edits do not need individual entries.

## 2026-10-30 — Consolidate project and skill documentation

### What changed

* Combined the SupportFlow project guide and AI engineering skills-library overview in the root `README.md`; removed the duplicate `.agents/skills/README.md`.
* Updated the root README with the current skill folder structure, inventory, and links to the skill routing and standards documents.
* Added a Git Commit Policy to `SKILL_STANDARDS.md`: use concise Conventional Commits and omit co-author trailers and AI attribution.

### Verification

* `git diff --check` — passed.
* Verified all documented skill and repository-guide paths against the workspace.

## 2026-10-30 — Implement SupportFlow customer-support workspace

### What changed

* Replaced the home and dashboard page content with SupportFlow, a frontend-only customer-support workspace. The demo includes ticket workflows, URL-persisted table state, customer and team views, and analytics.
* Added typed support-domain models, validation, workflow rules, URL state, analytics calculations, and a local-storage repository under `src/features/supportflow/`. Demo ticket changes persist only in the current browser profile; no backend, database, or authentication provider is connected.
* Added responsive SupportFlow styling, updated page metadata and README guidance, and set up frontend unit/component and Playwright end-to-end tests.

### Verification

* `npm run typecheck`, `npm test`, `npm run test:e2e`, and `npm run build` — passed. The test suite reported 28 tests across four files; Playwright reported 3 end-to-end tests passed.
* `npm run lint` — completed with one React Compiler warning at the TanStack Table `useReactTable()` call in `src/features/supportflow/components/supportflow-app.tsx`.

### Known limits and follow-up

* SupportFlow data is demo data stored in browser `localStorage`; it is not shared across users or devices. Replacing the repository with an authenticated API-backed implementation remains future backend work.

## 2026-10-21 — Add dashboard-local dark mode

### What changed

* Added an accessible light/dark toggle to the dashboard top bar. Its theme class is applied only to `.waypoint-dashboard`; no document-level theme or welcome-page styling is changed.
* Added dashboard-scoped dark colors for navigation, cards, text, borders, task controls, charts, and mobile layouts in the existing Tailwind component layer.
* Added keyboard-visible focus styling for the new toggle and updated [the style-isolation guide](./skills/frontend/references/style-isolation-and-design-system.md) to record dashboard theme ownership.
* The dashboard theme is component-local prototype state and resets when the page is reloaded.

### Verification

* `npm run lint`, `npx tsc --noEmit`, and `npm run build` — passed.
* Browser check — dashboard light/dark toggle updated dashboard surfaces and accessible state; at 375px wide the icon remained visible and the page had no horizontal overflow.
* Browser check — `/welcome` dark mode toggled on and returned to its original light background/card colors independently of the dashboard.

## 2026-10-21 — Move dashboard styles to reusable Tailwind component layer

### What changed

* Removed `src/components/dashboard/dashboard.module.css` and moved its dashboard styles into Tailwind's documented `@layer components` in `src/app/globals.css`.
* Namespaced all 221 dashboard rules under `.waypoint-dashboard`, which the dashboard root now applies. Dashboard child class names remain usable within that namespace, while auth routes are unaffected.
* Kept the Waypoint palette in `tailwind.config.js`; component rules use those configured theme variables and Tailwind `@apply`.
* Updated the style-isolation and reusable-component guides to explain when to use private CSS Modules versus reusable, namespaced component-layer classes.

### Verification

* `npm run build`, `npm run lint`, and `npx tsc --noEmit` — passed.
* PostCSS selector check — all 221 component-layer rules are scoped to `.waypoint-dashboard`.
* Browser review — desktop and mobile dashboard layouts rendered with their Waypoint colors; mobile had no horizontal overflow; `/welcome` dark mode still toggled and returned to light mode.

### Usage

Wrap dashboard markup with `<main className="waypoint-dashboard">` and use its child classes such as `sidebar`, `project-card`, and `task-row`. Keep all rules for those classes below `.waypoint-dashboard` in the component layer. Use standard Tailwind utilities for one-off per-element variations.

## 2026-10-21 — Apply style isolation guide and add Tailwind palette config

### What changed

* Reviewed and expanded [the style isolation and design system guide](./skills/frontend/references/style-isolation-and-design-system.md) with the current Waypoint Tailwind 4 setup, palette, route theme ownership, and responsive breakpoints.
* Added the requested root `tailwind.config.js` as a Tailwind 4 compatibility config and loaded it explicitly from `src/app/globals.css` with `@config`.
* Added Waypoint color tokens to the config for the dashboard, preserving the existing token values and appearance.
* Linked the component reuse guide to the style-isolation guide.

### Verification

* `npm run build` — passed with the compatibility config and dashboard theme tokens.
* `npm run lint` and `npx tsc --noEmit` — passed.
* Browser check — `/` retained its dashboard colors and had no horizontal overflow; `/welcome` toggled dark on and restored the original light appearance.

### Guardrails for future work

* Keep dashboard CSS in its CSS Module and auth styling in the auth feature; only update `globals.css` when a genuinely shared behavior requires it.
* For Tailwind 4, keep CSS-first setup and load the compatibility config with `@config`. Use `@reference` before applying theme utilities from a CSS Module.
* Before changing shared tokens or theme behavior, verify affected routes and light/dark modes; preserve existing component styles unless that surface is explicitly in scope.

## 2026-10-21 — Restore welcome dark mode and isolate dashboard styles

### What changed

* Restored the original Tailwind `dark` custom variant and document-level color/font defaults in `src/app/globals.css`.
* Moved dashboard presentation into `src/components/dashboard/dashboard.module.css`; dashboard styles now scope to its root class instead of applying general button and focus rules across routes.
* Kept auth components and their existing Tailwind classes unchanged.
* Added route/style boundary guidance to [the reusable-component guide](./skills/frontend/references/reusable-components.md): future dashboard changes stay in its CSS Module, while global CSS changes require checking every route that inherits them.

### Verification

* `npm run lint` — passed.
* `npx tsc --noEmit` — passed.
* `npm run build` — passed and generated `/` and `/welcome`.
* Browser check — `/welcome` switched from the original light background/card colors to dark background/card colors and back; `/` rendered with its dashboard CSS Module root and no horizontal overflow.

## 2026-10-21 — Dashboard redesign and reusable-component review

### What changed

* Replaced the root-page placeholder with a Waypoint project dashboard. The dashboard has responsive workspace navigation, project cards, daily tasks, a weekly focus chart, and a calendar preview.
* Added local interactions for project creation, task creation/completion, workspace search, navigation feedback, and toast messages. These are prototype-only client state; they do not persist or call a dashboard API.
* Added a shared SVG `Icon` component at `src/components/ui/icon.tsx`, used by the dashboard and its feature components.
* Kept `ProjectCard`, `TaskRow`, `ScheduleItem`, and `AvatarStack` local to the dashboard because they are cohesive feature-level views and do not yet have consumers elsewhere.
* Updated page metadata and added responsive dashboard styling and reduced-motion support.
* Added brief comments explaining the icon map, dashboard state updates, and auth form response handling.

### Reusable-component decision

The icon renderer was the one component worth promoting to the shared UI folder: many independent dashboard sections use the same SVG rendering contract. The project/task/schedule displays remain feature-scoped. A generic Button, Panel, or FormField is not justified yet because the auth and dashboard controls have different visual and behavioral contracts. See [the reusable-component guide](./skills/frontend/references/reusable-components.md) for the inventory and criteria.

### Verification

* `npm run lint` — passed.
* `npx tsc --noEmit` — passed.
* Browser review — desktop and mobile layouts rendered; mobile had no horizontal overflow; creating a project added a card; completing a task updated the daily progress.

### Known limits and follow-up

* Dashboard content is sample data held in component state and resets on reload.
* Authentication endpoints still return `501` because authentication persistence is not configured.
* The login and signup route handlers currently repeat request-shape and email validation. Consider a shared server-side auth validation helper when working on those endpoints.

## Adding future entries

Use this compact format:

```text
## YYYY-MM-DD — Short change summary

### What changed
* User-visible or architectural changes.

### Verification
* Commands or manual checks actually performed, with results.

### Known limits and follow-up
* Relevant remaining work or risks; omit when there are none.
```

Keep decisions and caveats factual. Do not record secrets, private user data, or checks that were not run.