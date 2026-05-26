import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import './style.css';
import '../../index.css';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;
const queryParameters = new URLSearchParams(window.location.search);
const profileId = queryParameters.get('id') ?? queryParameters.get('pid');

createRoot(root).render(
	(
		<StrictMode>
			<AuthGate hook={useHeartBeatProtected}>
				<div className='App'>
					{profileId ?
						<ProfileDetail profileId={profileId} /> :
						<div aria-live='polite' role='status'>Profile not found.</div>}
				</div>
			</AuthGate>
		</StrictMode>
	)
);
