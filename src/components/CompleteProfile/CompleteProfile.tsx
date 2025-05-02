import { useRef, useState } from 'react';
import Button from '../Button/Button.tsx';
import { BlueSky } from '../Icons/Social/BlueSky.tsx';
import { DevTo } from '../Icons/Social/DevTo.tsx';
import { Facebook } from '../Icons/Social/Facebook.tsx';
import { Instagram } from '../Icons/Social/Instagram.tsx';
import { LinkedIn } from '../Icons/Social/LinkedIn.tsx';
import { Threads } from '../Icons/Social/Threads.tsx';
import { XTwitter } from '../Icons/Social/XTwitter.tsx';
import StepBar from '../StepBar/StepBar.tsx';
import './CompleteProfile.css';

interface SocialIcons {
	name: string;
	element: JSX.Element;
	visible: boolean;
}

const CompleteProfile = () => {
	const skillInputRef = useRef<HTMLInputElement>(null);

	const [photoFile, setPhotoFile] = useState<string | null>(null);
	const [skills, setSkills] = useState<string[]>([]);
	const [socialIcons, setSocialIcons] = useState<SocialIcons[]>([
		{ name: 'Instagram', element: <Instagram />, visible: true },
		{ name: 'Facebook', element: <Facebook />, visible: true },
		{ name: 'Threads', element: <Threads />, visible: true },
		{ name: 'LinkedIn', element: <LinkedIn />, visible: true },
		{ name: 'BlueSky', element: <BlueSky />, visible: true },
		{ name: 'X', element: <XTwitter />, visible: true },
		{ name: 'Dev.to', element: <DevTo />, visible: true }
	]);
	const [socialAccountInputs, setSocialAccountInputs] = useState<string[]>([]);

	const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPhotoFile(URL.createObjectURL(file));
		}
	};

	const handleAddSkill = (skill: string) => {
		if (skill.trim() !== '') {
			setSkills([...skills, skill]);
			if (skillInputRef.current) { skillInputRef.current.value = ''; }
		}
	};

	const handleInputSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const target = event.currentTarget;
		if ((event.key === 'Enter' || event.key === ',' || event.key === ' ') && target.id === 'skill') {
			event.preventDefault();
			handleAddSkill(target.value);
		}
	};

	const handleRemoveSkill = (index: number) => {
		setSkills((prevSkill) => prevSkill.filter((_, i) => i !== index));
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
		toggleIconVisibility(socialAccountToRemove);
	};

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
			<form action='' encType='multipart/form-data' id='complete-profile-form'>
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
									/>
								</div>
								<div>
									<label htmlFor='email' className='input-required'>
										E-mail
										<span>REQUIRED</span>
									</label>
									<input
										className='text-input'
										id='email'
										name='email'
										type='email'
										required
									/>
								</div>
								<div>
									<label htmlFor='slack-handle' className='input-required'>
										Slack handle
										<span>REQUIRED</span>
									</label>
									<input
										className='text-input'
										id='slack-handle'
										name='slack-handle'
										type='text'
										aria-description='Your slack handle to TorontoJS'
										placeholder='Your slack handle to TorontoJS'
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
									/>
									<datalist id='pronouns-options'>
										<option>He/him</option>
										<option>She/her</option>
										<option>They/them</option>
									</datalist>
								</div>
								<div>
									<span>Date of birth</span>
									<br />
									<div className='dob-wrapper'>
										<label htmlFor='month'>Month</label>
										<select id='month' name='month'>
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
										<select id='day' name='day'>
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
										/>
										<label htmlFor='isBasedOnGTA'>
											I'm based in Toronto or Greater Toronto Area
										</label>
									</div>
									<div className='slider-checkbox-row'>
										<input
											id='canJoinLocalEvents'
											name='canJoinLocalEvents'
											type='checkbox'
											className='slider-checkbox'
										/>
										<label htmlFor='canJoinLocalEvents'>
											I can join TorontoJS's local events
										</label>
									</div>
								</div>
							</div>
						</div>
					</details>

					{/* TODO: Need to confirm adding green check icon on successful section completion on mobile view */}
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
									{photoFile && (
										<span className='file-upload-success'>
											Avatar uploaded successfully
										</span>
									)}

									<label htmlFor='image-upload' className='custom-file-upload'>
										Upload {photoFile ? 'New' : 'Your'} Photo{' '}
									</label>
									<input
										id='image-upload'
										type='file'
										accept='image/png, image/jpeg'
										onChange={handlePhotoUpload}
									/>
									{photoFile && (
										<button
											type='button'
											onClick={() => setPhotoFile(null)}
											className='custom-file-upload'
										>
											Remove Photo
										</button>
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
									<label htmlFor='linkedInProfile'>LinkedIn profile</label>
									<input
										id='linkedInProfile'
										name='linkedInProfile'
										type='url'
										className='text-input'
									/>
								</div>
								<div>
									<label htmlFor='githubProfile'>GitHub profile</label>
									<input
										id='githubProfile'
										name='githubProfile'
										type='url'
										className='text-input'
									/>
								</div>
								<div>
									<label htmlFor='portfolio'>Site/portfolio</label>
									<input
										id='portfolio'
										name='portfolio'
										type='url'
										className='text-input'
									/>
								</div>
								<div id='details-information-skills'>
									<label htmlFor='skill'>
										Your skills
										<div id='skills'>
											{skills.map((skill, i) => (
												<span key={i}>
													{skill}
													<button
														type='button'
														aria-label='Remove Skill'
														onClick={() => handleRemoveSkill(i)}
													>
														x
													</button>
												</span>
											))}
											<input
												id='skill'
												ref={skillInputRef}
												onKeyDown={handleInputSkill}
												placeholder={skills.length === 0
													? 'Insert some of your skills and separate them with commas (e.g.: JavaScript, HTML, CSS)'
													: 'type here ...'}
											/>
										</div>
									</label>
								</div>

								<div id='details-social-accounts'>
									<p>Other social accounts (optional):</p>
									<div>
										{socialIcons.map(
											(socialIcon) =>
												socialIcon.visible && (
													<button
														type='button'
														onClick={() => handleAddSocialAccount(socialIcon.name)}
													>
														{socialIcon.element}
													</button>
												)
										)}
									</div>
								</div>
								<div id='details-social-inputs'>
									{socialAccountInputs.map((socialInput) => (
										<div>
											<label htmlFor={socialInput}>
												{socialInput}
												<button
													type='button'
													onClick={() => handleRemoveSocialAccount(socialInput)}
												/>
											</label>
											<input
												id={socialInput}
												name={socialInput}
												type='url'
												className='text-input'
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</details>
				</div>

				<Button isPrimary id='submit-button' type='submit'>
					Complete My Profile
				</Button>
			</form>
		</>
	);
};

export default CompleteProfile;
