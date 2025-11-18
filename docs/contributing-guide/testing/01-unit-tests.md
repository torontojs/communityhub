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

We use [`vitest`](https://vitest.dev/guide/) to run tests. It’s fast and works well with Cloudflare Workers.

To run all tests:

```shell
npm test
```

Vitest will show which tests passed or failed. If a test fails, it tells you what was expected and what actually happened.

On Success:

```text
? src/math.spec.ts (3 tests)
? test/session.worker.test.ts (2 tests)
? test/r2.worker.test.ts (1 test)

Test Files  3 passed (3)
Tests       6 passed (6)
Start time  11:23:45
Duration    1.42s
```

## Principles

These principles define how we approach unit testing for our Workers-based services.

1. **No mocking**

   Instead of faking KV, D1, or R2, we use the real Workers testing environment.

   Why?
   - Mocks often behave differently than the real platform.
   - They can hide bugs.
   - Tests that use real storage are more trustworthy.

   Each test runs with its own isolated storage, so tests don’t affect each other.

2. **Do not test Zod/validators**

   We use libraries like Zod for validation. These libraries already have their own tests.

   So we don’t waste time checking every wrong input.

   Instead, we focus our tests on what happens after validation succeeds.

3. **Types from schemas**

   We get TypeScript types directly from Zod schemas using `z.infer<typeof Schema>`. Use Pick, Omit, or Partial when necessary.

   This keeps the types match what the runtime expects.

4. **Focus on post-validation logic**

   Once a request passes validation, the important questions are:
   - What does the code return?
   - What does it write to KV, D1, or R2?
   - What rules or checks does it enforce?

   We focus our unit tests on this part.

5. **Tests must be repeatable**

   Running the same test many times should always give the same result.

   This means:
   - No shared state between tests
   - No depending on real time unless controlled
   - No tests that depend on other tests

   Flaky tests waste everyone’s time, so we avoid them.

## Testing Simple Functions

Pure functions (no side effects) are the easiest to test. For example:

```ts
// src/math.ts
export function clamp(n: number, lo: number, hi: number) {
	if (Number.isNaN(n)) {
		throw new TypeError('n must be a number');
	}

	return Math.min(hi, Math.max(lo, n));
}
```

A good test tries several realistic examples:

```ts
// tests/math.spec.ts
describe('clamp()', () => {
	it('keeps numbers inside the limit', () => {
		expect(clamp(3, 0, 5)).toBe(3);
	});

	it('clips numbers too high or low', () => {
		expect(clamp(99, -5, 5)).toBe(5);
	});

	it('throws for NaN', () => {
		expect(() => clamp(NaN, 0, 1)).toThrow();
	});
});
```

Each test has a description about what should happen.

## Testing Workers Code with Real Side Effects

Many parts of our code talk to KV, D1, R2, or cookies. These aren’t pure functions, but we can still test them easily using the Workers test runtime.

The general pattern is:

1. Call the Worker the way a real client would.
2. Check the HTTP response.
3. Check that the side effects happened.

### Example: Sessions (Cookie + KV + D1)

A common session test:

1. Call the /api/session endpoint.
2. Check that the Worker sets a cookie.
3. Look up the session in KV.
4. Check that D1 got a matching audit entry.

For code with real side effects (cookies, KV, D1, etc.), we still want the tests to **tell a story** rather than look like a grab bag of low-level operations.

A common pattern in this codebase is:

> When you want to create a new session cookie, you:
>
> 1. Call the session endpoint.
> 2. Assert on the HTTP shape (status + `Set-Cookie` header).
> 3. Verify the side effects in KV and D1.

Because this pattern shows up in multiple tests, it's worth extracting the "create a session and give me the cookie/SID" flow into a small utility. That utility can then have its **own** tests, so higher-level tests don't need to re-assert its behavior over and over.

```ts
// test/session.worker.test.ts
import { env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('Session lifecycle', () => {
	it('creates session: writes KV, inserts D1, sets cookie', async () => {
		const res = await app.request(
			'/api/session',
			{ method: 'POST', body: JSON.stringify({ userId: 'u1' }) },
			env
		);
		expect(res.status).toBe(204);

		const setCookie = res.headers.get('set-cookie');
		expect(setCookie).toContain('sid=');
		const sid = /sid=([^;]+)/.exec(setCookie!)![1];

		// KV side-effect present
		const kv = await env.SESSIONS.get(`sid:${sid}`, 'json');
		expect(kv).toEqual({ userId: 'u1' });

		// D1 side-effect present
		const row = await env.Database.prepare(
			'SELECT COUNT(*) as c FROM audit WHERE sid = ? AND userId = ?'
		)
			.bind(sid, 'u1')
			.first<{ c: number }>();
		expect(row?.c).toBe(1);
	});

	it('reads session via cookie', async () => {
		// Create
		const created = await app.request(
			'/api/session',
			{ method: 'POST', body: JSON.stringify({ userId: 'u2' }) },
			env
		);
		const cookie = created.headers.get('set-cookie')!;

		// Read
		const res = await app.request('/api/session', { headers: { cookie } }, env);
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ userId: 'u2' });
	});
});
```

### Example: R2 Writes

If an endpoint stores bytes in R2:

1. Send it some data.
2. Check the HTTP status.
3. Read the data back from R2.
4. Make sure it matches.

When an endpoint writes to R2, the interesting behavior isn't just returns 201. It's the bytes you send actually end up stored under the key you expect.

The pattern we use is:

> When you want to verify an R2 write:
>
> 1. Call the R2-backed endpoint with a known payload.
> 2. Assert on the HTTP contract (status code, etc.).
> 3. Assert that the object in R2 exists and has the expected contents.

If this pattern shows up in multiple tests (with different keys/payloads), the R2 read-back logic can be extracted into a small helper with its own tests, so the individual tests stay focused on _behavior_ rather than plumbing.

```ts
// test/r2.worker.test.ts
import { env } from 'cloudflare:test';
import { expect, it } from 'vitest';
import app from '../src/app';

it('stores bytes in R2', async () => {
	const payload = new TextEncoder().encode('hello');
	const res = await app.request(
		'/api/files/greeting.txt',
		{ method: 'PUT', body: payload },
		env
	);
	expect(res.status).toBe(201);

	// Assert side-effect in R2
	const obj = await env.FILES.get('greeting.txt');
	expect(await obj?.text()).toBe('hello');
});
```

### Example: Small Database Helpers

If you write a DB helper like for `SELECT` or `INSERT`:

1. Start with a table.
2. Insert a row.
3. Call the helper.
4. Check that it returns the correct count.

When you add a small DB helper like `countAudit`, the interesting behavior isnt just that it "returns a number". Its that the helper expresses a specific query once and reliably reports the count for whatever rows are currently in the table.

The pattern we use is:

> When you want to test a DB helper that wraps a query:
>
> 1. Start from a known database state (clear or seed the relevant table).
> 2. Seed rows directly via SQL so the setup is explicit and easy to reason about.
> 3. Call the helper under test.
> 4. Assert that the helper returns the value implied by the rows you inserted.

```ts
// src/db.ts
import type { Bindings } from './app';

export async function countAudit(env: Bindings['Database']) {
	return (
		(
			await env
				.prepare('SELECT COUNT(*) as c FROM audit')
				.first<{ c: number }>()
		)?.c ?? 0
	);
}
```

```ts
import { env } from 'cloudflare:test';
import { expect, it } from 'vitest';
import { countAudit } from '../src/db';

it('counts audit rows', async () => {
	const c0 = await countAudit(env.Database);
	// Seed one audit row via API
	await (
		await fetch('http://localhost', {
			method: 'POST',
			body: JSON.stringify({ userId: 'seed' })
		})
	).body?.cancel(); // placeholder
	await env.Database.prepare('INSERT INTO audit (sid, userId) VALUES (?, ?)')
		.bind('s1', 'u1')
		.run();
	const c1 = await countAudit(env.Database);
	expect(c1).toBe(c0 + 1);
});
```

## Workers side effect tests with Hono OpenAPI

If the Worker uses Hono with OpenAPI, we test two things:

1. The OpenAPI Document Loads

   We check that /openapi returns the expected JSON with things like:
   - The API name
   - The server URLs

2. The Documented Routes Work for Real

   For a route described in OpenAPI, we:

   1. Call it like a real client.
   2. Check the response.
   3. Check the actual KV/D1/R2 side effects.

This makes sure the description and the behavior match.

```ts
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
		const res = await app.request(
			'/api/session',
			{ method: 'POST', body: JSON.stringify({ userId: 'u42' }) },
			env
		);
		expect(res.status).toBe(204);

		const cookie = res.headers.get('set-cookie')!;
		const sid = /sid=([^;]+)/.exec(cookie)![1];

		// Side-effects exist
		const kv = await env.SESSIONS.get(`sid:${sid}`, 'json');
		expect(kv).toEqual({ userId: 'u42' });

		const row = await env.Database.prepare(
			'SELECT COUNT(*) as c FROM audit WHERE sid=?'
		)
			.bind(sid)
			.first<{ c: number }>();
		expect(row?.c).toBe(1);
	});
});
```

## References

- Recipes index (examples for KV/R2/Cache, D1, Durable Objects, Queues, outbound request mocks, etc.): https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/
- Vitest guide & recipes: https://vitest.dev/guide/recipes
