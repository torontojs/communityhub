import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button.tsx';
import Header from '../Header/Header.tsx';
import './ConfirmAccount.css';
import '/index.css';
import { getHeartBeat } from '../../hooks/useHeartBeat.ts';

async function authenticateAccount(token: string) {
	try {
		const response = await fetch(`/api/auth/activate?token=${token}`, { method: 'GET' });

		if (!response.ok) {
			window.location.href = '/pages/sign-in';
		}
		window.location.href = '/pages/sign-in';
		// TODO: Create succesful page: https://github.com/torontojs/communityhub/issues/245
	} catch (error) {
		console.error(error);
	}
}

const ConfirmAccount = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	const token = useRef<string | null>(null);

	useEffect(() => {
		const check = async () => {
			const auth = await getHeartBeat();
			if (auth) {
				window.location.href = '/pages/home';
				return;
			}

			setIsAuth(true);

			const params = new URLSearchParams(window.location.search);
			const tokenFromUrl = params.get('token');

			if (!tokenFromUrl) {
				window.location.href = '/pages/sign-in';
				return;
			}

			const isTokenValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(tokenFromUrl);

			if (!isTokenValidUuid) {
				window.location.href = '/pages/sign-in';
				return;
			}

			token.current = tokenFromUrl;
		};
		void check();
	}, []);

	const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (token.current) {
			void authenticateAccount(token.current);
		}
	};

	if (isAuth) {
		return (
			<div className='confirm-account-page-container'>
				<div className='confirm-account-page-card'>
					<Header>Confirm your account</Header>
					<div className='confirm-account-page-body'>
						<p className='confirm-account-page-text'>
							Hello! Click the button below to confirm your TorontoJS Community Hub account.
						</p>
						<div className='confirm-account-page-btn'>
							<Button onClick={handleOnClick} isPrimary size='medium'>
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
	}
	return <h1>Is Loading...</h1>;
};

export default ConfirmAccount;
