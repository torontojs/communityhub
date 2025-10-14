-- #region User: root@torontojs.com

-- Email: "root@torontojs.com"
-- Password: "correct horse battery staple"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'root@torontojs.com', 'root',
	'they/them', '01-01', 'root'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', 1, 'admin', '0az0isH9H1/NnD4TsbRlOQ==:fCgNPS12kUKtM6xtAmsaT4TXydTxDPXz5/GQY16FdQXgl3bhGUZjMYTbFJMOJlbQe4bmQ0z9wEYbjDApTnd7iA==', 'root@torontojs.com', '2025-06-14T22:04:47Z', 'profile-completed', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'82814359-97c4-4c76-86dc-c08293a283e3', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'12dc94e2-7507-4faa-95e1-5faaffa9d638', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '65c09d85-eda1-470e-9a2e-9ce7a1994613'
);

-- Skills


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'bb07af9c-3a1c-4d0b-a51b-3b99e7220351', 'site', 'torontojs.com', '65c09d85-eda1-470e-9a2e-9ce7a1994613'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'e72fc09b-74c3-4efe-94d4-df315c8c796f', 1,
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'65bad04f-825f-403a-88cc-222f0bbf0a43', 1,
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'6c3439ee-7835-42c5-93e0-fc5a14eb97bb', 1,
	'65c09d85-eda1-470e-9a2e-9ce7a1994613', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: king.arthur@camelot.uk

-- Email: "king.arthur@camelot.uk"
-- Password: "H0lyGr@il42!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'king.arthur@camelot.uk', 'King Arthur',
	'he/him', '03-14', 'Gallant monarch forever seeking sacred drinkware.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 1, 'organizer', 'saMwRm9Sfm0QSkmxgAIadA==:1pkHxwpYK2HCWlItbMNfJ0XmvTmnTXD2l70s5GMLtMUC85fhbMU9B0VKSFzWALQXtc945LB5zsKNg0w1cybCKA==', 'king.arthur@camelot.uk', '2025-06-14T22:04:47Z', 'profile-completed', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'e170816b-9033-4446-b87a-6da342dc4562', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'85f89cfc-6201-4109-ae73-926720d03940', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'0fd6ac1e-c464-475d-b3ef-6f4dc3658bc2', 'Leadership', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'eee2e36c-2bf3-4aa8-93ee-41d405da0919', 'Questing', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'a78fc687-4903-418c-920a-6f3785b9250a', 'Table Management', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'4d6edf63-0592-4430-9773-98a85d39dd50', 'twitter', 'arthur_king', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'03f5b336-4b5a-4af7-9c6e-106d6ddd6ebd', 'github', 'arthur-king', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'bb774f31-83ad-4531-885b-45551217a59c', 'linkedin', 'arthur.king', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'db7df7ea-7a63-4d7c-b8fa-0e8afac910be', 'mastodon', 'arthur_king@mastodon.social', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'4f4286de-6b54-4df0-acea-d33b3230e0bd', 'instagram', 'arthur_king', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'd0bce4f7-0081-4271-aece-124b0449b197', 'slack', 'arthur_king', '3c5123c0-8548-4a02-a83c-32e9ce67eae8'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'd848b373-d0eb-400b-97f9-11fcd2d3f235', 1,
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'08ca581d-11ef-45a5-aab4-26d43ccd38ef', 1,
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'83ad83c6-6d33-4708-bc7d-3978483da13d', 1,
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: black.knight@bridgeguard.io

-- Email: "black.knight@bridgeguard.io"
-- Password: "ItzJustaFsh!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'bf950534-e8f9-4f5a-a246-610aa63faf21', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'black.knight@bridgeguard.io', 'Black Knight',
	'he/him', '10-31', 'Won’t let minor flesh wounds hinder workplace performance.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'bf950534-e8f9-4f5a-a246-610aa63faf21', 1, 'organizer', 'RF7QfD2By+hvuHJAYnhgQQ==:UkSTkyjigT206gSFG34zf5LJtSRs5Ps7p1bmBCP2VI44TvmHwTFuN/ec52wt/iqjb2pyvw12bwh/+bRbIPywkw==', 'black.knight@bridgeguard.io', '2025-06-14T22:04:47Z', 'profile-completed', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'afa2ea59-186b-4f2e-a233-1686cbbae142', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bf950534-e8f9-4f5a-a246-610aa63faf21', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'7efbabdd-658a-4953-971d-52fdc04813e2', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'da49ec28-0247-4c4a-86be-c7adf62d5bc8', 'Swordplay', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ee630252-a4fd-4984-8afe-06f0ffa3be16', 'Tenacity', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'a2437738-1eb1-4c0f-acb5-09502c87c884', 'Trash-talking', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'32d80497-320a-4bad-9ef7-9c295c76a8fa', 'twitter', 'black_knight', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'cf2423da-15c4-435b-b9f4-cfb7f2be7a38', 'slack', 'black_knight', 'bf950534-e8f9-4f5a-a246-610aa63faf21'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'314ad408-ae22-44f5-af59-5d39e3fa26fc', 1,
	'bf950534-e8f9-4f5a-a246-610aa63faf21', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'e3bd200a-58d4-46f0-b840-0d35f9018d48', 1,
	'bf950534-e8f9-4f5a-a246-610aa63faf21', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'b3abcd52-85c6-4f42-b202-2648dcedd891', 1,
	'bf950534-e8f9-4f5a-a246-610aa63faf21', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: sir.robin@cowardly.co

-- Email: "sir.robin@cowardly.co"
-- Password: "RunAway!1234"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'sir.robin@cowardly.co', 'Sir Robin',
	'he/him', '07-07', 'Bravely runs from every KPI imaginable.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', 1, 'volunteer', 'T9BIjZ5/dWpsZQUR+bsOPw==:Rh4lV5+K0hkSmoTgaFtKXswXmLiug1VrhwLyrmnWhUCLzJ+BEde5jtEqVYYHg5NRvXimpq/YPXSUlx17YHsELQ==', 'sir.robin@cowardly.co', '2025-06-14T22:04:47Z', 'tos-accepted', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'b1cb1429-4c9f-4a57-9992-916abb2b4b92', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'a34f7262-d4f1-410a-ab61-0cc69b20a92f', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'abdacc60-c202-484c-99c0-e9fe98c672a2', 'Strategic Retreat', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'71819e7d-e55d-4edb-b9bd-25112e187250', 'Lute Playing', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'b7816ea8-a7f7-4db5-bac4-8314348b09c5', 'Brand Representation', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'654e4cc0-4213-4081-b6ea-a0861f0e0f7c', 'twitter', 'robin_brave', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'6cd29831-2f1f-40f9-b1fe-e3e2f7188d4c', 'instagram', 'robin_brave', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'fd7831a1-4884-4155-8179-c13ed7e7393a', 'bluesky', 'robin.brave', '37a4882c-3b7d-46c0-b019-c37e2445dae8'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'839d3f52-4f05-47d9-aafe-7d68f7434994', 1,
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'b7ce6bc4-5a59-4c3b-92ea-873a647fdd2a', 1,
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'4dcb50dd-6152-4429-8559-828451267cd6', 1,
	'37a4882c-3b7d-46c0-b019-c37e2445dae8', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: lancelot@heroics.inc

-- Email: "lancelot@heroics.inc"
-- Password: "LeapotFaith!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'890cae10-7bbd-4f0c-961a-df495ec7527b', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'lancelot@heroics.inc', 'Sir Lancelot',
	'he/him', '01-26', 'Over-zealous champion who solves problems with a flying tackle.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'890cae10-7bbd-4f0c-961a-df495ec7527b', 1, 'volunteer', 'OAEJZMe2bPEhrfEL6yy8+A==:A9AbiYj4H3Cuq1gbQSF7xJUBP60nLu7S0RhdPk1P47HRTiljxzXdYWRIT4HESOXRiiUdMOtpUB7yFxLVbGud1g==', 'lancelot@heroics.inc', '2025-06-14T22:04:47Z', 'tos-accepted', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'dd472b06-e7ed-4368-9665-95fdb3e5281e', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'890cae10-7bbd-4f0c-961a-df495ec7527b', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'd5685fd1-044c-4f24-b115-84a99bfd0084', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'4fe21fbc-9a43-4a7c-9a90-51fde4936d63', 'Rescue Missions', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'd129f90b-3bdf-41fe-a46e-5df271c36eab', 'Dance Fighting', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'90b94773-0189-479c-a161-091434825548', 'Door-kicking', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'f95c3854-baeb-48e2-8641-deb4000557f1', 'twitter', 'lancelot_daring', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'a81a7194-431c-4205-8862-f4007ac88b57', 'instagram', 'lancelot_daring', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'df54288e-80d1-4f79-b78b-355e968c17e2', 'linkedin', 'lancelot.daring', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'2e3a2150-2333-4b51-a2e3-1c91b43dd3b1', 'github', 'lancelot-daring', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'cf84a4e0-270e-4640-9be5-4dcedf79873d', 'threads', 'lancelot_daring', '890cae10-7bbd-4f0c-961a-df495ec7527b'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'85125bfb-33cc-46c1-a87c-9cba9f0fa5ca', 1,
	'890cae10-7bbd-4f0c-961a-df495ec7527b', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'0903ab14-8f20-46c8-8cf1-05c2a3faff88', 1,
	'890cae10-7bbd-4f0c-961a-df495ec7527b', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'd7babc34-8f5c-4e8a-a888-5e67e2ad6226', 1,
	'890cae10-7bbd-4f0c-961a-df495ec7527b', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: galahad@verypure.org

-- Email: "galahad@verypure.org"
-- Password: "ChasteKnght1"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'bfc463bf-a066-4896-8bda-1af982893a49', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'galahad@verypure.org', 'Sir Galahad',
	'he/him', '04-02', 'Keeps projects—and himself—untouched by corruption.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'bfc463bf-a066-4896-8bda-1af982893a49', 1, 'volunteer', 'WWhernvmj1GsKxb6IpBFZA==:aQs5O7VcM6lRbjyoc4fHdgJ7z3KyTcep8OF746Ad61jmKeVeUYiD12a7n0/V5qNEZZcpBB6jkJR3dAsr63ISPQ==', 'galahad@verypure.org', '2025-06-14T22:04:47Z', 'tos-accepted', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'b250c32d-5720-405a-987e-ca80725e86ab', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bfc463bf-a066-4896-8bda-1af982893a49', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'3314c9e2-ab76-4d18-9018-2ec1694729f3', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', 'bfc463bf-a066-4896-8bda-1af982893a49'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'd2e94054-d613-4bed-ad96-1ecece3f7197', 'Chivalry', 'bfc463bf-a066-4896-8bda-1af982893a49'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'4ebaff3c-51c1-4679-895a-db2995617d53', 'Data Purity', 'bfc463bf-a066-4896-8bda-1af982893a49'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ecb3b31e-9497-46b4-a82d-4f4aa4d9e67e', 'Monastery Negotiation', 'bfc463bf-a066-4896-8bda-1af982893a49'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'e60cb3e8-41b0-43bd-b6de-d227d4502b4d', 'instagram', 'galahad_pure', 'bfc463bf-a066-4896-8bda-1af982893a49'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'eb8af95c-1947-46d7-a0fc-d94438933a83', 'mastodon', 'galahad_pure@mastodon.social', 'bfc463bf-a066-4896-8bda-1af982893a49'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'15ca55be-f98d-4a15-8caf-76dfdab9ee37', 1,
	'bfc463bf-a066-4896-8bda-1af982893a49', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'ff8a08a6-abb6-4355-af64-145d1ae79eef', 1,
	'bfc463bf-a066-4896-8bda-1af982893a49', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'e0848334-98a7-4e6a-af44-41e77a24c601', 1,
	'bfc463bf-a066-4896-8bda-1af982893a49', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: patsy@coconutlogistics.com

-- Email: "patsy@coconutlogistics.com"
-- Password: "ClopClopClop"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'patsy@coconutlogistics.com', 'Patsy Steward',
	'they/them', '05-19', 'Carries everyone else’s baggage, literally and figuratively.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', 1, 'volunteer', 'gz4s4SWC1LaNuI7kPZam7A==:PyJWRghOLb3aiTyeKAEGAdbeRpbKpVksqgagvXNhM0stXa2W30eql88hN/HGf5bEPNPACRHC5IiamIL146jbPw==', 'patsy@coconutlogistics.com', '2025-06-14T22:04:47Z', 'social-handle-provided', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'5b3e1f5a-e6eb-4dfb-a13b-ee2e0647bec2', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'b8470d70-d08b-48ff-a585-2193c5770817', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'67c5b9d1-5847-461e-b77d-5b9789066f82', 'Pack-muling', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'a227ebb9-9f6b-4489-b3a4-02b8851ea1f2', 'Sound Effects', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ce3a537c-60fd-4d26-96ab-a5a2ceef4c83', 'Project Support', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'f9e311d9-f4d3-46d9-adb0-695460677f5f', 'slack', 'patsy_loyal', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'74741efb-c435-4768-b0ff-104dc643da96', 'twitter', 'patsy_loyal', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'460fb469-2765-40b8-84a8-189761e38670', 'github', 'patsy-loyal', '3caf90c5-7c7e-4931-82b4-888666cd8bac'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'7da115f6-fee5-49bd-b3a8-01e10df1bff8', 1,
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'600271bf-b8fb-43ad-a100-d390851d291f', 1,
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'c3f05cec-bf12-45a3-8e7d-ad44079594af', 1,
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: tim@enkanta.io

-- Email: "tim@enkanta.io"
-- Password: "BOOM!!Fire12"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'2f512451-861c-4d69-aa25-b27ee54d16cb', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'tim@enkanta.io', 'Tim Enchanter',
	'he/him', '09-09', 'Prefers explosive stand-ups—sometimes literally.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'2f512451-861c-4d69-aa25-b27ee54d16cb', 1, 'volunteer', 'UH22zeePAZIeUSCK+f6G0g==:3IOE9mo3WkX9yXYkibkExTsSC3y9E5pJsm11bQrWsDSnLAosmSkAjImDMlG9NT1ln757vKjGbUP1PLnjSo/JQg==', 'tim@enkanta.io', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'28e051c4-85a6-4ee6-b7da-19ffe12d47ab', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'2f512451-861c-4d69-aa25-b27ee54d16cb', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'77a4da9d-c119-4745-ba58-603bde5614cc', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'2cb95a88-ef66-406b-bc91-b034c50c4599', 'Pyrotechnics', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'd7923c1b-7aa1-49ed-9aee-c95bb93067d2', 'Risk Assessment', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'98d8b426-a84e-462c-8852-64173164de72', 'Goat-wrangling', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'6928a770-9921-4f50-ba51-0ae03e49ed43', 'twitter', 'tim_enchanter', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'7e08bf96-9d8b-4a71-adf7-0adf8b0faf96', 'github', 'tim-enchanter', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'04cd9c2d-91a7-4307-85a5-5fc5fdbc114d', 'mastodon', 'tim_enchanter@mastodon.social', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'ade75613-bc36-4b8c-86d8-1dc9f32fb9b7', 'instagram', 'tim_enchanter', '2f512451-861c-4d69-aa25-b27ee54d16cb'
);


-- Documents


-- #endregion

-- #region User: dennis@anarcho-peasants.org

-- Email: "dennis@anarcho-peasants.org"
-- Password: "HelpHelpImBN"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'012c9ecf-4897-4879-bd7c-9c877d409626', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'dennis@anarcho-peasants.org', 'Dennis Peasant',
	'they/them', '11-05', 'Self-appointed voice of the oppressed cubicle worker.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'012c9ecf-4897-4879-bd7c-9c877d409626', 1, 'volunteer', 'tEHIZPeIirV+OX+BB5S7CQ==:BFpS7JggR37u6Sbrb2blebtNE4Ef/kKjpAayRn5lSQ98d2p8QuftUK/fP+Ye+jKv4AJZAHMKbLPwerGphUC4Ug==', 'dennis@anarcho-peasants.org', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'20b01c4c-8490-4501-8e15-7472929dec2d', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'012c9ecf-4897-4879-bd7c-9c877d409626', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'964a03c1-3089-496b-a126-a9e677f29690', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'5fc9afd0-8a5e-4f0f-bdf7-ff136b49404b', 'Collective Bargaining', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'7645193d-cf1c-4481-8c4a-6c739606db3d', 'Ditch-digging', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'343fada3-26f0-4a6d-ab74-2e52ae646e01', 'Political Theory', '012c9ecf-4897-4879-bd7c-9c877d409626'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'865aa096-3330-40fa-8b9c-feed64938ec0', 'instagram', 'dennis_peasant', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'7457c9a6-16ed-4618-ab62-a1af0a200921', 'twitter', 'dennis_peasant', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'9021f7b6-5dca-4923-997e-8bd1670184d2', 'linkedin', 'dennis.peasant', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'ace08ad3-e235-4b8c-8a50-c59ca470a845', 'github', 'dennis-peasant', '012c9ecf-4897-4879-bd7c-9c877d409626'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'33cd809f-917e-4c02-aee3-6d668a99cb7e', 'devto', 'dennispeasant', '012c9ecf-4897-4879-bd7c-9c877d409626'
);


-- Documents


-- #endregion

-- #region User: roger@shrubbery.ltd

-- Email: "roger@shrubbery.ltd"
-- Password: "Shrubbery4Ni"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'76fded46-124d-4b2b-abcc-f1db71bbf622', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'roger@shrubbery.ltd', 'Roger Shrubber',
	'he/him', '06-22', 'Can acquire, shape, and deliver any shrub at scale.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'76fded46-124d-4b2b-abcc-f1db71bbf622', 1, 'volunteer', '+AuNT6CJWpxV8EGXK7M2ZQ==:UjcsAsxrgt7GGzhrdhToRY5nMt74DVmI69pZuTqhdzpdpiHDVqSS82+fKv9/OJNtCcqSvzKzjJFkKhoziiul4w==', 'roger@shrubbery.ltd', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'ef3bd33c-2822-4844-9387-6eff6341ad49', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'76fded46-124d-4b2b-abcc-f1db71bbf622', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'5ba53bc0-e11b-4f05-b205-3d660612e60c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '76fded46-124d-4b2b-abcc-f1db71bbf622'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ff79a062-0d30-4215-9487-af5c07f06204', 'Landscape Design', '76fded46-124d-4b2b-abcc-f1db71bbf622'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'e61b055c-c130-4470-a8ab-184f952eff83', 'Supply Chain', '76fded46-124d-4b2b-abcc-f1db71bbf622'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'3e19f145-de70-4dd5-934e-5dc3e79ca149', 'Negotiation', '76fded46-124d-4b2b-abcc-f1db71bbf622'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'e82ce081-f1af-4250-ae87-fb2ddc7ba5f8', 'twitter', 'shrubber', '76fded46-124d-4b2b-abcc-f1db71bbf622'
);


-- Documents


-- #endregion

-- #region User: brother.maynard@holyhand.biz

-- Email: "brother.maynard@holyhand.biz"
-- Password: "HolyHand993!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'89bb6497-0e60-4fc4-b6e3-419c34ce49b1', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'brother.maynard@holyhand.biz', 'Brother Maynard',
	'he/him', '12-03', 'Keeps sacred texts and grenades perfectly catalogued.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'89bb6497-0e60-4fc4-b6e3-419c34ce49b1', 1, 'volunteer', '55+O9iEsAmGRwh6wLibvSw==:hedC5wmrsulJnnzCHoK0ljGmRY4sHOOUeYJTJ54ht+qq8EjmpdxvlUuhwKtxVPE4TbXcn3owcdpm5NySJN1bfA==', 'brother.maynard@holyhand.biz', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'd33aa251-0ef6-4730-a391-cd67e0b66d08', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'89bb6497-0e60-4fc4-b6e3-419c34ce49b1', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'bbba389b-f0ab-4500-a932-c94c23e62d6c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'aa7795e9-e970-4707-bbc4-29c401e98fab', 'Documentation', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'075be77d-9b97-4cb1-9259-577fc356852a', 'Explosive Ordinance', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'6e4fc28f-8a50-48f6-bc62-621fa8fefb13', 'Counting to Three', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'363535af-3f68-40ad-8072-2cb97d3cbd69', 'twitter', 'maynard_the_holy', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'cd85e9e2-3153-441c-8065-af740eedfd80', 'instagram', 'maynard_the_holy', '89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);


-- Documents


-- #endregion

-- #region User: prince.herbert@castleanthrax.uk

-- Email: "prince.herbert@castleanthrax.uk"
-- Password: "SongLuvLark!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'5a401f5d-e129-40f8-9190-b3615d3cd8d6', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'prince.herbert@castleanthrax.uk', 'Prince Herbert',
	'he/him', '08-12', 'Longs to turn every memo into a power ballad.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'5a401f5d-e129-40f8-9190-b3615d3cd8d6', 1, 'volunteer', '3TlbsGFyTQoPDlWru4BTQQ==:Ec+dZ1LBwrdR5vX4x2ajwsZRMq5o9kbf1KLUy1nnPqAJ9QFVVm6SBwUcO62TFj4C4YEOvOT+S7pQO+DYFwQJXw==', 'prince.herbert@castleanthrax.uk', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'bff837ea-5f45-404c-b1e9-0e80fb5700cc', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'5a401f5d-e129-40f8-9190-b3615d3cd8d6', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'c4b92328-40d6-4d74-9647-c5ff63255283', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'7fbf74db-60e8-4949-a3cc-bd02239dc29b', 'Falsetto Singing', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'fc258c8a-684c-4c76-8ebf-767d80092c2f', 'Window Escape', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'a13df11e-b6c5-49cf-b151-337bf86a1786', 'Event Planning', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'8943b94d-7343-476f-94f5-507b1b180539', 'linkedin', 'p.herbert', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'17404f29-858c-4a00-9687-1af101b79794', 'twitter', 'p_herbert', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'fe245bfe-f6c7-4336-8ec7-8f6fad1b7bf1', 'mastodon', 'p_herbert@mastodon.social', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'273dd34d-bbc9-401e-9e4a-e9b756cc04c2', 'github', 'p-herbert', '5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);


-- Documents


-- #endregion

-- #region User: concorde@swiftcourier.io

-- Email: "concorde@swiftcourier.io"
-- Password: "SwiftSwallow"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'concorde@swiftcourier.io', 'Concorde Squire',
	'he/him', '02-24', 'Gets messages across enemy lines faster than an unladen swallow.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', 1, 'volunteer', 'TQ9q6Q/iSsVtswLaFqF+Lg==:HLAhA8fcQdu2Rosw656fuHyAHT2HvOkOUwAc7AvhwFmOO+WkvhN9svwy6uoJA+MbKztyrrngCE0J4gpl4RvUcw==', 'concorde@swiftcourier.io', '2025-06-14T22:04:47Z', 'social-handle-provided', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'5875b7be-33cf-49c9-941c-8642bf4a975c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'fca53493-6643-4883-b781-4b80dfc91079', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'2d64a1aa-0b9b-417b-a34b-283193fcb1fb', 'Message Delivery', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'efe54bc8-b515-467a-b2c7-34afd4e0b1ef', 'Glide Path Analysis', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'923bdf73-9575-4029-b7fa-b5342b35a0f9', 'Faux-French', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'7aa731c4-dcbe-49fa-970b-a813e1e36da6', 'slack', 'concorde_squire', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'452b1bae-e4f8-4fac-8bbc-9e686993b62e', 'twitter', 'concorde_the_squire', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'd8c8ff6c-4e5e-4a98-84e1-7e167a568469', 'github', 'concorde-the-squire', 'e2d65023-1c52-4fa6-ab0a-7277a6707fb7'
);


-- Documents
-- Code of conduct
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'6b678a5e-f7aa-4c15-9b71-b4b56f8fcf48', 1,
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', '2025-06-14T22:04:47Z',
	'code-of-conduct', '2025-07-15T04:36:15Z'
);

-- Image release form
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'64d36a45-51e3-434d-b23e-de1ddd933739', 1,
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', '2025-06-14T22:04:47Z',
	'image-release-form', '2025-07-15T04:36:15Z'
);

-- Volunteer agreement
INSERT INTO "documents" (
	"id", "schemaVersion",
	"profileId", "signedAt",
	"type", "documentVersion"
)
VALUES (
	'2bdf7064-c145-460d-a815-f5ed2b5fa40c', 1,
	'e2d65023-1c52-4fa6-ab0a-7277a6707fb7', '2025-06-14T22:04:47Z',
	'volunteer-agreement', '2025-07-15T04:36:15Z'
);

-- #endregion

-- #region User: lady.zoot@castleanthrax.uk

-- Email: "lady.zoot@castleanthrax.uk"
-- Password: "ZootZing2024"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'22fa5d4f-1e53-42f3-a00d-7010e7973b12', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'lady.zoot@castleanthrax.uk', 'Lady Zoot',
	'she/her', '04-28', 'Caters corporate retreats with perilous peril.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'22fa5d4f-1e53-42f3-a00d-7010e7973b12', 1, 'volunteer', 'rxi8VXC0Ges9vF2FdUwbKw==:zGIMG1G60tl19sJdx+m9jwx/BVnkuBo1Ij237Ke3kRsNXSg5wqGyp9QbSjvdBCVkCuX2KxUaFP4Pq+VdO/qG4A==', 'lady.zoot@castleanthrax.uk', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'677cb623-3dde-48d5-bec1-d2a990d08e5f', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'22fa5d4f-1e53-42f3-a00d-7010e7973b12', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'3981a6b8-913a-4414-b5b0-fb846a6bfab1', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'1a1bbf57-5beb-46b5-8c16-4bbc318fa2a7', 'Hospitality', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'892f21f9-6d2b-429d-8453-e7d3f3717cd2', 'Torch Bearing', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'70d711d2-2e21-416f-93db-dd3465ca4048', 'Mischief', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'75510145-96e3-4603-903b-9b82e17857e5', 'twitter', 'lady_zoot', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'0f97c5af-bf26-4a8f-b5a0-fcb90d151fdc', 'instagram', 'lady_zoot', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'de21efbb-e670-48d6-8c87-932ae2111ec5', 'bluesky', 'lady.zoot', '22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);


-- Documents


-- #endregion

-- #region User: knight.ni@forestsayni.com

-- Email: "knight.ni@forestsayni.com"
-- Password: "NiNiNiNi42?!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'6eb87900-a6d3-4fa3-82e8-70aaa8754053', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'knight.ni@forestsayni.com', 'Knight Ni',
	'they/them', '09-17', 'Negotiation style: say ‘Ni’ until opponents cave.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'6eb87900-a6d3-4fa3-82e8-70aaa8754053', 1, 'volunteer', 'rdPgtBEQMJtw6WJ7FrD8xw==:TnE0yHLiPy06aRQJRIjCoGI04sBVvx43V6MOGi5RbhcE7KA8kEFN9Me/S2Pc+wmi0+JOFCGzczEZICFZCWoOPA==', 'knight.ni@forestsayni.com', '2025-06-14T22:04:47Z', 'deleted', '2025-06-14T22:04:47Z'
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'ef07e9e4-4aab-483e-a43d-1e884617fd3d', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'6eb87900-a6d3-4fa3-82e8-70aaa8754053', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'603d84a4-9d72-4a9f-a1b3-67cdd379f63e', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '6eb87900-a6d3-4fa3-82e8-70aaa8754053'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'1c3f2dfb-5b4e-439a-b1b0-88733e1cf585', 'Intimidation', '6eb87900-a6d3-4fa3-82e8-70aaa8754053'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'cf7e34f8-55dc-439c-a3b2-d308f1c01a6e', 'Shrubbery Procurement', '6eb87900-a6d3-4fa3-82e8-70aaa8754053'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'e0ae85e2-9600-4f64-bff5-99100840566a', 'Word-based Blackmail', '6eb87900-a6d3-4fa3-82e8-70aaa8754053'
);


-- Links


-- Documents


-- #endregion

-- #region User: historian@grail-docu.net

-- Email: "historian@grail-docu.net"
-- Password: "GrailQuiz1!X"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'777b0252-5d54-4fcf-92da-c94715edd5f3', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'historian@grail-docu.net', 'Grail Historian',
	'they/them', '01-11', 'Keeps getting cut off by sudden cavalry charges.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'777b0252-5d54-4fcf-92da-c94715edd5f3', 1, 'volunteer', 'x9DlAnE9mPHD5cIvYbMS3A==:/ZQNwiWizlwj+EaIFKvUvFfVB2Mo+ANhIR9Aev8fIA+VJIDHLAIlR2vyerJOXMk7z+035t+qQK0Nk5l3VjRpKw==', 'historian@grail-docu.net', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'778c9887-3668-4ba2-8d3b-6c84d55913c9', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'777b0252-5d54-4fcf-92da-c94715edd5f3', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'f3490921-9311-4764-b14c-158b8ede70e1', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'3c4f9865-401b-450f-ae94-4255dc81bbf4', 'Narration', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'8d730f82-5092-402a-a337-533aa8626be4', 'Archival Footage', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'a9e4147d-f256-425e-9b93-a906bfa3e2e9', 'Dramatic Pointing', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'c4861359-9f8d-403f-8d7b-917d6659bd8f', 'twitter', 'grail_hist', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'947cc73f-745f-4bed-bee6-ef1a2dd78727', 'instagram', 'grail_hist', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'1fb33b9e-353f-4f05-9a0e-9d243ae74343', 'linkedin', 'grail.hist', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'ba0db504-ba08-435d-b7bd-2c6898b1b79d', 'github', 'grail-hist', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'4670af8f-4094-4f4a-9601-7434c0029429', 'mastodon', 'grail_hist@mastodon.social', '777b0252-5d54-4fcf-92da-c94715edd5f3'
);


-- Documents


-- #endregion

-- #region User: bridge.keeper@threequestions.org

-- Email: "bridge.keeper@threequestions.org"
-- Password: "BridgeAns33?"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'8340b8c6-5a96-4072-8af0-87c4fde2fea0', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bridge.keeper@threequestions.org', 'Bridge Keeper',
	'he/him', '03-30', 'You must answer him these questions three—before entering any meeting.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'8340b8c6-5a96-4072-8af0-87c4fde2fea0', 1, 'volunteer', 'gKdbE/8xsaET19vf8d8Y3g==:qa1BYWGVJivd3dpZrbNR8Rv5SRNgtsiuCi5zJ1ioHOw4bY93c0yp897L4GNlcvTLT5qJlfYiMKTUcqhv1HWEBw==', 'bridge.keeper@threequestions.org', NULL, 'created', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'2a90eed6-775f-4cda-b371-ebfb67552778', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'8340b8c6-5a96-4072-8af0-87c4fde2fea0', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'c8edd096-0ffd-46c2-9154-ccb1c19eae68', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '8340b8c6-5a96-4072-8af0-87c4fde2fea0'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ddf66918-dbae-4090-bb50-01f57756dc64', 'Gatekeeping', '8340b8c6-5a96-4072-8af0-87c4fde2fea0'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'471fc08e-8e78-45d6-8a9b-ce9970cc2b0c', 'Trivia', '8340b8c6-5a96-4072-8af0-87c4fde2fea0'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'dd2e5e2a-7269-492e-8943-d4fc86f23b9a', 'Aerial Dynamics', '8340b8c6-5a96-4072-8af0-87c4fde2fea0'
);


-- Links


-- Documents


-- #endregion

-- #region User: mrs.bun@whizzo.choc

-- Email: "mrs.bun@whizzo.choc"
-- Password: "DeadParrot!!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'56da65b8-1b11-4af8-8b88-912df3a0d4bd', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'mrs.bun@whizzo.choc', 'Mrs Bun',
	'she/her', '12-20', 'Only sells chocolates with at least one outrageous surprise inside.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'56da65b8-1b11-4af8-8b88-912df3a0d4bd', 1, 'volunteer', 'GA1EjdK0RJ306qzdPRYQxw==:XRorwr/p0EGWhfbtRvalgpUcTFB/HIv+yLcJFMNUlpNn068vqkB4IOh569wbb+ZlvrI0p0G7Hk6OtaBCYvZDSQ==', 'mrs.bun@whizzo.choc', NULL, 'created', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'e9da3c86-c97c-4545-abb0-9d6e42b134ec', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'56da65b8-1b11-4af8-8b88-912df3a0d4bd', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'afa49bd7-d2e1-4a9a-977e-b0c26c052130', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'c12ace0d-e5da-4947-8e8e-5bcbc8190942', 'Confectionery', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'cac2b6c2-6d41-4d74-90a5-3f712c0b0225', 'Complaint Handling', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'992ec3d2-3f68-438f-86e0-47be51a81009', 'Alibi Crafting', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'4281485f-0299-46dc-8ecb-5a40f7367360', 'twitter', 'mrs_bun', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'60072994-052b-4fcf-a384-2d71650f8d0b', 'instagram', 'mrs_bun', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'e789f19e-37f7-45ca-99e1-071bac81948e', 'github', 'mrs-bun', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'033403f8-9367-4d33-b165-19baada61308', 'devto', 'mrs.bun', '56da65b8-1b11-4af8-8b88-912df3a0d4bd'
);


-- Documents


-- #endregion

-- #region User: camel.spotter@zoology.co

-- Email: "camel.spotter@zoology.co"
-- Password: "CamelSpotr9!"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'camel.spotter@zoology.co', 'Camel Spotter',
	'they/them', '07-29', 'Hasn’t actually seen a camel—claims they all flew away.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5', 1, 'volunteer', 'RYngyQsVASpQna+n5I4x4w==:ByVfpjw3V9deHBg2OVn0mtgpymwATkkySz7j7Npynh0OlfFQR26vXbkJcqOvNTMJIgH4l7ouaTRGNJAJLGsDQg==', 'camel.spotter@zoology.co', NULL, 'created', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'5bc746c9-9322-492b-9a7b-2a578c2e1303', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'1d81cf8f-4485-4e7f-93bd-0c890532ec3f', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', 'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'db52c15e-2f3a-4186-b6a0-f4919c9791b3', 'Pattern Recognition', 'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'64389340-c773-4fc9-bbd1-7720620ff5d1', 'Sanitation', 'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'c5fa3970-02da-4dc8-a894-052f860f1fc9', 'Denial', 'fac6e738-ab0a-4a66-ab92-a0e76f2c4ba5'
);


-- Links


-- Documents


-- #endregion

-- #region User: knight.truth@roundtable.ai

-- Email: "knight.truth@roundtable.ai"
-- Password: "KnightOTruth"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'2217e267-144e-4651-bfce-87ce653f9f03', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'knight.truth@roundtable.ai', 'Knight OTruth',
	'he/him', '05-15', 'Slices through red tape—and sometimes interns—seeking honesty.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'2217e267-144e-4651-bfce-87ce653f9f03', 1, 'volunteer', 'WNxTWmcM6N3O5bDskzAi+g==:L1KzEPXkXIz/ezWBC/oBbBv93YuKpAIqXvEb6FXsb5zbzN9Yt1QOXQb+IatlOzqzHcVa8DdgWgDyuB9iGH+LJg==', 'knight.truth@roundtable.ai', '2025-06-14T22:04:47Z', 'activated', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'2213ab26-e693-4548-bdc1-1984cc454970', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'2217e267-144e-4651-bfce-87ce653f9f03', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'35e73204-8fee-485a-9f31-35895afeb5af', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '2217e267-144e-4651-bfce-87ce653f9f03'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'39e5ac75-4e18-4edf-9086-72a9210714d1', 'Fact Checking', '2217e267-144e-4651-bfce-87ce653f9f03'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'3543458d-c4fa-4545-a4e2-1204a4c6d66f', 'Sword Logic', '2217e267-144e-4651-bfce-87ce653f9f03'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'ce504532-51bf-40b4-93de-91f6d63fa3c7', 'HR Investigations', '2217e267-144e-4651-bfce-87ce653f9f03'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'e110bd62-5b4d-4b61-8e68-854cf63af032', 'twitter', 'knight_otruth', '2217e267-144e-4651-bfce-87ce653f9f03'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'3e0a791f-915a-4bab-9404-d220d91bd1e7', 'mastodon', 'knight_otruth@mastodon.social', '2217e267-144e-4651-bfce-87ce653f9f03'
);


-- Documents


-- #endregion

-- #region User: fish.slapper@dance-troupe.com

-- Email: "fish.slapper@dance-troupe.com"
-- Password: "FshSlapper22"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description"
)
VALUES (
	'307a325e-1513-4718-a9b7-106d16c347d2', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'fish.slapper@dance-troupe.com', 'Fsh Slapper',
	'they/them', '11-27', 'Delivers constructive feedback via lightly-smoked haddock.'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt", "profileStatus", "deletedAt"
)
VALUES (
	'307a325e-1513-4718-a9b7-106d16c347d2', 1, 'volunteer', 'xuVDrUwzM10jkPg2qERnJQ==:5epH3EvAhnpz2ZC1e+4G56n+7XGlJZ+pUuRU1fvOnoxlpx9QIejZmSZXeb2xKaHEnnlCfOyj8uijpDbSx4dabA==', 'fish.slapper@dance-troupe.com', NULL, 'created', NULL
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'fdd8a523-cb14-4f75-b930-cabdfd149557', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'307a325e-1513-4718-a9b7-106d16c347d2', 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'f2765ee3-a817-45fa-8cd9-80a37b5784de', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', '307a325e-1513-4718-a9b7-106d16c347d2'
);

-- Skills
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'1d2adfe1-6c25-4e27-bca2-dea328d1faff', 'Choreography', '307a325e-1513-4718-a9b7-106d16c347d2'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'eab23b13-162d-4fb5-ac61-e29cae70db98', 'Piscine Weaponry', '307a325e-1513-4718-a9b7-106d16c347d2'
);

INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'7c6afe1c-6845-4fc9-961f-eb5f7917288d', 'Comedic Timing', '307a325e-1513-4718-a9b7-106d16c347d2'
);


-- Links
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'1b78f46e-eeb5-46e9-8b12-b885e4c00834', 'twitter', 'fsh', '307a325e-1513-4718-a9b7-106d16c347d2'
);

INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'87f57c6e-f92e-4f71-97c8-64e1cdba09d3', 'instagram', 'fsh', '307a325e-1513-4718-a9b7-106d16c347d2'
);


-- Documents


-- #endregion

-- #region Team: Ministry of Silly Walks
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'Ministry of Silly Walks',
	'Tasked with ensuring every corridor is traversed in the most inefficient and visually preposterous manner possible.'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'2d8e0f33-97b7-4d1f-a37b-c8977401a63f', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 'profile',
	'created',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'team'
);

-- Team members
-- Team member: Chief Silliness Officer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'f7068575-7836-45da-af7a-0cf32928c1c5', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'Chief Silliness Officer', 'Sets quarterly KPIs for knee-lift height and ankle-twist frequency.',
	'bfc463bf-a066-4896-8bda-1af982893a49'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'cc6bff33-66af-43d7-96ef-339c2bd6e8b0', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bfc463bf-a066-4896-8bda-1af982893a49', 'profile',
	'joined',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'team'
);

-- Team member: Gait Auditor
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'376d3bf1-2f82-41b5-ab8c-f8476c722b56', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'Gait Auditor', 'Surprises teams with clipboard-in-hand walk-tests and issues citations for excessive normality.',
	'777b0252-5d54-4fcf-92da-c94715edd5f3'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'99e78a65-66a6-4f30-a45e-ad0a2b9fc094', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'777b0252-5d54-4fcf-92da-c94715edd5f3', 'profile',
	'joined',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'team'
);

-- Team member: Stride Evangelist
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'f1192512-6fb7-41b2-861e-49a38e3f7a09', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'Stride Evangelist', 'Runs noon-hour masterclasses on emerging absurd locomotion trends.',
	'012c9ecf-4897-4879-bd7c-9c877d409626'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'ac21767b-2157-4175-b87e-b8dd11ae8405', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'012c9ecf-4897-4879-bd7c-9c877d409626', 'profile',
	'joined',
	'72bdd945-1479-4f87-8ce7-ef0a6c5101c8', 'team'
);


-- #endregion

-- #region Team: Department of Argumentation
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'Department of Argumentation',
	'Provides on-demand, well-structured disagreements for anyone needing a vigorous contradiction.'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'03f68f52-bc0e-4c6c-8d24-51c5f3183e81', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bf950534-e8f9-4f5a-a246-610aa63faf21', 'profile',
	'created',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'team'
);

-- Team members
-- Team member: Head Contradictor
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'ed2a893e-54ee-43af-b03d-eed39374fc9c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'Head Contradictor', 'Professionally refutes every statement, including their own, for maximum dialectical agility.',
	'2f512451-861c-4d69-aa25-b27ee54d16cb'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'270f86f2-f234-4f05-8482-2dc8569f56c9', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'2f512451-861c-4d69-aa25-b27ee54d16cb', 'profile',
	'joined',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'team'
);

-- Team member: Professional Naysayer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'6f73e09d-8481-4a05-b4a3-524cd86080cd', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'Professional Naysayer', 'Offers premium ‘No it isn’t!’ packages with same-day delivery.',
	'5a401f5d-e129-40f8-9190-b3615d3cd8d6'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'abbab4d5-2b11-4656-a1cf-d989893ab36f', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'5a401f5d-e129-40f8-9190-b3615d3cd8d6', 'profile',
	'joined',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'team'
);

-- Team member: Devil’s Advocate
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'841f251a-6197-4282-a527-6db44c6d2215', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'Devil’s Advocate', 'Raises objections nobody asked for, purely out of principle (or lack thereof).',
	'3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'eba732db-a47f-48c4-906a-a63f497f66ed', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', 'profile',
	'joined',
	'70ca1ff2-6ab6-4533-ae79-203f5b08742c', 'team'
);


-- #endregion

-- #region Team: Bureau of Completely Useless Products
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'Bureau of Completely Useless Products',
	'Designs, prototypes, and markets items guaranteed to solve absolutely zero real-world problems.'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'4d6f0766-8687-4295-ad80-8ada442bdda8', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bf950534-e8f9-4f5a-a246-610aa63faf21', 'profile',
	'created',
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 'team'
);

-- Team members
-- Team member: Chief Uselessness Engineer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'accc8a42-9e7b-40f2-ad0a-889fdf5fe4c8', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 'Chief Uselessness Engineer', 'Ensures all products exceed strict non-functionality standards before launch.',
	'012c9ecf-4897-4879-bd7c-9c877d409626'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'661c67a0-11b0-4aef-bc1d-a4cb04c53bce', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'012c9ecf-4897-4879-bd7c-9c877d409626', 'profile',
	'joined',
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 'team'
);

-- Team member: Director of Pointless Innovation
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'4130d9ce-5b63-43c1-a700-c456b1a20453', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 'Director of Pointless Innovation', 'Leads ideation sprints for concepts like inflatable dartboards and waterproof tea-bags.',
	'89bb6497-0e60-4fc4-b6e3-419c34ce49b1'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'76677441-efa6-48f4-97cb-6a1a36e563d7', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'89bb6497-0e60-4fc4-b6e3-419c34ce49b1', 'profile',
	'joined',
	'82df0f4a-2a32-4c14-86d9-4b17fc7566e4', 'team'
);


-- #endregion

-- #region Team: Dead Parrot Complaint Office
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	'd602086f-35f5-4013-85e2-e7a268e4644e', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'Dead Parrot Complaint Office',
	'Handles customer grievances with unwavering insistence that every defective item is merely ‘resting.’'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'f1c61067-0874-4635-b81f-8508d32f7452', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 'profile',
	'created',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'team'
);

-- Team members
-- Team member: Senior Parrot Reanimator
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'aad0dd7a-6cfc-4378-882f-8930d26a4180', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'Senior Parrot Reanimator', 'Delivers theatrical denial demonstrations, occasionally involving puppetry and coconut shells.',
	'22fa5d4f-1e53-42f3-a00d-7010e7973b12'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'c35c90b7-64a8-40e8-93c3-88f3a49f5508', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'22fa5d4f-1e53-42f3-a00d-7010e7973b12', 'profile',
	'joined',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'team'
);

-- Team member: Customer Inconvenience Coordinator
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'3fcaaffe-27ad-4ed3-b37b-489715d666a3', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'Customer Inconvenience Coordinator', 'Crafts labyrinthine phone trees to ensure complaints remain delightfully unresolved.',
	'777b0252-5d54-4fcf-92da-c94715edd5f3'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'fc6c5c57-9b10-4944-9978-76bb9d4fbedd', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'777b0252-5d54-4fcf-92da-c94715edd5f3', 'profile',
	'joined',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'team'
);

-- Team member: Denial Specialist
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'bbc12465-fafc-42da-a750-6e201ac01ae4', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'Denial Specialist', 'Polishes the official ‘not dead yet’ narrative across all communication channels.',
	'76fded46-124d-4b2b-abcc-f1db71bbf622'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'678e04fe-168c-47ff-95c0-45fa1bb3390e', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'76fded46-124d-4b2b-abcc-f1db71bbf622', 'profile',
	'joined',
	'd602086f-35f5-4013-85e2-e7a268e4644e', 'team'
);


-- #endregion

-- #region Team: Department of Shrubbery Procurement
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'Department of Shrubbery Procurement',
	'Maintains strategic alliances with the Knights Who Say ‘Ni!’ to secure aesthetically pleasing shrubberies.'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'214342a4-5565-446b-a2ca-97d372dd5f7c', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3c5123c0-8548-4a02-a83c-32e9ce67eae8', 'profile',
	'created',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'team'
);

-- Team members
-- Team member: Grand Shrubbery Overseer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'4b4e569a-b065-4608-a9f8-6251eb74e1af', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'Grand Shrubbery Overseer', 'Defines corporate shrub-height regulations and negotiates bulk topiary deals.',
	'bfc463bf-a066-4896-8bda-1af982893a49'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'78ba327e-44bc-4bf7-8a5c-243ed43af12d', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'bfc463bf-a066-4896-8bda-1af982893a49', 'profile',
	'joined',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'team'
);

-- Team member: Royal Bush Trimmer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'f6c4b5e1-955f-4c30-a649-2056dd20faab', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'Royal Bush Trimmer', 'Keeps every hedge impeccably coiffed to medieval-court standards.',
	'3caf90c5-7c7e-4931-82b4-888666cd8bac'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'0cfa0d4c-32fc-45a1-8151-d909b4d99652', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'3caf90c5-7c7e-4931-82b4-888666cd8bac', 'profile',
	'joined',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'team'
);

-- Team member: Knight Liaison
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'adcd2094-e9e7-4312-a1ba-814bb697fcf0', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'Knight Liaison', 'Translates executive memos into acceptable offerings for shrub-obsessed knights.',
	'2217e267-144e-4651-bfce-87ce653f9f03'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'c83d8ce7-308b-4e16-ad1e-271e6112c417', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'2217e267-144e-4651-bfce-87ce653f9f03', 'profile',
	'joined',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'team'
);

-- Team member: Ni Sayer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'ed4723b9-7aa2-4146-bd70-77db729d9e86', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'Ni Sayer', 'Responsible for repeatedly saying "Ni!"',
	'2f512451-861c-4d69-aa25-b27ee54d16cb'
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'2a6411a2-773a-4733-847a-e107f30783eb', 1, '2025-06-14T22:04:47Z', '2025-06-14T22:04:47Z',
	'2f512451-861c-4d69-aa25-b27ee54d16cb', 'profile',
	'joined',
	'00a34ce0-c620-4954-9bcc-ac839e718bad', 'team'
);


-- #endregion


