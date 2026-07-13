import { z } from 'zod';
import { IdSchema } from './db.ts';

export const IdParamSchema = z.object({
	id: IdSchema
});

export type IdParam = z.infer<typeof IdParamSchema>;

export const DEFAULT_PAGINATION_LIMIT = 20;
export const MAXIMUM_PAGINATION_LIMIT = 100;

export const PaginationQuerySchema = z.object({
	limit: z.coerce.number().int().positive().max(MAXIMUM_PAGINATION_LIMIT).default(DEFAULT_PAGINATION_LIMIT),
	page: z.coerce.number().int().positive().optional().default(1)
});
