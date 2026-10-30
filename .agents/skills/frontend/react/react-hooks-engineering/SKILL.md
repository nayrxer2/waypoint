---
name: react-hooks-engineering
description: >-
  Implement, review, and debug React built-in Hooks and custom Hooks, including state, effects, refs, context, memoization, and lifecycle behavior.
---

## Activation criteria

### Must use

- Creating or modifying custom Hooks.
- Implementing or changing `useEffect`, `useLayoutEffect`, `useRef`, or other
  React Hooks.
- Debugging stale closures, effect loops, cleanup, or dependency problems.
- Implementing subscriptions or external-system synchronization through Hooks.

### Use when relevant

- Building reusable stateful component behavior.
- Integrating browser APIs.
- Implementing asynchronous client-side behavior.

### When not to use

- Static components without Hook behavior.
- Pure CSS and layout changes.
- Backend-only operations.
- Ordinary event-handler changes that do not involve Hook behavior.

## Related skills

- React Component Engineering — component integration.
- React State Management — state ownership and synchronization.
- TypeScript Engineering — Hook types and generic APIs.
- Next.js App Router — server/client execution boundaries.
- Frontend Testing — Hook behavior verification.

## Mission

Use React Hooks correctly to manage component behavior, synchronization, state, and reusable logic.

## 1. Rules of Hooks

Understand the responsibility of each Hook.

- Call Hooks only at the top level of React function components or custom
  Hooks.
- Never call Hooks conditionally, inside loops, or inside nested callbacks.
- Follow the installed React version's supported APIs.
- Preserve Hook call order between renders.
- Use the React Hooks lint rules when available.

## 2. Hook selection

| Hook | Appropriate purpose |
|---|---|
| `useState` | Simple local state |
| `useReducer` | Complex state transitions |
| `useEffect` | Synchronization with external systems |
| `useLayoutEffect` | Work requiring layout synchronization before paint |
| `useRef` | Mutable values and DOM references without triggering rendering |
| `useContext` | Reading shared context |
| `useMemo` | Caching an expensive calculation when justified |
| `useCallback` | Stabilizing a function reference when justified |
| `useId` | Stable IDs for accessibility relationships |
| `useSyncExternalStore` | Subscribing to external stores |

Do not use a Hook merely because it exists.

## 3. Effects

An effect synchronizes React with an external system.

Before writing an effect, ask:

- Is this actually synchronization with an external system?
- Can the value be calculated during rendering?
- Can the operation happen in an event handler?
- Does the effect require cleanup?
- Are all reactive dependencies declared?

Rules:

- Avoid effects for derived state.
- Avoid effects for event-driven operations.
- Implement cleanup for subscriptions, listeners, and external resources.
- Prevent stale closures and race conditions.
- Handle asynchronous cancellation or stale responses appropriately.
- Never suppress dependency warnings without understanding the consequence.

## 4. Custom Hooks

Create custom Hooks when reusable behavior exists.

- Name custom Hooks with the `use` prefix.
- Keep their responsibilities focused.
- Define their inputs and outputs explicitly.
- Avoid hidden global behavior.
- Do not create a custom Hook solely to shorten a component.
- Keep feature-specific Hooks near their feature.

## 5. Refs

Use refs for mutable values that do not need to trigger rendering and for DOM access.

Do not use refs as an alternative to properly modeled React state.

## 6. Context

Use Context for shared values that genuinely need to be accessible across a component subtree.

Avoid putting every application state value into Context.

## 7. Common errors

Watch for:

- Infinite effect loops.
- Stale closures.
- Missing dependencies.
- Unnecessary effects.
- Incorrect cleanup.
- Duplicate subscriptions.
- Unnecessary memoization.
- State updates after obsolete asynchronous work.
- Conditional Hook execution.

## 8. Verification

Use React's official documentation and the installed version's lint rules.

Test effect cleanup, asynchronous behavior, state transitions, and custom Hook behavior.

## Definition of done

- Rules of Hooks are followed.
- Effects have a legitimate purpose.
- Dependencies are correct.
- Cleanup is implemented where needed.
- Reusable logic has clear ownership.
- No unnecessary state or effects exist.

## Final instruction

Do not use effects to compensate for an unclear state architecture.
