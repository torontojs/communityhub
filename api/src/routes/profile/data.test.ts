/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { describe, expect, test } from 'vitest';
import { transformProfile } from './data.ts';
import type { Profile } from './validation.ts';

const baseProfile: Profile = {
	id: '3227114d-43c4-42ed-8aea-f3860fe42222',
	schemaVersion: 1,
	happenedAt: '2025-01-01T00:00:00.000Z',
	insertedAt: '2025-01-01T00:00:00.000Z',
	email: 'test@example.com',
	name: 'Test User',
	isBasedOnGTA: 1 as unknown as boolean,
	canJoinLocalEvents: 1 as unknown as boolean
};

describe('transformProfile', () => {
	test('coerces isBasedOnGTA and canJoinLocalEvents from integers to booleans', () => {
		const result = transformProfile({
			...baseProfile,
			isBasedOnGTA: 1 as unknown as boolean,
			canJoinLocalEvents: 0 as unknown as boolean
		});

		expect(result.isBasedOnGTA).toBe(true);
		expect(result.canJoinLocalEvents).toBe(false);
	});

	test('defaults links to empty array when undefined', () => {
		const result = transformProfile({ ...baseProfile, links: undefined });

		expect(result.links).toEqual([]);
	});

	test('defaults skills to empty array when undefined', () => {
		const result = transformProfile({ ...baseProfile, skills: undefined });

		expect(result.skills).toEqual([]);
	});

	test('preserves links when provided', () => {
		const links = [{ platform: 'github' as const, url: 'https://github.com/test' }];
		const result = transformProfile({ ...baseProfile, links });

		expect(result.links).toEqual(links);
	});

	test('preserves skills when provided', () => {
		const skills = ['JavaScript', 'TypeScript'];
		const result = transformProfile({ ...baseProfile, skills });

		expect(result.skills).toEqual(skills);
	});

	test('filters out falsy values from profile', () => {
		const result = transformProfile({
			...baseProfile,
			description: '',
			pronouns: undefined,
			birthday: undefined,
			avatar: undefined
		});

		expect(result).not.toHaveProperty('description');
		expect(result).not.toHaveProperty('pronouns');
		expect(result).not.toHaveProperty('birthday');
		expect(result).not.toHaveProperty('avatar');
	});

	test('keeps truthy optional fields', () => {
		const result = transformProfile({
			...baseProfile,
			description: 'A description',
			pronouns: 'they/them',
			birthday: '01-15',
			avatar: 'https://example.com/avatar.png'
		});

		expect(result.description).toBe('A description');
		expect(result.pronouns).toBe('they/them');
		expect(result.birthday).toBe('01-15');
		expect(result.avatar).toBe('https://example.com/avatar.png');
	});
});
