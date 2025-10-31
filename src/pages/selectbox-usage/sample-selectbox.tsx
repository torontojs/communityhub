import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SelectBoxComponent from '../../components/SelectBox/SelectBoxComponent.tsx';
import '../text-input-usage/style.css';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

interface Option {
	label: string;
	value: string;
}
const options: Option[] = [
	{ label: 'Option 1', value: 'value1' },
	{ label: 'Option 2', value: 'value2' },
	{ label: 'Option 3', value: 'value3' }
];
createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test the text input component design */}

				<h2 style={{ textAlign: 'center' }}>
					Render all the Design System's Text Input Component Cases
				</h2>
				<p>
					<em>NOTE:</em> The input must always have a label to meet the WCAG SC 3.3.2 standard.
				</p>

				<div className='component-container'>
					<h3>Default:</h3>
					<SelectBoxComponent
						label='Country'
						options={options}
						value={'value1'}
					/>
					<h3>ReadOnly:</h3>
					<SelectBoxComponent
						label='Label'
						options={options}
						value={'value1'}
						disabled={true}
					/>
					<h3>With Placeholder:</h3>
					<SelectBoxComponent
						label='Label'
						options={options}
						placeholder='Please select a Value'
						disabled={true}
					/>

					<h3>Error:</h3>
					<SelectBoxComponent
						label='Label'
						options={options}
						placeholder='Please select Value'
						error={'An error occurred'}
					/>
					<h3>Required:</h3>
					<SelectBoxComponent
						label='Label'
						options={options}
						placeholder='Please select Value'
						required
					/>
				</div>
			</div>
		</StrictMode>
	)
);
