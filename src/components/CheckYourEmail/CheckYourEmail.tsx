import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import ClockIcon from '../../components/Icons/ClockIcon.tsx';
import './CheckYourEmail.css';

const CheckYourEmail = () => {
	const [email, setEmail] = useState('');
	const RESEND_MINUTES = 10;
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const MILLISECONDS_PER_MINUTE = 60 * 1000;
	const [minutes, setMinutes] = useState(RESEND_MINUTES);
	const [hasResent, setHasResent] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setEmail(params.get('email') ?? '');
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setMinutes((prevMinutes) => {
				if (prevMinutes <= 0) {
					clearInterval(timer);
					setHasResent(false);
					return 0;
				}
				return prevMinutes - 1;
			});
		}, MILLISECONDS_PER_MINUTE);

		return () => clearInterval(timer);
	}, [hasResent]);

	return (
		<div className='check-email-page'>
			<Header>Check your e-mail</Header>
			<main className='check-email-main'>
				<p>
					We've sent a message to your e-mail <b>{email}</b> (Is it wrong?{' '}
					<a href='/pages/sign-up'>
						Change it
					</a>
					) with a link to activate your account.
				</p>
				<hr />
				<p>
					If you didn't get the link, check your spam folder or resend it in {RESEND_MINUTES} minutes.
				</p>
				<hr />
				{hasResent && minutes > 0 && <p className='color-accent link-sent'>New activation link sent</p>}
				{minutes > 0 ?
					(
						<div className='color-helper'>
							<ClockIcon />
							<p>Wait {minutes} minutes for a new activation link</p>
						</div>
					) :
					(
						<a
							href='#'
							onClick={() => {
								setHasResent(true);
								setMinutes(RESEND_MINUTES);
							}}
						>
							Re-send activation link
						</a>
					)}
			</main>
			<Footer />
		</div>
	);
};

export default CheckYourEmail;
