# PR Review

## Findings

1. High: `isBasedOnGTA`/`isBasedInGTA` is inconsistent between the frontend and API, so the GTA flag does not round-trip correctly.
   Frontend reads `isBasedInGTA` from `/api/profiles/self` and sends `isBasedOnGTA` only on submit, while the API schema/transform expose `isBasedOnGTA`.
   References: `src/components/ProtectedProfile/ProtectedProfile.tsx:52`, `src/components/ProtectedProfile/ProtectedProfile.tsx:184`, `api/src/routes/profile/validation.ts:63`, `api/src/routes/profile/data.ts:10`.

2. High: the description editor updates local UI even when the PATCH fails.
   `updateDescription()` logs a non-OK response but still returns the submitted text, and `handleDescriptionSubmit()` immediately commits it to local state. This can show a saved description that the backend rejected.
   References: `src/components/ProtectedProfile/ProtectedProfile.tsx:70`, `src/components/ProtectedProfile/ProtectedProfile.tsx:81`, `src/components/ProtectedProfile/ProtectedProfile.tsx:243`.

3. Medium: all edit modals close before the async submit result is known, so users lose context on failed saves and never see inline recovery.
   Each modal calls `onClose()` right after `onSubmit(event)` without awaiting success. General info, skills, social links, and description all have this behavior.
   References: `src/components/GeneralInfoFormModal/GeneralInfoFormModal.tsx:26`, `src/components/SkillsFormModal/SkillsFormModal.tsx:14`, `src/components/SocialLinksFormModal/SocialLinksFormModal.tsx:41`, `src/components/DescriptoinFormModal/DescriptionFormModal.tsx:14`.

4. Medium: the Teams section is placeholder content, not the logged-in user’s actual teams.
   The protected profile always renders a hard-coded `Team` card with fixed copy and counts, so every user sees the same team membership regardless of backend data.
   References: `src/components/ProtectedProfile/ProtectedProfile.tsx:423`, `src/components/Team/Team.tsx:10`.

## Residual Risk

- I did not run the app or API tests for this review.
- This PR is very large relative to the protected-profile feature, so there may be unrelated regressions outside the files above.
