import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPassword.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';
import { useHeartBeat } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<AuthGate hook={useHeartBeat}>
						<Header>Recover your password</Header>
						<ForgotPasswordForm />
						<FooterNav />
					</AuthGate>
				</div>
			</div>
		</StrictMode>
	)
);
