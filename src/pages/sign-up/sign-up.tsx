import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import SignUpForm from '../../components/SignUp/SignUpForm.tsx';
import '../../index.css';
import { StrictMode } from 'react';
import { useHeartBeat } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<AuthGate hook={useHeartBeat}>
						<Header>Sign Up to TorontoJS Community Hub</Header>
						<SignUpForm />
						<FooterNav />
					</AuthGate>
				</div>
			</div>
		</StrictMode>
	)
);
