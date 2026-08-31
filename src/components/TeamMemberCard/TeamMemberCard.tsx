import './TeamMemberCard.css';
import type { TeamMemberProfile } from '../../types/index.ts';
import { getInitials } from '../../utils/getInitials.ts';
import { safeAvatarUrl } from '../../utils/safeAvatarUrl.ts';

interface Props extends TeamMemberProfile {
	profileHref?: string;
}

const TeamMemberCard = (props: Props) => (
	<article className='team-member-card'>
		<a
			href={props.profileHref ?? `/pages/profile?id=${props.profileId}`}
			className='team-member-profile-link'
		>
			<div className='team-member-profile'>
				{props.avatar ?
					(
						<picture>
							<img
								className='avatar'
								src={safeAvatarUrl(props.avatar)}
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
