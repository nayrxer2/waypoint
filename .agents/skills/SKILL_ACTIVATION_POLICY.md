Skill Activation Policy
1. Objective

Activate the smallest set of engineering skills that can correctly complete the requested task.

More activated skills do not automatically produce better engineering.

2. Activation classifications
Required: The task directly involves the skill's responsibility.
Conditional: Activate when a concrete implementation dependency exists.
Not required: Do not activate for incidental technology usage.
3. Activation matrix
Task	Required	Conditional
Static React component	React Component	TypeScript
Component refactoring	React Component	Hooks, State, TypeScript
Custom Hook	React Hooks	Component, TypeScript
Local state implementation	React State	Hooks, Component
Global state architecture	React State	Hooks, Component
Next.js route	Next.js	React Component, TypeScript
Interactive Next.js feature	Next.js, React Component	Hooks, State, TypeScript
Type modeling	TypeScript	API Contract
API integration	API Contract, Backend, Security where applicable	Next.js for route boundaries, TypeScript for type modeling, React Component when UI is involved
Database mutation	Backend, Security when access-controlled	API Contract for exposed endpoints, TypeScript for data modeling
Styling implementation	Frontend Design	Repository Design Governance
Performance investigation	Frontend Performance	React, Next.js
Accessibility audit	Frontend Accessibility	React Component, Design
Frontend test implementation	Frontend Testing	React, Next.js
Project restructuring	Project Structure Architect	Relevant framework skills
New dependency	Dependency Governance	Relevant technical skill
Authentication implementation	Security, Backend	API Contract for auth endpoints, Next.js for route boundaries, TypeScript for type modeling
Repository-specific UI change	Repository Design Governance	Frontend Design

Backend Engineering, API Contract Engineering, and Security Engineering are registered
skills. Activate the ones whose responsibility is directly involved; do not treat one as
a substitute for another. When a different required specialty is unavailable, identify
the gap, use available project guidance, and do not claim the missing skill was activated.
4. Mandatory activation procedure

Before implementation:

Identify the actual behavior being requested.
Identify the module or engineering layer that owns it.
Select the primary skill.
Identify conditional dependencies.
Load only skills necessary for those dependencies.
Check repository-specific instructions when working inside a registered repository.
Resolve instruction conflicts before editing.
5. Scope boundaries
React owns React component behavior.
Hooks owns Hook implementation and correctness.
State Management owns state architecture and state ownership.
Next.js owns framework-specific behavior.
TypeScript owns compile-time type modeling.
Frontend Design owns visual implementation.
Backend and security responsibilities remain distinct from frontend concerns. Do not
treat Next.js or TypeScript guidance as a substitute for backend or security review.
Architecture owns structural and dependency boundaries.

Do not duplicate ownership merely because a feature crosses multiple technologies.

6. Cross-skill tasks

For tasks involving multiple layers:

Separate the responsibilities.
Identify the owner of each change.
Load the relevant skills.
Preserve module and security boundaries.
Implement the integration.
Verify the complete workflow.

A cross-layer task does not automatically require a separate agent.

7. Conflict resolution

Apply this priority:

Platform and system safety requirements.
Explicit user requirements and permissions.
Security, privacy, and data-integrity requirements.
Repository-specific mandatory constraints.
Specialized skill ownership.
General engineering standards.
Stylistic preferences.

Do not use a lower-priority instruction to bypass a higher-priority requirement.

8. Missing skills

If a required skill is unavailable:

Identify the missing skill.
Use available engineering guidance.
Avoid claiming the missing skill was activated.
Report important limitations when they affect implementation quality.
9. Final rule

Use the fewest skills necessary, but never omit a critical engineering responsibility merely to minimize skill activation.