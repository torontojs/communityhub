import { z } from 'zod';
import { IdAndSchemaVersionSchema, InsertionTimestampsSchema } from '../../utils/db.ts';

export const LogItemSource = {
	PROFILE: 'profile',
	ROLE: 'role',
	TEAM: 'team',
	SPECIAL: 'special'
} as const;

export const LogItemSourceSchema = z
	.enum(['profile', 'role', 'team', 'special'])
	.describe('');

export const EventLogSchema = IdAndSchemaVersionSchema
	.merge(InsertionTimestampsSchema)
	.merge(z.object({
		subject: z
			.string()
			.uuid()
			.describe(''),
		subjectSource: LogItemSourceSchema,
		verb: z
			.string()
			.describe(''),
		object: z
			.string()
			.uuid()
			.describe(''),
		objectSource: LogItemSourceSchema
	}));

export type EventLog = z.infer<typeof EventLogSchema>;
