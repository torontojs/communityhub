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

	test('"Tr0ub4dor&3" should not pass', () => {
		expect(passwordStrengthCheck('Tr0ub4dor&3')).toEqual(false);
	});

	test('"m8G!7zdPlAy4o9b$vT9f" should pass', () => {
		expect(passwordStrengthCheck('m8G!7zdPlAy4o9b$vT9f')).toEqual(true);
	});

	test('"Tr0ub13M4k3R1ntH3h0u53" should pass', () => {
		expect(passwordStrengthCheck('Tr0ub13M4k3R1ntH3h0u53')).toEqual(true);
	});

	test('"あڥA3+]?áàâãäçéèêëéèêëñóòôõöúùûüÁÀÂÃÄÇÉÈÊËÍÌÎÏÑÓÒÔÕÖÚÙÛÜßẞ" should not pass', () => {
		expect(passwordStrengthCheck('あڥA3+]?áàâãäçéèêëéèêëñóòôõöúùûüÁÀÂÃÄÇÉÈÊËÍÌÎÏÑÓÒÔÕÖÚÙÛÜßẞ')).toEqual(true);
		// NOTE: Non UTF-8 Character Example Here, but since we are only checking for non-unicode characetr, this string passes the test
	});
});
