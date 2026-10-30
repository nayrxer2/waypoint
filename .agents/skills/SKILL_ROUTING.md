# Skill Routing and Activation Policy

Operational routing rules for selecting and activating engineering skills.

This document determines which skills an AI coding agent should consult for a task.

It does not replace the instructions inside individual skills.

## 1. Routing Mission

Activate the smallest set of skills that fully covers the task's engineering responsibilities.

The agent must:
- Identify the actual task.
- Identify the primary engineering responsibility.
- Identify additional responsibilities that materially affect correctness.
- Load mandatory skills.
- Load relevant supporting skills.
- Exclude unrelated skills.
- Respect repository-specific boundaries.
- Avoid loading the entire library by default.

The objective is correct skill selection, not maximum skill activation.

## 2. Skill Inventory and Routing Map

### Frontend
| Skill | File | Primary activation trigger |
|---|---|---|
| React Component Engineering | frontend/react/react-component-engineering.skill.md | React components, composition, props, rendering boundaries |
| React Hooks Engineering | frontend/react/react-hooks-engineering.skill.md | Built-in Hooks, custom Hooks, effects, refs, context |
| React State Management | frontend/react/react-state-management.skill.md | State ownership, shared state, Context, reducers, stores |
| Next.js App Router | frontend/frameworks/nextjs-app-router.skill.md | Next.js routing, rendering, caching, `Server Actions` |
| TypeScript Engineering | frontend/languages/typescript-engineering.skill.md | Type design, generics, narrowing, TypeScript errors |
| Frontend Performance | frontend/quality/frontend-performance.skill.md | Loading, rendering, bundle, runtime optimization |
| Frontend Accessibility | frontend/quality/frontend-accessibility.skill.md | WCAG, keyboard, screen readers, accessible interactions |
| Frontend Testing | frontend/quality/frontend-testing.skill.md | Component, integration, and end-to-end frontend tests |
| Frontend Design Engineering | frontend/design/frontend-design-engineering.skill.md | Styling, layouts, responsive UI, design systems |

### Architecture
| Skill | File | Primary activation trigger |
|---|---|---|
| Project Structure Architect | architecture/project-structure-architect.skill.md | Folder structure, architecture, module boundaries |
| Dependency Governance | architecture/dependency-governance.skill.md | New packages, replacements, dependency decisions |

### Backend
| Skill | File | Primary activation trigger |
|---|---|---|
| Backend Engineering | backend/backend-engineering.skill.md | Business logic, persistence, transactions, backend services |
| API Contract Engineering | backend/api-contract-engineering.skill.md | HTTP contracts, request/response schemas, API changes |
| Security Engineering | backend/security-engineering.skill.md | Authentication, authorization, data protection, security review |

### Repository-specific
| Skill | File | Primary activation trigger |
|---|---|---|
| Waypoint Repository Architecture | repositories/waypoint/repository-architecture-conventions.skill.md | Changes inside the Waypoint repository |
| Waypoint Design System Governance | repositories/waypoint/repository-design-system-governance.skill.md | Styling, themes, tokens, and CSS changes inside Waypoint |

Inventory: 16 defined skills.

Do not activate nonexistent or placeholder skills.

## 3. Activation Levels

Use three activation levels.

### MUST USE

Load the skill whenever the task directly involves its primary responsibility.

A required skill must not be skipped merely because another skill also covers the task.

### USE WHEN RELEVANT

Load the skill when an additional concern materially affects the implementation.

Do not activate it for hypothetical future requirements.

### DO NOT USE

Do not load the skill when:

- Its responsibility is unrelated.
- The task does not involve its ownership boundary.
- Its guidance would introduce unnecessary complexity.
- A repository-specific skill does not match the target repository.
- The user explicitly limits the task to an unrelated area.

## 4. Frontend Routing Rules

### 4.1 React Component Engineering

**MUST USE when:**
- Creating or refactoring React components.
- Changing component composition.
- Designing reusable component APIs.
- Changing component responsibilities.
- Reviewing rendering boundaries.

**USE WHEN RELEVANT:**
- Forms.
- Interactive UI.
- Component-level accessibility.
- Performance-sensitive component rendering.

**DO NOT USE:**
- Pure backend operations.
- Database schema changes.
- API-only work without React consumers.

### 4.2 React Hooks Engineering

**MUST USE when:**
- Creating custom Hooks.
- Implementing or changing `useEffect`.
- Working with Hook dependencies.
- Debugging stale closures or effect loops.
- Implementing Hook-based subscriptions.
- Changing Hook lifecycle or cleanup behavior.

**USE WHEN RELEVANT:**
- Stateful components.
- Context consumers.
- Browser API synchronization.
- Asynchronous client-side interactions.

**DO NOT USE:**
- Static components with no Hook behavior.
- Pure server-side operations.
- Ordinary event-handler changes that do not involve Hook behavior.

### 4.3 React State Management

**MUST USE when:**
- Choosing local versus shared state.
- Introducing or changing application-wide state.
- Implementing complex state transitions.
- Selecting Context, reducers, or external stores.
- Resolving duplicated or conflicting state.
- Designing client/server state ownership.

**USE WHEN RELEVANT:**
- Forms.
- Interactive components.
- URL-driven filters.
- Server data synchronization.

**DO NOT USE:**
- Pure presentation changes with no state implications.
- Static content.
- Backend persistence decisions without a client-state concern.

### 4.4 Next.js App Router

**MUST USE when:**
- Creating or changing Next.js routes.
- Modifying layouts or route conventions.
- Changing Server and Client Component boundaries.
- Implementing Next.js data fetching.
- Changing caching or revalidation.
- Implementing `Server Actions`.
- Implementing `Route Handlers`.
- Debugging Next.js rendering or hydration.

**USE WHEN RELEVANT:**
- React components inside Next.js.
- Forms using `Server Actions`.
- Next.js metadata.
- Image and font optimization.
- Framework-specific performance work.

**DO NOT USE:**
- Projects that do not use Next.js.
- Standalone React applications without Next.js.
- Pure TypeScript utilities unrelated to Next.js.

### 4.5 TypeScript Engineering

**MUST USE when:**
- Designing or changing important types.
- Fixing TypeScript errors.
- Creating generic utilities.
- Changing public interfaces.
- Modeling discriminated unions.
- Validating data boundaries.
- Introducing type-level abstractions.

**USE WHEN RELEVANT:**
- Most TypeScript frontend and backend implementation tasks.

**DO NOT USE:**
- Pure CSS changes.
- Documentation-only changes with no type implications.
- Projects that do not use TypeScript.

### 4.6 Frontend Performance

**MUST USE when:**
- The explicit task is performance optimization.
- Investigating slow rendering or loading.
- Reducing bundle size.
- Resolving measurable frontend performance issues.

**USE WHEN RELEVANT:**
- Large interactive components.
- Expensive rendering.
- Large data collections.
- Image and asset loading changes.

**DO NOT USE:**
- Routine UI changes without a meaningful performance concern.
- Speculative optimization without evidence.

### 4.7 Frontend Accessibility

**MUST USE when:**
- Performing an accessibility audit.
- Building accessibility-sensitive controls.
- Implementing dialogs, menus, forms, and keyboard interactions.
- Fixing accessibility defects.

**USE WHEN RELEVANT:**
- Any new user-facing interactive component.
- Form validation and feedback.
- Navigation and focus changes.
- Shared UI component changes.

**DO NOT USE:**
- Pure backend changes with no user-interface impact.

### 4.8 Frontend Testing

**MUST USE when:**
- Writing or changing frontend tests.
- Debugging frontend test failures.
- Building test coverage for a frontend feature.

**USE WHEN RELEVANT:**
- New interactions.
- Forms.
- Critical user journeys.
- UI behavior changes.
- Regression-sensitive refactoring.

**DO NOT USE:**
- Documentation-only changes.
- Backend-only tests without frontend involvement.

### 4.9 Frontend Design Engineering

**MUST USE when:**
- Implementing styling.
- Building or changing layouts.
- Working with responsive interfaces.
- Implementing design references.
- Modifying themes or visual systems.

**USE WHEN RELEVANT:**
- Component presentation changes.
- Responsive behavior.
- Visual regression work.
- Shared design-system changes.

**DO NOT USE:**
- Pure backend or API changes.
- Type-only changes with no UI consequences.

## 5. Architecture Routing Rules

### 5.1 Project Structure Architect

**MUST USE when:**
- Designing a new repository structure.
- Refactoring project organization.
- Defining module ownership.
- Reviewing architectural boundaries.
- Evaluating architectural patterns.
- Resolving circular dependencies or unclear module responsibilities.

**USE WHEN RELEVANT:**
- Adding a major feature module.
- Moving responsibilities across layers.
- Introducing a monorepo.
- Restructuring an existing application.

**DO NOT USE:**
- Routine component edits.
- Small bug fixes.
- Simple file changes with no architectural impact.

### 5.2 Dependency Governance

**MUST USE when:**
- Introducing a new package.
- Replacing an existing dependency.
- Changing a major library.
- Evaluating a new UI framework or state-management library.
- Making meaningful dependency upgrades.

**USE WHEN RELEVANT:**
- Investigating dependency vulnerabilities.
- Removing unused dependencies.
- Evaluating package maintenance.

**DO NOT USE:**
- Implementations using existing dependencies.
- Native platform capabilities that already satisfy the requirement.
- Documentation changes without dependency implications.

## 6. Backend Routing Rules

### 6.1 Backend Engineering

**MUST USE when:**
- Implementing business logic.
- Modifying database operations.
- Creating or changing transactions.
- Implementing persistence.
- Developing background processing.
- Implementing server-side integrations.
- Changing data integrity behavior.

**USE WHEN RELEVANT:**
- `Server Actions` that perform writes.
- `Route Handlers` that perform business operations.
- Server-side workflows.
- Backend reliability improvements.

**DO NOT USE:**
- Pure frontend presentation changes.
- Static components.
- Client-only interactions without backend implications.

### 6.2 API Contract Engineering

**MUST USE when:**
- Creating an HTTP API.
- Changing request or response schemas.
- Modifying API semantics.
- Changing status codes or error contracts.
- Introducing API versioning.
- Integrating frontend and backend through an HTTP contract.

**USE WHEN RELEVANT:**
- Existing API client changes.
- API documentation.
- Typed API integration.

**DO NOT USE:**
- Internal Server Component data access that does not involve an HTTP API contract.
- Pure component styling.
- Database-only work without API implications.

### 6.3 Security Engineering

**MUST USE when:**
- Implementing authentication.
- Implementing or changing authorization.
- Modifying access to protected resources.
- Handling secrets or sensitive information.
- Performing security reviews.
- Changing protected mutations.
- Modifying security boundaries.

**USE WHEN RELEVANT:**
- File uploads.
- User-controlled redirects.
- External API integrations.
- Caching private data.
- Session handling.
- Input validation at trust boundaries.
- Multi-tenant data access.

**DO NOT USE:**
- Unrelated presentation changes.
- Pure static content changes without security implications.

Security Engineering is mandatory for protected operations regardless of whether the implementation uses Next.js, an API server, or another backend framework.

## 7. Repository-Specific Routing

### 7.1 Waypoint Repository Architecture

**MUST USE when:**
- Working in the Waypoint repository.
- Changing its architecture.
- Moving components or modules.
- Modifying route ownership.
- Changing repository-specific frontend/backend boundaries.

### 7.2 Waypoint Design System Governance

**MUST USE when:**
- Changing Waypoint CSS.
- Changing Tailwind configuration.
- Changing dashboard styling.
- Changing theme behavior.
- Changing shared design tokens.
- Modifying global styles.
- Performing Waypoint visual regression work.

**DO NOT USE:**
- Other repositories.
- Generic React applications.
- Unrelated backend work.

### Repository identification

Do not activate Waypoint-specific instructions based solely on a folder or project name mentioned in conversation.

Inspect repository context when available.

If repository identity cannot be established, do not assume Waypoint-specific constraints apply.

## 8. Cross-Skill Activation Matrix

Use the following combinations when the task actually involves the listed responsibilities.
| Task | Skills to activate |
|---|---|
| Create a React component | React Component Engineering |
| Build a custom Hook | React Hooks Engineering, TypeScript when applicable |
| Create a reusable interactive component | React Component Engineering, React Hooks when applicable |
| Choose global state architecture | React State Management, React Hooks when applicable |
| Build a Next.js page | Next.js App Router, React Component Engineering, TypeScript when applicable |
| Implement Next.js caching | Next.js App Router |
| Build a protected Server Action | Next.js App Router, Backend Engineering, Security Engineering, TypeScript when applicable |
| Build a REST endpoint | API Contract Engineering, Backend Engineering, Security Engineering when protected |
| Build a validated form | React Component Engineering, Frontend Accessibility, TypeScript when applicable; add Backend or Next.js for server mutations |
| Optimize frontend rendering | Frontend Performance, relevant React or Next.js skill |
| Audit accessibility | Frontend Accessibility, React Component Engineering when components are involved |
| Write frontend tests | Frontend Testing, relevant implementation skill |
| Build a responsive dashboard | Frontend Design Engineering, React Component Engineering, Frontend Accessibility when interactive |
| Restructure repository | Project Structure Architect |
| Add a dependency | Dependency Governance, relevant implementation skill |
| Review application security | Security Engineering, relevant backend/API skill |
| Change Waypoint dashboard styles | Frontend Design Engineering, Waypoint Design System Governance |
| Change Waypoint architecture | Project Structure Architect, Waypoint Repository Architecture |
| Change Waypoint dashboard components | React Component Engineering, TypeScript when applicable, Waypoint Repository Architecture; add Design Governance if styling changes |

This matrix is guidance, not a command to load every listed skill unconditionally.

## 9. Multi-Skill Activation Rules

When multiple skills apply:
- Identify the primary skill.
- Identify mandatory supporting skills.
- Identify relevant repository-specific constraints.
- Load only the necessary skill documents.
- Keep responsibility boundaries explicit.
- Resolve overlaps using the conflict policy.
- Do not repeat instructions unnecessarily.

Example:

Task: Implement a protected dashboard feature that updates a user's project.

Primary skills:
- Next.js App Router.
- Backend Engineering.
- Security Engineering.

Supporting skills:
- React Component Engineering.
- React State Management if shared or complex state is involved.
- TypeScript Engineering.
- Frontend Accessibility if new interactive UI is created.
- Frontend Testing.

Repository-specific skills:
- Waypoint Repository Architecture if this is the Waypoint repository.
- Waypoint Design System Governance if its styling is changed.

Do not activate Frontend Performance merely because the task creates a page. Activate it when performance is a meaningful requirement.

## 10. Conflict Resolution

Use this priority:

1. Platform and system safety requirements.
2. Explicit user requirements and permissions.
3. Applicable repository-specific constraints.
4. Specialized skill guidance for its owned responsibility.
5. General engineering skill guidance.
6. General engineering preferences.

Important qualifications:
- Security and correctness cannot be sacrificed to satisfy a styling convention.
- Repository-specific rules apply only within their repository.
- Specialized skills govern their own technical domains.
- Dependency approval rules remain in force.
- Do not silently override existing user modifications.
- Ask for clarification when an unresolved decision materially affects behavior, architecture, or authorization.

## 11. Skill Loading Strategy

Use progressive loading.
**Stage 1: Identify**

Understand the request and determine the affected engineering responsibilities.

**Stage 2: Select**

Consult this routing document.

**Stage 3: Load**

Load the primary skill and mandatory supporting skills.

**Stage 4: Inspect**

Inspect relevant files and repository conventions.

**Stage 5: Implement**

Follow the loaded skills without duplicating unrelated work.

**Stage 6: Verify**

Use the appropriate verification strategy.

**Stage 7: Report**

State what changed, what was verified, and what remains uncertain.

Do not preload the entire skill library for every task.

Do not claim a skill was consulted if it was not actually loaded.

## 12. Missing or Unavailable Skills

If a task requires a responsibility not covered by this library:

- Identify the missing responsibility.
- Use general engineering knowledge cautiously.
- Consult authoritative documentation where appropriate.
- Avoid pretending an existing skill covers the missing domain.
- Recommend creating a dedicated skill only when the responsibility is substantial and recurring.

Do not create a new skill for every isolated task.

## 13. Routing Quality Tests

The routing implementation should pass these scenarios.
| Scenario | Expected activation |
|---|---|
| Change a button's CSS | Frontend Design Engineering; Waypoint Design Governance if applicable |
| Create a custom React Hook | React Hooks Engineering |
| Choose between Context and Zustand | React State Management; Dependency Governance if introducing Zustand |
| Fix a TypeScript error | TypeScript Engineering |
| Change Next.js caching | Next.js App Router |
| Implement a database transaction | Backend Engineering |
| Change an API response schema | API Contract Engineering |
| Add resource ownership checks | Security Engineering and Backend Engineering |
| Create an accessible dialog | React Component Engineering and Frontend Accessibility |
| Refactor project folders | Project Structure Architect |
| Add a new package | Dependency Governance |
| Update a Waypoint dashboard color | Frontend Design Engineering and Waypoint Design System Governance |
| Change unrelated documentation | No engineering skill unless its subject requires one |

## Failure conditions

Routing is incorrect if the agent:

- Loads every skill for every task.
- Ignores a mandatory security skill.
- Uses Waypoint rules in unrelated repositories.
- Activates a dependency library without evaluating approval requirements.
- Treats all React work as state-management work.
- Treats all Next.js server code as backend-owned.
- Activates performance optimization without a meaningful performance concern.
- Claims skills were loaded when they were not.
- Misses an important cross-layer responsibility.

## Final Routing Principle

Activate skills based on responsibility, not vocabulary.

Load enough guidance to perform the task correctly, but no more than the task needs.

The goal is a disciplined engineering agent that knows:

- Which rules apply.
- Which rules do not apply.
- When to consult another engineering discipline.
- When to preserve existing architecture.
- When to challenge an assumption.
- When to stop and request a decision.
- How to verify its work honestly.