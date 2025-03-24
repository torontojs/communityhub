import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'open-props';
import '../../index.css';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
	(
		<StrictMode>
			<form action='' encType='multipart/form-data'>
				<h2>Complete your profile</h2>

				<details open>
					<summary>In a nutshell:</summary>

					<div>
						<label htmlFor='name'>Name</label>
						<input id='name' name='name' type='text' />
					</div>
					<div>
						<label htmlFor='email'>
							E-mail
							<span>REQUIRED</span>
						</label>
						<input id='email' name='email' type='email' required />
					</div>
					<div>
						<label htmlFor='slack-handle'>
							Slack handle
							<span>REQUIRED</span>
						</label>
						<input
							id='slack-handle'
							name='slack-handle'
							type='text'
							aria-description='Your slack handle to TorontoJS'
							placeholder='Your slack handle to TorontoJS'
						/>
					</div>
					<div>
						<label htmlFor='pronouns'>Pronouns</label>
						<input id='pronouns' name='pronouns' type='text' list='pronouns-options' placeholder='Your pronouns (optional)' />
						<datalist id='pronouns-options'>
							<option>He/him</option>
							<option>She/her</option>
							<option>They/them</option>
						</datalist>
					</div>
					<div>
						<span>Date of birth</span>
						<br />
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

					<div>
						<input id='isBasedOnGTA' name='isBasedOnGTA' type='checkbox' />
						<label htmlFor='isBasedOnGTA'>I'm based in Toronto or Greater Toronto Area</label>
					</div>

					<div>
						<input id='canJoinLocalEvents' name='canJoinLocalEvents' type='checkbox' />
						<label htmlFor='canJoinLocalEvents'>I can join TorontoJS's local events</label>
					</div>
				</details>

				{/* TODO: Image upload */}
				<details open>
					<summary>Avatar</summary>
					<div>
						<label>Upload Product Image:</label>
						<input type='file' accept='image/png, image/jpeg' />
					</div>
				</details>

				<button type='submit'>submit</button>
			</form>
		</StrictMode>
	)
);
