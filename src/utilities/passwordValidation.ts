export function passwordValidateMultiRegex(password: string): boolean {
	// At least 8 characters
	// At least one lowercase letter
	// At least one uppercase letter
	// At least one digit
	// At least one special character

	const re = {
		length: /.{8,}/, // At least 8 characters
		lowercase: /[a-z]/, // At least one lowercase letter
		uppercase: /[A-Z]/, // At least one uppercase letter
		digit: /[0-9]/, // At least one digit
		special: /[^a-zA-Z0-9]/ // At least one special character
	};

	return (
		re.length.test(password) &&
		re.lowercase.test(password) &&
		re.uppercase.test(password) &&
		re.digit.test(password) &&
		re.special.test(password)
	);
}

export function passwordValidateSingleRegex(password: string) {
	// Single regex enforcing all rules:
	// - Minimum 8 chars
	// - At least 1 uppercase, 1 lowercase, 1 digit, 1 special char
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
	return re.test(password);
}

export function isValidBasicEmail(email: string): boolean {
	const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return basicEmailRegex.test(email);
}

// hasAtSymbol	/@/	Must contain @.
// validLocal	/^[^\s@]+@/	Local part (before @) has no spaces or @.
// validDomain	/@[^\s@]+\.[^\s@]+$/	Domain has a . and no spaces/@.
// noLeadingTrailingDots	/^[^@.][^@]*[^@.]$/	Local part doesn’t start/end with . or @.
// validTLD	/\.[a-zA-Z]{2,}$/	TLD (e.g., .com) is ≥2 letters.
export function emailValidateMultiRegex(email: string): boolean {
	const re = {
		hasAtSymbol: /@/,
		validLocal: /^[^\s@]+@/,
		validDomain: /@[^\s@]+\.[^\s@]+$/,
		noLeadingTrailingDots: /^[^@.][^@]*[^@.]$/,
		validTLD: /\.[a-zA-Z]{2,}$/
	};

	return (
		re.hasAtSymbol.test(email) &&
		re.validLocal.test(email) &&
		re.validDomain.test(email) &&
		re.noLeadingTrailingDots.test(email.split('@')[0] as string) &&
		re.validTLD.test(email.split('@')[1] as string)
	);
}
