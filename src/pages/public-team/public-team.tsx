import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicTeamDetail from '../../components/PublicTeamDetail/PublicTeamDetail.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;
const teamId = new URLSearchParams(window.location.search).get('id');

createRoot(root).render(
	(
		<StrictMode>
			{teamId ? <PublicTeamDetail teamId={teamId} /> : <PublicTeamDetail teamId='' />}
		</StrictMode>
	)
);
