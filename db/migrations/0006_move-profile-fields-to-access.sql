-- Migration number: 0006
-- Move activatedAt, deletedAt, and deletedReason from profile to access

-- 1. Add new columns to access table
ALTER TABLE access ADD COLUMN activatedAt DATETIME DEFAULT NULL;
ALTER TABLE access ADD COLUMN deletedAt DATETIME DEFAULT NULL;
ALTER TABLE access ADD COLUMN deletedReason TEXT DEFAULT NULL;

-- 2. Copy data from profile to access for these fields
UPDATE access
SET
    activatedAt = (SELECT activatedAt FROM profile WHERE profile.id = access.id),
    deletedAt = (SELECT deletedAt FROM profile WHERE profile.id = access.id),
    deletedReason = (SELECT deletedReason FROM profile WHERE profile.id = access.id);

-- 3. (Optional) You may later drop these columns from profile after verifying migration and updating codebase.
-- ALTER TABLE profile DROP COLUMN activatedAt;
-- ALTER TABLE profile DROP COLUMN deletedAt;
-- ALTER TABLE profile DROP COLUMN deletedReason;
