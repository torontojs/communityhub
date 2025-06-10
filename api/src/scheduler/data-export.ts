import type { OpenAPIHono } from '@hono/zod-openapi';
import type { EventLog } from '../routes/event-log/validation.ts';
import type { Profile } from '../routes/profile/validation.ts';
import type { Team } from '../routes/team/validation.ts';
import type { PaginatedResponse } from '../utils/responses.ts';

type TeamMember = Pick<Profile, 'avatar' | 'id' | 'name'>;

async function getProfiles(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext) {
	const results: Profile[] = [];

	let lastJson: PaginatedResponse<Profile[]>;
	do {
		const response = await app.request('/api/profiles', { method: 'GET' }, env, context);
		lastJson = await response.json() as PaginatedResponse<Profile[]>;

		results.push(...lastJson.data);
	} while (lastJson.currentPage !== lastJson.lastPage);

	return results;
}

async function getTeams(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext) {
	const results: Team[] = [];

	let lastJson: PaginatedResponse<Team[]>;
	do {
		const response = await app.request('/api/teams', { method: 'GET' }, env, context);
		lastJson = await response.json() as PaginatedResponse<Team[]>;

		results.push(...lastJson.data);
	} while (lastJson.currentPage !== lastJson.lastPage);

	return results;
}

async function getTeamMembers(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext, teams: Team[]) {
	const results: { teamId: string, members: TeamMember[] }[] = [];

	for (const team of teams) {
		const teamMembers: TeamMember[] = [];

		let lastJson: PaginatedResponse<TeamMember[]>;
		do {
			const response = await app.request(`/api/teams/${team.id}/members`, { method: 'GET' }, env, context);
			lastJson = await response.json() as PaginatedResponse<TeamMember[]>;

			teamMembers.push(...lastJson.data);
		} while (lastJson.currentPage !== lastJson.lastPage);

		results.push({
			teamId: team.id,
			members: teamMembers
		});
	}

	return results;
}

async function getEventLog(_app: OpenAPIHono<EnvironmentBindings>, _env: Env, _context: ExecutionContext) {
	// TODO: implement when we have endpoints for event logs
	return Promise.resolve([] as EventLog[]);
}

async function uploadFile(env: Env, path: string, data: string) {
	const textEncoder = new TextEncoder();
	const dataBuffer = textEncoder.encode(data);
	const hash = await crypto.subtle.digest('SHA-1', dataBuffer);
	const result = await env.ExportedFiles.put(path, data, { sha1: hash });

	if (!result) {
		throw new Error(`File not uploaded: ${path}`);
	}

	return result;
}

export async function exportData(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext) {
	const profiles = await getProfiles(app, env, context);
	const teams = await getTeams(app, env, context);
	const teamMembers = await getTeamMembers(app, env, context, teams);
	const eventLogs = await getEventLog(app, env, context);

	const profilesDirectory = profiles.map(({ id, name }) => ({
		id,
		name,
		file: `profiles/${id}.json`
	}));

	const teamsDirectory = teams.map(({ id, name }) => ({
		id,
		name,
		file: `teams/${id}.json`
	}));

	await uploadFile(env, '/profiles-directory.json', JSON.stringify(profilesDirectory));
	await uploadFile(env, '/teams-directory.json', JSON.stringify(teamsDirectory));
	await uploadFile(env, '/teams-members.json', JSON.stringify(teamMembers));

	for (const profile of profiles) {
		await uploadFile(env, `/profiles/${profile.id}.json`, JSON.stringify(profile));
	}

	for (const team of teams) {
		await uploadFile(env, `/profiles/${team.id}.json`, JSON.stringify(team));
	}

	for (const log of eventLogs) {
		await uploadFile(env, `/profiles/${log.id}.json`, JSON.stringify(log));
	}
}
