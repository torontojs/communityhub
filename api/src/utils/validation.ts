import { z } from 'zod';
import type { DBTables } from './db.ts';

export const IdParamSchema = z.object({
	id: z.string().uuid('Invalid ID format')
});

export type IdParam = z.infer<typeof IdParamSchema>;

export async function validateExistingId(database: D1Database, table: typeof DBTables[keyof typeof DBTables], id: string) {
	try {
		const { id: existingId } = await database
			.prepare(`SELECT id FROM ${table} WHERE id = ? LIMIT 1`)
			.bind(id)
			.first<{ id: string }>() ?? {};

		return Boolean(existingId);
	} catch (error) {
		console.error(error);

		return false;
	}
}
