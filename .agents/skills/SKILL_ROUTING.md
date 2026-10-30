# Engineering Skill Registry

This is the authoritative index for workspace engineering skills. Native skill
discovery reads each `.agents/skills/<skill-name>/SKILL.md`; use this registry
to select the smallest relevant set before engineering work.

## Skill inventory

All paths below are relative to `.agents/skills/`.

### Orchestration

| Skill | Location | Responsibility |
| --- | --- | --- |
| Skill Router | `skill-router/SKILL.md` | Selects and coordinates applicable skills |

### React

| Skill | Location | Responsibility |
| --- | --- | --- |
| React Component Engineering | `react-component-engineering/SKILL.md` | Components, composition, props, boundaries, reusable UI |
| React Hooks Engineering | `react-hooks-engineering/SKILL.md` | Built-in Hooks, custom Hooks, lifecycle, effects, rules of Hooks |
| React State Management | `react-state-management/SKILL.md` | Local, shared, server, URL, and form state |

### Frameworks and languages

| Skill | Location | Responsibility |
| --- | --- | --- |
| Next.js App Router | `nextjs-app-router/SKILL.md` | App Router, RSC, routing, Server Actions, caching, rendering |
| TypeScript Engineering | `typescript-engineering/SKILL.md` | Type modeling, generics, inference, narrowing, compile-time safety |

### Frontend quality

| Skill | Location | Responsibility |
| --- | --- | --- |
| Frontend Performance | `frontend-performance/SKILL.md` | Rendering, bundles, loading, runtime performance |
| Frontend Accessibility | `frontend-accessibility/SKILL.md` | WCAG, semantics, keyboard and assistive technology |
| Frontend Testing | `frontend-testing/SKILL.md` | Unit, component, integration, and end-to-end testing |

### Design

| Skill | Location | Responsibility |
| --- | --- | --- |
| Frontend Design Engineering | `frontend-design-engineering/SKILL.md` | CSS, responsive design, visual systems, component styling |

### Architecture

| Skill | Location | Responsibility |
| --- | --- | --- |
| Project Structure Architect | `project-structure-architect/SKILL.md` | Architecture selection, folder organization, module boundaries |
| Dependency Governance | `dependency-governance/SKILL.md` | Package evaluation, dependency approval, maintenance |

### Backend, API contracts, and security

| Skill | Location | Responsibility |
| --- | --- | --- |
| Backend Engineering | `backend-engineering/SKILL.md` | Business logic, persistence, transactions, integrations, reliability |
| API Contract Engineering | `api-contract-engineering/SKILL.md` | HTTP contracts, schemas, validation, errors, compatibility |
| Security Engineering | `security-engineering/SKILL.md` | Authentication, authorization, input validation, sessions, secrets |

### Waypoint repository-specific

| Skill | Location | Responsibility |
| --- | --- | --- |
| Repository Architecture Conventions | `waypoint-repository-architecture-conventions/SKILL.md` | Waypoint architecture, ownership, route, and implementation rules |
| Repository Design System Governance | `waypoint-design-system-governance/SKILL.md` | Waypoint styling, tokens, Tailwind, theme, and visual isolation |

## Representative activation routes

Use these as examples, not as a keyword-only classifier. Consult
[`SKILL_ACTIVATION_POLICY.md`](./SKILL_ACTIVATION_POLICY.md) and read the selected
skill files before implementation.

| Engineering task | Required skills | Add when justified |
| --- | --- | --- |
| Build or refactor a React component | `react-component-engineering` | `typescript-engineering`, `react-hooks-engineering` |
| Implement a custom React Hook | `react-hooks-engineering` | `react-component-engineering`, `typescript-engineering` |
| Design shared or URL-persisted React state | `react-state-management` | `react-hooks-engineering`, `nextjs-app-router` |
| Implement a Next.js App Router route | `nextjs-app-router` | `react-component-engineering`, `typescript-engineering` |
| Model runtime-validated TypeScript data | `typescript-engineering` | `api-contract-engineering` at an API boundary |
| Investigate a slow frontend | `frontend-performance` | React or Next.js skill for the measured bottleneck |
| Review keyboard and screen-reader behavior | `frontend-accessibility` | `react-component-engineering`, `frontend-design-engineering` |
| Add frontend unit or browser tests | `frontend-testing` | React or Next.js skill for the tested behavior |
| Implement responsive styling | `frontend-design-engineering` | `waypoint-design-system-governance` in this repository |
| Restructure application modules | `project-structure-architect` | Relevant framework and repository conventions |
| Add or replace a package | `dependency-governance` | Skill for the capability being introduced |
| Design or change an HTTP API contract | `api-contract-engineering` | `backend-engineering`, `security-engineering` when applicable |
| Implement persistence or backend business logic | `backend-engineering` | `api-contract-engineering`, `security-engineering` when applicable |
| Implement authentication or authorization | `security-engineering` | `backend-engineering`, `api-contract-engineering` when applicable |
| Change Waypoint-specific architecture | `waypoint-repository-architecture-conventions` | `project-structure-architect` when boundaries change |
| Change Waypoint-specific styles | `waypoint-design-system-governance` | `frontend-design-engineering` for visual implementation |

## Registry rules

- Activate only skills required by the task and its concrete dependencies.
- Use `SKILL_ACTIVATION_POLICY.md` to resolve cross-domain responsibilities.
- Skill files own technical guidance; this registry owns discovery and routing.
- Waypoint-specific skills apply only in the Waypoint repository.
- Update this registry whenever an active skill is added, removed, renamed, or moved.
- Never claim a skill was activated unless its instructions were actually consulted.
