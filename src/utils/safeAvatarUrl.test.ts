import { describe, expect, it } from 'vitest';
import { safeAvatarUrl } from './safeAvatarUrl.ts';

const DEFAULT = '/default-avatar.png';

describe('safeAvatarUrl', () => {
	it('falls back to the default avatar when the url is undefined', () => {
		expect(safeAvatarUrl(undefined)).toBe(DEFAULT);
	});

	it('falls back to the default avatar for an empty string', () => {
		expect(safeAvatarUrl('')).toBe(DEFAULT);
	});

	it('allows https urls', () => {
		expect(safeAvatarUrl('https://example.com/me.png')).toBe('https://example.com/me.png');
	});

	it('allows http urls', () => {
		expect(safeAvatarUrl('http://example.com/me.png')).toBe('http://example.com/me.png');
	});

	it('rejects javascript: urls', () => {
		// eslint-disable-next-line no-script-url -- intentionally testing that script URLs are rejected
		expect(safeAvatarUrl('javascript:alert(1)')).toBe(DEFAULT);
	});

	it('rejects data: urls', () => {
		expect(safeAvatarUrl('data:image/png;base64,AAAA')).toBe(DEFAULT);
	});

	it('rejects malformed urls', () => {
		expect(safeAvatarUrl('not a url')).toBe(DEFAULT);
	});

	it('percent-encodes unsafe characters exactly once', () => {
		expect(safeAvatarUrl('https://example.com/a b.png')).toBe('https://example.com/a%20b.png');
	});

	it('does not double-encode already-encoded characters', () => {
		expect(safeAvatarUrl('https://example.com/a%20b.png')).toBe('https://example.com/a%20b.png');
	});
});
