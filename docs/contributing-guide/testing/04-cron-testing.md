# Testing Scheduled CRON jobs

**NOTE**: There is [no support yet](https://github.com/cloudflare/workers-sdk/issues/8466) to test this through vite.

To test the execution of scheduled cron job, we need to run the following command:

```shell
npm run dev:cron
```

That will start `wrangler` with the `--test-scheduled` flag. This will enable an endpoint for invoking the scheduler.

Then you need to send a request to `/__scheduled` with the `cron` parameter containing the cron expression to test to trigger it.

```shell
curl "http://localhost:4242/__scheduled?cron=<your cron expression here>"
```

## References

- https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/
- https://developers.cloudflare.com/workers/configuration/cron-triggers/#test-cron-triggers-locally
