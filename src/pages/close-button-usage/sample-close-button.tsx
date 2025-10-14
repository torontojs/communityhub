import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<h1>Close Buttons</h1>
				<section className='close-button-showcase-container'>
					<fieldset>
						<legend>
							error close button:
						</legend>
						<CloseButton variant='error' />
					</fieldset>

					<fieldset>
						<legend>
							close button with outline:
						</legend>
						<CloseButton variant='outline' />
					</fieldset>

					<fieldset>
						<legend>
							close button with black background:
						</legend>
						<CloseButton variant='warning' />
					</fieldset>
					<fieldset>
						<legend>
							close button with black outline:
						</legend>
						<CloseButton variant='dismiss' />
					</fieldset>
					<fieldset>
						<legend>
							default close button:
						</legend>
						<CloseButton variant='default' />
					</fieldset>
				</section>
			</div>
		</StrictMode>
	)
);
