import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import './style.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useHeartBeatProtected}>
				<AuthenticatedLayout mainClassName='notifications-page'>
					<h1>Notifications</h1>
					<p>Under construction</p>
				</AuthenticatedLayout>
			</AuthGate>
		</StrictMode>
	)
);
