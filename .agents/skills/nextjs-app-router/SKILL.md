---
name: nextjs-app-router
description: >-
  Build, refactor, debug, and review production-ready Next.js applications using the App Router, React Server Components, routing, data fetching, caching, Server Actions, and framework-specific conventions.
---
Next.js App Router Engineering
Mission

Build reliable Next.js applications using the installed framework version and its actual rendering, routing, data, and security behavior.

1. Inspect first

Inspect:

Next.js and React versions.
App Router or Pages Router.
package.json and lockfile.
next.config.*.
TypeScript configuration.
Route and layout conventions.
Existing API and data-access modules.
Authentication and authorization integrations.
Existing tests and build scripts.

Do not assume current documentation matches an older installed version.

2. Server and Client Components

Default to Server Components.

Use Server Components for server-side data access, rendering, and keeping privileged operations out of client bundles.

Use Client Components only where browser APIs, interaction, local state, effects, or client-only libraries require them.

Keep "use client" boundaries as small as practical.

Never import server-only modules or secrets into client code.

Follow React Component Engineering and React Hooks Engineering for component and Hook decisions.

3. Routing

Follow installed-version conventions for:

page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
route.ts
Dynamic route segments.
Parallel and intercepted routes where relevant.
Middleware or Proxy capabilities.

Use next/link for ordinary internal navigation.

Validate user-controlled route parameters and query values.

4. Data access
Prefer server-side data access where appropriate.
Reuse established data-access modules.
Avoid unnecessary request waterfalls.
Parallelize independent requests safely.
Bound potentially large queries.
Handle expected errors explicitly.
Avoid duplicating business logic in route files.
5. Caching and rendering

Caching and rendering defaults vary across Next.js versions.

Inspect the installed version before using caching APIs.

Determine:

Whether data is user-specific.
Whether it may be shared safely.
How fresh it must be.
What invalidates it.
Whether the route should be static or dynamic.

Never expose private data through shared caches.

6. Server Actions and Route Handlers

Server Actions and Route Handlers are server entry points, not automatic authorization mechanisms.

Validate inputs, authenticate users, authorize individual operations, and use the established backend data-access layer.

Use Route Handlers when an HTTP interface is required.

Do not create unnecessary APIs for data that can be obtained safely through existing server-side modules.

Consult Backend Engineering and Security Engineering for business logic, persistence, and authorization.

7. Forms and mutations

Implement explicit:

Validation.
Pending states.
Success and failure results.
Duplicate-submission handling.
Data invalidation.
Accessible feedback.

Use APIs supported by the installed React and Next.js versions.

8. Security
Keep secrets server-side.
Do not trust client-side permission checks.
Validate request data.
Authorize at protected operation boundaries.
Prevent user-specific cache leakage.
Avoid exposing internal exceptions.
Follow existing authentication and session conventions.
9. Performance
Minimize unnecessary client JavaScript.
Use appropriate image and font strategies.
Avoid unnecessary client-side fetching.
Use streaming and Suspense when beneficial.
Avoid speculative caching and memoization.
Measure before optimizing.
10. Verification

Run applicable:

Lint checks.
Type checks.
Unit and integration tests.
Production builds.
Browser and end-to-end checks when available.

Never report unexecuted checks as successful.

Definition of done
Correct installed-version APIs are used.
Server/client boundaries are appropriate.
Routing and data access are correct.
Caching respects privacy and freshness.
Mutations are validated and authorized.
UI handles loading and failures.
Relevant checks have been performed.
Final instruction

Next.js owns framework integration. It does not own every business rule simply because the code runs on its server.
