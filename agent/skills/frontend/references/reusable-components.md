# Reusable Component Guide

Use this guide when reviewing component boundaries or adding UI. Reuse should reduce duplication or make a shared behavior easier to understand; it is not a goal to turn every JSX block into a component.

## Decision rules

| Situation | Recommended choice |
| --- | --- |
| The same behavior or visual contract appears in multiple features | Extract a shared component with a small, typed API. |
| A component is repeated only within one feature and shares feature-specific data or styling | Keep it with that feature until another consumer appears. |
| A block has a distinct responsibility, meaningful state boundary, or is independently testable | Extract it even if it currently has one consumer. |
| Two blocks only look similar but behave differently | Keep separate, or share only the truly common primitive. |
| A proposed abstraction needs many flags or mostly forwards props | Keep the call sites direct; revisit when a real second use case exists. |

Prefer composition and explicit props over boolean-heavy APIs. Keep state with the smallest component that owns the interaction, and make accessibility requirements (such as button names) part of the component contract.

## Current component map

| Component | Location | Scope and reason |
| --- | --- | --- |
| `Icon` | `src/components/ui/icon.tsx` | Shared SVG primitive used throughout the dashboard. Icon names are a union so call sites cannot request an undefined glyph. Decorative SVGs are hidden from assistive technology; the containing control supplies its accessible name. |
| `ProjectCard` | `src/components/dashboard/dashboard.tsx` | Dashboard-only project presentation; it receives project data and an open action. Keep feature-local while the dashboard is its only consumer. |
| `TaskRow` | `src/components/dashboard/dashboard.tsx` | Dashboard-only task row; completion is controlled by the dashboard and passed in as an action. |
| `ScheduleItem` | `src/components/dashboard/dashboard.tsx` | Small schedule display used only by the dashboard calendar preview. |
| `AvatarStack` | `src/components/dashboard/dashboard.tsx` | Project member display currently used only by project cards. Keep local until another surface needs the same presentation. |
| `CredentialsForm` | `src/components/auth/credentials-form.tsx` | Auth feature component with login/signup behavior. Its input styling is already shared within the form; a global form-field abstraction is not needed yet. |

## Review notes

* The dashboard card and row components are already cohesive and reusable within their feature; moving them into a global design-system folder would add indirection without a second feature consumer.
* Buttons across auth and dashboard currently have different semantics and visual treatments. Do not create a generic button API until there is a stable shared contract (for example, consistent variants, loading behavior, and disabled/focus states).
* Revisit a shared field component if additional forms need the same label, help/error message, and input behavior. Keep password visibility and form submission in the auth feature.
* When extracting a component, update consumers in the same change and run lint/type checks. Avoid changing behavior or adding styling options just to anticipate hypothetical future pages.
