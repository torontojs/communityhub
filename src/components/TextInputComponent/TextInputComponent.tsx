import { forwardRef, type InputHTMLAttributes } from 'react';
import './TextInputComponent.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	hasLabel?: boolean;
	labelText?: string;
	multiLine?: boolean;
	isDisabled?: boolean;
	hasError?: boolean;
	withValue?: boolean;
	value?: string;
	placeholder?: string;
	hasHelper?: boolean;
	helper?: string;
	isRequired?: boolean;
	hasCloseButton?: boolean;
}

const TextInputComponent = forwardRef<HTMLInputElement, Props>(({
	hasLabel = true,
	labelText,
	multiLine = false,
	isDisabled = false,
	hasError = false,
	withValue = false,
	placeholder,
	hasHelper = false,
	helper,
	value,
	isRequired = false,
	hasCloseButton = false,
	...rest
}, ref) => {
	if (hasLabel && !labelText) {
		console.warn('Custom Warning: In an input, labelText is required when hasLabel is true');
	}
	if (withValue && !value) {
		console.warn('Custom Warning: In an input, value is required when withValue is true');
	}
	if (hasHelper && !helper) {
		console.warn('Custom Warning: In an input, helper is required when hasHelper is true');
	}
	return (
		<div>
			{hasLabel && <label>{labelText}</label>}
			<input
				ref={ref}
				data-multiline={multiLine}
				data-disabled={isDisabled}
				data-required={isRequired}
				className='input'
				{...rest}
			/>
		</div>
	);
});

export default TextInputComponent;
