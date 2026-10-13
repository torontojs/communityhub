import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR, SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { BaseDbEntitySchema, BaseDBFieldsToOmit, IdSchema } from '../../utils/db.ts';

export const EventSchema = BaseDbEntitySchema.extend(
	z.object({
		name: z
			.string()
			.trim()
			.min(1, 'Name must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Name must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.describe("The event's name."),
		description: z
			.string()
			.trim()
			.min(1, 'Description must be at least one character long.')
			.max(LONG_TEXT_SIZE_IN_CHAR, `Description must be at most ${LONG_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe('A description for the event. It may include markdown content.'),
		teamId: IdSchema
			.optional()
			.describe('The ID of the team this event belongs to.')
	}).shape
);

export type Event = z.infer<typeof EventSchema>;

export const CreateEventSchema = EventSchema.omit(BaseDBFieldsToOmit);

export type CreateEventData = z.infer<typeof CreateEventSchema>;

export const UpdateEventSchema = CreateEventSchema
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		{ message: 'At least one property is required.' }
	);

export type UpdateEventData = z.infer<typeof UpdateEventSchema>;
