import './Team.css';

interface TeamInfo {
	teamName: string;
	description: string;
	role: string;
}
const Team = ({ teamName, description }: TeamInfo): React.JSX.Element => (
	<div className='reusable-team-icon'>
		<a href=''>
			<div className='circle'>
				<img src='/team-icon.png' alt='Team icon' />
			</div>
			<p>{teamName}</p>
			<textarea>{description}</textarea>
		</a>
	</div>
);

export default Team;
