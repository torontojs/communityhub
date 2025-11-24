import 'open-props';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Pagination from '../../components/Pagination/Pagination.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='app'>
				<Pagination />
			</div>
		</StrictMode>
	)
);
