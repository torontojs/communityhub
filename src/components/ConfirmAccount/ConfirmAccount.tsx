import { useEffect } from 'react';
import Button from '../Button/Button.tsx';
import Header from '../Header/Header.tsx';
import './ConfirmAccount.css';
import '/index.css';

/**
 * Take the UUID from the Url which will be my page.
 * The link in the email will be this page: /api/auth/activate
 *
 * Change the src > email > index.ts to add /api on the URL call
 *
 * Change the email to redirect to /page/ConfirmAccount
 *
 * Go read the auth routes on the backend read dev.vars inside backend UUID Will live inside the session (superfast cache for activation tokens).
 * Add heartbeat check, if they are alrady signed in then send them to the homepage - later
 * Fixing btn
 */

// TODO: Heartbeat beat implementation redirects to home page
const ConfirmAccount = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const tokenFromUrl = params.get('token');
		if (tokenFromUrl) {
			authenticateAccount(tokenFromUrl);
		}
	}, []);

	const authenticateAccount = async (token: string) => {
		try {
			const isTokenValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token);

			if (!isTokenValidUuid) {
				window.location.href = '/pages/sign-in';
			}
			const response = await fetch(`/api/auth/activate?token=${token}`, {
				method: 'GET'
			});

			if (!response.ok) {
				return;
			}
			window.location.href = '/pages/homepage';
		} catch (error) {
			if (import.meta.env.MODE === 'development') {
				console.error(error);
			}
		}
	};

	return (
		<div className='confirm-account-page-container'>
			<div className='confirm-account-page-card'>
				<Header>Confirm your account</Header>
				<div className='confirm-account-page-body'>
					<p className='confirm-account-page-text'>
						Hello! Click the button below to confirm your TorontoJS Community Hub account.
					</p>
					<div className='confirm-account-page-btn'>
						<Button isPrimary size='medium'>
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
