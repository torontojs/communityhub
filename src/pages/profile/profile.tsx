import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Button from '../../components/Button/Button.js';

import 'open-props';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test button component design */}
				{/* <ProfileList /> */}

				<h2>Render all the Button cases</h2>
				<p>Default: Small, Not primary, Has not outline, Not disabled</p>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 500 }}>
					<Button>Default Button</Button>
					<Button disabled>Disabled Button</Button>
					<Button
						aria-disabled
						onClick={() => {
							console.log('aria-disabled button clicked');
						}}
					>
						Aria Disabled Button
					</Button>
					<Button hasOutline>Outline Button</Button>
					<Button hasOutline disabled>Outline Disabled Button</Button>

					<Button isPrimary>Primary Small Button</Button>
					<Button isPrimary disabled>Primary Small Disabled Button</Button>
					<Button isPrimary hasOutline>Primary Outline Button</Button>
					<Button isPrimary hasOutline disabled>Primary Outline Disabled Button</Button>

					<Button
						isLarge
					>
						Large Button
					</Button>
					<Button
						isLarge
						disabled
					>
						Large Disabled Button
					</Button>
					<Button
						isLarge
						hasOutline
					>
						Large Outline Button
					</Button>
					<Button
						isPrimary
						hasOutline
						disabled
					>
						Large Outline Disabled
					</Button>

					<Button
						isPrimary
						isLarge
					>
						Large Primary
					</Button>
					<Button
						isPrimary
						isLarge
						disabled
					>
						Large Primary Disabled
					</Button>
					<Button
						isPrimary
						isLarge
						hasOutline
					>
						Large Primary Outline
					</Button>
					<Button
						isPrimary
						isLarge
						hasOutline
						disabled
					>
						Large Primary Outline Disabled
					</Button>
					<Button
						isPrimary
						isLarge
						hasOutline
						aria-disabled
					>
						Large Primary Outline Aria Disabled
					</Button>
				</div>
			</div>
		</StrictMode>
	)
);
