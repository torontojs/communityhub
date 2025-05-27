-- Migration number: 0001 	 2025-01-30T00:57:56.408Z

DROP TABLE IF EXISTS event_log;

-- Event logs are things that happen on the system,
-- They should read like English in the format:
-- Subject - Verb - Object (SVO)
-- E.g.: (Marco) {joined} [VMS team]
CREATE TABLE IF NOT EXISTS event_log (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The UUID for the entity performing the action
	subject TEXT NOT NULL COLLATE BINARY,
	-- The source where the subject comes from
	subjectSource TEXT NOT NULL DEFAULT 'profile' CHECK(subjectSource IN ('profile', 'team', 'role', 'special')),
	-- The action being performed
	verb TEXT NOT NULL,
	-- The UUID for the entity receiving the action
	object TEXT NOT NULL COLLATE BINARY,
	-- The source where the object comes from
	objectSource TEXT NOT NULL DEFAULT 'special' CHECK(objectSource IN ('profile', 'team', 'role', 'special')),
	-- The date where this log happened, saved as an ISO timestamp
	happenedAt DATETIME NOT NULL,
	-- The date where this log was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,

	PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_event_log_subject ON event_log (subject);
CREATE INDEX IF NOT EXISTS idx_event_log_verb ON event_log (verb);
CREATE INDEX IF NOT EXISTS idx_event_log_object ON event_log (object);
CREATE INDEX IF NOT EXISTS idx_event_log_svo ON event_log (subject, verb, object);
