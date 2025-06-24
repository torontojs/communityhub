import zxcvbn from 'zxcvbn';

export const passwordCheck = (password: string) => {
	const passwordHasUppercase = /[A-Z]/u.test(password);
	const passwordHasLowercase = /[a-z]/u.test(password);
	const passwordHasNumber = /[0-9]/u.test(password);
	const passwordHasSymbol = /[!@#$%^&*/?~]/u.test(password);
	const noAmbiguousChar = !/[^a-zA-Z0-9!@#$%^&*/?~]/u.test(password);
	const result = zxcvbn(password);

	const flags = [passwordHasUppercase, passwordHasLowercase, passwordHasNumber, passwordHasSymbol].filter((check) => check).length;
	if (flags < 2) {
		result.score = 0;
	}

	return {
		score: result.score,
		feedback: result.feedback.suggestions.join(', '),
		length: password.length,
		hasUppercase: passwordHasUppercase,
		hasLowercase: passwordHasLowercase,
		hasNumber: passwordHasNumber,
		hasSymbol: passwordHasSymbol,
		noAmbiguous: noAmbiguousChar
	};
};

/*
==Password Rules==
1. No Weak Passwords: return value of `score` must be greater than 0
2. Password minimum `length` must be 4 or greater
3. Two or more of these flags must be true: hasUppercase, hasLowercase, hasNumber, hasSymbol
4. No Ambiguous character or symbol used // Need more context here such as potential hashing issues with non-standard unicode characters //
*/
