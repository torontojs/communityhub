import { forwardRef, type InputHTMLAttributes } from 'react';
import './TextInputComponent.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	name?: string;
	label: string;
	error?: string;
	value?: string;
	placeholder?: string;
	helper?: string | null;
	isRequired?: boolean;
	isReadOnly?: boolean;
	labelSlot?: React.JSX.Element;
	isDisabled?: boolean;
	handleKeyDownDisabled?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
	isReadOnly,
	handleKeyDownDisabled,
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
	if (isReadOnly && !value) {
		console.warn('Custom Warning: An input should have a value if it is readonly');
	}

	const handleKeyDownDisabledFallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = [
			'Tab',
			'Shift',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			'Home',
			'End',
			'Control',
			'Alt',
			'Meta'
		];

		// Block typing and other keys
		if (!allowedKeys.includes(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<div className='text-input-component-container'>
			<span className='input-label-container'>
				<label htmlFor={id} aria-disabled={isDisabled}>{label}</label>
				{labelSlot}
			</span>
			<input
				ref={ref}
				id={id}
				name={name}
				type='text'
				required={isRequired}
				aria-disabled={isDisabled}
				defaultValue={value || ''}
				onKeyDown={handleKeyDownDisabled ?? handleKeyDownDisabledFallback}
				data-error={error ? true : false}
				data-helper={helper ? true : false}
				placeholder={placeholder}
				readOnly={isReadOnly}
				{...rest}
			/>
		</div>
	);
});

export default TextInputComponent;
