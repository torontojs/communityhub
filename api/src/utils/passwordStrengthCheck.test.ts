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
});

describe('Unusual character check', () => {
	test('"あڥA3+]?áàâãäçéèêëéèêëñóòôõöúùûüÁÀÂÃÄÇÉÈÊËÍÌÎÏÑÓÒÔÕÖÚÙÛÜßẞ" should pass', () => {
		expect(passwordStrengthCheck('あڥA3+]?áàâãäçéèêëéèêëñóòôõöúùûüÁÀÂÃÄÇÉÈÊËÍÌÎÏÑÓÒÔÕÖÚÙÛÜßẞ')).toEqual(true);
	});

	test('C0 control characters should not pass', () => {
		const controlCharacters = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x7f';
		expect(passwordStrengthCheck(controlCharacters)).toEqual(false);
	});
});
