import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import Teams from '../../components/Teams/Teams.tsx';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';

import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useHeartBeatProtected}>
					<div className='App'>
						<Teams />
					</div>
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
