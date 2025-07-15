# Code organization

## Avoid spaghetti code

When code is too indirect, that means, you have to jump around multiple functions to find the actual code that does something it adds a lot of mental overload for the person reading the code, avoid that.

Most of the time if the code is used only in one place you can simplify this code and remove the extra function.

## Separation of concerns and "super functions"

To make the code more legible and easier to understand, we should base ourselves on the [UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and write functions that only handle _one thing_.

Two thing to understand here are:

- "One thing" can also be orchestration of other functions
- Related logic should be grouped together

That means that code should always be contained into a "single unit" responsible for handling a flow, as an orchestrator, or part of that flow.

One example here are request handlers, we should split the code in three parts:

- The request handler itself, responsible for dealing with checks for headers, content type and body parsing.
- A data validation function that will validate all the cases and formats for the data, including it being null, missing properties, etc.
- A data processing handler that receives valid data as an input and outputs the result of saving that data to a database, or executing some logic with that data.

Having this organization, help to write more testable function without resorting to complex hacks like mocks; and to follow the code more easily, as the code should read as series of steps that can be expanded upon if needed, but you get the general idea from just scanning the code.

One thing to keep in mind here is to be contentious of how much the code is broken into small pieces, we want to strike a balance between writing a "super function" with everything inside and writing many small functions that makes reading the code feel like hopping around in circles.

## Avoid premature DRY-ness

As much as we like to keep our code tidy and DRY, sometimes mushing things together only gets in the way. So think if it makes sense to actually keep things separate or wait a little bit before combining things.

We should avoid premature optimizations as they often lead to more complexity. Wait until the thing starts to become problematic to optimize it.
