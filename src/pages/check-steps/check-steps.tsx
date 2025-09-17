// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import CheckSteps from '../../components/CheckSteps/CheckSteps.tsx';
import '../../index.css';
import { StrictMode } from 'react';
import { AuthGateHomePageProtected } from '../../components/AuthGate/AuthGate.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateHomePageProtected>
				<CheckSteps />
			</AuthGateHomePageProtected>
		</StrictMode>
	)
);
