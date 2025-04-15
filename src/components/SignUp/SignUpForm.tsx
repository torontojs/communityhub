import './SignUpForm.css';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button';

const apiUrl = import.meta.env.MODE === 'production'
	? import.meta.env['APP_API_URL_PROD']
	: import.meta.env['APP_API_URL_DEV'];

function getDynamicColor(strength: number): string {
	if (strength <= 1) return 'red';
	if (strength === 2) return 'yellow';
	if (strength >= 3) return '#009900';
	return 'grey';
}

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

const SignUpForm = (): React.JSX.Element => {
	const [password] = useState('');
	const [strength, setStrength] = useState<number | null>(null);
	const [feedback, setFeedback] = useState<string>('');
	const [dynamicColor, setDynamicColor] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isNameValid, setIsNameValid] = useState<boolean>(false);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		if (password === null) { return; }
		const result = zxcvbn(password);
		setStrength(result.score);
		setDynamicColor(getDynamicColor(result.score));
		setFeedback(result.feedback.suggestions.join(', '));
	};

	const signup = async (name:string, email:string, password:string) => {
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

	// Get references to the inputs
	const nameInput = form.querySelector('#name-input') as HTMLInputElement;
	const emailInput = form.querySelector('#email-input') as HTMLInputElement;
	const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;

	// Use built-in validation
	const nameIsValid = nameInput.checkValidity();
	const emailIsValid = emailInput.checkValidity();
	const passwordIsValid = passwordInput.value.length === 3; 

	setIsNameValid(nameIsValid);
	setIsEmailValid(emailIsValid);
	setIsPasswordValid(passwordIsValid);

	if (!nameIsValid || !emailIsValid || !passwordIsValid) {
		return; 
	}

	const formData = new FormData(form);
	const nameValue = (formData.get('name') ?? '').toString().trim();
	const emailValue = (formData.get('email') ?? '').toString().trim();
	const passwordValue = (formData.get('password') ?? '').toString().trim()

	await signup(nameValue, emailValue, passwordValue);
};

const handleEmailBlur = () => {
    const emailInput = document.querySelector('#email-input') as HTMLInputElement;
    if (emailInput) {
        const isValid = emailInput.checkValidity(); 
		setIsEmailValid(isValid); 
    }
};

const handlePasswordBlur = () => {
    const passwordInput = document.querySelector('#password-input') as HTMLInputElement;
    if (passwordInput) {
        const isValid = passwordInput.checkValidity(); 
		setIsPasswordValid(isValid); 
    }
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
					aria-invalid={!isNameValid}
				/>
			</div>

			<div className='inputDim'>
				<label className='block' htmlFor='email'>
					E-mail<span>REQUIRED</span>
				</label>
				<input id='email-input' type='email' name='email' placeholder='Your account e-mail' aria-label='Input your account e-mail' aria-invalid={!isEmailValid} onBlur={handleEmailBlur} />
				<p>Insert the email you'll use for this account</p>
			</div>
			<div className='inputDim'>
				<label className='block' htmlFor='password'>
					Password:<span>REQUIRED</span>
				</label>
				<input
					id="password-input"
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					placeholder='Your password'
					aria-label='Input your password'
					aria-invalid={!isPasswordValid}
					onBlur={handlePasswordBlur}
				/>
			</div>
			{password && (
				<div aria-live='polite' aria-invalid={strength !== null && strength < 2} className='passwordError'>
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
