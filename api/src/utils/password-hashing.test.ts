import { describe, expect, test } from 'vitest';
import { hashPassword, validatePassword } from './password-hashing.ts';

describe('Password Hashing Utilities', () => {
	test('hashPassword should return a string in the format "salt:hash"', async () => {
		const password = 'test-password';
		const hashedPassword = await hashPassword(password);

		// Check that the result is a string with the correct format
		expect(typeof hashedPassword).toBe('string');
		expect(hashedPassword.split(':').length).toBe(2);
	});

	test('hashPassword should generate different hashes for the same password', async () => {
		const password = 'test-password';
		const hash1 = await hashPassword(password);
		const hash2 = await hashPassword(password);

		// Hashes should be different due to different random salts
		expect(hash1).not.toBe(hash2);
	});

	test('validatePassword should return true for correct password', async () => {
		const password = 'test-password';
		const hashedPassword = await hashPassword(password);

		const isValid = await validatePassword(password, hashedPassword);
		expect(isValid).toBe(true);
	});

	test('validatePassword should return false for incorrect password', async () => {
		const password = 'test-password';
		const wrongPassword = 'wrong-password';
		const hashedPassword = await hashPassword(password);

		const isValid = await validatePassword(wrongPassword, hashedPassword);
		expect(isValid).toBe(false);
	});

	test('validatePassword should throw error for invalid hash format', async () => {
		const password = 'test-password';
		const invalidHash = 'invalid-hash-format';

		await expect(validatePassword(password, invalidHash)).rejects.toThrow('Invalid hashed password format');
	});
});
