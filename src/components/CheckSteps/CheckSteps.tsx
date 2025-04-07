import { CheckConductCode } from '../../pages/check-steps/icons/CheckConductCode';
import { CompleteProfile } from '../../pages/check-steps/icons/CompleteProfile';
import Button from '../Button/Button';
import Header from '../Header/Header';
import './CheckSteps.css';

const CheckSteps = () => (
	<div className='check-steps-wrapper'>
		<div className='check-steps'>
			<Header isLogoLarge={false}>Welcome to TorontoJS Community Hub!</Header>
			<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
			<ul className='cards'>
				<li className='card'>
					<CheckConductCode />
					<p className='text-h6'>1. Check the TorontoJS's conduct code</p>
				</li>
				<li className='card'>
					<CompleteProfile />
					<p className='text-h6'>2. Complete your profile</p>
				</li>
			</ul>
			<Button isPrimary isLarge>
				Let's continue
			</Button>
		</div>
	</div>
);

export default CheckSteps;
