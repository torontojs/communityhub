import { useEffect, useState } from 'react';
import './ProfileDetail.css';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import Social from '../Social/Social.tsx';
import Team from '../Team/Team.tsx';

interface ProfileLink {
	platform: string;
	url: string;
}

interface ProfileTeam {
	description?: string;
	id: string;
	memberCount?: number;
	name: string;
	role?: string;
}

interface Profile {
	avatar?: string;
	canJoinLocalEvents?: boolean;
	description?: string;
	email: string;
	id: string;
	isBasedOnGTA?: boolean;
	links?: ProfileLink[];
	name: string;
	pronouns?: string;
	skills?: string[];
	teams?: ProfileTeam[];
}

interface DataResponse<T> {
	data: T;
}

interface Props {
	profileId: string;
}

const UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;

const ProfileDetail = ({ profileId }: Props): React.JSX.Element => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [pageError, setPageError] = useState<string | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		const fetchProfile = async (): Promise<void> => {
			setPageError(null);

			if (!UUID_RE.test(profileId)) {
				setPageError('Invalid profile ID.');
				setIsLoaded(true);
				return;
			}

			try {
				const response = await fetch(`/api/profiles/${encodeURIComponent(profileId)}`);

				if (!response.ok) {
					throw new Error('Failed to fetch profile');
				}

				const profileResponse = await response.json() as DataResponse<Profile>;
				setProfile(profileResponse.data);
			} catch (error) {
				setPageError('Unable to load profile. Please try refreshing the page.');
				console.error('Error fetching profile:', error);
			} finally {
				setIsLoaded(true);
			}
		};

		void fetchProfile();
	}, [profileId]);

	if (!isLoaded) {
		return (
			<div aria-live='polite' role='status' className='profile-detail-status'>Loading profile...</div>
		);
	}

	if (pageError || !profile) {
		return (
			<div aria-live='polite' role='status' className='profile-detail-status'>{pageError ?? 'Profile not found.'}</div>
		);
	}

	return (
		<>
			<h1>{profile.name}</h1>
			<article className='profile-detail'>
				<div className='profile-detail-header-container'>
					<header className='profile-detail-header'>
						<div className='profile-detail-avatar'>
							<img src={profile.avatar ?? '/default-avatar.png'} alt={`${profile.name} avatar`} />
						</div>
						<div className='profile-detail-bio'>
							<h2>{profile.name}</h2>
							{profile.pronouns && <p>{profile.pronouns}</p>}
							<div className='profile-detail-contact-info'>
								<div className='profile-detail-email'>
									<img src='/profile-email.png' alt='' />
									{profile.email}
								</div>
								<div className='profile-detail-location'>
									<img src='/location-icon.png' alt='' />
									<p>{profile.isBasedOnGTA ? 'Based in GTA' : 'Not based in GTA'}</p>
								</div>
							</div>
						</div>
					</header>
				</div>

				<div className='profile-detail-sections'>
					<section className='profile-detail-card'>
						<h2>About</h2>
						{profile.description ?
							<p className='profile-detail-description'>{profile.description}</p> :
							(
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No description has been added yet.</p>
								</div>
							)}
					</section>

					<section className='profile-detail-card'>
						<h2>Skills</h2>
						{profile.skills && profile.skills.length > 0 ?
							(
								<ul className='profile-detail-skills-list'>
									{profile.skills.map((skill) => <li key={skill}>{skill}</li>)}
								</ul>
							) :
							(
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No skills to display yet.</p>
								</div>
							)}
					</section>

					<section className='profile-detail-card'>
						<h2>Social Links</h2>
						{profile.links && profile.links.length > 0 ?
							(
								<ul className='profile-detail-social-list'>
									{profile.links.map((link) => (
										<li key={`${link.platform}-${link.url}`}>
											<Social socialName={link.platform} socialUrl={link.url} />
										</li>
									))}
								</ul>
							) :
							(
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No social links to display yet.</p>
								</div>
							)}
					</section>

					<section className='profile-detail-card'>
						<h2>Teams</h2>
						{profile.teams && profile.teams.length > 0 ?
							(
								<ul className='profile-detail-teams-list teams-inner-container'>
									{profile.teams.map((team) => (
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
							) :
							(
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No teams to display yet.</p>
								</div>
							)}
					</section>
				</div>
			</article>
		</>
	);
};

export default ProfileDetail;
