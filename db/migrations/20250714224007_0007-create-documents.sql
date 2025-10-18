-- Migration number: 0007	2025-07-14T22:40:07.000Z

DROP TABLE IF EXISTS documents;

CREATE TABLE IF NOT EXISTS documents (
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- The UUID for the profilie signing the document
	profileId TEXT NOT NULL COLLATE BINARY,
	-- The document type
	type TEXT NOT NULL CHECK(type IN ('code-of-conduct', 'image-release-form', 'volunteer-agreement')),
	-- The date when the document was signed, saved as an ISO timestamp
	signedAt DATETIME NOT NULL,
	-- The document version date, saved as an ISO timestamp
	documentVersion DATETIME NOT NULL,

	PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_document_profile ON documents (profileId);
CREATE INDEX IF NOT EXISTS idx_document_profile_and_type ON documents (profileId, type);
CREATE INDEX IF NOT EXISTS idx_document_signed ON documents (signedAt);
CREATE INDEX IF NOT EXISTS idx_document_version ON documents (documentVersion, type);
