import { CheckConductCode } from '../../pages/check-steps/icons/CheckConductCode';
import { CompleteProfile } from '../../pages/check-steps/icons/CompleteProfile';
import Button from '../Button/Button';
import Header from '../Header/Header';
import './CheckSteps.css';

const CheckSteps = () => {
	return (
		<div className='App'>
			<Header>Welcome to TorontoJS Community Hub!</Header>
			<p className='intro'>Your account is active, and you're almost ready to get in. Let's complete a few more steps:</p>
			<ul className='cards'>
				<li className='card'>
					<CheckConductCode />
					<p>Check the TorontoJS's conduct code</p>
				</li>
				<li className='card'>
					<CompleteProfile />
					<p>Complete your profile</p>
				</li>
			</ul>
			<Button isPrimary isLarge>
				Let's continue
			</Button>
		</div>
	);
};

export default CheckSteps;
