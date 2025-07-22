/* eslint-disable @typescript-eslint/no-magic-numbers */

import { bodyLimit } from 'hono/body-limit';
import { StatusCodes, type StatusResponse } from '../utils/responses.ts';

/** 48kb */
const TOTAL_FILE_SIZE_IN_KB = 48 * 1024;

/** 512kb */
const FILE_UPLOAD_SIZE_IN_KB = 512 * 1024;

/** 1024 characters (1024bytes) */
export const SHORT_TEXT_SIZE_IN_CHAR = 1024;

/** 16 * 1024 characters (16kb) */
export const LONG_TEXT_SIZE_IN_CHAR = 16 * 1024;

export const bodySizeCheck = bodyLimit({
	maxSize: TOTAL_FILE_SIZE_IN_KB,
	onError: (context) => context.json({ message: 'Body size exceeded' } satisfies StatusResponse, StatusCodes.CONTENT_TOO_LARGE)
});

export const fileUploadSizeCheck = bodyLimit({
	maxSize: FILE_UPLOAD_SIZE_IN_KB,
	onError: (context) => context.json({ message: 'Body size exceeded' } satisfies StatusResponse, StatusCodes.CONTENT_TOO_LARGE)
});
