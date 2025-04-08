import { useState } from 'react';
import Button from '../Button/Button';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import StepBar from '../StepBar/StepBar';
import { Dropdown } from './icon/Dropdown';
import './ReviewConductCode.css';

const ReviewConductCode = () => {
	const [agreementChecked, setAgreementChecked] = useState(false);

	return (
		<>
			<StepBar step={2} />
			<div className='conduct-code'>
				<HeaderTitle>Review our conduct code</HeaderTitle>

				<p className='intro'>
					We are a community driven by dedication, friendship, and the passion to build exceptional things. It’s important for all our members to have read and understood
					a few key rules.
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
					<li>
						<details>
							<summary className='dropdown-title'>
								<span>TorontoJS Code of Conduct</span>
								<Dropdown />
							</summary>
							<div className='details-content'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro suscipit harum doloremque, quod tempora architecto atque unde corrupti, ipsa in
								expedita et provident vel dignissimos modi exercitationem neque reiciendis dicta.
							</div>
						</details>
					</li>
					<li>
						<details>
							<summary className='dropdown-title'>
								<span>Volunteering Agreement</span>
								<Dropdown />
							</summary>
							<div className='details-content'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid incidunt quibusdam, temporibus accusamus eos dolore suscipit? Cum excepturi
								reiciendis quis nam, provident temporibus laboriosam animi molestias harum optio magni amet.
							</div>
						</details>
					</li>
					<li>
						<details>
							<summary className='dropdown-title'>
								<span>Image Release Form</span>
								<Dropdown />
							</summary>
							<div className='details-content'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit consequatur, fugiat sit asperiores, sunt possimus delectus incidunt, iste atque
								qui doloremque rerum. Ratione mollitia dicta corporis minus est neque.
							</div>
						</details>
					</li>
				</ul>

				<label className='checkbox-label'>
					<input
						type='checkbox'
						onChange={() => {
							setAgreementChecked(!agreementChecked);
						}}
					/>
					I agree to TorontoJS’s conduct code and other forms
				</label>

				<Button
					isPrimary
					isLarge
					disabled={!agreementChecked}
					id='complete-profile-button'
					onClick={() => {
						window.open('/pages/complete-profile/', '_self');
					}}
				>
					Let me complete my profile
				</Button>
			</div>
		</>
	);
};

export default ReviewConductCode;
