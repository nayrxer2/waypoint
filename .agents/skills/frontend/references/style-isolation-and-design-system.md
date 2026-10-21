## Component Style Isolation & Design System Preservation

### 1. Non-Negotiable Style Isolation

**Treat every unrelated component's existing appearance and behavior as immutable.**

When implementing or fixing a feature, modify only the components, styles, and configuration directly required to complete the requested task.

* Do not modify, override, remove, rename, reorganize, or refactor unrelated CSS classes, CSS Modules, Tailwind classes, inline styles, component markup, or styling logic.
* Do not change `globals.css`, shared UI components, theme configuration, fonts, typography, spacing scales, colors, breakpoints, or global selectors to solve a feature-specific styling problem when a local solution is viable.
* Prefer feature-scoped CSS Modules, component-local styles, and the project's existing styling conventions.
* Do not introduce broad selectors, global overrides, unnecessary `!important` declarations, or cascading changes that unintentionally affect other components.
* Preserve existing layouts, responsive behavior, light and dark themes, hover and focus states, animations, accessibility behavior, and interactions outside the requested scope.
* Do not refactor unrelated components merely to improve consistency, simplify code, modernize Tailwind conventions, or align them with personal preferences.
* Do not clean up unrelated styling defects as part of a feature task unless explicitly requested or necessary to complete the task safely.
* If unrelated styling changes appear in the diff, revert them without discarding legitimate user changes.

### 2. Inspect Before Editing

Before making styling changes:

1. Identify the installed Tailwind CSS version and relevant framework versions.
2. Inspect the existing theme configuration, CSS entry points, design tokens, custom utilities, plugins, and styling conventions.
3. Locate the target component and identify its owning feature, stylesheet, and shared dependencies.
4. Trace shared styles and tokens to their consumers before modifying them.
5. Determine which routes, components, themes, and responsive states could be affected.
6. Establish the smallest change that satisfies the request while preserving existing behavior.

Never assume Tailwind CSS v3 and v4 use the same configuration format or supported APIs.

### 3. Design Token and Style Guide Governance

Treat the project's existing style guide and design tokens as the source of truth.

Organize and document the design system using these categories:

* **Colors:** brand palettes, semantic colors, surfaces, text, borders, success, warning, and error.
* **Typography:** font families, heading scales, body text, labels, font weights, line heights, and letter spacing.
* **Spacing and sizing:** established spacing scales, container widths, and sizing conventions.
* **Responsive design:** existing breakpoints, mobile-first conventions, and layout behavior.
* **Visual treatments:** borders, radii, shadows, focus indicators, and interaction states.
* **Themes:** light and dark mode, theme selectors, custom variants, and semantic color behavior.
* **Custom utilities:** typography helpers, component-specific patterns, and intentional design-system extensions.

Follow these rules:

* Reuse existing tokens and utilities whenever they satisfy the requirement.
* Preserve established token names, values, scales, and public class names.
* Do not create duplicate tokens or custom utilities without a demonstrated need.
* Do not rename, remove, merge, or normalize tokens during unrelated feature work.
* Do not replace brand colors or alter typography and spacing scales without explicit authorization.
* Distinguish primitive design tokens from semantic tokens where the existing architecture supports that distinction.
* Keep feature-specific styling local; promote styles to shared tokens only when there is a genuine cross-feature requirement.
* Document existing conventions before recommending structural improvements.
* Separate confirmed defects from optional design-system improvements.

A style guide documents and governs existing design decisions. It is not permission to redesign the application.

### 4. Tailwind CSS Implementation Rules

* Follow the installed Tailwind CSS version and the project's existing configuration.
* Prefer existing theme tokens and standard utility classes over arbitrary values.
* Use arbitrary values only when existing tokens and utilities cannot express the requirement cleanly.
* Avoid contradictory or redundant utilities and unnecessary override chains.
* Keep conditional class expressions readable and compatible with existing project conventions.
* Use complete, statically discoverable utility class names rather than dynamically constructing class fragments that Tailwind cannot reliably detect.
* Follow the existing approach to custom utilities, plugins, CSS Modules, and shared components.
* Do not migrate configuration formats, replace styling libraries, introduce dependencies, or restructure the design system without a concrete requirement.
* Do not rewrite entire class strings simply to enforce personal formatting preferences.
* Fix invalid CSS values or broken utilities when relevant to the requested task; avoid unrelated cleanup.

#### Tailwind 4 compatibility and this repository

* This repository uses Tailwind CSS 4.3.3 with the `@tailwindcss/postcss` plugin. Tailwind 4 is CSS-first; keep `@import "tailwindcss"` and the manually selected `.dark` custom variant in `src/app/globals.css`.
* `tailwind.config.js` is an explicitly loaded compatibility config via `@config "../../tailwind.config.js"`. Keep it for the project palette and avoid treating it as a Tailwind 3 setup.
* For feature CSS Modules that need Tailwind theme values or `@apply`, use a relative `@reference` directive instead of importing the global stylesheet into the module.
* The reusable dashboard component styles live in `@layer components` in `src/app/globals.css`. Every dashboard selector must remain under `.waypoint-dashboard`; the dashboard applies that class to its root element. Use existing child classes inside that root, or add a new namespaced child class to JSX and its component-layer rule together.
* Prefer standard Tailwind utilities for one-off differences and use them to override component-layer declarations when appropriate. Add a new shared palette token only when it is intentional product-wide design vocabulary, not just a dashboard-only one-off.
* Do not add legacy `content`, `corePlugins`, `safelist`, or `separator` config options; Tailwind 4 handles source detection automatically and does not support those compatibility options.

#### Current Waypoint style inventory

* **Palette:** `tailwind.config.js` extends Tailwind with the `waypoint` colors `ink`, `muted`, `paper`, `line`, `green`, `green-dark`, `sage`, `peach`, and `lilac`. Dashboard component rules consume these as `var(--color-waypoint-*)` values or with `@apply`; retain the existing values unless a visual update is requested.
* **Typography:** Geist is loaded by `src/app/layout.tsx`. The global `body` default remains Arial/Helvetica to preserve the welcome/auth page. The dashboard opts into Geist within its own root.
* **Route ownership:** `/welcome` owns its local light/dark toggle and Tailwind `dark:*` styles. `/` owns the dashboard theme toggle, with `.dark` applied only to the `.waypoint-dashboard` root and dashboard color overrides kept in that namespace. Keep the `.dark` custom variant in `globals.css`; do not toggle the document theme from the dashboard or apply its palette to auth.
* **Responsive behavior:** Dashboard component styles use media-query breakpoints at 1500px, 1150px, 820px, and 560px. Reuse them for dashboard changes rather than introducing nearby breakpoints without a layout need.
* **Spacing and visual treatments:** There is no separately defined spacing/radius scale for the dashboard; its current values are feature-local. Preserve those existing values and avoid creating a second global scale during unrelated changes.
* **Focus and motion:** Auth focus treatment is expressed in its existing Tailwind classes. The dashboard uses its scoped styles and includes a reduced-motion media query; maintain keyboard visibility and reduced-motion support when changing either feature.

### 5. Component and Stylesheet Ownership

Maintain clear boundaries between global, shared, and feature-specific styles.

* **Global styles:** reserve global stylesheets for intentional document defaults, shared setup, and genuinely global design-system rules.
* **Shared components:** modify shared UI components only when the requested behavior requires it or a shared change is explicitly authorized.
* **Feature components:** keep feature-specific presentation and styling within the owning feature.
* **CSS Modules:** prefer scoped CSS Modules for feature-specific styles that should be private to one component. For intentionally reusable Tailwind component classes, use `@layer components` with a feature namespace and keep every selector under that namespace.
* **Reusable components:** extract shared components only when a stable, genuinely shared visual or behavioral contract exists.
* **Composition:** prefer explicit props and composition over boolean-heavy styling APIs.
* **State ownership:** keep interactive state with the smallest component that owns the interaction.

Do not create unnecessary abstractions or move feature styles into a global design-system directory without a real reuse requirement.

### 6. Shared-Style Changes: Exception Process

A shared-style change is permitted only when a concrete dependency makes it necessary, the task explicitly requests it, or a local implementation cannot correctly satisfy the requirement.

Before proceeding:

1. Explain why a feature-local solution is insufficient.
2. Identify the shared rule or token that must change.
3. Trace its consumers and determine the impact on every affected route and component.
4. Keep the modification minimal and preserve existing token contracts.
5. Identify any expected visual differences outside the target feature.
6. Run relevant regression checks for affected components and routes.

Do not silently make application-wide changes to solve a local problem.

If a shared change would cause unintended regressions or requires an unresolved design decision, stop before making that change and explain the dependency.

### 7. Responsive Design, Themes, and Accessibility

Preserve existing responsive and interaction contracts unless the task explicitly requires changing them.

* Follow established breakpoints and mobile-first conventions.
* Check narrow screens, intermediate widths, and desktop layouts when relevant.
* Preserve existing light/dark theme strategies and custom Tailwind variants.
* Maintain hover, active, disabled, loading, and focus states where applicable.
* Preserve visible keyboard focus, semantic markup, and accessible contrast.
* Respect reduced-motion preferences.
* Avoid introducing horizontal overflow, layout shifts, or fixed dimensions that break existing layouts.
* Do not replace the existing theme mechanism or alter unrelated routes' theme behavior without authorization.

### 8. Style Guide Audits and Cleanup

When explicitly asked to audit or organize the style guide:

1. Inventory existing tokens, custom utilities, plugins, breakpoints, stylesheets, and their consumers.
2. Identify duplicated definitions, invalid CSS declarations, inconsistent naming, and potentially unused styles.
3. Trace references before classifying a token or utility as unused.
4. Verify CSS validity and compatibility with the installed Tailwind version.
5. Separate confirmed defects, safe cleanup opportunities, and optional architectural improvements.
6. Propose focused, reviewable changes rather than a wholesale rewrite.
7. Preserve existing visual behavior unless a change is explicitly authorized.
8. Update documentation to reflect the actual implementation, not an assumed or idealized design system.

A dedicated style-guide cleanup task may modify multiple relevant files, but unrelated component styles must remain untouched.

### 9. Diff Review and Regression Verification

Before considering a styling task complete:

* Inspect the complete diff, including indirect changes to shared styles and configuration.
* Confirm that every modified file is necessary for the requested task.
* Check that unrelated components retain their original classes and style definitions.
* Run relevant linting, type checks, tests, and production builds when available.
* Verify the target component's visual behavior and responsive states when browser or screenshot testing is available.
* When shared styles change, inspect every affected route and component, including relevant light and dark modes.
* Check for horizontal overflow, unexpected layout changes, missing utilities, and broken interaction states.
* Revert unintended changes while preserving legitimate user modifications.
* Report the checks actually performed and any remaining limitations.

Never claim that a visual regression check, browser test, or build passed unless it actually ran successfully.

### 10. Definition of Done

* [ ] The requested styling behavior is implemented.
* [ ] Existing design tokens and styling conventions were preserved where appropriate.
* [ ] No unrelated component styles or behavior were changed.
* [ ] Global and shared styles were modified only when necessary.
* [ ] Shared-style consumers and affected routes were considered.
* [ ] Responsive behavior, themes, accessibility, and interaction states were preserved.
* [ ] The diff contains no unintended styling changes.
* [ ] Relevant verification was performed and reported accurately.
* [ ] Documentation reflects the actual design system when documentation changes were requested.

**Final enforcement rule:** Change only what the task requires. Treat unrelated component styles, design tokens, and visual behavior as immutable by default. Correctness includes preserving everything outside the requested scope.
