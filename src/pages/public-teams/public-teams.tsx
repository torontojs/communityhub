import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicTeams from '../../components/PublicTeams/PublicTeams.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<PublicTeams />
		</StrictMode>
	)
);
