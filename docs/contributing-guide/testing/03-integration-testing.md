# Integration testing

## Concepts

The idea behind integration testing is to ensure all parts of the system work togheter without issues. The test suite will interact with the frontend, simulating a user doing a task in the system and seeing it to completion, including edge cases providing invalid information.

The objective here is not to test the correctnes of input data, as this was already done by the steps before (unit testing and API testing), but instead is to test if there were anything not covered before that shows up when connecting all parts together.

E.g.:

> Simulating a user that wants to login to the platform, follow the steps:
>
> 1. Open the login page
> 2. Input information
>    1. Input wrong information
>    2. Input right information
> 3. Submit the information
> 4. Check result
>    1. Wrong information was provided, an error message is shown
>    2. Right informatio was provided, redirect to home page

## Tools

For integration testing we use [`Playwright`](https://playwright.dev/).

<!-- TODO: expand docs when we have the integration testing infrastructure configured -->
