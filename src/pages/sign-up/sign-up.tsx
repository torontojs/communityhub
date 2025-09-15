import 'open-props';
import { createRoot } from 'react-dom/client';
import { AuthGateCheck } from '../../components/AuthGate/AuthGate.tsx';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import SignUpForm from '../../components/SignUp/SignUpForm.tsx';
import '../../index.css';
import { StrictMode } from 'react';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<AuthGateCheck>
						<Header>Sign Up to TorontoJS Community Hub</Header>
						<SignUpForm />
						<FooterNav />
					</AuthGateCheck>
				</div>
			</div>
		</StrictMode>
	)
);
