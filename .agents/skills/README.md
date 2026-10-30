# AI Engineering Skills Library

A modular engineering skill system for AI coding agents.

This library provides specialized engineering guidance for frontend development, backend development, architecture, security, testing, and repository-specific conventions.

Its purpose is to help an AI agent make sound engineering decisions, implement maintainable software, avoid unnecessary complexity, and verify its work.

## 1. Core principles

The skill library follows these principles:

- **Correctness over speed:** Prefer verified implementations over plausible but untested solutions.
- **Simplicity over complexity:** Use the simplest architecture that satisfies the actual requirements.
- **Inspect before changing:** Understand the repository before modifying it.
- **Explicit ownership:** Keep frontend, backend, infrastructure, and business responsibilities separate.
- **Minimal scope:** Change only what the task requires.
- **Honest verification:** Never claim a test, build, installation, or visual inspection succeeded unless it actually occurred.
- **Dependency discipline:** Do not introduce unnecessary packages or architectural abstractions.
- **Security by design:** Validate untrusted input and enforce authorization at protected operation boundaries.
- **Preservation:** Protect existing functionality, design decisions, and user modifications.
- **Evidence-based decisions:** Challenge assumptions and distinguish verified facts from assumptions.

## 2. Directory structure

The library contains 19 specialized skills.

```text
skills/
│
├── README.md
├── SKILL_STANDARDS.md
├── SKILL_ROUTING.md
│
├── frontend/
│   ├── react/
│   │   ├── react-component-engineering.skill.md
│   │   ├── react-hooks-engineering.skill.md
│   │   └── react-state-management.skill.md
│   │
│   ├── frameworks/
│   │   └── nextjs-app-router.skill.md
│   │
│   ├── languages/
│   │   └── typescript-engineering.skill.md
│   │
│   ├── quality/
│   │   ├── frontend-performance.skill.md
│   │   ├── frontend-accessibility.skill.md
│   │   └── frontend-testing.skill.md
│   │
│   └── design/
│       └── frontend-design-engineering.skill.md
│
├── architecture/
│   ├── project-structure-architect.skill.md
│   └── dependency-governance.skill.md
│
├── backend/
│   ├── backend-engineering.skill.md
│   ├── api-contract-engineering.skill.md
│   └── security-engineering.skill.md
│
└── repositories/
    └── waypoint/
        ├── repository-architecture-conventions.skill.md
        └── repository-design-system-governance.skill.md
```

The 19 skills are:

| # | Skill | Primary responsibility |
|---:|---|---|
| 1 | React Component Engineering | Component design and composition |
| 2 | React Hooks Engineering | Hooks and effect correctness |
| 3 | React State Management | State architecture |
| 4 | Next.js App Router | Next.js framework behavior |
| 5 | TypeScript Engineering | Type safety and data modeling |
| 6 | Frontend Performance | Rendering and loading performance |
| 7 | Frontend Accessibility | Inclusive interfaces |
| 8 | Frontend Testing | Frontend verification |
| 9 | Frontend Design Engineering | Styling and design implementation |
| 10 | Project Structure Architect | Repository and module architecture |
| 11 | Dependency Governance | Package selection and approval |
| 12 | Backend Engineering | Business logic and persistence |
| 13 | API Contract Engineering | API design and integration |
| 14 | Security Engineering | Application security |
| 15 | Waypoint Repository Architecture | Waypoint-specific code organization |
| 16 | Waypoint Design System Governance | Waypoint-specific styling |
| 17 | Reserved for future expansion | Not currently defined |
| 18 | Reserved for future expansion | Not currently defined |
| 19 | Reserved for future expansion | Not currently defined |

Inventory correction: The currently defined library contains 16 actual skill files, not 19. The previous count included an incorrect inventory. Do not create three empty placeholder skills merely to reach 19.

## 3. Skill governance files

### `README.md`

This file documents:

- Library purpose.
- Directory organization.
- Skill inventory.
- Installation.
- Maintenance.
- Usage expectations.

It does not replace individual skill instructions.

### `SKILL_STANDARDS.md`

Defines mandatory standards for:

- Skill structure.
- Scope and responsibility.
- Activation criteria.
- Technical accuracy.
- Engineering quality.
- Instruction consistency.
- Maintenance.

Every new or revised skill must follow these standards.

### `SKILL_ROUTING.md`

Defines:

- When a skill must activate.
- When a skill should activate.
- When a skill must not activate.
- Which skills may be combined.
- How conflicts are resolved.
- How to avoid loading unrelated skills.

The routing file does not duplicate implementation guidance from individual skills.

## 4. How the agent should use the library

For every engineering request:

- Understand the user's actual goal.
- Inspect the repository when implementation depends on existing code.
- Identify the primary engineering responsibility.
- Consult `SKILL_ROUTING.md`.
- Load the mandatory skill or skills.
- Load additional skills only when their responsibilities are materially involved.
- Follow the activated skills.
- Implement the smallest correct solution.
- Verify the result.
- Report completed work and remaining limitations honestly.

Do not load every skill for every request.
Do not activate a skill solely because its keywords appear in a prompt.

## 5. Skill activation philosophy

Skills are specialized engineering references, not independent agents.

A task may require several skills simultaneously.

For example, a protected Next.js form that creates a database record may require:

- Next.js App Router.
- React Component Engineering.
- React Hooks Engineering, if custom Hook behavior is involved.
- TypeScript Engineering.
- API Contract Engineering, if an HTTP contract is involved.
- Backend Engineering.
- Security Engineering.
- Frontend Testing.

Only activate skills whose responsibilities are actually involved.

Repository-specific skills apply only when the target repository matches their documented scope.

## 6. Dependency and approval policy

Before introducing a dependency:

- Inspect existing dependencies.
- Evaluate built-in capabilities.
- Identify the actual limitation.
- Consult Dependency Governance.
- Recommend an appropriate solution.
- Obtain approval when required.
- Install and verify after approval.

Do not introduce packages simply because they are popular.

## 7. Engineering quality requirements

All implementation work should respect the following:

- Inspect before editing.
- Preserve unrelated behavior.
- Avoid unnecessary refactoring.
- Maintain type safety.
- Validate external input.
- Enforce authorization server-side.
- Preserve established API contracts.
- Follow existing styling conventions.
- Test meaningful behavior.
- Inspect the final diff.
- Report verification accurately.

## 8. Documentation and maintenance

When adding a skill:

- Define a distinct engineering responsibility.
- Confirm it does not duplicate an existing skill.
- Define activation and exclusion criteria.
- Follow `SKILL_STANDARDS.md`.
- Add the skill to `SKILL_ROUTING.md`.
- Update this README inventory.
- Test activation using representative prompts.

When changing a skill:

- Preserve existing useful guidance.
- Remove contradictory instructions.
- Update related routing rules.
- Verify references and paths.
- Avoid silently changing repository-specific assumptions.

## 9. Official technical references

Prefer current official documentation when framework or API behavior may have changed.

- Next.js: <https://nextjs.org/docs>
- React: <https://react.dev/>
- TypeScript: <https://www.typescriptlang.org/docs/>
- MDN: <https://developer.mozilla.org/>
- WCAG: <https://www.w3.org/WAI/standards-guidelines/wcag/>
- OWASP: <https://owasp.org/www-project-top-ten/>

Documentation should match the installed versions wherever possible.

## Final principle

The purpose of this library is not to make the AI agent follow more rules.

It is to make the agent consistently choose the right engineering approach, avoid incorrect assumptions, preserve existing systems, and deliver verifiable results.
