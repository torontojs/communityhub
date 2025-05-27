-- Migration number: 0002 	 2025-01-30T00:58:21.685Z

DROP TABLE IF EXISTS profile;

-- A person's profile inside the database
-- It should contain no sensitive information
CREATE TABLE IF NOT EXISTS profile (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- The person's email,
	-- It is used as a reference for the user
	-- And should be unique inside the system
	email TEXT NOT NULL UNIQUE,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The person's name, or how they like to be identified
	name TEXT NOT NULL,
	-- A text blurb the person can provide about themselves
	description TEXT,
	-- A flag indicating if the user is based on the Grater Toronto Area (GTA)
	-- This and the following flags are a proxy for information if people can attend online and in person events.
	-- It is enough to give us information if the person is around Toronto without needing to ask the actual location.
	isBasedOnGTA INTEGER NOT NULL DEFAULT 1 CHECK(isBasedOnGTA IN (0, 1)),
	-- A flag indicating if the user is available to join local/in-person events
	-- This flag complements the previous one as they are not mutually exclusive.
	-- E.g.: someone who lives in Ottawa and comes to Toronto frequently, can still join in person events.
	-- E.g.: someone who lives in the GTA but has limitations could mark themselves as not able to attend in person events.
	canJoinLocalEvents INTEGER NOT NULL DEFAULT 1 CHECK(canJoinLocalEvents IN (0, 1)),
	-- The pronouns the person identifies with
	pronouns TEXT,
	-- The person's birthday, saved as month and day only
	-- In the format: MM-DD
	birthday TEXT,
	-- The user avatar url for the user.
	avatar TEXT,
	-- The date this person has joined Toronto JS, saved as an ISO timestamp
	happenedAt DATETIME NOT NULL,
	-- The date this profile was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this profile was activated, saved as an ISO timestamp
	activatedAt DATETIME DEFAULT NULL,
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
	deletedAt DATETIME DEFAULT NULL,
	-- When a profile is deactivated, this fields enables us to keep notes for other organizers in a future moment.
	deletedReason TEXT DEFAULT NULL,

	PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_profile_email ON profile (email);

DROP TABLE IF EXISTS profile_links;

CREATE TABLE IF NOT EXISTS profile_links (
	-- The UUID of the link, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- The UUID of the profile this link belongs to
	profileId TEXT NOT NULL,
	-- The platform name for the link
	platform TEXT NOT NULL,
	-- The URL of the link
	url TEXT NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

CREATE INDEX IF NOT EXISTS idx_links_profileId ON profile_links (profileId);

DROP TABLE IF EXISTS profile_skills;

CREATE TABLE IF NOT EXISTS profile_skills (
	-- The UUID of the skill, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- The UUID of the profile this skill belongs to
	profileId TEXT NOT NULL,
	-- The name of the skill
	skill TEXT NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

CREATE INDEX IF NOT EXISTS idx_skills_profileId ON profile_skills (profileId);
