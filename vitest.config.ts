import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		globals: true,
		coverage: { reporter: ['text', 'lcov'] },
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.toml' }
			}
		}
	}
});
