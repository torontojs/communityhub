import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGatePrivateAll } from '../../components/AuthGate/AuthGate.tsx';
import Header from '../../components/Header/Header.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGatePrivateAll>
				<Header>Page that requires you to be authenticated as a volunteer and with completed profile</Header>
			</AuthGatePrivateAll>
		</StrictMode>
	)
);
