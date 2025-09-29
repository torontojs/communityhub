# Email Sending with Resend

We use **Resend** to send emails (like notifications and confirmations).

## How it works

- Resend only sends emails from **verified domains**.
- For local testing, you can use `onboarding@resend.dev` as the sender email.
- Free email accounts (like Gmail) do not work.
- The app uses an **API key** and a configured **sender email address** to send through Resend.

## Development Environment

- In development, emails are not sent; they are displayed in the terminal so you can check content and formatting.

## Notes

- Always test emails in development mode.
- Do not try to send emails from personal accounts.
