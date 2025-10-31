import { forwardRef, type OptionHTMLAttributes } from 'react';
import './SelectBoxComponent.css';

interface Option {
	label: string;
	value: string;
}
interface SelectBoxProps extends OptionHTMLAttributes<HTMLSelectElement> {
	placeholder?: string;
	options: Option[];
	label: string;
	helper?: string;
	error?: string;
	required?: boolean;
}
const SelectBoxComponent = forwardRef<HTMLSelectElement, SelectBoxProps>(
	(
		{
			placeholder,
			options,
			label,
			value,
			disabled = false,
			helper = '',
			error = '',
			...rest
		},
		ref
	) => (
		<div
			className={`selectbox-component-container ${disabled ? disabled : ''}`}
		>
			<span className='label-container'>
				<label>{label}</label>
			</span>

			<select
				className='selectbox-container'
				disabled={disabled}
				value={value}
				ref={ref}
				defaultValue={value ?? ''}
				data-error={Boolean(error)}
				data-helper={Boolean(helper)}
				{...rest}
			>
				{placeholder && <option value=''>{placeholder}</option>}
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
);
export default SelectBoxComponent;
