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

const CompleteProfile = () => (
	<>
		<StepBar currentStep={3} steps={[{ label: 'Account confirmed' }, { label: 'Check the conduct code' }, { label: 'Complete your profile' }]} />
		<form action='' encType='multipart/form-data' id='complete-profile-form'>
			<h2>Complete your profile</h2>

			<div id='fields-wrapper'>
				{/* TODO: Make this details component */}
				<details open>
					<summary className='text-h6'>
						<span>In a nutshell:</span>
					</summary>

				<div className='details-content-wrapper'>
					<div className='details-content-grid'>
						{/* TODO: Create input components with their own css */}
						<div>
							<label htmlFor='name'>Name</label>
							<input className='text-input' id='name' name='name' type='text' />
						</div>
						<div> 
							<label htmlFor='email' className='input-required'>
								E-mail
								<span>REQUIRED</span>
							</label>
							<input className='text-input' id='email' name='email' type='email' required />
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
							/>
						</div>
						<div>
							<label htmlFor='pronouns'>Pronouns</label>
							<input
							className='text-input'
								id='pronouns' name='pronouns' type='text' list='pronouns-options' placeholder='Your pronouns (optional)' />	
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
						<div className='slider-wrapper'>
							<div className='slider-checkbox-row'>
								<input id='isBasedOnGTA' name='isBasedOnGTA' type='checkbox' />
								<label htmlFor='isBasedOnGTA'>I'm based in Toronto or Greater Toronto Area</label>
							</div>
							<div className='slider-checkbox-row'>
								<input id='canJoinLocalEvents' name='canJoinLocalEvents' type='checkbox' />
								<label htmlFor='canJoinLocalEvents'>I can join TorontoJS's local events</label>
							</div>
						</div>
					</div>
				</div>
			</details>

				{/* TODO: Image upload */}
				<details open>
					<summary className='text-h6'>
						<span>Avatar:</span>
					</summary>

					<div className='details-content-wrapper'>
						<picture>
							<img hidden />
						</picture>
						<div>
							<label>Upload Product Image:</label>
							<input type='file' accept='image/png, image/jpeg' />
						</div>
					</div>
				</details>

				<details open>
					<summary className='text-h6'>
						<span>More Information:</span>
					</summary>

					<div className='details-content-wrapper'>
						<div>
							<div>
								<label htmlFor='linkedInProfile'>LinkedIn profile</label>
								<input id='linkedInProfile' name='linkedInProfile' type='url' />
							</div>
							<div>
								<label htmlFor='githubProfile'>GitHub profile</label>
								<input id='githubProfile' name='githubProfile' type='url' />
							</div>

							<div>
								<label htmlFor='portfolio'>Site/portfolio</label>
								<input id='portfolio' name='portfolio' type='url' />
							</div>
						</div>

						<div>
							<label htmlFor='skills'>Your skills</label>
							<textarea id='skills' name='skills' />
						</div>

						<div>
							<p>Other social accounts (optional):</p>
							<div>
								<button>
									<Instagram />
								</button>

								<button>
									<Threads />
								</button>

								<button>
									<Facebook />
								</button>

								<button>
									<LinkedIn />
								</button>

								<button>
									<XTwitter />
								</button>

								<button>
									<BlueSky />
								</button>

								<button>
									<DevTo />
								</button>
							</div>
						</div>

						<div>
							<div>
								<label htmlFor='threads'>Threads</label>
								<input id='threads' name='threads' type='url' />
							</div>
							<div>
								<label htmlFor='facebook'>Facebook</label>
								<input id='facebook' name='facebook' type='url' />
							</div>
							<div>
								<label htmlFor='instagram'>Instagram</label>
								<input id='instagram' name='instagram' type='url' />
							</div>
							<div>
								<label htmlFor='mastodon'>Mastodon</label>
								<input id='mastodon' name='mastodon' type='url' />
							</div>
							<div>
								<label htmlFor='twitter'>Twitter</label>
								<input id='twitter' name='twitter' type='url' />
							</div>
							<div>
								<label htmlFor='bluesky'>Bluesky</label>
								<input id='bluesky' name='bluesky' type='url' />
							</div>
							<div>
								<label htmlFor='dev-to'>DEV.to</label>
								<input id='dev-to' name='dev-to' type='url' />
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

export default CompleteProfile;
