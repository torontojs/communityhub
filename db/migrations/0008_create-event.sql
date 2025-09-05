--Migration number: 0008

DROP TABLE IF EXISTS event;

-- The event a orgganizer can create
CREATE TABLE IF NOT EXISTS event (
	-- UUID stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- Name of the event
	name TEXT NOT NULL,
	-- Description of the event
	description TEXT,
	-- The UUID of the profile this event is assigned to
	profileId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the team this event belongs to
	teamId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the projet this event belongs to
	projectId TEXT COLLATE BINARY,
	-- The date when this event was created, saved as an ISO timestamp
	happenedAt TEXT NOT NULL,
	-- The date when this event was added to the database, saved as an ISO timesamp
	insertedAt DATETIME NOT NULL,
	-- The date this event was closed/deleted, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (profileId) REFERENCES profile(id),
    FOREIGN KEY (teamId) REFERENCES team(id) ON DELETE SET NULL,
	FOREIGN KEY (projectId) REFERENCES project(id) ON DELETE SET NULL
)
