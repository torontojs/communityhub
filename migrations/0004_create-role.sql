-- Migration number: 0004 	 2025-01-30T00:58:39.397Z

DROP TABLE IF EXISTS role;

-- The role a person may have on a team
CREATE TABLE IF NOT EXISTS role (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The role name
	name TEXT NOT NULL,
	-- The role description
	description TEXT,
	-- The UUID of the team this role belongs to
	teamId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the profile this role is assigned to
	profileId TEXT NOT NULL COLLATE BINARY,
	-- The date this role was assigned, saved as an ISO timestamp
	happenedAt DATETIME NOT NULL,
	-- The date this role was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this role was closed/deleted, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (teamId) REFERENCES team(id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

CREATE INDEX idx_role_profile_and_team ON role (profileId, teamId);
