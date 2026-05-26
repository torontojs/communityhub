import './TeamCard.css';

interface Props {
	description: string;
	href?: string;
	memberCountLabel: string;
	name: string;
	onEdit?(): void;
}

const TeamCard = ({ description, href, memberCountLabel, name, onEdit }: Props): React.JSX.Element => (
	<article className='team-card'>
		<header className='team-card-header'>
			<div className='team-card-icon'>
				<img src='/teams-icon.png' alt='' />
			</div>
			<div className='team-card-main'>
				<div>
					<h2 className='team-card-title'>
						{href ? <a href={href}>{name}</a> : name}
					</h2>
					<p>{memberCountLabel}</p>
				</div>
				{onEdit && (
					<button className='team-card-edit-button' type='button' aria-label={`Edit ${name}`} onClick={onEdit}>
						<img src='/edit-pencil-icon.png' alt='' />
					</button>
				)}
			</div>
		</header>
		<div className='team-card-body'>
			<p>{description}</p>
		</div>
	</article>
);

export default TeamCard;
