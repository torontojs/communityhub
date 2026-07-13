import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicProfiles from '../../components/PublicProfiles/PublicProfiles.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<PublicProfiles />
		</StrictMode>
	)
);
