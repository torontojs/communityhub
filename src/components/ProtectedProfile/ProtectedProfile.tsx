import { useEffect, useState } from 'react';
import './ProtectedProfile.css';
import AuthenticatedLayout from '../AuthenticatedLayout/AuthenticatedLayout.tsx';
import Button from '../Button/Button.tsx';
import DescriptionFormModal from '../DescriptoinFormModal/DescriptionFormModal.tsx';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import GeneralInfoFormModal from '../GeneralInfoFormModal/GeneralInfoFormModal.tsx';
import SkillsFormModal from '../SkillsFormModal/SkillsFormModal.tsx';
import Social from '../Social/Social.tsx';
import SocialLinksFormModal from '../SocialLinksFormModal/SocialLinksFormModal.tsx';
import Team from '../Team/Team.tsx';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

interface ProfileTeam {
	description?: string;
	id: string;
	memberCount?: number;
	name: string;
	role?: string;
}

export const ProtectedProfile = (): React.JSX.Element => {
	const [userId, setUserId] = useState<string>();
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [avatar, setAvatar] = useState<string>('/default-avatar.png');
	const [description, setDescription] = useState<string>('');
	const [isBasedOnGTA, setIsBasedOnGTA] = useState<boolean | null>(null);
	const [canJoinLocalEvents, setCanJoinLocalEvents] = useState<boolean | null>(null);
	const [pronouns, setPronoun] = useState<string>('');
	const [skills, setSkills] = useState<string[]>([]);
	const [links, setLinks] = useState<LinksArray>([]);
	const [teams, setTeams] = useState<ProfileTeam[]>([]);
	const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
	const [skillsModal, setSkillsModal] = useState<boolean>(false);
	const [socialLinksModal, setSocialLinksModal] = useState<boolean>(false);
	const [generalInfoModal, setGeneralInfoModal] = useState<boolean>(false);
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

				const { data: { id, name, email, avatar, description, isBasedOnGTA, canJoinLocalEvents, pronouns, links, skills, teams } } = data;
				setUserId(id);
				setName(name);
				setEmail(email);
				setAvatar(avatar ?? '/default-avatar.png');
				setDescription(description);
				setIsBasedOnGTA(isBasedOnGTA);
				setCanJoinLocalEvents(canJoinLocalEvents);
				setPronoun(pronouns);
				setSkills(skills);
				setLinks(links);
				setTeams(teams);
				setIsLoading(true);
			} catch (err) {
				console.error(err);
			}
		}
		void fetchProtectedProfile();
	}, []);

	const updateDescription = async (desc: string | null): Promise<string | null> => {
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
				return null;
			}

			return desc;
		} catch (error) {
			console.error('Update description error, ', error.message);
			return null;
		}
	};

	const socialMediaPlatforms = [
		'site',
		'linkedin',
		'github',
		'portfolio',
		'codepen',
		'instagram',
		'threads',
		'facebook',
		'bluesky',
		'mastodon',
		'twitter',
		'devto'
	] as const;

	const updateSocialLinks = async (updatedLinks: Links[]): Promise<Links[] | null> => {
		try {
			const response = await fetch(`/api/profiles/${userId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ links: updatedLinks })
			});

			if (!response.ok) {
				console.error('Response not ok, ', response);
				return null;
			}

			return updatedLinks;
		} catch (error) {
			console.error('Update social links error, ', error);
			return null;
		}
	};

	const updateSkills = async (updatedSkills: string[]): Promise<string[] | null> => {
		try {
			const response = await fetch(`/api/profiles/${userId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ skills: updatedSkills })
			});

			if (!response.ok) {
				console.error('Response not ok, ', response);
				return null;
			}

			return updatedSkills;
		} catch (error) {
			console.error('Update skills error, ', error);
			return null;
		}
	};

	const updateGeneralInfo = async (data: { name: string, pronouns?: string, isBasedOnGTA: boolean, canJoinLocalEvents: boolean }) => {
		try {
			const response = await fetch(`/api/profiles/${userId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				console.error('Response not ok, ', response);
				return null;
			}

			return data;
		} catch (error) {
			console.error('Update general info error, ', error);
			return null;
		}
	};

	const handleGeneralInfoSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const updatedData = {
			name: (formData.get('name') as string)?.trim(),
			pronouns: (formData.get('pronouns') as string)?.trim() || undefined,
			canJoinLocalEvents: formData.get('canJoinLocalEvents') === 'on',
			isBasedOnGTA: formData.get('isBasedOnGTA') === 'on'
		};

		const result = await updateGeneralInfo(updatedData);

		if (!result) { return false; }

		if (result.name) { setName(result.name); }
		if (result.pronouns !== undefined) { setPronoun(result.pronouns ?? ''); }
		setCanJoinLocalEvents(result.canJoinLocalEvents ?? null);
		setIsBasedOnGTA(result.isBasedOnGTA ?? null);
		return true;
	};

	const handleSocialLinksSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const updatedLinks: Links[] = socialMediaPlatforms
			.map((platform) => ({
				platform,
				url: (formData.get(platform) as string)?.trim() ?? ''
			}))
			.filter(({ url }) => url !== '');

		const existingSlack = links.find(({ platform }) => platform === 'slack');
		if (existingSlack) {
			updatedLinks.unshift(existingSlack);
		}

		const result = await updateSocialLinks(updatedLinks);

		if (!result) { return false; }

		setLinks(result);
		return true;
	};

	const handleSkillsSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const rawSkills = formData.get('skills') as string;

		const updatedSkills = rawSkills
			.split(',')
			.map((skill) => skill.trim())
			.filter((skill) => skill !== '')
			.slice(0, 10);

		const result = await updateSkills(updatedSkills);

		if (!result) { return false; }

		setSkills(result);
		return true;
	};

	const handleDescriptionSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const desc = formData.get('description') as string;

		const updatedDescription = await updateDescription(desc);

		if (updatedDescription === null) { return false; }

		setDescription(updatedDescription);
		return true;
	};

	if (!isLoading) {
		return (
			<AuthenticatedLayout activePage='profile' mainClassName='protected-profile-page'>
				<h1>...is loading!</h1>
			</AuthenticatedLayout>
		);
	}

	return (
		<AuthenticatedLayout activePage='profile' mainClassName='protected-profile-page'>
			<h1>My Profile</h1>
			<article className='profile'>
				<div className='profile-header-container'>
					<header className='profile-header'>
						<div className='avatar'>
							<img src={avatar} alt='Medium Size Avatar' />
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
									<p>{isBasedOnGTA ? 'Based in GTA' : 'Not based in GTA'}</p>
								</div>
							</div>
						</div>
						<button onClick={() => setGeneralInfoModal(true)}>
							<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
						</button>
					</header>
					{generalInfoModal && (
						<GeneralInfoFormModal
							name={name}
							email={email}
							pronouns={pronouns}
							isBasedOnGTA={isBasedOnGTA}
							canJoinLocalEvents={canJoinLocalEvents}
							onSubmit={handleGeneralInfoSubmit}
							onClose={() => setGeneralInfoModal(false)}
						/>
					)}
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
										{descriptionModal && (
											<DescriptionFormModal
												description={description}
												onSubmit={handleDescriptionSubmit}
												onClose={() => setDescriptionModal(false)}
											/>
										)}
									</>
								) :
								(
									<>
										<h3>About</h3>
										<EmptyIcon />
										<p>Write a delightful description here which will help others get to know more about you.</p>
										<button onClick={() => setDescriptionModal(true)}>Add description</button>
										{descriptionModal && (
											<DescriptionFormModal
												description={description}
												onSubmit={handleDescriptionSubmit}
												onClose={() => setDescriptionModal(false)}
											/>
										)}
									</>
								)}
						</div>
					</section>

					<section className='skills'>
						{skills.length > 0 ?
							(
								<>
									<div className='skills-header'>
										<h2>Skills</h2>
										<button onClick={() => setSkillsModal(true)}>
											<img src='/edit-pencil-icon.png' alt='Edit Pencil Icon' />
										</button>
									</div>
									<ul className='skills-list'>
										{skills.map((skill, index) => <li key={index} className='skill-tag'>{skill}</li>)}
									</ul>
								</>
							) :
							(
								<>
									<h2>Skills</h2>
									<div className='skills-empty'>
										<EmptyIcon />
										<p>You can showcase your relevant skills here.</p>
										<Button type='button' isPrimary onClick={() => setSkillsModal(true)}>Add Skills</Button>
									</div>
								</>
							)}
						{skillsModal && (
							<SkillsFormModal
								skills={skills}
								onSubmit={handleSkillsSubmit}
								onClose={() => setSkillsModal(false)}
							/>
						)}
					</section>

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
									{teams.map((team) => (
										<li key={team.id}>
											<Team
												name={team.name}
												memberCount={team.memberCount ?? 0}
												role={team.role}
												description={team.description}
												href={`/pages/team?id=${team.id}`}
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>
				</div>
			</article>
		</AuthenticatedLayout>
	);
};
