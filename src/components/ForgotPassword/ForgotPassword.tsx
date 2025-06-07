import React, { useEffect, useRef, useState } from 'react';

import './ForgotPassword.css';
import { useAsync } from '../../hooks/useAsync.ts';
import { useCountdown } from '../../hooks/useCountDown.ts';
import Button from '../Button/Button.tsx';
import ClockIcon from '../Icons/ClockIcon.tsx';

const requestPasswordRecovery = async (email: string) => {
	const response = await fetch('/api/auth/forgot-password', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email })
	});

	if (!response.ok) { throw new Error('Invalid email address'); }
	return response.json();
};

const ForgotPasswordForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [validationError, setValidationError] = useState('');
	const { minutes, isFinished, start } = useCountdown();

	const { execute, isLoading, reset } = useAsync(requestPasswordRecovery, {
		onSuccess: () => {
			setIsSubmitted(true);
			setValidationError('');
			start(9);
		},
		onError: () => setValidationError('This is not a valid email address')
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setValidationError('');

		if (!emailInputRef.current?.checkValidity()) {
			setValidationError('This is not a valid email address');
			emailInputRef.current?.focus();
			return;
		}

		const formData = new FormData(event.currentTarget);
		const emailValue = (formData.get('email') as string).trim().toLowerCase();
		await execute(emailValue);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);

		if (!value && validationError) {
			setValidationError('');
		}
	};

	useEffect(() => {
		if (isFinished && isSubmitted) {
			setIsSubmitted(false);
			setValidationError('');
			setEmail('');
			start(0);
			reset();
		}
	}, [isFinished, isSubmitted, start, reset]);

	const isEmailEmpty = !email.trim();

	return (
		<div className='password-recovery-form'>
			<form onSubmit={handleSubmit} className='recovery-content' noValidate>
				<p>Enter your e-mail to recover your password.</p>

				<div className='input-block'>
					<label className='block' htmlFor='email-input'>
						E-mail
					</label>
					<input
						id='email-input'
						type='email'
						name='email'
						value={email}
						autoComplete='email'
						placeholder='Your account e-mail'
						required
						ref={emailInputRef}
						onChange={handleEmailChange}
						className={validationError ? 'error' : ''}
						disabled={isSubmitted}
						aria-invalid={!!validationError}
						aria-describedby={validationError ? 'email-error' : 'email-helper'}
					/>

					{validationError ?
						(
							<div className='error-message' id='email-error' role='alert' aria-live='polite'>
								<span>{validationError}</span>
							</div>
						) :
						(
							<div className='helper-text' id='email-helper'>
								<span>Insert your e-mail to recover your password</span>
							</div>
						)}
				</div>

				<div className='form-footer'>
					<Button
						type='submit'
						isLarge
						isPrimary
						disabled={isLoading || isSubmitted || isEmailEmpty}
						aria-describedby={isSubmitted ? 'countdown-status' : undefined}
					>
						{isLoading ? 'Sending...' : 'Send recovery link'}
					</Button>

					{isSubmitted && (
						<>
							<div className='success-message' role='status' aria-live='polite'>
								<p>Check your e-mail. We've sent you a recovery link. If you didn't get the link, check your spam folder or try again in 10 minutes.</p>
							</div>
							<hr />
							<div className='resend-timer' id='countdown-status' aria-live='polite'>
								<ClockIcon aria-hidden='true' />
								<p>Wait {minutes} {minutes === 1 ? 'minute' : 'minutes'} for a new activation link</p>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
