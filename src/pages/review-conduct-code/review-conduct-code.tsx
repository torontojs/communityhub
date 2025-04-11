import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';
import '../../basic-css-reset.css';
import ReviewConductCode from '../../components/ReviewConductCode/ReviewConductCode.js';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<ReviewConductCode />
		</StrictMode>
	)
);
