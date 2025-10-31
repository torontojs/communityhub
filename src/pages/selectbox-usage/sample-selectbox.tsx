import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SelectBoxComponent from '../../components/SelectBox/SelectBoxComponent.tsx';

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
			<div>
				<SelectBoxComponent label='Country' options={options} value={'value1'} placeholder='Please select Value' />
				<SelectBoxComponent label='Label' options={options} placeholder='Please select Value' disabled={true} />
				<SelectBoxComponent label='Label' options={options} placeholder='Please select Value' error={'An error occurred'} />
				<SelectBoxComponent label='Label' options={options} placeholder='Please select Value' required />
			</div>
		</StrictMode>
	)
);
