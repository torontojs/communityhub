import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Home } from '../../components/Home/Home';
import '../../index.css';
import '../../basic-css-reset.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<Home />
		</StrictMode>
	)
);
