import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import './style.css';
import '../../index.css';
import { Task } from '../../components/Task/Task.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App taskComponent'>
				{/* NOTE: This is temp UI to test task component design */}

				<h2>Render all the Task cases</h2>

				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
					<Task label='Pending Task' />
					<Task taskStatus='completed' label='Completed Task' />
				</div>
			</div>
		</StrictMode>
	)
);
