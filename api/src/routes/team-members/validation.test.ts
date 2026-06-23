import { describe, expect, it } from 'vitest';
import { AddTeamMembersSchema, UpdateTeamMembersSchema } from './validation.ts';

const VALID_UUID = '3c5123c0-8548-4a02-a83c-32e9ce67eae8';

describe('AddTeamMembersSchema', () => {
	it('accepts an entry with a name and profileId', () => {
		const result = AddTeamMembersSchema.safeParse([{ name: 'Captain', profileId: VALID_UUID }]);

		expect(result.success).toBe(true);
	});

	it('rejects an entry without a name', () => {
		expect(AddTeamMembersSchema.safeParse([{ profileId: VALID_UUID }]).success).toBe(false);
	});

	it('rejects an entry with an empty name', () => {
		expect(AddTeamMembersSchema.safeParse([{ name: '   ', profileId: VALID_UUID }]).success).toBe(false);
	});

	it('rejects an entry with a malformed profileId', () => {
		expect(AddTeamMembersSchema.safeParse([{ name: 'Captain', profileId: 'nope' }]).success).toBe(false);
	});
});

describe('UpdateTeamMembersSchema', () => {
	it('accepts a name-only update', () => {
		expect(UpdateTeamMembersSchema.safeParse([{ id: VALID_UUID, name: 'Lead' }]).success).toBe(true);
	});

	it('accepts a description-only update', () => {
		expect(UpdateTeamMembersSchema.safeParse([{ id: VALID_UUID, description: 'New role' }]).success).toBe(true);
	});

	it('rejects an entry with neither name nor description', () => {
		expect(UpdateTeamMembersSchema.safeParse([{ id: VALID_UUID }]).success).toBe(false);
	});

	it('rejects an entry without an id', () => {
		expect(UpdateTeamMembersSchema.safeParse([{ name: 'Lead' }]).success).toBe(false);
	});
});
