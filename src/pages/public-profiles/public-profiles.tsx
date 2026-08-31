import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PublicProfiles from '../../components/PublicProfiles/PublicProfiles.tsx';
import { AuthProvider } from '../../context/AuthContext.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<PublicProfiles />
			</AuthProvider>
		</StrictMode>
	)
);
