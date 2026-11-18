-- Migration number: 0008

DROP TABLE IF EXISTS event;

-- The event an organizer can create
CREATE TABLE IF NOT EXISTS event (
	-- UUID stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- Name of the event
	name TEXT NOT NULL,
	-- Description of the event
	description TEXT,
	-- The UUID of the team this event belongs to
	teamId TEXT COLLATE BINARY,
	-- The UUID of the project this event belongs to
	happenedAt TEXT NOT NULL,
	-- The date when this event was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this event was closed/deleted, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (teamId) REFERENCES team(id) ON DELETE SET NULL
);
