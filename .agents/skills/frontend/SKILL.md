---

name: nextjs-typescript
description: > 
  Build, refactor, debug, and review production-ready Next.js applications using TypeScript, the App Router, React Server Components, server-side data access, type-safe forms, responsive UI, accessibility, and performance best practices. Use when working on Next.js pages, layouts, components, route handlers, Server Actions, data fetching, authentication integration, or TypeScript errors.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Next.js + TypeScript Engineering Skill

## Mission

## 1. Scope, Ownership, and Boundaries

### 1.1 Frontend Ownership

This skill owns the frontend implementation and Next.js-specific behavior, including:

* Pages, layouts, components, styling, and responsive interfaces.
* React component composition, props, state, hooks, and client interactions.
* Server Component and Client Component boundaries.
* Frontend routing, navigation, and rendering behavior.
* Forms, client-side validation, and user feedback.
* Consuming APIs and mapping API responses to UI models.
* Loading, empty, error, and success states.
* Accessibility, frontend performance, and browser compatibility.
* Frontend tests and user-facing behavior.
* Next.js-specific configuration and framework integration when relevant.

### 1.2 Backend Ownership

Do not independently assume ownership of backend engineering responsibilities merely because the application uses Next.js.

Backend responsibilities include:

* API contract design and backend endpoint implementation.
* Business rules and domain logic.
* Database schemas, migrations, queries, and transaction boundaries.
* Data integrity, concurrency control, and persistence.
* Authentication implementation and server-side authorization policy.
* Background jobs, queues, webhooks, and scheduled processing.
* Backend integrations, secrets management, and infrastructure.
* Backend-specific testing, observability, and reliability.

When a task involves these responsibilities, consult the repository's `backend` skill and follow its guidance.

### 1.3 Next.js Server Code Is Not Automatically Frontend Work

Next.js supports server-side capabilities, but framework location does not determine engineering ownership.

For example:

* A Server Component rendering existing application data is within this skill's scope.
* A Server Component calling an existing service or data-access module is within scope when the integration follows established conventions.
* A Route Handler implementing a new business workflow, database mutation, or authorization policy requires backend guidance.
* A Server Action performing a database write must follow backend rules for validation, authorization, transactions, and data integrity.
* A frontend rendering or hydration bug remains within this skill's scope even when it involves a Server Component.

Do not duplicate existing backend business logic in pages, components, or Server Actions.

### 1.4 API Integration Boundaries

For frontend-to-backend integration:

* Inspect existing endpoint definitions, schemas, API clients, and documentation before implementing an integration.
* Use the actual API contract rather than inventing request or response structures.
* Keep frontend view models separate from backend domain models when their responsibilities differ.
* Handle loading, empty, error, unauthorized, and successful responses appropriately.
* Do not silently change API semantics to make a UI implementation easier.
* Do not use hardcoded or mocked responses as evidence that a real integration works.
* Do not access the database directly from Client Components.
* Do not treat client-side validation or hidden UI controls as security enforcement.
* Report missing endpoints, fields, permissions, or contract decisions explicitly.

If the backend contract is incomplete or incompatible with the required UI, identify the required backend change and consult the backend skill.

### 1.5 Cross-Layer Tasks

Do not reject a task merely because it requires both frontend and backend changes.

When the user requests an end-to-end feature:

1. Separate the frontend, API, business logic, and persistence responsibilities.
2. Inspect existing implementations and define or confirm the API contract.
3. Consult the backend skill for backend changes.
4. Implement the frontend and any authorized cross-layer changes using the appropriate guidance.
5. Verify that the actual frontend integration matches the implemented backend behavior.
6. Report completed work, checks performed, and remaining dependencies.

A task requiring both skills does not automatically require a separate agent. Use the available tools and repository instructions, and do not claim that another agent was invoked unless it actually was.

### 1.6 Change Restrictions

* Do not modify backend-only files for a frontend-only request unless a concrete dependency makes the change necessary.
* Do not refactor unrelated backend code.
* Do not introduce a new database, ORM, API framework, authentication provider, or state-management library without a justified requirement.
* Do not create a new API endpoint when an existing server-side data-access path is appropriate.
* Do not move privileged operations into the browser.
* Do not bypass backend authorization, validation, or data-integrity controls.
* Do not implement fake success states to conceal missing backend functionality.
* Do not claim that backend work is complete when only frontend code has changed.

When a necessary backend change is outside the requested scope, explain the dependency and request direction only when a decision or permission is genuinely required. Otherwise, proceed with the authorized work and clearly identify what remains blocked.

### 1.7 Scope Decision Rule

Before implementing a change, determine which layer owns the behavior:

* **Presentation, interaction, rendering, or frontend integration:** use this skill.
* **Business rules, API behavior, authorization, persistence, or server-side integrity:** consult the backend skill.
* **A feature spanning both layers:** use both skills and keep responsibilities explicit.
* **A problem with unclear ownership:** trace the data flow and identify where the incorrect behavior originates before editing code.

Prefer fixing a defect at its actual source rather than compensating for it in another layer.

Build reliable, type-safe, fast, accessible, and visually polished web applications using Next.js and TypeScript.

Write code that follows the project's conventions, uses the App Router correctly, minimizes unnecessary client-side JavaScript, and remains easy to understand and maintain.

Do not merely make the code compile. Ensure the implementation satisfies the requirements, handles failure states, and follows the framework's actual behavior.

## 1. Inspect the project before coding

Before making changes:

1. Read `package.json` and identify the installed Next.js, React, and TypeScript versions.
2. Inspect `tsconfig.json`, `next.config.*`, and the package manager lockfile.
3. Determine whether the project uses the App Router (`app/`) or Pages Router (`pages/`).
4. Inspect relevant routes, layouts, components, hooks, utilities, and existing tests.
5. Identify the styling system, component library, form library, validation library, and data-access layer.
6. Check existing authentication, authorization, database, and API conventions when relevant.
7. Identify available linting, type-checking, test, and build scripts.

Use the existing architecture unless there is a clear reason to change it.

Do not migrate routers, replace styling systems, introduce state-management libraries, or install dependencies without a concrete requirement.

Prefer the project's installed version and official documentation over remembered APIs.

## 2. Next.js App Router architecture

Follow the App Router conventions when the project uses `app/`.

Common file conventions:

* `page.tsx`: route UI.
* `layout.tsx`: shared route layout.
* `loading.tsx`: loading UI.
* `error.tsx`: route-level error boundary.
* `not-found.tsx`: not-found UI.
* `route.ts`: HTTP route handlers.
* `template.tsx`: layouts that need a new instance on navigation.
* `default.tsx`: default UI for supported parallel route slots.
* `middleware.ts` or `proxy.ts`: follow the naming and capabilities supported by the installed Next.js version.

Keep route files focused on composition and route-specific behavior. Extract reusable business logic into appropriate modules.

Do not create a new abstraction for every component. Extract components when they have a meaningful responsibility, are reused, or improve readability.

## 3. React Server Components and Client Components

### Default to Server Components

In the App Router, components are Server Components by default.

Prefer Server Components for:

* Rendering pages and layouts.
* Fetching data from trusted server-side sources.
* Accessing server-only modules.
* Rendering static or request-specific content.
* Reducing client-side JavaScript.
* Keeping secrets and privileged operations on the server.

Do not add `"use client"` to a whole page or layout when only a small interactive component needs it.

### Use Client Components deliberately

Add `"use client"` at the smallest practical component boundary when browser APIs, state, effects, or client-side event handlers are required.

Examples include:

* Interactive menus and dialogs.
* Client-side form interactions.
* Local state and effects.
* Browser-only APIs.
* Client-side libraries that require browser execution.

Keep in mind that a Client Component can still be pre-rendered on the server. Do not access `window`, `document`, or browser storage during server rendering.

### Component boundary rules

* Pass serializable props across Server-to-Client Component boundaries.
* Do not pass ordinary closures or server-only objects as Client Component props.
* Do not import database clients, secret-bearing modules, or server-only utilities into client bundles.
* Keep static content and data-heavy work on the server when possible.
* Use React Context only where client-side shared state is actually needed.
* Keep client components small and focused.

Do not add `"use client"` just to resolve an unrelated rendering or import error without understanding the underlying cause.

## 4. TypeScript standards

Use TypeScript to model real application behavior, not merely to silence compiler errors.

### Type safety

* Avoid `any`; prefer a precise type, `unknown`, or a validated data structure.
* Avoid unnecessary type assertions such as `as SomeType`.
* Do not use non-null assertions to hide uncertainty.
* Prefer discriminated unions for mutually exclusive states.
* Use `satisfies` when validating an expression against a type while retaining useful inferred types.
* Use `import type` for type-only imports where appropriate.
* Use generics when they improve reusable APIs.
* Let TypeScript infer straightforward local types.
* Add explicit return types for important public functions and shared utilities when useful.
* Keep `strict` mode enabled when compatible with the existing project.

### Data validation

TypeScript types do not validate external data at runtime.

Validate untrusted data received from:

* HTTP requests.
* Query parameters.
* Form submissions.
* External APIs.
* Environment variables.
* Database boundaries when data integrity cannot otherwise be guaranteed.

Use the project's existing validation library, or introduce a suitable schema validator only when justified.

Treat parsed request bodies and URL parameters as untrusted until validated.

### Avoid unsafe shortcuts

Never use `@ts-ignore`, `any`, or forced assertions simply to bypass an error when a proper fix is practical.

If a suppression is genuinely necessary, keep it narrow and document why.

## 5. Routing and navigation

* Use file-based routing according to the existing router.
* Use `next/link` for internal navigation.
* Use `next/navigation` APIs supported by the installed version for App Router navigation.
* Use `useRouter` only when programmatic navigation is needed.
* Prefer ordinary links for navigation that does not require imperative behavior.
* Use dynamic route segments with appropriate parameter types.
* Validate and normalize user-controlled query parameters.
* Use `notFound()` when a requested resource genuinely does not exist.
* Use redirects for intentional navigation flows, not as substitutes for proper error handling.
* Preserve query parameters and navigation state when required by the user experience.

Never assume a route parameter is valid merely because TypeScript describes its shape.

Follow the installed Next.js version's conventions for asynchronous `params` and `searchParams`.

## 6. Data fetching and caching

### Data fetching

* Fetch data in Server Components when it simplifies the architecture and avoids unnecessary client requests.
* Use existing data-access modules instead of duplicating database or API logic.
* Avoid fetching the same data repeatedly when the project provides an appropriate deduplication mechanism.
* Parallelize independent requests when doing so is safe and beneficial.
* Use sequential requests when one operation depends on another.
* Handle expected failures explicitly.
* Avoid unnecessary loading waterfalls.
* Use pagination or bounded queries for potentially large datasets.

### Caching

Next.js caching behavior varies by version and API. Inspect the installed version and the project's configuration before choosing a caching strategy.

* Understand whether data is request-specific, reusable, or time-sensitive.
* Use the caching primitives supported by the installed version.
* Make invalidation behavior explicit when data changes.
* Avoid caching private or user-specific data in a way that could expose it to other users.
* Do not assume every server-side `fetch` is cached.
* Do not assume every route is dynamically rendered.
* Avoid adding caching directives without understanding their effect.
* Use revalidation only when it matches the freshness requirements.

For mutations, ensure relevant cached data and rendered views are refreshed using the supported invalidation mechanisms.

## 7. Server Actions and mutations

Use Server Actions when they fit the application's mutation workflow and are supported by the installed Next.js version.

A Server Action is a server entry point, not an automatic authorization mechanism.

For every mutation:

1. Validate the input on the server.
2. Authenticate the caller when authentication is required.
3. Authorize the requested operation against the specific resource.
4. Execute the mutation through the existing data-access layer.
5. Handle expected errors.
6. Invalidate or refresh affected data when necessary.
7. Return a safe result for the UI.

Additional rules:

* Never trust hidden fields, client-side checks, or submitted user IDs as proof of authorization.
* Avoid exposing database errors, stack traces, or internal implementation details.
* Use typed results for success and expected failure states.
* Keep secrets and privileged operations server-side.
* Prevent duplicate or conflicting submissions where the workflow requires it.
* Use the project's established transaction and consistency patterns for multi-step writes.

Do not use Server Actions for every read or every interaction. Choose the appropriate mechanism for the task.

## 8. Route Handlers and HTTP APIs

Use `app/api/**/route.ts` when an HTTP endpoint is required.

* Implement only the necessary HTTP methods.
* Validate incoming parameters, headers, and request bodies.
* Authenticate and authorize protected operations.
* Return appropriate status codes.
* Keep response structures consistent.
* Handle malformed requests and expected failures.
* Avoid returning internal error details or sensitive fields.
* Consider pagination, rate limiting, and request size for exposed endpoints.
* Avoid duplicating business logic between route handlers and Server Actions.

Do not create an API endpoint solely to fetch data that a Server Component can safely obtain directly from the existing server-side data layer.

## 9. Forms and validation

Build forms that are type-safe, accessible, and explicit about their state.

* Use semantic HTML forms and labeled controls.
* Validate on the server even if client-side validation exists.
* Reuse the project's existing validation schemas.
* Treat client validation as a usability improvement, not a security boundary.
* Represent validation errors clearly and associate them with the relevant fields.
* Preserve user input when validation fails where practical.
* Prevent accidental duplicate submissions.
* Provide pending, success, and failure feedback.
* Ensure keyboard and screen-reader users can understand the result.
* Avoid exposing internal exceptions to users.

For Server Actions, use the submission and pending-state APIs supported by the project's React and Next.js versions.

Use a form library only when it meaningfully simplifies the existing requirements.

## 10. Authentication and authorization

When working with protected resources:

* Follow the project's existing authentication provider and session model.
* Verify identity on the server.
* Enforce authorization at the data-access or operation boundary.
* Check ownership and permissions for individual resources.
* Do not treat client-side route guards as security controls.
* Do not trust user IDs or roles supplied by the client.
* Avoid logging session tokens, passwords, secrets, or sensitive personal information.
* Use secure cookie and session practices appropriate to the existing authentication system.

Middleware or Proxy checks may provide useful early navigation decisions, but they do not replace authorization checks in protected operations.

Do not implement a new authentication system or invent provider APIs when the task only requires integrating with an existing one.

## 11. UI, styling, and design quality

The application should look intentional, consistent, and production-ready.

Before building UI:

1. Inspect existing design tokens, fonts, assets, and shared components.
2. Identify the intended hierarchy and primary user action.
3. Establish spacing, typography, colors, and layout constraints.
4. Determine responsive behavior and important interaction states.
5. Follow provided mockups, screenshots, or brand guidelines.

### Styling

Use the existing styling solution, whether it is Tailwind CSS, CSS Modules, a component library, or another established approach.

If using Tailwind CSS:

* Follow the version and configuration already installed.
* Prefer consistent utility patterns and existing design tokens.
* Extract repeated patterns when doing so improves maintainability.
* Avoid building overly long class strings when a reusable component would be clearer.
* Avoid introducing arbitrary values when a shared token is appropriate.

For every styling approach:

* Build responsive layouts with Grid and Flexbox where appropriate.
* Use consistent spacing and typography.
* Avoid unnecessary fixed widths and heights.
* Provide visible focus states.
* Support narrow screens and zoom.
* Use meaningful empty, loading, and error states.
* Keep visual effects purposeful.
* Avoid generic, repetitive layouts that ignore the product's identity.

When given a reference image, compare the rendered output with the reference if browser or screenshot tools are available. Prioritize major layout differences before minor decoration.

## 12. Accessibility

* Use semantic HTML and logical heading structure.
* Ensure interactive controls work with a keyboard.
* Provide visible focus indicators.
* Associate labels, instructions, and validation messages with form controls.
* Give meaningful images appropriate alternative text.
* Give icon-only buttons accessible names.
* Use accessible dialog and menu patterns.
* Communicate asynchronous status changes appropriately.
* Maintain adequate contrast.
* Avoid relying on color alone.
* Respect reduced-motion preferences.

Use ARIA when necessary, not as a replacement for correct HTML.

## 13. Images, fonts, and metadata

### Images

Use `next/image` for suitable image use cases when supported by the project.

* Provide appropriate dimensions or layout constraints.
* Configure remote image sources according to the installed Next.js version.
* Use responsive sizing where needed.
* Add meaningful alternative text.
* Use priority-loading options only for images that genuinely need early loading.
* Avoid lazy-loading the main above-the-fold image when it would harm perceived performance.

Use ordinary image elements when appropriate, such as for cases where Next.js image optimization is not required or is incompatible with the asset workflow.

### Fonts

* Prefer the project's existing font setup.
* Use `next/font` where appropriate for supported font sources.
* Avoid unnecessary external font requests.
* Establish a consistent typographic scale.

### Metadata

* Define meaningful page titles and descriptions.
* Use the Metadata API supported by the installed version.
* Configure canonical URLs, social sharing metadata, icons, and robots directives when required.
* Generate route-specific metadata for dynamic pages when appropriate.
* Avoid indexing private or sensitive pages.
* Keep metadata consistent with the actual page content.

## 14. Performance and rendering

* Prefer Server Components when client interactivity is unnecessary.
* Minimize unnecessary JavaScript sent to the browser.
* Split large interactive components where appropriate.
* Avoid unnecessary client-side data fetching.
* Use appropriate image sizing and loading behavior.
* Avoid blocking the page on unrelated requests.
* Use streaming and Suspense boundaries where they improve perceived performance.
* Avoid layout shifts and expensive client-side initialization.
* Use virtualization for genuinely large client-rendered lists when appropriate.
* Measure before making speculative optimizations.

Understand the difference between server rendering, static generation, dynamic rendering, client-side navigation, and caching.

Do not add `"use client"`, `useEffect`, or a global store as a default response to every UI problem.

## 15. Error handling and observability

Handle expected failures intentionally.

* Use `error.tsx` or other supported error boundaries for route-level failures.
* Remember that App Router error boundaries are Client Components where required by the framework.
* Use `not-found.tsx` and `notFound()` for missing resources.
* Distinguish expected business errors from unexpected exceptions.
* Keep user-facing errors understandable.
* Log operational details only through the project's established logging system.
* Never expose stack traces or secret-bearing values to users.
* Provide a recovery path when one is reasonable.

Do not silently swallow exceptions or return fake successful results after a failed operation.

## 16. Security

Treat security as a server-side responsibility.

* Keep private environment variables on the server.
* Never expose secrets through `NEXT_PUBLIC_*` variables.
* Validate all untrusted inputs.
* Authorize access to protected resources.
* Avoid SQL injection and unsafe query construction.
* Avoid unsafe HTML injection and untrusted dynamic code.
* Avoid open redirects based on unvalidated input.
* Protect mutation endpoints according to the application's authentication and request model.
* Avoid leaking private data through logs, error messages, caches, or serialized props.
* Follow the project's established content security and security-header policies.

Do not assume that Server Components, Server Actions, hidden UI elements, or TypeScript types automatically make an operation secure.

## 17. Testing strategy

Use the test tools already present in the repository.

Choose the appropriate level of verification:

* Unit tests for pure functions and business logic.
* Component tests for interactive behavior.
* Integration tests for database, authentication, and request flows.
* End-to-end tests for critical user journeys.
* Type checking for TypeScript correctness.
* Production builds for framework compilation and integration issues.

Test important cases such as:

* Successful operations.
* Invalid user input.
* Unauthorized access.
* Missing resources.
* Loading and empty states.
* Network or database failures.
* Duplicate submissions where relevant.
* Responsive and keyboard interaction when visual testing is available.

Do not introduce a new testing framework unless needed and approved by the project's conventions.

Never claim tests, builds, or browser verification passed unless they actually ran successfully.

## 18. Required workflow

### Phase A — Inspect

Read the relevant files, package scripts, framework version, and existing conventions.

### Phase B — Plan

Identify the route, server/client boundaries, data flow, validation requirements, and expected UI behavior.

### Phase C — Implement

Make focused changes. Preserve existing functionality and keep secrets and privileged operations server-side.

### Phase D — Validate

Run applicable formatting, linting, type checks, tests, and build commands.

### Phase E — Review

Inspect the diff, confirm route and rendering behavior, and look for accessibility, security, and responsive issues.

### Phase F — Report

Summarize the changes, verification performed, and remaining limitations.

For small changes, keep the workflow lightweight. Do not add process overhead that does not improve the result.

## 19. Definition of done

* [ ] The requested behavior is implemented.
* [ ] The correct Next.js router and version-specific conventions are used.
* [ ] Server and Client Component boundaries are appropriate.
* [ ] TypeScript errors have been resolved where feasible.
* [ ] External input is validated.
* [ ] Authentication and authorization are enforced where needed.
* [ ] Data fetching and caching match the freshness and privacy requirements.
* [ ] UI is responsive, accessible, and visually consistent.
* [ ] Loading, error, and empty states are addressed where relevant.
* [ ] Metadata and image handling are appropriate where applicable.
* [ ] Relevant checks were run and their results reported accurately.
* [ ] Unrelated changes and unnecessary dependencies were avoided.

## 20. Official documentation

Use the documentation matching the installed framework version.

* Next.js documentation: https://nextjs.org/docs
* Next.js App Router: https://nextjs.org/docs/app
* React documentation: https://react.dev/learn
* TypeScript handbook: https://www.typescriptlang.org/docs/
* TypeScript configuration: https://www.typescriptlang.org/tsconfig/
* MDN Web Docs: https://developer.mozilla.org/
* web.dev Learn: https://web.dev/learn/
* W3C Web Accessibility Initiative: https://www.w3.org/WAI/

Consult the official documentation whenever APIs, caching behavior, route conventions, or framework defaults may have changed.

## Final instruction

Act as a senior Next.js and TypeScript engineer.

Inspect before changing. Prefer server-first architecture. Keep types honest. Validate untrusted input. Protect server-side operations. Build polished and accessible interfaces. Test what you can actually test. Follow the installed framework version instead of relying on assumptions.

Deliver the smallest maintainable implementation that fully satisfies the user's requirements.
