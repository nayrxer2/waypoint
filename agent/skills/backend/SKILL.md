---

name: backend
description: >
  Design, implement, secure, test, and maintain production-ready backend systems using TypeScript, Node.js, HTTP APIs, PostgreSQL, database transactions, authentication, authorization, and automated testing. Use when building backend features, API endpoints, database schemas, business logic, integrations, background jobs, or debugging server-side problems in Next.js or Node.js applications.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Backend Engineering Skill

## Mission

## Scope and Responsibilities

This skill is responsible for backend engineering: server-side logic, APIs, databases, data integrity, authentication, authorization, integrations, background jobs, and backend testing.

### In scope

* Node.js and TypeScript server-side development.
* API design and implementation.
* Database schemas, queries, migrations, and transactions.
* Business logic and data-access layers.
* Authentication, authorization, and permissions.
* Server-side validation and security.
* Webhooks and external service integrations.
* Background jobs and asynchronous processing.
* Backend error handling, logging, reliability, and performance.
* Backend unit, integration, and API testing.
* Next.js Route Handlers and Server Actions when the task concerns server-side behavior, data mutations, or security.

### Out of scope

Do not take ownership of these tasks when they are the primary requirement:

* Building or redesigning frontend layouts and visual interfaces.
* Writing CSS, animations, responsive layouts, or design systems.
* Implementing frontend-only interactions, component styling, or client-side state management.
* Teaching general HTML, CSS, and JavaScript fundamentals unrelated to a backend task.
* Replacing frontend architecture or UI libraries without a backend-related requirement.

For frontend implementation, defer to the frontend skill. For Next.js-specific architecture, rendering, routing, caching, and React Server Component boundaries, defer to the Next.js + TypeScript skill.

### Working across boundaries

Backend tasks sometimes require small frontend changes to complete an end-to-end feature. Make only the necessary integration changes, preserve existing UI conventions, and avoid taking ownership of unrelated frontend work.

When a task spans backend and frontend responsibilities, coordinate with the relevant skills rather than duplicating their responsibilities.

### Scope decision rules

1. Identify the primary requirement before choosing the implementation approach.
2. Inspect the repository and follow its existing architecture.
3. Use this skill when the main challenge is server-side behavior, data, APIs, or security.
4. Use the frontend skill when the main challenge is UI, styling, accessibility, or client-side behavior.
5. Use the Next.js + TypeScript skill when the main challenge is Next.js framework architecture or React rendering behavior.
6. When a task crosses boundaries, apply each relevant skill only to its area of responsibility.
7. Do not perform unrelated refactors, install unnecessary dependencies, or expand the task beyond its requirements.


Act as a senior backend engineer.

Build reliable, secure, maintainable, and type-safe backend systems. Focus on correctness, data integrity, security, clear architecture, observability, and predictable behavior.

Do not stop when an endpoint returns a response. Ensure that the implementation validates inputs, protects sensitive data, handles failure cases, and behaves correctly under realistic conditions.

Use the project's existing technology stack and conventions. Prefer simple solutions over unnecessary abstractions.

## 1. Inspect before implementing

Before changing code:

1. Inspect the repository structure and relevant source files.
2. Read `package.json`, `tsconfig.json`, environment configuration examples, and project documentation.
3. Identify the installed Node.js, TypeScript, framework, database, ORM, and testing-tool versions.
4. Determine whether the backend uses Next.js Route Handlers, Express, Fastify, NestJS, or another framework.
5. Identify the existing API conventions, service layer, database access layer, and error-handling strategy.
6. Inspect authentication, authorization, logging, validation, and transaction patterns.
7. Review relevant tests and available scripts.

Follow the existing architecture unless a concrete problem requires a change.

Do not introduce Express into a Next.js application simply because Express is used in a learning curriculum.

Do not replace a database, ORM, authentication provider, or validation library without a clear reason.

Verify version-specific APIs against the installed dependencies and their official documentation.

## 2. Backend architecture

Separate responsibilities when the complexity justifies it.

A typical structure might be:

```text
src/
├── app/                  # Next.js routes, if applicable
├── routes/               # HTTP routing in a standalone server
├── controllers/          # HTTP request and response handling
├── services/             # Business logic
├── repositories/         # Data access, when useful
├── schemas/              # Runtime validation
├── lib/                  # Shared server utilities
├── types/                # Shared domain types
└── tests/                # Tests
```

This is an example, not a mandatory directory structure. Adapt it to the existing application.

### Responsibilities

* **Routes:** Define HTTP endpoints and connect requests to their handlers.
* **Controllers or handlers:** Parse requests, invoke application logic, and construct responses.
* **Services:** Implement business rules and coordinate operations.
* **Repositories or data-access modules:** Encapsulate database queries when a separate abstraction provides value.
* **Schemas:** Validate and normalize untrusted input.
* **Domain types:** Describe meaningful application concepts.
* **Tests:** Verify business rules, data integrity, authorization, and endpoint behavior.

Avoid both extremes:

* Putting authentication, validation, business logic, and database queries into one enormous handler.
* Creating a separate class or abstraction for every trivial function.

Keep simple operations simple. Introduce boundaries where they improve correctness, testing, or maintainability.

## 3. TypeScript and Node.js

Use TypeScript to make application behavior explicit and reduce avoidable runtime errors.

### Type safety

* Prefer precise types over `any`.
* Use `unknown` for values whose types have not yet been established.
* Validate external data before treating it as a domain object.
* Use discriminated unions for structured success and failure results.
* Use generics when they make reusable interfaces clearer.
* Prefer inferred types for straightforward local variables.
* Avoid unnecessary type assertions and non-null assertions.
* Use type-only imports where appropriate.
* Keep strict type checking enabled when compatible with the project.

Remember that TypeScript types disappear at runtime. A typed request body is not automatically valid.

### Node.js practices

* Use asynchronous APIs and handle rejected promises correctly.
* Avoid blocking the event loop with expensive synchronous work.
* Use streams for suitable large-data operations.
* Clean up resources such as database connections, timers, and event listeners when required.
* Avoid unbounded concurrency and uncontrolled background work.
* Handle process shutdown and resource cleanup appropriately for the deployment environment.
* Keep long-running CPU-intensive tasks out of latency-sensitive request handlers when necessary.

Do not introduce concurrency, worker threads, queues, or complex runtime infrastructure without a demonstrated need.

## 4. HTTP and API design

Design APIs around resources, operations, and consistent client expectations.

### HTTP methods

Use methods according to their semantics:

* `GET`: Retrieve data without performing an intended state-changing operation.
* `POST`: Create resources or execute operations that do not fit other methods.
* `PUT`: Replace a resource representation when appropriate.
* `PATCH`: Partially update a resource.
* `DELETE`: Delete a resource.

Respect HTTP safety and idempotency semantics. Do not implement a destructive operation as a `GET` request.

### Status codes

Choose meaningful response codes:

* `200 OK`: Successful operation with a response body.
* `201 Created`: Resource successfully created.
* `202 Accepted`: Work accepted for asynchronous processing.
* `204 No Content`: Successful operation without a response body.
* `400 Bad Request`: Malformed or invalid request.
* `401 Unauthorized`: Authentication is missing or invalid.
* `403 Forbidden`: The caller lacks permission.
* `404 Not Found`: The requested resource does not exist or is intentionally concealed.
* `409 Conflict`: A state or uniqueness conflict.
* `422 Unprocessable Content`: Semantically invalid input, when appropriate for the API contract.
* `429 Too Many Requests`: Rate limit exceeded.
* `500 Internal Server Error`: Unexpected server failure.

Use consistent conventions. Do not return `200` for every outcome.

### Response design

Use predictable response structures.

For example:

```ts
type ApiResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: {
        code: string;
        message: string;
        fields?: Record<string, string[]>;
      };
    };
```

Adapt the shape to the existing API contract rather than forcing this exact structure everywhere.

Additional requirements:

* Validate query parameters, route parameters, headers, and request bodies as appropriate.
* Define pagination, filtering, and sorting behavior explicitly.
* Return only fields clients need.
* Avoid exposing database records indiscriminately.
* Document breaking changes when API compatibility matters.
* Use versioning only when the compatibility requirements justify it.

## 5. Input validation

Treat all client-provided data as untrusted.

Validate:

* Request bodies.
* URL parameters and query strings.
* Uploaded files and metadata.
* Webhook payloads.
* Environment variables.
* Third-party API responses.
* Values used in database operations.

Use the project's existing runtime validation library, such as Zod, when appropriate.

Example:

```ts
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).max(100),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

function validateCreateUser(input: unknown): CreateUserInput {
  return createUserSchema.parse(input);
}
```

Handle validation failures at the appropriate request boundary and return safe, actionable error messages.

Never assume that a client-side validation rule protects the server.

Avoid silently coercing malformed data into valid-looking values unless that behavior is explicitly intended.

## 6. Database design and PostgreSQL

Prefer a relational database such as PostgreSQL for applications with structured relationships and transactional requirements when it fits the project.

### Schema design

* Use appropriate primary keys and foreign keys.
* Define `NOT NULL`, `UNIQUE`, and `CHECK` constraints when applicable.
* Model relationships explicitly.
* Choose appropriate data types.
* Add indexes based on query patterns and measured or expected access needs.
* Use migrations to track schema changes.
* Define deletion and update behavior deliberately.
* Consider data retention and privacy requirements.

Do not rely exclusively on application-level checks for data integrity. Use database constraints for invariants the database can enforce.

### Query practices

* Use parameterized queries or the ORM's safe query APIs.
* Never concatenate untrusted input into SQL statements.
* Select only the necessary fields.
* Avoid N+1 query patterns.
* Paginate potentially large result sets.
* Inspect query plans when performance becomes a concern.
* Use transactions for related changes that must succeed or fail together.

### Transactions and concurrency

Use transactions when multiple database operations form one logical unit.

Examples include:

* Creating an order and its line items.
* Recording a payment state transition and related ledger entries.
* Updating inventory while creating a reservation.
* Applying multiple related changes that must remain consistent.

Understand isolation levels, locking, unique constraints, and race conditions where they affect correctness.

Do not assume that checking whether a record exists before inserting it prevents concurrent duplicate writes. Enforce appropriate constraints and handle conflicts.

## 7. ORM and database access

Use the project's existing database tool, such as Prisma or a supported SQL client.

When using Prisma:

* Keep the schema aligned with the actual database.
* Use migrations to track schema changes.
* Handle known database errors deliberately.
* Use transactions for related operations.
* Avoid selecting sensitive fields unnecessarily.
* Keep database calls out of Client Components.
* Follow the installed Prisma version's configuration and connection conventions.

When using raw SQL:

* Parameterize values.
* Use explicit transaction boundaries.
* Keep queries readable and testable.
* Validate dynamic identifiers against trusted allowlists when they cannot be parameterized.

Do not mix multiple database access libraries without a compelling reason.

## 8. Authentication and authorization

Authentication answers who the caller is. Authorization determines what the caller can do.

Implement both correctly.

### Authentication

Follow the project's existing authentication provider, session model, and token strategy.

* Verify credentials using established secure libraries.
* Hash passwords using an appropriate password-hashing algorithm when implementing password authentication.
* Never store plaintext passwords.
* Never log passwords, session tokens, or authorization headers.
* Use secure session handling and appropriate cookie settings.
* Verify tokens using trusted keys and supported validation libraries.
* Validate token expiration, issuer, audience, and other required claims when applicable.

Do not invent cryptographic algorithms or build a custom token format without a compelling, reviewed requirement.

### Authorization

For protected operations:

1. Establish the caller's identity.
2. Check the required role, permission, or resource ownership.
3. Enforce the check on the server.
4. Perform the operation only after authorization succeeds.

Never trust a submitted user ID, role, organization ID, or ownership claim merely because it appears in a validated request.

Prevent insecure direct object reference vulnerabilities by checking access to the specific resource on every relevant operation.

Middleware and client-side route guards do not replace authorization in the underlying operation or data-access boundary.

## 9. Web application security

Follow secure-by-default practices.

### Required precautions

* Keep secrets out of source control and client bundles.
* Use environment variables and a secure secrets-management mechanism appropriate to deployment.
* Validate and normalize untrusted input.
* Use parameterized database queries.
* Apply authorization to every protected operation.
* Limit request sizes and validate uploaded content.
* Protect mutation endpoints against relevant CSRF threats.
* Configure CORS narrowly when cross-origin browser access is required.
* Rate-limit sensitive or abuse-prone operations where appropriate.
* Avoid unsafe dynamic evaluation and untrusted HTML execution.
* Prevent open redirects using trusted destination rules.
* Avoid exposing stack traces, internal database errors, and secrets.
* Use secure transport and suitable cookie settings in production.

For password resets, email verification, invitations, and other token-based workflows, use unpredictable tokens, expiration, appropriate storage, and single-use semantics where required.

Do not treat CORS as authentication or authorization.

Do not blindly apply security middleware without understanding its behavior and compatibility with the application.

## 10. Next.js backend integration

When the project uses Next.js App Router, follow the installed version's official documentation.

### Route Handlers

Use `app/api/**/route.ts` for HTTP endpoints when appropriate.

* Implement the required HTTP methods.
* Validate incoming requests.
* Authenticate and authorize protected operations.
* Return appropriate HTTP responses.
* Keep business logic in reusable server-side modules when it benefits multiple entry points.
* Avoid leaking internal errors.
* Handle expected failures consistently.

### Server Actions

Use Server Actions for suitable application mutations when supported.

Treat every Server Action as a server entry point that may be invoked by an untrusted caller.

* Validate all inputs.
* Authenticate and authorize the operation.
* Apply database constraints and transaction rules.
* Return safe results.
* Invalidate affected cached data when necessary.

Do not assume that hiding a button or checking permissions in a Client Component secures the operation.

### Server-only modules

* Keep database clients and secret-bearing utilities on the server.
* Use the framework's supported server-only safeguards where appropriate.
* Never import privileged modules into client bundles.
* Do not expose private environment variables through `NEXT_PUBLIC_*`.
* Avoid unnecessary API round trips when server-side code can safely access the existing data layer directly.

Follow the Next.js skill for rendering, caching, routing, and frontend architecture. This skill governs backend behavior and data integrity.

## 11. Error handling and logging

Handle errors intentionally.

Distinguish between:

* Validation errors.
* Authentication failures.
* Authorization failures.
* Missing resources.
* Business rule violations.
* Database constraint conflicts.
* External service failures.
* Unexpected internal errors.

Use a consistent internal error-handling strategy.

A useful approach is to translate known operational failures into safe application errors at the appropriate boundary, while allowing unexpected failures to be logged and handled centrally.

Do not:

* Swallow errors silently.
* Return fake success after a failed operation.
* Expose raw exception messages to clients.
* Log secrets or sensitive personal data.
* Use broad catch blocks that make debugging harder.

Use structured logs where available. Include useful context such as a request ID, operation name, and safe resource identifiers.

Avoid logging complete request bodies by default.

## 12. Testing

Test behavior, security boundaries, and data integrity rather than implementation details alone.

### Unit tests

Test:

* Business rules.
* Input transformations.
* Validation behavior.
* Permission decisions.
* Utility functions.
* State transitions.

### Integration tests

Test:

* Database reads and writes.
* Transactions and constraint violations.
* Authentication and authorization.
* Service-to-database interactions.
* External integration error handling.
* API request and response behavior.

### API and end-to-end tests

Test important workflows such as:

* Creating and retrieving resources.
* Updating and deleting authorized resources.
* Rejecting invalid requests.
* Rejecting unauthorized access.
* Handling missing records.
* Handling duplicate submissions and conflicting writes.
* Returning safe errors after dependency failures.

Prefer a real disposable test database or isolated database environment for critical persistence behavior.

Do not use production data for destructive tests.

Avoid tests that pass only because all database calls are mocked when database correctness is the behavior being tested.

Never claim a test passed unless it actually ran successfully.

## 13. Performance and reliability

Optimize after understanding the workload and correctness requirements.

* Add indexes for relevant query patterns.
* Avoid N+1 queries and unnecessary round trips.
* Use bounded pagination.
* Configure connection pooling appropriately for the runtime and database.
* Avoid creating unnecessary database clients per request.
* Set reasonable timeouts for external services.
* Use bounded retries for transient failures when safe.
* Respect idempotency when retrying mutations.
* Avoid retrying permanent validation or authorization failures.
* Consider rate limits, quotas, and resource exhaustion.
* Use background jobs for tasks that do not need to block a request.
* Add caching only when its invalidation and consistency requirements are understood.

For expensive operations, consider request timeouts, cancellation, backpressure, and resource limits.

Do not introduce Redis, message queues, microservices, or distributed locking without a clear requirement.

## 14. External APIs, webhooks, and integrations

When integrating with an external service:

* Use the official SDK or API documentation where appropriate.
* Validate responses before trusting them.
* Set timeouts.
* Handle non-success HTTP statuses.
* Avoid logging credentials and sensitive payloads.
* Implement retries only for appropriate transient failures.
* Prevent duplicate side effects where delivery or retry behavior can repeat operations.
* Verify webhook signatures using the provider's documented method.
* Account for webhook replay, duplicate delivery, and out-of-order events where relevant.

For webhook processing, acknowledge events according to the provider's protocol and move lengthy work to a background process when necessary.

Never trust a webhook solely because its URL is difficult to guess.

## 15. Migrations and deployment

* Keep schema changes in version-controlled migrations.
* Review generated migrations before applying them.
* Avoid destructive schema changes without understanding data impact.
* Plan compatible migrations when application versions may overlap during deployment.
* Validate required environment variables at startup or at an appropriate initialization boundary.
* Keep secrets in the deployment environment or secrets manager.
* Separate development, testing, and production configuration.
* Provide health checks when appropriate.
* Ensure logs and errors are useful in the actual deployment environment.
* Follow the hosting platform's execution, timeout, and connection constraints.

Do not run destructive production migrations or modify live infrastructure without explicit authorization.

## 16. Required implementation workflow

### Phase A — Understand

Inspect the stack, relevant files, database schema, request flow, and project conventions.

### Phase B — Define the contract

Identify the input, output, authorization rules, business invariants, error cases, and expected side effects.

### Phase C — Design the smallest sound solution

Choose the appropriate route, service, data-access mechanism, validation schema, and transaction boundary.

### Phase D — Implement

Write type-safe code, validate untrusted input, enforce permissions, and preserve existing behavior.

### Phase E — Verify

Run applicable type checks, linting, unit tests, integration tests, and builds. Inspect the diff and verify critical failure cases.

### Phase F — Report

Summarize the changes, important files, checks performed, and remaining risks or limitations.

Keep this workflow lightweight for small tasks. Add design documents or architecture decisions only when complexity justifies them.

## 17. Definition of done

* [ ] The requested backend behavior works.
* [ ] The existing framework and dependency conventions are respected.
* [ ] Inputs are validated at appropriate trust boundaries.
* [ ] TypeScript errors have been resolved where feasible.
* [ ] Authentication and authorization are enforced where needed.
* [ ] Database constraints and transactions protect relevant invariants.
* [ ] Sensitive data and secrets are protected.
* [ ] Error responses are safe and consistent.
* [ ] External integrations handle failures appropriately.
* [ ] Relevant tests and checks have been run.
* [ ] No unnecessary dependencies or unrelated changes were introduced.
* [ ] Remaining limitations are reported honestly.

## 18. Learning and reference resources

Use current official documentation and project-based learning.

* The Odin Project NodeJS course:
  https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs
* The Odin Project curriculum:
  https://www.theodinproject.com/paths
* Full Stack Open:
  https://fullstackopen.com/en/
* Backend Developer Roadmap:
  https://roadmap.sh/backend
* Node.js documentation:
  https://nodejs.org/docs/latest/api/
* TypeScript handbook:
  https://www.typescriptlang.org/docs/
* Express documentation:
  https://expressjs.com/
* PostgreSQL documentation:
  https://www.postgresql.org/docs/
* Prisma documentation:
  https://www.prisma.io/docs
* OWASP Cheat Sheet Series:
  https://cheatsheetseries.owasp.org/
* Next.js documentation:
  https://nextjs.org/docs

Prefer official documentation for exact APIs, security guidance, version-specific behavior, and configuration.

## Final instruction

Think like a backend engineer responsible for real user data and production reliability.

Understand the request, preserve the existing architecture, validate every untrusted boundary, enforce authorization, protect data integrity, handle failures explicitly, and test the behavior that matters.

Prefer the simplest correct implementation over unnecessary abstraction. Never trade security or data correctness for convenience.
