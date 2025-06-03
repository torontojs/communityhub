import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import './style.css';
import '../../index.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard.tsx';

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
