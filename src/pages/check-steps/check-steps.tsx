import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import CheckSteps from '../../components/CheckSteps/CheckSteps';
import '../../index.css';
import '../../basic-css-reset.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<CheckSteps />
		</StrictMode>
	)
);
