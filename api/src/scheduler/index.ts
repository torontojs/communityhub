import type { OpenAPIHono } from '@hono/zod-openapi';
import { exportData } from './data-export.ts';

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

	async handler(controller: ScheduledController, env: Env, context: ExecutionContext) {
		switch (controller.cron) {
			case this.#cronExpressions.everyDayAt02am:
				await exportData(this.#app, env, context);
				break;
			default:
				break;
		}
	}
}
