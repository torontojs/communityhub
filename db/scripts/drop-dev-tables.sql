-- scripts/drop_dev_tables.sql
-- Drop children first, then parents to avoid foreign key constraints
DROP TABLE IF EXISTS "documents";
DROP TABLE IF EXISTS "access";
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "team";
DROP TABLE IF EXISTS "profile_skills";
DROP TABLE IF EXISTS "profile_links";
DROP TABLE IF EXISTS "profile";
DROP TABLE IF EXISTS "event_log";
DROP TABLE IF EXISTS "migrations";
