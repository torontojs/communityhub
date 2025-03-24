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
		<a href='/forgot-password'>I don't remember my password</a>
		<div id='line-seperator'></div>
		<div>
			<p>
				If you're a member of TorontoJS and don't have your account, <a href="/path-to-other-page">Click here to go to another page</a>

			</p>
		</div>
	</form>
);

export default LoginForm;
