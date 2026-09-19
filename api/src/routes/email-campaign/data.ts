import { DBTables, generateBaseDBfields } from '../../utils/db.ts';
import type {
	AudienceProfile,
	CreateEmailCampaign,
	EmailCampaignAudience,
	EmailCampaignStatus,
	EmailCampaignSummary
} from './validation.ts';

type DatabaseAudienceProfile = Omit<AudienceProfile, 'canJoinLocalEvents' | 'isBasedOnGTA' | 'teamIds'> & {
	canJoinLocalEvents: number,
	isBasedOnGTA: number,
	teamIds: string
};

export interface CampaignRecipient {
	id: string;
	profileId: string;
	email: string;
	name: string;
}

/** The only fields delivery needs, so a resumed campaign can reload recipients cheaply. */
export type DeliverableRecipient = Pick<CampaignRecipient, 'email' | 'id'>;

export interface CampaignDeliveryState {
	id: string;
	status: EmailCampaignStatus;
	subject: string;
	message: string;
}

const ERROR_MESSAGE_MAX_LENGTH = 1000;

function transformAudienceProfile(profile: DatabaseAudienceProfile): AudienceProfile {
	return {
		...profile,
		canJoinLocalEvents: Boolean(profile.canJoinLocalEvents),
		isBasedOnGTA: Boolean(profile.isBasedOnGTA),
		teamIds: JSON.parse(profile.teamIds) as string[]
	};
}

const audienceProfileSelect = `
	SELECT
		profile.id,
		profile.name,
		access.email,
		access.accessLevel,
		access.profileStatus,
		profile.isBasedOnGTA,
		profile.canJoinLocalEvents,
		(
			SELECT json_group_array(role.teamId)
			FROM ${DBTables.ROLE} AS role
			INNER JOIN ${DBTables.TEAM} AS team ON team.id = role.teamId
			WHERE
				role.profileId = profile.id
				AND role.deletedAt IS NULL
				AND team.deletedAt IS NULL
		) AS teamIds
	FROM ${DBTables.PROFILE} AS profile
	INNER JOIN ${DBTables.ACCESS} AS access ON access.id = profile.id
`;

export async function getAudienceOptions(database: D1Database) {
	const [profilesResult, teamsResult] = await database.batch([
		database.prepare(`
			${audienceProfileSelect}
			WHERE access.activatedAt IS NOT NULL AND access.deletedAt IS NULL
			ORDER BY profile.name COLLATE NOCASE
		`),
		database.prepare(`
			SELECT
				team.id,
				team.name,
				COUNT(DISTINCT CASE
					WHEN role.deletedAt IS NULL AND access.activatedAt IS NOT NULL AND access.deletedAt IS NULL
					THEN role.profileId
				END) AS memberCount
			FROM ${DBTables.TEAM} AS team
			LEFT JOIN ${DBTables.ROLE} AS role ON role.teamId = team.id
			LEFT JOIN ${DBTables.ACCESS} AS access ON access.id = role.profileId
			WHERE team.deletedAt IS NULL
			GROUP BY team.id, team.name
			ORDER BY team.name COLLATE NOCASE
		`)
	]);

	return {
		profiles: (profilesResult?.results as DatabaseAudienceProfile[] | undefined ?? []).map(transformAudienceProfile),
		teams: teamsResult?.results as { id: string, name: string, memberCount: number }[] | undefined ?? []
	};
}

function placeholders(values: unknown[]) {
	return new Array(values.length).fill('?').join(', ');
}

export async function resolveAudience(database: D1Database, audience: EmailCampaignAudience): Promise<AudienceProfile[]> {
	const whereClauses = [
		'access.activatedAt IS NOT NULL',
		'access.deletedAt IS NULL'
	];
	const bindings: unknown[] = [];

	if (audience.mode === 'selected') {
		const selectedClauses: string[] = [];

		if (audience.profileIds.length > 0) {
			selectedClauses.push(`profile.id IN (${placeholders(audience.profileIds)})`);
			bindings.push(...audience.profileIds);
		}

		if (audience.teamIds.length > 0) {
			selectedClauses.push(`EXISTS (
				SELECT 1
				FROM ${DBTables.ROLE} AS selectedRole
				INNER JOIN ${DBTables.TEAM} AS selectedTeam ON selectedTeam.id = selectedRole.teamId
				WHERE
					selectedRole.profileId = profile.id
					AND selectedRole.teamId IN (${placeholders(audience.teamIds)})
					AND selectedRole.deletedAt IS NULL
					AND selectedTeam.deletedAt IS NULL
			)`);
			bindings.push(...audience.teamIds);
		}

		whereClauses.push(`(${selectedClauses.join(' OR ')})`);
	}

	if (audience.accessLevels.length > 0) {
		whereClauses.push(`access.accessLevel IN (${placeholders(audience.accessLevels)})`);
		bindings.push(...audience.accessLevels);
	}

	if (audience.profileStatuses.length > 0) {
		whereClauses.push(`access.profileStatus IN (${placeholders(audience.profileStatuses)})`);
		bindings.push(...audience.profileStatuses);
	}

	if (audience.isBasedOnGTA !== undefined) {
		whereClauses.push('profile.isBasedOnGTA = ?');
		bindings.push(Number(audience.isBasedOnGTA));
	}

	if (audience.canJoinLocalEvents !== undefined) {
		whereClauses.push('profile.canJoinLocalEvents = ?');
		bindings.push(Number(audience.canJoinLocalEvents));
	}

	const { results } = await database.prepare(`
		${audienceProfileSelect}
		WHERE ${whereClauses.join('\n\t\t\tAND ')}
		ORDER BY profile.name COLLATE NOCASE
	`).bind(...bindings).run<DatabaseAudienceProfile>();

	return results.map(transformAudienceProfile);
}

export async function getCampaignByIdempotencyKey(database: D1Database, idempotencyKey: string) {
	return database.prepare(`
		SELECT
			campaign.id,
			campaign.subject,
			campaign.status,
			campaign.recipientCount,
			campaign.sentCount,
			campaign.failedCount,
			campaign.insertedAt,
			campaign.sentAt,
			profile.name AS createdByName
		FROM ${DBTables.EMAIL_CAMPAIGN} AS campaign
		INNER JOIN ${DBTables.PROFILE} AS profile ON profile.id = campaign.createdBy
		WHERE campaign.idempotencyKey = ?
		LIMIT 1
	`).bind(idempotencyKey).first<EmailCampaignSummary>();
}

/** Delivery-side view of a campaign: enough to resume sending without re-resolving the audience. */
export async function getCampaignDeliveryState(database: D1Database, idempotencyKey: string) {
	return database.prepare(`
		SELECT id, status, subject, message
		FROM ${DBTables.EMAIL_CAMPAIGN}
		WHERE idempotencyKey = ?
		LIMIT 1
	`).bind(idempotencyKey).first<CampaignDeliveryState>();
}

/** Recipients of a campaign that were never attempted, in insertion order. */
export async function getPendingRecipients(database: D1Database, campaignId: string): Promise<DeliverableRecipient[]> {
	const { results } = await database.prepare(`
		SELECT id, email
		FROM ${DBTables.EMAIL_CAMPAIGN_RECIPIENT}
		WHERE campaignId = ? AND status = 'pending'
		ORDER BY insertedAt
	`).bind(campaignId).run<DeliverableRecipient>();

	return results;
}

/**
 * Two concurrent sends with the same idempotency key both see no existing campaign and both
 * insert; the loser trips the UNIQUE index and is expected to fall back to reading the winner.
 */
export function isUniqueConstraintError(error: unknown) {
	return error instanceof Error && /UNIQUE constraint failed/iu.test(error.message);
}

export async function insertCampaign(
	database: D1Database,
	createdBy: string,
	data: CreateEmailCampaign,
	recipients: AudienceProfile[]
) {
	const { id: campaignId, schemaVersion, happenedAt, insertedAt } = generateBaseDBfields();
	const recipientRows: CampaignRecipient[] = recipients.map(({ id: profileId, email, name }) => ({
		id: crypto.randomUUID(),
		profileId,
		email,
		name
	}));

	await database.batch([
		database.prepare(`
			INSERT INTO ${DBTables.EMAIL_CAMPAIGN} (
				id, schemaVersion, createdBy, subject, message, audienceCriteria,
				idempotencyKey, status, recipientCount, happenedAt, insertedAt
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, 'sending', ?, ?, ?)
		`).bind(
			campaignId,
			schemaVersion,
			createdBy,
			data.subject,
			data.message,
			JSON.stringify(data.audience),
			data.idempotencyKey,
			recipients.length,
			happenedAt,
			insertedAt
		),
		...recipientRows.map(({ id, profileId, email }) =>
			database.prepare(`
			INSERT INTO ${DBTables.EMAIL_CAMPAIGN_RECIPIENT} (
				id, campaignId, profileId, email, status, insertedAt
			)
			VALUES (?, ?, ?, ?, 'pending', ?)
		`).bind(id, campaignId, profileId, email, insertedAt)
		)
	]);

	return { campaignId, recipients: recipientRows };
}

export async function updateRecipientDelivery(
	database: D1Database,
	recipientId: string,
	status: 'failed' | 'sent',
	providerMessageId?: string,
	errorMessage?: string
) {
	return database.prepare(`
		UPDATE ${DBTables.EMAIL_CAMPAIGN_RECIPIENT}
		SET status = ?, providerMessageId = ?, errorMessage = ?, attemptedAt = ?
		WHERE id = ?
		`).bind(status, providerMessageId ?? null, errorMessage?.slice(0, ERROR_MESSAGE_MAX_LENGTH) ?? null, new Date().toISOString(), recipientId).run();
}

/**
 * Finalizes a campaign from its recipient rows rather than from in-memory counters, so the
 * summary stays consistent with the per-recipient records even when a run is cut short.
 * Recipients still pending mean delivery never finished: the campaign is left in 'sending'
 * so a later request can resume it instead of reporting a result that never happened.
 */
export async function finishCampaign(database: D1Database, campaignId: string) {
	const counts = await database.prepare(`
		SELECT
			COALESCE(SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END), 0) AS sentCount,
			COALESCE(SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END), 0) AS failedCount,
			COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) AS pendingCount
		FROM ${DBTables.EMAIL_CAMPAIGN_RECIPIENT}
		WHERE campaignId = ?
	`).bind(campaignId).first<{ sentCount: number, failedCount: number, pendingCount: number }>();

	const sentCount = counts?.sentCount ?? 0;
	const failedCount = counts?.failedCount ?? 0;

	if ((counts?.pendingCount ?? 0) > 0) {
		await database.prepare(`
			UPDATE ${DBTables.EMAIL_CAMPAIGN}
			SET sentCount = ?, failedCount = ?
			WHERE id = ?
		`).bind(sentCount, failedCount, campaignId).run();

		return { status: 'sending' satisfies EmailCampaignStatus, sentCount, failedCount };
	}

	let status: EmailCampaignStatus = 'partially-failed';
	if (failedCount === 0 && sentCount > 0) {
		status = 'sent';
	} else if (sentCount === 0) {
		status = 'failed';
	}

	await database.prepare(`
		UPDATE ${DBTables.EMAIL_CAMPAIGN}
		SET status = ?, sentCount = ?, failedCount = ?, sentAt = ?
		WHERE id = ?
	`).bind(status, sentCount, failedCount, new Date().toISOString(), campaignId).run();

	return { status, sentCount, failedCount };
}

export async function getRecentCampaigns(database: D1Database) {
	const { results } = await database.prepare(`
		SELECT
			campaign.id,
			campaign.subject,
			campaign.status,
			campaign.recipientCount,
			campaign.sentCount,
			campaign.failedCount,
			campaign.insertedAt,
			campaign.sentAt,
			profile.name AS createdByName
		FROM ${DBTables.EMAIL_CAMPAIGN} AS campaign
		INNER JOIN ${DBTables.PROFILE} AS profile ON profile.id = campaign.createdBy
		ORDER BY campaign.insertedAt DESC
		LIMIT 20
	`).run<EmailCampaignSummary>();

	return results;
}
