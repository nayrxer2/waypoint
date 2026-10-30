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
