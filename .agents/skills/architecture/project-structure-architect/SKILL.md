---
name: project-structure-architect
description: >-
  Analyze, design, review, and refactor project structures using appropriate architecture, modularity, separation of concerns, and dependency boundaries.
---
## Mission

Design project organization that makes software easier to understand, test, maintain, and safely extend.

## 1. Architecture before folders

Understand:

- Application purpose.
- Business domains.
- Major features.
- Technology stack.
- Data ownership.
- Integration boundaries.
- Team size.
- Deployment requirements.
- Expected complexity.

Never generate a generic folder tree without understanding the application.

## 2. Architecture selection

Evaluate:

- Feature-based architecture.
- Layer-based architecture.
- Domain-based architecture.
- Vertical slices.
- Clean Architecture.
- Hexagonal Architecture.
- Modular monoliths.
- Monorepos.

Choose based on actual requirements.

Do not combine patterns without a clear benefit.

## 3. Core principles

- High cohesion.
- Low coupling.
- Explicit ownership.
- Clear dependency direction.
- Minimal unnecessary abstraction.
- Framework conventions.
- Incremental evolution.

## 4. Folder rules

Every folder must have a defined responsibility.

Avoid:

- Generic misc or stuff folders.
- Excessive nesting.
- Empty hypothetical modules.
- Duplicate representations of the same responsibility.
- Global utility collections containing unrelated logic.
- Premature microservices.

## 5. Dependency boundaries

For systems using Clean or Hexagonal Architecture:

- Domain logic must not depend on infrastructure.
- Business rules should not depend unnecessarily on frameworks.
- Infrastructure implements appropriate application boundaries.
- Delivery mechanisms communicate through defined interfaces.

Apply these principles proportionally. Do not impose enterprise architecture on a small application.

## 6. Existing project analysis

Inspect:

- Root structure.
- Entry points.
- Dependency manifests.
- Module imports.
- Tests.
- Configuration.
- Deployment scripts.
- Existing documentation.

Identify:

- Circular dependencies.
- God modules.
- Duplicated logic.
- Unclear ownership.
- Cross-feature coupling.
- Misplaced business logic.

## 7. Severity

Classify findings:

- Critical: correctness, security, or severe architectural risks.
- High: substantial coupling or maintainability risks.
- Medium: avoidable complexity.
- Low: naming and organizational inconsistencies.

## 8. Refactoring

Prefer incremental refactoring.

Preserve existing behavior.

Identify migration risks, dependencies, and required tests.

Never rewrite an entire project simply because another folder structure looks cleaner.

## 9. Required output for architecture proposals

- Architecture assessment.
- Selected approach and alternatives.
- Proposed folder tree.
- Folder responsibilities.
- Dependency rules.
- Concrete file placement examples.
- Anti-patterns.
- Evolution strategy.
- Trade-offs.

## Definition of done

The structure has explicit ownership, understandable dependencies, appropriate testing locations, and a justified complexity level.

## Final instruction

A good project structure makes correct engineering decisions easier and incorrect decisions harder.
