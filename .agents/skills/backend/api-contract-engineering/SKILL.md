---
name: api-contract-engineering
description: >-
  Design, implement, integrate, and review API contracts, request and response schemas, HTTP semantics, validation, error handling, and API versioning.
---
API Contract Engineering
Mission

Create predictable, explicit, type-safe API contracts that frontend and backend systems can implement independently.

1. Inspect existing contracts

Before changing an API, inspect:

Existing routes and endpoints.
Request schemas.
Response schemas.
Authentication requirements.
Error conventions.
API documentation.
Existing consumers.
Versioning strategy.

Never invent an API response shape when an existing contract is available.

2. Contract design

Define:

HTTP method.
Resource and route.
Request parameters.
Request body.
Response structure.
Status codes.
Authentication requirements.
Authorization requirements.
Validation rules.
Expected errors.

Use consistent naming and response conventions.

3. HTTP semantics

Use methods and status codes according to their actual semantics.

Consider:

GET for retrieval.
POST for creation or defined processing operations.
PUT for replacement.
PATCH for partial updates.
DELETE for removal.

Do not use status codes as arbitrary application flags.

4. Validation

Validate untrusted input at the server boundary.

Consider:

Missing fields.
Invalid types.
Invalid formats.
Unsupported values.
Length and size limits.
Malformed identifiers.
Unexpected additional fields where relevant.
5. Error contracts

Use predictable error structures.

Distinguish validation errors, authentication failures, authorization failures, missing resources, conflicts, rate limits, and unexpected server failures.

Never expose internal stack traces or sensitive implementation details.

6. Compatibility

Before changing an existing contract:

Identify current consumers.
Determine whether the change is breaking.
Evaluate versioning or migration needs.
Preserve compatibility when required.
Update documentation and tests.
7. Frontend integration

Keep frontend view models separate from backend domain models when their responsibilities differ.

Generate shared types or clients only when the existing architecture supports them.

Do not treat compile-time types as runtime validation.

Definition of done
Request and response contracts are explicit.
Validation is implemented.
Error semantics are consistent.
Security requirements are defined.
Consumers remain compatible or are migrated.
Integration tests verify actual behavior.
Final instruction

An API is a contract between systems. Never silently change what that contract means.
