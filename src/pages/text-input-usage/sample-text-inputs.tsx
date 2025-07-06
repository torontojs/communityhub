import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TextInputComponent from '../../components/TextInputComponent/TextInputComponent.tsx';

import 'open-props';
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
	const buttonStyle = {
		backgroundColor: 'var(--color-white)',
		backgroundImage:
			`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 17 17' fill='none'%3E%3Cpath d='M12.6699 4.5L4.66992 12.5' stroke='%23ED342F' strokeLinecap='round' strokeLinejoin='round'/%3E%3Cpath d='M4.66992 4.5L12.6699 12.5' stroke='%23ED342F' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		border: 'solid var(--border-base) var(--color-accent)',
		borderRadius: 'var(--rounded-base)',
		height: '1rem',
		width: '1rem',
		marginLeft: 'auto',
		content: "''",
		cursor: 'pointer'
	};

	return (
		<button
			onClick={onClick}
			aria-label={ariaLabel}
			style={buttonStyle}
		/>
	);
};

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test input component design */}

				<h2 style={{ textAlign: 'center' }}>Render all the Design System's Text Input Component Cases</h2>
				<h2 style={{ textAlign: 'center' }}>
					<span style={{ color: 'hsla(2, 84%, 56%, 1)' }}>NOTE:</span> The input must always have a label to meet the WCAG SC 3.3.2 standard.
				</h2>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', width: '400px', border: '2px dashed', borderRadius: '5px', margin: 'auto' }}>
					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Default:
					</h5>
					<TextInputComponent label='Label' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						With Placeholder:
					</h5>
					<TextInputComponent label='Label' placeholder='Enter your name' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						With Value - Must pass onChange handler, otherwise it will be readonly:
					</h5>
					<TextInputComponent
						label='Label'
						value='Value'
						onChange={() => {}}
					/>

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Required:
					</h5>
					<TextInputComponent isRequired label='Label' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Error:
					</h5>
					<TextInputComponent error={'An error occurred'} label='Label' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Required Error:
					</h5>
					<TextInputComponent error={'An error occurred'} isRequired label='Label' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						ReadOnly:
					</h5>
					<TextInputComponent isReadOnly label='Label' value='Value' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						With Close Button - Pass JSX Element in labelSlot:
					</h5>
					<TextInputComponent label='Label' labelSlot={<CloseButton onClick={handleClose} />} />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Disabled = Aria-Disabled - Must ideally provide handleKeyDown handler in code, manually disable interaction, add checks before submitting:
						<br />
						<br />Disabled
					</h5>
					<TextInputComponent
						isDisabled
						label='Label'
					/>

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Disabled Required:
					</h5>
					<TextInputComponent isDisabled isRequired label='Label' />

					<h5 style={{ padding: '0', margin: '20px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '500', borderBottom: '1px grey dashed' }}>
						Disabled Required Error:
					</h5>
					<TextInputComponent isDisabled isRequired error={'error'} label='Label' />
				</div>
			</div>
		</StrictMode>
	)
);
