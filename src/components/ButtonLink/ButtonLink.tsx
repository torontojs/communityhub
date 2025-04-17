import type { AnchorHTMLAttributes } from 'react';
import '../Button/Button.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
	href: string;
}

const ButtonLink = ({
	hasOutline = false,
	isPrimary = false,
	isLarge = false,
	href,
	children,
	...rest
}: Props) => (
	<a
		className={`button ${isPrimary ? 'primary' : ''} ${hasOutline ? 'outline' : ''} ${isLarge ? 'large' : 'small'}`}
		href={href}
		{...rest}
	>
		{children}
	</a>
);

export default ButtonLink;
