# API Testing

## Concepts

API testing goes a step further than unit testing as it checks how endpoints on an API behave and respond to calls.

This is done by calling diferent endpoints on an API and checking if the responses are expected, similar to unit tests, we should check for all cases and not only the "good case".

E.g.:

> When thesting the endpoint `GET /sign-in`, what happens on the following cases:
>
> - The request has no `username`
> - The request has no `password`
> - The request has no `body`
> - The request has empty strings for `username` or `password`
> - The request `body` is a file
> - The request `body` has 1mb in size
> - The `password` is wrong
> - The `username` is wrong
> - Any parameter contains SQL code

## Tools

For API testing we use [`hurl`](https://hurl.dev/) (it is installed through npm as a dependency). Running the tests requires a server running, so this process is done on 3 steps:

1. Reset and seed the database:
   ```shell
   npm run db:setup
   npm run db:seed
   ```
2. Start a server by running:
   ```shell
   npm start
   ```
3. Run the tests:
   ```shell
   npm run test:api
   ```
