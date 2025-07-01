import zxcvbn from 'zxcvbn';

/**
 * Checks if the given password is strong enough
 * Returns `true` if the password passes the strength test
 */

export function passwordStrengthCheck(password: string): boolean {
	const result = zxcvbn(password);
	const guessable = result.score < 3;
	const minLength = password.length < 20;
	const hasUppercase = /[A-Z]/u.test(password);
	const hasLowercase = /[a-z]/u.test(password);
	const hasNumber = /[0-9]/u.test(password);
	const hasSymbol = /[!@#$%^&*/?~]/u.test(password);

	if (!hasUppercase) {
		return false;
	}

	if (!hasLowercase) {
		return false;
	}

	if (!hasNumber) {
		return false;
	}

	if (!hasSymbol) {
		return false;
	}

	if (guessable) {
		return false;
	}

	if (minLength) {
		return false;
	}

	return true;
}
