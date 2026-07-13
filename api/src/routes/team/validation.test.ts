import { describe, expect, it } from 'vitest';
import { CreateTeamSchema, UpdateTeamSchema } from './validation.ts';

describe('CreateTeamSchema', () => {
	it('accepts a name without a description (description is optional)', () => {
		expect(CreateTeamSchema.safeParse({ name: 'Volunteers' }).success).toBe(true);
	});

	it('accepts a name with a description', () => {
		expect(CreateTeamSchema.safeParse({ name: 'Volunteers', description: 'Helping hands' }).success).toBe(true);
	});

	it('rejects a missing name', () => {
		expect(CreateTeamSchema.safeParse({ description: 'No name' }).success).toBe(false);
	});

	it('rejects an empty name', () => {
		expect(CreateTeamSchema.safeParse({ name: '   ' }).success).toBe(false);
	});

	it('rejects a name longer than the short-text limit', () => {
		expect(CreateTeamSchema.safeParse({ name: 'a'.repeat(1025) }).success).toBe(false);
	});
});

describe('UpdateTeamSchema', () => {
	it('rejects an empty body (at least one property required)', () => {
		expect(UpdateTeamSchema.safeParse({}).success).toBe(false);
	});

	it('accepts a name-only update', () => {
		expect(UpdateTeamSchema.safeParse({ name: 'Renamed' }).success).toBe(true);
	});

	it('accepts a description-only update', () => {
		expect(UpdateTeamSchema.safeParse({ description: 'Updated description' }).success).toBe(true);
	});
});
