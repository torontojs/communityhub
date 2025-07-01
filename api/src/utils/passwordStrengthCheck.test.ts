import { describe, expect, test } from 'vitest';
import { passwordStrengthCheck } from './passwordStrengthCheck.ts';

describe('Weak password check', () => {
	test('"aaa" should not pass', () => {
		expect(passwordStrengthCheck('aaa')).toEqual(false);
	});

	test('"13623341" should not pass', () => {
		expect(passwordStrengthCheck('13623341')).toEqual(false);
	});

	test('"Rorr" should not pass', () => {
		expect(passwordStrengthCheck('Rorr')).toEqual(false);
	});

	test('"a!A" should not pass', () => {
		expect(passwordStrengthCheck('a!A')).toEqual(false);
	});

	test('"m8G!7zdPlAy4o9b$vT9f" should pass', () => {
		expect(passwordStrengthCheck('m8G!7zdPlAy4o9b$vT9f')).toEqual(true);
	});
});
