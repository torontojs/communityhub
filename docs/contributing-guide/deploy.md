# Deploying the project

## Environment Variables & Configuration Notice

Please be aware of how Cloudflare manages configuration between code and the dashboard:

- **`wrangler.toml` Overwrites Dashboard Settings:** Any non-secret environment variables defined in `wrangler.toml` will **overwrite** the corresponding values in the Cloudflare Dashboard every time you deploy.
- **Post-Push Action:** If you update variables directly in the Cloudflare Dashboard, verify and update them after each `git push` / deployment to ensure `wrangler.toml` didn't reset them.

### Active Environment Variables For Dev Test Environment

> **Variables:** The following variables are being used in the dev environment for testing the MVP. These variables have been added to `wrangler.toml` file. They will need to be reverted once the dev domain and a dev email are available.

| Variable Name  | Value / Description                                      | Configuration Location      |
| :------------- | :------------------------------------------------------- | :-------------------------- |
| `BASE_URL`     | `https://community-hub-dev.late-union-3d19.workers.dev/` | `wrangler.toml` / Dashboard |
| `FRONTEND_URL` | `https://community-hub-dev.late-union-3d19.workers.dev/` | `wrangler.toml` / Dashboard |
| `SENDER_EMAIL` | `email@email.cloudcode.click`                            | `wrangler.toml` / Dashboard |
