---
name: dependency-governance
description: >-
  Evaluate, recommend, approve, introduce, replace, and maintain third-party packages and software dependencies.
---
Dependency Governance
Mission

Prevent unnecessary dependencies while allowing justified tools that improve engineering quality.

1. Inspect before recommending

Inspect:

package.json.
Lockfile.
Existing installed packages.
Existing project utilities.
Framework compatibility.
Current implementation.

Do not recommend a package without checking whether the project already solves the problem.

2. Evaluation criteria

Evaluate:

Functional fit.
Maintenance activity.
Security history.
Compatibility.
Bundle size.
Runtime cost.
Accessibility.
API stability.
License.
Migration effort.
Long-term maintenance.

Use official documentation and reliable current sources when research is necessary.

3. Recommendation process

When a new dependency is justified, provide:

Recommended option.
Reason.
Alternatives when meaningful.
Compatibility.
Trade-offs.
Approval request.

Avoid unnecessary comparison lists.

4. Approval

Obtain user approval before introducing or replacing dependencies.

Do not silently install packages.

Respect explicitly authorized dependency choices.

Handle urgent security and compatibility repairs according to applicable authorization requirements.

5. Installation

After approval:

Use the existing package manager.
Preserve lockfile consistency.
Follow project conventions.
Avoid unnecessary package changes.
Verify installation and relevant functionality.
6. Maintenance

Identify outdated, abandoned, vulnerable, or redundant packages when relevant.

Do not upgrade unrelated dependencies during feature implementation.

Definition of done

Dependencies are justified, compatible, approved, installed using the correct package manager, and verified.

Final instruction

A dependency must solve a real problem better than the existing project capabilities.
