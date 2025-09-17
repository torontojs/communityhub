import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateHomePageProtected } from '../../components/AuthGate/AuthGate.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import { Home } from '../../components/Home/Home.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateHomePageProtected>
				<Header>VMS Home Page</Header>
				<Home />
				<Footer />
			</AuthGateHomePageProtected>
		</StrictMode>
	)
);
