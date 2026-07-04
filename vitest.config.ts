import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';
import { configDefaults } from 'vitest/config';
import { migrations, seedSql } from './db/seeds/seedSql';

export default defineWorkersConfig({
	test: {
		exclude: [...configDefaults.exclude, 'tests/e2e/**'],
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
