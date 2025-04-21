import './SignInForm.css';
import { useRef, useState } from 'react';
import { getApiUrl } from '../../utilities/getApiUrl';
import Button from '../Button/Button';

const apiUrl = getApiUrl();

const SignInForm = (): React.JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signin = async (email: string, password: string) => {
		try {
			const response = await fetch(`${apiUrl}sign-in`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
			if (!response.ok) {
				setIsLoading(false);
				const errorData = await response.json();
				console.log('Response not ok: ', errorData);
			} else {
				window.location.href = `${apiUrl}home`;
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
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const emailIsValid = emailInputRef.current?.checkValidity() ?? false;
		const passwordIsValid = passwordInputRef.current?.checkValidity() ?? false;

		if (!emailIsValid || !passwordIsValid) {
			return;
		}
		const form = e.currentTarget;

		const formData = new FormData(form);
		const emailValue = (formData.get('email') as string ?? '').trim();
		const passwordValue = (formData.get('password') as string ?? '').trim();

		setIsLoading(true);
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
					// Value={password}
					// OnChange={handleChange}
					placeholder='Your password'
					required
					aria-describedby='password-input-strength password-input-suggestion'
					ref={passwordInputRef}
				/>
			</div>

			<div>
				<p>Remember my password</p>
			</div>

			<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED343F' }} aria-label='Complete sign-up form button' disabled={isLoading}>
				{isLoading ? 'Logging In' : 'Log In'}
			</Button>

			<div>
				<p>I don't remember my password</p>
			</div>

			<div>
				<span className='line'></span>
			</div>

			<div className='have-account'>
				<p className='not-member'>
					If you are a member of ToronoJS and don't have your acocunt, <a href={`${apiUrl}sign-up`} className='underline'>click here to sign-up</a>
				</p>
			</div>
		</form>
	);
};

export default SignInForm;
