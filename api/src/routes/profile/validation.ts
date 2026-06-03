import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR, SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { BaseDbEntitySchema, BaseDBFieldsToOmit, IdSchema } from '../../utils/db.ts';
import { TeamSchema } from '../team/validation.ts';

export const PlatformEnumSchema = z.enum([
	'site',
	'slack',
	'linkedin',
	'github',
	'portfolio',
	'codepen',
	'instagram',
	'threads',
	'facebook',
	'bluesky',
	'mastodon',
	'twitter',
	'devto'
])
	.describe('The identifier of the social media platform. It should be used as an id and may not match exactly the display name of the platform.');

export type SocialMediaPlatforms = z.infer<typeof PlatformEnumSchema>;

export const PlatformLinkOrUserSchema = z
	.string()
	.trim()
	.min(1, 'Social media url/user must be at least one character long.')
	.max(SHORT_TEXT_SIZE_IN_CHAR, `Social media url/user must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
	.describe('The social media url or username for a platform.');

export type PlatformLink = z.infer<typeof PlatformLinkOrUserSchema>;

export const ProfileSkillNameSchema = z
	.string()
	.trim()
	.min(1, 'Skill must be at least one character long.')
	.max(SHORT_TEXT_SIZE_IN_CHAR, `Skill must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`);

export type ProfileSkillName = z.infer<typeof ProfileSkillNameSchema>;

export const RoleNameSchema = z
	.string()
	.trim()
	.min(1, 'Name must be at least one character long.')
	.max(SHORT_TEXT_SIZE_IN_CHAR, `Name must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
	.describe("The role's name.");

export const ProfileTeamSchema = z.object({
	id: IdSchema,
	name: TeamSchema.shape.name,
	description: TeamSchema.shape.description,
	role: RoleNameSchema,
	memberCount: z
		.number()
		.int()
		.nonnegative()
		.describe('Total count of active members in this team.')
});

export type ProfileTeam = z.infer<typeof ProfileTeamSchema>;

export const ProfileSchema = BaseDbEntitySchema.extend(
	z.object({
		email: z
			.email()
			.trim()
			.min(1, 'Email must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Email must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.toLowerCase()
			.describe('The email used for this profile, it must be unique on the database.'),
		name: z
			.string()
			.trim()
			.min(1, 'Name must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Name must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.describe('The name this person would like to be refered to.'),
		description: z
			.string()
			.trim()
			.min(1, 'Description must be at least one character long.')
			.max(LONG_TEXT_SIZE_IN_CHAR, `Description must be at most ${LONG_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe('A description for this person, may be written in markdown.'),
		isBasedOnGTA: z
			.boolean()
			.describe('A flag indicating if the user is based on the Grater Toronto Area (GTA).'),
		canJoinLocalEvents: z
			.boolean()
			.describe('A flag indicating if the user is available to join local/in-person events.'),
		pronouns: z
			.string()
			.trim()
			.min(1, 'Pronouns must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Pronouns must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe('The pronouns the person identifies with.'),
		birthday: z
			.string()
			.trim()
			.refine(
				(data) => data ? /^\d{2}-\d{2}$/iu.test(data) : true,
				{ message: 'Birthday must be in the format "MM-DD".' }
			)
			.optional()
			.describe("User's birthday, month and day only. Year is not included."),
		avatar: z
			.url()
			.trim()
			.min(1, 'Avatar must be at least one character long.')
			.max(SHORT_TEXT_SIZE_IN_CHAR, `Avatar must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
			.optional()
			.describe("The user's avatar URL."),
		links: z.array(
			z.object({
				platform: PlatformEnumSchema,
				url: PlatformLinkOrUserSchema
			})
		)
			.optional()
			.describe('A list of objects containing platform names and respective links for social media and platforms the person want to make available on the Community Hub.'),
		skills: z
			.array(ProfileSkillNameSchema)
			.optional()
			.describe('A list of skills the person has provided.'),
		teams: z
			.array(ProfileTeamSchema)
			.optional()
			.describe('A list of teams the person belongs to.')
	}).shape
);

export type Profile = z.infer<typeof ProfileSchema>;

export const CreateProfileSchema = ProfileSchema.pick({ name: true, email: true }).extend(z.object({ password: z.string() }).shape);

export type CreateProfileData = z.infer<typeof CreateProfileSchema>;

export const UpdateProfileSchema = ProfileSchema
	.omit({ ...BaseDBFieldsToOmit, avatar: true, email: true })
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		{ message: 'At least one property is required.' }
	);

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export const ProfileLinkSchema = z.object({
	id: IdSchema,
	profileId: ProfileSchema.shape.id,
	platform: PlatformEnumSchema,
	url: PlatformLinkOrUserSchema
});

export type ProfileLink = z.infer<typeof ProfileLinkSchema>;

export const ProfileSkillSchema = z.object({
	id: IdSchema,
	profileId: ProfileSchema.shape.id,
	skill: ProfileSkillNameSchema
});

export type ProfileSkill = z.infer<typeof ProfileSkillSchema>;
