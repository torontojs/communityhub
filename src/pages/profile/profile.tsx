import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../../index.css';
import './style.css';
import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout.tsx';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail.tsx';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useHeartBeatProtected } from '../../hooks/useHeartBeat.ts';

const root = document.getElementById('root') as HTMLDivElement;
const queryParameters = new URLSearchParams(window.location.search);
const profileId = queryParameters.get('id') ?? queryParameters.get('pid');

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useHeartBeatProtected}>
					<div className='App'>
						<AuthenticatedLayout activePage='profile' mainClassName='profile-detail-page'>
							{profileId ?
								<ProfileDetail profileId={profileId} /> :
								<div aria-live='polite' role='status'>Profile not found.</div>}
						</AuthenticatedLayout>
					</div>
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
