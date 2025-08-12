import zxcvbn from 'zxcvbn';

const MIN_PASSWORD_SCORE = 3;
const MIN_PASSOWRD_LENGTH = 15;

/**
 * Checks if the given password is strong enough.
 * Returns `true` if the password passes the strength test.
 *
 * The test checks:
 * - Score based on a library
 * - Length
 * - Absence of control characters
 */
export function passwordStrengthCheck(password: string): boolean {
	const result = zxcvbn(password);
	const guessable = result.score < MIN_PASSWORD_SCORE;
	const minLength = password.length < MIN_PASSOWRD_LENGTH;
	/**
	 * Checks for any Unicode control characters, including characters like:
	 * - \x00-\x1F (e.g., NULL, BEL, TAB, LF, CR)
	 * - \x7F (DEL)
	 * - Other non-printable Unicode control codes beyond ASCII.
	 *
	 * These are generally disallowed in passwords for security and usability.
	 * One of the specially problematic characters is the null byte (\x00),
	 * as it is used as a string terminator in some C libraries/code.
	 */
	const hasControlCharacter = /\p{Cc}/iug.test(password);

	if (guessable || minLength || hasControlCharacter) {
		return false;
	}

	return true;
}
