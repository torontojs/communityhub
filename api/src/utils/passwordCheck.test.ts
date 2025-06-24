import { describe, expect, test } from 'vitest';
import { passwordCheck } from './passwordCheck.ts';

describe('Weak password check', () => {
	test('"aaa" should not pass', () => {
		const result = passwordCheck('aaa');
		expect(result.score).toBe(0);
	});

	test('"13623341" should not pass', () => {
		const result = passwordCheck('13623341');
		expect(result.score).toBe(0);
	});

	test('"Rorr" should pass', () => {
		const result = passwordCheck('Rorr');
		expect(result.score).toBeGreaterThan(0);
	});

	test('"a!A" should not pass', () => {
		const result = passwordCheck('a!A');
		expect(result.score).toBe(0);
	});

	test('"m8G!7zdPl" should pass', () => {
		const result = passwordCheck('m8G!7zdPl');
		expect(result.score).toBeGreaterThan(0);
	});
});
