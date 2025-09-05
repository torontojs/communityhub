-- Migration number: 0009 	 2025-01-30T00:58:39.397Z

DROP TABLE IF EXISTS project-role;

-- The role a person may have on a project
CREATE TABLE IF NOT EXISTS role (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The project role name
	name TEXT NOT NULL,
	-- The project role description
	description TEXT,
	-- The UUID of the team this project role belongs to
	teamId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the profile this project role is assigned to
	profileId TEXT COLLATE BINARY,
	-- The maximum number of people allowed in this project role
	capacity INTEGER NOT NULL,
	-- The date this project role was assigned, saved as an ISO timestamp
	happenedAt DATETIME NOT NULL,
	-- The date this project role was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this project role was closed/deleted, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (teamId) REFERENCES team(id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

CREATE INDEX idx_role_profile_and_team ON role (profileId, teamId);
