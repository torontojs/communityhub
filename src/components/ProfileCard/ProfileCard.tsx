import { type ReactElement, useEffect, useState } from 'react';
import './ProfileCard.css';
import { Facebook } from '../Icons/Social/Facebook';
import { LinkedIn } from '../Icons/Social/LinkedIn';
import { XTwitter } from '../Icons/Social/XTwitter';

export interface MemberProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	socialLinks?: Record<string, string>;
	description?: string;
	happenedAt: string;
	insertedAt: string;
}

// Maps user's social media to a React Component containing the icon for the respective social media
// => It picks up an icon based on the user's social media handle in database
const socialIconsMap: Record<string, ReactElement> = {
	linkedin: <LinkedIn />,
	twitter: <XTwitter />,
	facebook: <Facebook />
};

const ProfileCard = () => {
	const [isLoadedProfileData, setIsLoadedProfileData] = useState(false);
	const [profileData, setProfileData] = useState<MemberProfile | null>();
	const [isErrorProfile, setIsErrorProfile] = useState(false);

	const queryParameters = new URLSearchParams(window.location.search);
	const profileId = queryParameters.get('pid');

	const dateFormatter = new Intl.DateTimeFormat('en-CA', { dateStyle: 'long' }).format;

	useEffect(() => {
		setIsLoadedProfileData(false);
		// Fetch data from the JSON file in the public directory
		const fetchProfileData = async (): Promise<void> => {
			try {
				const responseProfile = await fetch('/profiles.json');
				if (!responseProfile.ok) {
					setIsErrorProfile(true);
				}
				const jsonDataProfile = await responseProfile.json();
				// !FIXME: Filtering won't be required with API, remove filtering when integrating with backend
				setProfileData(jsonDataProfile.filter((profile: MemberProfile) => profile.id === profileId)[0]);
			} catch (error) {
				setIsErrorProfile(true);
				console.error('Error fetching profile data:', error);
			} finally {
				setIsLoadedProfileData(true);
			}
		};
		void fetchProfileData();
	}, []);

	useEffect(() => {
		document.title = (isLoadedProfileData && !isErrorProfile && profileData && profileData.id === profileId) ?
			`${profileData.name}'s Profile`
			: `User Profile`;
	}, [profileData]);

	let content = <></>;

	// If data not yet loaded
	if (!isLoadedProfileData) {
		content = <div aria-live='polite' role='status'>Loading profile...</div>;
	}

	// If error encountered
	if (isErrorProfile) {
		content = (
			<div aria-live='polite' role='status'>
				Unable to load profile. Please try refreshing the page.
			</div>
		);
	}

	// If not profile data returned
	if (isLoadedProfileData && !isErrorProfile && (!profileData || (profileData.id !== profileId))) {
		content = (
			<div aria-live='polite' role='status'>
				The profile was not found. Please try refreshing the page or contact an administrator.
			</div>
		);
	}

	// If data loaded
	if (isLoadedProfileData && !isErrorProfile && profileData && profileData.id === profileId) {
		content = (
			<article className='user-profile-card'>
				<header>
					<h1>{`${profileData.name}'s Profile`}</h1>
				</header>
				<div className='user-profile'>
					<div className='user-profile-column'>
						<figure>
							<picture>
								<img
									className='user-profile-avatar'
									src={profileData.avatar ?? '/default-avatar.png'}
									alt={`${profileData.name} Avatar`}
								/>
							</picture>
							<figcaption>{profileData.name}</figcaption>
						</figure>
					</div>
					<div className='user-profile-column'>
						<div aria-label='User Profile Details'>
							<section>
								<h2>Meet {profileData.name}</h2>
								<p>
									{profileData.description}{' '}
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros diam, luctus quis sagittis et, feugiat non quam. Nunc tempus ac eros at
									ullamcorper.
								</p>
							</section>
							<section>
								<p>
									<strong>Email:</strong> {profileData.email}
								</p>
							</section>
							<section>
								<p>
									<strong>Member Since:</strong> {dateFormatter(new Date(profileData.insertedAt))}
								</p>
							</section>
							<section>
								<ul aria-label='Social Media Links'>
									{profileData.socialLinks &&
										Object.entries(profileData.socialLinks).map(
											([key, value]) => (
												<li key={key}>
													<a aria-label={`${key} for ${profileData.name}`} href={value}>{socialIconsMap[key]}</a>
												</li>
											)
										)}
								</ul>
							</section>
						</div>
					</div>
				</div>
			</article>
		);
	}

	return (
		<main>
			{content}
		</main>
	);
};

export default ProfileCard;
