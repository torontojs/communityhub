import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { BaseDbEntitySchema, BaseDBFieldsToOmit } from '../../utils/db.ts';
import { ProfileSchema, RoleNameSchema } from '../profile/validation.ts';
import { TeamSchema } from '../team/validation.ts';

export const TeamMembershipSchema = BaseDbEntitySchema.extend(
	z.object({
		name: RoleNameSchema,
		description: z
			.string()
			.trim()
			.min(1, 'Description must be at least one character long.')
			.max(LONG_TEXT_SIZE_IN_CHAR, `Description must be at most ${LONG_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe('A description for the role. It may include markdown content.'),
		teamId: TeamSchema.shape.id,
		profileId: ProfileSchema.shape.id
	}).shape
);

export type TeamMembership = z.infer<typeof TeamMembershipSchema>;

export const AddTeamMembersSchema = z.array(TeamMembershipSchema.omit({ ...BaseDBFieldsToOmit, teamId: true }));

export type AddTeamMembers = z.infer<typeof AddTeamMembersSchema>;

export const UpdateTeamMembersSchema = z.array(
	z.object({
		id: TeamMembershipSchema.shape.id,
		name: TeamMembershipSchema.shape.name.optional(),
		description: TeamMembershipSchema.shape.description
	})
		.refine(
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			(data) => Boolean(data.name || data.description),
			{ message: 'Either name or description must be provided.' }
		)
);

export type UpdateTeamMembers = z.infer<typeof UpdateTeamMembersSchema>;

export const TeamMemberInfoSchema = z.object({
	id: TeamMembershipSchema.shape.id,
	name: TeamMembershipSchema.shape.name,
	profileId: ProfileSchema.shape.id,
	profileName: ProfileSchema.shape.name,
	avatar: ProfileSchema.shape.avatar
});

export type TeamMemberInfo = z.infer<typeof TeamMemberInfoSchema>;
