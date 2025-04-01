import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import Button from '../../components/Button/Button.js';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle.js';
import '../../index.css';
import './style.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<div className='App'>
				<HeaderTitle>Review our conduct code</HeaderTitle>

				<p className='intro'>
					We are a community driven by dedication, friendship, and the passion to build exceptional things. It’s important for all our members to have read and understood
					a few key rules.
				</p>

				{/* "In a nutshell" section */}
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

				{/* Dropdowns and Checkbox section */}
				<div className='forms-section'>
					<select className='dropdown'>
						<option>TorontoJS Code of Conduct</option>
					</select>
					<select className='dropdown'>
						<option>Volunteering Agreement</option>
					</select>
					<select className='dropdown'>
						<option>Image Release Form</option>
					</select>
				</div>

				<label className='checkbox-label'>
					<input type='checkbox' className='checkbox' />I agree to TorontoJS’s conduct code and other forms
				</label>

				<Button isPrimary disabled>
					Let me complete my profile
				</Button>
			</div>
		</StrictMode>
	)
);
