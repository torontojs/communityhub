import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import ForgotPasswordForm from '../../components/ForgotPassword/ForgotPassword.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useHeartBeat } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<div className='app'>
					<div className='page'>
						<AuthGate hook={useHeartBeat}>
							<Header>Recover your password</Header>
							<ForgotPasswordForm />
							<FooterNav />
						</AuthGate>
					</div>
				</div>
			</AuthProvider>
		</StrictMode>
	)
);
