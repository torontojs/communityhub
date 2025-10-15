import { forwardRef, type OptionHTMLAttributes } from 'react';

interface Option {
	label: string;
	value: string;
}
interface SelectBoxProps extends OptionHTMLAttributes<HTMLSelectElement> {
	placeholder?: string;
	options: Option[];
	label: string;
}
const SelectBoxComponent = forwardRef<HTMLSelectElement, SelectBoxProps>(
	({ placeholder, options, label, value, disabled = false }, ref) => (
		<div>
			<label>{label}</label>
			<select disabled={disabled} value={value}>
				{placeholder && <option value=''>{placeholder}</option>}
				{options.map((option) => <option value={option.value}>{option.label}</option>)}
			</select>
		</div>
	)
);
export default SelectBoxComponent;
