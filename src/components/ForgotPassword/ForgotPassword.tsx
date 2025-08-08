import React, { useEffect, useRef, useState } from 'react';
import './ForgotPassword.css';
import Button from '../Button/Button.tsx';
import ClockIcon from '../Icons/ClockIcon.tsx';

// TODO: Investigate if we're able to use heartbeat to check if forgot password request already in progress and how the page react if there is one

const requestPasswordRecovery = async (email: string) => {
	try {
		const response = await fetch('/api/auth/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		return response.ok;
	} catch (error) {
		if (import.meta.env.MODE === 'development') {
			console.error(error);
		}
	}
	return false;
};

const ForgotPasswordForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [validEmail, setIsValid] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);

	// Email input disabled after submit
	const emailDisabled = isSubmitted;

	// Button disabled if email invalid OR after submit
	const buttonDisabled = !validEmail || emailDisabled;

	useEffect(() => {
		if (!isSubmitted) { return; }

		if (remainingTime === 0) { return; }

		const timer = setInterval(() => {
			setRemainingTime((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [remainingTime, isSubmitted]);

	const handleValidEmail = () => {
		setIsValid(emailInputRef.current?.checkValidity() ?? false);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const emailValue = (formData.get('email') as string).trim().toLowerCase();

		setIsSubmitted(true);

		const success = await requestPasswordRecovery(emailValue);

		if (success) {
			setIsSubmitted(true);
			setRemainingTime(600);
		}
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
								<p>Wait {Math.ceil(remainingTime / 60)} minutes for a new activation link</p>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default ForgotPasswordForm;
