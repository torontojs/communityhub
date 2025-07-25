import './ResetPassword.css';
import React, { useRef, useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button.tsx';

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

export const ResetPassword = (): React.JSX.Element => {
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [passwordDisabled, setPasswordDisabled] = useState(false);

	const [strength, setStrength] = useState<number | null>(null);
	const [feedback, setFeedback] = useState<string>('');

	const token = new URLSearchParams(window.location.search).get('token');

	if (token == null) {
		window.location.href = '/pages/sign-in';
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const passwordValue = formData.get('password') as string;

		setButtonDisabled(true);
		setPasswordDisabled(true);

		await resetPassword(token, passwordValue);
	};

	const resetPassword = async (token: string | null, password: string) => {
		try {
			const response = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token, password })
			});
			if (!response.ok) {
				window.location.href = '/pages/sign-in';
			} else {
				window.location.href = '/pages/sign-in';
			}
		} catch (error) {
			if (import.meta.env.MODE === 'development') {
				console.error(error);
			}
		}
	};

	// Review this
	const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		const result = zxcvbn(password);
		const feedback = result.feedback.suggestions;

		if (result.score < 3) {
			setStrength(result.score);
			setButtonDisabled(true);
		} else if (password.length < 15) {
			setStrength(2);
			feedback.push('Password is shorter than 15 characters');
			setButtonDisabled(true);
		} else {
			setStrength(result.score);
			setButtonDisabled(false);
		}

		setFeedback(feedback.join(', '));
	};

	return (
		<div id='password-reset-form'>
			<form onSubmit={handleSubmit} id='reset-content' noValidate>
				<div>
					<p className='center'>Enter you new password for your account.</p>
				</div>

				<div className='input-block'>
					<label className='block' htmlFor='password-input'>
						Password:<span>REQUIRED</span>
					</label>
					<input
						id='password-input'
						type='password'
						name='password'
						disabled={passwordDisabled}
						onInput={handleOnInput}
						placeholder='Your password'
						required
						aria-describedby='password-input-strength password-input-suggestion password-input-helper-text'
						ref={passwordInputRef}
					/>
					<div className='passwordError' hidden={strength === null}>
						<div className='text-size'>
							<div id='password-input-strength' aria-live='polite'>
								<span>Password strength: {strengthLabels[strength || 0]}</span>
							</div>

							<div className='password-meter' data-password-strength={strengthLabels[strength || 0]} aria-hidden='true'>
								<span className='password-meter-level'></span>
								<span className='password-meter-level'></span>
								<span className='password-meter-level'></span>
							</div>
							<div id='password-input-suggestion' className='suggestion' data-password-strength={strengthLabels[strength || 0]}>
								<span className='suggestion-icon' />
								<p>Suggestions: {feedback}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='form-footer'>
					<Button
						disabled={buttonDisabled}
						type='submit'
						isLarge
						isPrimary
					>
						Set new password
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
