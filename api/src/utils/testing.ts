/* eslint-disable camelcase */

interface DatabaseMocks {
	run?<T>(): T[];
	first?<T>(): T;
	batch?<T>(): T[][];
	all?<T>(): T[];
}

interface KVMocks {
	get?<T>(): T;
	list?<T>(): T[];
}

interface MockConstructorParams {
	database?: DatabaseMocks;
	sessions?: KVMocks;
	activations?: KVMocks;
}

export class MockEnvBindings {
	Database = undefined as unknown as D1Database;
	Assets = undefined as unknown as Fetcher;
	SessionTokens = undefined as unknown as KVNamespace;
	ActivationTokens = undefined as unknown as KVNamespace;

	constructor({ database, activations, sessions }: MockConstructorParams = {}) {
		this.setDatabase(database);
		this.setKV('ActivationTokens', activations);
		this.setKV('SessionTokens', sessions);
		this.setAssets();
	}

	setDatabase({ run, first, batch, all }: DatabaseMocks = {}) {
		const resultsBase: D1Response = {
			success: true,
			meta: {
				duration: 0,
				size_after: 0,
				rows_read: 0,
				rows_written: 0,
				last_row_id: 0,
				changed_db: true,
				changes: 0
			}
		};

		const preparedStatement: D1PreparedStatement = {
			bind: (..._values: unknown[]) => preparedStatement,
			first: async (_colName?: string) => Promise.resolve(first?.() ?? null),
			run: async () =>
				Promise.resolve({
					...resultsBase,
					results: (run?.() ?? [])
				}),
			all: async () =>
				Promise.resolve({
					...resultsBase,
					results: (all?.() ?? [])
				}),
			raw: async (_options?: { columnNames?: boolean }) => Promise.resolve([[]])
		};

		this.Database = {
			prepare: () => preparedStatement,
			batch: async <T>() =>
				Promise.resolve(
					(batch?.() ?? []).map((result) => ({
						...resultsBase,
						results: result as T[]
					}))
				),
			exec: async () =>
				Promise.resolve({
					count: 0,
					duration: 0
				}),
			withSession: () => ({
				prepare: () => preparedStatement,
				batch: async <T>() =>
					Promise.resolve(
						(batch?.() ?? []).map((result) => ({
							...resultsBase,
							results: result as T[]
						}))
					),
				getBookmark: () => null
			}),
			dump: async () => Promise.resolve(new ArrayBuffer(0))
		};
	}

	setKV(namespace: 'ActivationTokens' | 'SessionTokens', { get, list }: KVMocks = {}) {
		this[namespace] = {
			get: async <T>() => Promise.resolve((get?.() ?? null) as T),
			// @ts-expect-error
			getWithMetadata: async () =>
				Promise.resolve({
					value: null,
					metadata: null,
					cacheStatus: null
				}),
			list: async () =>
				Promise.resolve({
					list_complete: true,
					keys: (list?.() ?? []),
					cacheStatus: null
				}),
			put: async () => Promise.resolve(),
			delete: async () => Promise.resolve()
		};
	}

	setAssets() {
		const socket: Socket = {
			readable: new ReadableStream(),
			writable: new WritableStream(),
			closed: Promise.resolve(),
			opened: Promise.resolve({}),
			close: async () => Promise.resolve(),
			startTls: () => socket,
			upgraded: true,
			secureTransport: 'on'
		};

		this.Assets = {
			fetch: async () => Promise.resolve(new Response()),
			// @ts-expect-error
			connect: async () => Promise.resolve(socket)
		};
	}
}
