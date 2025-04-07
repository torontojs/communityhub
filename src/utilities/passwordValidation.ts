// Export function passwordValidateMultiRegex(password: string): boolean {
// 	// At least 8 characters
// 	// At least one lowercase letter
// 	// At least one uppercase letter
// 	// At least one digit
// 	// At least one special character

// 	Const re = {
// 		Length: /.{8,}/, // At least 8 characters
// 		Lowercase: /[a-z]/, // At least one lowercase letter
// 		Uppercase: /[A-Z]/, // At least one uppercase letter
// 		Digit: /[0-9]/, // At least one digit
// 		Special: /[^a-zA-Z0-9]/ // At least one special character
// 	};

// 	Return (
// 		Re.length.test(password) &&
// 		Re.lowercase.test(password) &&
// 		Re.uppercase.test(password) &&
// 		Re.digit.test(password) &&
// 		Re.special.test(password)
// 	);
// }

// Export function passwordValidateSingleRegex(password: string) {
// 	// Single regex enforcing all rules:
// 	// - Minimum 8 chars
// 	// - At least 1 uppercase, 1 lowercase, 1 digit, 1 special char
// 	Const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
// 	Return re.test(password);
// }

// Export function isValidBasicEmail(email: string): boolean {
// 	Const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	Return basicEmailRegex.test(email);
// }

// // HasAtSymbol	/@/	Must contain @.
// // ValidLocal	/^[^\s@]+@/	Local part (before @) has no spaces or @.
// // ValidDomain	/@[^\s@]+\.[^\s@]+$/	Domain has a . and no spaces/@.
// // NoLeadingTrailingDots	/^[^@.][^@]*[^@.]$/	Local part doesn’t start/end with . or @.
// // ValidTLD	/\.[a-zA-Z]{2,}$/	TLD (e.g., .com) is ≥2 letters.
// Export function emailValidateMultiRegex(email: string): boolean {
// 	Const re = {
// 		HasAtSymbol: /@/,
// 		ValidLocal: /^[^\s@]+@/,
// 		ValidDomain: /@[^\s@]+\.[^\s@]+$/,
// 		NoLeadingTrailingDots: /^[^@.][^@]*[^@.]$/,
// 		ValidTLD: /\.[a-zA-Z]{2,}$/
// 	};

// 	Return (
// 		Email.includes('@') &&
// 		Re.validLocal.test(email) &&
// 		Re.validDomain.test(email) &&
// 		Re.noLeadingTrailingDots.test(email.split('@')[0] as string) &&
// 		Re.validTLD.test(email.split('@')[1] as string)
// 	);
// }
