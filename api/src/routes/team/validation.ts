import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR, SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { BaseDbEntitySchema, BaseDBFieldsToOmit } from '../../utils/db.ts';

export const TeamSchema = BaseDbEntitySchema.extend(
	z.object({
		name: z
			.string()
			.max(SHORT_TEXT_SIZE_IN_CHAR)
			.trim()
			.min(1, 'Name is required')
			.describe("The team's name."),
		description: z
			.string()
			.max(LONG_TEXT_SIZE_IN_CHAR)
			.trim()
			.optional()
			.describe('A description for the team. It may include markdown content.')
	}).shape
);

export type Team = z.infer<typeof TeamSchema>;

export const CreateTeamSchema = TeamSchema.omit(BaseDBFieldsToOmit);

export type CreateTeamData = z.infer<typeof CreateTeamSchema>;

export const UpdateTeamSchema = CreateTeamSchema
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		{ message: 'At least one property is required' }
	);

export type UpdateTeamData = z.infer<typeof UpdateTeamSchema>;
