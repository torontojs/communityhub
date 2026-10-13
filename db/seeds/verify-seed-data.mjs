import { pbkdf2Sync, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';

const PBKDF2_ITERATIONS = 100000;
const DERIVED_KEY_LENGTH = 64;
const PBKDF2_DIGEST = 'sha512';

const users = JSON.parse(readFileSync('db/seeds/data/users-seed.json', 'utf8'));
const seedSql = readFileSync('db/seeds/seed-data.sql', 'utf8');
const apiTestVariables = readFileSync('.api-test.vars', 'utf8');
const qaTestPlan = readFileSync('docs/mvp-test/qa-test-plan.md', 'utf8');

function fail(message) {
	throw new Error(`Seed credential verification failed: ${message}`);
}

function validatePassword(password, passwordHash, email) {
	const [saltBase64, expectedKeyBase64, ...extraParts] = passwordHash.split(':');
	if (!saltBase64 || !expectedKeyBase64 || extraParts.length > 0) {
		fail(`invalid password hash for ${email}`);
	}

	const actualKey = pbkdf2Sync(
		password,
		Buffer.from(saltBase64, 'base64'),
		PBKDF2_ITERATIONS,
		DERIVED_KEY_LENGTH,
		PBKDF2_DIGEST
	);
	const expectedKey = Buffer.from(expectedKeyBase64, 'base64');

	if (actualKey.length !== expectedKey.length || !timingSafeEqual(actualKey, expectedKey)) {
		fail(`plaintext password does not match the hash for ${email}`);
	}
}

const sqlUserPattern =
	/-- #region User: (?<regionEmail>[^\n]+)[\s\S]*?-- Password: "(?<password>[^"]+)"[\s\S]*?INSERT INTO "access"[\s\S]*?VALUES \(\s*'(?<id>[^']+)', 1, '[^']+', '(?<passwordHash>[^']+)', '(?<email>[^']+)'/gu;
const sqlUsers = [...seedSql.matchAll(sqlUserPattern)].map(({ groups }) => groups);

if (sqlUsers.length !== users.length) {
	fail(`users-seed.json has ${users.length} users but seed-data.sql has ${sqlUsers.length}`);
}

const usersByEmail = new Map(users.map((user) => [user.email, user]));
const sqlUsersByEmail = new Map(sqlUsers.map((user) => [user.email, user]));

for (const user of users) {
	validatePassword(user.password, user.passwordHash, user.email);

	const sqlUser = sqlUsersByEmail.get(user.email);
	if (!sqlUser) {
		fail(`${user.email} is missing from seed-data.sql`);
	}

	for (const field of ['id', 'password', 'passwordHash']) {
		if (user[field] !== sqlUser[field]) {
			fail(`${field} differs between users-seed.json and seed-data.sql for ${user.email}`);
		}
	}
}

const variables = new Map(
	apiTestVariables
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#') && line.includes('='))
		.map((line) => {
			const separatorIndex = line.indexOf('=');
			const key = line.slice(0, separatorIndex);
			const value = line.slice(separatorIndex + 1).replace(/^"(.*)"$/u, '$1');
			return [key, value];
		})
);

for (const [key, email] of variables) {
	if (!key.endsWith('_email')) {
		continue;
	}

	const password = variables.get(`${key.slice(0, -'_email'.length)}_password`);
	if (!password) {
		continue;
	}

	const user = usersByEmail.get(email);
	if (!user) {
		fail(`${key} references ${email}, which is missing from users-seed.json`);
	}
	if (password !== user.password) {
		fail(`${key.replace(/_email$/u, '_password')} differs from users-seed.json`);
	}
}

const qaAccountsSection = qaTestPlan
	.split('## Pre-Seeded Test Accounts')[1]
	?.split('## Test Coverage Matrix')[0];
if (!qaAccountsSection) {
	fail('could not find the pre-seeded accounts table in the QA test plan');
}

const qaAccountPattern = /^\|[^|]+\|[^|]+\|\s*`(?<email>[^`]+)`\s*\|\s*`(?<password>[^`]+)`/gmu;
const qaAccounts = [...qaAccountsSection.matchAll(qaAccountPattern)].map(({ groups }) => groups);
if (qaAccounts.length === 0) {
	fail('the QA test plan does not contain any pre-seeded accounts');
}

for (const { email, password } of qaAccounts) {
	const user = usersByEmail.get(email);
	if (!user) {
		fail(`the QA test plan references ${email}, which is missing from users-seed.json`);
	}
	if (password !== user.password) {
		fail(`the QA test plan password differs from users-seed.json for ${email}`);
	}
}

console.log(`Verified ${users.length} seed users and ${qaAccounts.length} QA test accounts.`);
