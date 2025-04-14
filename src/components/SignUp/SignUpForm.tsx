import './SignUpForm.css';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button';

const apiUrl = import.meta.env.MODE === 'production'
	? import.meta.env['APP_API_URL_PROD']
	: import.meta.env['APP_API_URL_DEV'];

function getDynamicColor(strength: number): string {
	switch (strength) {
		case 0:
		case 1:
			return 'red';
		case 2:
			return 'yellow';
		case 3:
		case 4:
			return '#009900';
		default:
			return 'grey';
	}
}

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

const SignUpForm = (): React.JSX.Element => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState('');
	const [strength, setStrength] = useState<number | null>(null);
	const [feedback, setFeedback] = useState<string>('');
	const [dynamicColor, setDynamicColor] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		if (password === null) { return; }
		setPassword(password);

		const result = zxcvbn(password);
		setStrength(result.score);
		setDynamicColor(getDynamicColor(result.score));
		setFeedback(result.feedback.suggestions.join(', '));
	};

	const signup = async () => {
		try {
			const response = await fetch(`${apiUrl}sign-up`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.log('Response not ok: ', errorData);
			} else {
				window.location.href = `${apiUrl}profile-completion`;
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
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);

		const nameValue = (formData.get('name') as string).trim();
		const emailValue = (formData.get('email') as string).trim();
		const passwordValue = (formData.get('password') as string).trim();

		setName(nameValue);
		setEmail(emailValue);
		setPassword(passwordValue);

		await signup();
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<p className='center'>Welcome! Let's set up your account.</p>

			<div className='inputDim'>
				<label className='block' htmlFor='name'>Name</label>
				<input
					id='name-input'
					type='text'
					name='name'
					placeholder='Your name'
					minLength={1}
					maxLength={20}
					required
					title='Please enter a valid name (only letters allowed, max 20 characters)'
					aria-label='Please input a valid name (only letters allowed, max 20 characters)'
				/>
			</div>

			<div className='inputDim'>
				<label className='block' htmlFor='email'>
					E-mail<span>REQUIRED</span>
				</label>
				<input id='email-input' type='email' name='email' placeholder='Your account e-mail' aria-label='Input your account e-mail' />
				<p>Insert the email you'll use for this account</p>
			</div>
			<div className='inputDim'>
				<label className='block' htmlFor='password'>
					Password:<span>REQUIRED</span>
				</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					placeholder='Your password'
					aria-label='Input your password'
				/>
			</div>
			{password && (
				<div aria-live='polite' className='passwordError'>
					<div className=' text-size'>
						<div>
							<span className={dynamicColor}>Password strength: {strengthLabels[strength || 0]}</span>
						</div>
						<div className='password-meter'>
							<span className='password-meter-level' style={{ backgroundColor: strength !== null ? dynamicColor : 'var(--color-card)' }}></span>
							<span className='password-meter-level' style={{ backgroundColor: strength && strength >= 2 ? dynamicColor : 'var(--color-card)' }}></span>
							<span className='password-meter-level' style={{ backgroundColor: strength && strength >= 3 ? dynamicColor : 'var(--color-card)' }}></span>
						</div>
						{strength !== null && strength < 3 && (
							<div className='suggestion'>
								<span className='suggestion-icon' />
								<p>Suggestions: {feedback}</p>
							</div>
						)}
					</div>
				</div>
			)}
			<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED343F' }} aria-label='Complete sign-up form button'>Create Account</Button>
			<div className='tb-margin'>
				<p className='not-member'>
					If you already have an account, <a href={`${apiUrl}sign-in`} className='underline'>Click here to log-in</a>
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
