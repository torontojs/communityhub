import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ProfileCard from '../../components/ProfileCard/ProfileCard.js';

import 'open-props';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<ProfileCard />
			</div>
		</StrictMode>
	)
);
