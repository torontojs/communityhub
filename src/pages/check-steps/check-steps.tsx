// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CheckSteps from '../../components/CheckSteps/CheckSteps.tsx';
import '../../index.css';
import { StrictMode } from 'react';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useProfileRedirect}>
				<CheckSteps />
			</AuthGate>
		</StrictMode>
	)
);
