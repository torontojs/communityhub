import type { OpenAPIHono } from '@hono/zod-openapi';
import { exportData } from './data-export.ts';

// Cron expression tester/references:
// https://crontab.cronhub.io/
// https://developers.cloudflare.com/workers/configuration/cron-triggers/#supported-cron-expressions
const cronExpressions = {
	everyDayAt02am: '0 2 * * *'
} as const;

export function cronHandler(app: OpenAPIHono<EnvironmentBindings>) {
	return async (controller: ScheduledController, env: Env, context: ExecutionContext) => {
		switch (controller.cron) {
			case cronExpressions.everyDayAt02am:
				await exportData(app, env, context);
				break;
			default:
				break;
		}
	};
}
