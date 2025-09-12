import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import './style.css';
import { AuthGateHomePageProtected } from '../../components/AuthGate/AuthGate.tsx';
import CompleteProfile from '../../components/CompleteProfile/CompleteProfile.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<AuthGateHomePageProtected>
			<CompleteProfile />
		</AuthGateHomePageProtected>
	)
);
