import type { OpenAPIHono } from '@hono/zod-openapi';
import type { EventLog } from '../routes/event-log/validation.ts';
import type { Profile } from '../routes/profile/validation.ts';
import type { Team } from '../routes/team/validation.ts';
import type { PaginatedResponse } from '../utils/responses.ts';

type TeamMember = Pick<Profile, 'avatar' | 'id' | 'name'>;

async function getProfiles(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext) {
	const results: Profile[] = [];

	let page = 1;
	let lastJson: PaginatedResponse<Profile[]>;
	do {
		const response = await app.request(`/api/profiles?page=${page}`, { method: 'GET' }, env, context);
		lastJson = await response.json() as PaginatedResponse<Profile[]>;

		results.push(...lastJson.data);
		page++;
	} while (lastJson.currentPage !== lastJson.lastPage);

	return results;
}

async function getTeams(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext) {
	const results: Team[] = [];

	let page = 1;
	let lastJson: PaginatedResponse<Team[]>;
	do {
		const response = await app.request(`/api/teams?page=${page}`, { method: 'GET' }, env, context);
		lastJson = await response.json() as PaginatedResponse<Team[]>;

		results.push(...lastJson.data);
		page++;
	} while (lastJson.currentPage !== lastJson.lastPage);

	return results;
}

async function getTeamMembers(app: OpenAPIHono<EnvironmentBindings>, env: Env, context: ExecutionContext, teams: Team[]) {
	const results: { teamId: string, members: TeamMember[] }[] = [];

	for (const team of teams) {
		const teamMembers: TeamMember[] = [];

		let page = 1;
		let lastJson: PaginatedResponse<TeamMember[]>;
		do {
			const response = await app.request(`/api/teams/${team.id}/members?page=${page}`, { method: 'GET' }, env, context);
			lastJson = await response.json() as PaginatedResponse<TeamMember[]>;

			teamMembers.push(...lastJson.data);
			page++;
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
	// Issue: https://github.com/torontojs/communityhub/issues/152
	return Promise.resolve([] as EventLog[]);
}

async function uploadFile(_env: Env, path: string, _data: string) {
	// TODO: Re-enable when R2 is configured or Re-write for a different storage
	// const textEncoder = new TextEncoder();
	// const dataBuffer = textEncoder.encode(data);
	// const hash = await crypto.subtle.digest('SHA-1', dataBuffer);
	// const result = await env.ExportedFiles.put(path, data, { sha1: hash });

	const result = await Promise.resolve(null);

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
		await uploadFile(env, `/teams/${team.id}.json`, JSON.stringify(team));
	}

	for (const log of eventLogs) {
		await uploadFile(env, `/event-logs/${log.id}.json`, JSON.stringify(log));
	}
}
