# Setting up and running the project

## Project setup

1. Clone the repository
   ```shell
   git clone https://github.com/torontojs/vms.git
   cd vms
   ```
2. Install the dependencies
   ```shell
   npm install
   ```
3. Copy the `.dev.vars.example` file to `.dev.vars` for providing environment secrets during development.
   ```shell
   cp .dev.vars.example .dev.vars
   ```
4. Set up Resend secrets (optional)
   - Copy the API Key and paste it in the `.dev.vars` file under the `RESEND_API_KEY` variable.
   - Update the `SENDER_EMAIL` variable to `onboarding@resend.dev` for testing, or use an email from your verified domain.
   - For more details about how Resend works in development, see [Resend Email Guide](./resend.md).

5. Run migrations to create your tables.
   ```shell
   npm run db:setup
   ```
6. Seed the database with initial data.
   ```shell
   npm run db:seed
   ```

## Starting the project

To test if the project is okay and start developing, run the command:

```shell
npm run dev
```

The project will start in development mode and watch for code changes.

## Resetting the database

From time to time, you may want to reset the database. To do so, you'll need to delete the `.wrangler` folder and run the `db:setup` and `db:seed` scripts again.
