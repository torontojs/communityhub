import { z } from 'zod';
import type { AccessLevel } from './auth.ts';

export const SCHEMA_VERSION = 1;
export const DEFAULT_TEAM_ID = 'b3410598-ecbc-41be-9f68-925da74bc613';

export const DBTables = {
	PROFILE: 'profile',
	TEAM: 'team',
	ROLE: 'role',
	ACCESS: 'access',
	PROFILE_SKILLS: 'profile_skills',
	PROFILE_LINKS: 'profile_links',
	EVENT_LOG: 'event_log'
} as const;

export const IdAndSchemaVersionSchema = z.object({
	id: z.string().uuid().describe('The entity UUID.'),
	schemaVersion: z.number().describe('The schema version that this entity is using.')
});

export type IdAndSchemaVersion = z.infer<typeof IdAndSchemaVersionSchema>;

export const InsertionTimestampsSchema = z.object({
	happenedAt: z.string().datetime({ offset: true }).describe('The date when the the event related to this entity happened.'),
	insertedAt: z.string().datetime({ offset: true }).describe('The date when the entity was added to the database.')
});

export type InsertionTimestamps = z.infer<typeof InsertionTimestampsSchema>;

export const DeletionTimestampsSchema = z.object({
	deletedAt: z.string().datetime({ offset: true }).describe('The date when the entity was deleted from the database.').optional()
});

export type DeletionTimestamps = z.infer<typeof DeletionTimestampsSchema>;

export const TimestampsSchema = InsertionTimestampsSchema.merge(DeletionTimestampsSchema);

export type Timestamps = z.infer<typeof TimestampsSchema>;

export const BaseDbEntitySchema = IdAndSchemaVersionSchema.merge(TimestampsSchema);

export type BaseDBEntity = z.infer<typeof BaseDbEntitySchema>;

export const BaseDBFieldsToOmit: Record<keyof BaseDBEntity, true> = {
	id: true,
	schemaVersion: true,
	happenedAt: true,
	insertedAt: true,
	deletedAt: true
};

export function generateBaseDBfields() {
	const newTimestamp = new Date();

	return {
		id: crypto.randomUUID(),
		schemaVersion: SCHEMA_VERSION,
		insertedAt: newTimestamp.toISOString(),
		happenedAt: newTimestamp.toISOString()
	} satisfies BaseDBEntity;
}

export interface AccessSchema extends IdAndSchemaVersion {
	accessLevel: AccessLevel;
	password: string;
	email: string;
}
