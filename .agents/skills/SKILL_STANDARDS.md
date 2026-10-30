Skill Standards

Mandatory standards for creating, maintaining, reviewing, and activating engineering skills.

All skills in this library must follow this document.

1. Purpose

A skill is a specialized engineering instruction document that helps an AI agent perform a defined responsibility correctly.

A skill must provide:

Clear ownership.
Specific activation conditions.
Explicit boundaries.
Actionable engineering rules.
Decision-making guidance.
Verification requirements.
Defined completion criteria.

A skill must not become a general-purpose collection of unrelated engineering advice.

2. One Skill, One Primary Responsibility

Every skill must have one primary responsibility.

Examples:

Skill	Owns
React Component Engineering	Component composition and design
React Hooks Engineering	Hook behavior and effect correctness
React State Management	State ownership and architecture
Next.js App Router	Next.js-specific framework behavior
TypeScript Engineering	Type modeling and safety
Backend Engineering	Business logic and persistence
Security Engineering	Security controls
Frontend Testing	Frontend test strategy and implementation

Related responsibilities may be referenced, but must not be unnecessarily duplicated.

Prohibited
Combining all React knowledge into one enormous skill.
Combining frontend and backend engineering into one skill.
Repeating entire Next.js instructions in React skills.
Repeating dependency approval rules in every skill.
Mixing repository-specific conventions with universal engineering rules.
3. Required Skill Metadata

Every skill must begin with:

yaml
---
name: unique-skill-name
description: Clear description of responsibilities and when to use this skill.
---


Requirements:

Names must be unique.
Names should describe the responsibility.
Descriptions must explain both purpose and activation conditions.
Descriptions must be concise and specific.
Do not use vague descriptions such as "helps with software development."

The metadata should be compatible with the target agent framework's discovery requirements.

4. Required Skill Structure

Use this structure where relevant:

markdown
# Skill Name

## Mission

## 1. Scope and Ownership

## 2. Activation Criteria

## 3. When Not to Use

## 4. Core Engineering Principles

## 5. Required Workflow

## 6. Decision Rules

## 7. Anti-Patterns

## 8. Verification

## 9. Definition of Done

## Final Instruction


Not every skill needs every heading.

Do not add sections merely to satisfy a template.

A concise, complete skill is better than an unnecessarily long one.

5. Scope and Ownership

Each skill must define:

What it owns.
What it does not own.
Which related skills should be consulted.
Where responsibility transfers to another engineering discipline.

Examples:

React Hooks Engineering owns Hook implementation and effect correctness.

React State Management owns state classification, ownership, and architecture.

Next.js App Router owns Next.js framework integration.

Backend Engineering owns backend business logic and persistence.

Security Engineering owns security controls.

Avoid ambiguous ownership.

6. Activation Criteria

Every skill must define when it applies.

Activation must be based on the actual task, not just keyword matching.

Use three levels:

MUST USE

The task directly requires the skill's primary responsibility.

USE WHEN RELEVANT

The task involves a meaningful concern owned by the skill.

DO NOT USE

The task does not involve the skill's responsibility, or using it would add unnecessary complexity.

Examples:

Changing a React component's composition: React Component Engineering.
Creating a custom Hook: React Hooks Engineering.
Choosing between Context and a store: React State Management.
Changing Next.js caching behavior: Next.js App Router.
Creating a database transaction: Backend Engineering.
Auditing access control: Security Engineering.
Changing Waypoint dashboard styles: Waypoint Design System Governance.
7. Decision Rules

Skills must provide actionable decision rules.

Prefer:

"If multiple components need the same state, identify their common owner before selecting Context or an external store."

Avoid:

"Use good state management."

Prefer:

"Use an effect to synchronize with an external system. Calculate derived values during rendering instead."

Avoid:

"Use effects correctly."

Rules must help the agent choose between alternatives.

8. Engineering Workflow

When applicable, skills should guide the agent through:

Inspect.
Understand.
Plan.
Implement.
Verify.
Review.
Report.

The workflow must be proportional to the task.

A small bug fix should not require an enterprise architecture review.

A security-sensitive mutation deserves deeper inspection and verification.

9. Technical Accuracy

All technical guidance must:

Respect installed framework versions.
Avoid invented APIs.
Distinguish framework guarantees from recommendations.
Prefer official documentation for version-sensitive behavior.
Avoid outdated defaults.
Identify assumptions.
Avoid presenting preferences as universal rules.

When technical behavior is uncertain, inspect the project or consult authoritative documentation.

10. Anti-Patterns

Every skill should identify relevant mistakes.

Examples:

React Component Engineering
God components.
Premature abstraction.
Excessive prop forwarding.
Unnecessary memoization.
React Hooks Engineering
Conditional Hook calls.
Effects for derived state.
Missing dependencies.
Stale closures.
React State Management
Global state for local interactions.
Duplicated server state.
Redundant derived state.
Unnecessary state libraries.
Next.js App Router
Unnecessary Client Components.
Incorrect caching assumptions.
Client-only authorization.
Duplicated business logic.
Backend Engineering
Business logic inside transport handlers.
Unsafe database writes.
Missing transactions.
Unbounded queries.
Security Engineering
Trusting client-side permissions.
Exposing secrets.
Missing server-side authorization.
Unsafe input handling.

Do not list unrelated anti-patterns simply to increase document length.

11. Skill Boundaries and Cross-Skill References

When a task crosses responsibilities:

Keep ownership explicit.
Consult the appropriate additional skill.
Do not duplicate another skill's entire instruction set.
Follow the more specialized skill for its owned responsibility.
Resolve overlapping concerns using the routing policy.

Examples:

A Next.js mutation may require Next.js App Router, Backend Engineering, and Security Engineering.

A React form may require React Component Engineering, React Hooks Engineering, and Frontend Accessibility.

A dashboard styling task may require Frontend Design Engineering and Waypoint Design System Governance.

12. Repository-Specific Skills

Repository-specific skills must:

Identify their repository scope.
Never present local conventions as universal rules.
Verify actual implementation before relying on documented paths.
Preserve repository-specific architecture.
Identify documentation drift.
Avoid affecting unrelated repositories.

Waypoint-specific rules must only apply when working on Waypoint.

13. Dependency Rules

Skills must respect Dependency Governance.

Do not:

Introduce unnecessary packages.
Replace existing dependencies without justification.
Assume a popular library is automatically better.
Install packages without required approval.
Claim installation or testing occurred when it did not.

Use existing project capabilities first.

14. Verification Requirements

Skills must distinguish between:

Code inspection.
Static analysis.
Type checking.
Unit testing.
Integration testing.
End-to-end testing.
Build verification.
Browser verification.
Visual comparison.

Do not treat one type of verification as proof of all others.

Report what actually ran and what remains unverified.

15. Writing Quality

All skills must be:

Specific.
Direct.
Technically accurate.
Actionable.
Consistent.
Free from unnecessary repetition.

Avoid:

Generic motivational language.
Repeated mission statements.
Excessive warnings.
Contradictory instructions.
Unnecessary examples.
Unsupported absolute claims.
Repeating README content.

Use tables when they improve decision clarity.

Use code examples when they demonstrate an important implementation pattern.

16. Conflict Resolution

When instructions overlap, apply this priority:

Platform and system safety requirements.
Explicit user requirements and permissions.
Applicable repository-specific constraints.
Specialized skill instructions for their owned responsibility.
General engineering skill guidance.
General engineering preferences.

This priority does not permit a repository-specific rule to override security requirements or explicit user authorization.

When two applicable instructions genuinely conflict:

Identify the conflict.
Determine which instruction owns the decision.
Preserve security and correctness.
Avoid silently choosing a behavior-changing interpretation.
Ask for clarification only when the unresolved decision materially affects the implementation.
17. Skill Maintenance

Before adding a skill:

Search the existing inventory.
Identify overlapping responsibilities.
Determine whether an existing skill can be improved instead.
Define distinct ownership.
Define activation and exclusion criteria.
Write the skill.
Update SKILL_ROUTING.md.
Update README.md.
Review related skills for contradictions.

Before modifying a skill:

Preserve valid existing guidance.
Remove obsolete or duplicated instructions.
Verify technical claims.
Check references and file paths.
Update dependent routing rules.
18. Skill Quality Review

A skill is acceptable only if the following questions can be answered positively:

Is its responsibility clear?
Is its scope explicit?
Are activation conditions specific?
Does it define when not to use it?
Are decision rules actionable?
Are technical claims accurate?
Does it avoid duplicating other skills?
Are cross-skill boundaries clear?
Does it include meaningful verification?
Is its complexity justified?
Final Standard

A good skill should improve engineering decisions, not merely increase the number of instructions an AI agent follows.

Every instruction must serve a clear purpose.

If a rule does not improve correctness, security, maintainability, clarity, or verification, reconsider whether it belongs in the skill.