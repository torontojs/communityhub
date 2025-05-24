import type { Context } from 'hono';
import { type CreateEmailResponse, Resend } from 'resend';

interface EmailSendingParams {
	apiKey: string;
	from: string;
	to: string;
	subject: string;
	html: string;
	text?: string;
}

async function sendEmail(context: Context<{ Bindings: Env }>, { apiKey, from, to, subject, text, html }: EmailSendingParams) {
	if (context.env.ARE_EMAILS_LOCAL_ONLY === 'true') {
		/* eslint-disable no-console */
		console.log(`[📨] You got mail!`);
		console.log({ from, to, subject, html, text });
		/* eslint-enable no-console */

		return {
			data: { id: crypto.randomUUID() },
			error: null
		} satisfies CreateEmailResponse;
	}

	const resend = new Resend(apiKey);
	const emailResponse = await resend.emails.send({ from, to, subject, text, html });

	return emailResponse;
}

interface AccountConfirmationEmailParams {
	token: string;
	email: string;
	apiKey: string;
	senderEmail: string;
}

export async function sendAccountConfirmationEmail(context: Context, {
	token,
	email,
	apiKey,
	senderEmail
}: AccountConfirmationEmailParams) {
	const activationUrl = new URL(`/auth/activate?token=${token}`, context.req.url).toString();

	return sendEmail(context, {
		apiKey,
		from: senderEmail,
		to: email,
		subject: '[TorontoJS] Confirm your account',
		text: `You are now one of us!\n\nPlease activate your account by visiting: ${activationUrl}`,
		html: `
			<h2>You are now one of us!</h2>
			<p>Please activate your account by visiting the link below</p>
			<p><a href="${activationUrl}">${activationUrl}</a></p>
		`
	});
}
