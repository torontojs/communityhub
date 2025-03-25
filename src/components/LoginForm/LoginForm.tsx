import './LoginForm.css';
import Button from '../Button/Button';

const LoginForm = () => (
	<form className='login-form'>
		<p className='center'>Enter your e-mail and password to log-in.</p>
		<div className='inputDim'>
			<label className='block' htmlFor='email'>E-mail</label>
			<input type='email' id='email' name='email' />
		</div>
		<div className='inputDim'>
			<label className='block' htmlFor='password'>Password</label>
			<input type='password' id='password' name='password' />
		</div>
		<div className='inputDim'>
			<label className='block' htmlFor='remember-me'>Remember my password</label>
			<input type='checkbox' id='remember-me' name='remember-me' />
		</div>
		<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED342F' }}>Log In</Button>
		<a href='/forgot-password'>I don't remember my password</a>
		<div id='line-seperator'></div>
		<div>
			<p>
				If you're a member of TorontoJS and don't have your account, <a href='/path-to-other-page'>Click here to go to another page</a>
			</p>
		</div>
	</form>
);

export default LoginForm;
