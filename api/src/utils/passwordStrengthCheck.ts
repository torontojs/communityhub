import zxcvbn from 'zxcvbn';

/**
 * Checks if the given password is strong enough
 * Returns `true` if the password passes the strength test
 */

export function passwordStrengthCheck(password: string): boolean {
	const result = zxcvbn(password);
	const guessable = result.score < 3;
	const minLength = password.length < 15;
	const nonUnicodeCharFound = password.match(/\p{Cc}/iug);

	if (guessable || minLength || nonUnicodeCharFound) {
		return false;
	}

	return true;
}
