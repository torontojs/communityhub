# Unit tests

## Concepts

Unit tests test out a function or "unit of code" to ensure it is doign what is expected from it. It works by executing the code with a given input and verifying if the output is expected or not.

Unit tests should test for potential scenarios and not only for the "good case". You should throw unexpected values to a function and check it's behaviour.

E.g.:

> If the function expects a `number` as input, how it handles those cases:
>
> - An integer.
> - A floating point number.
> - `+0` and `-0`
> - Negative numbers.
> - `Number.MAX_SAFE_INT`
> - `Number.MAX_SAFE_INT + 1`
> - `Infinity`
> - `-Infinity`

## Tools

For unit testing we use [`vitest`](https://vitest.dev/guide/), to run the unit tests simply run the command:

```shell
npm test
```

## Principles

1. **No mocking**
   - Use the real Workers test runtime (D1, KV, R2, timers). Storage is isolated per test.
2. **Do not test Zod/validators**
   - Validation libraries are well-tested. Avoid re-testing them.
3. **Types from schemas**
   - Derive types with `z.infer<typeof Schema>` (or Valibot/TypeBox equivalents). Use `Pick`/`Omit`/`Partial` when necessary.
4. **Focus on post-validation logic**
   - Validation problems are already caught by Hurl/API tests. Unit tests assert business logic and side effects **after** validation.

## Writing classic unit tests

A "pure" function example (no side effects):

```ts
// src/math.ts
export function clamp(n: number, lo: number, hi: number) {
	if (Number.isNaN(n)) {
		throw new TypeError('n must be a number');
	}

	return Math.min(hi, Math.max(lo, n));
}
```

```ts
// tests/math.spec.ts
import { describe, expect, it } from 'vitest';
import { clamp } from '../src/math';

describe('clamp()', () => {
	it('handles integers, floats, +0 and -0', () => {
		expect(clamp(3, 0, 5)).toBe(3);
		expect(clamp(3.3, 0, 5)).toBe(3.3);
		expect(Object.is(clamp(+0, -1, 1), +0)).toBe(true);
		expect(Object.is(clamp(-0, -1, 1), -0)).toBe(true);
	});

	it('clips at bounds and negatives', () => {
		expect(clamp(-10, -5, 5)).toBe(-5);
		expect(clamp(99, -5, 5)).toBe(5);
	});

	it('handles big and special values', () => {
		expect(clamp(Number.MAX_SAFE_INTEGER + 1, 0, Number.MAX_SAFE_INTEGER))
			.toBe(Number.MAX_SAFE_INTEGER);
		expect(clamp(Infinity, 0, 1)).toBe(1);
		expect(() => clamp(NaN as any, 0, 1)).toThrow(/number/);
	});
});
```

## Tests that use real Workers runtime

### Test APIs & storage isolation

Vitest exposes bindings and helpers from `cloudflare:test`.

```ts
// test/setup.ts
import { env } from 'cloudflare:test';

// Example: ensure D1 schema exists before tests
export default async function() {
	await env.Database.prepare('CREATE TABLE IF NOT EXISTS audit (sid TEXT, userId TEXT)').run();
}
```

### Session lifecycle (Cookie + KV + D1)

```ts
// test/session.worker.test.ts
import { env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('Session lifecycle', () => {
	it('creates session: writes KV, inserts D1, sets cookie', async () => {
		const res = await app.request('/api/session', { method: 'POST', body: JSON.stringify({ userId: 'u1' }) }, env);
		expect(res.status).toBe(204);

		const setCookie = res.headers.get('set-cookie');
		expect(setCookie).toContain('sid=');
		const sid = /sid=([^;]+)/.exec(setCookie!)![1];

		// KV side-effect present
		const kv = await env.SESSIONS.get(`sid:${sid}`, 'json');
		expect(kv).toEqual({ userId: 'u1' });

		// D1 side-effect present
		const row = await env.Database.prepare('SELECT COUNT(*) as c FROM audit WHERE sid = ? AND userId = ?')
			.bind(sid, 'u1').first<{ c: number }>();
		expect(row?.c).toBe(1);
	});

	it('reads session via cookie', async () => {
		// Create
		const created = await app.request('/api/session', { method: 'POST', body: JSON.stringify({ userId: 'u2' }) }, env);
		const cookie = created.headers.get('set-cookie')!;

		// Read
		const res = await app.request('/api/session', { headers: { cookie } }, env);
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ userId: 'u2' });
	});
});
```

### R2: side effects

```ts
// test/r2.worker.test.ts
import { env } from 'cloudflare:test';
import { expect, it } from 'vitest';
import app from '../src/app';

it('stores bytes in R2', async () => {
	const payload = new TextEncoder().encode('hello');
	const res = await app.request('/api/files/greeting.txt', { method: 'PUT', body: payload }, env);
	expect(res.status).toBe(201);

	// Assert side-effect in R2
	const obj = await env.FILES.get('greeting.txt');
	expect(await obj?.text()).toBe('hello');
});
```

### DB helper functions

```ts
// src/db.ts
import type { Bindings } from './app';

export async function countAudit(env: Bindings['DB']) {
	return (await env.prepare('SELECT COUNT(*) as c FROM audit').first<{ c: number }>())?.c ?? 0;
}
```

```ts
// test/db.worker.test.ts
import { env } from 'cloudflare:test';
import { expect, it } from 'vitest';
import { countAudit } from '../src/db';

it('counts audit rows', async () => {
	const c0 = await countAudit(env.Database);
	// Seed one audit row via API
	await (await fetch('http://dummy', { method: 'POST', body: JSON.stringify({ userId: 'seed' }) })).body?.cancel(); // placeholder
	await env.Database.prepare('INSERT INTO audit (sid, userId) VALUES (?, ?)').bind('s1', 'u1').run();
	const c1 = await countAudit(env.Database);
	expect(c1).toBe(c0 + 1);
});
```

> Note: Each test runs with **isolated storage** (enabled by default). Writes are undone after the test, so ordering is reliable.

---

## Workers side effect tests with Hono OpenAPI

These tests verify that:

1. The OpenAPI document endpoint responds and contains expected metadata.
2. Endpoints **perform side effects** against KV/D1/R2 and return the expected HTTP contract defined in OpenAPI.

```ts
// test/openapi.worker.test.ts
import { env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('OpenAPI & side-effects', () => {
	it('serves OpenAPI JSON', async () => {
		const res = await app.request('/openapi', {}, env);
		expect(res.status).toBe(200);
		const doc = await res.json();
		expect(doc.info.title).toBe('VMS API');
		expect(Array.isArray(doc.servers)).toBe(true);
	});

	it('OpenAPI-documented route performs KV & D1 side-effects', async () => {
		const res = await app.request('/api/session', { method: 'POST', body: JSON.stringify({ userId: 'u42' }) }, env);
		expect(res.status).toBe(204);

		const cookie = res.headers.get('set-cookie')!;
		const sid = /sid=([^;]+)/.exec(cookie)![1];

		// Side-effects exist
		const kv = await env.SESSIONS.get(`sid:${sid}`, 'json');
		expect(kv).toEqual({ userId: 'u42' });

		const row = await env.Database.prepare('SELECT COUNT(*) as c FROM audit WHERE sid=?').bind(sid).first<{ c: number }>();
		expect(row?.c).toBe(1);
	});
});
```

> We do **not** unit test validators themselves; Hurl or integration tests already ensure payload mismatches return 4xx.

## References

- Recipes index (examples for KV/R2/Cache, D1, Durable Objects, Queues, outbound request mocks, etc.): https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/
- Vitest guide & recipes: https://vitest.dev/guide/recipes
