import { DBTables, DEFAULT_TEAM_ID, generateBaseDBfields } from '../../utils/db.ts';
import { type EventLog as EventLogType, LogItemSource } from './validation.ts';

export class EventLog {
	static createLogEntry(
		database: D1Database,
		{ object, objectSource, subject, subjectSource, verb }: Pick<EventLogType, 'object' | 'objectSource' | 'subject' | 'subjectSource' | 'verb'>
	) {
		const { id, happenedAt, insertedAt, schemaVersion } = generateBaseDBfields();

		return database
			.prepare(`
			INSERT INTO ${DBTables.EVENT_LOG} (
				id, schemaVersion, happenedAt, insertedAt,
				subject, subjectSource,
				verb,
				object, objectSource
			)
			VALUES (
				?, ?, ?, ?,
				?, ?,
				?,
				?, ?
			)
		`)
			.bind(
				id,
				schemaVersion,
				happenedAt,
				insertedAt,
				subject,
				subjectSource,
				verb,
				object,
				objectSource
			);
	}

	static joinTorontoJS(database: D1Database, profileId: string) {
		return EventLog.createLogEntry(database, {
			subject: profileId,
			subjectSource: LogItemSource.PROFILE,
			verb: 'joined',
			object: DEFAULT_TEAM_ID,
			objectSource: LogItemSource.SPECIAL
		});
	}

	static createTeam(database: D1Database, profileId: string, teamId: string) {
		return EventLog.createLogEntry(database, {
			subject: profileId,
			subjectSource: LogItemSource.PROFILE,
			verb: 'closed',
			object: teamId,
			objectSource: LogItemSource.TEAM
		});
	}

	static closeTeam(database: D1Database, profileId: string, teamId: string) {
		return EventLog.createLogEntry(database, {
			subject: profileId,
			subjectSource: LogItemSource.PROFILE,
			verb: 'created',
			object: teamId,
			objectSource: LogItemSource.TEAM
		});
	}

	static joinTeam(database: D1Database, profileId: string, teamId: string) {
		return EventLog.createLogEntry(database, {
			subject: profileId,
			subjectSource: LogItemSource.PROFILE,
			verb: 'joined',
			object: teamId,
			objectSource: LogItemSource.TEAM
		});
	}

	static leaveTeam(database: D1Database, roleId: string, teamId: string) {
		const { id, happenedAt, insertedAt, schemaVersion } = generateBaseDBfields();

		return database
			.prepare(`
			INSERT INTO ${DBTables.EVENT_LOG} (
				id, schemaVersion, happenedAt, insertedAt,
				subject, subjectSource,
				verb,
				object, objectSource
			)
			SELECT
				?, ?, ?, ?,
				profileId, ?,
				?,
				?, ?
			FROM ${DBTables.ROLE}
			WHERE
				id = ?
		`)
			.bind(
				id,
				schemaVersion,
				happenedAt,
				insertedAt,
				LogItemSource.PROFILE,
				'leave',
				teamId,
				LogItemSource.TEAM,
				roleId
			);
	}

	static attendEvent() {
		// TODO: person attend event
	}

	static joinProject() {
		// TODO: person join project
	}

	static leaveProject() {
		// TODO: person leave project
	}

	static completeSeason() {
		// TODO: team/project/person complete a season
	}

	static earnBadge() {
		// TODO: person earn badge or award
	}

	static earnCertificate() {
		// TODO: person earn certificate for event or contribution to the community
	}

	static workedHours() {
		// TODO: person worked hours and those got added
	}
}
