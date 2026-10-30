---
name: waypoint-repository-architecture-conventions
description: >-
  Apply the Waypoint repository's architecture, component ownership, route
  boundaries, and implementation conventions. Use only when working in the
  Waypoint repository.
---

# Waypoint Repository Architecture Conventions

## Scope and ownership

This is repository-specific guidance for architecture and implementation
boundaries. It complements, but does not replace, general React, Next.js,
TypeScript, backend, and security skills.

## When to use

- When changing Waypoint routes, application structure, module ownership, or
  feature boundaries.
- When a requested change may affect existing Waypoint behavior across routes.

## When not to use

- In other repositories.
- As a substitute for inspecting the current implementation.
- For styling decisions owned by
  [Waypoint Design System Governance](../waypoint-design-system-governance/SKILL.md).

## Procedure

1. Inspect the actual repository, framework versions, dependencies, route
   ownership, and current implementation.
2. Read the focused repository guidance in
   [repositories/waypoint](../repositories/waypoint/repository-architecture-conventions.md).
3. Apply the relevant general engineering skills and preserve existing behavior.
4. Make a narrow change, then run appropriate checks on affected routes and
   interactions.

## Conflict and stop conditions

If repository documentation conflicts with the code, investigate before
proceeding and follow the current implementation unless the user requests a
behavioral change. Stop for unresolved authorization, destructive consequences,
or an external contract required to continue.

## Verification

Run available lint, type, test, and build checks appropriate to the change.
Report what was actually run, its outcome, and any remaining limitations.
