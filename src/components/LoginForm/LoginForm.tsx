import './LoginForm.css';
import { useState } from 'react';
// Import { emailValidateMultiRegex, passwordValidateMultiRegex } from '../../utilities/passwordValidation';
import zxcvbn from 'zxcvbn';
import Button from '../Button/Button';
import Xicon from '../Icons/Utilities/Xicon';

// Interface FormErrors {
//   Name?: string;
//   Email?: string;
//   Age?: string;
// }

const LoginForm = (): React.JSX.Element => {
	// Const [email, setEmail] = useState<string>('');
	// Const [password, setPassword] = useState<string>('');
	// Const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
	// Const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
	// Const [errorEmail, setErrorEmail] = useState<string>('');
	// Const [errorPassword, setErrorPassword] = useState<string>('');
	// Const devVsProd: boolean = import.meta.env.DEV;
	// Const urlSignIn = devVsProd ? 'localhost:8787/auth/sign-in' : 'https//torontojs.com/vms/auth/sign-in';
	// Const urlHome = devVsProd ? 'localhost:3000/volunteer/home' : 'https//torontojs.com/volunteer/home';

	const [password, setPassword] = useState('');
	const [strength, setStrength] = useState<number | null>(null);
	// Const [feedback, setFeedback] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;
		setPassword(password);

		const result = zxcvbn(password);
		setStrength(result.score);
		// SetFeedback(result.feedback.suggestions.join(', '));
	};

	const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

	// Const validateFormFields = () => {
	// 	If (password === null || password === '') {
	// 		SetIsValidPassword(false);
	// 		SetErrorPassword('Password can not be empty');
	// 	} else if (!passwordValidateMultiRegex(password)) {
	// 		SetIsValidPassword(false);
	// 		SetErrorPassword('Your password is incorrect!');
	// 	} else if (passwordValidateMultiRegex(password)) {
	// 		SetIsValidPassword(true);
	// 		SetErrorPassword(null);
	// 	}

	// 	If (email === null || email === '') {
	// 		SetIsValidEmail(false);
	// 		SetErrorEmail('Email can not be empty!');
	// 	} else if (!emailValidateMultiRegex(email)) {
	// 		SetIsValidEmail(false);
	// 		SetErrorEmail('This is not a valid e-mail address!');
	// 	} else if (emailValidateMultiRegex(email)) {
	// 		SetIsValidEmail(true);
	// 		SetErrorEmail(null);
	// 	}
	// };

	// Const signIn = async () => {
	// 	Try {
	// 		Const response = await fetch(urlSignIn, {
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
	// 		Window.location.href = urlHome;
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

	// Const handleEmailValidity = (e: React.FocusEvent<HTMLInputElement>) => {
	// 	E.target.checkValidity();
	// 	SetIsValidEmail(null);

	// 	SetEmail(e.target.value);
	// 	If (e.target.validity.valueMissing) {
	// 	    SetIsValidEmail(false)
	// 		SetErrorEmail('email is required');
	// 	}
	// }

	// Const handlePasswordValidity = (e: React.FocusEvent<HTMLInputElement>) => {
	// 	E.target.checkValidity();
	// 	SetIsValidPassword(null);

	// 	SetPassword(e.target.value);
	// 	If (e.target.validity.valueMissing) {
	// 	    SetIsValidPassword(false)
	// 		SetErrorPassword('password is required');
	// 	}
	// }

	// Const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	E.preventDefault();
	// };

	return (
		<form className='login-form' onError={() => console.log('Form error!')}>
			<p className='center'>Enter your e-mail and password to log-in.</p>
			{
				/* <div className='inputDim'>
				<label className='block' htmlFor='email'>E-mail</label>
				<input id="email-input" type='email' name='email' placeholder='Your account e-mail' onBlur={handleEmailValidity}/>

			</div>
			<span id="email-error">
				<Xicon></Xicon> EMAIL ERROR!!!
			</span> */
			}
			<div className="inputDim">
				<label className='block' htmlFor='password'>Password:</label>
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
					<div className='red text-size'>
					<Xicon/><span>{strengthLabels[strength||0]}</span>
					</div>
					</span>
					)}
					{/* </span>
						<p>Password Strength: {strengthLabels[strength || 0]}</p>
						<p>Feedback: {feedback}</p>
					</div> */}

			{
			// 	<div className='inputDim'>
			// 	<label className='block' htmlFor='password'>Password</label>
			// 	<input type='password' name='password' minLength={16} placeholder='Your password' onBlur={handlePasswordValidity}/>
			// </div>
			// {isValidPassword === null || isValidPassword === true ? '' : (
			// 	<span className='passwordError'>
			// 		<Xicon></Xicon>
			// 		{errorPassword}
			// 	</span>
			// )}
			}
			<div className='inputDimRadio flex'>
				<input type='checkbox' id='remember-me' name='remember-me' />
				<label htmlFor='remember-me' className='padding-left-2px'>Remember my password</label>
			</div>
			<Button type='submit' isLarge={true} onClick={() => console.log('Button click!')} style={{ color: 'white', background: '#ED343F' }}>Log In</Button>
			<a className='center block underline' href='/forgot-password'>I don't remember my password</a>
			<div className='line'></div>
			<div className='tb-margin'>
				<p className='not-member'>
					If you're a member of TorontoJS and don't have your account, <a href='/path-to-other-page' className='underline'>click here to sign-up</a>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
