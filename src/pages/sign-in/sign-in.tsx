import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateCheck } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import SignInForm from '../../components/SignIn/SignInForm.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<div className='app'>
			<div className='page'>
				<AuthGateCheck>
					<Header>Welcome to TorontoJS Community Hub</Header>
					<SignInForm />
					<FooterNav />
				</AuthGateCheck>
			</div>
		</div>
	)
);
