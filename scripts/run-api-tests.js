import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const hurlArgs = [
	'--continue-on-error',
	'--jobs',
	'1',
	'--max-time',
	'300',
	'--test',
	'--variables-file',
	'.dev.vars',
	'--variables-file',
	'.api-test.vars',
	...process.argv.slice(2)
];

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const command = isGitHubActions ? 'docker' : process.execPath;
const args = isGitHubActions
	? [
		'run',
		'--rm',
		'--network',
		'host',
		'--volume',
		`${process.cwd()}:/workspace`,
		'--workdir',
		'/workspace',
		'ghcr.io/orange-opensource/hurl:7.1.0',
		...hurlArgs
	]
	: [resolve('node_modules/@orangeopensource/hurl/hurl.js'), ...hurlArgs];

const result = spawnSync(command, args, { stdio: 'inherit' });

if (result.error) {
	console.error(`Failed to start ${command}: ${result.error.message}`);
	process.exitCode = 1;
} else {
	process.exitCode = result.status ?? 1;
}
