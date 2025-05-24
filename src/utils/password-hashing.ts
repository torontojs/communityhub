const PBKDF2_ITERATIONS = 600000;
const PBKDF2_HASH = 'SHA-512';
const DERIVED_KEY_LENGTH = 512;

/**
 * Converts a Uint8Array to a Base64 string.
 */
function toBase64(buffer: Uint8Array): string {
	return Buffer.from(buffer).toString('base64');
}

/**
 * Converts a Base64 string to a Uint8Array.
 */
function fromBase64(str: string): Uint8Array {
	return new Uint8Array(Buffer.from(str, 'base64'));
}

/**
 * Derives a key using PBKDF2 with the given password and salt.
 *
 * [deriveBits() using PBKDF2](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#pbkdf2)
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
	// Encode the password as a buffer
	const encoder = new TextEncoder();
	const passwordBuffer = encoder.encode(password);

	// Import the password as key material
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		passwordBuffer,
		{ name: 'PBKDF2' },
		false,
		['deriveBits']
	);

	// Derive bits for key using PBKDF2-HMAC-SHA512
	const derivedBits = await crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt,
			iterations: PBKDF2_ITERATIONS,
			hash: PBKDF2_HASH
		},
		keyMaterial,
		DERIVED_KEY_LENGTH
	);

	return new Uint8Array(derivedBits);
}

/**
 * Hashes a password using PBKDF2 and returns a string in the format "salt:hash".
 */
export async function hashPassword(password: string): Promise<string> {
	// Generate a 16-byte random salt
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const derivedKey = await deriveKey(password, salt);

	// Encode salt and hash as Base64 and concatenate with ':'
	return `${toBase64(salt)}:${toBase64(derivedKey)}`;
}

/**
 * Performs a constant-time comparison between two Uint8Array values.
 * This prevents timing attacks by ensuring the comparison takes the same amount of time
 * regardless of the input values.
 */
function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
	const length = Math.max(arr1.length, arr2.length);
	let mismatchCount = 0;

	// Compare each byte
	for (let i = 0; i < length; i++) {
		// Use 0 if the index is out of bounds
		const byte1 = arr1[i] ?? 0;
		const byte2 = arr2[i] ?? 0;

		// Increment mismatchCount if bytes are different
		if (byte1 !== byte2) {
			mismatchCount += 1;
		}
	}
	// Return true if all bytes are equal (mismatchCount should be 0)
	return mismatchCount === 0;
}

/**
 * Validates an input password against a stored hashed password.
 * Returns true if the password matches, otherwise false.
 */
export async function validatePassword(inputPassword: string, hashedPasswordWithSalt: string): Promise<boolean> {
	// Split the stored string into salt and hash components
	const [saltBase64, storedDerivedKeyBase64] = hashedPasswordWithSalt.split(':');
	if (!saltBase64 || !storedDerivedKeyBase64) {
		throw new Error('Invalid hashed password format');
	}

	const salt = fromBase64(saltBase64);
	const storedDerivedKey = fromBase64(storedDerivedKeyBase64);

	// Derive key using the input password and extracted salt
	const derivedKey = await deriveKey(inputPassword, salt);

	return isEqual(derivedKey, storedDerivedKey);
}
