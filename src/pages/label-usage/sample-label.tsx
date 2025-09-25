import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import '../../index.css';
import Label from '../../components/Label/Label.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App parent'>
				<h2>Label Usage</h2>
				<Label>Default</Label>
				<Label isPrimary>Primary</Label>
			</div>
		</StrictMode>
	)
);
