/* eslint-disable max-lines */
import { type ChangeEvent, type FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';
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
	name: string;
	element: JSX.Element;
	visible: boolean;
}

interface UpdateProfileParams {
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
	const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
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

	const date = new Date(2000, month - 1, day);
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
		if (response.status !== 200) {
			const errorData = await response.json();
			// TODO: Replace console log with error message once the design becomes available
			console.log('Response not ok: ', errorData);
		}
	} catch (e) {
		if (import.meta.env.MODE === 'development') {
			if (e instanceof Error) {
				console.error(e.name);
				console.error(e.cause);
				console.error(e.message);
				console.error(e.stack);
			} else {
				throw new Error('Error Encountered!');
			}
		}
	}
};

const CompleteProfile = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const uploadPhotoButtonRef = useRef<HTMLButtonElement>(null);
	const skillInputRef = useRef<HTMLInputElement>(null);
	const avatarUploadStatusRef = useRef<HTMLSpanElement>(null);
	const slackHandleInputRef = useRef<HTMLInputElement>(null);

	const [photoFile, setPhotoFile] = useState<string | null>(null);
	const [socialIcons, setSocialIcons] = useState<SocialIcons[]>([
		{ name: 'Instagram', element: <Instagram />, visible: true },
		{ name: 'Facebook', element: <Facebook />, visible: true },
		{ name: 'Threads', element: <Threads />, visible: true },
		{ name: 'Mastodon', element: <Mastodon />, visible: true },
		{ name: 'BlueSky', element: <BlueSky />, visible: true },
		{ name: 'Twitter', element: <XTwitter />, visible: true },
		{ name: 'Dev.to', element: <DevTo />, visible: true }
	]);
	const [socialAccountInputs, setSocialAccountInputs] = useState<string[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [profileId, setProfileId] = useState<string | null>(null);
	const [birthdayValue, setBirthdayValue] = useState<string>('');
	const [profileData, setProfileData] = useState<UpdateProfileParams>({
		name: '',
		email: '',
		isBasedOnGTA: false,
		canJoinLocalEvents: false,
		pronouns: '',
		birthday: '',
		links: [],
		skills: []
	});

	const handleUploadPhotoButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPhotoFile(URL.createObjectURL(file));
		}
	};

	const handleRemovePhoto = () => {
		setPhotoFile(null);
		uploadPhotoButtonRef.current?.focus();
	};

	const handleAddSkill = (skillName: string) => {
		setProfileData((prev) => {
			return {
				...prev,
				skills: [...new Set([...prev.skills, skillName.toLowerCase()])]
			};
		});
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

	const toggleIconVisibility = (iconName: string) => {
		setSocialIcons((prevIcons) => prevIcons.map((icon) => icon.name === iconName ? { ...icon, visible: !icon.visible } : icon));
	};

	const handleAddSocialAccount = (socialAccountToAdd: string) => {
		setSocialAccountInputs((previousAccounts) => {
			if (!previousAccounts?.includes(socialAccountToAdd)) {
				return [...previousAccounts, socialAccountToAdd];
			}
			return previousAccounts;
		});
		toggleIconVisibility(socialAccountToAdd);
	};

	const handleRemoveSocialAccount = (socialAccountToRemove: string) => {
		setSocialAccountInputs((previousAccounts) => previousAccounts.filter((socialAccount: string) => socialAccount !== socialAccountToRemove));
		setProfileData((prev) => {
			const updatedLinks = prev.links.filter((link) => link.platform !== socialAccountToRemove);

			return {
				...prev,
				links: updatedLinks
			};
		});
		toggleIconVisibility(socialAccountToRemove);
	};

	const getUpdateProfileParams = (_formData: FormData): UpdateProfileParams => (
		profileData as unknown as UpdateProfileParams
	);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleLinksInputChange = (platform: string, value: string) => {
		const trimmedValue = value.trim();

		setProfileData((prev) => {
			const existingLink = prev.links.find((link) => link.platform === platform);

			let updatedLinks;
			if (existingLink) {
				if (trimmedValue === '') {
					updatedLinks = prev.links.filter((link) => link.platform !== platform);
				} else {
					updatedLinks = prev.links.map((link) => link.platform === platform ? { ...link, url: trimmedValue } : link);
				}
			} else if (trimmedValue !== '') {
				updatedLinks = [...prev.links, { platform, url: trimmedValue }];
			} else {
				return prev;
			}

			return {
				...prev,
				links: updatedLinks
			};
		});
	};

	const handleBirthdayInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
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

	const handleSliderToggle = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: checked
		}));
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const slackHandleIsValid = slackHandleInputRef.current?.checkValidity() ?? false;

		if (!profileId || !slackHandleIsValid) { return; }

		const formData = new FormData(event.currentTarget);
		const updateProfileParams = getUpdateProfileParams(formData);

		try {
			setIsLoading(true);
			await updateProfile(updateProfileParams, profileId);
		} catch (error) {
			// SetErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const linksByPlatform = useMemo(() => {
		const map: Record<string, string> = {};
		profileData.links.forEach(({ platform, url }) => {
			map[platform] = url;
		});
		return map;
	}, [profileData.links]);

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
					isBasedOnGTA: data.data?.isBasedOnGTA,
					canJoinLocalEvents: data.data?.canJoinLocalEvents
				};

				setProfileData((prev) => ({
					...prev,
					...fetchedFields
				}));

				setProfileId(data.data.id);
			} catch (err) {
				// setErrorMessage(error.message);
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
			<form onSubmit={handleSubmit} encType='multipart/form-data' id='complete-profile-form'>
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
										onChange={handleInputChange}
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
									<label htmlFor='slack-handle' className='input-required'>
										Slack handle
									</label>
									<input
										ref={slackHandleInputRef}
										className='text-input'
										id='slack-handle'
										name='slack-handle'
										type='text'
										placeholder='Your slack handle to TorontoJS'
										onChange={(e) => handleLinksInputChange('Slack', e.target.value)}
										value={linksByPlatform['Slack'] ?? ''}
										required
									/>
								</div>
								<div>
									<label htmlFor='pronouns'>Pronouns</label>
									<input
										className='text-input'
										id='pronouns'
										name='pronouns'
										type='text'
										list='pronouns-options'
										placeholder='Your pronouns (optional)'
										value={profileData.pronouns}
										onChange={handleInputChange}
									/>
									<datalist id='pronouns-options'>
										<option>He/him</option>
										<option>She/her</option>
										<option>They/them</option>
									</datalist>
								</div>
								<div>
									<label>Date of birth</label>
									<br />
									<div className='dob-wrapper'>
										<label htmlFor='month'>Month</label>
										<select
											id='month'
											name='month'
											value={birthdayValue?.split('-')[0]}
											onChange={handleBirthdayInputChange}
										>
											<option selected disabled hidden value=''>
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
											value={birthdayValue?.split('-')[1]}
											onChange={handleBirthdayInputChange}
										>
											<option selected disabled hidden value=''>Select a day</option>
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
											<span>I can join TorontoJS&#8217; local events</span>
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
							<div className='details-content-file-upload'>
								{photoFile && (
									<picture>
										<img src={photoFile} />
									</picture>
								)}

								<div className='details-file-upload-buttons-wrapper'>
									<span ref={avatarUploadStatusRef} aria-live='polite' aria-atomic='true' role='status' className='file-upload-success'>
										{photoFile ? 'Avatar uploaded successfully' : ''}
									</span>

									<Button
										type='button'
										onClick={handleUploadPhotoButtonClick}
										ref={uploadPhotoButtonRef}
									>
										Upload {photoFile ? 'New' : 'Your'} Photo{' '}
									</Button>
									<input
										ref={fileInputRef}
										id='image-upload'
										type='file'
										accept='image/png, image/jpeg'
										onChange={handlePhotoUpload}
									/>
									{photoFile && (
										<Button
											type='button'
											hasOutline
											onClick={handleRemovePhoto}
										>
											Remove Photo
										</Button>
									)}
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
									<label htmlFor='linkedin-profile'>LinkedIn profile</label>
									<input
										id='linkedin-profile'
										name='linkedin-profile'
										type='url'
										className='text-input'
										value={linksByPlatform['LinkedIn'] ?? ''}
										onChange={(e) => handleLinksInputChange('LinkedIn', e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='github-profile'>GitHub profile</label>
									<input
										id='github-profile'
										name='github-profile'
										type='url'
										className='text-input'
										value={linksByPlatform['GitHub'] ?? ''}
										onChange={(e) => handleLinksInputChange('GitHub', e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='portfolio'>Site/portfolio</label>
									<input
										id='portfolio'
										name='portfolio'
										type='url'
										className='text-input'
										value={linksByPlatform['Portfolio'] ?? ''}
										onChange={(e) => handleLinksInputChange('Portfolio', e.target.value)}
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
												socialIcon.visible && (
													<button
														aria-label={`Add ${socialIcon.name} account`}
														key={socialIcon.name}
														type='button'
														onClick={() => handleAddSocialAccount(socialIcon.name)}
														value={linksByPlatform[socialIcon.name] ?? ''}
													>
														{socialIcon.element}
													</button>
												)
										)}
									</div>
								</div>
								<div id='details-social-inputs'>
									{socialAccountInputs.map((socialInput) => (
										<div key={socialInput}>
											<span>
												<label htmlFor={`${socialInput}-input`}>
													{socialInput}
												</label>
												<button
													type='button'
													aria-label={`Close ${socialInput} input`}
													onClick={() => handleRemoveSocialAccount(socialInput)}
												/>
											</span>
											<input
												id={`${socialInput}-input`}
												name={socialInput}
												type='url'
												className='text-input'
												onChange={(e) => handleLinksInputChange(socialInput, e.target.value)}
												value={linksByPlatform[socialInput] ?? ''}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</details>
				</div>

				<Button isPrimary isLarge id='submit-button' type='submit' disabled={!linksByPlatform['Slack']}>
					Complete My Profile
				</Button>
			</form>
		</>
	);
};

export default CompleteProfile;
