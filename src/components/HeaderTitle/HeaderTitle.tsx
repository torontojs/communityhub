import type { ReactNode } from 'react';
import './HeaderTitle.css';

interface Props {
	children: ReactNode;
}

const HeaderTitle = ({ children }: Props) => <h1>{children}</h1>;

export default HeaderTitle;
