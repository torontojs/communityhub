import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ReviewConductCode from '../../components/ReviewConductCode/ReviewConductCode.tsx';
import '../../index.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useProfileRedirect}>
				<ReviewConductCode />
			</AuthGate>
		</StrictMode>
	)
);
