import zxcvbn from 'zxcvbn';

/**
 * Checks if the given password is strong enough
 * Returns `true` if the password passes the strength test
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
