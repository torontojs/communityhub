import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';
import { useHeartBeatProtectedOrganizer } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useHeartBeatProtectedOrganizer}>
				<Header>Organizer protected page</Header>
			</AuthGate>
		</StrictMode>
	)
);
