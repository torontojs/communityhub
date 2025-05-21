import { type ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(({
	hasOutline = false,
	isPrimary = false,
	isLarge = false,
	children,
	...rest
}, ref) => (
	<button
		ref={ref}
		className='button'
		data-size={isLarge ? 'large' : 'small'}
		data-outline={hasOutline}
		data-primary={isPrimary}
		{...rest}
	>
		{children}
	</button>
));

export default Button;
