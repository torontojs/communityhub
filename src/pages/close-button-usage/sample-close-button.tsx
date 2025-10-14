import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import './style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

const handleClick = () => {
	alert('Close clicked');
};

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
						<CloseButton onClick={handleClick} variant='error' />
					</fieldset>

					<fieldset>
						<legend>
							close button with outline:
						</legend>
						<CloseButton onClick={handleClick} variant='outline' />
					</fieldset>

					<fieldset>
						<legend>
							close button with black background:
						</legend>
						<CloseButton onClick={handleClick} variant='warning' />
					</fieldset>
					<fieldset>
						<legend>
							close button with black outline:
						</legend>
						<CloseButton onClick={handleClick} variant='dismiss' />
					</fieldset>
					<fieldset>
						<legend>
							default close button:
						</legend>
						<CloseButton onClick={handleClick} variant='default' />
					</fieldset>
				</section>
			</div>
		</StrictMode>
	)
);
