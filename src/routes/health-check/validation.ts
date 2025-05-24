import type { Context } from 'hono';

// NOTE: please update the schema of new environment variables here
type IgnoredVariables = 'ActivationTokens' | 'Assets' | 'Database' | 'SessionTokens';
const ignoredVariables: readonly (keyof Pick<Cloudflare.Env, IgnoredVariables>)[] = [
	'ActivationTokens',
	'Assets',
	'Database',
	'SessionTokens'
] as const;

const requiredVariables: readonly [...(keyof Omit<Cloudflare.Env, IgnoredVariables>)[]] = [
	'NODE_ENV',
	'RESEND_API_KEY',
	'SENDER_EMAIL'
] as const;

const optionalVariables: readonly [...(keyof Omit<Cloudflare.Env, IgnoredVariables>)[]] = [
	'ARE_EMAILS_LOCAL_ONLY'
] as const;

export function checkEnvVars(env: Context<EnvironmentBindings>['env']) {
	const envVars = Object.keys(env);
	const missingVars = requiredVariables.filter((variable) => !envVars.includes(variable));
	const missingOptionalVars = optionalVariables.filter((variable) => !envVars.includes(variable));
	const extraVars = envVars.filter((variable) =>
		!requiredVariables.includes(variable as typeof requiredVariables[number])
		&& !optionalVariables.includes(variable as typeof optionalVariables[number])
		&& !ignoredVariables.includes(variable as typeof ignoredVariables[number])
	);

	return {
		warnings: [
			...missingOptionalVars.map((envVar) => ({
				message: '⚠️ Optional variable not set.',
				variable: envVar
			})),
			...extraVars.map((envVar) => ({
				message: '🤷 This variable may not be in use.',
				variable: envVar
			}))
		],
		errors: missingVars.map((envVar) => ({
			envVar,
			message: 'Variable not set'
		}))
	};
}
