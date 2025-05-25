import type { OpenAPIHono } from '@hono/zod-openapi';
import type { EventLog } from '../routes/event-log/validation.ts';
import type { Profile } from '../routes/profile/validation.ts';
import type { Team } from '../routes/team/validation.ts';
import type { PaginatedResponse } from '../utils/responses.ts';

// TODO: throttle requests to Github API
// https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
// 5000 requests per hour
// 100 concurrent requests
// 900 requests to the same endpoint per minute

type TeamMember = Pick<Profile, 'avatar' | 'id' | 'name'>;

interface DirectoryEntry {
	id: string;
	name: string;
	file: string;
}

interface ExportData {
	profiles: Profile[];
	profilesDirectory: DirectoryEntry[];
	teams: Team[];
	teamsDirectory: DirectoryEntry[];
	teamMembers: {
		teamId: string,
		members: TeamMember[]
	}[];
	eventLogs: EventLog[];
}

export class SchedulerHandler {
	// Cron expression tester/references:
	// https://crontab.cronhub.io/
	// https://developers.cloudflare.com/workers/configuration/cron-triggers/#supported-cron-expressions
	#cronExpressions = {
		everyDayAt02am: '0 2 * * *'
	} as const;

	#app: OpenAPIHono<EnvironmentBindings>;

	constructor(app: OpenAPIHono<EnvironmentBindings>) {
		this.#app = app;
	}

	async #getProfiles(env: Env, context: ExecutionContext) {
		const results: Profile[] = [];

		let lastJson: PaginatedResponse<Profile[]>;
		do {
			const response = await this.#app.request('/api/profiles', { method: 'GET' }, env, context);
			lastJson = await response.json() as PaginatedResponse<Profile[]>;

			results.push(...lastJson.data);
		} while (lastJson.currentPage !== lastJson.lastPage);

		return results;
	}

	async #getTeams(env: Env, context: ExecutionContext) {
		const results: Team[] = [];

		let lastJson: PaginatedResponse<Team[]>;
		do {
			const response = await this.#app.request('/api/teams', { method: 'GET' }, env, context);
			lastJson = await response.json() as PaginatedResponse<Team[]>;

			results.push(...lastJson.data);
		} while (lastJson.currentPage !== lastJson.lastPage);

		return results;
	}

	async #getTeamMembers(env: Env, context: ExecutionContext, teams: Team[]) {
		const results: { teamId: string, members: TeamMember[] }[] = [];

		for (const team of teams) {
			const teamMembers: TeamMember[] = [];

			let lastJson: PaginatedResponse<TeamMember[]>;
			do {
				const response = await this.#app.request(`/api/teams/${team.id}/members`, { method: 'GET' }, env, context);
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

	async #getEventLog() {
		// TODO: implement when we have endpoints for event logs
		return Promise.resolve([] as EventLog[]);
	}

	async #uploadFile(env: Env, fileContents: string) {
		const response = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/blobs`,
			{
				method: 'POST',
				body: JSON.stringify({
					content: fileContents,
					encoding: 'utf-8'
				})
			}
		);

		const json: { sha: string, url: string } = await response.json();

		return json.sha;
	}

	async #createTree(env: Env, data: ExportData) {
		const baseTreeResponse = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/trees/main`,
			{
				method: 'GET'
			}
		);

		const baseTreeJson: { sha: string } = await baseTreeResponse.json();
		const baseTreeSha = baseTreeJson.sha;

		const newTreeFiles: {
			path: string,
			mode: '100644',
			type: 'blob',
			sha: string
		}[] = [];

		await Promise.all([
			...data.profiles.map(async (item) => {
				const sha = await this.#uploadFile(env, JSON.stringify(item));

				newTreeFiles.push({
					path: `profiles/${item.id}.json`,
					mode: '100644',
					type: 'blob',
					sha
				});
			}),
			async () => {
				const sha = await this.#uploadFile(env, JSON.stringify(data.profilesDirectory));

				newTreeFiles.push({
					path: 'profiles-directory.json',
					mode: '100644',
					type: 'blob',
					sha
				});
			},
			...data.teams.map(async (item) => {
				const sha = await this.#uploadFile(env, JSON.stringify(item));

				newTreeFiles.push({
					path: `teams/${item.id}.json`,
					mode: '100644',
					type: 'blob',
					sha
				});
			}),
			async () => {
				const sha = await this.#uploadFile(env, JSON.stringify(data.teamsDirectory));

				newTreeFiles.push({
					path: 'teams-directory.json',
					mode: '100644',
					type: 'blob',
					sha
				});
			},
			async () => {
				const sha = await this.#uploadFile(env, JSON.stringify(data.teamMembers));

				newTreeFiles.push({
					path: 'team-members.json',
					mode: '100644',
					type: 'blob',
					sha
				});
			},
			async () => {
				const sha = await this.#uploadFile(env, JSON.stringify(data.eventLogs));

				newTreeFiles.push({
					path: 'event-logs.json',
					mode: '100644',
					type: 'blob',
					sha
				});
			}
		]);

		const newTreeResponse = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/trees`,
			{
				method: 'POST',
				body: JSON.stringify({
					tree: newTreeFiles,
					// eslint-disable-next-line camelcase
					base_tree: baseTreeSha
				})
			}
		);

		const newTreeJson: { sha: string } = await newTreeResponse.json();

		return newTreeJson.sha;
	}

	async #createCommit(env: Env, treeSha: string) {
		const headBranchResponse = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/refs/heads/main`,
			{
				method: 'GET'
			}
		);

		const headBranchJson: { object: { sha: string } } = await headBranchResponse.json();
		const headSha = headBranchJson.object.sha;

		const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
		const newCommitResponse = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/commits`,
			{
				method: 'POST',
				body: JSON.stringify({
					tree: treeSha,
					message: `data: Automated Update ${formatter.format(new Date())}`,
					parents: [headSha]
				})
			}
		);

		const newCommitJson: { sha: string } = await newCommitResponse.json();

		return newCommitJson.sha;
	}

	async #updateHeadRef(env: Env, newCommitSha: string) {
		const response = await fetch(
			`https://api.github.com/repos/${env.CRON_UPLOAD_USER}/${env.CRON_UPLOAD_REPO}/git/refs/heads/main`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					sha: newCommitSha
				})
			}
		);

		const json: { object: { sha: string } } = await response.json();

		if (json.object.sha !== newCommitSha) {
			throw new Error('Branch not updated on Github');
		}
	}

	async #exportData(env: Env, context: ExecutionContext) {
		const profiles = await this.#getProfiles(env, context);
		const teams = await this.#getTeams(env, context);
		const teamMembers = await this.#getTeamMembers(env, context, teams);
		const eventLogs = await this.#getEventLog();

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

		const treeSha = await this.#createTree(env, {
			profiles,
			profilesDirectory,
			teams,
			teamsDirectory,
			teamMembers,
			eventLogs
		});

		const commitSha = await this.#createCommit(env, treeSha);

		await this.#updateHeadRef(env, commitSha);
	}

	async handler(controller: ScheduledController, env: Env, context: ExecutionContext) {
		switch (controller.cron) {
			case this.#cronExpressions.everyDayAt02am:
				await this.#exportData(env, context);
				break;
			default:
				break;
		}
	}
}
