import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import SignInForm from '../../components/SignIn/SignInForm.tsx';
import '../../index.css';
import { useHeartBeat } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<AuthGate hook={useHeartBeat}>
						<Header>Welcome to TorontoJS Community Hub</Header>
						<SignInForm />
						<FooterNav />
					</AuthGate>
				</div>
			</div>
		</StrictMode>
	)
);
