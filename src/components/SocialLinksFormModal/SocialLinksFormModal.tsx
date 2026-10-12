import './SocialLinksFormModal.css';
import Button from '../Button/Button.tsx';
import { ToastContainer, toast } from 'react-toastify';

interface Links {
	platform: string;
	url: string;
}

type LinksArray = Links[];

interface Props {
	linksArrayProp: LinksArray;
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean>;
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
 		<ToastContainer position='bottom-center' theme='light' />
		<form
			className='social-links-form-modal-container'
			onSubmit={async (event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				const invalidPlatform = socialMediaPlatforms.find((platform) => {
					const url = (formData.get(platform) as string)?.trim() ?? '';
					if (!url) { return false; }

					try {
						return new URL(url).protocol !== 'https:';
					} catch {
						return true;
					}
				});

				if (invalidPlatform) {
					const platformName = invalidPlatform.charAt(0).toUpperCase() + invalidPlatform.slice(1);
					toast.error(`Enter a valid HTTPS URL for ${platformName}.`);
					return;
				}

				const isSaved = await onSubmit(event);
				if (isSaved) {
					onClose();
				} else {
					toast.error('Could not save social links. Check the URLs and try again.');
				}
			}}
		>
			<div className='title-close'>
				<h2>Edit social links</h2>
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
				<Button type='button' hasOutline onClick={onClose}>Cancel</Button>
				<Button type='submit' isPrimary>Save</Button>
			</div>
		</form>
	</div>
);

export default SocialLinksFormModal;
