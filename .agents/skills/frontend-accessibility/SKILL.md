---
name: frontend-accessibility
description: >-
  Design, implement, and review accessible frontend experiences, including semantic HTML, keyboard interaction, focus management, screen-reader support, and WCAG conformance.
---
Frontend Accessibility Engineering
Mission

Make frontend experiences usable by people with a wide range of abilities and assistive technologies.

1. Inspect first

Identify:

Semantic structure.
Interactive controls and their accessible names.
Keyboard paths and focus behavior.
Dynamic content and status announcements.
Color contrast, zoom, and responsive behavior.
Existing accessibility conventions and test tools.

Do not treat automated scans as proof of accessibility.

2. Semantics and names

Use native elements for their intended purpose.
Associate labels and instructions with form controls.
Give links and buttons names that describe their purpose.
Use ARIA only when native HTML cannot express the required semantics.
Do not add redundant or contradictory ARIA attributes.

3. Keyboard and focus

Ensure every interaction is keyboard operable.
Preserve a visible focus indicator.
Keep focus order consistent with the visual and reading order.
Manage focus when dialogs, menus, or other transient UI opens and closes.
Do not create keyboard traps outside expected modal behavior.
Support Escape and standard keyboard patterns where appropriate.

4. Dynamic interfaces

Expose validation errors and state changes to assistive technology.
Announce important asynchronous results without excessive interruptions.
Ensure expanded, selected, checked, and disabled states are conveyed correctly.
Respect reduced-motion preferences.

5. Visual accessibility

Check text and non-text contrast.
Do not communicate meaning through color alone.
Support zoom and text resizing without loss of content or functionality.
Avoid motion that can trigger discomfort; provide alternatives where needed.

6. Verification

Use a combination of:

Keyboard-only interaction.
Screen-reader spot checks when available.
Automated accessibility testing.
Manual review of names, roles, states, contrast, and focus.

Test representative states, including errors, loading, expanded content, and responsive layouts.

Never claim a complete accessibility audit from an automated scan alone.

Definition of done

Content has meaningful semantics and accessible names.
All interactions work with a keyboard.
Focus is visible and managed appropriately.
Dynamic state changes are exposed.
Visual accessibility has been considered.
Relevant automated and manual checks are reported accurately.

Final instruction

Accessibility is part of the interface contract, not a final polish step.

