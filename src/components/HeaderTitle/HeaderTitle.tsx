import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const HeaderTitle = ({ children }: Props) => <h1>{children}</h1>;

export default HeaderTitle;
