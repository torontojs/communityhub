import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import ResetPassword from '../../components/ResetPassword/ResetPassword.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLAnchorElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<Header>Set your new password</Header>
					<ResetPassword />
					<FooterNav />
				</div>
			</div>
		</StrictMode>
	)
);
