import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import Button from '../../components/Button/Button.js';
import Header from '../../components/Header/Header.js';
import '../../index.css';
import { CheckConductCode } from './icons/CheckConductCode.js';
import { CompleteProfile } from './icons/CompleteProfile.js';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<Header>Welcome to TorontoJS Community Hub!</Header>
				<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
				<ul className='cards'>
					<li className='card'>
						<CheckConductCode />
						<p>1. Check our conduct code</p>
					</li>
					<li className='card'>
						<CompleteProfile />
						<p>2. Complete your profile</p>
					</li>
				</ul>
				<Button isPrimary>Let's continue</Button>
			</div>
		</StrictMode>
	)
);
