-- Migration number: 0009

DROP TABLE IF EXISTS event_role;

-- The role a person may have at an event
CREATE TABLE IF NOT EXISTS event_role (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The event role name
	name TEXT NOT NULL,
	-- The event role description
	description TEXT,
	-- The UUID of the event this event role belongs to
	eventId TEXT NOT NULL COLLATE BINARY,
	-- The UUID of the team this event role belongs to
	teamId TEXT COLLATE BINARY,
	-- The UUID of the profile this event role is assigned to
	profileId TEXT COLLATE BINARY,
	-- The maximum number of people allowed in this event role
	capacity INTEGER NOT NULL,
	-- The date this event role was assigned, saved as an ISO timestamp
	happenedAt DATETIME NOT NULL,
	-- The date this event role was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this event role was closed/deleted, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (eventId) REFERENCES event(id),
	FOREIGN KEY (teamId) REFERENCES team(id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

CREATE INDEX idx_event_role_profile_and_event ON event_role (profileId, eventId);
