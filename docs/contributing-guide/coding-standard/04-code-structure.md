# Code structure

## General structure

Formatting is configured to not get in the way and yet lead to legible code. It takes care of things like spaces between items on an array or making consistent formatting of multiline lists. but you still retain control over the code structure.

You have autonomy to write the code as you like, but think about making it readable by others.
Here are some _suggestions_ to help in formatting the code:

- Use blank lines to split "chunks" of code that make sense together, this will make easier to read where a block of code starts and where it ends.
- If a line is getting too long, think about breaking it into intermediate steps.
- If you have a lot of parameters in a function, move them to a "configuration" object.
- If you are doing multiple operations over a single piece of data, think if it makes sense to restructure the data or to break the operations in smaller steps.

## Avoid clever tricks

Like English where using _hermetic_ words (pun intended) makes us sound fancier, if our code has clever tricks without any reason or explanation, it makes hard for everyone to understand. So avoid using clever code that is hard to understand!

There are situations where complex code is unavoidable, those situations should be minimized and self contained, the code should be in a function with documentation to support and explain the approach taken.

## Comments and self-documenting code

Comments exist and are useful to help understand the code, it is not a hard rule to either _"comment everything"_ or _"not comment anything"_. So add them when it helps to understand the code.

As general _suggestions_:

- The code should be readable by itself, that means a person reading it should be able to follow the code without much problem.
- When you are writing a piece of code that is complex, does something obscure, or does a very specific thing, write a comment.
- When adding context to a function or variable will help, add a comment.

Typescript and VS Code provide good tooling for JSDoc comments, here is an example of how to document things:

```typescript
/**
 * Fetched the user avatar from [Gravatar](https://gravatar.com/).
 *
 * The user id is used to get the email first, as gravatar images are fetched using the email.
 *
 * @param userId The user UUID in the database.
 */
function fetchUserAvatar(userId: string) {
	// ...
}

/**
 * The default timeout used by all fetch requests.
 */
const DEFAULT_TIMEOUT_IN_SECONDS = 5;
```

## Rely on inference when possible

The reasoning is that manually casting types often obscure bugs that will only be cached at runtime where that can usually be avoided when writing the code.

Here is an example of code showing where types can and can't be inferred:

```typescript
// The parameter cannot be inferred, but the return type can.
// So no need to type the return type
function test(param: string) {
	return `The parameter is: ${param}`;
}

// When initializing variables like arrays, we need to pass the type.
// This is because without telling typescript it will infer the wrong type.
const arrayOfNumbers: number[] = [];

// We also want to type objects as it will lead to better suggestions for the properties.
const objectWithDefinedProperties: TypeOrInterfaceWithProperties = {
	// ...
};
```

## Favoring function declaration over function expressions

In general, we want to prefer function declarations for a couple reasons:

- They are [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting), so they avoid errors coming from the [Temporal Dead Zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
- Arrow functions, in particular, can create issues with [the binding of `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#cannot_be_used_as_methods).

As a rule of thumb:

- If it has a name, use a regular function declaration.
- If it is used as a "one off" anonymous function (e.g.: as an argument for `Array.map`), use an arrow function expression.

## Use relative imports

Imports on the web only recognize URLs. "Bare imports" is a thing that started with node and then it evolved into import maps.

URL imports basically come down to those 3 ways of referencing an import:

- A relative import that start with `./` or `../`;
- An absolute import that starts with `/`, and points to the base domain;
- An absolute URL to a different domain, that starts with `https://`.

Think about it as the path to an image or CSS file, it is the same things.

When we do it for the project, it keeps consistency and compatibility with the web and reduces the amount of "translation" needed to reference a file.

The drawbacks are that if we move a file around it changes everything that depends on that file, and we have to update all of the imports; and that reading a file import can be "wonky" like `../../some/folder/file.ts`.

The good part is that it improves discoverability of dependencies because everything is made _more explicit_.

So, what about [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)? They are a neat tool to help make bare imports work on the web. But they add a layer of complexity and indirection. There is no easy way to tell "where does this come from?"

As a general guideline:

- All code that is ours should use relative imports to make it easier to reason about.
- We should not use absolute imports (i.e. the ones starting with `/`) because transforms, bundling and all other things may break the paths.
- All _external dependencies_ should use bare imports. For those we want to keep the node style.

This helps create consistency and differentiation of internal vs external code and keep our dependencies transparent to us, it doesn't matter much where they come from in the end.
