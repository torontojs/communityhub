import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ClockIcon from '../../components/Icons/ClockIcon';
import './CheckYourEmail.css';

const CheckYourEmail = ({ email }: { email: string }) => {
	const RESEND_MINUTES = 10;
	const [minutes, setMinutes] = useState(RESEND_MINUTES);
	const [hasResent, setHasResent] = useState(false);

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
		}, 60 * 1000);

		return () => clearInterval(timer);
	}, [hasResent]);

	return (
		<div className='check-email-page'>
			<Header>Check your e-mail</Header>
			<main className='check-email-main'>
				<p>
					We&apos;ve sent a message to your e-mail <b>{email}</b> (Is it wrong?{' '}
					<a href='#' className='change-email'>
						Change it
					</a>
					) with a link to activate your account.
				</p>
				<hr />
				<p>
					If you didn&apos;t get the link, check your spam folder or resend it in {RESEND_MINUTES} minutes.
				</p>
				<hr />
				{hasResent && minutes > 0 && <p className='new-link-sent'>New activation link sent</p>}
				{minutes > 0 ?
					(
						<div className='wait-for-link'>
							<ClockIcon />
							<p>Wait {minutes} minutes for a new activation link</p>
						</div>
					) :
					(
						<a
							href='#'
							className='resend-link'
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
