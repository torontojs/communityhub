import { defineWorkersConfig, readD1Migrations } from '@cloudflare/vitest-pool-workers/config';
import fs from 'node:fs';
import path from 'node:path';

export default defineWorkersConfig(async () => {
	const migrationsPath = path.join(process.cwd(), 'db/migrations');
	const migrations = await readD1Migrations(migrationsPath);

	const seedSql = fs.readFileSync(path.join(process.cwd(), 'db/seeds/seed-data-no-comment.sql'), 'utf8');
	return {
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
	};
});
