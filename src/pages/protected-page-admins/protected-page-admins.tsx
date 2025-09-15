import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateProtectedAdmin } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateProtectedAdmin>
				<Header>Protected admin page</Header>
			</AuthGateProtectedAdmin>
		</StrictMode>
	)
);
