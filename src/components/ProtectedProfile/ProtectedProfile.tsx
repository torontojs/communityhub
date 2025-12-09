import { useEffect, useState } from 'react';
import './ProtectedProfile.css';
import DescriptionFormModal from '../DescriptoinFormModal/DescriptionFormModal.tsx';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import Social from '../Social/Social.tsx';
import SocialLinksFormModal from '../SocialLinksFormModal/SocialLinksFormModal.tsx';
import Team from '../Team/Team.tsx';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

export const ProtectedProfile = (): React.JSX.Element => {
	const [userId, setUserId] = useState<string>();
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isBasedInGTA, setIsBasedOnGTA] = useState<boolean | null>(null);
	const [canJoinLocalEvents, setCanJoinLocalEvents] = useState<boolean | null>(null);
	const [pronouns, setPronoun] = useState<string>('');
	const [birthday, setBirthday] = useState<string>('');
	const [skills, setSkills] = useState<string[]>([]);
	const [links, setLinks] = useState<LinksArray>([]);
	const [activatedAt, setIsActivatedAt] = useState<string>('');
	const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
	const [socialLinksModal, setSocialLinksModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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

				const { data: { id, name, email, description, isBasedInGTA, canJoinLocalEvents, pronouns, birthday, links, skills, activatedAt } } = data;
				setUserId(id);
				setName(name);
				setEmail(email);
				setDescription(description);
				setIsBasedOnGTA(isBasedInGTA);
				setCanJoinLocalEvents(canJoinLocalEvents);
				setPronoun(pronouns);
				setBirthday(birthday);
				setSkills(skills);
				setLinks(links);
				setIsActivatedAt(activatedAt);
				setIsLoading(true);
			} catch (err) {
				console.error(err);
			}
		}
		void fetchProtectedProfile();
	}, [isLoading, name, email, description, isBasedInGTA, canJoinLocalEvents, pronouns, birthday, links, skills]);

	const updateDescription = async (desc: string | null) => {
		try {
			const response = await fetch(`/api/profiles/${userId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ description: desc })
			});

			if (!response.ok) {
				console.error('Response no ok, ', response);
			}

			return desc;
		} catch (error) {
			console.error('Update description error, ', error.message);
			return null;
		}
	};

	// const updateSocialLinks = async (updateLinks: Links[]) => {
	// 	// 		const body: {
	// 	//     description?: string | undefined;
	// 	//     name?: string | undefined;
	// 	//     isBasedOnGTA?: boolean | undefined;
	// 	//     canJoinLocalEvents?: boolean | undefined;
	// 	//     pronouns?: string | undefined;
	// 	//     birthday?: string | undefined;
	// 	//     avatar?: string | undefined;
	// 	//     links?: {
	// 	//         platform: "site" | "slack" | "linkedin" | "github" | "portfolio" | "codepen" | "instagram" | "threads" | "facebook" | "bluesky" | "mastodon" | "twitter" | "devto";
	// 	//         url: string;
	// 	//     }[] | undefined;
	// 	//     skills?: string[] | undefined;
	// 	// }
	// 	try {
	// 		const response = await fetch(`/api'profiles/${userId}`, {
	// 			method: 'PATCH',
	// 			credentials: 'include',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ links: updateLinks })
	// 		});

	// 		if (!response.ok) {
	// 			console.error('Response not ok, ', response);
	// 		}

	// 		const result = await response.json();

	// 		return links;
	// 	} catch (error) {
	// 		console.error('Update description error, ', error.message);
	// 	}
	// };

	// const updateSocialLinks = async () => {};

	const handleEditSkills = () => '';

	// NEEDS TO BE COMPLETED
	const handleSocialLinksSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		console.log('social links event object', event);
		const formData = new FormData(event.currentTarget);

		console.log('social formData', formData);
		const desc = formData.get('description') as string;

		const updatedDescription = await updateDescription(desc);

		if (!updatedDescription) { return; }

		setDescription(updatedDescription);
	};

	const handleDescriptionSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const desc = formData.get('description') as string;

		const updatedDescription = await updateDescription(desc);

		if (!updatedDescription) { return; }

		setDescription(updatedDescription);
	};

	if (!isLoading) { return <h1>...is loading!</h1>; }

	return (
		<>
			<div className='grid-container'>
				<header className='main-header'>
					<img className='torontojs-logo' src='/torontojs-logo.png' alt='Small Toronto JS Logo' />
					<div className='inner-header'>
						<img className='small-avatar' src='/small-sample-avatar.png' alt='Small User Avatar' />
						<img className='notification-bell' src='/notification-bell.png' alt='Notification bell icon' />
					</div>
				</header>
				<nav className='sidebar-left'>
					<div className='side-bar-left-container'>
						<a href='/pages/home'>
							<img src='/community-icon.png' alt='Community Icon' />
							<span>Community</span>
						</a>
						<a href='/pages/profile'>
							<img src='/person-icon-white.png' alt='Profile Management Icon' />
							<span>Profile Management</span>
						</a>
					</div>
				</nav>
				<main>
					<h1>My Profile</h1>
					<article className='profile'>
						<div className='profile-header-container'>
							<header className='profile-header'>
								<div className='avatar'>
									<img src='/small-sample-avatar.png' alt='Medium Size Avatar' />
								</div>
								<div className='user-bio'>
									<h2>{name}</h2>
									<p className='user-bio-pronouns'>{pronouns}</p>
									<div className='contact-info'>
										<div className='profile-email'>
											<img src='/profile-email.png' alt='Profile Email Icon' />
											{email}
										</div>
										<div className='profile-location'>
											<img src='/location-icon.png' alt='Profile Location Icon' />
											<p>{isBasedInGTA ? 'Based in GTA' : 'Not based in GTA'}</p>
										</div>
									</div>
								</div>
								<button>
									<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
								</button>
							</header>
						</div>
						<div className='sections-container'>
							<section className='about'>
								<div>
									{description ?
										(
											<>
												<div className='about-header-container'>
													<h3>About</h3>
													<button onClick={() => setDescriptionModal(true)}>
														<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
													</button>
												</div>
												<div className='about-description-container'>
													<p className='about-description'>{description}</p>
												</div>
												{descriptionModal && <DescriptionFormModal onSubmit={handleDescriptionSubmit} onClose={() => setDescriptionModal(false)} />}
											</>
										) :
										(
											<>
												<h3>About</h3>
												<EmptyIcon />
												<p>Write a delightful description which will help others get to know more about you.</p>
												<button onClick={() => setDescriptionModal(true)}>Add description</button>
												{descriptionModal && <DescriptionFormModal onSubmit={handleDescriptionSubmit} onClose={() => setDescriptionModal(false)} />}
											</>
										)}
								</div>
							</section>

							<section className='skills'>
								<h2>Skills</h2>
								<div>
									<EmptyIcon />
									<p>You can show case your relevant skills here.</p>
									<button onClick={handleEditSkills}>Add skills</button>
								</div>
							</section>

							{
								/* <section className='socials-links'>
								<div className='socials-links-container'>
									<div className='social-links-header'>
										<h2>Social Links</h2>
										<button onClick={handleEditSocials}>
											<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
										</button>
									</div>

									<div className='social-links-inner-container'>
										<ul>
											{links.map((entry: Links, index: number) => (
												<li key={index}>
													<Social socialName={entry.platform} socialUrl={entry.url} />
												</li>
											))}
										</ul>
									</div>
								</div>
							</section> */
							}

							<section className='social-links'>
								<div className='social-links-container'>
									<div className='social-links-header'>
										<h2>Social Links</h2>
										<button onClick={() => setSocialLinksModal(true)}>
											<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
										</button>
									</div>

									<div className='social-links-inner-container'>
										<ul>
											{links.map((entry: Links, index: number) => (
												<li key={index}>
													<Social socialName={entry.platform} socialUrl={entry.url} />
												</li>
											))}
										</ul>
									</div>
									{socialLinksModal && (
										<SocialLinksFormModal
											linksArrayProp={links}
											onSubmit={handleSocialLinksSubmit}
											onClose={() => setSocialLinksModal(false)}
										/>
									)}
								</div>
							</section>

							<section className='teams'>
								<div className='teams-container'>
									<div className='teams-header'>
										<h2>Teams</h2>
									</div>
									<div className='teams-inner-container'>
										<ul>
											<li>
												<Team />
											</li>
										</ul>
									</div>
								</div>
							</section>
						</div>
					</article>
				</main>
				<div style={{ display: 'none' }}>
					{/* Unused state variables preserved for git commit */}
					<span data-unused='description'>{description}</span>
					<span data-unused='isBasedOnGTA'>{String(isBasedInGTA)}</span>
					<span data-unused='canJoinLocalEvents'>{String(canJoinLocalEvents)}</span>
					<span data-unused='birthday'>{birthday}</span>
					<span data-unused='links'>{JSON.stringify(links)}</span>
					<span data-unused='skills'>{JSON.stringify(skills)}</span>
					<span data-unsued='activatedAt'>{activatedAt}</span>
				</div>
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

// -- Email: "root@torontojs.com"
// -- Password: "correct horse battery staple"
