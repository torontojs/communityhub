import { useEffect, useState } from 'react';
import './ProtectedProfile.css';
// import Logo from '../Logo/Logo.tsx';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

export const ProtectedProfile = (): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isBasedOnGTA, setIsBasedOnGTA] = useState<boolean | null>(null);
	const [canJoinLocalEvents, setCanJoinLocalEvents] = useState<boolean | null>(null);
	const [pronouns, setPronoun] = useState<string>('');
	const [birthday, setBirthday] = useState<string>('');
	const [skills, setSkills] = useState<string[]>([]);
	const [links, setLinks] = useState<LinksArray>([]);
	const [activatedAt, setIsActivatedAt] = useState<string>('');

	useEffect(() => {
		async function fetchProtectedProfile() {
			const url = '/api/profiles/self';

			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error('Error Fetching Protected Profile');
				}

				const data = await response.json();

				if (!data) {
					throw new Error('Error parsing protected profile response data');
				}

				console.log('data', data);
				const { data: { name, email, description, isBasedOnGTA, canJoinLocalEvents, pronouns, birthday, links, skills, activatedAt } } = data;

				setName(name);
				setEmail(email);
				setDescription(description);
				setIsBasedOnGTA(isBasedOnGTA);
				setCanJoinLocalEvents(canJoinLocalEvents);
				setPronoun(pronouns);
				setBirthday(birthday);
				setSkills(skills);
				setLinks(links);
				setIsLoading(false);
				setIsActivatedAt(activatedAt);
			} catch (err) {
				console.error(err);
			}
		}
		void fetchProtectedProfile();
	}, []);

	if (isLoading) { return <h1>Is Loading...</h1>; }
	return (
		<>
			<div className='grid-container'>
				<header>
					<p>
						Good morning, {name}
					</p>
				</header>
				<nav className='sidebar-left'>
					<a href='/pages/home'>
						<img src='TBD' alt='Community Icon' />Community
					</a>
					<a href='#'>
						<img src='TBC' alt='Profile Management Icon' />Profile Management
					</a>
				</nav>
				<main>
					<nav className='tabs'>Volunteers / Profile tabs</nav>
					<article className='profile'>
						<header>
							<h1>{name}</h1>
							<p>{pronouns}</p>
							<p>{email}</p>
							<p>Member since: {activatedAt}</p>
						</header>
						<section className='about'>
							<h2>About</h2>
						</section>

						<section className='skills'>
							<h2>Skills</h2>
						</section>

						<section className='social-links'>
							<h2>Social Links</h2>
						</section>

						<section className='teams'>
							<h2>Teams</h2>
						</section>
					</article>
				</main>
			</div>
		</>
	);
};
// <h1>Protected Profile</h1>
// <ul>
// 	<li>Name: {name}</li>
// 	<li>Email:{email}</li>
// 	<li>Description:{description}</li>
// 	<li>Based in GTA:{isBasedOnGTA}</li>
// 	<li>Able to join local events:{canJoinLocalEvents}</li>
// 	<li>Pronouns:{pronouns}</li>
// 	<li>Birthday:{birthday}</li>
// 	<p>Links</p>
// 	<ul>
// 		{links.map((entry: Links): React.JSX.Element => <li>{entry.platform}:{entry.url}</li>)}
// 	</ul>
// 	<p>Skills:</p>
// 	<ul>
// 		{skills.map((entry: string): React.JSX.Element => <li>{entry}</li>)}
// 	</ul>
// </ul>
