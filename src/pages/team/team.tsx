import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import TeamDetail from '../../components/TeamDetail/TeamDetail.tsx';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';

import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;
const teamId = new URLSearchParams(window.location.search).get('id');

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useHeartBeatProtected}>
					<div className='App'>
						{teamId ?
							<TeamDetail teamId={teamId} /> :
							<div aria-live='polite' role='status'>Team not found.</div>}
					</div>
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
