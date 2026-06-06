import { z } from 'zod';
import { IdSchema } from './db.ts';

export const IdParamSchema = z.object({
	id: IdSchema
});

export type IdParam = z.infer<typeof IdParamSchema>;

export const PaginationQuerySchema = z.object({
	limit: z.coerce.number().int().positive().optional(),
	page: z.coerce.number().int().positive().optional().default(1)
});
