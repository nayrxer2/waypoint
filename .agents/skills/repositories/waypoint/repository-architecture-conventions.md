---
name: waypoint-repository-architecture-conventions
description: >-
  Enforce documented architecture, component ownership, route boundaries, and implementation conventions in the Waypoint repository.
---
Waypoint Repository Architecture Conventions
Scope

Apply only when working in the Waypoint repository.

These are repository-specific conventions, not universal React or Next.js rules.

1. Inspect before editing

Inspect the actual repository before relying on this document.

Confirm:

Installed framework versions.
Actual folder structure.
Current dependencies.
Existing components.
Route ownership.
Existing data-access conventions.

If documentation conflicts with implementation, investigate and report the discrepancy.

2. Frontend and backend ownership

Frontend owns:

Pages and layouts.
Components.
Interactions.
Rendering.
Styling.
Client-side behavior.
Frontend integration.

Backend owns:

Business rules.
Persistence.
Database integrity.
Authorization policy.
Server-side integrations.
Background processing.

Next.js server execution does not automatically transfer backend ownership to frontend.

3. Component conventions

Current documented components:

Component	Location	Responsibility
Icon	src/components/ui/icon.tsx	Shared SVG primitive
ProjectCard	src/components/dashboard/dashboard.tsx	Dashboard project presentation
TaskRow	src/components/dashboard/dashboard.tsx	Dashboard task presentation
ScheduleItem	src/components/dashboard/dashboard.tsx	Dashboard schedule preview
AvatarStack	src/components/dashboard/dashboard.tsx	Project member presentation
CredentialsForm	src/components/auth/credentials-form.tsx	Authentication form

Verify these locations and consumers before modifying or moving them.

Keep feature-specific components local until meaningful cross-feature reuse exists.

4. Route ownership
/ owns the dashboard.
/welcome owns the welcome and authentication experience.

Do not modify auth components as part of unrelated dashboard tasks.

When a shared change affects both routes, perform appropriate regression checks.

5. Global CSS

Treat src/app/globals.css as shared application infrastructure.

Modify it only when a concrete shared requirement justifies the change.

Before editing:

Identify all affected consumers.
Check whether a local solution is possible.
Identify potential regressions.
Preserve unrelated styles.
Verify affected routes.
6. Change restrictions
Avoid unrelated refactoring.
Avoid moving feature components without a reason.
Avoid new dependencies without approval.
Avoid duplicating business logic.
Avoid introducing architecture for hypothetical future needs.
Preserve existing user changes.
Inspect the final diff.
7. Verification

Run available lint, type-check, test, and build commands.

Check affected routes and interactions when browser testing is available.

Never claim unperformed verification.

Final instruction

Preserve Waypoint's existing architecture unless a concrete requirement justifies changing it.
