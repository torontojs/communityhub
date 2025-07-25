import { z } from 'zod';
import { BaseDbEntitySchema, BaseDBFieldsToOmit } from '../../utils/db.ts';

export const TeamMembershipSchema = BaseDbEntitySchema.extend(
	z.object({
		name: z
			.string()
			.trim()
			.min(1, 'Name is required')
			.describe("The role's name."),
		description: z
			.string()
			.trim()
			.optional()
			.describe('A description for the role. It may include markdown content.'),
		teamId: z
			.uuid()
			.describe(''),
		profileId: z
			.uuid()
			.describe('')
	}).shape
);

export type TeamMembership = z.infer<typeof TeamMembershipSchema>;

export const AddTeamMembersSchema = z.array(TeamMembershipSchema.omit({ ...BaseDBFieldsToOmit, teamId: true }));

export type AddTeamMembers = z.infer<typeof AddTeamMembersSchema>;

export const UpdateTeamMembersSchema = z.array(
	TeamMembershipSchema
		.pick({ id: true })
		.extend(
			TeamMembershipSchema
				.pick({ name: true, description: true })
				.partial()
				.shape
		)
);

export type UpdateTeamMembers = z.infer<typeof UpdateTeamMembersSchema>;
