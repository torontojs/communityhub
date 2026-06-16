import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthGate } from '../../components/AuthGate/AuthGate.tsx';
import { Home } from '../../components/Home/Home.tsx';
import '../../index.css';
import { AuthProvider } from '../../context/AuthContext.tsx';
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthProvider>
				<AuthGate hook={useProfileRedirect}>
					<Home />
				</AuthGate>
			</AuthProvider>
		</StrictMode>
	)
);
