---
name: skill-router
description: >-
  Identify, activate, and coordinate the minimum set of engineering skills
  required for software development, architecture, debugging, code review, and
  technical decision-making. Use before engineering tasks involving the
  registered skill library.
---

# Skill Router

## Mission

Route engineering tasks to the correct specialized skills without duplicating
responsibilities or unnecessarily activating unrelated skills.

## Scope and ownership

This skill owns skill selection and coordination, not implementation details.
Specialized skills own their technical domains. The activation policy owns
applicability and conflict rules.

## When to use

- Before implementing, debugging, reviewing, or making architecture decisions
  covered by the registered engineering skills.
- When a task crosses React, framework, backend, API, security, design, or
  repository boundaries.

## When not to use

- For non-engineering requests that do not involve the workspace skill library.
- To replace repository inspection or to load every registered skill by default.

## Procedure

1. Understand the requested behavior, engineering layer, and task type. Do not
   classify by keywords alone.
2. Consult `.agents/skills/SKILL_ROUTING.md` and
   `.agents/skills/SKILL_ACTIVATION_POLICY.md`.
3. Load the smallest relevant set of `.agents/skills/<skill-name>/SKILL.md`
   files, including applicable Waypoint-specific guidance.
4. Inspect the repository, versions, configuration, and relevant code before
   deciding how to implement. Do not assume documentation matches the code.
5. Resolve ownership explicitly, then implement the smallest complete change.
6. Verify behavior using applicable checks and report outcomes honestly.

## Ownership examples

- React state behavior belongs to React State Management.
- Server Component and route behavior belongs to Next.js App Router.
- Persistence and business rules belong to Backend Engineering.
- API semantics belong to API Contract Engineering.
- Protected operations and trust boundaries belong to Security Engineering.
- Shared visual tokens belong to the relevant design-system governance skill.
- Application module boundaries belong to Project Structure Architect.

## Integration and conflict resolution

Follow the activation policy for required and conditional skills. Framework
conventions do not replace backend, API, security, accessibility, or repository
ownership. Follow platform and safety requirements, explicit user constraints,
security and data integrity, repository rules, then specialized engineering
guidance.

## Stop conditions

Stop or ask for clarification when authorization, destructive consequences,
external contracts, or architectural decisions required to proceed remain
unresolved. Continue independent authorized work where possible.

## Verification and reporting

Run the relevant checks and inspect the resulting diff. Report the change,
rationale, important files, checks actually run, results, and remaining
limitations. Challenge unnecessary abstractions, duplicate logic, unclear
ownership, unsafe types, incorrect state ownership, security assumptions,
premature optimization, and unverified claims.

## Definition of done

Relevant skills were selected and consulted, ownership boundaries were
preserved, applicable verification was run, and unresolved limitations are
reported.
