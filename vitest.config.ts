import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';
import { migrations, seedSql } from './db/seeds/seedSql';

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.toml' },
				miniflare: {
					bindings: {
						TEST_MIGRATIONS: migrations,
						SEED_SQL: seedSql
					}
				}
			}
		},
		coverage: { reporter: ['text', 'lcov'] }
	}
});
