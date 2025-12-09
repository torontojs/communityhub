import './SocialLinksFormModal.css';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

interface Props {
	linksArrayProp: LinksArray;
	onClose(): void;
	onSubmit(Event: React.FormEvent<HTMLFormElement>): void;
}

const socialMediaPlatforms: string[] = [
	'site',
	'slack',
	'linkedin',
	'github',
	'portfolio',
	'codepen',
	'instagram',
	'threads',
	'facebook',
	'bluesky',
	'mastodon',
	'twitter',
	'dev.to'
];

const getSocialMediaUrl = (socialMedia: Links[], platFormName: string): string => {
	const res = socialMedia.find(({ platform }) => platform === platFormName);
	return res?.url ?? 'https://';
};

const SocialLinksFormModal = ({ linksArrayProp, onClose, onSubmit }: Props): React.JSX.Element => (
	<div className='social-links-modal'>
		<form
			className='social-links-form-modal-container'
			onSubmit={(event) => {
				onSubmit(event);
				onClose();
			}}
		>
			<div className='title-close'>
				<h2>Edit Social Links</h2>
				<button type='button' onClick={onClose}>
					<img src='/black-x.png' alt='Black X icon' />
				</button>
			</div>
			<p>Connect your social or portfolio links so others can find and follow your work.</p>

			<div className='social-links-modal-inputs-container'>
				{socialMediaPlatforms.map((platform) => {
					const url = getSocialMediaUrl(linksArrayProp, platform);

					return (
						<div className='input-block'>
							<label className='label' htmlFor='input'>
								{platform.charAt(0).toUpperCase() + platform.slice(1)}
							</label>
							<input id='input' type='url' name='url' placeholder={url}></input>
						</div>
					);
				})}
			</div>

			<div className='social-links-form-modal-button-container'>
				<button onClick={onClose}>Cancel</button>
				<button type='submit'>
					Submit
				</button>
			</div>
		</form>
	</div>
);

export default SocialLinksFormModal;
