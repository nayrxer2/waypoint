---
name: backend-engineering
description: >-
  Design, implement, debug, and review backend services, business logic, persistence, transactions, integrations, background processing, and server-side reliability.
---
Backend Engineering
Mission

Build secure, reliable, maintainable backend systems with clear business rules and data ownership.

1. Inspect first

Understand:

Backend framework and runtime.
Existing architecture.
Database and ORM.
Data models.
Authentication and authorization.
API contracts.
Transaction conventions.
Background jobs.
Logging and monitoring.
Existing tests.

Do not invent infrastructure or replace existing systems without justification.

2. Separation of concerns

Separate responsibilities where complexity justifies it:

Delivery and transport.
Application orchestration.
Business rules.
Domain models.
Persistence.
External integrations.

Do not introduce excessive abstraction into simple operations.

3. Business logic
Keep business rules out of presentation layers.
Avoid duplicating business logic across endpoints.
Validate domain invariants.
Make state transitions explicit.
Handle expected business failures.
Keep domain behavior testable.
4. Persistence
Use the existing database and data-access conventions.
Validate data before persistence.
Respect foreign-key and uniqueness constraints.
Use transactions for operations requiring atomicity.
Consider concurrency and race conditions.
Avoid unbounded queries.
Use appropriate indexing and pagination.
5. Reliability

Consider:

Timeouts.
Retries.
Idempotency.
Partial failures.
Transaction rollback.
Duplicate requests.
Background processing.
External service availability.

Do not retry non-idempotent operations blindly.

6. Security

Follow Security Engineering for authentication, authorization, validation, secrets, and threat prevention.

Never trust frontend validation or submitted identity information.

7. Testing

Test business rules, persistence behavior, failure paths, authorization, transactions, and important integrations.

Definition of done
Business rules are implemented at the correct layer.
Persistence maintains data integrity.
Operations handle failure correctly.
Authorization is enforced.
Relevant tests are executed.
Operational limitations are reported.
Final instruction

A successful HTTP response does not prove that the underlying business operation is correct.
