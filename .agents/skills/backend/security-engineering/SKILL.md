---
name: security-engineering
description: >-
  Identify, prevent, investigate, and review application security risks involving authentication, authorization, input validation, sessions, secrets, data exposure, and infrastructure boundaries.
---
Security Engineering
Mission

Protect application data, operations, users, and infrastructure through explicit security controls.

1. Threat assessment

Identify:

Assets.
Trust boundaries.
Entry points.
User roles.
Privileged operations.
External dependencies.
Sensitive information.
Potential abuse cases.

Use threat modeling proportionally to system risk.

2. Authentication

Verify identity through the established authentication mechanism.

Use secure session and token handling.

Never trust identity information supplied independently by the client.

3. Authorization

Authentication does not imply authorization.

Enforce:

Resource ownership.
Role permissions.
Tenant isolation.
Operation-level permissions.
Access restrictions.

Check authorization at the protected operation boundary.

Do not rely on hidden controls or frontend route guards.

4. Input and output security
Validate untrusted inputs.
Use parameterized database operations.
Prevent injection vulnerabilities.
Encode output appropriately.
Avoid unsafe HTML rendering.
Validate redirects.
Restrict upload types and sizes.
Protect sensitive responses.
5. Secrets and privacy
Keep secrets out of source control.
Never expose server secrets to browser bundles.
Avoid logging credentials and tokens.
Restrict sensitive data access.
Prevent private data from entering shared caches.
Apply data minimization.
6. Web application threats

Consider relevant risks from OWASP guidance, including:

Broken access control.
Injection.
Authentication failures.
Security misconfiguration.
Vulnerable dependencies.
SSRF.
CSRF where applicable.
Insecure deserialization.
Sensitive information exposure.
Security logging failures.

Do not assume a particular mitigation is necessary without examining the application's architecture and threat model.

7. Security changes

For security-sensitive changes:

Identify the vulnerability.
Identify the affected boundary.
Determine the smallest effective mitigation.
Preserve legitimate application behavior.
Add regression tests.
Verify the fix.
Report residual risk.

Do not claim a system is secure simply because one audit passed.

Definition of done
Trust boundaries are understood.
Authentication and authorization are enforced.
Inputs are validated.
Sensitive information is protected.
Relevant attack paths are addressed.
Security checks and limitations are reported.
Final instruction

Security must be enforced where the protected operation actually occurs, not merely where the user interacts with it.
