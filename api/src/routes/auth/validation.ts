import { z } from 'zod';
import { LONG_TEXT_SIZE_IN_CHAR, SHORT_TEXT_SIZE_IN_CHAR } from '../../middleware/body-size.ts';
import { AccessLevelSchema } from '../../utils/auth.ts';
import { IdAndSchemaVersionSchema } from '../../utils/db.ts';
import { ProfileSchema } from '../profile/validation.ts';

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

export const PlainTextPasswordSchema = z
	.string()
	.trim()
	.min(1, 'Password must be at least one character long.')
	.max(SHORT_TEXT_SIZE_IN_CHAR, `Password must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
	.describe("The user's password in plain text. This is used as input coming from the browser.");

export type PlainTextPassword = z.infer<typeof PlainTextPasswordSchema>;

export const HashedPasswordSchema = z
	.string()
	.trim()
	.min(1, 'Password must be at least one character long.')
	.max(SHORT_TEXT_SIZE_IN_CHAR, `Password must be at most ${SHORT_TEXT_SIZE_IN_CHAR} characters long.`)
	.describe("The user's password, hashed and salted.");

export type HashedPassword = z.infer<typeof HashedPasswordSchema>;

export const AccessSchema = IdAndSchemaVersionSchema.extend(
	z.object({
		accessLevel: AccessLevelSchema,
		password: HashedPasswordSchema,
		email: ProfileSchema.shape.email,
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
			.max(LONG_TEXT_SIZE_IN_CHAR)
			.optional()
			.describe('The reason why a profile is deleted. It is kept as extra information for admins.')
	}).shape
);

export type Access = z.infer<typeof AccessSchema>;

export const SignInSchema = z.object({
	email: ProfileSchema.shape.email,
	password: PlainTextPasswordSchema
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
	name: ProfileSchema.shape.name,
	email: ProfileSchema.shape.email,
	password: PlainTextPasswordSchema
});

export type SignUpData = z.infer<typeof SignUpSchema>;

export const ActivateSchema = z.object({ token: z.uuid('Invalid ID format') });

export type ActivateData = z.infer<typeof ActivateSchema>;
