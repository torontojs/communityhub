import './SignInForm.css';
import { useRef, useState } from 'react';
import Button from '../Button/Button.tsx';

const SignInForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signin = async (email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
			if (response.status !== 201) {
				setIsLoading(false);
				const errorData = await response.json();
				console.error('Response not ok: ', errorData);
			} else {
				window.location.href = '/pages/home';
			}
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setIsLoading(true);
		event.preventDefault();

		const emailIsValid = emailInputRef.current?.checkValidity() ?? false;
		const passwordIsValid = passwordInputRef.current?.checkValidity() ?? false;

		if (!emailIsValid || !passwordIsValid) {
			setIsLoading(false);
			return;
		}
		const form = event.currentTarget;

		const formData = new FormData(form);
		const emailValue = (formData.get('email') as string ?? '').trim();
		const passwordValue = (formData.get('password') as string ?? '').trim();

		await signin(emailValue, passwordValue);
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<div>
				<p className='center'>Please enter your email and password to log-in.</p>
			</div>

			<div className='input-block'>
				<label className='block' htmlFor='email-input'>
					E-mail<span>REQUIRED</span>
				</label>
				<input
					id='email-input'
					type='email'
					name='email'
					autoComplete='email'
					placeholder='Your account e-mail'
					required
					aria-describedby='email-input-helper-text'
					ref={emailInputRef}
				/>
				<div id='email-input-helper-text'>
					<span>Insert your email</span>
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
					autoComplete='password'
					placeholder='Your password'
					required
					aria-describedby='password-input-helper-text'
					ref={passwordInputRef}
				/>
				<div id='password-input-helper-text'>
					<span>Insert your password</span>
				</div>
			</div>

			<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED343F' }} aria-label='Complete sign-up form button' disabled={isLoading}>
				{isLoading ? 'Logging In' : 'Log In'}
			</Button>

			<div>
				<a href='/pages/forgot-password' className='do-not-remember-password'>I don't remember my password</a>
			</div>

			<div>
				<span className='line'></span>
			</div>

			<div className='have-account'>
				<p className='not-member'>
					If you are a member of ToronoJS and don't have your account, <a href='/pages/sign-up' className='underline'>click here to sign-up</a>
				</p>
			</div>
		</form>
	);
};

export default SignInForm;
