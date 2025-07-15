import React, { useRef, useState } from 'react';

import './ForgotPassword.css';
import { useCountdown } from '../../hooks/useCountDown.ts';
import Button from '../Button/Button.tsx';
import ClockIcon from '../Icons/ClockIcon.tsx';

// TODO: Investigate if we're able to use heartbeat to check if forgot password request already in progress and how the page react if there is one

const ForgotPasswordForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [seconds, setSeconds] = useState(600);
	const [validEmail, setIsValid] = useState(false);
	const [emailDisabled, setEmailDisabled] = useState(false);

	const handleValidEmail = () => {
		setIsValid(!emailInputRef.current?.checkValidity());
		if (validEmail) {
			setButtonDisabled(true);
		} else {
			setButtonDisabled(false);
		}
	};

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
				setSeconds(600);
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

		const formData = new FormData(event.currentTarget);
		const emailValue = (formData.get('email') as string).trim().toLowerCase();

		setButtonDisabled(true);
		setEmailDisabled(true);

		requestPasswordRecovery(emailValue);
	};

	return (
		<div id='password-recovery-form'>
			<form onSubmit={handleSubmit} id='recovery-content' noValidate>
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
						onChange={handleValidEmail}
						disabled={emailDisabled}
					/>
				</div>

				<div className='form-footer'>
					<Button
						disabled={buttonDisabled}
						type='submit'
						isLarge
						isPrimary
					>
						Send recovery link
					</Button>
					{isSubmitted && (
						<>
							<div className='success-message'>
								<p>Check your e-mail. We've sent you a recovery link. If you didn't get the link, check your spam folder or try again in 10 minutes.</p>
							</div>
							<hr />
							<div className='resend-timer' id='countdown-status'>
								<ClockIcon aria-hidden='true' />
								<p>Wait {Math.ceil(seconds / 60)} minutes for a new activation link</p>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
