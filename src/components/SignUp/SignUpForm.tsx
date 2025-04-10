import './SignUpForm.css';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button';

const SignUpForm = (): React.JSX.Element => {
	const [password, setPassword] = useState('');
	const [strength, setStrength] = useState<number | null>(null);
	const [feedback, setFeedback] = useState<string>('');
	const [dynamicColor, setDynamicColor] = useState<string>('');

	function sDynamicColor(strength: number) {
		switch (strength) {
			case 0:
			case 1:
				setDynamicColor('red');
				break;
			case 2:
				setDynamicColor('yellow');
				break;
			case 3:
			case 4:
				setDynamicColor('green');
				break;
			default:
				setDynamicColor('grey');
		}
	}
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		setPassword(password);

		const result = zxcvbn(password);
		setStrength(result.score);
		sDynamicColor(result.score);
		setFeedback(result.feedback.suggestions.join(', '));
	};

	const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

	// Const Signup = async () => {
	// 	Try {
	// 		Const response = await fetch("", {
	// 			Method: 'POST',
	// 			Headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			Body: JSON.stringify({ email, password })
	// 		});
	// 		// Validate the res status4:00pm
	// 		If (!response.ok) {
	// 			Const errorData = await response.json();
	// 			Console.log('Response not ok: ', errorData);
	// 		}

	// 		Const data = await response.json();
	// 		Console.log('data received from sign in ', data);
	// 		Window.location.href = "";
	// 	} catch (e) {
	// 		If (e instanceof Error) {
	// 			Console.error(e.name);
	// 			Console.error(e.cause);
	// 			Console.error(e.message);
	// 			Console.error(e.stack);
	// 		} else {
	// 			Throw new Error('Sign-in unknown error!');
	// 		}
	// 	}
	// };

	return (
		<form className='login-form' onError={() => console.log('Form error!')}>
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
					pattern='[A-Za-z]+'
					required
					title='Please enter a valid name (only letters allowed, max 20 characters)'
				/>
			</div>

			<div className='inputDim'>
				<label className='block' htmlFor='email'>
					E-mail<span>REQUIRED</span>
				</label>
				<input id='email-input' type='email' name='email' placeholder='Your account e-mail' />
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
				/>
			</div>
			{password && (
				<span className='passwordError'>
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
				</span>
			)}
			<Button type='submit' isLarge={true} onClick={() => console.log('Button click!')} style={{ color: 'white', background: '#ED343F' }}>Create Account</Button>
			<div className='tb-margin'>
				<p className='not-member'>
					If you already have an account, <a href='/path-to-other-page' className='underline'>click here to log-in</a>
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
