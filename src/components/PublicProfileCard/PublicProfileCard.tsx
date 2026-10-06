import type { PublicProfile } from '../../types/public.ts';
import { getInitials } from '../../utils/getInitials.ts';
import { safeAvatarUrl } from '../../utils/safeAvatarUrl.ts';
import './PublicProfileCard.css';

const MAXIMUM_VISIBLE_SKILLS = 3;

const PublicProfileCard = ({ avatar, description, id, name, pronouns, skills = [] }: PublicProfile): React.JSX.Element => (
	<li className='public-profile-card'>
		<a href={`/pages/public-profile/?id=${encodeURIComponent(id)}`}>
			<header className='public-profile-card-header'>
				{avatar ?
					<img className='public-profile-card-avatar' src={safeAvatarUrl(avatar)} alt='' /> :
					<span className='public-profile-card-avatar public-profile-card-initials' aria-hidden='true'>{getInitials(name)}</span>}
				<div>
					<h2>{name}</h2>
					{pronouns && <p>{pronouns}</p>}
				</div>
			</header>
			<p className='public-profile-card-description'>{description ?? 'No description has been added yet.'}</p>
			{skills.length > 0 && (
				<ul className='public-profile-card-skills' aria-label={`${name}'s skills`}>
					{skills.slice(0, MAXIMUM_VISIBLE_SKILLS).map((skill) => <li key={skill}>{skill}</li>)}
					{skills.length > MAXIMUM_VISIBLE_SKILLS && <li>+{skills.length - MAXIMUM_VISIBLE_SKILLS}</li>}
				</ul>
			)}
		</a>
	</li>
);

export default PublicProfileCard;
