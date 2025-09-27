-- Migration number: 0008

DROP TABLE IF EXISTS uploads;

CREATE TABLE IF NOT EXISTS uploads (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The UUID for the profile uploading the file
	profileId TEXT NOT NULL COLLATE BINARY,
	-- The name of the uploaded file
	fileName TEXT NOT NULL,
	-- The uploaded file type
	type TEXT NOT NULL CHECK(type IN ('avatar', 'other')),
	-- The date when the file was uploaded, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The MIME type of the file
	mimeType TEXT NOT NULL CHECK(mimeType IN ('image/jpeg', 'image/jpg', 'image/png')),

	PRIMARY KEY (id),
	FOREIGN KEY (profileId) REFERENCES profile(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_uploads_profile ON uploads(profileId);
CREATE INDEX IF NOT EXISTS idx_uploads_profile_and_type ON uploads(profileId, type);
