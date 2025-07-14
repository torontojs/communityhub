-- Migration number: 0006
-- Move activatedAt, deletedAt, and deletedReason from profile to access

-- 1. Add new columns to access table

-- The date this profile was activated, saved as an ISO timestamp
ALTER TABLE access ADD COLUMN activatedAt DATETIME DEFAULT NULL;
-- The date this person has left the community or had their profile deactivated, saved as an ISO timestamp.
-- This provides a way to retain information without deleting data from the database.
-- It is used for checking if a user can log-in to the vms or not.
-- A profile with this flag set will not be able to login to the vms.
--
-- In case a user returns to the community and wants to reactivate their account,
-- that must be done manually by one of the organizers by removing this information.
--
-- In case a user is removed from the community, this flag is to be set, so their profile is deactivated.
--
-- In the future, we may use this flag as a potential "ban list" for spammers and similar situations.
-- If a person thinks it was mistakenly flagged as spam, then contatcing one of the organizers should resolve the issue.
ALTER TABLE access ADD COLUMN deletedAt DATETIME DEFAULT NULL;
-- When a profile is deactivated, this fields enables us to keep notes for other organizers in a future moment.
ALTER TABLE access ADD COLUMN deletedReason TEXT DEFAULT NULL;

-- 2. Copy data from profile to access for these fields
UPDATE access AS access
SET
	activatedAt = profile.activatedAt,
	deletedAt = profile.deletedAt,
	deletedReason = profile.deletedReason
FROM (
	SELECT id, activatedAt, deletedAt, deletedReason
	FROM profile
	WHERE
		profile.id = access.id
) AS profile
WHERE access.id = profile.id;

-- 3. (Optional) You may later drop these columns from profile after verifying migration and updating codebase.
ALTER TABLE profile DROP COLUMN activatedAt;
ALTER TABLE profile DROP COLUMN deletedAt;
ALTER TABLE profile DROP COLUMN deletedReason;
