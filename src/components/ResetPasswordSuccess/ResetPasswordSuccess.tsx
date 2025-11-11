import './ResetPasswordSuccess.css';
const ResetPasswordSuccess = () => (
	<div className='reset-password-success'>
		<p>
			Your password was reset successfuly<br />Click below to sign in.
		</p>
		<span className='line'></span>
		<div>
			<a href='/pages/sign-in' className='log-in-account-link'>Log in you account</a>
		</div>
	</div>
);

export default ResetPasswordSuccess;
