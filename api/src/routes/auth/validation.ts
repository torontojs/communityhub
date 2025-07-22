import { z } from 'zod';
import { AccessLevelSchema } from '../../utils/auth.ts';
import { IdAndSchemaVersionSchema } from '../../utils/db.ts';

export const ProfileStatusSchema = z.enum([
	'activated',
	'created',
	'deleted',
	'error',
	'profile-completed',
	'social-handle-provided',
	'tos-accepted'
]).describe('The status a profile may be in. It is useful for the sign-up process.');
export type ProfileStatus = z.infer<typeof ProfileStatusSchema>;

export const AccessSchema = IdAndSchemaVersionSchema.extend(
	z.object({
		accessLevel: AccessLevelSchema,
		password: z
			.string()
			.trim()
			.describe("The user's password, hashed and salted."),
		email: z
			.email()
			.trim()
			.toLowerCase()
			.describe("The user's email. It is the same as the email in the profile table."),
		insertedAt: z
			.iso.datetime({ offset: true })
			.optional()
			.describe('The date when the entity was added to the database.'),
		deletedAt: z
			.iso.datetime({ offset: true })
			.optional()
			.describe('The date when the entity was added to the database.'),
		deletedreason: z
			.string()
			.trim()
			.optional()
			.describe('The reason why a profile is deleted. It is kept as extra information for admins.')
	}).shape
);

export type Access = z.infer<typeof AccessSchema>;

export const SignInSchema = z.object({
	email: z
		.email('Invalid Email')
		.trim()
		.toLowerCase()
		.min(1, 'Email must be at least one character long'),
	password: z
		.string()
		.trim()
		.min(1, 'Password must be at least one character long')
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
	name: z
		.string({ error: 'Name is required' })
		.trim()
		.min(1, 'Name must be at least one character long'),
	email: z
		.email({ error: 'Email is required' })
		.trim()
		.toLowerCase()
		.min(1, 'Email must be at least one character long'),
	password: z
		.string()
		.trim()
		.min(1, 'Password must be at least one character long')
});

export type SignUpData = z.infer<typeof SignUpSchema>;

export const ActivateSchema = z.object({ token: z.uuid('Invalid ID format') });

export type ActivateData = z.infer<typeof ActivateSchema>;
