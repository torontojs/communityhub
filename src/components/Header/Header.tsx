import type { ComponentProps, ReactNode } from 'react';
import HeaderTitle from '../HeaderTitle/HeaderTitle.tsx';
import Logo from '../Logo/Logo.tsx';
import './Header.css';

interface Props {
	children: ReactNode;
	isLogoLarge?: boolean;
	textProps?: ComponentProps<'h1'>;
}

const Header = ({ children, isLogoLarge = true, textProps }: Props) => (
	<header id='header-with-logo'>
		<Logo isLarge={isLogoLarge} />
		<HeaderTitle {...textProps}>{children}</HeaderTitle>
	</header>
);

export default Header;
