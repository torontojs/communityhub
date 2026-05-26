/* eslint-disable @typescript-eslint/consistent-type-imports */

interface EnvironmentBindings {
	Bindings: Cloudflare.Env;

	Variables: {
		session: import('./utils/auth.ts').SessionData
	};
}

declare module 'cloudflare:test' {
	// ProvidedEnv controls the type of `import("cloudflare:test").env`

	interface ProvidedEnv extends Env {
		TEST_MIGRATIONS: D1Migration[];
		SEED_SQL: string;
	}
}

type ISODate = string;
