import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../../index.css';
import './style.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import CompleteProfile from '../../components/CompleteProfile/CompleteProfile.tsx';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useProfileRedirect}>
				<CompleteProfile />
			</AuthGate>
		</StrictMode>
	)
);
