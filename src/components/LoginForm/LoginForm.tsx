import './LoginForm.css';
import Button from '../Button/Button';

const LoginForm = () => (
	<form className='login-form'>
		<p className='center'>Enter your e-mail and password to log-in.</p>
		<div className='inputDim'>
			<label className='block' htmlFor='email'>E-mail</label>
			<input type='email' id='email' name='email' placeholder='Your account e-mail' />
		</div>
		<div className='inputDim'>
			<label className='block' htmlFor='password'>Password</label>
			<input type='password' id='password' name='password' placeholder='Your password' />
		</div>
		<div className='inputDimRadio flex'>
			<input type='checkbox' id='remember-me' name='remember-me' />
			<label htmlFor='remember-me' className='padding-left-2px'>Remember my password</label>
		</div>
		<Button type='submit' isLarge={true} style={{ color: 'white', background: '#ED342F' }}>Log In</Button>
		<a className='center block underline' href='/forgot-password'>I don't remember my password</a>
		<div className='line'></div>
		<div className='tb-margin'>
			<p className='not-member'>
				If you're a member of TorontoJS and don't have your account, <a href='/path-to-other-page' className='underline'>click here to sign-up</a>
			</p>
		</div>
	</form>
);

export default LoginForm;
