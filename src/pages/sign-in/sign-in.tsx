import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FooterNav from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SignInForm from '../../components/SignIn/SignInForm';
import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='signInPage'>
					<Header>Welcome to TorontoJS Community Hub</Header>
					<SignInForm />
					<FooterNav />
				</div>
			</div>
		</StrictMode>
	)
);
