import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ButtonLink from '../../components/ButtonLink/ButtonLink.tsx';

import 'open-props';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<h1>Button Link Usage Examples</h1>
				<div className='component-container'>
					<ButtonLink href=''>
						Link Label
					</ButtonLink>
					<ButtonLink href='' variant='disabled'>
						Link Label
					</ButtonLink>
				</div>
			</div>
		</StrictMode>
	)
);
