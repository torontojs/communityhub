import './LoginForm.css';

const LoginForm = () => (
	<form className='login-form'>
		<p>Enter your e-mail and password to log-in.</p>
		<div>
			<label htmlFor='email'>Email</label>
			<input type='email' id='email' name='email' />
		</div>
		<div>
			<label htmlFor='password'>Password</label>
			<input type='password' id='password' name='password' />
		</div>
		<div>
			<label htmlFor='remember-me'>Remember my password</label>
			<input type='checkbox' id='remember-me' name='remember-me' />
		</div>
		<button type='submit'>Log-in</button>
		<link ref='/forgot-password'>I don't remember my password</link>
		<div id='line-seperator'></div>
		<div>
			<p>
				If you're a member of TorontoJS and don't have your account, <link>click here to sign up</link>
			</p>
		</div>
	</form>
);

export default LoginForm;
