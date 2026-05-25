import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import './style.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import { ProtectedProfile } from '../../components/ProtectedProfile/ProtectedProfile.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';
const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useHeartBeatProtected}>
				<ProtectedProfile />
			</AuthGate>
		</StrictMode>
	)
);
