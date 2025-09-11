import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGateProtectedOrganizer } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateProtectedOrganizer>
				<Header>Organizer protected page</Header>
			</AuthGateProtectedOrganizer>
		</StrictMode>
	)
);
