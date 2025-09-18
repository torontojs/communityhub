import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import './style.css';
import { AuthGateProtected } from '../../components/AuthGate/AuthGate.tsx';
import { ProtectedProfile } from '../../components/ProtectedProfile/ProtectedProfile.tsx';
const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateProtected>
				<ProtectedProfile />
			</AuthGateProtected>
		</StrictMode>
	)
);
