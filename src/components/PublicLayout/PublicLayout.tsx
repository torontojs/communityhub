import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import Footer from '../Footer/Footer.tsx';
import Logo from '../Logo/Logo.tsx';
import './PublicLayout.css';

type ActivePage = 'profiles' | 'teams';

interface Props {
	activePage: ActivePage;
	children: ReactNode;
}

const PublicLayout = ({ activePage, children }: Props): React.JSX.Element => {
	const { isAuthenticated, isLoading } = useAuth();

	return (
		<div className='public-layout'>
			<header className='public-header'>
				<a className='public-brand' href='/pages/public-profiles/' aria-label='TorontoJS community'>
					<Logo isLarge={false} />
				</a>
				<nav className='public-navigation' aria-label='Public navigation'>
					<a href='/pages/public-profiles/' aria-current={activePage === 'profiles' ? 'page' : undefined}>Profiles</a>
					<a href='/pages/public-teams/' aria-current={activePage === 'teams' ? 'page' : undefined}>Teams</a>
					{!isLoading && (
						<a className='public-session-link' href={isAuthenticated ? '/pages/home/' : '/pages/sign-in/'}>
							{isAuthenticated ? 'Dashboard' : 'Sign in'}
						</a>
					)}
				</nav>
			</header>
			<main className='public-main'>{children}</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;
