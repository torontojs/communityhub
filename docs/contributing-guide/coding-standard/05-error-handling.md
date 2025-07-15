# Error Handling

## Prefer throwing errors, and handle them only at the top-most level

As a general idea, we want to cascade and propagate errors to the outermost layer. That way, if something goes wrong, the code breaks and don't execute more than expected and the error propagates to a place that can handle it properly.

In practical terms, it means request handlers will be the place where error handling happens generally, and then other pieces of code should throw errors.

Note that subclassing of errors to add more metadata, it is also an interesting way to help the handling of specific types of errors.

Here is an example of subclassing:

```typescript
class DataValidationError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
	}
}

function dataValidation() {
	throw new DataValidationError('Invalid data', 400);
}

function requestHandler(context: HonoContext) {
	try {
		dataValidation();
	} catch (err) {
		// This is a validation error, so we have the status code available
		if (err instanceof DataValidationError) {
			return context.json({ error: err.message }, err.statusCode);
		}

		// This is a regular error, so it may be comming from somewhere else.
		// Here we treat it like a server error.
		return context.json({ error: err.message }, 500);
	}
}
```

An exception to this is when we want to silently ignore errors, or we want to handle things differently even if an error occurs, like adding a default return. On that case it is okay to use `try..catch` in other places.
