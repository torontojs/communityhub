import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import '../../basic-css-reset.css';

import CompleteProfile from '../../components/CompleteProfile/CompleteProfile.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<CompleteProfile />
		</StrictMode>
	)
);
