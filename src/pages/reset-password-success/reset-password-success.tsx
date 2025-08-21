import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FooterNav from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import ResetPasswordSuccess from '../../components/ResetPasswordSuccess/ResetPasswordSuccess.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<Header>Account confirmation success</Header>
					<ResetPasswordSuccess />
					<FooterNav />
				</div>
			</div>
		</StrictMode>
	)
);
