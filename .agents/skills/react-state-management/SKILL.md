---
name: react-state-management
description: >-
  Design, implement, and review React state architecture, including local state, shared state, Context, reducers, server state, URL state, and form state.
---
React State Management
Mission

Choose the simplest correct state-management approach based on ownership, lifetime, sharing, consistency, and synchronization requirements.

1. Classify state before implementation

Identify the state category.

State category	Examples	Preferred approach
Local UI state	Dialog open, active tab	useState
Complex local state	Multi-step interaction	useReducer
Shared client state	User preferences, shared UI	Context or an existing store
Server state	API responses, remote records	Existing query/cache solution or framework data layer
URL state	Filters, pagination, search	URL parameters
Form state	Inputs, dirty state, validation	Native state or existing form library
Persistent state	Saved preferences	Appropriate persistence layer

Do not treat every category as global state.

2. State ownership
Keep state as close as possible to its consumers.
Lift state only when multiple components genuinely need shared ownership.
Avoid duplicating the same source of truth.
Derive values instead of storing redundant copies.
Keep transient UI state local.
Keep durable navigational state in the URL when appropriate.
3. State updates
Use functional updates when the next value depends on the previous value.
Keep updates immutable.
Use reducers for meaningful state transitions.
Model mutually exclusive states explicitly.
Avoid contradictory combinations of boolean flags.
Keep state transitions predictable and testable.
4. Context and external stores

Use Context for suitable subtree-level shared values.

Use an external store only when its capabilities provide a demonstrated benefit.

Before introducing a state-management package:

Inspect existing dependencies.
Evaluate built-in React capabilities.
Evaluate the existing architecture.
Identify the actual limitation.
Follow Dependency Governance.

Do not introduce Redux, Zustand, or another library automatically.

5. Server state

Remote data has different requirements from client UI state.

Consider:

Caching.
Request deduplication.
Invalidation.
Refetching.
Loading and error states.
Optimistic updates.
Race conditions.
Pagination.
Stale data.
User-specific data isolation.

Use Next.js server-side data capabilities where appropriate.

Do not mirror every server response into a separate global client store.

6. URL and form state

Keep shareable filters, sorting, pagination, and navigational state in the URL when appropriate.

Form state should distinguish:

Current values.
Validation errors.
Submission state.
Server errors.
Dirty and touched status.

Never rely exclusively on client-side validation.

7. Common anti-patterns

Avoid:

Global state for local interactions.
Duplicated server data.
Derived state stored independently.
Excessive Context providers.
State synchronization through unnecessary effects.
Unstructured collections of booleans.
Introducing a state library without a demonstrated need.
8. Required decision process

Before implementing state:

Classify the state.
Identify its owner.
Determine its lifetime.
Identify its consumers.
Determine whether it must persist or be shareable.
Choose the simplest suitable mechanism.
Define transitions and failure states.
Test important state transitions.
Definition of done
State has one clear source of truth.
Ownership and lifetime are intentional.
Derived values are not unnecessarily duplicated.
Server and client state are distinguished.
Updates are predictable.
The selected solution matches actual complexity.
Final instruction

State management is an architecture decision, not a library selection exercise.
