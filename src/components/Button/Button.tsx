import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
}

const Button = ({
	hasOutline = false,
	isPrimary = false,
	isLarge = false,
	children,
	...rest
}: Props) => (
	<button
		className={`button ${isPrimary ? 'primary' : ''} ${hasOutline ? 'outline' : ''} ${isLarge ? 'large' : 'small'}`}
		{...rest}
	>
		{children}
	</button>
);

export default Button;
