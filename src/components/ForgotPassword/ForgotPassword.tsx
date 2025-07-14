import React, { useRef, useState } from 'react';

import './ForgotPassword.css';
import { useCountdown } from '../../hooks/useCountDown.ts';
import Button from '../Button/Button.tsx';
import ClockIcon from '../Icons/ClockIcon.tsx';

const ForgotPasswordForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [seconds, setSeconds] = useState(0);

	useCountdown(seconds, setSeconds);

	const requestPasswordRecovery = async (email: string) => {
		try {
			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			if (response.ok) {
				setIsSubmitted(true);
				setIsDisabled(true);
			}
		} catch (error) {
			if (import.meta.env.MODE === 'development') {
				if (error instanceof Error) {
					console.error(error.name);
					console.error(error.cause);
					console.error(error.message);
					console.error(error.stack);
				} else {
					throw new Error('Invalid email error');
				}
			}
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!emailInputRef.current?.checkValidity()) {
			return;
		}

		const formData = new FormData(event.currentTarget);
		const emailValue = (formData.get('email') as string).trim().toLowerCase();

		requestPasswordRecovery(emailValue);
	};

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
						autoComplete='email'
						placeholder='Your account e-mail'
						required
						ref={emailInputRef}
						disabled={isDisabled}
					/>
				</div>

				<div className='form-footer'>
					<Button
						type='submit'
						isLarge
						isPrimary
					>
					</Button>
					{isSubmitted && (
						<>
							<div className='success-message' role='status' aria-live='polite'>
								<p>Check your e-mail. We've sent you a recovery link. If you didn't get the link, check your spam folder or try again in 10 minutes.</p>
							</div>
							<hr />
							<div className='resend-timer' id='countdown-status' aria-live='polite'>
								<ClockIcon aria-hidden='true' />
								{/* <p>Wait {Math.floor(seconds / 60)} {minutes === 1 ? 'minute' : 'minutes'} for a new activation link</p> */}
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
