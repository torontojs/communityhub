import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ProfileList from '../../components/ProfileList.tsx';

import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<ProfileList />
			</div>
		</StrictMode>
	)
);
