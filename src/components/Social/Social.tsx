import './Social.css';

interface SocialInfo {
	socialName: string;
	socialUrl: string;
}
const Social = ({ socialName, socialUrl }: SocialInfo): React.JSX.Element => (
	<div className='reusable-social-icon'>
		<a href={socialUrl}>
			<div className='circle'>
				<img src='/default-social-icon.png' alt='social-icon-default.png' />
			</div>
			<p>{socialName}</p>
		</a>
	</div>
);

export default Social;
