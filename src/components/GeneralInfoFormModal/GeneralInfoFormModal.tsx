import { useRef, useState } from 'react';
import './GeneralInfoFormModal.css';
import { getGravatarUrlType } from '../../utils/gravatar.ts';
import { safeAvatarUrl } from '../../utils/safeAvatarUrl.ts';
import Button from '../Button/Button.tsx';
import TextInputComponent from '../TextInputComponent/TextInputComponent.tsx';
import ToastNotificationBox from '../ToastNotificationBox/Toast/Toast.tsx';

interface Props {
	name: string;
	email: string;
	avatar: string;
	pronouns: string;
	isBasedOnGTA: boolean | null;
	canJoinLocalEvents: boolean | null;
	onClose(): void;
	onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<boolean>;
}

const pronounOptions = [
	'',
	'he/him',
	'she/her',
	'they/them'
];

const GeneralInfoFormModal = ({ name, email, avatar: initialAvatar, pronouns, isBasedOnGTA, canJoinLocalEvents, onClose, onSubmit }: Props): React.JSX.Element => {
	const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
	const [toast, setToast] = useState<{ id: number, variant: 'error' | 'success', title: string, message: string } | null>(null);
	const toastId = useRef(0);
	const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
	const [avatarInput, setAvatarInput] = useState(initialAvatar);
	const avatarPreview = (url: string): string => getGravatarUrlType(url) === 'profile' ? safeAvatarUrl(undefined) : safeAvatarUrl(url);

	const showToast = (variant: 'error' | 'success', title: string, message: string): void => {
		toastId.current += 1;
		setToast({ id: toastId.current, variant, title, message });
	};

	const handleAvatarSave = (): void => {
		const urlType = getGravatarUrlType(avatarInput);
		if (urlType === 'invalid') {
			showToast('error', 'Invalid Gravatar URL', 'Please enter a valid Gravatar URL.');

			return;
		}
		setAvatarUrl(avatarInput);
		setIsAvatarModalOpen(false);
	};

	const handleAvatarRemove = (): void => {
		setAvatarUrl('');
		setAvatarInput('');
		setIsAvatarModalOpen(false);
	};

	const openAvatarModal = (): void => {
		setAvatarInput(avatarUrl);
		setIsAvatarModalOpen(true);
	};

	return (
		<div className='general-info-modal'>
			<form
				className='general-info-form-modal-container'
				onSubmit={async (event) => {
					const isSaved = await onSubmit(event);
					if (!isSaved) {
						showToast('error', 'Unable to save changes', 'Please check the information and try again.');
					}
				}}
			>
				<div className='title-close'>
					{toast && (
						<ToastNotificationBox key={toast.id} title={toast.title} variant={toast.variant} isToastActive>
							{toast.message}
						</ToastNotificationBox>
					)}
					<h2>Edit General Information</h2>
					<Button className='general-info-modal-close-button' type='button' onClick={onClose} aria-label='Close edit general information modal'>
						<img src='/black-x.png' alt='Black X icon' />
					</Button>
				</div>
				<p>Update your personal details below. Changes will be saved to your profile once you click Save.</p>

				<div className='general-info-section'>
					<h3>General Information</h3>
					<div className='general-info-avatar-row'>
						<button
							type='button'
							className='general-info-avatar-placeholder'
							aria-label='Edit profile photo'
							onClick={openAvatarModal}
						>
							<img src={avatarPreview(avatarUrl)} alt='' />
							<span className='general-info-avatar-overlay' aria-hidden='true'>Edit</span>
						</button>
						<input type='hidden' name='avatar' value={avatarUrl} />
						<div className='general-info-fields'>
							<div className='general-info-inputs'>
								<TextInputComponent
									label='Name'
									name='name'
									value={name}
									required
								/>
								<TextInputComponent
									label='E-mail'
									name='email'
									value={email}
									disabled
									required
								/>
							</div>
							<div className='general-info-pronouns'>
								<label htmlFor='pronouns-select'>Pronouns</label>
								<select id='pronouns-select' name='pronouns' defaultValue={pronouns}>
									{pronounOptions.map((option) => (
										<option key={option} value={option}>
											{option || 'Select pronouns'}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>

				<div className='other-info-section'>
					<h3>Other Information</h3>
					<div className='slider-wrapper'>
						<div className='slider-checkbox-row'>
							<input
								type='checkbox'
								id='canJoinLocalEvents'
								name='canJoinLocalEvents'
								className='slider-checkbox'
								defaultChecked={canJoinLocalEvents ?? false}
							/>
							<label htmlFor='canJoinLocalEvents'>Available for TorontoJS's local events</label>
						</div>
						<div className='slider-checkbox-row'>
							<input
								type='checkbox'
								id='isBasedOnGTA'
								name='isBasedOnGTA'
								className='slider-checkbox'
								defaultChecked={isBasedOnGTA ?? false}
							/>
							<label htmlFor='isBasedOnGTA'>Based in Greater Toronto Area</label>
						</div>
					</div>
				</div>

				<div className='general-info-form-modal-button-container'>
					<Button type='button' hasOutline onClick={onClose}>Cancel</Button>
					<Button type='submit' isPrimary>Save</Button>
				</div>
			</form>

			{isAvatarModalOpen && (
				<div className='general-info-avatar-modal' role='dialog' aria-modal='true' aria-label='Edit profile photo'>
					<div className='general-info-avatar-dialog'>
						<div className='general-info-avatar-dialog-title-row'>
							<h2>Profile photo</h2>
							<button
								type='button'
								aria-label='Close photo modal'
								onClick={() => setIsAvatarModalOpen(false)}
							>
								<img src='/black-x.png' alt='' />
							</button>
						</div>
						<div className='general-info-avatar-dialog-preview'>
							<img src={avatarPreview(avatarInput)} alt='Preview' />
						</div>
						<TextInputComponent
							label='Gravatar URL'
							name='avatar-input'
							value={avatarInput}
							onChange={(e) => {
								setAvatarInput((e.target as HTMLInputElement).value);
							}}
						/>
						<div className='general-info-avatar-dialog-actions'>
							<Button className='user-profile-img' type='button' hasOutline size='small' onClick={handleAvatarRemove}>
								Remove photo
							</Button>
							<Button className='user-profile-img' type='button' isPrimary size='small' onClick={handleAvatarSave}>
								Save photo
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GeneralInfoFormModal;
