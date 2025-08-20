import './ResetPasswordSuccess.css';
const ResetPasswordSuccess = () => {
	return (
		<div className='reset-password-success'>
			<p>
				Your new password was set successfully. <br /> Click below to sign in.
			</p>
			<span className='line'></span>
			<div>
				<a href='/pages/sign-in' className='Log-in-account-link'>Log in you account</a>
			</div>
		</div>
	);
};

export default ResetPasswordSuccess;
