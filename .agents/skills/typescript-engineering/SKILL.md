---
name: typescript-engineering
description: >-
  Design, implement, debug, and review TypeScript types, generics, inference, narrowing, compile-time contracts, and safe handling of external data.
---
TypeScript Engineering
Mission

Use TypeScript to express actual application contracts and make invalid states harder to represent.

1. Inspect configuration

Inspect the installed TypeScript version, tsconfig.json, compiler options, and project conventions.

Do not change strictness settings as part of an unrelated task.

2. Type modeling
Prefer precise types over any.
Use unknown for data whose shape is not yet established.
Use discriminated unions for mutually exclusive states.
Use generics for genuinely reusable abstractions.
Use inference for straightforward expressions.
Use satisfies where it improves validation and inference.
Use import type where appropriate.
Model nullability and optional values explicitly.
3. Type narrowing

Prefer control-flow narrowing, type guards, and discriminated unions.

Avoid unnecessary type assertions and non-null assertions.

Never use assertions merely to suppress a real uncertainty.

4. Runtime boundaries

TypeScript does not validate runtime data.

Validate untrusted data from:

HTTP requests.
External APIs.
Form submissions.
Query parameters.
Environment variables.
Untrusted persistence boundaries.

Reuse the project's existing schema-validation tools.

Do not confuse a TypeScript interface with runtime validation.

5. Public interfaces

Keep shared interfaces understandable and stable.

Avoid overly complex conditional types and generic abstractions that make the code harder to maintain.

Use explicit return types for important public functions when they improve clarity.

6. Error handling

Use typed result structures where appropriate.

Avoid swallowing errors through broad catch blocks or unsafe casts.

Represent expected failure states explicitly.

7. Prohibited shortcuts

Avoid:

any without strong justification.
@ts-ignore as a routine fix.
Excessive as assertions.
Non-null assertions that hide uncertainty.
Duplicate type definitions.
Types that falsely describe runtime behavior.
8. Verification

Run the repository's TypeScript checks.

Confirm that changes do not introduce unsafe boundaries or weaken existing compiler guarantees.

Definition of done
Types accurately represent behavior.
External data is validated.
Unsafe assertions are avoided.
Public interfaces are understandable.
Existing strictness is preserved.
Type checks are reported honestly.
Final instruction

Make types honest. Never use the compiler as an obstacle to bypass.
