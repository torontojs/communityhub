import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import type { Context } from 'hono';
import { z } from 'zod';
import { sendCommunityNotificationEmail } from '../../email/index.ts';
import { authorizeOrganizer } from '../../middleware/access.ts';
import { authMiddleware } from '../../middleware/auth.ts';
import { bodySizeCheck } from '../../middleware/body-size.ts';
import { getSession } from '../../utils/auth.ts';
import {
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import {
	type DeliverableRecipient,
	finishCampaign,
	getAudienceOptions,
	getCampaignByIdempotencyKey,
	getCampaignDeliveryState,
	getPendingRecipients,
	getRecentCampaigns,
	insertCampaign,
	isUniqueConstraintError,
	resolveAudience,
	updateRecipientDelivery
} from './data.ts';
import {
	AudienceOptionsSchema,
	type CreateEmailCampaign,
	CreateEmailCampaignSchema,
	EmailCampaignPreviewSchema,
	EmailCampaignSummarySchema,
	PreviewEmailCampaignSchema
} from './validation.ts';

// Resend's default limit is 2 requests per second. Going wider gets the extra sends
// throttled, and a throttled send used to be recorded as a permanent failure.
const MAX_CONCURRENT_EMAILS = 2;
const HALF_SECOND_MS = 500;
const RATE_LIMIT_RETRY_DELAYS_MS = [HALF_SECOND_MS, HALF_SECOND_MS * 3, HALF_SECOND_MS * 8];
// Each recipient costs ~2 subrequests (send + status write). 400 keeps a campaign
// well under the Worker's 1000-subrequest-per-request limit, so it finishes in one
// request without a queue. Revisit if the community outgrows this.
const MAX_RECIPIENTS_PER_CAMPAIGN = 400;

export const emailCampaignRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

type EmailResponse = Awaited<ReturnType<typeof sendCommunityNotificationEmail>>;

async function delay(milliseconds: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

function isRateLimited({ error }: EmailResponse) {
	return error?.name === 'rate_limit_exceeded' || /rate limit|too many requests/iu.test(error?.message ?? '');
}

/** A throttled send is transient, so it is retried with backoff instead of being recorded as failed. */
async function sendWithRateLimitRetry(context: Context<EnvironmentBindings>, email: string, data: CreateEmailCampaign) {
	const parameters = {
		apiKey: context.env.RESEND_API_KEY,
		email,
		message: data.message,
		senderEmail: context.env.SENDER_EMAIL,
		subject: data.subject
	};
	let response = await sendCommunityNotificationEmail(context, parameters);

	for (const retryDelay of RATE_LIMIT_RETRY_DELAYS_MS) {
		if (!isRateLimited(response)) {
			break;
		}

		await delay(retryDelay);
		response = await sendCommunityNotificationEmail(context, parameters);
	}

	return response;
}

/**
 * Attempts every recipient, recording each outcome as it goes, then finalizes the campaign from
 * those records. Recipients are only ever moved off 'pending' once attempted, so a run that dies
 * partway leaves the rest resumable.
 */
async function deliverCampaign(
	context: Context<EnvironmentBindings>,
	campaignId: string,
	data: CreateEmailCampaign,
	recipients: DeliverableRecipient[]
) {
	try {
		for (let index = 0; index < recipients.length; index += MAX_CONCURRENT_EMAILS) {
			const recipientBatch = recipients.slice(index, index + MAX_CONCURRENT_EMAILS);

			await Promise.all(recipientBatch.map(async (recipient) => {
				let providerMessageId: string | undefined;
				let errorMessage: string | undefined;

				try {
					const response = await sendWithRateLimitRetry(context, recipient.email, data);

					providerMessageId = response.data?.id;
					if (response.error || !providerMessageId) {
						errorMessage = response.error?.message ?? 'Email provider did not return a message ID.';
					}
				} catch (error) {
					errorMessage = error instanceof Error ? error.message : 'Unknown email provider error.';
				}

				// The status write is guarded too: a failed DB update must not abort the whole batch.
				try {
					await updateRecipientDelivery(
						context.env.Database,
						recipient.id,
						errorMessage ? 'failed' : 'sent',
						providerMessageId,
						errorMessage
					);
				} catch {
					// Leaving the row 'pending' is correct here: the recipient stays resumable.
				}
			}));
		}
	} finally {
		await finishCampaign(context.env.Database, campaignId);
	}
}

async function respondWithCampaign(
	context: Context<EnvironmentBindings>,
	idempotencyKey: string,
	statusCode: typeof StatusCodes.CREATED | typeof StatusCodes.OKAY
) {
	const campaign = await getCampaignByIdempotencyKey(context.env.Database, idempotencyKey);

	if (!campaign) {
		throw new Error('Campaign was sent but its summary could not be loaded.');
	}

	return context.json(campaign, statusCode);
}

emailCampaignRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/audience-options',
		operationId: 'List email campaign audience options',
		summary: 'List eligible email recipients and teams',
		description: 'Lists active community members and teams available to organizers when composing an email campaign.',
		tags: ['Email Campaigns'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: AudienceOptionsSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Authentication required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Organizer access required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => context.json(await getAudienceOptions(context.env.Database), StatusCodes.OKAY)
);

emailCampaignRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/preview',
		operationId: 'Preview email campaign audience',
		summary: 'Resolve and preview campaign recipients',
		description: 'Returns the exact deduplicated recipients matching the selected audience and filters.',
		tags: ['Email Campaigns'],
		request: {
			body: { content: { 'application/json': { schema: PreviewEmailCampaignSchema } }, required: true }
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: EmailCampaignPreviewSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Authentication required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Organizer access required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const recipients = await resolveAudience(context.env.Database, context.req.valid('json').audience);

		return context.json({
			count: recipients.length,
			recipients: recipients.map(({ id, name, email }) => ({ id, name, email }))
		}, StatusCodes.OKAY);
	}
);

emailCampaignRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'List recent email campaigns',
		summary: 'List recent email campaigns',
		description: 'Lists the twenty most recent community email campaigns.',
		tags: ['Email Campaigns'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: z.object({ data: z.array(EmailCampaignSummarySchema) }) } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Authentication required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Organizer access required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => context.json({ data: await getRecentCampaigns(context.env.Database) }, StatusCodes.OKAY)
);

emailCampaignRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/',
		operationId: 'Send email campaign',
		summary: 'Send a community email campaign',
		description: 'Snapshots the selected recipients, sends an individual email to each one, and stores each result.',
		tags: ['Email Campaigns'],
		request: {
			body: { content: { 'application/json': { schema: CreateEmailCampaignSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
				description: 'Campaign sent',
				content: { 'application/json': { schema: EmailCampaignSummarySchema } }
			},
			[StatusCodes.OKAY]: {
				description: 'A campaign with the same idempotency key was already submitted',
				content: { 'application/json': { schema: EmailCampaignSummarySchema } }
			},
			[StatusCodes.UNPROCESSABLE_CONTENT]: {
				description: 'No eligible recipients matched the audience',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.UNAUTHORIZED]: {
				description: 'Authentication required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Organizer access required',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		},
		middleware: [bodySizeCheck, authMiddleware, authorizeOrganizer] as const
	}),
	async (context) => {
		const data = context.req.valid('json');
		const existingCampaign = await getCampaignDeliveryState(context.env.Database, data.idempotencyKey);

		if (existingCampaign) {
			// A campaign left in 'sending' never finished attempting its recipients, so this
			// retry resumes it rather than reporting a result that never happened.
			if (existingCampaign.status === 'sending') {
				const pendingRecipients = await getPendingRecipients(context.env.Database, existingCampaign.id);

				await (pendingRecipients.length > 0 ?
					deliverCampaign(context, existingCampaign.id, data, pendingRecipients) :
					finishCampaign(context.env.Database, existingCampaign.id));
			}

			return respondWithCampaign(context, data.idempotencyKey, StatusCodes.OKAY);
		}

		const recipients = await resolveAudience(context.env.Database, data.audience);

		if (recipients.length === 0) {
			return context.json(
				{ message: 'No active community members match the selected audience.' } satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		if (recipients.length > MAX_RECIPIENTS_PER_CAMPAIGN) {
			return context.json(
				{ message: `This audience has ${recipients.length} recipients. Please narrow it to ${MAX_RECIPIENTS_PER_CAMPAIGN} or fewer.` } satisfies StatusResponse,
				StatusCodes.UNPROCESSABLE_CONTENT
			);
		}

		const { id: createdBy } = getSession(context);
		let campaignId: string;
		let campaignRecipients: DeliverableRecipient[];

		try {
			({ campaignId, recipients: campaignRecipients } = await insertCampaign(context.env.Database, createdBy, data, recipients));
		} catch (error) {
			// A concurrent request with the same key won the insert; defer to its campaign.
			if (!isUniqueConstraintError(error)) {
				throw error;
			}

			return respondWithCampaign(context, data.idempotencyKey, StatusCodes.OKAY);
		}

		await deliverCampaign(context, campaignId, data, campaignRecipients);

		return respondWithCampaign(context, data.idempotencyKey, StatusCodes.CREATED);
	}
);
