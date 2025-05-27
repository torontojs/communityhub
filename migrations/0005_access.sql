-- Migration number: 0005 	 2025-01-30T00:58:45.123Z

DROP TABLE IF EXISTS access;

-- Store authentication and authorization data separately from profiles
CREATE TABLE IF NOT EXISTS access (
	-- The UUID of the profile this access belongs to
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The person's access level in the system
	-- This determines what actions they can perform
	accessLevel TEXT NOT NULL CHECK(accessLevel IN ('admin', 'organizer', 'volunteer')),
	-- The person's account password
	password TEXT NOT NULL,
	-- The person's email address
	email TEXT NOT NULL UNIQUE,

	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES profile (id),
	FOREIGN KEY (email) REFERENCES profile (email)
);

CREATE INDEX idx_access_email ON access (email);
