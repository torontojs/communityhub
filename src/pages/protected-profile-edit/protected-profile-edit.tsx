import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import './style.css';
import { AuthGateProtected } from '../../components/AuthGate/AuthGate.tsx';
import { ProtectedProfileEdit } from '../../components/ProtectedProfileEdit/ProtectedProfileEdit.tsx';
const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<AuthGateProtected>
				<ProtectedProfileEdit />
			</AuthGateProtected>
		</StrictMode>
	)
);
