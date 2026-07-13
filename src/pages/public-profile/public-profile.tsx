import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicProfileDetail from '../../components/PublicProfileDetail/PublicProfileDetail.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;
const profileId = new URLSearchParams(window.location.search).get('id');

createRoot(root).render(
	(
		<StrictMode>
			{profileId ? <PublicProfileDetail profileId={profileId} /> : <PublicProfileDetail profileId='' />}
		</StrictMode>
	)
);
