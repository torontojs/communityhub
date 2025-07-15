# Git practices

## Branches and forks

When you are working in a feature it is better to work on a separate branch, that makes the code contained and easier to test by others. If you have access to directly create branches from the repository, do it, if you don't create a fork and then create a new branch.

We don't enforce a naming convention for branches, but we encourage it to be meaningful names that quickly describe what you are working on. It is okay to use prefixes like `fix/`, `feat/`, or `chore/` to represent a bug fix, a feature, or some housekeeping task, respectively.

## Committing

We don't enforce a committing standard, but below are some guidelines for commit messages:

- We don't enforce it but highly suggest using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- Be descriptive, a commit message tells what happened to that code.
- Commit messages should aim to "fit in a Tweet". That adds conciseness.
- The first line of the commit is the summary, use it!
- If more context is needed for the changes, write a summary, leave a blank line, then add a longer message as needed.
- Commit often so you don't have a lot to commit about.
- The changed files are part of the commit, so no need to be redundant in the message.

## Creating a Pull Request

When you are ready to submit your changes please create a pull request targeting the main repository. The maintainers will be notified and review your Pull Request, please visit it frequently for comments and request for changes.

Here is a good tutorial to check if you need help with contribution tasks: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
