import { forwardRef, type InputHTMLAttributes, type KeyboardEventHandler, useMemo } from 'react';
import './TextInputComponent.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	helper?: string | null;
	labelSlot?: React.JSX.Element;
}

const TextInputComponent = forwardRef<HTMLInputElement, Props>(({
	id,
	name,
	label,
	disabled,
	error,
	helper,
	value,
	labelSlot,
	onKeyDown,
	...rest
}, ref) => {
	// Conditional flag checks
	if (!label) {
		console.warn('Custom Warning: input must always have a label. Otherwise it fails the WCAG SC 3.3.2 standard.');
	}

	const elementId = useMemo(() => id ?? `input-${Math.trunc(Math.random() * 10000).toString(16)}`, [id]);

	const keydownHandler: KeyboardEventHandler<HTMLInputElement> = (evt) => {
		const allowedKeys = [
			'Tab',
			'Home',
			'PageUp',
			'PageDown',
			'End',
			'Enter'
		];

		// Disables most keypresses on disabled input.
		if (disabled && !allowedKeys.includes(evt.key)) {
			evt.preventDefault();
			return;
		}

		// Execute the provided event handler, if it exists.
		onKeyDown?.(evt);
	};

	return (
		<div className='text-input-component-container'>
			<span className='input-label-container'>
				<label htmlFor={elementId}>{label}</label>
				{labelSlot}
			</span>
			<input
				ref={ref}
				id={elementId}
				name={name}
				type='text'
				aria-disabled={disabled}
				defaultValue={value || ''}
				data-error={error ? true : false}
				data-helper={helper ? true : false}
				onKeyDown={keydownHandler}
				{...rest}
			/>
		</div>
	);
});

export default TextInputComponent;
