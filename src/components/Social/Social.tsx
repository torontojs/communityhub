import './Social.css';

interface SocialInfo {
	socialName: string;
	socialUrl: string;
}
const Social = ({ socialName, socialUrl }: SocialInfo): React.JSX.Element => (
	<div className='reusable-social-icon'>
		<a href={socialUrl} target='_blank' rel='noopener noreferrer'>
			<div className='circle'>
				<img src='/default-social-icon.png' alt='social-icon-default.png' />
			</div>
			<p>{socialName.charAt(0).toUpperCase() + socialName.slice(1)}</p>
		</a>
	</div>
);

export default Social;
