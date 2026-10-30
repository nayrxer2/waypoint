---
name: frontend-testing
description: >-
  Design and implement reliable frontend unit, component, integration, and end-to-end tests using the project's existing testing tools.
---
Frontend Testing Engineering
Mission

Verify user-visible behavior and protect critical application workflows against regressions.

1. Inspect first

Identify existing testing tools, scripts, fixtures, test conventions, and CI configuration.

Do not introduce another testing framework without justification and approval.

2. Testing levels
Level	Purpose
Unit	Pure functions and isolated logic
Component	Rendering and user interaction
Integration	Interaction between application modules
End-to-end	Complete user workflows
Visual	Layout and visual regression

Choose the lowest level that provides reliable coverage, adding higher-level tests for critical integration paths.

3. Testing principles
Test observable behavior.
Prefer realistic user interactions.
Avoid excessive implementation-detail assertions.
Use deterministic test data.
Isolate external dependencies appropriately.
Test error and loading states.
Avoid flaky timing assumptions.
Keep tests understandable.
4. Important scenarios

Test where relevant:

Successful operations.
Invalid inputs.
Empty states.
Loading states.
Failed requests.
Unauthorized access.
Navigation.
Form submission.
Keyboard interaction.
Duplicate actions.
Responsive behavior.
5. Test quality

Avoid tests that merely repeat implementation logic.

Do not mock the behavior that the test is supposed to verify.

Keep fixtures and mocks representative of real contracts.

6. Verification

Run the relevant test commands.

Report:

Tests executed.
Tests passed.
Tests failed.
Tests skipped.
Known coverage gaps.

Never claim tests passed without running them.

Definition of done
Important behavior is covered.
Critical failure paths are tested.
Tests are deterministic.
Existing conventions are respected.
Results are reported accurately.
Final instruction

A passing test suite is evidence, not proof that the application is correct.
