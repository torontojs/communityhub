import './TeamMemberCard.css';
import type { TeamMemberProfile } from '../Teams/Teams.tsx';

const getInitials = (name: string): string => name
	.split(' ')
	.map((part) => part[0])
	.filter(Boolean)
	.slice(0, 2)
	.join('')
	.toUpperCase();

const TeamMemberCard = (props: TeamMemberProfile) => (
	<article className='team-member-card'>
		<a
			href={`/pages/profile?id=${props.profileId}`}
			className='team-member-profile-link'
		>
			<div className='team-member-profile'>
				{props.avatar ?
					(
						<picture>
							<img
								className='avatar'
								src={props.avatar}
								alt={`${props.profileName} avatar`}
							/>
						</picture>
					) :
					<span className='avatar'>{getInitials(props.profileName)}</span>}
				<header>
					<h4 className='team-member-card-heading'>{props.profileName}</h4>
				</header>
				<p className='team-member-role'>{props.name}</p>
			</div>
		</a>
	</article>
);

export default TeamMemberCard;
