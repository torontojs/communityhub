import zxcvbn from 'zxcvbn';

/**
 * Checks if the given password is strong enough
 * Returns `true` if the password passes the strength test
 *
 * The regex /\p{Cc}/iug checks for any Unicode control characters (category Cc), including characters like:
 * \x00–\x1F (e.g., NULL, BEL, TAB, LF, CR)
 * \x7F (DEL)
 * and other non-printable Unicode control codes beyond ASCII.
 * These are generally disallowed in passwords for security and usability.
 */

export function passwordStrengthCheck(password: string): boolean {
	const result = zxcvbn(password);
	const guessable = result.score < 3;
	const minLength = password.length < 15;
	const hasControlCharacter = /\p{Cc}/iug.test(password);

	if (guessable || minLength || hasControlCharacter) {
		return false;
	}

	return true;
}
