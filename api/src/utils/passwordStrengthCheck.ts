import zxcvbn from 'zxcvbn';

/**
 * Checks if the given password is strong enough
 * Returns `true` if the password passes the strength test
 */

export function passwordStrengthCheck(password: string): boolean {
	let passwordStrength = true;
	const result = zxcvbn(password);
	const guessable = result.score < 3;
	const minLength = password.length < 20;
	const hasUppercase = /[A-Z]/u.test(password);
	const hasLowercase = /[a-z]/u.test(password);
	const hasNumber = /[0-9]/u.test(password);
	const hasSymbol = /[!@#$%^&*/?~]/u.test(password);

	if (!hasUppercase) {
		passwordStrength = false;
	}

	if (!hasLowercase) {
		passwordStrength = false;
	}

	if (!hasNumber) {
		passwordStrength = false;
	}

	if (!hasSymbol) {
		passwordStrength = false;
	}

	if (guessable) {
		passwordStrength = false;
	}

	if (minLength) {
		passwordStrength = false;
	}

	return passwordStrength;
}
