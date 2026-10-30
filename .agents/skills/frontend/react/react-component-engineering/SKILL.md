---
name: react-component-engineering
description: >-
  Design, build, refactor, and review React components, composition, props, rendering boundaries, and reusable UI. Use when implementing or reviewing React component architecture.
---

## Activation criteria

### Must use

- Creating, refactoring, or reviewing React components.
- Designing component APIs, props, composition, and responsibility boundaries.
- Implementing reusable UI components.
- Resolving component rendering or composition problems.

### Use when relevant

- Building forms, dialogs, menus, and interactive UI.
- Changing component-level accessibility.
- Investigating unnecessary component rendering.

### When not to use

- Pure CSS changes that do not affect component structure.
- Backend business logic or database operations.
- API-only changes without a React implementation.
- Static documentation changes.

## Related skills

- React Hooks Engineering — Hook behavior and lifecycle.
- React State Management — state ownership and shared state.
- TypeScript Engineering — component props and type modeling.
- Frontend Design Engineering — visual implementation.
- Frontend Accessibility — accessible component behavior.
- Frontend Testing — component verification.
- Next.js App Router — Next.js-specific component boundaries.

## Mission

Build components that are predictable, cohesive, reusable when justified, accessible, and easy to maintain.

## 1. Component responsibility

Every component should have a clear responsibility.

- Prefer small, cohesive components over components with unrelated
  responsibilities.
- Keep feature-specific components near their owning feature.
- Separate presentation from complex orchestration when it improves clarity.
- Avoid creating components for trivial JSX without a meaningful reason.
- Prefer composition over excessive configuration props.

## 2. Component boundaries

Extract a component when:

- It has an independent responsibility.
- It is reused across multiple meaningful consumers.
- It contains a distinct interaction or state boundary.
- It substantially improves readability or testability.

Do not extract components merely because JSX is long.

Avoid boolean-heavy component APIs and excessive prop forwarding.

## 3. Props and composition

- Define explicit, accurate prop types.
- Use composition and children when they produce a clearer API.
- Keep components controlled or uncontrolled intentionally.
- Avoid unnecessary state duplication.
- Keep callbacks and data ownership clear.
- Do not expose internal implementation details through public props without a
  reason.

## 4. Rendering

- Understand React's rendering and reconciliation behavior.
- Avoid unnecessary state updates and unstable dependencies.
- Use stable keys for list items.
- Do not use array indexes as keys when item identity can change.
- Do not use memoization automatically.
- Apply `memo`, `useMemo`, and `useCallback` only when justified by measured or
  understood rendering costs.

## 5. Component state

Keep state with the smallest component that owns the behavior.

Consult React State Management for decisions involving shared, global, server, URL, or complex application state.

Consult React Hooks Engineering for Hook implementation and effect correctness.

## 6. Forms and interactions

- Use semantic HTML.
- Support keyboard interaction.
- Provide meaningful pending, success, error, and disabled states.
- Avoid fake success behavior.
- Prevent duplicate actions where appropriate.
- Make accessible names and focus behavior part of the component contract.

## 7. Testing

Test observable behavior rather than internal implementation details.

Cover important interactions, conditional rendering, error states, and accessibility behavior.

## 8. Anti-patterns

Avoid:

- God components.
- Premature abstractions.
- Prop drilling without evaluating alternatives.
- Unnecessary context providers.
- Excessive boolean props.
- Duplicated state.
- Effects used to calculate derived values.
- Index-based keys for mutable lists.
- Memoization without justification.

## Definition of done

- Component responsibility is clear.
- Props are correctly modeled.
- State ownership is appropriate.
- Rendering behavior is predictable.
- Accessibility is addressed.
- Abstractions are justified.
- Relevant behavior is tested.

## Final instruction

Design components around meaningful responsibilities, not JSX size or personal preference.
