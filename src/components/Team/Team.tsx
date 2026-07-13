import './Team.css';

interface Props {
	description?: string;
	href?: string;
	memberCount?: number;
	name?: string;
	role?: string;
}

const Team = ({
	description =
		'Shapes the visual identity of TorontoJS. Design graphics, websites, and user experiences. Perfect for UX/UI designers and visual creatives. Great opportunity to work on real projects while cross collaborating.',
	href,
	memberCount = 50,
	name = 'Volunteer Team',
	role = 'Volunteer'
}: Props): React.JSX.Element => {
	const content = (
		<>
			<div className='team-container'>
				<div className='circle'>
					<img src='/teams-icon.png' alt='Team icon' />
				</div>
				<div className='team-inner-container'>
					<p className='team-name'>{name}</p>
					<p>
						<img src='/small-size-team-members.png' alt='Team Members Icon' />
						<span>{memberCount} {memberCount === 1 ? 'Member' : 'Members'}</span>
					</p>
				</div>
			</div>
			{role && <p className='team-role'>{role}</p>}
			{description && <p className='team-description'>{description}</p>}
		</>
	);

	if (href) {
		return (
			<a className='reusable-team-icon' href={href}>
				{content}
			</a>
		);
	}

	return (
		<div className='reusable-team-icon'>
			{content}
		</div>
	);
};

export default Team;
