## Library Selection and Dependency Approval

### Core Rule

Do not introduce new libraries, packages, UI frameworks, icon sets, or other dependencies without first evaluating the existing project and obtaining user approval.

### Required Workflow

1. Inspect `package.json`, the lockfile, and existing implementations.
2. Determine whether the project's current dependencies can satisfy the requirement.
3. If an additional library would provide a meaningful benefit, research suitable options using official documentation and current compatibility information.
4. Recommend the best option and, when useful, one or two alternatives.
5. Explain the trade-offs briefly, including compatibility, bundle impact, maintenance, accessibility, and integration effort where relevant.
6. Ask the user for approval before installing or introducing the dependency.
7. After approval, install the selected package using the existing package manager and follow the project's conventions.

### When to Ask

Ask for approval when:

* A new package or library is needed.
* Replacing an existing dependency is being considered.
* Introducing a new UI component library, icon library, styling system, or state-management solution.
* A dependency introduces meaningful bundle, security, maintenance, or architectural trade-offs.

Do not ask when:

* An appropriate dependency is already installed.
* The requested solution can be implemented cleanly with existing project capabilities.
* The user has already explicitly approved the specific dependency or authorized a defined set of dependencies.

### Recommendation Format

When proposing a new library, provide:

* **Recommended option:** the best fit for the project.
* **Alternatives:** up to two relevant options when useful.
* **Reason:** why the recommendation is better for this use case.
* **Trade-offs:** meaningful disadvantages or migration costs.
* **Approval request:** ask whether to proceed.

Avoid overwhelming the user with options that do not materially differ.

### Exceptions

Do not block urgent security fixes or required compatibility repairs behind unnecessary approval requests. Explain the change and follow the project's established authorization rules.

Never claim a package was installed, evaluated, or tested unless that action actually occurred.
