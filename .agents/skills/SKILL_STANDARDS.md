Engineering Skill Standards
1. Purpose

Every skill must provide focused, actionable engineering guidance for one primary responsibility.

A skill is not a general-purpose instruction dump.

It must help an agent make better technical decisions and produce reliable results.

2. Required frontmatter

Every skill must define:

name: Unique, descriptive identifier.
description: What the skill does and when it should activate.

Place workspace skills at `.agents/skills/<name>/SKILL.md` for native discovery.
The directory name and `name` value must match. Use valid YAML frontmatter;
never combine multiple keys on one line.

Example:

yaml
---
name: nextjs-app-router
description: >
  Build, debug, refactor, and review Next.js App Router applications.
  Use when implementing Next.js routes, components, rendering,
  data fetching, or framework-specific behavior.
---

3. Required sections

Every skill must contain:

Mission
Scope and ownership
When to use
When not to use
Prerequisites and inspection
Core engineering principles
Implementation or execution rules
Integration with other skills
Conflict resolution
Stop conditions
Verification requirements
Definition of done
Relevant documentation

Sections may be combined when that improves clarity, but none of these responsibilities should be omitted.

4. Activation rules

Every skill must explicitly define:

When to use

Specific tasks and conditions that justify activation.

When not to use

Tasks outside its ownership, irrelevant technologies, and situations where activation adds unnecessary complexity.

Required skills

Other skills that must be consulted for specific cross-domain responsibilities.

Optional skills

Other skills that may improve the result when justified.

5. Ownership boundaries

Each skill must define:

What it owns.
What it does not own.
Which responsibilities belong to other skills.
How cross-domain tasks should be coordinated.

Never duplicate complete technical standards across multiple skills.

Reference the owning skill instead.

6. Engineering quality requirements

Skills must:

Prefer evidence over assumptions.
Inspect actual project versions and conventions.
Use official documentation for version-sensitive APIs.
Preserve existing functionality.
Avoid unnecessary dependencies.
Avoid speculative abstractions.
Identify security and reliability implications.
Require appropriate verification.
Distinguish confirmed facts from assumptions.
7. Decision-making standards

A skill must challenge decisions when:

The implementation adds unnecessary complexity.
The proposed abstraction has no demonstrated value.
A solution violates architectural boundaries.
A security assumption is unsupported.
The requested approach creates avoidable technical debt.
A simpler solution achieves the same outcome more reliably.

Do not automatically agree with the user's proposed implementation.

Explain the technical problem and recommend a better approach.

8. Stop conditions

Define when implementation must stop because of:

Missing authorization.
Destructive or irreversible consequences.
Unresolved architectural decisions.
Undefined external contracts.
Security violations.
Missing required information.

Continue independent authorized work when possible.

9. Verification and reporting

Never claim that code was tested, a build succeeded, a package was installed, or documentation was inspected unless it actually happened.

Report:

Work completed.
Checks executed.
Results.
Known limitations.
Remaining dependencies.
10. Avoid skill bloat

Do not create a new skill for every small technique.

Create a separate skill only when the responsibility has:

A meaningful independent scope.
Distinct activation conditions.
Reusable engineering guidance.
A clear ownership boundary.
Final principle

A good skill makes correct engineering decisions easier and incorrect decisions harder.

Optimize for precision, applicability, maintainability, and measurable engineering quality.