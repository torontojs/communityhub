/* eslint-disable max-lines */
import { type ChangeEvent, type FormEventHandler, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button.tsx';
import { BlueSky } from '../Icons/Social/BlueSky.tsx';
import { DevTo } from '../Icons/Social/DevTo.tsx';
import { Facebook } from '../Icons/Social/Facebook.tsx';
import { Instagram } from '../Icons/Social/Instagram.tsx';
import { Mastodon } from '../Icons/Social/Mastodon.tsx';
import { Threads } from '../Icons/Social/Threads.tsx';
import { XTwitter } from '../Icons/Social/XTwitter.tsx';
import StepBar from '../StepBar/StepBar.tsx';
import './CompleteProfile.css';

interface SocialIcons {
	id: string;
	name: string;
	element: JSX.Element;
	inputVisible: boolean;
}

interface ProfileParams {
	email: string;
	isBasedOnGTA: boolean;
	canJoinLocalEvents: boolean;
	name?: string;
	links: { platform: string, url: string }[] | [];
	pronouns?: string;
	socialAccounts?: string[];
	birthday: string;
	avatar?: string;
	skills: string[];
}

type UpdateProfileParams = Omit<ProfileParams, 'email'>;

const platformEnum = ['site', 'slack', 'linkedin', 'github', 'portfolio', 'codepen', 'instagram', 'threads', 'facebook', 'bluesky', 'mastodon', 'twitter', 'devto'];
const isGravatarHost = (hostname: string): boolean => {
	const normalizedHostname = hostname.toLowerCase();
	return normalizedHostname === 'gravatar.com' || normalizedHostname.endsWith('.gravatar.com');
};

const getGravatarUrlType = (value?: string): 'empty' | 'image' | 'invalid' | 'profile' => {
	if (!value?.trim()) { return 'empty'; }

	try {
		const url = new URL(value.trim());
		const [firstPath = '', secondPath, thirdPath] = url.pathname.split('/').filter(Boolean);

		if (url.protocol !== 'https:' || !isGravatarHost(url.hostname)) { return 'invalid'; }
		if (firstPath === 'avatar' && secondPath) { return 'image'; }
		if ((url.hostname === 'gravatar.com' || url.hostname === 'www.gravatar.com') && firstPath && !secondPath) { return 'profile'; }
		if (url.hostname === 'api.gravatar.com' && firstPath === 'v3' && secondPath === 'profiles' && thirdPath) { return 'profile'; }

		return 'invalid';
	} catch {
		return 'invalid';
	}
};

// Validation helpers
/**
 * Checks whether a birthday string is in the valid MM-DD format.
 *
 * A valid format must follow the pattern: two-digit month (01–12)
 * followed by a dash and a two-digit day (01–31).
 * This function does not validate actual calendar dates (e.g., "02-30" would be considered valid).
 *
 * @param birthday - The birthday string to validate, expected in MM-DD format.
 * @returns `true` if the format is valid, otherwise `false`.
 */
const isValidBirthdayFormat = (birthday: string): boolean => {
	const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/iu;
	return regex.test(birthday);
};

/**
 * Determines whether a birthday string represents a real calendar date.
 *
 * The input must be in MM-DD format and represent a valid calendar day.
 * This function uses a placeholder year (2000, a leap year) to account for month lengths,
 * including February 29th. It assumes no year context is needed and is used primarily for validation.
 *
 * @deprecated We will remove update this when Temporal becomes stable
 *
 * @param birthday - The birthday string to validate, expected in MM-DD format.
 * @returns `true` if the string is a valid date in the MM-DD format, otherwise `false`.
 */
const isRealDate = (birthday: string): boolean => {
	if (!isValidBirthdayFormat(birthday)) { return false; }

	const [monthStr, dayStr] = birthday.split('-');
	const month = Number(monthStr);
	const day = Number(dayStr);

	const REFERENCE_YEAR = 2000;
	const date = new Date(REFERENCE_YEAR, month - 1, day);
	return date.getMonth() + 1 === month && date.getDate() === day;
};

const updateProfile = async (data: UpdateProfileParams, profileId: string) => {
	try {
		const response = await fetch(`/api/profiles/${profileId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...data }),
			credentials: 'include'
		});
		if (response.status === 200) {
			window.location.href = '/pages/home/';
		} else {
			const errorData = await response.json();
			// TODO: Replace console log with error message once the design becomes available
			console.error('Response not ok: ', errorData ?? 'An Error Occurred!');
		}
	} catch (err) {
		console.error(err);
	}
};

const getGravatarProfileSlug = (value: string): string | null => {
	try {
		const url = new URL(value.trim());
		const [firstPath = '', secondPath = '', thirdPath = '', extraPath] = url.pathname.split('/').filter(Boolean);

		if (url.protocol !== 'https:') {
			return null;
		}

		if (['gravatar.com', 'www.gravatar.com'].includes(url.hostname.toLowerCase()) && firstPath !== 'avatar' && !secondPath) {
			return firstPath.replace(/\.card$/iu, '');
		}

		if (url.hostname === 'api.gravatar.com' && firstPath === 'v3' && secondPath === 'profiles' && thirdPath && !extraPath) {
			return thirdPath;
		}

		return null;
	} catch {
		return null;
	}
};

const getGravatarAvatarUrl = async (profileUrl: string): Promise<string | null> => {
	const slug = getGravatarProfileSlug(profileUrl);
	if (!slug) { return null; }

	try {
		const response = await fetch(`https://api.gravatar.com/v3/profiles/${encodeURIComponent(slug)}`);
		if (!response.ok) { return null; }

		const profile = await response.json() as { avatar_url?: string };
		return profile.avatar_url ?? null;
	} catch {
		return null;
	}
};

// eslint-disable-next-line max-lines-per-function
const CompleteProfile = () => {
	const skillInputRef = useRef<HTMLInputElement>(null);
	const slackHandleInputRef = useRef<HTMLInputElement>(null);

	// Social Input Refs
	const linkedinInputRef = useRef<HTMLInputElement>(null);
	const githubInputRef = useRef<HTMLInputElement>(null);
	const sitePortfolioInputRef = useRef<HTMLInputElement>(null);

	const [socialIcons, setSocialIcons] = useState<SocialIcons[]>([
		{ id: 'instagram', name: 'Instagram', element: <Instagram />, inputVisible: false },
		{ id: 'facebook', name: 'Facebook', element: <Facebook />, inputVisible: false },
		{ id: 'threads', name: 'Threads', element: <Threads />, inputVisible: false },
		{ id: 'mastodon', name: 'Mastodon', element: <Mastodon />, inputVisible: false },
		{ id: 'bluesky', name: 'BlueSky', element: <BlueSky />, inputVisible: false },
		{ id: 'twitter', name: 'X/Twitter', element: <XTwitter />, inputVisible: false },
		{ id: 'devto', name: 'Dev.to', element: <DevTo />, inputVisible: false }
	]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	// TODO: Show error messages once the design system component is available
	const [, setErrorMessage] = useState<string | null>(null);
	const [profileId, setProfileId] = useState<string | null>(null);
	const [birthdayValue, setBirthdayValue] = useState<string>('');
	const [isSubmissionDisabled, setIsSubmissionDisabled] = useState<boolean>(true);
	const [profileData, setProfileData] = useState<ProfileParams>({
		name: '',
		email: '',
		isBasedOnGTA: false,
		canJoinLocalEvents: false,
		pronouns: '',
		birthday: '',
		links: [],
		skills: []
	});
	const avatarUrlType = getGravatarUrlType(profileData.avatar);

	const validateSlackHandle = () => {
		const slackUrl = slackHandleInputRef.current?.value ?? '';
		const isValid = slackUrl.trim() !== '';
		setIsSubmissionDisabled(!isValid);
		return isValid;
	};

	const handleAddSkill = (skillName: string) => {
		setProfileData((prev) => ({
			...prev,
			skills: [...new Set([...prev.skills, skillName.toLowerCase()])]
		}));
		if (skillInputRef.current) { skillInputRef.current.value = ''; }
	};

	const handleInputSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const target = event.currentTarget;
		if ((event.key === 'Enter' || event.key === ',' || event.key === ' ') && target.id === 'skill') {
			event.preventDefault();
			handleAddSkill(target.value);
		}
	};

	const handleRemoveSkill = (targetSkill: string) => {
		setProfileData((prev) => {
			const updatedSkills = prev.skills.filter(
				(skill) => skill.trim().toLowerCase() !== targetSkill.trim().toLowerCase()
			);

			return {
				...prev,
				skills: updatedSkills
			};
		});
	};

	const toggleSocialInputVisibility = (inputId: string) => {
		setSocialIcons((prevIcons) => prevIcons.map((input) => input.id === inputId ? { ...input, inputVisible: !input.inputVisible } : input));
	};

	const getProfileParams = (formData: FormData): UpdateProfileParams => {
		// Create links array from social inputs
		const linksFromForm: { platform: string, url: string }[] = [];
		for (const [key, value] of formData.entries()) {
			if (platformEnum.includes(key.toLowerCase()) && typeof value === 'string' && value.trim() !== '') {
				linksFromForm.push({ platform: key.toLocaleLowerCase(), url: value.trim() });
			}
		}

		const updateProfileParams: UpdateProfileParams = {
			isBasedOnGTA: formData.get('isBasedOnGTA') === 'on',
			canJoinLocalEvents: formData.get('canJoinLocalEvents') === 'on',
			pronouns: formData.get('pronouns') as string,
			birthday: profileData.birthday,
			avatar: (formData.get('avatar') as string)?.trim() || undefined,
			links: linksFromForm,
			skills: profileData.skills
		};

		return updateProfileParams;
	};

	const handleBirthdayInputChange = (evt: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = evt.target;
		setBirthdayValue((prev) => {
			const [prevMonth = '', prevDay = ''] = prev.split('-');

			let newBirthday;
			if (name === 'month') {
				newBirthday = `${value}-${prevDay}`;
			} else if (name === 'day') {
				newBirthday = `${prevMonth}-${value}`;
			} else { newBirthday = `${prevMonth}-${prevDay}`; }

			return newBirthday;
		});
	};

	const handleSliderToggle = (evt: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = evt.target;
		setProfileData((prev) => ({
			...prev,
			[name]: checked
		}));
	};

	const handleAvatarInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;
		setProfileData((prev) => ({
			...prev,
			avatar: value
		}));
	};

	const handleAvatarInputBlur = async (evt: ChangeEvent<HTMLInputElement>) => {
		const avatarUrl = await getGravatarAvatarUrl(evt.target.value);
		if (!avatarUrl) { return; }

		setProfileData((prev) => ({
			...prev,
			avatar: avatarUrl
		}));
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		setErrorMessage(null);
		validateSlackHandle();

		if (!profileId || !validateSlackHandle() || isSubmissionDisabled) { return; }

		const formData = new FormData(event.currentTarget);
		try {
			setIsSubmitting(true);
			const profileParams = getProfileParams(formData);
			await updateProfile(profileParams, profileId);
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('An unknown error occurred while updating your profile.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	// Validate slack handle on page load, once
	useEffect(() => {
		validateSlackHandle();
	}, []);

	// Load user profile data from the backend
	useEffect(() => {
		(async () => {
			setIsLoading(true);

			try {
				const response = await fetch(`/api/profiles/self`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				});

				// If not authenticated, redirect to Sign In page
				if (response.status === 401) {
					window.location.href = `/pages/sign-in/`;
				} else if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				const fetchedFields = {
					id: data.data?.id,
					name: data.data?.name,
					email: data.data?.email,
					avatar: data.data?.avatar ?? '',
					isBasedOnGTA: data.data?.isBasedOnGTA,
					canJoinLocalEvents: data.data?.canJoinLocalEvents
				};

				setProfileData((prev) => ({
					...prev,
					...fetchedFields
				}));

				setProfileId(data.data.id);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		// Update profileData only if new date is valid
		if (isRealDate(birthdayValue)) {
			setProfileData((prev) => ({
				...prev,
				birthday: birthdayValue
			}));
		}
	}, [birthdayValue]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<StepBar
				currentStep={3}
				steps={[
					{ label: 'Account confirmed' },
					{ label: 'Check the conduct code' },
					{ label: 'Complete your profile' }
				]}
			/>
			<form onSubmit={handleSubmit} id='complete-profile-form'>
				<h2>Complete your profile</h2>

				<div id='fields-wrapper'>
					<details open>
						<summary className='text-h6'>
							<span>In a nutshell:</span>
						</summary>

						<div className='details-content-wrapper'>
							<div className='details-nutshell-grid'>
								{/* TODO: Create resuable input components later */}
								<div>
									<label htmlFor='name'>Name</label>
									<input
										className='text-input'
										id='name'
										name='name'
										type='text'
										value={profileData.name}
										readOnly
									/>
								</div>
								<div>
									<label htmlFor='email' className='input-required'>
										E-mail
									</label>
									<input
										className='text-input'
										id='email'
										name='email'
										type='email'
										value={profileData.email}
										readOnly={true}
										required
									/>
								</div>
								<div>
									<label htmlFor='slack' className='input-required'>
										Slack handle
									</label>
									<input
										ref={slackHandleInputRef}
										className='text-input'
										id='slack'
										name='slack'
										type='text'
										placeholder='Your slack handle to TorontoJS'
										onBlur={validateSlackHandle}
										required
									/>
								</div>
								<div>
									<label htmlFor='pronouns'>Pronouns</label>
									<select
										className='text-input'
										id='pronouns'
										name='pronouns'
										defaultValue=''
									>
										<option value='' hidden>Pronouns optional</option>
										<option value='he/him'>he/him</option>
										<option value='she/her'>she/her</option>
										<option value='they/them'>they/them</option>
									</select>
								</div>
								<div>
									<label>Date of birth</label>
									<br />
									<div className='dob-wrapper'>
										<label htmlFor='month'>Month</label>
										<select
											id='month'
											name='month'
											value={birthdayValue?.split('-')[0] ?? ''}
											onChange={handleBirthdayInputChange}
										>
											<option disabled hidden value=''>
												Select a month
											</option>
											<option value='01'>January</option>
											<option value='02'>February</option>
											<option value='03'>March</option>
											<option value='04'>April</option>
											<option value='05'>May</option>
											<option value='06'>June</option>
											<option value='07'>July</option>
											<option value='08'>August</option>
											<option value='09'>September</option>
											<option value='10'>October</option>
											<option value='11'>November</option>
											<option value='12'>December</option>
										</select>
										<label htmlFor='day'>Day</label>
										<select
											id='day'
											name='day'
											value={birthdayValue?.split('-')[1] ?? ''}
											onChange={handleBirthdayInputChange}
										>
											<option disabled hidden value=''>Select a day</option>
											<option value='01'>1</option>
											<option value='02'>2</option>
											<option value='03'>3</option>
											<option value='04'>4</option>
											<option value='05'>5</option>
											<option value='06'>6</option>
											<option value='07'>7</option>
											<option value='08'>8</option>
											<option value='09'>9</option>
											<option value='10'>10</option>
											<option value='11'>11</option>
											<option value='12'>12</option>
											<option value='13'>13</option>
											<option value='14'>14</option>
											<option value='15'>15</option>
											<option value='16'>16</option>
											<option value='17'>17</option>
											<option value='18'>18</option>
											<option value='19'>19</option>
											<option value='20'>20</option>
											<option value='21'>21</option>
											<option value='22'>22</option>
											<option value='23'>23</option>
											<option value='24'>24</option>
											<option value='25'>25</option>
											<option value='26'>26</option>
											<option value='27'>27</option>
											<option value='28'>28</option>
											<option value='29'>29</option>
											<option value='30'>30</option>
											<option value='31'>31</option>
										</select>
									</div>
								</div>
								<div className='slider-wrapper'>
									<div className='slider-checkbox-row'>
										<input
											id='isBasedOnGTA'
											name='isBasedOnGTA'
											type='checkbox'
											className='slider-checkbox'
											checked={profileData.isBasedOnGTA}
											onChange={handleSliderToggle}
										/>
										<label htmlFor='isBasedOnGTA'>
											<span>I'm based in Toronto or Greater Toronto Area</span>
										</label>
									</div>
									<div className='slider-checkbox-row'>
										<input
											id='canJoinLocalEvents'
											name='canJoinLocalEvents'
											type='checkbox'
											className='slider-checkbox'
											checked={profileData.canJoinLocalEvents}
											onChange={handleSliderToggle}
										/>
										<label htmlFor='canJoinLocalEvents'>
											<span>I can join TorontoJS&apos; local events</span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</details>

					<details open>
						<summary className='text-h6'>
							<span>Avatar:</span>
						</summary>

						<div className='details-content-wrapper'>
							<div className='details-content-avatar-url'>
								<picture>
									<img src={profileData.avatar || '/default-avatar.png'} alt='' />
								</picture>

								<div>
									<label htmlFor='avatar'>Gravatar URL</label>
									<input
										id='avatar'
										name='avatar'
										type='url'
										className='text-input'
										value={profileData.avatar ?? ''}
										onChange={handleAvatarInputChange}
										onBlur={handleAvatarInputBlur}
										placeholder='https://gravatar.com/profile-name'
									/>
									<p>
										{avatarUrlType === 'profile' && 'Profile URL detected. The app will save the real image URL.'}
										{avatarUrlType === 'image' && 'Image URL detected.'}
										{avatarUrlType === 'empty' && 'Paste a Gravatar profile or image URL. Leave blank to use the default avatar.'}
										{avatarUrlType === 'invalid' && 'Use a Gravatar profile or image URL.'}
									</p>
								</div>
							</div>
						</div>
					</details>

					<details open>
						<summary className='text-h6'>
							<span>More Information:</span>
						</summary>

						<div className='details-content-wrapper'>
							<div id='details-information-grid'>
								<div>
									<label htmlFor='linkedin'>LinkedIn profile</label>
									<input
										ref={linkedinInputRef}
										id='linkedin'
										name='linkedin'
										type='url'
										className='text-input'
									/>
								</div>
								<div>
									<label htmlFor='github'>GitHub profile</label>
									<input
										ref={githubInputRef}
										id='github'
										name='github'
										type='url'
										className='text-input'
									/>
								</div>
								<div>
									<label htmlFor='portfolio'>Site/portfolio</label>
									<input
										ref={sitePortfolioInputRef}
										id='portfolio'
										name='portfolio'
										type='url'
										className='text-input'
									/>
								</div>
								<div id='details-information-skills'>
									<label htmlFor='skill'>
										<span>Your skills</span>
										<div id='skills'>
											{profileData?.skills?.map((skill) => (
												<span key={skill}>
													{skill}
													<button
														type='button'
														aria-label='Remove Skill'
														onClick={() => handleRemoveSkill(skill)}
													>
														x
													</button>
												</span>
											))}
											<input
												id='skill'
												ref={skillInputRef}
												onKeyDown={handleInputSkill}
												placeholder={profileData.skills.length === 0
													? 'Insert some of your skills and separate them with commas (e.g.: JavaScript, HTML, CSS)'
													: 'type here ...'}
											/>
										</div>
									</label>
								</div>

								<div id='details-social-accounts'>
									<label>Other social accounts (optional):</label>
									<div>
										{socialIcons.map(
											(socialIcon) =>
												!socialIcon.inputVisible && (
													<button
														aria-label={`Add ${socialIcon.name} account`}
														key={socialIcon.id}
														type='button'
														onClick={() => toggleSocialInputVisibility(socialIcon.id)}
													>
														{socialIcon.element}
													</button>
												)
										)}
									</div>
								</div>
								<div id='details-social-inputs'>
									{socialIcons.map((socialIcon) => (socialIcon.inputVisible &&
										(
											<div key={socialIcon.id}>
												<span>
													<label htmlFor={`${socialIcon.id}-input`}>
														{socialIcon.name}
													</label>
													<button
														type='button'
														aria-label={`Close ${socialIcon.name} input`}
														onClick={() => toggleSocialInputVisibility(socialIcon.id)}
													/>
												</span>
												<input
													id={`${socialIcon.id}-input`}
													name={socialIcon.id}
													type='url'
													className='text-input'
												/>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					</details>
				</div>

				<Button isPrimary isLarge id='submit-button' type='submit' disabled={isSubmissionDisabled || isSubmitting} aria-busy={isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Complete My Profile'}
				</Button>
			</form>
		</>
	);
};

export default CompleteProfile;
