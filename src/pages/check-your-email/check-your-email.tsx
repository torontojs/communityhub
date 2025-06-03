import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import CheckYourEmail from '../../components/CheckYourEmail/CheckYourEmail.tsx';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<CheckYourEmail />
		</StrictMode>
	)
);
