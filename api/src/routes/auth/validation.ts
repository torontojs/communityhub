import { z } from 'zod';

export const SignInSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, 'Email must be at least one character long')
		.email('Invalid Email'),
	password: z
		.string()
		.min(1, 'Password must be at least one character long')
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name must be at least one character long'),
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, 'Email must be at least one character long')
		.email('Invalid Email'),
	password: z
		.string()
		.min(1, 'Password must be at least one character long')
});

export type SignUpData = z.infer<typeof SignUpSchema>;

export const ActivateSchema = z.object({ token: z.string().uuid('Invalid ID format') });

export type ActivateData = z.infer<typeof ActivateSchema>;
