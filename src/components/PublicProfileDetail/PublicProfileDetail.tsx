import { useEffect, useState } from 'react';
import type { DataResponse, PublicProfile } from '../../types/public.ts';
import { safeAvatarUrl } from '../../utils/safeAvatarUrl.ts';
import EmptyIcon from '../EmptyIcon/EmptyIcon.tsx';
import PublicLayout from '../PublicLayout/PublicLayout.tsx';
import Social from '../Social/Social.tsx';
import Team from '../Team/Team.tsx';
import '../ProfileDetail/ProfileDetail.css';
import './PublicProfileDetail.css';

interface Props {
	profileId: string;
}

const UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu;

const PublicProfileDetail = ({ profileId }: Props): React.JSX.Element => {
	const [error, setError] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [profile, setProfile] = useState<PublicProfile | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchProfile = async (): Promise<void> => {
			if (!UUID_RE.test(profileId)) {
				setError('Profile not found.');
				setIsLoaded(true);
				return;
			}

			try {
				const response = await fetch(`/api/profiles/${encodeURIComponent(profileId)}`, { signal: controller.signal });
				if (!response.ok) { throw new Error('Failed to fetch profile'); }

				const result = await response.json() as DataResponse<PublicProfile>;
				setProfile(result.data);
				document.title = `${result.data.name} | TorontoJS Community`;
			} catch (fetchError) {
				if (fetchError instanceof Error && fetchError.name === 'AbortError') { return; }
				setError('Unable to load this profile. Please try refreshing the page.');
				console.error('Error fetching public profile:', fetchError);
			} finally {
				if (!controller.signal.aborted) { setIsLoaded(true); }
			}
		};

		void fetchProfile();
		return () => controller.abort();
	}, [profileId]);

	let content: React.JSX.Element;

	if (!isLoaded) {
		content = <div className='public-status' aria-live='polite' role='status'>Loading profile...</div>;
	} else if (error || !profile) {
		content = <div className='public-status' aria-live='polite' role='status'>{error ?? 'Profile not found.'}</div>;
	} else {
		content = (
			<>
				<header className='profile-detail-header-container'>
					<div className='profile-detail-header'>
						<div className='profile-detail-avatar'>
							<img src={safeAvatarUrl(profile.avatar)} alt={`${profile.name} avatar`} />
						</div>
						<div className='profile-detail-bio'>
							<h1>{profile.name}</h1>
							{profile.pronouns && <p>{profile.pronouns}</p>}
							<div className='profile-detail-location'>
								<img src='/location-icon.png' alt='' />
								<p>{profile.isBasedOnGTA ? 'Based in GTA' : 'Not based in GTA'}</p>
							</div>
						</div>
					</div>
				</header>
				<div className='profile-detail-sections'>
					<section className='profile-detail-card'>
						<h2>About</h2>
						{profile.description ? <p className='profile-detail-description'>{profile.description}</p> : (
							<div className='profile-detail-empty'>
								<EmptyIcon />
								<p>No description has been added yet.</p>
							</div>
						)}
					</section>
					<section className='profile-detail-card'>
						<h2>Skills</h2>
						{profile.skills && profile.skills.length > 0
							? <ul className='profile-detail-skills-list'>{profile.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
							: (
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No skills to display yet.</p>
								</div>
							)}
					</section>
					<section className='profile-detail-card'>
						<h2>Social links</h2>
						{profile.links && profile.links.length > 0
							? (
								<ul className='profile-detail-social-list'>
									{profile.links.map((link) => (
										<li key={`${link.platform}-${link.url}`}>
											<Social socialName={link.platform} socialUrl={link.url} />
										</li>
									))}
								</ul>
							)
							: (
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No social links to display yet.</p>
								</div>
							)}
					</section>
					<section className='profile-detail-card'>
						<h2>Teams</h2>
						{profile.teams && profile.teams.length > 0
							? (
								<ul className='profile-detail-teams-list teams-inner-container'>
									{profile.teams.map((team) => (
										<li key={team.id}>
											<Team
												name={team.name}
												memberCount={team.memberCount}
												role={team.role}
												description={team.description}
												href={`/pages/public-team/?id=${encodeURIComponent(team.id)}`}
											/>
										</li>
									))}
								</ul>
							)
							: (
								<div className='profile-detail-empty'>
									<EmptyIcon />
									<p>No teams to display yet.</p>
								</div>
							)}
					</section>
				</div>
			</>
		);
	}

	return (
		<PublicLayout activePage='profiles'>
			<a className='public-back-link' href='/pages/public-profiles/'>Back to profiles</a>
			<article className='profile-detail public-profile-detail'>{content}</article>
		</PublicLayout>
	);
};

export default PublicProfileDetail;
