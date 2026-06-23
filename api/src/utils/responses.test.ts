import { describe, expect, it } from 'vitest';
import { buildPaginationMeta } from './responses.ts';

const URL_BASE = 'https://example.com/api/profiles';

describe('buildPaginationMeta', () => {
	it('returns a single page when no limit is given', () => {
		const meta = buildPaginationMeta(URL_BASE, 25, undefined, 1);

		expect(meta.offset).toBe(0);
		expect(meta.start).toBe(0);
		expect(meta.end).toBe(24);
		expect(meta.lastPage).toBe(1);
		expect(meta.currentPage).toBe(1);
	});

	it('computes offset/end and last page for the first page', () => {
		const meta = buildPaginationMeta(URL_BASE, 25, 10, 1);

		expect(meta.offset).toBe(0);
		expect(meta.start).toBe(0);
		expect(meta.end).toBe(9);
		expect(meta.lastPage).toBe(3);
	});

	it('clamps the end index to the total on the last partial page', () => {
		const meta = buildPaginationMeta(URL_BASE, 25, 10, 3);

		expect(meta.offset).toBe(20);
		expect(meta.start).toBe(20);
		expect(meta.end).toBe(24);
		expect(meta.lastPage).toBe(3);
	});

	it('reports at least one page when there are no results', () => {
		const meta = buildPaginationMeta(URL_BASE, 0, 10, 1);

		expect(meta.lastPage).toBe(1);
		expect(meta.offset).toBe(0);
	});

	it('builds self/first/last links carrying the limit and page query params', () => {
		const meta = buildPaginationMeta(URL_BASE, 25, 10, 2);

		expect(meta._links.self.href).toBe('https://example.com/api/profiles?limit=10&page=2');
		expect(meta._links.first.href).toBe('https://example.com/api/profiles?limit=10&page=1');
		expect(meta._links.last.href).toBe('https://example.com/api/profiles?limit=10&page=3');
	});
});
