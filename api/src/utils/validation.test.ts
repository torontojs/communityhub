import { describe, expect, it } from 'vitest';
import { IdParamSchema, PaginationQuerySchema } from './validation.ts';

const VALID_UUID = '3c5123c0-8548-4a02-a83c-32e9ce67eae8';

describe('PaginationQuerySchema', () => {
	it('defaults page to 1 when omitted', () => {
		const result = PaginationQuerySchema.safeParse({});

		expect(result.success).toBe(true);
		expect(result.data).toEqual({ page: 1 });
	});

	it('coerces numeric strings', () => {
		const result = PaginationQuerySchema.safeParse({ limit: '10', page: '2' });

		expect(result.success).toBe(true);
		expect(result.data).toEqual({ limit: 10, page: 2 });
	});

	it('treats limit as optional', () => {
		const result = PaginationQuerySchema.safeParse({ page: '3' });

		expect(result.success).toBe(true);
		expect(result.data?.limit).toBeUndefined();
	});

	it('rejects a limit of 0', () => {
		expect(PaginationQuerySchema.safeParse({ limit: '0' }).success).toBe(false);
	});

	it('rejects a page of 0', () => {
		expect(PaginationQuerySchema.safeParse({ page: '0' }).success).toBe(false);
	});

	it('rejects non-numeric values', () => {
		expect(PaginationQuerySchema.safeParse({ limit: 'abc' }).success).toBe(false);
	});

	it('rejects a non-integer limit', () => {
		expect(PaginationQuerySchema.safeParse({ limit: '1.5' }).success).toBe(false);
	});
});

describe('IdParamSchema', () => {
	it('accepts a valid UUID', () => {
		expect(IdParamSchema.safeParse({ id: VALID_UUID }).success).toBe(true);
	});

	it('rejects a malformed id', () => {
		expect(IdParamSchema.safeParse({ id: 'not-a-uuid' }).success).toBe(false);
	});
});
