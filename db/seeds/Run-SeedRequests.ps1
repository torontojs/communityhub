#!/usr/bin/env pwsh

$Now = "'$(Get-Date -AsUTC -Format 'yyyy-MM-ddTHH:mm:ssZ')'"

$SeedString = ''

$Organizers = @()
$Volunteers = @()

$PasswordHashes = Get-Content (Join-Path -Path $PSScriptRoot -ChildPath './data/hashed-passwords.json') |
ConvertFrom-Json

# Add users seed
Get-Content (Join-Path -Path $PSScriptRoot -ChildPath './data/users-seed.json') |
ConvertFrom-Json |
ForEach-Object {
	$UserId = "'$((New-Guid).Guid)'"
	$UserEmail = $_.email
	$ActivatedAt = 'NULL'
	$PasswordHash = "'$(($PasswordHashes | Where-Object { $_.email -eq $UserEmail } | Select-Object -First 1).password)'"

	if ($_.isActivated) {
		$ActivatedAt = $Now

		switch ($_.role) {
			'volunteer' {
				$Volunteers = $Volunteers + @($UserId)
			}
			'organizer' {
				$Organizers = $Organizers + @($UserId)
			}
		}
	}

	$SkillsString = ($_.skills |
		ForEach-Object {
			@"
INSERT INTO "profile_skills" (
	"id", "skill", "profileId"
)
VALUES (
	'$((New-Guid).Guid)', '$_', $UserId
);

"@
		}) -join "`n"

	$LinksString = ($_.links |
		ForEach-Object {
			@"
INSERT INTO "profile_links" (
	"id", "platform", "url", "profileId"
)
VALUES (
	'$((New-Guid).Guid)', '$($_.platform)', '$($_.handle)', $UserId
);

"@
		}) -join "`n"

	$SeedString = $SeedString + @"
-- #region User: $($_.email)

-- Email: "$($_.email)"
-- Password: "$($_.password)"

-- Create profile
INSERT INTO "profile" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"email", "name",
	"pronouns", "birthday", "description",
)
VALUES (
	$UserId, 1, $Now, $Now,
	'$($_.email)', '$($_.name)',
	'$($_.pronouns)', '$($_.birthday)', '$($_.description)'
);

-- Add to access table
INSERT INTO "access" (
	"id", "schemaVersion", "accessLevel", "password", "email", "activatedAt"
)
VALUES (
	$UserId, 1, '$($_.role)', $PasswordHash, '$($_.email)', $ActivatedAt
);

-- Add event log to Toronto JS
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'$((New-Guid).Guid)', 1, $Now, $Now,
	$UserId, 'profile',
	'joined',
	'b3410598-ecbc-41be-9f68-925da74bc613', 'special'
);

-- Join Toronto JS as a volunteer
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name", "description", "teamId", "profileId"
)
VALUES (
	'$((New-Guid).Guid)', 1, $Now, $Now,
	'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', $UserId
);

-- Skills
$SkillsString

-- Links
$LinksString

-- #endregion


"@
}

# Add teams seed
Get-Content (Join-Path -Path $PSScriptRoot -ChildPath './data/teams-seed.json') |
ConvertFrom-Json |
ForEach-Object {
	$TeamId = "'$((New-Guid).Guid)'"
	$OrganizerId = Get-Random -InputObject $Organizers

	$TeamMembersString = ($_.roles |
		ForEach-Object {
			$VolunteerId = Get-Random -InputObject $Volunteers
			@"
-- Team member: $($_.name)
INSERT INTO "role" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"teamId", "name", "description",
	"profileId"
)
VALUES (
	'$((New-Guid).Guid)', 1, $Now, $Now,
	$TeamId, '$($_.name)', '$($_.description)',
	$VolunteerId
);

-- Add team member to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'$((New-Guid).Guid)', 1, $Now, $Now,
	$VolunteerId, 'profile',
	'joined',
	$TeamId, 'team'
);

"@
		}) -join "`n"

	$SeedString = $SeedString + @"
-- #region Team: $($_.name)
-- Create team
INSERT INTO "team" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"name",
	"description"
)
VALUES (
	$TeamId, 1, $Now, $Now,
	'$($_.name)',
	'$($_.description)'
);

-- Add team to event log
INSERT INTO "event_log" (
	"id", "schemaVersion", "happenedAt", "insertedAt",
	"subject", "subjectSource",
	"verb",
	"object", "objectSource"
)
VALUES (
	'$((New-Guid).Guid)', 1, $Now, $Now,
	$OrganizerId, 'profile',
	'created',
	$TeamId, 'team'
);

-- Team members
$TeamMembersString

-- #endregion


"@
}

$SeedString | Out-File (Join-Path -Path $PSScriptRoot -ChildPath './seed-data.sql') -Force -Encoding 'utf8'
