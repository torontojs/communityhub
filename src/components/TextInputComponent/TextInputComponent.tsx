import { forwardRef, type InputHTMLAttributes } from 'react';
import './TextInputComponent.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	name?: string;
	label: string;
	isDisabled?: boolean;
	error?: string;
	value?: string;
	placeholder?: string;
	helper?: string | null;
	isRequired?: boolean;
	labelSlot?: React.JSX.Element;
}

const TextInputComponent = forwardRef<HTMLInputElement, Props>(({
	id,
	name,
	label,
	isDisabled = false,
	error,
	placeholder,
	helper,
	value,
	isRequired = false,
	labelSlot,
	...rest
}, ref) => {
	// Conditional flag checks
	if (!label) {
		console.warn('Custom Warning: input must always have a label. Otherwise it fails the WCAG SC 3.3.2 standard.');
	}
	if (isRequired && labelSlot) {
		console.warn('Custom Warning: An input can not have a labelSlot if it is required');
	}

	return (
		<div className='text-input-component-container'>
			<span className='input-label-container'>
				<label htmlFor={id}>{label}</label>
				{labelSlot}
			</span>
			<input
				ref={ref}
				id={id}
				name={name}
				type='text'
				required={isRequired}
				defaultValue={value || ''}
				disabled={isDisabled}
				data-error={error ? true : false}
				data-helper={helper ? true : false}
				placeholder={placeholder || 'Placeholder'}
				{...rest}
			/>
		</div>
	);
});

export default TextInputComponent;
