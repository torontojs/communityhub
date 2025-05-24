import { z } from 'zod';
import { BaseDbEntitySchema, BaseDBFieldsToOmit } from '../../utils/db.ts';

export const PlatformEnum = z.enum(['Slack', 'LinkedIn', 'GitHub', 'Portfolio', 'Instagram', 'Threads', 'Facebook', 'BlueSky', 'Mastadon', 'Twitter', 'Dev']);

export const ProfileSchema = BaseDbEntitySchema.merge(z.object({
	email: z
		.string()
		.email('Invalid Email.')
		.describe('The email used for this profile, it must be unique on the database.'),
	name: z
		.string()
		.trim()
		.min(1, 'Name should be 1 or more characters long.')
		.describe('The name this person would like to be refered to.'),
	description: z
		.string()
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
		.optional()
		.describe('The pronouns the person identifies with.'),
	birthday: z
		.string()
		.optional()
		.refine(
			(data) => data ? /^\d{2}-\d{2}$/iu.test(data) : true,
			{ message: 'Birthday must be in the format "MM-DD".' }
		)
		.describe('Birthday of user.'),
	avatar: z
		.string()
		.url('Must be a valid URL.')
		.optional()
		.describe("The user's avatar URL."),
	links: z.array(
		z.object({
			platform: PlatformEnum,
			url: z.string().url('Invalid url.')
		})
	)
		.optional()
		.describe('A list of objects containing platform names and respective links for social media and platforms the person want to make available on the Community Hub.'),
	skills: z.array(z.string())
		.optional()
		.describe('A list of skills the person has provided.'),
	deletedReason: z
		.string()
		.optional()
		.describe('The reason this perofile was marked deleted.')
}));

export type Profile = z.infer<typeof ProfileSchema>;

export const CreateProfileSchema = ProfileSchema.pick({ name: true, email: true }).merge(z.object({ password: z.string() }));

export type CreateProfileData = z.infer<typeof CreateProfileSchema>;

export const UpdateProfileSchema = ProfileSchema
	.omit({ ...BaseDBFieldsToOmit, email: true })
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		{ message: 'At least one property is required' }
	);

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export const ProfileLinkSchema = z.object({
	id: z
		.string()
		.uuid()
		.describe('The Link id.'),
	profileId: z
		.string()
		.uuid()
		.describe('The profile id.'),
	platform: PlatformEnum
		.describe('The name of the platform for the URL.'),
	url: z
		.string()
		.url()
		.describe('The link URL.')
});

export type ProfileLink = z.infer<typeof ProfileLinkSchema>;

export const ProfileSkillSchema = z.object({
	id: z
		.string()
		.uuid()
		.describe('The Link id.'),
	profileId: z
		.string()
		.uuid()
		.describe('The profile id.'),
	skill: z
		.string()
		.describe('The link name.')
});

export type ProfileSkill = z.infer<typeof ProfileSkillSchema>;
