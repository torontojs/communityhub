import type { ReactNode } from 'react';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import Logo from '../Logo/Logo';
import './Header.css';

interface Props {
	children: ReactNode;
	isLogoLarge?: boolean;
}

const Header = ({ children, isLogoLarge = true }: Props) => (
	<header id='header-with-logo'>
		<Logo isLarge={isLogoLarge} />
		<HeaderTitle>{children}</HeaderTitle>
	</header>
);

export default Header;
