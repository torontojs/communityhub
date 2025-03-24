import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'open-props';
import FooterNav from '../../components/Footer/Footer';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<header>
					<Logo />
					<HeaderTitle>Welcome to TorontoJS Community Hub</HeaderTitle>
				</header>
				<LoginForm />
				<FooterNav />
			</div>
		</StrictMode>
	)
);
