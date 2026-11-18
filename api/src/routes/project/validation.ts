import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR, SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { BaseDbEntitySchema, BaseDBFieldsToOmit, IdSchema } from '../../utils/db.ts';

export const ProjectSchema = BaseDbEntitySchema.extend(
	z.object({
		name: z
			.string()
			.trim()
			.min(1, 'Name must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Name must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.describe("The project's name."),
		description: z
			.string()
			.trim()
			.min(1, 'Description must be at least one character long.')
			.max(LONG_TEXT_SIZE_IN_CHAR, `Description must be at most ${LONG_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe('A description for the project. It may include markdown content.'),
		teamId: IdSchema.describe('The ID of the team this project is assigned to.')
	}).shape
);

export type Project = z.infer<typeof ProjectSchema>;

export const CreateProjectSchema = ProjectSchema.omit(BaseDBFieldsToOmit);

export type CreateProjectData = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = CreateProjectSchema
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		{ message: 'At least one property is required.' }
	);

export type UpdateProjectData = z.infer<typeof UpdateProjectSchema>;
