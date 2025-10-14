#! /usr/bin/env pwsh

$Now = "'2025-06-14T22:04:47Z'"

$SeedString = ''

# Add users seed
Get-Content (Join-Path -Path $PSScriptRoot -ChildPath './data/users-seed.json') |
ConvertFrom-Json |
ForEach-Object {
	$UserId = "'$($_.id)'"
	$ActivatedAt = $Now
	$DeletedAt = 'NULL'
	$DocumentsString = ''

	if ($_.profileStatus -eq 'created') {
		$ActivatedAt = 'NULL'
	}

	if ($_.profileStatus -eq 'deleted') {
		$DeletedAt = $Now
	}

	if ($_.documents) {
		$DocumentsString = "INSERT INTO `"documents`" ( `"id`", `"schemaVersion`", `"profileId`", `"signedAt`", `"type`", `"documentVersion`" ) VALUES ( '$($_.documents.codeOfConduct)', 1, $UserId, $Now, 'code-of-conduct', '2025-07-15T04:36:15Z' );`nINSERT INTO `"documents`" ( `"id`", `"schemaVersion`", `"profileId`", `"signedAt`", `"type`", `"documentVersion`" ) VALUES ( '$($_.documents.imageReleaseForm)', 1, $UserId, $Now, 'image-release-form', '2025-07-15T04:36:15Z' );`nINSERT INTO `"documents`" ( `"id`", `"schemaVersion`", `"profileId`", `"signedAt`", `"type`", `"documentVersion`" ) VALUES ( '$($_.documents.volunteerAgreement)', 1, $UserId, $Now, 'volunteer-agreement', '2025-07-15T04:36:15Z' );"
	}

	$SkillsString = ($_.skills |
		ForEach-Object {
			"INSERT INTO `"profile_skills`" ( `"id`", `"skill`", `"profileId`" ) VALUES ( '$($_.id)', '$($_.skill)', $UserId );"
		}) -join "`n"

	$LinksString = ($_.links |
		ForEach-Object {
			"INSERT INTO `"profile_links`" ( `"id`", `"platform`", `"url`", `"profileId`" ) VALUES ( '$($_.id)', '$($_.platform)', '$($_.handle)', $UserId );"
		}) -join "`n"

	$UserSeed = "INSERT INTO `"profile`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"email`", `"name`", `"pronouns`", `"birthday`", `"description`" ) VALUES ( $UserId, 1, $Now, $Now, '$($_.email)', '$($_.name)', '$($_.pronouns)', '$($_.birthday)', '$($_.description)' );`nINSERT INTO `"access`" ( `"id`", `"schemaVersion`", `"accessLevel`", `"password`", `"email`", `"activatedAt`", `"profileStatus`", `"deletedAt`" ) VALUES ( $UserId, 1, '$($_.role)', '$($_.passwordHash)', '$($_.email)', $ActivatedAt, '$($_.profileStatus)', $DeletedAt );`nINSERT INTO `"event_log`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"subject`", `"subjectSource`", `"verb`", `"object`", `"objectSource`" ) VALUES ( '$($_.eventLog.joined)', 1, $Now, $Now, $UserId, 'profile', 'joined', 'b3410598-ecbc-41be-9f68-925da74bc613', 'special' );`nINSERT INTO `"role`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"name`", `"description`", `"teamId`", `"profileId`" ) VALUES ( '$($_.eventLog.volunteered)', 1, $Now, $Now, 'volunteer', 'Volunteer at Toronto JS', 'b3410598-ecbc-41be-9f68-925da74bc613', $UserId );"

	$AllUserStatements = @(
		$UserSeed,
		$DocumentsString,
		$SkillsString,
		$LinksString
	) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

	$SeedString = $SeedString + ($AllUserStatements -join "`n") + "`n"
}

# Add teams seed
Get-Content (Join-Path -Path $PSScriptRoot -ChildPath './data/teams-seed.json') |
ConvertFrom-Json |
ForEach-Object {
	$TeamId = "'$($_.id)'"
	$OrganizerId = "'$($_.organizerId)'"

	$TeamMembersString = ($_.roles |
		ForEach-Object {
			"INSERT INTO `"role`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"teamId`", `"name`", `"description`", `"profileId`" ) VALUES ( '$($_.id)', 1, $Now, $Now, $TeamId, '$($_.name)', '$($_.description)', '$($_.memberId)' );`nINSERT INTO `"event_log`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"subject`", `"subjectSource`", `"verb`", `"object`", `"objectSource`" ) VALUES ( '$($_.eventLog.joined)', 1, $Now, $Now, '$($_.memberId)', 'profile', 'joined', $TeamId, 'team' );"
		}) -join "`n"

	$TeamSeed = "INSERT INTO `"team`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"name`", `"description`" ) VALUES ( '$($_.id)', 1, $Now, $Now, '$($_.name)', '$($_.description)' );`nINSERT INTO `"event_log`" ( `"id`", `"schemaVersion`", `"happenedAt`", `"insertedAt`", `"subject`", `"subjectSource`", `"verb`", `"object`", `"objectSource`" ) VALUES ( '$($_.eventLog.created)', 1, $Now, $Now, $OrganizerId, 'profile', 'created', '$($_.id)', 'team' );"

	$AllTeamStatements = @(
		$TeamSeed,
		$TeamMembersString
	) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

	$SeedString = $SeedString + ($AllTeamStatements -join "`n") + "`n"
}

$SeedString | Out-File (Join-Path -Path $PSScriptRoot -ChildPath './seed-data.sql') -Force -Encoding 'utf8'
