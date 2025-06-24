import { describe, expect, test } from 'vitest';
import { passwordCheck } from './passwordCheck.ts';

describe('Password is "aaa"', () => {
	test('should not pass', () => {
		const result = passwordCheck('aaa');
		expect(result.score).toBe(0);
	});
});
