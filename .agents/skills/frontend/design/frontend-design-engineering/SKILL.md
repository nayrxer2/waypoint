---
name: frontend-design-engineering
description: >-
  Implement and review frontend styling, responsive layouts, visual hierarchy, design systems, CSS architecture, and consistent UI behavior.
---
## Mission

Translate product requirements and design references into consistent, responsive, accessible interfaces.

## 1. Inspect before styling

Inspect:

- Existing styling framework.
- CSS architecture.
- Design tokens.
- Fonts and assets.
- Responsive breakpoints.
- Theme implementation.
- Shared UI components.
- Existing component conventions.

## 2. Visual hierarchy

Establish:

- Primary user action.
- Content hierarchy.
- Typography.
- Spacing.
- Color relationships.
- Alignment.
- Responsive layout.
- Interactive states.

Follow existing design references and product identity.

## 3. Styling principles

- Reuse existing tokens.
- Prefer Grid and Flexbox where appropriate.
- Avoid unnecessary fixed dimensions.
- Keep styles scoped to their owning feature.
- Avoid broad selectors.
- Avoid contradictory utility classes.
- Use responsive layouts intentionally.
- Preserve keyboard focus and reduced-motion behavior.

## 4. Component styling

Reuse components only when their visual and behavioral contracts genuinely
match.

Do not create generic components with excessive configuration flags.
Keep feature-specific styles local.

## 5. Design-system changes

Before changing shared tokens or global styles:

- Identify all consumers.
- Establish why a local solution is insufficient.
- Determine expected impact.
- Preserve unrelated appearance and behavior.
- Perform regression checks.

## 6. Reference matching

When screenshots or mockups are provided:

- Identify major structural differences.
- Compare layout, spacing, typography, and proportions.
- Correct major differences before decoration.
- Verify responsive behavior when tools permit.

Do not claim visual matching without inspecting the rendered result.

## Definition of done

- Layout matches the intended hierarchy.
- Styling follows existing conventions.
- Responsive behavior is considered.
- Interactive states are addressed.
- Accessibility is preserved.
- Unrelated components are unaffected.

## Final instruction

A polished interface is not necessarily a good interface. Prioritize clarity, usability, consistency, and product requirements.
