-- Migration number: 0009

DROP TABLE IF EXISTS project;

-- The project a organizer can create
CREATE TABLE IF NOT EXISTS project (
	-- UUID stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- Name of the project
	name TEXT NOT NULL,
	-- Description of the project
	description TEXT,
	-- The UUID of the profile this event is assigned to
	profileId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the team this project is assigned to
	teamId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the event this project belongs to
	eventId TEXT COLLATE BINARY,
	-- The date when this project was created, saved as an ISO timestamp
	happenedAt TEXT NOT NULL,
	-- The date when this project was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NUll,
	-- The data this project was closed/deleted, saved as an ISO Timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
    FOREIGN KEY (teamId) REFERENCES team(id),
	FOREIGN KEY (eventId) REFERENCES event(id) ON DELETE SET NULL
)
