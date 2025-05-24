import type { Context } from 'hono';
import { z, ZodError, type ZodType } from 'zod';

/**
 * List of HTTP status codes adapted from [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
 */
export const StatusCodes = {
	/**
	 * This interim response indicates that the client should continue the request or ignore the response if the request is already finished.
	 */
	CONTINUE: 100,
	/**
	 * This status code is primarily intended to be used with the `Link` header, letting the user agent start [preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload) resources while the server prepares a response or [preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect) to an origin from which the page will need resources.
	 */
	EARLY_HINTS: 103,
	/**
	 * The request succeeded. The result and meaning of "success" depends on the HTTP method:
	 * - `GET`: The resource has been fetched and transmitted in the message body.
	 * - `HEAD`: Representation headers are included in the response without any message body.
	 * - `PUT` or `POST`: The resource describing the result of the action is transmitted in the message body.
	 * - `TRACE`: The message body contains the request as received by the server.
	 */
	OKAY: 200,
	/**
	 * The request succeeded, and a new resource was created as a result. This is typically the response sent after `POST` requests, or some `PUT` requests.
	 */
	CREATED: 201,
	/**
	 * The request has been received but not yet acted upon.
	 * It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request.
	 * It is intended for cases where another process or server handles the request, or for batch processing.
	 */
	ACCEPTED: 202,
	/**
	 * There is no content to send for this request, but the headers are useful.
	 * The user agent may update its cached headers for this resource with the new ones.
	 */
	NO_CONTENT: 204,
	/**
	 * Tells the user agent to reset the document which sent this request.
	 */
	RESET_CONTENT: 205,
	/**
	 * This response code is used in response to a [range request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) when the client has requested a part or parts of a resource.
	 */
	PARTIAL_CONTENT: 206,
	/**
	 * The URL of the requested resource has been changed permanently. The new URL is given in the response.
	 */
	MOVED_PERMANENTLY: 301,
	/**
	 * This response code means that the URI of requested resource has been changed _temporarily_.
	 * Further changes in the URI might be made in the future, so the same URI should be used by the client in future requests.
	 */
	FOUND: 302,
	/**
	 * The server sent this response to direct the client to get the requested resource at another URI with a `GET` request.
	 */
	SEE_OTHER: 303,
	/**
	 * This is used for caching purposes.
	 * It tells the client that the response has not been modified, so the client can continue to use the same [cached](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) version of the response.
	 */
	NOT_MODIFIED: 304,
	/**
	 * The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request.
	 * This has the same semantics as the `302 Found` response code, with the exception that the user agent _must not_ change the HTTP method used: if a `POST` was used in the first request, a `POST` must be used in the redirected request.
	 */
	TEMPORARY_REDIRECT: 307,
	/**
	 * This means that the resource is now permanently located at another URI, specified by the `Location` response header.
	 * This has the same semantics as the `301 Moved Permanently` HTTP response code, with the exception that the user agent _must not_ change the HTTP method used: if a `POST` was used in the first request, a `POST` must be used in the second request.
	 */
	PERMANENT_REDIRECT: 308,
	/**
	 * The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
	 */
	BAD_REQUEST: 400,
	/**
	 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
	 * That is, the client must authenticate itself to get the requested response.
	 */
	UNAUTHORIZED: 401,
	/**
	 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.
	 * Unlike `401 Unauthorized`, the client's identity is known to the server.
	 */
	FORBIDDEN: 403,
	/**
	 * The server cannot find the requested resource.
	 * In the browser, this means the URL is not recognized.
	 * In an API, this can also mean that the endpoint is valid but the resource itself does not exist.
	 * Servers may also send this response instead of `403 Forbidden` to hide the existence of a resource from an unauthorized client.
	 * This response code is probably the most well known due to its frequent occurrence on the web.
	 */
	NOT_FOUND: 404,
	/**
	 * The [request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) is known by the server but is not supported by the target resource.
	 * For example, an API may not allow `DELETE` on a resource, or the `TRACE` method entirely.
	 */
	METHOD_NOT_ALLOWED: 405,
	/**
	 * This response is sent on an idle connection by some servers, even without any previous request by the client.
	 * It means that the server would like to shut down this unused connection.
	 * This response is used much more since some browsers use HTTP pre-connection mechanisms to speed up browsing.
	 * Some servers may shut down a connection without sending this message.
	 */
	REQUEST_TIMEOUT: 408,
	/**
	 * This response is sent when a request conflicts with the current state of the server.
	 * In _WebDAV_ remote web authoring, `409` responses are errors sent to the client so that a user might be able to resolve a conflict and resubmit the request.
	 */
	CONFLICT: 409,
	/**
	 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address.
	 * Clients are expected to remove their caches and links to the resource.
	 * The HTTP specification intends this status code to be used for "limited-time, promotional services".
	 * APIs should not feel compelled to indicate resources that have been deleted with this status code.
	 */
	GONE: 410,
	/**
	 * Server rejected the request because the `Content-Length` header field is not defined and the server requires it.
	 */
	LENGTH_REQUIRED: 411,
	/**
	 * The request body is larger than limits defined by server.
	 * The server might close the connection or return an `Retry-After` header field.
	 */
	CONTENT_TOO_LARGE: 413,
	/**
	 * The URI requested by the client is longer than the server is willing to interpret.
	 */
	URI_TOO_LONG: 414,
	/**
	 * The media format of the requested data is not supported by the server, so the server is rejecting the request.
	 */
	UNSUPPORTED_MEDIA_TYPE: 415,
	/**
	 * The [ranges](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) specified by the `Range` header field in the request cannot be fulfilled.
	 * It's possible that the range is outside the size of the target resource's data.
	 */
	RANGE_NOT_SATISFIABLE: 416,
	/**
	 * This response code means the expectation indicated by the `Expect` request header field cannot be met by the server.
	 */
	EXPECTATION_FAILED: 417,
	/**
	 * The server refuses the attempt to brew coffee with a teapot.
	 */
	I_AM_A_TEAPOT: 418,
	/**
	 * The request was well-formed but was unable to be followed due to semantic errors.
	 */
	UNPROCESSABLE_CONTENT: 422,
	/**
	 * Indicates that the server is unwilling to risk processing a request that might be replayed.
	 *
	 * @variation Experimental
	 */
	TOO_EARLY: 425,
	/**
	 * The user has sent too many requests in a given amount of time ([rate limiting](https://developer.mozilla.org/en-US/docs/Glossary/Rate_limit)).
	 */
	TOO_MANY_REQUESTS: 429,
	/**
	 * The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.
	 */
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	/**
	 * The server is unwilling to process the request because its header fields are too large.
	 * The request may be resubmitted after reducing the size of the request header fields.
	 */
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	/**
	 * The server has encountered a situation it does not know how to handle.
	 * This error is generic, indicating that the server cannot find a more appropriate `5XX` status code to respond with.
	 */
	INTERNAL_SERVER_ERROR: 500,
	/**
	 * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are `GET` and `HEAD`.
	 */
	NOT_IMPLEMENTED: 501,
	/**
	 * The server is not ready to handle the request.
	 * Common causes are a server that is down for maintenance or that is overloaded.
	 * Note that together with this response, a user-friendly page explaining the problem should be sent.
	 * This response should be used for temporary conditions and the `Retry-After` HTTP header should, if possible, contain the estimated time before the recovery of the service.
	 * The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
	 */
	SERVICE_UNAVAILABLE: 503,
	/**
	 * Indicates that the client needs to authenticate to gain network access.
	 */
	NETWORK_AUTHENTICATION_REQUIRED: 511
} as const;

/**
 * A response with a status for the operation that does not return data for a resource.
 *
 * It may contain an `errors` object specifying validation errors with the data passed.
 */
export const StatusResponseSchema = z.object({
	message: z.string()
		.describe('A message reporting the status of the operation.'),
	warnings: z.array(z.record(z.string(), z.string()))
		.optional()
		.describe('A warning message regarding the status of the operation.'),
	errors: z.array(z.record(z.string(), z.string()))
		.optional()
		.describe('An object where the keys are the fields and the values are a list of errors for each field')
}).describe('Response for an operation status, it does not include data, only a message and potential validation errors.');

export type StatusResponse = z.infer<typeof StatusResponseSchema>;

export function statusResponseFormatter<T, C extends Context>(result: T, context: C) {
	const errors = (result as { error: ZodError | undefined })?.error;

	if (errors instanceof ZodError) {
		return context.json({
			errors: Object.fromEntries(errors.issues.map(({ path, message }) => [path.join('.'), message]))
		}, StatusCodes.UNPROCESSABLE_CONTENT);
	}

	return context.req;
}

export const HALLinkSchema = z.object({
	href: z.string().url()
		.describe('The link URL.'),
	deprecation: z.boolean().optional()
		.describe('A flag specifying if the URL is deprecated.')
});

export type HALLink = z.infer<typeof HALLinkSchema>;

export const HALResponseSchema = z.object({
	_links: z.object({
		self: HALLinkSchema
			.describe('A URL representing the resource itself.')
	}).describe('A list of links providing information about related data for this resource.')
});

export type HALResponse = z.infer<typeof HALResponseSchema>;

/**
 * Generate a schema for responses containing data for a single resource.
 */
export function generateDataResponeSchema<T>(data: ZodType<T>) {
	return z.object({
		data
	}).merge(HALResponseSchema);
}

export type DataResponse<T> = z.infer<ReturnType<typeof generateDataResponeSchema<T>>>;

export const HALPaginatedResponseSchema = z.object({
	_links: z.object({
		self: HALLinkSchema
			.describe('A URL representing the resource itself.'),
		first: HALLinkSchema
			.describe('The URL for the first resource. Note that this could be the same as the URL for the current resource.'),
		last: HALLinkSchema
			.describe('The URL for the last resource. Note that this could be the same as the URL for the current resource.'),
		next: HALLinkSchema.optional()
			.describe('The URL for the previous resource, if there is any.'),
		prev: HALLinkSchema.optional()
			.describe('The URL for the next resource, if there is any.')
	}).describe('A list of links providing information about related data for this resource.')
});

export type HALPaginatedResponse = z.infer<typeof HALPaginatedResponseSchema>;

/**
 * Generate a schema for responses containing paginated data.
 *
 * The data should be an array of resources. Information about the page should be included with the response.
 */
export function generatePaginatedResponseSchema<T extends unknown[]>(data: ZodType<T>) {
	return z.object({
		data,
		start: z.number().int()
			.describe(
				'The index for the first result on this page, starting from 0 and taking into account the offset from previous pages. For example, if `currentPage` is 4, and `total` is also 10, this means `start` would be 4 * 10 = 40.'
			),
		end: z.number().int()
			.describe('The index for the last result on this page, it is `start` + `total`. For example, if `start` is 40 and `total` is 10, then `end` would be 40 + 10 = 50.'),
		total: z.number().int()
			.describe(
				'The total number of items **_on the current page_**. Not to be confused with `size`, which is the total numbers _per page_. For example, if `size` is 10, but the last page only have 6 results left, then `total` would be 6.'
			),
		size: z.number().int()
			.describe(
				'The total number of items **_per page_**. Not to be confused with `total`, which is the total number of items _on the current page_. For exampe, if we have 12 results, and want to split them into pages with 10 results each, then `size` would be 10, regardless of how many items the actual page has.'
			),
		currentPage: z.number().int().positive()
			.describe('The number for the current page, starting from 1.'),
		lastPage: z.number().int().positive()
			.describe('The number of last page.')
	}).merge(HALPaginatedResponseSchema);
}

export type PaginatedResponse<T extends unknown[]> = z.infer<ReturnType<typeof generatePaginatedResponseSchema<T>>>;
