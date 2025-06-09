import { type ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
	size?: 'small' | 'medium' | 'large';
}

const Button = forwardRef<HTMLButtonElement, Props>(({
	hasOutline = false,
	isPrimary = false,
	isLarge = false,
	children,
	size,
	...rest
}, ref) => (
	<button
		ref={ref}
		className='button'
		data-size={size || 'small'}
		data-outline={hasOutline}
		data-primary={isPrimary}
		{...rest}
	>
		{children}
	</button>
));

export default Button;
