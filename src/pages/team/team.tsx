import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TeamDetail from '../../components/TeamDetail/TeamDetail.tsx';
import Teams from '../../components/Teams/Teams.tsx';

import '../../index.css';
import 'open-props';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;
const teamId = new URLSearchParams(window.location.search).get('id');

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{teamId ? <TeamDetail teamId={teamId} /> : <Teams />}
			</div>
		</StrictMode>
	)
);
