import { useState } from 'react';
import Button from '../Button/Button.tsx';
import { CodeOfConduct } from '../Documents/CodeOfConduct.tsx';
import { ImageReleaseForm } from '../Documents/ImageReleaseForm.tsx';
import { VolunteerAgreement } from '../Documents/VolunteerAgreement.tsx';
import HeaderTitle from '../HeaderTitle/HeaderTitle.tsx';
import { ArrowDownIcon } from '../Icons/ArrowDownIcon.tsx';
import StepBar from '../StepBar/StepBar.tsx';
import './ReviewConductCode.css';

const ReviewConductCode = () => {
	const [agreementChecked, setAgreementChecked] = useState(false);

	return (
		<>
			<StepBar currentStep={2} steps={[{ label: 'Account confirmed' }, { label: 'Check the conduct code' }, { label: 'Complete your profile' }]} />
			<div id='conduct-code'>
				<HeaderTitle>Review our conduct code</HeaderTitle>

				<p className='intro'>
					We are a community driven by dedication, friendship, and the passion to build exceptional things. It’s important for all our members to have read and understood
					a few key rules.
				</p>

				<div>
					<h2 className='nutshell-title text-h6'>In a nutshell:</h2>
					<ol className='nutshell-list'>
						<li className='nutshell-item'>
							<span className='number'>1</span>
							<span className='step-label'>All our members are committed to maintaining a safe, respectful and welcoming space.</span>
						</li>
						<li className='nutshell-item'>
							<span className='number'>2</span>
							<span className='step-label'>Developers, designers and other tech workers are welcome to collaborate in projects and events for the community.</span>
						</li>
						<li className='nutshell-item'>
							<span className='number'>3</span>
							<span className='step-label'>The TorontoJS activities are non-profit and meant to foster the tech community.</span>
						</li>
					</ol>
				</div>

				<ul className='dropdown-list'>
					<li>
						<details name='waiver-document'>
							<summary>
								<span>TorontoJS Code of Conduct</span>
								<ArrowDownIcon />
							</summary>
							<div className='details-content'>
								<CodeOfConduct />
							</div>
						</details>
					</li>
					<li>
						<details name='waiver-document'>
							<summary>
								<span>Volunteering Agreement</span>
								<ArrowDownIcon />
							</summary>
							<div className='details-content'>
								<VolunteerAgreement />
							</div>
						</details>
					</li>
					<li>
						<details name='waiver-document'>
							<summary>
								<span>Image Release Form</span>
								<ArrowDownIcon />
							</summary>
							<div className='details-content'>
								<ImageReleaseForm />
							</div>
						</details>
					</li>
				</ul>

				<form className='agreement-form' action='/pages/complete-profile/'>
					<label htmlFor='agreement' className='checkbox-label'>
						<input
							type='checkbox'
							id='agreement'
							required
							onChange={() => {
								setAgreementChecked(!agreementChecked);
							}}
						/>
						I agree to TorontoJS’s conduct code and other forms
					</label>

					<Button type='submit' isPrimary isLarge aria-disabled={!agreementChecked} id='complete-profile-button'>
						Let me complete my profile
					</Button>
				</form>
			</div>
		</>
	);
};

export default ReviewConductCode;
