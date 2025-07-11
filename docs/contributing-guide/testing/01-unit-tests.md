# Unit tests

## Concepts

Unit tests test out a function or "unit of code" to ensure it is doign what is expected from it. It works by executing the code with a given input and verifying if the output is expected or not.

Unit tests should test for potential scenarios and not only for the "good case". You should throw unexpected values to a function and check it's behaviour.

E.g.:

> If the function expects a `number` as input, how it handles those cases:
>
> - An integer.
> - A floating point number.
> - `+0` and `-0`
> - Negative numbers.
> - `Number.MAX_SAFE_INT`
> - `Number.MAX_SAFE_INT + 1`
> - `Infinity`
> - `-Infinity`

## Tools

For unit testing we use [`vitest`](https://vitest.dev/guide/), to run the unit tests simply run the command:

```shell
npm test
```
