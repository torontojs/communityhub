/* eslint-disable @typescript-eslint/consistent-type-imports */

interface EnvironmentBindings {
	Bindings: Cloudflare.Env;

	Variables: {
		session: import('./utils/auth.ts').SessionData
	};
}

type ISODate = string;
