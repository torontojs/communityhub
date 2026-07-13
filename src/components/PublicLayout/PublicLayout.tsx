import type { ReactNode } from 'react';
import Footer from '../Footer/Footer.tsx';
import Logo from '../Logo/Logo.tsx';
import './PublicLayout.css';

type ActivePage = 'profiles' | 'teams';

interface Props {
	activePage: ActivePage;
	children: ReactNode;
}

const PublicLayout = ({ activePage, children }: Props): React.JSX.Element => (
	<div className='public-layout'>
		<header className='public-header'>
			<a className='public-brand' href='/pages/public-profiles/' aria-label='TorontoJS community'>
				<Logo isLarge={false} />
			</a>
			<nav className='public-navigation' aria-label='Public navigation'>
				<a href='/pages/public-profiles/' aria-current={activePage === 'profiles' ? 'page' : undefined}>Profiles</a>
				<a href='/pages/public-teams/' aria-current={activePage === 'teams' ? 'page' : undefined}>Teams</a>
				<a className='public-sign-in' href='/pages/sign-in/'>Sign in</a>
			</nav>
		</header>
		<main className='public-main'>{children}</main>
		<Footer />
	</div>
);

export default PublicLayout;
