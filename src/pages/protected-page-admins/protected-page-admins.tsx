import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout.tsx';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useHeartBeatProtectedAdmin } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useHeartBeatProtectedAdmin}>
					<AuthenticatedLayout>
						<Header>Protected admin page</Header>
					</AuthenticatedLayout>
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
