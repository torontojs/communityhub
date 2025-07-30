import { type ChangeEvent, useEffect } from 'react';
import './DateSelector.css';
import HelperMessageComponent from '../HelperMessageComponent/HelperMessageComponent.tsx';

interface Props {
	dateValue: string;
	labelContent?: string;
	handleSetDateValue: (date: string) => void;
	handleSetDateValidity: (validityStatus: boolean) => void;
}

// Validation helpers
/**
 * Checks whether a date string is in the valid MM-DD format.
 *
 * A valid format must follow the pattern: two-digit month (01–12)
 * followed by a dash and a two-digit day (01–31).
 * This function does not validate actual calendar dates (e.g., "02-30" would be considered valid).
 *
 * @param date - The date string to validate, expected in MM-DD format.
 * @returns `true` if the format is valid, otherwise `false`.
 */
const isValidDateFormat = (date: string): boolean => {
	const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
	return regex.test(date);
};

/**
 * Determines whether a date string represents a real calendar date.
 *
 * The input must be in MM-DD format and represent a valid calendar day.
 * This function uses a placeholder year (2000, a leap year) to account for month lengths,
 * including February 29th. It assumes no year context is needed and is used primarily for validation.
 *
 * @deprecated We will remove update this when Temporal becomes stable
 *
 * @param dateString - The dateString string to validate, expected in MM-DD format.
 * @returns `true` if the string is a valid date in the MM-DD format, otherwise `false`.
 */
const isRealDate = (dateString: string): boolean => {
	if (!isValidDateFormat(dateString)) { return false; }

	const [monthStr, dayStr] = dateString.split('-');
	const month = Number(monthStr);
	const day = Number(dayStr);

	const convertedToDate = new Date(2000, month - 1, day);
	return convertedToDate.getMonth() + 1 === month && convertedToDate.getDate() === day;
};

const getDaysInMonth = (month: string) => {
	switch (month) {
		case '02':
			return 29; // Always 29 for February
		case '04':
		case '06':
		case '09':
		case '11':
			return 30;
		default:
			return 31;
	}
};

const DateSelector = ({ dateValue, handleSetDateValue, handleSetDateValidity, labelContent = 'Select Date' }: Props) => {
	const [month = '', day = ''] = dateValue?.split('-') ?? [];

	const daysInMonth = month ? getDaysInMonth(month) : 31;

	/**
	 * Generates an array of `<option>` elements representing each day of the month.
	 *
	 * @param {number} daysInMonth - The total number of days in the current month.
	 * @returns {JSX.Element[]} An array of JSX <option> elements for use in a day dropdown.
	 *
	 * Each day is zero-padded (e.g., "01", "02", ...) for use as the value attribute,
	 * while the visible text shows the numeric day (e.g., 1, 2, ...).
	 */
	const dayOptions = Array.from({ length: daysInMonth }, (_, i) => {
		const dayVal = String(i + 1).padStart(2, '0');
		return (
			<option key={dayVal} value={dayVal}>
				{i + 1}
			</option>
		);
	});

	/**
	 * Handles changes to the date selection inputs (month or day).
	 *
	 * When the month is changed, it verifies if the previously selected day is still valid
	 * for the new month. If the day exceeds the number of days in the selected month,
	 * the day is cleared and the parent date value is reset to avoid holding an invalid date.
	 *
	 * When the day is changed, it simply updates the temporary date state accordingly.
	 *
	 * @param {ChangeEvent<HTMLSelectElement>} e - The change event from a `<select>` input (month or day).
	 */
	const handleDateInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		let [prevMonth = '', prevDay = ''] = dateValue.split('-');

		if (name === 'month') {
			const newDaysInMonth = getDaysInMonth(value);
			const newDay = Number(prevDay) > newDaysInMonth ? '' : prevDay;

			if (Number(prevDay) > newDaysInMonth) {
				handleSetDateValue(''); // Reset parent when day becomes invalid
			}
			handleSetDateValue(`${value}-${newDay}`);
		}

		if (name === 'day') {
			handleSetDateValue(`${prevMonth}-${value}`);
		}
	};

	const checkDateValidity = (date: string) => {
		if (date.trim() === '') { return; }
		return isRealDate(date);
	};

	useEffect(() => {
		if (dateValue.trim() === '') { return; }
		handleSetDateValidity(isRealDate(dateValue));
	}, [dateValue]);

	return (
		<div className='date-container'>
			<div>
				<label>
					{labelContent}
				</label>
				{checkDateValidity(dateValue) === false && <HelperMessageComponent variant='error' labelText={`Invalid ${labelContent}!`} />}
			</div>
			<div>
				<label htmlFor='month'>Month</label>
				<select
					id='month'
					name='month'
					value={month}
					onChange={handleDateInputChange}
				>
					<option disabled hidden value=''>
						Select a month
					</option>
					<option value='01'>January</option>
					<option value='02'>February</option>
					<option value='03'>March</option>
					<option value='04'>April</option>
					<option value='05'>May</option>
					<option value='06'>June</option>
					<option value='07'>July</option>
					<option value='08'>August</option>
					<option value='09'>September</option>
					<option value='10'>October</option>
					<option value='11'>November</option>
					<option value='12'>December</option>
				</select>
			</div>
			<div>
				<label htmlFor='day'>Day</label>
				<select
					id='day'
					name='day'
					value={day}
					onChange={handleDateInputChange}
					disabled={!month}
				>
					<option disabled hidden value=''>
						Select a day
					</option>
					{dayOptions}
				</select>
			</div>
		</div>
	);
};

export default DateSelector;
