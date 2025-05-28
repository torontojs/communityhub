import './SignUpForm.css';
import { useRef, useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button.tsx';

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

const SignUpForm = (): React.JSX.Element => {
	const nameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const [strength, setStrength] = useState<number | null>(null);
	const [feedback, setFeedback] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		const result = zxcvbn(password);
		setStrength(result.score);
		setFeedback(result.feedback.suggestions.join(', '));
	};

	const signup = async (name: string, email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});
			if (!response.ok) {
				setIsLoading(false);
				const errorData = await response.json();
				console.log('Response not ok: ', errorData);
			} else {
				window.location.href = '/pages/profile-completion/';
			}
		} catch (e) {
			if (import.meta.env.MODE === 'development') {
				if (e instanceof Error) {
					console.error(e.name);
					console.error(e.cause);
					console.error(e.message);
					console.error(e.stack);
				} else {
					throw new Error('Error sign-up');
				}
			}
			setIsLoading(false);
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nameIsValid = nameInputRef.current?.checkValidity() ?? false;
		const emailIsValid = emailInputRef.current?.checkValidity() ?? false;
		const passwordIsValid = passwordInputRef.current?.checkValidity() ?? false;

		if (!nameIsValid || !emailIsValid || !passwordIsValid) {
			return;
		}
		const form = event.currentTarget;

		const formData = new FormData(form);
		const nameValue = (formData.get('name') as string ?? '').trim();
		const emailValue = (formData.get('email') as string ?? '').trim();
		const passwordValue = (formData.get('password') as string ?? '').trim();

		setIsLoading(true);
		await signup(nameValue, emailValue, passwordValue);
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<div>
				<h2 className='center'>Welcome! Let's set up your account.</h2>
			</div>
			<div className='input-block'>
				<label className='block' htmlFor='name-input'>Name</label>
				<input
					id='name-input'
					type='text'
					name='name'
					placeholder='Your name'
					minLength={1}
					required
					aria-describedby='name-input-helper-text'
					ref={nameInputRef}
				/>
				<div id='name-input-helper-text'>
					<span>Please enter a valid name that is at least 1 character long.</span>
				</div>
			</div>

			<div className='input-block'>
				<label className='block' htmlFor='email-input'>
					E-mail<span>REQUIRED</span>
				</label>
				<input
					id='email-input'
					type='email'
					name='email'
					placeholder='Your account e-mail'
					required
					aria-describedby='email-input-helper-text'
					ref={emailInputRef}
				/>
				<div id='email-input-helper-text'>
					<span>Insert the email you'll use for this account</span>
				</div>
			</div>

			<div className='input-block'>
				<label className='block' htmlFor='password-input'>
					Password:<span>REQUIRED</span>
				</label>
				<input
					id='password-input'
					type='password'
					name='password'
					onInput={handleOnInput}
					placeholder='Your password'
					required
					aria-describedby='password-input-strength password-input-suggestion'
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

			<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED343F' }} disabled={isLoading}>
				{isLoading ? 'Creating Account' : 'Create Account'}
			</Button>

			<div>
				<span className='line'></span>
			</div>

			<div className='have-account'>
				<p className='not-member'>
					If you already have an account, <a href='/pages/sign-in' className='underline'>Click here to log-in</a>
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
