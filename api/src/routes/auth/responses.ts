import { z } from 'zod';
import { AccessLevelSchema } from '../../utils/auth.ts';
import { ProfileSchema } from '../profile/validation.ts';
import { ProfileStatusSchema } from './validation.ts';

export const HeartbeatResponseSchema = z.object({
	id: ProfileSchema.shape.id,
	access: AccessLevelSchema,
	name: ProfileSchema.shape.name,
	avatar: ProfileSchema.shape.avatar,
	status: ProfileStatusSchema
}).describe('Response for an operation status, it does not include data, only a message and potential validation errors.');

export type HeartbeatResponse = z.infer<typeof HeartbeatResponseSchema>;
