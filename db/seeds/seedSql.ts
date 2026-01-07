import { readD1Migrations } from '@cloudflare/vitest-pool-workers/config';
import fs from 'node:fs';
import path from 'node:path';

const migrationsPath = path.join(process.cwd(), 'db/migrations');
const migrations = await readD1Migrations(migrationsPath);

const rawSeedSql = fs.readFileSync(path.join(process.cwd(), 'db/seeds/seed-data.sql'), 'utf8');
const seedSql = rawSeedSql.split('\n').filter((line) => !line.trim().startsWith('--')).join('');

export { migrations, seedSql };
