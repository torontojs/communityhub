import './TeamMemberCard.css';
import type { TeamMemberProfile } from '../Teams/Teams.tsx';

const TeamMemberCard = (props: TeamMemberProfile) => (
	<article className='team-member-card'>
		<a
			href={`/pages/profile?id=${props.profileId}`}
			className='team-member-profile-link'
		>
			<div className='team-member-profile'>
				<picture>
					<img
						className='avatar'
						src={props.avatar ?? '/default-avatar.png'}
						alt={`${props.profileName} avatar`}
					/>
				</picture>
				<header>
					<h4 className='team-member-card-heading'>{props.profileName}</h4>
				</header>
				<p className='team-member-role'>{props.name}</p>
			</div>
		</a>
	</article>
);

export default TeamMemberCard;
