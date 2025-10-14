import { defineWorkersConfig, readD1Migrations } from '@cloudflare/vitest-pool-workers/config';
import fs from 'node:fs';
import path from 'node:path';

export default defineWorkersConfig(async () => {
	const migrationsPath = path.join(process.cwd(), 'db/migrations');
	const migrations = await readD1Migrations(migrationsPath);

	const rawSeedSql = fs.readFileSync(path.join(process.cwd(), 'db/seeds/seed-data.sql'), 'utf8');
	const seedSql = rawSeedSql.split('\n').filter((line) => !line.trim().startsWith('--')).join('\n').replace(/\n/g, ' ');

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
