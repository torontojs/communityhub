import { useEffect } from 'react';
import Button from '../Button/Button.tsx';
import Header from '../Header/Header.tsx';
import './ConfirmAccount.css';
import '/index.css';

const ConfirmAccount = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const tokenFromUrl = params.get('token');
		if (tokenFromUrl) {
			console.log('Token from URL:', tokenFromUrl);
			authenticateAccount(tokenFromUrl);
		}
	}, []);

	const authenticateAccount = async (token: string) => {
		try {
			const response = await fetch(`/api/auth/activate?token=${token}`, {
				method: 'GET'
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Response not ok:', errorData);
				return;
			}
			window.location.href = '/pages/homepage';
		} catch (error) {
			console.error('Error during authentication:', error);
		}
	};

	// take the UUID from the Url which will be my page
	// the link in the email will be this page\
	// /api/auth/activate

	// Change the src > email > index.ts to add /api on the URL call

	// Change the email to redirect to /page/ConfirmAccount

	// Go read the auth routes on the backend
	// read dev.vars inside backend
	// UUID Will live inside the session (superfast cache for activation tokens)
	// Add heartbeat check, if they are alrady signed in then send them to the homepage - later
	// Fixing btn

	return (
		<div className='confirm-account-page-container'>
			<div className='confirm-account-page-card'>
				<Header>Confirm your account</Header>
				<div className='confirm-account-page-body'>
					<p className='confirm-account-page-text'>
						Hello! Click the button below to confirm your TorontoJS Community Hub account.
					</p>
					<div className='confirm-account-page-btn'>
						<Button isPrimary isLarge>
							Confirm my e-mail
						</Button>
					</div>
					<p className='confirm-account-page-text-subtext'>
						If you didn't request this change, please ignore this email.
					</p>
				</div>
			</div>
			<footer>
				<p className='text-helper'>TorontoJS - 2025</p>
			</footer>
		</div>
	);
};

export default ConfirmAccount;
