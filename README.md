# SupportFlow

SupportFlow is a frontend-only customer-support workspace built with the existing Next.js App Router project. It runs without a database, service credentials, or an authentication provider.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard is a demo workspace; its teammate names, role labels, customers, and tickets are sample data.

## Local demo data

The typed support data boundary is in `src/features/supportflow/data/repository.ts`. It loads a realistic seed dataset and stores ticket changes in this browser's `localStorage` under `supportflow-demo-data-v1`. Data is private to the browser profile, is not shared with teammates, and can be reset by clearing that local-storage key. If browser storage is unavailable or malformed, the app displays an error and does not report unsaved changes as successful.

Domain types, validation, ticket workflow rules, URL state, and analytics calculations are separated under `src/features/supportflow/domain/`. The UI uses those contracts rather than coupling pages to seed-data details. Replacing `supportRepository` with a typed API-backed implementation is the intended future integration point. Backend work should add server-side validation, authentication, authorization, and persistence; the demo role labels are not security controls.

## Metrics

- **Open tickets:** tickets in any status except Resolved.
- **New this week:** tickets created in the trailing seven days, including the current time.
- **Resolved this week:** tickets resolved in the trailing seven days.
- **Average resolution:** mean elapsed time from creation to resolution for all resolved tickets with valid timestamps and non-negative durations. It is not limited to this week.
- **Ticket volume:** tickets created on each of the last seven calendar days.
- **Status, priority, and workload:** counts derived from the same current ticket list; workload excludes resolved tickets.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Playwright uses its installed browser binaries. If needed, install Chromium with `npx playwright install chromium`.

## AI engineering skills

The workspace includes specialized skills for frontend, backend, architecture, security, testing, and Waypoint-specific engineering conventions. Skills guide the agent through task classification and implementation decisions; they are not independent agents and should not all be loaded for every task.

### Skill library structure

Skills are discoverable from `.agents/skills/`. Each skill lives in its own folder as `SKILL.md`; the folder name and YAML frontmatter `name` must match.

```text
.agents/skills/
├── SKILL_ROUTING.md
├── SKILL_STANDARDS.md
├── skill-router/
│   └── SKILL.md
├── architecture/
│   ├── dependency-governance/
│   │   └── SKILL.md
│   └── project-structure-architect/
│       └── SKILL.md
├── backend/
│   ├── api-contract-engineering/
│   │   └── SKILL.md
│   ├── backend-engineering/
│   │   └── SKILL.md
│   └── security-engineering/
│       └── SKILL.md
├── frontend/
│   ├── design/
│   │   └── frontend-design-engineering/
│   │       └── SKILL.md
│   ├── frameworks/
│   │   └── nextjs-app-router/
│   │       └── SKILL.md
│   ├── languages/
│   │   └── typescript-engineering/
│   │       └── SKILL.md
│   ├── quality/
│   │   ├── frontend-accessibility/
│   │   │   └── SKILL.md
│   │   ├── frontend-performance/
│   │   │   └── SKILL.md
│   │   └── frontend-testing/
│   │       └── SKILL.md
│   └── react/
│       ├── react-component-engineering/
│       │   └── SKILL.md
│       ├── react-hooks-engineering/
│       │   └── SKILL.md
│       └── react-state-management/
│           └── SKILL.md
└── repositories/
    └── waypoint/
        ├── waypoint-design-system-governance/
        │   └── repository-design-system-governance.md
        └── waypoint-repository-architecture-conventions/
            └── repository-architecture-conventions.md
```

There are currently 15 discoverable `SKILL.md` files. The two Waypoint-specific folders contain supporting repository guidance documents. The registry and standards are maintained separately:

- [Skill routing](./.agents/skills/SKILL_ROUTING.md) explains when to load each skill, how to combine skills, and how to resolve overlaps.
- [Skill standards](./.agents/skills/SKILL_STANDARDS.md) defines requirements for skill structure, ownership, activation, technical accuracy, maintenance, verification, and commit messages.

### Using the skills

For engineering tasks, identify the actual responsibilities involved, consult the routing guide, and load only the mandatory and materially relevant skills. Inspect the repository before implementation, preserve unrelated behavior, implement the smallest complete change, verify it, and report results accurately. Repository-specific guidance applies only to its matching repository.

Prefer the simplest engineering approach that meets actual requirements. Preserve existing behavior and user changes, validate untrusted input, enforce authorization at protected boundaries, and verify meaningful behavior. Do not introduce dependencies without evaluating existing capabilities and following the applicable approval process.

When adding or changing skills, keep responsibilities distinct, maintain the routing and skill inventory, preserve useful existing guidance, remove contradictions, verify references, and test representative activation routes.

### Technical references

Prefer current official documentation when framework or API behavior may have changed:

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [MDN](https://developer.mozilla.org/)
- [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

Use documentation that matches the installed versions wherever possible.
