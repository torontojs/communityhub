import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import SignUpForm from '../../components/SignUp/SignUpForm.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<Header>Sign Up to TorontoJS Community Hub</Header>
					<SignUpForm />
					<FooterNav />
				</div>
			</div>
		</StrictMode>
	)
);
