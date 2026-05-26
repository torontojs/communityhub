
import { useProfileRedirect } from '../../hooks/useProfileRedirect.ts';
import ButtonLink from '../ButtonLink/ButtonLink.tsx';

import Header from '../Header/Header.tsx';
import { CheckConductCodeIcon } from '../Icons/CheckConductCodeIcon.tsx';
import { CompleteProfileIcon } from '../Icons/CompleteProfileIcon.tsx';
import StepBar from '../StepBar/StepBar.tsx';
import './CheckSteps.css';

const CheckSteps = () => {
	const { isRedirecting } = useProfileRedirect();

	if (isRedirecting) {
		return <div>loading...</div>;
	}

	return (
		<div id='check-steps-wrapper'>
			<StepBar currentStep={1} steps={[{ label: 'Account confirmed' }, { label: 'Check the conduct code' }, { label: 'Complete your profile' }]} />
			<div id='check-steps'>
				<Header isLogoLarge={false}>Welcome to TorontoJS Community Hub!</Header>
				<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
				<ul className='cards'>
					<li className='card'>
						<CheckConductCodeIcon />
						<p className='text-h6'>Check the TorontoJS's conduct code</p>
					</li>
					<li className='card'>
						<CompleteProfileIcon />
						<p className='text-h6'>Complete your profile</p>
					</li>
				</ul>
				<Button
					id='continue-button'
					isLarge
					onClick={() => {
						window.location.href = '/pages/review-conduct-code/';
					}}
				>
					Let's continue
				</Button>
			</div>
const CheckSteps = () => (
	<div id='check-steps-wrapper'>
		<StepBar currentStep={1} steps={[{ label: 'Account confirmed' }, { label: 'Check the conduct code' }, { label: 'Complete your profile' }]} />
		<div id='check-steps'>
			<Header isLogoLarge={false}>Welcome to TorontoJS Community Hub!</Header>
			<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
			<ul className='cards'>
				<li className='card'>
					<CheckConductCodeIcon />
					<p className='text-h6'>Check the TorontoJS's conduct code</p>
				</li>
				<li className='card'>
					<CompleteProfileIcon />
					<p className='text-h6'>Complete your profile</p>
				</li>
			</ul>
			<ButtonLink id='continue-button' isPrimary isLarge href='/pages/review-conduct-code/'>
				Let's continue
			</ButtonLink>
		</div>
	</div>
);

export default CheckSteps;
