import Button from '../Button/Button';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import StepBar from '../StepBar/StepBar';
import { Dropdown } from './icon/Dropdown';
import './ReviewConductCode.css';

const ReviewConductCode = () => (
	<>
		<StepBar step={2} />
		<div className='conduct-code'>
			<HeaderTitle>Review our conduct code</HeaderTitle>

			<p className='intro'>
				We are a community driven by dedication, friendship, and the passion to build exceptional things. It’s important for all our members to have read and understood a
				few key rules.
			</p>

			<div className='nutshell-box'>
				<h2 className='nutshell-title'>In a nutshell:</h2>
				<ol className='nutshell-list'>
					<li className='nutshell-item'>
						<span className='number'>1</span>
						<span className='step-label'>All our members are committed to maintaining a safe, respectful and welcoming space.</span>
					</li>
					<li className='nutshell-item'>
						<span className='number'>2</span>
						<span className='step-label'>
							Developers, designers and other tech workers are welcome to collaborate in projects and events for the community.
						</span>
					</li>
					<li className='nutshell-item'>
						<span className='number'>3</span>
						<span className='step-label'>The TorontoJS activities are non-profit and meant to foster the tech community.</span>
					</li>
				</ol>
			</div>

			<ul className='dropdown-list'>
				<li className='dropdown'>
					<span>TorontoJS Code of Conduct</span>
					<Dropdown />
				</li>
				<li className='dropdown'>
					<span>Volunteering Agreement</span>
					<Dropdown />
				</li>
				<li className='dropdown'>
					<span>Image Release Form</span>
					<Dropdown />
				</li>
			</ul>

			<label className='checkbox-label'>
				<input type='checkbox' />I agree to TorontoJS’s conduct code and other forms
			</label>

			<Button isPrimary disabled id='complete-profile-button'>
				Let me complete my profile
			</Button>
		</div>
	</>
);

export default ReviewConductCode;
