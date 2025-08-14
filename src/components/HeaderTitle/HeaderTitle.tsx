import type { ComponentProps, ReactNode } from 'react';
import './HeaderTitle.css';

interface Props extends ComponentProps<'h1'> {
	children: ReactNode;
}

const HeaderTitle = ({ children, ...props }: Props) => <h1 {...props}>{children}</h1>;

export default HeaderTitle;
