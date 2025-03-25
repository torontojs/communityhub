import type { ReactNode } from 'react';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import Logo from '../Logo/Logo';
import './Header.css';

interface Props {
	children: ReactNode;
}

const Header = ({ children }: Props) => (
	<header>
		<Logo />
		<HeaderTitle>{children}</HeaderTitle>
	</header>
);

export default Header;
