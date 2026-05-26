import './Home.css';

const goals = [
	{
		description: 'We want people to join us faster and easier.',
		title: 'Reduce friction for onboarding volunteers'
	},
	{
		description: 'We want to know what happened, when, and to whom.',
		title: 'Improve observability by data'
	},
	{
		description: 'We want to have it as a single source of truth for data regarding volunteers, and have other tools consuming the VMS data.',
		title: 'Have one single data source'
	},
	{
		description: 'We want members of our community, especially those looking for jobs, to have project experience.',
		title: 'Provide a hands on experience for our members'
	}
];

const currLead = [
	{
		handle: '@dann',
		href: 'https://github.com/dxnn',
		role: 'Project Owner'
	},
	{
		handle: 'Carlos Eduardo (Cadu) Carvalho',
		href: '#',
		role: 'Lead Designer'
	},
	{
		handle: 'Shajahan (Sha) Akbar Sheriff',
		href: '#',
		role: 'Lead Developer'
	},
	{
		handle: '@Ken Beaudin',
		href: 'https://github.com/kbventures',
		role: 'Project Manager'
	}
];

// const orignalCore = [
// 	{
// 		handle: '@dann',
// 		href: 'https://github.com/dxnn',
// 		role: 'Project Owner'
// 	},
// 	{
// 		handle: 'Marinana Rocha',
// 		href: '#',
// 		role: 'Lead Designer'
// 	},
// 	{
// 		handle: 'Ken Beaudin',
// 		href: 'https://github.com/kbventures',
// 		role: 'Lead Developer'
// 	},
// 	{
// 		handle: 'Marco Campos',
// 		href: 'https://github.com/madcampos',
// 		role: 'Project Manager'
// 	}
// ];

// TODO: ADD previous core and current core contributor list, and maybe a list of past volunteers as well?

export const Home = () => (
	<div className='grid-container home-grid-container'>
		<header className='main-header'>
			<img className='torontojs-logo' src='/torontojs-logo.png' alt='Small Toronto JS Logo' />
			<div className='inner-header'>
				<img className='small-avatar' src='/small-sample-avatar.png' alt='Small User Avatar' />
				<a href='/pages/notifications/'>
					<img className='notification-bell' src='/notification-bell.png' alt='Notification bell icon' />
				</a>
			</div>
		</header>

		<nav className='sidebar-left'>
			<div className='sidebar-left-container'>
				<a href='/pages/home'>
					<img src='/community-icon.png' alt='Community Icon' />
					<span>Community</span>
				</a>
				<a href='/pages/protected-profile/'>
					<img className='profile-nav-icon' src='/person-icon-white.png' alt='Profile Management Icon' />
					<span>Profile</span>
				</a>
				<a href='/pages/team'>
					<img src='/teams-icon.png' alt='Teams Icon' />
					<span>Teams</span>
				</a>
			</div>
		</nav>

		<main>
			<h1>Community</h1>
			<article className='profile'>
				<div className='sections-container'>
					<section className='about'>
						<div>
							<div className='about-header-container'>
								<h3>About</h3>
							</div>
							<div className='about-description-container'>
								<p className='about-description'>
									The VMS is the central place for onboarding volunteers, tracking their history, and giving Toronto JS better visibility into community
									operations.
								</p>
							</div>
						</div>
					</section>

					<section className='skills home-goals-section'>
						<h2>Goals</h2>
						<div className='home-section-content'>
							<ul className='home-list'>
								{goals.map((goal) => (
									<li key={goal.title}>
										<strong>{goal.title}.</strong> {goal.description}
									</li>
								))}
							</ul>
						</div>
					</section>

					<section className='social-links'>
						<div className='social-links-container'>
							<div className='social-links-header'>
								<h2>People</h2>
							</div>
							<div className='social-links-inner-container home-section-content'>
								<ul className='home-list'>
									{currLead.map((person) => (
										<li key={person.handle}>
											<a href={person.href} target='_blank' rel='noreferrer'>{person.handle}</a>: {person.role}
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section className='skills home-contributing-section'>
						<h2>Contributing</h2>
						<div className='home-section-content'>
							<p className='home-copy'>
								If you want to contribute to the project, please visit our{' '}
								<a href='https://github.com/orgs/torontojs/projects/6' target='_blank' rel='noreferrer'>Project Page</a>, or the{' '}
								<a href='/docs/CONTRIBUTING.md' target='_blank' rel='noreferrer'>Contributing Guide</a>.
							</p>
						</div>
					</section>
				</div>
			</article>
		</main>
	</div>
);
