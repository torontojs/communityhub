INSERT INTO profile (id, email, name, description, happenedAt, insertedAt)
VALUES
('3227114d-43c4-42ed-8aea-f3860fe42222', 'profile1@example.com', 'John Doe', 'A sample profile description', '2025-01-20T10:00:00Z', '2025-01-20T10:00:00Z');

-- Unhashed password: "password": "securePassword123#",
INSERT INTO access (id, accessLevel, password, email)
VALUES
('3227114d-43c4-42ed-8aea-f3860fe42222', 'volunteer', '1shhkNv9H2WqpMfYb39FdQ==:VeEvXdAosVYB3eX/yw4UHnpHBkoOWQvOIEELto1RFxkreGtJE4+U3LD+0TVgqXnMQDSbc+hH1gIuQetfysi9cw==', 'profile1@example.com'),
('aa7e8915-8034-43d9-b910-a2e3ebdb947f', 'organizer', 'MGAmHV1tmkrtgrVRMwGC9Q==:1glo6UGrlXuhYD73SL4yGnGFSdoRzR3bl8X6H+a3kHgGNFEgkrk+/b7ob6V/XfIQ2+AalGvbpdY26IIMeXcnZA==', 'profile2@example.com'),
('e1f2a3b4-c5d6-2345-6789-123456789010', 'volunteer', 'MGAmHV1tmkrtgrVRMwGC9Q==:1glo6UGrlXuhYD73SL4yGnGFSdoRzR3bl8X6H+a3kHgGNFEgkrk+/b7ob6V/XfIQ2+AalGvbpdY26IIMeXcnZA==', 'user41@example.com'),
('f2a3b4c5-d6e7-3456-7890-234567890120', 'volunteer', 'MGAmHV1tmkrtgrVRMwGC9Q==:1glo6UGrlXuhYD73SL4yGnGFSdoRzR3bl8X6H+a3kHgGNFEgkrk+/b7ob6V/XfIQ2+AalGvbpdY26IIMeXcnZA==', 'user42@example.com'),
('a3b4c5d6-e7f8-4567-8901-345678901230', 'volunteer', 'MGAmHV1tmkrtgrVRMwGC9Q==:1glo6UGrlXuhYD73SL4yGnGFSdoRzR3bl8X6H+a3kHgGNFEgkrk+/b7ob6V/XfIQ2+AalGvbpdY26IIMeXcnZA==', 'user43@example.com');

INSERT INTO profile_links (id, profileId, platform, url)
VALUES
( '1525114d-43c4-42ed-8aea-f3860fe42222', '3227114d-43c4-42ed-8aea-f3860fe42222', 'Slack', 'www.slack.com/myhandle'),
( '2424114d-43c4-42ed-8aea-f3860fe42222', 'aa7e8915-8034-43d9-b910-a2e3ebdb947f', 'Slack', 'www.slack.com/myhandle'),
( '3323114d-43c4-42ed-8aea-f3860fe42222', 'e1f2a3b4-c5d6-2345-6789-123456789010', 'Slack', 'www.slack.com/myhandle'),
( '4222114d-43c4-42ed-8aea-f3860fe42222', 'f2a3b4c5-d6e7-3456-7890-234567890120', 'Slack', 'www.slack.com/myhandle'),
( '5121114d-43c4-42ed-8aea-f3860fe42222', 'a3b4c5d6-e7f8-4567-8901-345678901230', 'Slack', 'www.slack.com/myhandle');

UPDATE profile
SET activatedAt = CASE id
	WHEN '3227114d-43c4-42ed-8aea-f3860fe42222' THEN '2025-02-02T04:10:00Z'
END;
