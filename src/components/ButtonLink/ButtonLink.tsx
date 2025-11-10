import type { AnchorHTMLAttributes } from 'react';
import '../Button/Button.css';
import './ButtonLink.css';
type ButtonLinkComponentVariants = 'default' | 'disabled';
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	hasOutline?: boolean;
	isPrimary?: boolean;
	isLarge?: boolean;
	href: string;
	variant?: ButtonLinkComponentVariants;
}

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
