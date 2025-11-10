import type { AnchorHTMLAttributes } from 'react';
import '../Button/Button.css';
import './ButtonLink.css';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
	href: string;
	variant?: ButtonLinkComponentVariants;
}
type ButtonLinkComponentVariants = 'default' | 'disabled';

const ButtonLink = ({
	hasOutline = false,
	isPrimary = false,
	isLarge = false,
	href,
	variant = 'default',
	children,
	...rest
}: Props) => (
	<a
		className='button-link'
		data-variant={variant}
		href={href}
		{...rest}
	>
		{children}
	</a>
);

export default ButtonLink;
