import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TextInputComponent from '../../components/TextInputComponent/TextInputComponent.tsx';

import './style.css';
import '../../index.css';
import React from 'react';

const root = document.getElementById('root') as HTMLDivElement;

type CloseButtonProps = {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
	ariaLabel?: string
};

// Following method and component are created to provide example of passing a Close Button to a text input element
const handleClose = () => {
	alert('Close button clicked');
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, ariaLabel = 'Close' }) => {
	return (
		<button
			onClick={onClick}
			aria-label={ariaLabel}
			className='example-close-button'
		/>
	);
};

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test the text input component design */}

				<h2 style={{ textAlign: 'center' }}>Render all the Design System's Text Input Component Cases</h2>
				<p>
					<em>NOTE:</em> The input must always have a label to meet the WCAG SC 3.3.2 standard.
				</p>

				<div className='component-container'>
					<h3>
						Default:
					</h3>
					<TextInputComponent label='Label' />

					<h3>
						With Placeholder:
					</h3>
					<TextInputComponent label='Label' placeholder='Enter your name' />

					<h3>
						With Value - Must pass onChange handler, otherwise it will be readonly:
					</h3>
					<TextInputComponent
						label='Label'
						value='Value'
						onChange={() => {}}
					/>

					<h3>
						Required:
					</h3>
					<TextInputComponent required label='Label' />

					<h3>
						Error:
					</h3>
					<TextInputComponent error={'An error occurred'} label='Label' />

					<h3>
						Required Error:
					</h3>
					<TextInputComponent error={'An error occurred'} required label='Label' />

					<h3>
						ReadOnly:
					</h3>
					<TextInputComponent readOnly label='Label' value='Value' />

					<h3>
						With Close Button - Pass JSX Element in labelSlot:
					</h3>
					<TextInputComponent label='Label' labelSlot={<CloseButton onClick={handleClose} />} />

					<h3>
						Disabled = Aria-Disabled - Must provide handleKeyDown handler in code, manually disable interaction, add checks before submitting:
						<br />
						<br />Disabled
					</h3>
					<TextInputComponent
						disabled
						label='Label'
					/>

					<h3>
						Disabled Required:
					</h3>
					<TextInputComponent disabled required label='Label' />

					<h3>
						Disabled Required Error:
					</h3>
					<TextInputComponent disabled required error={'error'} label='Label' />
				</div>
			</div>
		</StrictMode>
	)
);
