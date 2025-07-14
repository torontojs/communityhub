# Naming Things

## Use meaningful names

Code is meant to be read as much as it is to be written and we are writing code for others. These "others" include yourself in the future.

So to make everyone life easier, when naming things, use names that are descriptive and meaningful for the thing you are describing. Here are some questions to ask:

- Does the name make sense in this context?
- Is it too short?
- Is it too long?
- Is this abbreviation something common or is it a niche use?
- How generic is this name?
- Can this name be read as part of a sentence?

Some _suggestions_ to improve readability are:

- Functions and methods benefit from being named like verbs because they usually _act_ upon the parameters and execute an _action_. E.g. `initializeDatabase()`, `BlogPost.loadRelatedPosts()`, or `downloadFile()`.
- Variables, constants, and parameters usually represent _things_ so it makes sense to name them like so. E.g.: `userProfile`, `blogPosts`, or `databaseConfiguration`.
- Booleans are more readable if we add a prefix like `is`, `should`, or `has` before the name. E.g.: `human` vs `isHuman`; `driversLicense` vs `hasDriversLicence`.
- Numbers representing a _unit of measurement_ should include the unit in the variable name to remove ambiguity of the unit in question. E.g.: `timeout` vs `timeoutInSeconds`.
- Flags should be timestamps, more often than not when we search for some information we not only want to know if the data meets a condition but also _when_ that condition was met. E.g.: `verifiedEmail` benefits from having a timestamp for filtering everyone who verified their emails before a certain date.
- List of things should be pluralized to convey it is a _list_ and not a single thing.
