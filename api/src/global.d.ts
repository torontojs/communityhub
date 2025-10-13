/* eslint-disable @typescript-eslint/consistent-type-imports */

export interface EnvironmentBindings {
	Bindings: Cloudflare.Env;

	Variables: {
		session: import('./utils/auth.ts').SessionData
	};
}

declare module 'cloudflare:test' {
	// ProvidedEnv controls the type of `import("cloudflare:test").env`
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface ProvidedEnv extends Env {}
}

type ISODate = string;
