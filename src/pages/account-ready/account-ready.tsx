import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AccountReadyForm from '../../components/AccountReady/AccountReady.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<div className='page'>
					<Header>Your account is ready</Header>
					<AccountReadyForm />
					<Footer />
				</div>
			</div>
		</StrictMode>
	)
);
