import { type ReactNode, useState } from 'react';
import './AuthenticatedLayout.css';

type ActivePage = 'community' | 'profile' | 'teams';

interface Props {
	activePage: ActivePage;
	children: ReactNode;
	className?: string;
	mainClassName?: string;
}

const navItems: Array<{
	id: ActivePage,
	href: string,
	icon: string,
	label: string
}> = [
	{
		id: 'community',
		href: '/pages/home',
		icon: '/community-icon.png',
		label: 'Community'
	},
	{
		id: 'profile',
		href: '/pages/protected-profile/',
		icon: '/person-icon-white.png',
		label: 'My Profile'
	},
	{
		id: 'teams',
		href: '/pages/team',
		icon: '/small-size-team-members.png',
		label: 'Teams'
	}
];

const AuthenticatedLayout = ({ activePage, children, className, mainClassName }: Props): React.JSX.Element => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const navLinks = navItems.map((item) => (
		<a href={item.href} data-active={item.id === activePage} key={item.id}>
			<img src={item.icon} alt={`${item.label} Icon`} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<>
			<div className={['authenticated-layout', className].filter(Boolean).join(' ')}>
				<header className='main-header'>
					<button className='hamburger-menu' onClick={() => setMenuOpen(true)} aria-label='Open navigation menu'>
						<img src='/hamburger-menu.svg' alt='' />
					</button>
					<a href='/pages/home'>
						<img className='torontojs-logo' src='/torontojs-logo.png' alt='Small Toronto JS Logo' />
					</a>
					<div className='inner-header'>
						<img className='small-avatar' src='/small-sample-avatar.png' alt='Small User Avatar' />
						<a href='/pages/notifications'>
							<img className='notification-bell' src='/notification-bell.png' alt='Notification bell icon' />
						</a>
					</div>
				</header>
				<nav className='sidebar-left' aria-label='Primary navigation'>
					<div className='sidebar-left-container'>
						{navLinks}
					</div>
				</nav>
				<main className={mainClassName}>
					{children}
				</main>
			</div>
			{menuOpen && (
				<>
					<div className='mobile-nav-overlay' onClick={() => setMenuOpen(false)} />
					<nav className='mobile-nav-drawer' aria-label='Mobile navigation'>
						<div className='mobile-nav-drawer-header'>
							<img src='/torontojs-logo.png' alt='TorontoJS Logo' />
							<button className='mobile-nav-close' onClick={() => setMenuOpen(false)} aria-label='Close navigation menu'>
								x
							</button>
						</div>
						<div className='mobile-nav-links'>
							{navLinks}
						</div>
					</nav>
				</>
			)}
		</>
	);
};

export default AuthenticatedLayout;
