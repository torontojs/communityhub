-- Migration number: 0002 	 2025-01-30T00:58:21.685Z

DROP TABLE IF EXISTS open_role;

-- A person's profile inside the database
-- It should contain no sensitive information
CREATE TABLE IF NOT EXISTS open_role(
	-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- The name of the open role
	openRoleName TEXT NOT NULL,
	-- A text blurb the person can provide about themselves
	openRoleDescription TEXT,
	-- A flag indicating if the user is based on the Grater Toronto Area (GTA)
	-- This and the following flags are a proxy for information if people can attend online and in person events.
	-- It is enough to give us information if the person is around Toronto without needing to ask the actual location.
	isBasedOnGTA INTEGER NOT NULL DEFAULT 1 CHECK(isBasedOnGTA IN (0, 1)),
	-- The experience level of the open role (senior, mid, entry)
	experienceLevel TEXT NOT NULL CHECK(experienceLevel IN ('senior', 'mid', 'entry')),
	-- The tech stacks required for the open role
	techStacks TEXT NOT NULL,
	-- The position of the open role (1,2,5...)
	positionRequired INTEGER NOT NULL,
	-- The team id of the open role (FK of Team(id))
	teamId TEXT NOT NULL,
	-- The date this open role was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this open role was deleted from the database, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (teamId) REFERENCES team(id)
);

Drop TABLE IF EXISTS open_role_members;
CREATE TABLE IF NOT EXISTS open_role_members(
-- The UUID, stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	--Foreign key to the open role member (FK of open-role(id))
	openRoleId TEXT NOT NULL,
	-- The profile id of the open role member (FK of profile(id))
	profileId TEXT NOT NULL,
	-- The open role name of the open role member (FK of open_role(open_role_name))
	openRoleName TEXT NOT NULL,
	-- The date this open role member was added to the database, saved as an ISO timestamp
	insertedAt DATETIME NOT NULL,
	-- The date this open role member was deleted from the database, saved as an ISO timestamp
	deletedAt DATETIME DEFAULT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (openRoleId) REFERENCES open_role(id),
	FOREIGN KEY (profileId) REFERENCES profile(id),
	FOREIGN KEY (openRoleName) REFERENCES open_role(openRoleName)
);
