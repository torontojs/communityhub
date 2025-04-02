import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import Button from '../../components/Button/Button.js';
import Header from '../../components/Header/Header.js';
import '../../index.css';
import '../../reset.css';
import { CheckConductCode } from './icons/CheckConductCode.js';
import { CompleteProfile } from './icons/CompleteProfile.js';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	<StrictMode>
		<div className='App'>
			<Header>Welcome to TorontoJS Community Hub!</Header>
			<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
			<ul className='cards'>
				<li className='card'>
					<CheckConductCode />
					<p>Check the TorontoJS's conduct code</p>
				</li>
				<li className='card'>
					<CompleteProfile />
					<p>Complete your profile</p>
				</li>
			</ul>
			<Button isPrimary isLarge>
				Let's continue
			</Button>
		</div>
	</StrictMode>
);
