import { z } from 'zod';
import { IdAndSchemaVersionSchema } from '../../utils/db.ts';

export const ProfileDocumentTypeSchema = z.enum([
	'code-of-conduct',
	'image-release-form',
	'volunteer-agreement'
]).describe('The type of documents saved by the platform.');

export type ProfileDocumentType = z.infer<typeof ProfileDocumentTypeSchema>;

export const ProfileDocumentVersionSchema = z.string().datetime({ offset: true }).describe('The document version. It is a timestamp representing when the document was published.');

export type ProfileDocumentVersion = z.infer<typeof ProfileDocumentVersionSchema>;

export const DOCUMENT_VERSIONS: Record<ProfileDocumentType, ProfileDocumentVersion> = {
	'code-of-conduct': '2025-07-15T04:36:15Z',
	'image-release-form': '2025-07-15T04:36:15Z',
	'volunteer-agreement': '2025-07-15T04:36:15Z'
} as const;

export const ProfileDocumentSchema = IdAndSchemaVersionSchema.merge(z.object({
	profileId: z
		.string()
		.uuid()
		.describe('The profile id for that document'),
	type: ProfileDocumentTypeSchema,
	signedAt: z.string().datetime({ offset: true }).describe('The date when the document was signed.'),
	documentVersion: ProfileDocumentVersionSchema
}));

export type ProfileDocument = z.infer<typeof ProfileDocumentSchema>;

export const SignDocumentSchema = ProfileDocumentSchema.omit({ id: true, schemaVersion: true });

export type SignDocumentData = z.infer<typeof SignDocumentSchema>;

export const SignedProfileDocumentSchema = ProfileDocumentSchema.pick({ type: true, signedAt: true, documentVersion: true });

export type SignedProfileDocument = z.infer<typeof SignedProfileDocumentSchema>;
