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
	'devto'
];

const getSocialMediaUrl = (socialMedia: Links[], platformName: string): string => {
	const res = socialMedia.find(({ platform }) => platform === platformName);
	return res?.url ?? '';
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
				{socialMediaPlatforms.map((platform) => (
					<div className='input-block' key={platform}>
						<label className='label' htmlFor={`input-${platform}`}>
							{platform.charAt(0).toUpperCase() + platform.slice(1)}
						</label>
						<input
							id={`input-${platform}`}
							type='text'
							name={platform}
							defaultValue={getSocialMediaUrl(linksArrayProp, platform)}
							placeholder='https://'
						/>
					</div>
				))}
			</div>

			<div className='social-links-form-modal-button-container'>
				<button type='button' onClick={onClose}>Cancel</button>
				<button type='submit'>
					Submit
				</button>
			</div>
		</form>
	</div>
);

export default SocialLinksFormModal;
