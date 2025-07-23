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

				<h1>Render the Design System's Helper Message Input Component Cases</h1>
				<p>
					<em>IMPORTANT:</em> Must import the SVG Definitions Component - HelperMessageSvgDefinitions, to use the helper message
				</p>

				<section className='helper-message-showcase-container'>
					<fieldset>
						<legend>
							Default Variant:
						</legend>
						<HelperMessageComponent variant='default' labelText='Helper Message' />
					</fieldset>
					<fieldset>
						<legend>
							Error Variant:
						</legend>
						<HelperMessageComponent variant='error' labelText='Helper Message' />
					</fieldset>
					<fieldset>
						<legend>
							Info Variant:
						</legend>
						<HelperMessageComponent variant='info' labelText='Helper Message' />
					</fieldset>
					<fieldset>
						<legend>
							Success Variant:
						</legend>
						<HelperMessageComponent variant='success' labelText='Helper Message' />
					</fieldset>
					<fieldset>
						<legend>
							Warning Variant:
						</legend>
						<HelperMessageComponent variant='warning' labelText='Helper Message' />
					</fieldset>
					<fieldset>
						<legend>
							Usage with Input Component: Default
						</legend>
						<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent labelText='Helper label' />} />
					</fieldset>
					<fieldset>
						<legend>
							Usage with Input Component: Error
						</legend>
						<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='error' labelText='Helper label' />} />
					</fieldset>
					<fieldset>
						<legend>
							Usage with Input Component: Info
						</legend>
						<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='info' labelText='Helper label' />} />
					</fieldset>
					<fieldset>
						<legend>
							Usage with Input Component: Success
						</legend>
						<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='success' labelText='Helper label' />} />
					</fieldset>
					<fieldset>
						<legend>
							Usage with Input Component: Warning
						</legend>
						<TextInputComponent label='Label' helperMessageSlot={<HelperMessageComponent variant='warning' labelText='Helper label' />} />
					</fieldset>
				</section>
			</div>
		</StrictMode>
	)
);
