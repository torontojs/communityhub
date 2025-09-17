import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateProtected } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateProtected>
				<Header>Page that requires you to be authenticated and with completed profile</Header>
			</AuthGateProtected>
		</StrictMode>
	)
);
