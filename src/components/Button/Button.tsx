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
		className={`button ${isPrimary ? 'primary' : ''} ${hasOutline ? 'outline' : ''} ${isLarge ? 'large' : 'small'}`}
		{...rest}
	>
		{children}
	</button>
));

export default Button;
