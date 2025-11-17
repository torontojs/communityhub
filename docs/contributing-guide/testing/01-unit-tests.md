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

For unit testing we use vitest, a fast test runner that integrates well with Vite and the Cloudflare Workers runtime. The `npm test` script is a thin wrapper around Vitest; it runs the full test suite in Node using the configuration in this repo.

```shell
npm test
```

On success, you should see output similar to:

```text
? src/math.spec.ts (3 tests)
? test/session.worker.test.ts (2 tests)
? test/r2.worker.test.ts (1 test)

Test Files  3 passed (3)
Tests       6 passed (6)
Start time  11:23:45
Duration    1.42s
```

If any test fails, Vitest will:

- Print the failing test name and file.
- Show the expected vs. received values.
- Exit with a non-zero status code so CI can detect the failure.

## Principles

These principles define how we approach unit testing for our Workers-based services.

1. **No mocking**

Use the real Workers test runtime (D1, KV, R2, timers). Storage is isolated per test.

Why: Mocks can drift from real platform behaviour and hide subtle integration issues. By exercising the actual runtime and its storage primitives, tests more accurately reflect production and catch bugs that only appear in real environments.

2. **Do not test Zod/validators**

Validation libraries are well-tested. Avoid re-testing them.

Why: Testing library code is redundant and adds noise to the test suite. We expect library authors to test their own code, so our tests should not duplicate that work. Instead, tests should focus on our business logic and side effects after validation has already succeeded or failed.

3. **Types from schemas**

Derive types with `z.infer<typeof Schema>`. Use Pick, Omit, or Partial when necessary.

Why: Deriving types from schemas keeps runtime validation and TypeScript types in sync. This reduces the risk of drift between what the schema enforces and what the types claim, making tests (and implementation code) safer and easier to maintain.

4. **Focus on post-validation logic**

Unit tests should assert business logic and side effects after validation. We do not unit test validators themselves; Hurl or integration tests already ensure payload mismatches return 4xx.

Why: Validation problems are already caught by higher-level tests (e.g. Hurl/API tests). Re-testing every invalid input path at the unit level leads to slow, noisy tests with little extra value. Focusing on post-validation logic keeps unit tests tight and makes failures more directly tied to business rules.

5. **Tests must be repeatable**

Running the same test multiple times should yield the same result.

Why: If a test produces different results across runs, you cannot reliably compare the state before and after a code change to know whether a failure was introduced by the new code. Repeatable tests avoid flakiness and make it clear when a change has actually broken behaviour, rather than exposing randomness, clock drift, or shared-state issues.

## Writing classic unit tests

When you're testing a pure function (one that has no side effects and always returns the same output for the same input), the tests can focus entirely on inputs and outputs. The descriptions of the tests themselves should explain the scenario and why the test is doing what it does, instead of relying on a vague comment like // has side effects or // edge case.

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
		expect(clamp(Number.MAX_SAFE_INTEGER + 1, 0, Number.MAX_SAFE_INTEGER)).toBe(
			Number.MAX_SAFE_INTEGER
		);
		expect(clamp(Infinity, 0, 1)).toBe(1);
		expect(() => clamp(NaN as any, 0, 1)).toThrow(/number/);
	});
});
```

## Tests that use real Workers runtime

### Session lifecycle (Cookie + KV + D1)

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

### R2: side effects

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

### DB helper functions

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

> Note: Each test runs with **isolated storage** (enabled by default). Writes are undone after the test, so ordering is reliable.

## Workers side effect tests with Hono OpenAPI

When you wire up Hono's OpenAPI support, there are _two_ big things you want to be confident about:

1. The generated OpenAPI document is actually being served and contains the metadata clients rely on (title, servers, etc.).
2. The endpoints described in that document really **perform their side effects** (KV/D1/R2) and honor the HTTP contract the spec promises.

The pattern we use is:

> When you want to test a Hono + OpenAPI Worker:
>
> 1. Call the `/openapi` endpoint and assert that the document is served and shaped as expected.
> 2. For a documented route, call it the way a client would (method, body, headers).
> 3. Assert that the HTTP contract matches the OpenAPI definition (status, headers, response shape).
> 4. Assert that the externally visible side effects (KV, D1, R2) actually happened.

If this pattern shows up in multiple tests, cookie parsing or side-effect checks can be extracted into small helpers with their **own** tests  keeping these contract tests focused on behavior instead of plumbing.

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
