import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ClockIcon from '../../components/Icons/ClockIcon';
import './CheckYourEmail.css';

const CheckYourEmail = () => (
	<div className='check-email-page'>
		<Header>Check your e-mail</Header>
		<main className='check-email-main'>
			<p>
				We&apos;ve sent a message to your e-mail <b>hadi.kamal@gmail.com</b> (Is it wrong?{' '}
				<a href='#' className='check-email-change'>
					Change it
				</a>
				) with a link to activate your account.
			</p>
			<hr />
			<p>If you didn&apos;t get the link, check your spam folder or resend it in 10 minutes.</p>
			<hr />
			<div className='check-email-wait'>
				<ClockIcon />
				<p>Wait 9 minutes for a new activation link</p>
			</div>
		</main>
		<Footer />
	</div>
);

export default CheckYourEmail;
