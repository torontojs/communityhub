-- Migration number: 0002 	 2025-01-30T00:58:21.685Z


-- A person's profile inside the database
-- It should contain no sensitive information
CREATE TABLE IF NOT EXISTS open_role(
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- The name of the open role
	title TEXT NOT NULL,
	-- A text blurb the person can provide about themselves
	description TEXT,
	-- A flag indicating if the user is based on the Grater Toronto Area (GTA)
	-- This and the following flags are a proxy for information if people can attend online and in person events.
	-- It is enough to give us information if the person is around Toronto without needing to ask the actual location.
	isBasedOnGTA INTEGER NOT NULL DEFAULT 1 CHECK(isBasedOnGTA IN (0, 1)),
	-- The userId is id of the open role,who created the open role (FK of access(id))
	userId TEXT NOT NULL,
	-- The date this open role was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this open role was deleted from the database, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,
	--The date this open role was last modified in the database, saved as an ISO timestamp
	modifiedAt DATETIME NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES access(id)
);
