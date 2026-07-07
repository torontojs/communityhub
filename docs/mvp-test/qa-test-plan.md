# UAT Plan — Community Hub MVP

## Environments

| Env                     | API URL                      | Frontend URL                       | Data                    |
| ----------------------- | ---------------------------- | ---------------------------------- | ----------------------- |
| **Local Dev**           | `http://localhost:3000/api`  | `http://localhost:3000`            | Seeded test data        |
| **Shared Dev (online)** | N/A                          | N/A                                | Seeded test data        |
| **Production**          | `https://vms.torontojs.com`* | `https://volunteer.torontojs.com`* | Real data (post-launch) |

_\* Not yet updated_

## Pre-Seeded Test Accounts

| Role          | Name          | Email                              | Password                       | Status            |
| ------------- | ------------- | ---------------------------------- | ------------------------------ | ----------------- |
| **Admin**     | root          | `root@torontojs.com`               | `correct horse battery staple` | profile-completed |
| **Organizer** | King Arthur   | `king.arthur@camelot.uk`           | `H0lyGr@il42!`                 | profile-completed |
| **Organizer** | Black Knight  | `black.knight@bridgeguard.io`      | `ItzJustaFsh!`                 | profile-completed |
| **Volunteer** | Sir Robin     | `sir.robin@cowardly.co`            | `RunAway!1234`                 | tos-accepted      |
| **Volunteer** | Sir Lancelot  | `lancelot@heroics.inc`             | `LeapotFaith!`                 | tos-accepted      |
| **Volunteer** | Tim Enchanter | `tim@enkanta.io`                   | `BOOM!!Fire12`                 | activated         |
| **Volunteer** | Bridge Keeper | `bridge.keeper@threequestions.org` | `BridgeAns33?`                 | created           |
| **Deleted**   | Knight Ni     | `knight.ni@forestsayni.com`        | `NiNiNiNi42?!`                 | deleted           |

## Test Coverage Matrix

Each journey should produce pass/fail and a bug report if failed.

### 1. Authentication & Onboarding

| #    | Journey                             | Steps                                                              | Expected                                                             |
| ---- | ----------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| 1.1  | Sign up as new volunteer            | 1. Go to sign-up page → 2. Enter name, email, password → 3. Submit | Redirect to "check your email". Profile created with status=created. |
| 1.2  | Sign up with existing email         | Use `king.arthur@camelot.uk`                                       | Error "email already exists"                                         |
| 1.3  | Sign up with weak password          | Enter password `a`                                                 | Rejected "weak password"                                             |
| 1.4  | Sign up with invalid email          | Enter `notanemail`                                                 | Rejected "invalid email"                                             |
| 1.5  | Activate account via email link     | Click activation link from email                                   | Account activated. Can sign in.                                      |
| 1.6  | Activate with invalid/expired token | Visit `/api/auth/activate?token=bad`                               | 401 Unauthorized                                                     |
| 1.7  | Sign in with valid credentials      | Enter email + password                                             | Redirect to home. Session cookie set.                                |
| 1.8  | Sign in with wrong password         | Enter wrong password                                               | Error "invalid credentials"                                          |
| 1.9  | Sign in with unactivated account    | Use Bridge Keeper's credentials                                    | Blocked "account not activated"                                      |
| 1.10 | Forgot password flow                | Click "forgot password" → enter email                              | Reset email sent                                                     |
| 1.11 | Reset password                      | Visit reset link → enter new password                              | Password changed. Can sign in.                                       |
| 1.12 | Sign out                            | Click sign out                                                     | Session invalidated. Redirected to sign-in.                          |

### 2. Profile Management

| #    | Journey                          | Role      | Steps                                      | Expected                            |
| ---- | -------------------------------- | --------- | ------------------------------------------ | ----------------------------------- |
| 2.1  | View own profile                 | Volunteer | Sign in → navigate to profile              | Profile displayed with all fields   |
| 2.2  | Edit own profile (name, bio)     | Volunteer | Edit name and description → Save           | Changes persisted                   |
| 2.3  | Edit own profile (avatar)        | Volunteer | Provide Gravatar URL → Save                | Avatar updated                      |
| 2.4  | Add/remove skills                | Volunteer | Add skill → Save. Remove → Save.           | Skills reflect changes              |
| 2.5  | Add/remove social links          | Volunteer | Add GitHub link → Save                     | Link appears with correct icon      |
| 2.6  | View another volunteer's profile | Volunteer | Navigate to Sir Lancelot's profile         | Public profile displayed            |
| 2.7  | View protected profile           | Volunteer | Try protected profile route                | Redirected or access denied         |
| 2.8  | Admin edits another profile      | Admin     | Sign in as root → edit Sir Robin's profile | Changes saved                       |
| 2.9  | Organizer edits other profile    | Organizer | Sign in as King Arthur → try               | **Blocked**                         |
| 2.10 | Delete own profile               | Volunteer | Delete profile                             | Soft-deleted. Cannot sign in again. |

### 3. Teams

| #    | Journey                       | Role      | Steps                                 | Expected                               |
| ---- | ----------------------------- | --------- | ------------------------------------- | -------------------------------------- |
| 3.1  | List all teams                | Volunteer | Navigate to teams page                | All 11 teams displayed                 |
| 3.2  | View team detail              | Volunteer | Click "Ministry of Silly Walks"       | Team + members displayed               |
| 3.3  | Create a team                 | Organizer | Create team form → name + description | Team created and listed                |
| 3.4  | Volunteer creates team        | Volunteer | Try to create team                    | **Blocked**                            |
| 3.5  | Edit team name/description    | Organizer | Edit a team you created               | Changes saved                          |
| 3.6  | Edit as non-creator organizer | Organizer | Black Knight edits Arthur's team      | Allowed (any organizer edits any team) |
| 3.7  | Delete a team                 | Organizer | Delete team you created               | Soft-deleted. Removed from list.       |
| 3.8  | Volunteer deletes team        | Volunteer | Attempt delete                        | **Blocked**                            |
| 3.9  | View team with no members     | Public    | "Committee for Elaborate Tea Breaks"  | "No members yet"                       |
| 3.10 | Pagination                    | Any       | Browse many teams                     | Page controls work                     |

### 4. Team Members

| #   | Journey                | Role      | Steps                            | Expected          |
| --- | ---------------------- | --------- | -------------------------------- | ----------------- |
| 4.1 | Add member to team     | Organizer | Add Sir Lancelot as "Tea Taster" | Member added      |
| 4.2 | Volunteer adds member  | Volunteer | Attempt                          | **Blocked**       |
| 4.3 | Update member role     | Organizer | Change role name                 | Updated           |
| 4.4 | Remove member          | Organizer | Remove a member                  | Removed from team |
| 4.5 | Duplicate member add   | Organizer | Add same person twice            | Rejected          |
| 4.6 | Invalid team operation | Organizer | Use non-existent team ID         | 404               |
| 4.7 | View members as public | Public    | View team without sign-in        | Members visible   |

### 5. Documents

| #   | Journey                   | Role      | Steps                      | Expected               |
| --- | ------------------------- | --------- | -------------------------- | ---------------------- |
| 5.1 | Sign Code of Conduct      | Volunteer | Navigate → sign CoC        | Signed. Event logged.  |
| 5.2 | Sign Volunteer Agreement  | Volunteer | Sign agreement             | Signed                 |
| 5.3 | Sign Image Release Form   | Volunteer | Sign image release         | Signed                 |
| 5.4 | View own signed documents | Volunteer | Go to documents page       | All signed docs listed |
| 5.5 | View another's documents  | Organizer | View Sir Robin's documents | Visible to organizer   |
| 5.6 | Volunteer views another's | Volunteer | Try                        | **Blocked**            |

### 6. Authorization & Access Control

| #   | Journey                                 | Steps                                                    | Expected                      |
| --- | --------------------------------------- | -------------------------------------------------------- | ----------------------------- |
| 6.1 | Public redirected from protected routes | Visit `/pages/teams/`, `/pages/profile/` without sign-in | Redirect to `/pages/sign-in/` |
| 6.2 | Volunteer can't access admin pages      | Visit `/pages/protected-page-admins/` as volunteer       | Access denied                 |
| 6.3 | Volunteer can't access organizer pages  | Visit `/pages/protected-page-organizers/` as volunteer   | Access denied                 |
| 6.4 | Organizer accesses organizer pages      | Visit as organizer                                       | Access granted                |
| 6.5 | Admin accesses all pages                | Visit all protected pages as root                        | All accessible                |
| 6.6 | Session expiry                          | Clear cookie / close browser                             | Redirected to sign-in         |

### 7. UI & UX Review

| #   | Area                 | What to check                                       |
| --- | -------------------- | --------------------------------------------------- |
| 7.1 | Home page            | Layout, nav, links to teams/profiles, responsive    |
| 7.2 | Profile card         | Avatar, social icons, skills, empty states          |
| 7.3 | Team card            | Name, description, member count, action buttons     |
| 7.4 | Form validation      | Error messages inline, button loading states        |
| 7.5 | Empty states         | "No teams", "No members", empty profile sections    |
| 7.6 | Mobile/responsive    | Test at 375px, 768px, 1024px — no breakage          |
| 7.7 | Loading states       | Spinners/skeleton while data loads                  |
| 7.8 | 404 pages            | Navigate to non-existent page                       |
| 7.9 | Accessibility basics | Tab through forms, focus indicators, color contrast |

### 8. Edge Cases & Security

| #   | Scenario                  | Steps                                                                                                             | Expected                                                                                          |
| --- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 8.1 | Network error             | DevTools → Offline → try sign in                                                                                  | Graceful error message                                                                            |
| 8.2 | Double submit             | Rapidly click sign-up button twice                                                                                | Only one request sent                                                                             |
| 8.3 | Special chars in name     | Name: `<!-- <script>alert(1)</script> 😀`                                                                         | Properly escaped/displayed                                                                        |
| 8.4 | Extremely long bio        | 500+ chars                                                                                                        | Truncated or wrapped                                                                              |
| 8.5 | API 500 error             | Trigger server error                                                                                              | Friendly error page                                                                               |
| 8.6 | Concurrent sessions       | Sign in on two browsers → sign out on one                                                                         | Other session handled gracefully                                                                  |
| 8.7 | Social link URL injection | 1. Edit profile → 2. Add link with URL `javascript:alert('XSS-TEST')` → 3. Save → 4. View profile → 5. Click link | Link does nothing (safe). **Fail if alert appears.**                                              |
| 8.8 | Cookie security flags     | 1. Sign in → 2. DevTools → Application → Cookies → 3. Check `auth_token`                                          | `HttpOnly ✓`, `Secure ✓`, `SameSite` set                                                          |
| 8.9 | Security headers          | 1. DevTools → Network → 2. Click API response → 3. Inspect headers                                                | `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security` present |

## How to Organize the Testing Effort

**This is an open question. How do we organize the testing effort? Everything that follow is pre-emptive suggestion**

### Roles and Assignments

| Role      | Who | Responsibility                                                                    |
| --------- | --- | --------------------------------------------------------------------------------- |
| Test Lead | ?   | Write test plan, assign testers, triage bugs, track progress, sign off on release |
| Tester 1  | ?   | Auth & Onboarding (1.1–1.12)                                                      |
| Tester 2  | ?   | Profile Management (2.1–2.10)                                                     |
| Tester 3  | ?   | Teams (3.1–3.10)                                                                  |
| Tester 4  | ?   | Team Members (4.1–4.7)                                                            |
| Tester 5  | ?   | Documents (5.1–5.6)                                                               |
| Tester 6  | ?   | Authorization & Access Control (6.1–6.6)                                          |
| Tester 7  | ?   | UI/UX Review (7.1–7.9)                                                            |
| Tester 8  | ?   | Edge Cases (8.1–8.6)                                                              |

- Each tester needs:

  - A _dev environment_ link (URL + test credentials)
  - A _test script_ (the table above IS the script — add a checkbox column)
  - A _bug report template_:
  ```markdown
  ## Bug Report

  - **Journey:** (e.g., 1.7 Sign in)
  - **What happened:** ...
  - **What should happen:** ...
  - **Steps to reproduce:** ...
  - **Browser/OS:** ...
  - **Screenshot/Video:** [link]
  - **Severity:** Critical / Major / Minor / Suggestion
  ```

### Project Board Setup

Create a GitHub Project board to track UAT progress:

1. Go to https://github.com/torontojs/communityhub/projects
2. Click "Link a project" or create a new Project (table view)
3. Add columns/fields: **Journey #**, **Area**, **Status** (To Test / In Progress / Passed / Failed / Blocked), **Tester**
4. Add one item per journey from this plan
5. Link the project to the repo so QA Bug issues auto-populate

### Bug Tracking

Testers file bugs using the QA Bug Report template. Devs triage daily. Severity labels:

- `bug:critical` — blocks launch (data loss, auth bypass, crash)
- `bug:major` — feature broken, workaround exists
- `bug:minor` — cosmetic, edge case, non-blocking

### Triage process:

1. Testers file issues with labels
2. Test Lead reviews daily and assigns to devs
3. Devs fix → re-assign to tester for verification
4. Only verified + closed issues move the release forward

### Test Cycles

| Cycle                 | Scope                                              | Duration | Gate                                  |
| --------------------- | -------------------------------------------------- | -------- | ------------------------------------- |
| R1 — Smoke            | Happy path only: 1.1, 1.7, 2.1, 3.1, 4.1, 5.1, 6.1 | 1 day    | All pass → R2                         |
| R2 — Full             | All 60+ journeys, error + edge cases               | 3–5 days | ≥95% executed, no critical/major bugs |
| R3 — Regression       | Re-test fixes + high-risk areas                    | 2 days   | No regressions                        |
| R4 — Production Smoke | Core auth + profile + team on production           | 1 day    | All pass → LAUNCH                     |

### Pass/Fail Criteria for MVP Launch

| Condition             | Requirement                                         |
| --------------------- | --------------------------------------------------- |
| Critical bugs         | Zero unresolved                                     |
| Major bugs            | Zero unresolved                                     |
| Minor bugs            | Documented                                          |
| Smoke tests (R1 + R4) | 100% pass rate                                      |
| Full tests (R2)       | ≥95% of test cases executed (known gaps documented) |
