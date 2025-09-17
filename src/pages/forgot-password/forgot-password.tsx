import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateCheck } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPassword.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<AuthGateCheck>
						<Header>Recover your password</Header>
						<ForgotPasswordForm />
						<FooterNav />
					</AuthGateCheck>
				</div>
			</div>
		</StrictMode>
	)
);
