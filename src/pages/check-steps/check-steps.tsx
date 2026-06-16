import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CheckSteps from '../../components/CheckSteps/CheckSteps.tsx';
import '../../index.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useProfileRedirect}>
					<CheckSteps />
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
