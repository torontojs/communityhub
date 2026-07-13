import { describe, expect, it } from 'vitest';
import { getInitials } from './getInitials.ts';

describe('getInitials', () => {
	it('returns the first two initials, uppercased', () => {
		expect(getInitials('jane doe')).toBe('JD');
	});

	it('caps at two initials for longer names', () => {
		expect(getInitials('mary jane watson parker')).toBe('MJ');
	});

	it('returns a single initial for a single name', () => {
		expect(getInitials('cher')).toBe('C');
	});

	it('returns an empty string for an empty name', () => {
		expect(getInitials('')).toBe('');
	});

	it('ignores extra whitespace between words', () => {
		expect(getInitials('jane   doe')).toBe('JD');
	});

	it('ignores leading whitespace', () => {
		expect(getInitials(' jane doe')).toBe('JD');
	});
});
