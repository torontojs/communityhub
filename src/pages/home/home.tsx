import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Header from '../../components/Header/Header.tsx';
import { Home } from '../../components/Home/Home.tsx';
import '../../index.css';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useProfileRedirect}>
				<Header>VMS Home Page</Header>
				<Home />
				<Footer />
			</AuthGate>
		</StrictMode>
	)
);
