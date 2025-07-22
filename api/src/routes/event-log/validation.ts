import { z } from 'zod';
import { SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
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
	.extend(InsertionTimestampsSchema.shape)
	.extend(
		z.object({
			subject: z
				.uuid()
				.describe(''),
			subjectSource: LogItemSourceSchema,
			verb: z
				.string()
				.max(SHORT_TEXT_SIZE_IN_CHAR)
				.trim()
				.describe(''),
			object: z
				.uuid()
				.describe(''),
			objectSource: LogItemSourceSchema
		}).shape
	);

export type EventLog = z.infer<typeof EventLogSchema>;
