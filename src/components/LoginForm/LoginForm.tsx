import './LoginForm.css';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';

const LoginForm = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const emailE = formData.get('email') as string;
		const passwordE = formData.get('password') as string;

		setEmail(emailE);
		setPassword(passwordE);

		console.log('Email:', email);
		console.log('Password:', password);
	};

	const signIn = async () => {
		const response = await fetch('https//torontojs.com/vms/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		// Validate the res status
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			window.location.href = 'https//torontojs.com/vms/home';
		} else {
			throw Error('Backend error!');
		}
	};

	useEffect(() => {
		signIn();
	}, []);

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<p className='center'>Enter your e-mail and password to log-in.</p>
			<div className='inputDim'>
				<label className='block' htmlFor='email'>E-mail</label>
				<input type='email' name='email' placeholder='Your account e-mail' required />
			</div>
			<div className='inputDim'>
				<label className='block' htmlFor='password'>Password</label>
				<input type='password' name='password' placeholder='Your password' />
			</div>
			<div className='inputDimRadio flex'>
				<input type='checkbox' id='remember-me' name='remember-me' />
				<label htmlFor='remember-me' className='padding-left-2px'>Remember my password</label>
			</div>
			<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED343F' }}>Log In</Button>
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
