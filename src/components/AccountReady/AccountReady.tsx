import React from 'react';
import './AccountReady.css';

const AccountReadyForm = (): React.JSX.Element => (
	<div id='account-ready-form'>
		<p>Your new password was set successfully. Click below to sign in.</p>
		<hr />
		<a href='/pages/sign-in'>
			Log in your account
		</a>
	</div>
);

export default AccountReadyForm;
