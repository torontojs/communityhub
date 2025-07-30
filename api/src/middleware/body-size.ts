/* eslint-disable @typescript-eslint/no-magic-numbers */

import { bodyLimit } from 'hono/body-limit';
import { StatusCodes, type StatusResponse } from '../utils/responses.ts';

/** 48kb */
const TOTAL_FILE_SIZE_IN_BYTES = 48 * 1024;

/** 5mb */
const FILE_UPLOAD_SIZE_IN_BYTES = 5 * 1024 * 1024;

/** 1kb (1024 characters) */
export const SHORT_TEXT_SIZE_IN_CHAR = 1024;

/** 16kb (16 * 1024 characters) */
export const LONG_TEXT_SIZE_IN_CHAR = 16 * 1024;

export const bodySizeCheck = bodyLimit({
	maxSize: TOTAL_FILE_SIZE_IN_BYTES,
	onError: (context) => context.json({ message: 'Body size exceeded' } satisfies StatusResponse, StatusCodes.CONTENT_TOO_LARGE)
});

export const fileUploadSizeCheck = bodyLimit({
	maxSize: FILE_UPLOAD_SIZE_IN_BYTES,
	onError: (context) => context.json({ message: 'Body size exceeded' } satisfies StatusResponse, StatusCodes.CONTENT_TOO_LARGE)
});
