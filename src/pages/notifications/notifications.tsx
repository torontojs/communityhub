import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<main className='notifications-page'>
				<h1>Notifications</h1>
				<p>Under construction</p>
			</main>
		</StrictMode>
	)
);
