import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import TextInputComponent from '../../components/TextInputComponent/TextInputComponent.tsx';

import './style.css';
import '../../index.css';
import HelperMessageComponent from '../../components/HelperMessageComponent/HelperMessageComponent.tsx';
import { HelperMessageSvgDefinitions } from '../../components/HelperMessageComponent/HelperMessageSvgDefinitions.tsx';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			{/* IMPORTANT: Must import the SVG Definitions Component - HelperMessageSvgDefinitions, to use the helper message */}
			<HelperMessageSvgDefinitions />
			<div className='App'>
				{/* NOTE: This is temp UI to test the helper message usage with text input or other components */}

				<h2 style={{ textAlign: 'center' }}>Render the Design System's Helper Message Input Component Cases</h2>
				<p>
					<em>IMPORTANT:</em> Must import the SVG Definitions Component - HelperMessageSvgDefinitions, to use the helper message
				</p>

				<div className='component-container'>
					<h3>
						Default Variant:
					</h3>
					<HelperMessageComponent variant='default' labelText='Helper Message' />

					<h3>
						Error Variant:
					</h3>
					<HelperMessageComponent variant='error' labelText='Helper Message' />

					<h3>
						Info Variant:
					</h3>
					<HelperMessageComponent variant='info' labelText='Helper Message' />

					<h3>
						Success Variant:
					</h3>
					<HelperMessageComponent variant='success' labelText='Helper Message' />

					<h3>
						Warning Variant:
					</h3>
					<HelperMessageComponent variant='warning' labelText='Helper Message' />

					<h3>
						Usage with Input Component: Default
					</h3>
					<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent labelText='Helper label' />} />

					<h3>
						Usage with Input Component: Error
					</h3>
					<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='error' labelText='Helper label' />} />

					<h3>
						Usage with Input Component: Info
					</h3>
					<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='info' labelText='Helper label' />} />

					<h3>
						Usage with Input Component: Success
					</h3>
					<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='success' labelText='Helper label' />} />

					<h3>
						Usage with Input Component: Warning
					</h3>
					<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='warning' labelText='Helper label' />} />
				</div>
			</div>
		</StrictMode>
	)
);
