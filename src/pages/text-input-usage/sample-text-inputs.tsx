import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TextInputComponent from '../../components/TextInputComponent/TextInputComponent.tsx';

import 'open-props';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test input component design */}

				<h2>Render all the Design System's Input Component Cases</h2>
				{/* <p>Default: Small, Not primary, Has not outline, Not disabled</p> */}

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 500 }}>
					<TextInputComponent labelText='Default Input' />
				</div>
			</div>
		</StrictMode>
	)
);
