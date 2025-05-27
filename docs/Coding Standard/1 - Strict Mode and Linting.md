# Strict Mode and Linting

## Typescript is set to strict mode

The objective is to reduce potential errors and force to write defensive code that handles edge cases and weirdness from JavaScript.

## Linting

The code will be formatted before every commit and checked for linting errors before pushing.

If you want to manually do any of those things, you can run the following commands:

```shell
# Run all linters
npm run lint

# Run only the typescript type checker
npm run typecheck

# Run only the js/ts linter
npm run lint:js

# Format the code
npm run format
```
