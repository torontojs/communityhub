import Label from '../Label/Label.tsx';
import './Team.css';

// ISSUE 290
// https://github.com/torontojs/communityhub/issues/290
// interface TeamInfo {
// 	teamName: string;
// 	description: string;
// 	role: string;
// }
const Team = (): React.JSX.Element => (
	<div className='reusable-team-icon'>
		<div className='team-container'>
			<div className='circle'>
				<img src='/teams-icon.png' alt='Team icon' />
			</div>
			<div className='team-inner-container'>
				<p className='team-name'>Volunteer Team</p>
				<p>
					<img src='/small-size-team-members.png' alt='Team Members Icon' />
					<span>50 Members</span>
				</p>
			</div>
		</div>
		{/* <p className='team-role'>Volunteer</p> */}<Label variant="error" tone="light" children="Volunteer"></Label>
		<p className='team-description'>
			Shapes the visual identity of TorontoJS. Design graphics, websites, and user experiences. Perfect for UX/UI designers and visual creatives. Great opportunity to work on
			real projects while cross collaborating.
		</p>
	</div>
);

export default Team;
