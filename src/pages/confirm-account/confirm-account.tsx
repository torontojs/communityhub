import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';

import '../../index.css';
import ConfirmAccount from '../../components/ConfirmAccount/ConfirmAccount.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<ConfirmAccount />
		</StrictMode>
	)
);
