import { z } from 'zod';
import { SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { IdAndSchemaVersionSchema, InsertionTimestampsSchema } from '../../utils/db.ts';

export const LogItemSourceEnum = {
	PROFILE: 'profile',
	ROLE: 'role',
	TEAM: 'team',
	SPECIAL: 'special'
} as const;

export const LogItemSourceSchema = z
	.enum(['profile', 'role', 'team', 'special'])
	.describe('The source of the log item. It is used to relate the id of the item to a table/schema.');

export type LogItemSource = z.infer<typeof LogItemSourceSchema>;

export const LogItemIdSchema = z
	.uuid()
	.describe('The ID for the log item. Along with the source for this item it identifies the table/schema to look for.');

export type LogItemId = z.infer<typeof LogItemIdSchema>;

export const EventLogSchema = IdAndSchemaVersionSchema
	.extend(InsertionTimestampsSchema.shape)
	.extend(
		z.object({
			subject: LogItemIdSchema,
			subjectSource: LogItemSourceSchema,
			verb: z
				.string()
				.trim()
				.min(1, 'Verb must be at least one character long.')
				.max(SHORT_TEXT_SIZE_IN_CHAR, `Verb must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
				.describe('The verb for the event log, it represents an action that hapened between the subject and the object of the log.'),
			object: LogItemIdSchema,
			objectSource: LogItemSourceSchema
		}).shape
	);

export type EventLog = z.infer<typeof EventLogSchema>;
