import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import '../../index.css';
import DateSelector from '../../components/DateSelector/DateSelector.tsx';

const root = document.getElementById('root') as HTMLDivElement;

const DateParent = () => {
	const [birthdayValue, setBirthdayValue] = useState<string>('');
	// NOTE: state value is removed to prevent eslint error, must add the state value when using in production
	const [_, setIsBirthdayValid] = useState<boolean | null>(null);

	const handleSetBirthdayValue = (date: string): void => {
		setBirthdayValue(date);
	};

	const handleSetDateValidity = (validityStatus: boolean): void => {
		setIsBirthdayValid(validityStatus);
	};

	return (
		<div className='date-parent-container'>
			<label>
				<span>Parent State Value (birthdayValue):&nbsp;</span>
				{birthdayValue}
			</label>
			<p>Date Component Starts Below This Text!</p>
			<DateSelector
				dateValue={birthdayValue}
				handleSetDateValue={handleSetBirthdayValue}
				handleSetDateValidity={handleSetDateValidity}
				labelContent='Date Of Birth (mm-dd)'
			/>
		</div>
	);
};

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				{/* NOTE: This is temp UI to test the date component design */}

				<h1>Render the Date Component</h1>
				<DateParent />
			</div>
		</StrictMode>
	)
);
